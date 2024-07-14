import { useLocale } from "next-intl";

export default function getLocales() {
  const locale = useLocale();

  console.log("213", locale);
  return { locale };
}
