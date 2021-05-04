import { KeyboardEvent } from 'react';

import { KbsShortcut } from '../types';

import { isMultiplatformCtrlKey } from './macInterop';

export function shortcutToKeys(shortcut: KbsShortcut): string[] {
  const keyEnd = `ctrl[${boolToString(shortcut.ctrl)}]_alt[${boolToString(
    shortcut.alt,
  )}]_shift[${boolToString(shortcut.shift)}]`;
  if (typeof shortcut.key === 'string') {
    return [`key[${shortcut.key.toLowerCase()}]_${keyEnd}`];
  } else {
    return shortcut.key.map((key) => `key[${key.toLowerCase()}]_${keyEnd}`);
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
