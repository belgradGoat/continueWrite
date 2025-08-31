import { SlashCommand } from "../../../index.js";

const DialogueCommand: SlashCommand = {
  name: "dialogue",
  description: "Improve dialogue to make it more natural and engaging",
  run: async function* ({ ide, history, params, contextItems }) {
    yield "I'll help you improve your dialogue to make it more natural and engaging!\n\n";
    yield "**Dialogue Enhancement Focus Areas:**\n";
    yield "- **Natural speech patterns** - Remove stiffness, add realistic interruptions and hesitations\n";
    yield "- **Character voice** - Ensure each character has a distinct way of speaking\n";
    yield "- **Subtext and tension** - What characters really mean vs. what they say\n";
    yield "- **Pacing and rhythm** - Vary sentence lengths, add beats and pauses\n";
    yield "- **Show don't tell** - Replace exposition with revealing dialogue\n";
    yield "- **Dialect and idioms** - Character-specific language and expressions\n";
    yield "- **Emotional authenticity** - Match dialogue to character's emotional state\n";
    yield "- **Action beats** - Integrate physical actions and reactions\n\n";
    
    const selectedText = contextItems?.[0]?.content;
    
    if (selectedText) {
      yield "I'll analyze your selected dialogue and suggest improvements to make it more:\n";
      yield "- Natural and believable\n";
      yield "- True to each character's voice\n";
      yield "- Emotionally resonant\n";
      yield "- Engaging for readers\n\n";
      yield "Share the dialogue you'd like me to improve!";
    } else {
      yield "Please provide the dialogue you'd like me to enhance, along with any context about:\n";
      yield "- The characters involved\n";
      yield "- The situation or scene\n";
      yield "- The emotional tone you're aiming for\n\n";
      yield "I'll help make your dialogue sparkle!";
    }
  },
};

export default DialogueCommand;