import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    resources: {
      en: {
        translation: {
          sidebar: {
            title: "Bus Stations Around You",
            toggle: "Language",
            station: "Station",
            eta: "ETA",
            min : "min",
             megenagna: "Megenagna", 
             gerji: "Gerji (Infront of Tottot)",
              mebrathail: "Gerji MebratHail",
              jackros: "Jackros Square",
              goro: "Goro Intersection",
              ict: "ICT Park",
              hot: "Hot Water Spring",
              gojo: "Gojo Arsema Station",
              koye16: "Koye 16",
              koye: "Koye Square",
              aastu: "AASTU",
              tulu: "Tulu Dimtu Square",
          },
        },
      },
      am: {
        translation: {
          sidebar: {
            title: "ከእርስዎ በአቅራቢያ ያሉ አውቶቡሶች",
            toggle: "ቋንቋ ቀይር",
            station: "ማቆሚያ",
            eta: "የሚደርስበት ጊዜ",
            min : "ደቂቃ",
            megenagna: "መገኛኛ",
            gerji: "ገርጂ ቶቶት",
            mebrathail: "ገርጂ መብራትሃይል",
            jackros: "ጃክሮስ አደባባይ ",
            goro: "ጎሮ",
            ict: "ICT ፓርክ",
            hot: "ፍል ውሃ",
            gojo: "አርሰማ መቆሚያ",
            koye16: "ኮዬ 16",
            koye: "ኮዬ ሳትድ",
            aastu: "አስቱ",
            tulu: "ቱሉ ዲምቱ አደባባይ",
          },
        },
      },
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
