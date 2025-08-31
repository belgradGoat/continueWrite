import { SlashCommand } from "../../../index.js";

const DescribeCommand: SlashCommand = {
  name: "describe",
  description: "Add vivid descriptions to enhance your scenes",
  run: async function* ({ ide, history, params, contextItems }) {
    yield "I'll help you add vivid, sensory descriptions to enhance your writing!\n\n";
    yield "**Description Enhancement Areas:**\n";
    yield "- **Sensory details** - Sight, sound, smell, taste, and touch\n";
    yield "- **Atmosphere and mood** - Creating emotional resonance through setting\n";
    yield "- **Character appearance** - Physical features, clothing, and body language\n";
    yield "- **Setting and environment** - Places, weather, time of day, and ambiance\n";
    yield "- **Action and movement** - Dynamic descriptions of events and activities\n";
    yield "- **Emotional landscapes** - Internal feelings reflected in external descriptions\n";
    yield "- **Symbolic elements** - Objects and details that carry deeper meaning\n";
    yield "- **Pacing through description** - When to be detailed vs. concise\n\n";
    
    const selectedText = contextItems?.[0]?.content;
    
    if (selectedText) {
      yield "I'll enhance your selected text with rich, sensory descriptions that:\n";
      yield "- Immerse readers in the scene\n";
      yield "- Support the emotional tone\n";
      yield "- Advance the narrative\n";
      yield "- Avoid purple prose or over-description\n\n";
      yield "Let me know what aspect you'd like to describe more vividly!";
    } else {
      yield "Tell me what you'd like to describe:\n";
      yield "- A character's appearance or emotions?\n";
      yield "- A setting or location?\n";
      yield "- An action sequence or event?\n";
      yield "- An object with significance?\n\n";
      yield "I'll help you paint a vivid picture with words!";
    }
  },
};

export default DescribeCommand;