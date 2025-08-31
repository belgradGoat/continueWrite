import { SlashCommand } from "../../../index.js";

const ContinueSceneCommand: SlashCommand = {
  name: "continue",
  description: "Continue the current scene or paragraph",
  run: async function* ({ ide, history, params, contextItems }) {
    yield "I'll help you continue this scene. Let me analyze the context and maintain the same style, tone, and voice.\n\n";
    
    // Get selected text if available
    const selectedText = contextItems?.[0]?.content;
    
    if (selectedText) {
      yield "Based on your selected text, I'll continue from where you left off, maintaining:\n";
      yield "- The same narrative voice and perspective\n";
      yield "- Consistent character voices and behaviors\n";
      yield "- The established tone and pacing\n";
      yield "- Proper scene progression and flow\n\n";
      yield "Please provide the text you'd like me to continue, and I'll seamlessly extend it.";
    } else {
      yield "Please select or provide the text you'd like me to continue. I'll maintain the same style and seamlessly extend your narrative.";
    }
  },
};

export default ContinueSceneCommand;