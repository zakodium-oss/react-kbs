import type {
  KeyboardEvent as ReactKeyboardEvent,
  MutableRefObject,
} from 'react';
import { useRef } from 'react';

import type { KbsInternalShortcut } from '../types.ts';

import { eventToKeyOrCode } from './make_key.ts';
import { shouldIgnoreElement } from './should_ignore_element.ts';

export interface LastTriggerData {
  keyOrCode: string;
  timestamp: number;
}

export function useLastTriggerRef() {
  return useRef<LastTriggerData>({ keyOrCode: '', timestamp: 0 });
}

export function getKeyDownHandler(
  lastTrigger: MutableRefObject<LastTriggerData>,
  combinedShortcuts: Record<string, KbsInternalShortcut>,
) {
  return function handleKeyDown(
    event: KeyboardEvent | ReactKeyboardEvent<HTMLDivElement>,
  ) {
    if (shouldIgnoreElement(event.target as HTMLElement)) {
      return;
    }
    const { key, code } = eventToKeyOrCode(event);
    let keyOrCode;
    let shortcut;
    if (combinedShortcuts[key]) {
      shortcut = combinedShortcuts[key];
      keyOrCode = key;
    } else {
      shortcut = combinedShortcuts[code];
      keyOrCode = code;
    }
    if (shortcut) {
      event.stopPropagation();
      event.preventDefault();

      if (shortcut.maxFrequency > 0) {
        const now = performance.now();
        if (
          event.repeat &&
          lastTrigger.current.keyOrCode === keyOrCode &&
          now - lastTrigger.current.timestamp < 1000 / shortcut.maxFrequency
        ) {
          return;
        }
        lastTrigger.current = { keyOrCode, timestamp: now };
      }

      shortcut.handler(event);
    }
  };
}
