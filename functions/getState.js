import {
  STEP1_EXTRANJEROS,
  STEP1_LICENCIAS,
  STEP1_NACIONALES,
  STEP2_EXTRANJEROS_DISCAPACIDA,
  STEP2_EXTRANJEROS_DUPLICADO,
  STEP2_EXTRANJEROS_MENORES,
  STEP2_EXTRANJEROS_PRIMERA_VEZ,
  STEP2_EXTRANJEROS_REFUGIADOS,
  STEP2_EXTRANJEROS_RENOVACION,
  STEP2_LICENCIAS_ASCENSO,
  STEP2_LICENCIAS_DUPLICADO,
  STEP2_LICENCIAS_PRIMERA_VEZ,
  STEP2_LICENCIAS_RENOVACION,
  STEP2_NACIONALES_MAYOR,
  STEP2_NACIONALES_MENOR,
  STEP2_NACIONALES_OTROS,
} from "../informacion/palabras.js";

export function getState(text, collection) {
  const textFormat = text.toLowerCase().split(" ");
  for (let i = 0; i < collection.length; i++) {
    let cont = 0;
    for (const word of collection[i]) {
      if (textFormat.includes(word.toLowerCase())) {
        cont++;
        if (cont >= 2) return i+1;
      }
    }
  }
  return -1;
}

export function getValues(state) {
  if (state.toLowerCase() == "success") {
    return [STEP1_NACIONALES, STEP1_EXTRANJEROS, STEP1_LICENCIAS];
  } else {
    const stateInt = parseInt(state);
    if (stateInt == 1)
      return [
        STEP2_NACIONALES_MAYOR,
        STEP2_NACIONALES_MENOR,
        STEP2_NACIONALES_OTROS,
      ];
    if (stateInt == 2)
      return [
        STEP2_EXTRANJEROS_PRIMERA_VEZ,
        STEP2_EXTRANJEROS_DUPLICADO,
        STEP2_EXTRANJEROS_RENOVACION,
        STEP2_EXTRANJEROS_MENORES,
        STEP2_EXTRANJEROS_REFUGIADOS,
        STEP2_EXTRANJEROS_DISCAPACIDA,
      ];
    if (stateInt == 3)
      return [
        STEP2_LICENCIAS_PRIMERA_VEZ,
        STEP2_LICENCIAS_DUPLICADO,
        STEP2_LICENCIAS_RENOVACION,
        STEP2_LICENCIAS_ASCENSO,
      ];
    else return null;
  }
}
