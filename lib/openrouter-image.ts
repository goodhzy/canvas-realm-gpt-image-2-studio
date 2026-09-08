export interface OpenRouterInputReference {
  type: "image_url";
  image_url: { url: string };
}

export function openRouterImageEndpoint(baseUrl: string): string {
  const normalized = baseUrl.replace(/\/+$/, "");
  return normalized.endsWith("/images") ? normalized : `${normalized}/images`;
}

export function buildOpenRouterImageRequestBody(input: {
  model: string;
  prompt: string;
  quantity: number;
  size: string | null;
  inputReferences?: OpenRouterInputReference[];
}): Record<string, unknown> {
  const body: Record<string, unknown> = {
    model: input.model,
    prompt: input.prompt,
    n: input.quantity,
  };
  if (input.size) {
    body.size = input.size;
  }
  if (input.inputReferences && input.inputReferences.length > 0) {
    body.input_references = input.inputReferences;
  }
  return body;
}
