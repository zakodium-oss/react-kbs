import { MouseEvent, KeyboardEvent } from 'react';

const isMac = navigator.platform === 'MacIntel';

export function isMultiplatformCtrlKey(
  event: MouseEvent | KeyboardEvent,
): boolean {
  return isMac ? event.metaKey : event.ctrlKey;
}