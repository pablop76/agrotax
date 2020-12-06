import UIkit from "uikit/dist/js/uikit.min";
import Icons from "uikit/dist/js/uikit-icons.min";
// loads the Icon plugin
UIkit.use(Icons);

import "./cookieconsent.min.js";

window.CookieConsent.init({
  // More link URL on bar
  modalMainTextMoreLink: null,
  // How lond to wait until bar comes up
  barTimeout: 1000,
  // Look and feel
  theme: {
    barColor: "#a8ccdf",
    barTextColor: "#000",
    barMainButtonColor: "#FFF",
    barMainButtonTextColor: "#678C34",
    modalMainButtonColor: "#a8ccdf",
    modalMainButtonTextColor: "#000",
  },
  language: {
    // Current language
    current: "pl",
    locale: {
      pl: {
        barMainText:
          "Ta strona korzysta z plików cookie, aby zapewnić najlepszą jakość korzystania z naszej witryny.",
        barLinkSetting: "Ustawienia plików cookie",
        barBtnAcceptAll: "Akceptuj wszystkie pliki cookie",
        modalMainTitle: "Ustawienia plików cookies",
        modalMainText:
          "Pliki cookie to niewielkie dane wysyłane ze strony internetowej i przechowywane na komputerze użytkownika przez przeglądarkę internetową użytkownika podczas przeglądania. Twoja przeglądarka przechowuje każdą wiadomość w małym pliku zwanym cookie. Gdy zażądasz innej strony z serwera, Twoja przeglądarka odeśle plik cookie z powrotem na serwer. Pliki cookie mają być niezawodnym mechanizmem zapamiętywania informacji lub rejestrowania aktywności przeglądania przez strony internetowe.",
        modalBtnSave: "Zapisz aktualne ustawienia",
        modalBtnAcceptAll: "Zaakceptuj wszystkie pliki cookie i zamknij",
        modalAffectedSolutions: "Wykorzystywane rozwiązania:",
        learnMore: "Ucz się więcej",
        on: "Włącz",
        off: "Wyłącz",
      },
      en: {
        barMainText:
          "This website uses cookies to ensure you get the best experience on our website.",
        barLinkSetting: "Cookie Settings",
        barBtnAcceptAll: "Accept all cookies",
        modalMainTitle: "Cookie settings",
        modalMainText:
          "Cookies are small piece of data sent from a website and stored on the user's computer by the user's web browser while the user is browsing. Your browser stores each message in a small file, called cookie. When you request another page from the server, your browser sends the cookie back to the server. Cookies were designed to be a reliable mechanism for websites to remember information or to record the user's browsing activity.",
        modalBtnSave: "Save current settings",
        modalBtnAcceptAll: "Accept all cookies and close",
        modalAffectedSolutions: "Affected solutions:",
        learnMore: "Learn More",
        on: "On",
        off: "Off",
      },
    },
  },
  // List all the categories you want to display
  categories: {
    // Unique name
    // This probably will be the default category
    necessary: {
      // The cookies here are necessary and category cant be turned off.
      // Wanted config value  will be ignored.
      needed: true,
      // The cookies in this category will be let trough.
      // This probably should be false if not necessary category
      wanted: true,
      // If the checkbox is on or off at first run.
      checked: true,
      // Language settings for categories
      language: {
        locale: {
          en: {
            name: "Strictly Necessary Cookies",
            description:
              "If you do not accept the cookies identified below as 'Strictly Required', your visit to this site will not be possible",
          },
          hu: {
            name: "Szükséges sütik",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu commodo est, nec gravida odio. Suspendisse scelerisque a ex nec semper.",
          },
          pl: {
            name: "Ściśle wymagane pliki cookie",
            description:
              "Jeżeli nie zaakceptujesz plików cookie określonych poniżej jako 'Ściśle wymagane', Twoje odwiedziny w tej witrynie nie będą możliwe",
          },
        },
      },
    },
  },
  // List actual services here
  services: {
    // Unique name
    analytics: {
      // Existing category Unique name
      // This example shows how to block Google Analytics
      category: "necessary",
      // Type of blocking to apply here.
      // This depends on the type of script we are trying to block
      // Can be: dynamic-script, script-tag, wrapped, localcookie
      type: "dynamic-script",
      // Only needed if "type: dynamic-script"
      // The filter will look for this keyword in inserted scipt tags
      // and block if match found
      search: "analytics",
      // List of known cookie names or Regular expressions matching
      // cookie names placed by this service.
      // These willbe removed from current domain and .domain.
      cookies: [
        {
          // Known cookie name.
          name: "_gid",
          // Expected cookie domain.
          domain: `.${window.location.hostname}`,
        },
        {
          // Regex matching cookie name.
          name: /^_ga/,
          domain: `.${window.location.hostname}`,
        },
      ],
      language: {
        locale: {
          en: {
            name: "Google Analytics",
          },
          hu: {
            name: "Google Analytics",
          },
          pl: {
            name: "Google Analytics",
          },
        },
      },
    },
  },
});
