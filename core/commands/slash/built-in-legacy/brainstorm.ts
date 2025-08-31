import { SlashCommand } from "../../../index.js";

const BrainstormCommand: SlashCommand = {
  name: "brainstorm",
  description: "Generate creative ideas for your writing",
  run: async function* ({ ide, history, params, contextItems }) {
    yield "I'll help you brainstorm creative ideas! What would you like to explore?\n\n";
    yield "I can help with:\n";
    yield "- **Plot ideas and story concepts** - Unique twists, compelling conflicts, and engaging storylines\n";
    yield "- **Character backgrounds and motivations** - Complex personalities, believable goals, and character arcs\n";
    yield "- **Setting and world-building** - Immersive environments, cultural details, and atmospheric descriptions\n";
    yield "- **Conflict and tension** - Internal struggles, external obstacles, and dramatic stakes\n";
    yield "- **Themes and symbolism** - Deeper meanings, recurring motifs, and thematic elements\n";
    yield "- **Dialogue and voice** - Authentic speech patterns, subtext, and character-specific language\n";
    yield "- **Scene and chapter ideas** - Key moments, transitions, and narrative structure\n\n";
    
    const selectedText = contextItems?.[0]?.content;
    
    if (selectedText) {
      yield "Based on your selected text, I can brainstorm ideas that build upon your existing work. ";
      yield "Let me know what specific aspect you'd like to explore further!";
    } else {
      yield "Share your current project details or writing challenge, and I'll generate creative ideas to help inspire your work!";
    }
  },
};

export default BrainstormCommand;