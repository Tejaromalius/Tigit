import { describe, it, expect } from "vitest";
import { NameGenerator } from "../src/core/generator.js";

describe("NameGenerator", () => {
  const generator = new NameGenerator();

  it("should generate a two-word name by default", () => {
    const customGenerator = new NameGenerator({ separator: "." });
    const name = customGenerator.generate();
    expect(name.split(".")).toHaveLength(2);
  });

  it("should generate a tag with the correct pattern", () => {
    const customGenerator = new NameGenerator({ separator: "." });
    const name = customGenerator.generate("color-animal-verb");
    expect(name.split(".")).toHaveLength(3);
  });

  it("should use the custom separator", () => {
    const customGenerator = new NameGenerator({ separator: "_" });
    const name = customGenerator.generate();
    expect(name.includes("_")).toBe(true);
  });
});
