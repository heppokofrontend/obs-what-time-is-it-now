import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      現在時刻: "The current time for OBS",
      OBS用カスタムCSSジェネレータ: "Custom CSS Generator for OBS",
      "次の手順でご利用ください。": "Please follow the steps below to use it:",
      "OBSでブラウザソースを追加（新規作成）":
        "Add a browser source in OBS (create a new one)",
      "URL：このページのURLを設定": "URL: Set the URL of this page",
      "幅：500程度": "Width: About 500",
      "高さ：150程度": "Height: About 150",
      "カスタムCSS：ページ下部のものを設定":
        "Custom CSS: Set the one at the bottom of the page",
      表示: "Visibility",
      "24時間表記": "24 hour notation",
      秒数: "Seconds",
      前景色: "Text",
      文字色: "Font color",
      文字の太さ: "Font weight",
      フォント: "Font family",
      透過: "Transparent",
      背景色: "Background color",
      カスタムCSS: "Custom CSS",
      ここに時間の見た目のCSSを追記可能:
        "CSS for time appearance can be added here",
    },
  },
  ja: {
    translation: {
      現在時刻: "OBSに現在時刻を表示するやつ",
      OBS用カスタムCSSジェネレータ: "OBS用カスタムCSSジェネレータ",
      "次の手順でご利用ください。": "次の手順でご利用ください。",
      "OBSでブラウザソースを追加（新規作成）":
        "OBSでブラウザソースを追加（新規作成）",
      "URL：このページのURLを設定": "URL：このページのURLを設定",
      "幅：500程度": "幅：500程度",
      "高さ：150程度": "高さ：150程度",
      "カスタムCSS：ページ下部のものを設定":
        "カスタムCSS：ページ下部のものを設定",
      表示: "表示",
      "24時間表記": "24時間表示",
      秒数: "秒数",
      前景色: "前景色",
      文字色: "文字色",
      文字の太さ: "文字の太さ",
      フォント: "フォント",
      透過: "透過",
      背景色: "背景色",
      カスタムCSS: "カスタムCSS",
      ここに時間の見た目のCSSを追記可能: "ここに時間の見た目のCSSを追記可能",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: ["en", "ja"],
    lng: window.navigator.languages[0] === "ja" ? "ja" : "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
