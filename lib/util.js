const FormData = require("form-data");

const isNull = val => val === null;
const isUndefined = val => val === undefined;
const isFunction = val => typeof val === "function";
const isObject = val => !isNull(val) && typeof val === "object";
const isStream = val => !isNull(val) && isObject(val) && isFunction(val.pipe);

/**
 * Recrursively search an object for a Buffer or Stream.
 *
 * @param {*} val - The object to search.
 * @return {Boolean} Found any binary data
 */
function containsBinaryData(val) {
  if (Buffer.isBuffer(val) || isStream(val)) {
    return true;
  }

  if (Array.isArray(val)) {
    return val.some(containsBinaryData);
  }

  if (isObject(val)) {
    return Object.keys(val).some(key => containsBinaryData(val[key]));
  }

  return false;
}

/**
 * Recursively convert a value to form data. Usually used as a reducer.
 *
 * @param {FormData} form - The form to append data to
 * @param {Array[String, *]} entry - The key and value for each entry to convert
 * @return {FormData} The final form object.
 */
function asFormData(form, [key, value]) {
  if (Buffer.isBuffer(value) || isStream(value)) {
    form.append(key, value);
    return form;
  }

  if (Array.isArray(value)) {
    Object.entries(value)
      .map(entry => [`${key}[]`, entry[1]])
      .reduce(asFormData, form);

    return form;
  }

  if (isObject(value)) {
    Object.entries(value)
      .map(entry => [`${key}[${entry[0]}]`, entry[1]])
      .reduce(asFormData, form);

    return form;
  }

  if (!isNull(value) && !isUndefined(value)) {
    form.append(key, value);
  }

  return form;
}

/**
 * Transform an axios request to multi-part form data or JSON based on the
 * request body.
 *
 * @param {Object} data - Object to transform
 * @param {Object} headers - The headers for the request
 * @return {FormData|String} The serialized response body
 */
function serializeRequest(data, headers) {
  if (containsBinaryData(data)) {
    const form = Object.entries(data).reduce(asFormData, new FormData());

    Object.assign(headers, form.getHeaders());

    return form;
  }

  // eslint-disable-next-line no-param-reassign
  headers["Content-Type"] = "application/json;charset=utf-8";

  return JSON.stringify(data);
}

module.exports = {
  serializeRequest
};
