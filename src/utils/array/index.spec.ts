import { test, expect, describe } from "vitest";
import { uniqBy } from "./index";

describe("uniqBy function", () => {
  test("should return unique items by key (string)", () => {
    const array = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
      { id: 1, name: "John" }, //duplicated
      { id: 3, name: "Bob" },
    ];
    const result = uniqBy(array, "id");
    expect(result).toEqual([
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
      { id: 3, name: "Bob" },
    ]);
  });

  test("should return unique items by key (function)", () => {
    const array = [
      { name: "John", age: 25 },
      { name: "Jane", age: 30 },
      { name: "John", age: 25 }, // duplicated
      { name: "Bob", age: 35 },
    ];
    // because  its real can be any[]
    const result = uniqBy(array, (item: any) => `${item.name}-${item.age}`);
    expect(result).toEqual([
      { name: "John", age: 25 },
      { name: "Jane", age: 30 },
      { name: "Bob", age: 35 },
    ]);
  });

  test("should return empty array when input is empty", () => {
    const array = [];
    const result = uniqBy(array, "id");
    expect(result).toEqual([]);
  });

  test("should return single item when input has only one item", () => {
    const array = [{ id: 1, name: "John" }];
    const result = uniqBy(array, "id");
    expect(result).toEqual([{ id: 1, name: "John" }]);
  });

  test("should throw error when key is not a string or function", () => {
    const array = [{ id: 1, name: "John" }];
    expect(() => uniqBy(array, 123)).toThrowError(TypeError);
  });
});
