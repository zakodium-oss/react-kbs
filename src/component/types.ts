import { KeyboardEvent } from 'react';

export interface KbsKeyDefinition {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
}

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
