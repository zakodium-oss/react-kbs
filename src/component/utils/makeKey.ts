import { KeyboardEvent } from 'react';

import { KbsDefinition, KbsKeyDefinition } from '../types';

import { isMultiplatformCtrlKey } from './macInterop';

interface Modifiers {
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
}

const defaultModifiers: Modifiers = {
  ctrl: false,
  shift: undefined,
  alt: false,
};

export function shortcutToKeys(shortcut: KbsDefinition): string[] {
  if (typeof shortcut.shortcut === 'string') {
    return shortcutElementToKey(shortcut.shortcut, defaultModifiers);
  } else if (Array.isArray(shortcut.shortcut)) {
    return shortcut.shortcut.flatMap(shortcutObjectToKey);
  } else {
    return shortcutObjectToKey(shortcut.shortcut);
  }
}

function shortcutObjectToKey(shortcut: string | KbsKeyDefinition) {
  return typeof shortcut === 'string'
    ? shortcutElementToKey(shortcut, defaultModifiers)
    : shortcutElementToKey(shortcut.key, shortcut);
}

export function shortcutElementToKey(shortcut: string, modifiers: Modifiers) {
  const prefix = `key[${shortcut.toLowerCase()}]_ctrl[${boolToString(
    modifiers.ctrl,
  )}]_alt[${boolToString(modifiers.alt)}]`;
  if (typeof modifiers.shift === 'boolean') {
    return [`${prefix}_shift[${boolToString(modifiers.shift)}]`];
  } else {
    // If `shift` is not specified, allow it regardless of its state during the
    // event. This is to support any keyboard layout.
    return [`${prefix}_shift[true]`, `${prefix}_shift[false]`];
  }
}

export function eventToKey(event: KeyboardEvent<HTMLDivElement>): string {
  return `key[${event.key.toLowerCase()}]_ctrl[${boolToString(
    isMultiplatformCtrlKey(event),
  )}]_alt[${boolToString(event.altKey)}]_shift[${boolToString(
    event.shiftKey,
  )}]`;
}

function boolToString(bool?: boolean): string {
  return bool ? 'true' : 'false';
}
