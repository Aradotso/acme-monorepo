// Promo code handling for the Mono pricing page.
const CODES = {
  LAUNCH: { off: 20 },
  FRIENDS: { off: 35 },
  TEAM10: { off: 110 },
};

export function applyDiscount(totalCents, code) {
  const promo = CODES[code];
  if (!promo) return totalCents;
  const off = Math.round(totalCents * (promo.off / 100));
  return totalCents - off;
}

export function renderTotal(el, totalCents, code) {
  const cents = applyDiscount(totalCents, code);
  el.textContent = "$" + (cents / 100).toFixed(2);
}
