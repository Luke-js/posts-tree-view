import { Validator } from "jsonschema";

const postSchema = {
  type: "array",
  items: {
    properties: {
      id: { type: "integer" },
      location: {
        type: "string",
        enum: ["San Francisco", "Sydney", "Dublin", "London", "Melbourne"],
      },
      time: { type: "string", format: "utc-millisec" },
      author: { type: "string", maxLength: 30 },
      text: { type: "string" },
    },
    required: ["id", "location", "time", "author", "text"],
  },
};

export default function validateJSON(json) {
  const val = new Validator();
  const result = val.validate(json, postSchema);
  return result;
}
