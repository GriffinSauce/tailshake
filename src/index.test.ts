/* eslint-disable sonarjs/no-duplicate-string */
import mergeClasses from ".";

it("returns the classList when only one is passed", () => {
  const output = mergeClasses("text-white");
  expect(output).toEqual("text-white");
});

describe("toggling", () => {
  it("returns a string for empty params", () => {
    const output = mergeClasses();
    expect(output).toEqual("");
  });

  it("returns a single string value", () => {
    const output = mergeClasses("text-white");
    expect(output).toEqual("text-white");
  });

  it("ignores falsy values with a single string value", () => {
    const output = mergeClasses(null, false, "text-white", 0, undefined);
    expect(output).toEqual("text-white");
  });

  it("ignores falsy values with multiple string values", () => {
    const output = mergeClasses(
      null,
      false,
      "text-white",
      0,
      undefined,
      "bg-blue-200"
    );
    expect(output).toEqual("text-white bg-blue-200");
  });
});

describe("merging", () => {
  it("combines two non-conflicting class lists", () => {
    const output = mergeClasses("text-white", "bg-gray-100");
    expect(output).toEqual("text-white bg-gray-100");
  });

  it("combines two conflicting class lists", () => {
    const output = mergeClasses("text-white", "text-gray-100");
    expect(output).toEqual("text-gray-100");
  });

  it("combines more conflicting class lists", () => {
    const output = mergeClasses("text-white", "text-gray-100", "text-blue-100");
    expect(output).toEqual("text-blue-100");
  });

  it("combines classes from plugins with conflicting prefixes", () => {
    const output = mergeClasses("text-xl", "text-white");
    expect(output).toEqual("text-xl text-white");
  });

  it("combines classes from plugins with conflicting prefixes", () => {
    const output = mergeClasses("ring-blue-500", "ring-0");
    expect(output).toEqual("ring-blue-500 ring-0");
  });

  it("combines classes that match other prefixes (plugin toggles)", () => {
    const output = mergeClasses("ring", "ring-blue-500");
    expect(output).toEqual("ring ring-blue-500");
  });

  it("preserves variants", () => {
    const output = mergeClasses("ring", "focus:ring-blue-500 focus:ring-0");
    expect(output).toEqual("ring focus:ring-blue-500 focus:ring-0");
  });
});
