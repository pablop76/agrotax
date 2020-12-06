import "./spine";
// walidacja formularza
class FormValidate {
  constructor(form, options) {
    const defaultOptions = {
      //domyślne opcje naszej walidacji
      classError: "error",
    };
    this.form = form; //właściwy formularz

    // //tworzymy opcje dla naszego obiektu
    // //scalając przekazane opcje z obiektem defaultOptions
    this.options = Object.assign({}, defaultOptions, options);
    //wyłączamy walidację HTML
    this.form.setAttribute("novalidate", "novalidate");
    this.prepareElements();
    this.bindSubmit();
  }
  getFields() {
    const inputs = [
      ...this.form.querySelectorAll(
        "input:not(:disabled), select:not(:disabled), textarea:not(:disabled)"
      ),
    ];
    const result = [];

    for (const el of inputs) {
      if (el.willValidate) {
        result.push(el);
      }
    }
    return result;
  }
  prepareElements() {
    const elements = this.getFields();
    for (const el of elements) {
      const tag = el.tagName.toLowerCase();
      const type = el.type.toLowerCase();
      let eventName = "input";

      if (
        type === "checkbox" ||
        type === "radio" ||
        type === "tel" ||
        tag === "select"
      ) {
        //checkboxa i radio
        eventName = "change";
      }

      el.addEventListener(eventName, (e) => this.testInput(e.target));
    }
  }
  testInput(input) {
    const valid = input.checkValidity();
    this.markFieldAsError(input, !valid);
    return valid;
  }

  markFieldAsError(field, show) {
    if (show) {
      field.closest(".form-wrapper-contol").classList.add("form-error");
    } else {
      field.closest(".form-wrapper-contol").classList.remove("form-error");
    }
  }
  bindSubmit() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const elements = this.getFields();
      let counter = elements.length;
      for (const el of elements) {
        this.markFieldAsError(el, !el.checkValidity());
        counter = !el.checkValidity() ? counter : counter - 1;
      }
      // jezeli pola zostały wypełnione wyslij forme
      if (!counter) {
        const form = this.form;
        const elements = this.getFields();
        const dataToSend = new FormData();
        [...elements].forEach((el) => dataToSend.append(el.name, el.value));
        const url = form.getAttribute("action");
        const method = form.getAttribute("method");

        const button = form.querySelector('[type="submit"]');

        button.disabled = true;
        button.classList.add("elem-is-busy");
        fetch(url, {
          method: method.toUpperCase(),
          body: dataToSend,
        }).then((res) => {
          button.disabled = false;
          button.classList.remove("elem-is-busy");
          if (res.errors) {
            res.errors.map(function (el) {
              return '[name="' + el + '"]';
            });
            const selector = res.errors.join(",");
            checkFieldsErrors(form.querySelectorAll(selector));
          } else {
            if (res.ok) {
              /* ---------------------------------------------------- */
              /*   wyświetlamy komunikat powodzenia, cieszymy sie */
              /* ---------------------------------------------------- */
              const div = document.createElement("div");
              div.classList.add("form-send-success");

              div.innerHTML =
                "<strong>Wiadomość została wysłana. </strong><p>Dziękujemy za kontakt. Postaramy się odpowiedzieć jak najszybciej</p>";
              form.parentElement.insertBefore(div, form);
              form.remove();
            }

            if (!res.ok) {
              /* ---------------------------------------------------- */
              /*   komunikat błędu, niepowodzenia */
              /* ---------------------------------------------------- */
              const div = document.createElement("div");
              div.classList.add("form-send-error");

              div.innerText = "Wysłanie wiadomości się nie powiodło";
              form.parentElement.insertBefore(div, form);
              form.remove();
            }
          }
        });
      }
    });
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const cfg = {};
  const form = document.querySelector(".form");
  const fv = new FormValidate(form, cfg);
});
