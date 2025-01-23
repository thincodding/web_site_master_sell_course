import { createI18n } from "vue-i18n";
import kh from "@/locales/kh.json";
import en from "@/locales/en.json";

// Get the saved locale from localStorage or default to "en"
const savedLocale = localStorage.getItem("locale") || "en";

const i18n = createI18n({
  legacy: false,
  locale: savedLocale, // Use the saved locale
  fallbackLocale: "en",
  messages: {
    en,
    kh,
  },
});

export default i18n;
