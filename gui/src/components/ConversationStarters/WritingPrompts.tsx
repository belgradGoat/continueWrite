import { useState } from "react";
import { useMainEditor } from "../mainInput/TipTapEditor";

const writingPrompts = [
  {
    title: "Start a Scene",
    description: "Help me write a compelling opening scene",
    prompt: "I need help writing an engaging opening scene. Here's what I have in mind..."
  },
  {
    title: "Develop Character", 
    description: "Create a detailed character backstory",
    prompt: "I want to develop a character for my story. Help me create their backstory, personality, and motivations..."
  },
  {
    title: "Plot Development",
    description: "Brainstorm plot twists and story directions", 
    prompt: "I'm working on a story and need help with plot development. Here's my current plot..."
  },
  {
    title: "Improve Dialogue",
    description: "Make conversations more natural and engaging",
    prompt: "I have some dialogue that feels stiff. Can you help me make it more natural and engaging?"
  },
  {
    title: "Setting Description",
    description: "Create vivid, immersive settings",
    prompt: "Help me describe a setting in vivid detail. I want to create an immersive scene..."
  }
];

const NUM_CARDS_TO_RENDER = 5;

/**
 * Displays a grid of writing-focused conversation starter cards
 */
export function WritingPrompts() {
  const { mainEditor } = useMainEditor();
  const [showAll, setShowAll] = useState(false);

  function onClick(prompt: typeof writingPrompts[0]) {
    mainEditor?.commands.insertPrompt({
      description: prompt.description,
      title: prompt.title,
      content: prompt.prompt,
    });
  }

  const visiblePrompts = showAll
    ? writingPrompts
    : writingPrompts.slice(0, NUM_CARDS_TO_RENDER);

  const remainingCount = writingPrompts.length - NUM_CARDS_TO_RENDER;

  return (
    <div className="flex w-full max-w-full flex-col">
      <div className="lg:grid lg:grid-cols-3 lg:gap-4">
        {visiblePrompts.map((prompt, i) => (
          <div
            key={prompt.title + i}
            className="border-lightgray mb-2 cursor-pointer rounded-lg border p-3 hover:bg-gray-50 dark:hover:bg-gray-800"
            onClick={() => onClick(prompt)}
          >
            <h3 className="text-maintext mb-1 text-sm font-semibold">
              {prompt.title}
            </h3>
            <p className="text-lightgray text-xs">
              {prompt.description}
            </p>
          </div>
        ))}
      </div>
      {writingPrompts.length > NUM_CARDS_TO_RENDER && (
        <span
          className="text-lightgray mt-1 cursor-pointer text-xs hover:underline"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show less" : `Show ${remainingCount} more...`}
        </span>
      )}
    </div>
  );
}