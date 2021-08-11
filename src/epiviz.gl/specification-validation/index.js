import { Validator } from "jsonschema";
import visualization from "./visualization.js";
import track from "./track.js";
import channel from "./channel.js";

const v = new Validator();
v.addSchema(channel, "/channel");
v.addSchema(track, "/track");

/**
 * Utility method that returns a boolean on whether the json is a valid schema.
 * console.errors the reason if it is not.
 * @param {Object} json schema
 * @returns boolean
 */
const isJSONValid = (json) => {
  const validation = v.validate(json, visualization);
  if (!validation.valid) {
    console.error(validation.errors);
  }
  return validation.valid;
};

export default isJSONValid;

export { channel, track, visualization };
