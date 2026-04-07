import { filters } from "./filters";

export function matchFilter(text: string) {
  const normalized = text.toLowerCase();

  for (const filter of filters) {
    const hasRequired = filter.required.every((k) => normalized.includes(k));

    if (!hasRequired) continue;

    if (filter.oneOf) {
      const hasOneOf = filter.oneOf.some((k) => normalized.includes(k));
      if (!hasOneOf) continue;
    }

    if (!normalized.includes("r$")) continue;

    const priceMatch = normalized.match(/r\$\s?([\d\.]+,\d{2}|[\d\.]+)/);
    if (!priceMatch) continue;

    let rawPrice = priceMatch[1];
    rawPrice = rawPrice.replace(/\./g, "").replace(",", ".");

    const price = Number(rawPrice);

    if (price <= filter.maxPrice) {
      return { filter, price };
    }
  }

  return null;
}
