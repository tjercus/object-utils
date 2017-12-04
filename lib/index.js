"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Fast way to clone an Object using built in JSON object
 * @param {*} obj - subject
 * @returns {*} - cloned subject
 */
var clone = exports.clone = function clone(obj) {
  if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object") {
    return JSON.parse(JSON.stringify(obj));
  } else {
    return obj;
  }
};

/**
 * Useable for uniquely identifying an object
 * @returns {string} - uuid
 */
var createUuid = exports.createUuid = function createUuid() {
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c === "x" ? r : r & 0x3 | 0x8;
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
var hasNoRealValue = exports.hasNoRealValue = function hasNoRealValue(obj, name) {
  obj = clone(obj);
  var hasNo = false;
  if (obj !== null) {
    if (typeof obj === "string") {
      hasNo = hasNothing(obj);
    }
    if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object") {
      var value = obj[name];
      hasNo = !hasProperty(obj, name) || value === undefined || hasNothing(value);
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
var hasProperty = exports.hasProperty = function hasProperty(obj, propname) {
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
var removeProperty = exports.removeProperty = function removeProperty(obj, propname) {
  var _obj = clone(obj);
  if (hasProperty(_obj, propname)) {
    delete _obj[propname];
  }
  console.log("removeProperty concludes: " + JSON.stringify(_obj));
  return _obj;
};

/**
 * Does a value have nothing?
 * @param {*} value - subject
 * @returns {boolean} - has nothing?
 */
var hasNothing = function hasNothing(value) {
  return value === null || value === "" || value === "00:00" || value === "00:00:00" || value <= 0;
};
