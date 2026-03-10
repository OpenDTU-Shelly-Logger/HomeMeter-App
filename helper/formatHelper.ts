import { getLocales } from "expo-localization";

export function formatNumber(
  value: number | undefined,
  fractionDigits: number = 1,
  unit: string = "",
): string {
  const number = value ?? 0;
  const locale = getLocales()[0]?.languageTag || "en-US";

  const options: Intl.NumberFormatOptions = {
    useGrouping: false,
  };

  if (fractionDigits !== null) {
    options.minimumFractionDigits = fractionDigits;
    options.maximumFractionDigits = fractionDigits;
  }

  const formatted = new Intl.NumberFormat(locale, options).format(number);

  return unit ? `${formatted} ${unit}` : formatted;
}
