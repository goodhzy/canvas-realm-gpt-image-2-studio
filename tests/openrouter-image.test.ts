import { describe, expect, test } from "bun:test";
import {
  buildOpenRouterImageRequestBody,
  openRouterImageEndpoint,
  type OpenRouterInputReference,
} from "@/lib/openrouter-image";

describe("OpenRouter image API", () => {
  test("uses the dedicated unified image endpoint", () => {
    expect(openRouterImageEndpoint("https://openrouter.ai/api/v1")).toBe(
      "https://openrouter.ai/api/v1/images",
    );
    expect(openRouterImageEndpoint("https://openrouter.ai/api/v1/images/")).toBe(
      "https://openrouter.ai/api/v1/images",
    );
  });

  test("builds a text-to-image request without empty references", () => {
    expect(JSON.stringify(buildOpenRouterImageRequestBody({
      model: "openai/gpt-image-2",
      prompt: "一只橘猫",
      quantity: 1,
      size: "1024x1024",
      inputReferences: [],
    }))).toBe(JSON.stringify({
      model: "openai/gpt-image-2",
      prompt: "一只橘猫",
      n: 1,
      size: "1024x1024",
    }));
  });

  test("builds an image-to-image request with data URL references", () => {
    const inputReferences: OpenRouterInputReference[] = [
      {
        type: "image_url",
        image_url: { url: "data:image/png;base64,aGVsbG8=" },
      },
    ];

    expect(JSON.stringify(buildOpenRouterImageRequestBody({
      model: "openai/gpt-image-2",
      prompt: "改成水彩画",
      quantity: 2,
      size: null,
      inputReferences,
    }))).toBe(JSON.stringify({
      model: "openai/gpt-image-2",
      prompt: "改成水彩画",
      n: 2,
      input_references: inputReferences,
    }));
  });
});
