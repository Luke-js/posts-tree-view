import validateJSON from "../helpers/JSONHelper";

describe("validateJSON", () => {
  const validData = [
    {
      id: 1,
      location: "San Francisco",
      time: "1552657573",
      author: "Happy User",
      text:
        "Proper PDF conversion ensures that every element of your document remains just as you left it.",
    },
  ];

  const invalidData = [
    {
      id: 1.1,
      location: "Cork",
      time: "1970-01-01",
      author: "Happy User",
    },
  ];

  it("validateJSON succeed", () => {
    const result = validateJSON(validData);

    expect(result.valid).toBeTruthy();
  });

  it("validateJSON failed", () => {
    const result = validateJSON(invalidData);

    expect(result.valid).toBeFalsy();
    expect(result.errors.length).toEqual(4);
  });
});
