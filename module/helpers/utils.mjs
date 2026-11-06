/* -------------------------------------------- */
/*  Global Functions
/* -------------------------------------------- */

export const Global = {}

export function getEffectBoons (attribute) {
  return attribute.boons.global ?? 0;
}

// Formatting
/*export function capitalize(string) {
  return string?.charAt(0).toUpperCase() + string?.toLowerCase().slice(1)
}*/

export function plusify(x) {
  return x >= 0 ? '+' + x : x
}

/* -------------------------------------------- */
/*  Math Functions
/* -------------------------------------------- */

export function sum(array) {
  let sum = array.reduce((partialSum, a) => partialSum + a, 0);
  return sum;
}

