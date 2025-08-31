import { AssistantUnrolled } from "@continuedev/config-yaml";

// TODO
export const defaultConfigYaml: AssistantUnrolled = {
  models: [
    {
      provider: "anthropic",
      name: "Claude 3.5 Sonnet",
      model: "claude-3-5-sonnet-20241022"
    }
  ],
  context: [
    { provider: "file", name: "file" },
    { provider: "folder", name: "folder" },
    { provider: "search", name: "search" }
  ],
  name: "Creative Writing Assistant",
  version: "1.0.0",
  schema: "v1",
};

export const defaultConfigYamlJetBrains: AssistantUnrolled = {
  models: [
    {
      provider: "anthropic",
      name: "Claude 3.5 Sonnet",
      model: "claude-3-5-sonnet-20241022"
    }
  ],
  context: [
    { provider: "file", name: "file" },
    { provider: "folder", name: "folder" },
    { provider: "search", name: "search" }
  ],
  name: "Creative Writing Assistant",
  version: "1.0.0",
  schema: "v1",
};
