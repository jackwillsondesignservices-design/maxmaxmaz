import { describe, expect, it } from "vitest";
import { validateEnquiry } from "./enquiry";

const valid = {
  name: "Alex Morgan",
  email: "alex@example.com",
  topic: "energy",
  message: "I would like to ask about insulation.",
};

describe("contact enquiry validation", () => {
  it("accepts a complete enquiry", () => {
    expect(validateEnquiry(valid).ok).toBe(true);
  });

  it("requires a name", () => {
    const r = validateEnquiry({ ...valid, name: "   " });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.name).toBeDefined();
  });

  it("rejects a malformed email address", () => {
    const r = validateEnquiry({ ...valid, email: "alex@example" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.email).toBeDefined();
  });

  it("requires one of the five enquiry topics", () => {
    const r = validateEnquiry({ ...valid, topic: "" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.topic).toBeDefined();
  });

  it("requires a message", () => {
    const r = validateEnquiry({ ...valid, message: "" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.message).toBeDefined();
  });
});
