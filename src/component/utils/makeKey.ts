import { KeyboardEvent } from 'react';

import { KbsInternalShortcut, KbsKeyDefinition } from '../types';

import { isMultiplatformCtrlKey } from './macInterop';

export interface Modifiers {
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
}

export function shortcutToKeys(shortcut: KbsInternalShortcut): string[] {
  return [
    ...shortcutObjectToKey(shortcut.shortcut),
    ...shortcut.aliases.flatMap(shortcutObjectToKey),
  ];
}

export function shortcutObjectToKey(shortcut: KbsKeyDefinition) {
  const modifiers = `ctrl[${boolToString(shortcut.ctrl)}]_alt[${boolToString(
    shortcut.alt,
  )}]`;

  let prefix: string;
  if ('key' in shortcut) {
    prefix = `key[${shortcut.key}]_${modifiers}`;
  } else {
    prefix = `code[${shortcut.code}]_${modifiers}`;
  }

  if (typeof shortcut.shift === 'boolean') {
    return [`${prefix}_shift[${boolToString(shortcut.shift)}]`];
  } else {
    // If `shift` is not specified, allow it regardless of its state during the
    // event. This is to support any keyboard layout.
    return [`${prefix}_shift[true]`, `${prefix}_shift[false]`];
  }
}

export function eventToKeyOrCode(
  event: KeyboardEvent<HTMLDivElement> | globalThis.KeyboardEvent,
): { key: string; code: string } {
  const modifiers = `ctrl[${boolToString(
    isMultiplatformCtrlKey(event),
  )}]_alt[${boolToString(event.altKey)}]_shift[${boolToString(
    event.shiftKey,
  )}]`;
  return {
    key: `key[${event.key.toLowerCase()}]_${modifiers}`,
    code: `code[${event.code.toLowerCase()}]_${modifiers}`,
  };
}

function boolToString(bool?: boolean): string {
  return bool ? 'true' : 'false';
}
