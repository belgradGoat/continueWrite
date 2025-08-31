import { SlashCommand } from "../../../index.js";

const OutlineCommand: SlashCommand = {
  name: "outline",
  description: "Create a structured outline for your story or chapter",
  run: async function* ({ ide, history, params, contextItems }) {
    yield "I'll help you create a structured outline for your writing project!\n\n";
    yield "**Outline Options:**\n";
    yield "- **Story outline** - Complete narrative structure with acts, plot points, and resolution\n";
    yield "- **Chapter outline** - Scene-by-scene breakdown with key events and transitions\n";
    yield "- **Character journey** - Track character development throughout the story\n";
    yield "- **Plot structure** - Three-act structure, Hero's Journey, or other frameworks\n";
    yield "- **Scene outline** - Detailed breakdown of a specific scene's progression\n";
    yield "- **Series outline** - Multi-book story arc and overarching themes\n\n";
    
    const selectedText = contextItems?.[0]?.content;
    
    if (selectedText) {
      yield "Based on your selected content, I can create an outline that expands on these ideas or structures the narrative around them.\n\n";
      yield "What type of outline would you like me to create?";
    } else {
      yield "Tell me about your writing project:\n";
      yield "- What's the genre and target audience?\n";
      yield "- What's the basic premise or concept?\n";
      yield "- Do you have any key plot points or scenes in mind?\n\n";
      yield "I'll create a detailed outline to guide your writing!";
    }
  },
};

export default OutlineCommand;