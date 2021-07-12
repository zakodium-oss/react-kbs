import { KeyboardEvent } from 'react';

import { KbsKeyDefinition, KbsInternalShortcut } from '../types';

import { isMultiplatformCtrlKey } from './macInterop';

export interface Modifiers {
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
}

export function shortcutToKeys(shortcut: KbsInternalShortcut): string[] {
  return [
    ...shortcutObjectToKey(shortcut.shortcut),
    ...shortcut.aliases.map(shortcutObjectToKey).flat(),
  ];
}

export function shortcutObjectToKey(shortcut: KbsKeyDefinition) {
  const prefix = `key[${shortcut.key}]_ctrl[${boolToString(
    shortcut.ctrl,
  )}]_alt[${boolToString(shortcut.alt)}]`;
  if (typeof shortcut.shift === 'boolean') {
    return [`${prefix}_shift[${boolToString(shortcut.shift)}]`];
  } else {
    // If `shift` is not specified, allow it regardless of its state during the
    // event. This is to support any keyboard layout.
    return [`${prefix}_shift[true]`, `${prefix}_shift[false]`];
  }
}

export function eventToKey(
  event: KeyboardEvent<HTMLDivElement> | globalThis.KeyboardEvent,
): string {
  return `key[${event.key.toLowerCase()}]_ctrl[${boolToString(
    isMultiplatformCtrlKey(event),
  )}]_alt[${boolToString(event.altKey)}]_shift[${boolToString(
    event.shiftKey,
  )}]`;
}

function boolToString(bool?: boolean): string {
  return bool ? 'true' : 'false';
}
