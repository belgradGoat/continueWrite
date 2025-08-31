import { SlashCommand } from "../../../index.js";

const CharacterCommand: SlashCommand = {
  name: "character",
  description: "Develop character backstories and personalities",
  run: async function* ({ ide, history, params, contextItems }) {
    yield "I'll help you develop compelling characters! I can assist with:\n\n";
    yield "**Character Development Areas:**\n";
    yield "- **Backstory and history** - Formative experiences, family background, and life events\n";
    yield "- **Personality traits** - Core characteristics, quirks, habits, and mannerisms\n";
    yield "- **Motivations and goals** - What drives them, their desires, fears, and ambitions\n";
    yield "- **Character arc** - How they change throughout the story, growth and transformation\n";
    yield "- **Relationships** - Connections with other characters, conflicts, and alliances\n";
    yield "- **Voice and dialogue** - Speech patterns, vocabulary, and communication style\n";
    yield "- **Physical description** - Appearance, body language, and distinctive features\n";
    yield "- **Internal conflicts** - Moral dilemmas, contradictions, and inner struggles\n\n";
    
    const selectedText = contextItems?.[0]?.content;
    
    if (selectedText) {
      yield "I see you have some character information selected. I can help expand on this character or develop relationships with other characters in your story.\n\n";
      yield "What aspect of this character would you like to develop further?";
    } else {
      yield "Share details about your character - their name, role in the story, or any initial ideas you have. ";
      yield "I'll help you create a rich, three-dimensional character that will engage your readers!";
    }
  },
};

export default CharacterCommand;