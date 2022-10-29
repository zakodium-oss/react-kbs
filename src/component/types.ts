import { KeyboardEvent } from 'react';

export interface KbsKeyDefinitionModifiers {
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
}

export interface KbsKeyDefinitionKey extends KbsKeyDefinitionModifiers {
  key: string;
}

export interface KbsKeyDefinitionCode extends KbsKeyDefinitionModifiers {
  code: string;
}

export type KbsKeyDefinition = KbsKeyDefinitionKey | KbsKeyDefinitionCode;

export type KbsHandler = (
  event: KeyboardEvent<HTMLDivElement> | globalThis.KeyboardEvent,
) => void;

/**
 * Extend this interface to customize the metadata type.
 */
export interface KbsMetadata {}

export interface KbsDefinition {
  shortcut: string | KbsKeyDefinition | Array<string | KbsKeyDefinition>;
  handler: KbsHandler;
  meta?: KbsMetadata;
}

export interface KbsShortcut {
  shortcut: KbsKeyDefinition;
  aliases: KbsKeyDefinition[];
  meta?: KbsMetadata;
}

export interface KbsInternalShortcut extends KbsShortcut {
  handler: KbsHandler;
}
