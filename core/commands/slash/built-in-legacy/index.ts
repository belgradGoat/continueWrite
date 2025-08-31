import {
  SlashCommand,
  SlashCommandDescription,
  SlashCommandWithSource,
} from "../../..";
import BrainstormCommand from "./brainstorm";
import CharacterCommand from "./character";
import ContinueSceneCommand from "./continue-scene";
import DescribeCommand from "./describe";
import DialogueCommand from "./dialogue";
import HttpSlashCommand from "./http";
import OnboardSlashCommand from "./onboard";
import OutlineCommand from "./outline";
import ShareSlashCommand from "./share";

const LegacyBuiltInSlashCommands: SlashCommand[] = [
  ContinueSceneCommand,
  BrainstormCommand,
  CharacterCommand,
  OutlineCommand,
  DialogueCommand,
  DescribeCommand,
  ShareSlashCommand,
  HttpSlashCommand,
  OnboardSlashCommand,
];

export function getLegacyBuiltInSlashCommandFromDescription(
  desc: SlashCommandDescription,
): SlashCommandWithSource | undefined {
  const cmd = LegacyBuiltInSlashCommands.find((cmd) => cmd.name === desc.name);
  if (!cmd) {
    return undefined;
  }
  return {
    ...cmd,
    params: desc.params,
    description: desc.description ?? cmd.description,
    source: "built-in-legacy",
  };
}
