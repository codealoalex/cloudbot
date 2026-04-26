function getState(step, num, arr) {
  if (isNaN(parseInt(num))) return undefined;
  if (num > arr.length) return undefined;
  if (step == 0) {
    return arr[parseInt(num) - 1].nom;
  } else {
    return arr[parseInt(num) - 1].info.text;
  }
}

export default getState;
