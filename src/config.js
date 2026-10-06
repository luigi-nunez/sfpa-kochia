// Central configuration for contact/channel constants.
// Replace placeholder values with real numbers before launch.

export const WA_NUMBER = "249XXXXXXXXX";
export const CALL_CENTRE_NUMBER = "249XXXXXXXXX";

/** Returns a WhatsApp URL for the configured number. */
export function waUrl(lang) {
  const greeting = lang === "ar"
    ? encodeURIComponent("مرحبًا، أود الاستفسار عن خدمات الجمعية.")
    : encodeURIComponent("Hello, I would like to ask about SFPA services.");
  return `https://wa.me/${WA_NUMBER}?text=${greeting}`;
}

/** Returns true if the number has not yet been replaced with a real value. */
export function isPlaceholder(number) {
  return /X/.test(number);
}
