import { textTranslate } from "../data/text-translate";

type Language = "pt-BR" | "en-US";

export function translate(
  key: keyof (typeof textTranslate)["en-US"],
  lang: Language = "pt-BR"
) {
  return textTranslate[lang]?.[key] ?? textTranslate["en-US"][key] ?? key;
}
