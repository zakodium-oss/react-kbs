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
  /**
   * The definition of key(s) that will trigger the shortcut.
   */
  shortcut: string | KbsKeyDefinition | Array<string | KbsKeyDefinition>;
  /**
   * The handler function to call when the shortcut is triggered.
   */
  handler: KbsHandler;
  /**
   * Optional metadata to store with the shortcut.
   */
  meta?: KbsMetadata;
  /**
   * If specified, the shortcut will be triggered at most `maxFrequency` times
   * per second when a key is held down.
   */
  maxFrequency?: number;
}

export interface KbsShortcut {
  shortcut: KbsKeyDefinition;
  aliases: KbsKeyDefinition[];
  meta?: KbsMetadata;
}

export interface KbsInternalShortcut extends KbsShortcut {
  handler: KbsHandler;
  maxFrequency: number;
}
