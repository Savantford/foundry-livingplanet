/* -------------------------------------------- */
/*  Global Functions                            */
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
/*  Math Functions                              */
/* -------------------------------------------- */

export function sum(array) {
  let sum = array.reduce((partialSum, a) => partialSum + a, 0);
  return sum;
}

/* -------------------------------------------- */
/*  Progression Clocks                          */
/* -------------------------------------------- */

export function prepareClockArr(data) {
  const { value, max } = data;
  const arr = [];

  for (let i = 0; i < max; i++) {
    arr.push({
      id: i + 1,
      checked: (parseInt(value) === (i + 1)) ? true : false
    });
  }

  return arr.reverse();
}