/* eslint-disable import/prefer-default-export */
export const isString = (val) => {
  if (val.includes(".") || (val.length === 1 && val === " ")) {
    return false;
  }
  if (
    val[val.length - 1] === " " &&
    val[val.length - 1] !== val[val.length - 2]
  ) {
    return true;
  }
  if (
    val[val.length - 1]?.trim()?.toLowerCase() !==
      val[val.length - 1]?.trim()?.toUpperCase() ||
    val === ""
  ) {
    return true;
  }
  return false;
};

export const isNumber = (val) => {
  if (val[val.length - 1] === " ") {
    return false;
  }
  if (val.includes(".")) {
    return false;
  }
  // eslint-disable-next-line no-restricted-globals
  if (!isNaN(val?.trim()) || val === "") {
    return true;
  }
  return false;
};

export const isFloat = (val) => {
  if (val[val.length - 1] === " " || val === ".") {
    return false;
  }
  if (val.includes(".")) {
    val = val.replace(".", "");
    // eslint-disable-next-line no-restricted-globals
    if ((!val.includes(".") && !isNaN(val?.trim())) || val === "") {
      return true;
    }
    return false;
  }
  // eslint-disable-next-line no-restricted-globals
  if (!isNaN(val?.trim()) || val === "") {
    return true;
  }
  return false;
};
