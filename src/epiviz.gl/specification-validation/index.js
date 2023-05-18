import { Validator } from "jsonschema";
import visualization from "./visualization.json";
import track from "./track.json";
import channel from "./channel.json";

const v = new Validator();
v.addSchema(channel, "/channel");
v.addSchema(track, "/track");

/**
 * Utility method that returns a boolean on whether the json is a valid specification.
 * console.errors the reason if it is not.
 * @param {Object} json specification
 * @returns boolean
 */
const isJSONValid = (json) => {
  let jsonToValidate = json;

  // Check if any typed arrays are in 'defaultData'
  const typedArrayTypes = [
    Int8Array,
    Uint8Array,
    Uint8ClampedArray,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array,
    BigInt64Array,
    BigUint64Array,
  ];

  if (
    json.defaultData &&
    Object.values(json.defaultData).some((value) =>
      typedArrayTypes.some((T) => value instanceof T)
    )
  ) {
    // Create a deep copy of the json if a typed array needs to be converted
    jsonToValidate = JSON.parse(JSON.stringify(json));

    // Convert typed arrays to standard arrays
    Object.keys(jsonToValidate.defaultData).forEach((key) => {
      if (typedArrayTypes.some((T) => json.defaultData[key] instanceof T)) {
        jsonToValidate.defaultData[key] = Array.from(json.defaultData[key]);
      }
    });
  }

  const validation = v.validate(jsonToValidate, visualization);

  if (!validation.valid) {
    console.error(validation.errors);
  }

  return validation.valid;
};

export default isJSONValid;

export { channel, track, visualization };
