import type { KeyboardEvent, MouseEvent } from 'react';

const isApple =
  typeof navigator !== 'undefined' &&
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  (navigator.platform.startsWith('Mac') || navigator.platform === 'iPhone');

export function isMultiplatformCtrlKey(
  event: MouseEvent | KeyboardEvent | globalThis.KeyboardEvent,
): boolean {
  return isApple ? event.metaKey : event.ctrlKey;
}
