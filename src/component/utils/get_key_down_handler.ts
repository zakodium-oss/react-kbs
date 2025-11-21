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

function parseEvent(
  event: KeyboardEvent | ReactKeyboardEvent<HTMLDivElement>,
  combinedShortcuts: Record<string, KbsInternalShortcut>,
) {
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

  return { keyOrCode, shortcut };
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

    const { keyOrCode, shortcut } = parseEvent(event, combinedShortcuts);
    if (!shortcut) return;

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

    const cleanup = shortcut.handler(event);
    if (!cleanup) return;

    const handleKeyUp = (
      event: KeyboardEvent | ReactKeyboardEvent<HTMLDivElement>,
    ) => {
      if (shouldIgnoreElement(event.target as HTMLElement)) return;
      const { shortcut } = parseEvent(event, combinedShortcuts);
      if (!shortcut) return;

      document.body.removeEventListener('keyup', handleKeyUp);
      cleanup(event);
    };

    document.body.addEventListener('keyup', handleKeyUp);
  };
}
