import { KeyboardEvent } from 'react';

import { KbsShortcut, KbsShortcutKey } from '../types';

import { isMultiplatformCtrlKey } from './macInterop';

interface Modifiers {
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
}

const defaultModifiers: Modifiers = {
  ctrl: false,
  shift: false,
  alt: false,
};

export function shortcutToKeys(shortcut: KbsShortcut): string[] {
  if (typeof shortcut.shortcut === 'string') {
    return [shortcutElementToKey(shortcut.shortcut, defaultModifiers)];
  } else if (Array.isArray(shortcut.shortcut)) {
    return shortcut.shortcut.map(shortcutObjectToKey);
  } else {
    return [shortcutObjectToKey(shortcut.shortcut)];
  }
}

function shortcutObjectToKey(shortcut: string | KbsShortcutKey) {
  return typeof shortcut === 'string'
    ? shortcutElementToKey(shortcut, defaultModifiers)
    : shortcutElementToKey(shortcut.key, shortcut);
}

export function shortcutElementToKey(shortcut: string, modifiers: Modifiers) {
  return `key[${shortcut.toLowerCase()}]_ctrl[${boolToString(
    modifiers.ctrl,
  )}]_alt[${boolToString(modifiers.alt)}]_shift[${boolToString(
    modifiers.shift,
  )}]`;
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
