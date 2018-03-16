/**
 * Fast way to clone an Object using built in JSON object
 * @param {*} obj - subject
 * @returns {*} - cloned subject
 */
export const clone = obj => {
  if (typeof obj === "object") {
    return JSON.parse(JSON.stringify(obj));
  } else {
    return obj;
  }
};

/**
 * Useable for uniquely identifying an object
 * @returns {string} - uuid
 */
export const createUuid = () => {
  let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0,
      v = c === "x" ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
  return uuid;
};

/**
 *
 * @param {Object} obj - subject
 * @param {string} name - propname
 * @returns {boolean} - does it have a "real" value?
 */
export const hasNoRealValue = (obj, name) => {
  obj = clone(obj);
  let hasNo = false;
  if (obj !== null) {
    if (typeof obj === "string") {
      hasNo = hasNothing(obj);
    }
    if (typeof obj === "object") {
      const value = obj[name];
      hasNo = (!hasProperty(obj, name) || value === undefined || hasNothing(value));
    }
  }
  return hasNo;
};

/**
 * Does an object have a property?
 * @param {Object} obj - haystack
 * @param {string} propname - needle
 * @returns {boolean} - found?
 */
export const hasProperty = (obj, propname) => {
  if (!obj || obj === null) {
    return false;
  }
  return Object.prototype.hasOwnProperty.call(obj, propname);
};

/**
 * Remove a property from an object
 * @param {*} obj
 * @param {string} propname
 */
export const removeProperty = (obj, propname) => {
  const _obj = clone(obj);
  if (hasProperty(_obj, propname)) {
    delete _obj[propname];
  }
  console.log(`removeProperty concludes: ${JSON.stringify(_obj)}`);
  return _obj;
};

/**
 * Replace a native 'switch' with a function without side-effects
 * @param {Object} cases
 * @returns {function(*): function(*=): *}
 */
export const switchcase = cases => defaultCase => key =>
  cases.hasOwnProperty(key) ? cases[key] : defaultCase;

/**
 * Replace a native 'switch' with a function without side-effects, and supporting functions for
 *  handling cases.
 * @param {Object} cases
 * @returns {function(*=): function(*=): *}
 */
export const switchcaseF = cases => defaultCase => key =>
  executeIfFunction(switchcase(cases)(defaultCase)(key));

/**
 * Does a value have nothing?
 * @param {*} value - subject
 * @returns {boolean} - has nothing?
 */
const hasNothing = value =>
  (value === null || value === "" || value === "00:00" || value === "00:00:00" || value <= 0);

/**
 * Returns the passed parameter or executes it and then returns if it was a function
 * @param {Function|Object} f
 * @returns {Function|Object}
 */
const executeIfFunction = f =>
  typeof f === 'function' ? f() : f
