import { KbsInternalShortcut } from '../types';

import { shortcutToKeys } from './makeKey';

export function combineShortcuts(
  shortcuts: KbsInternalShortcut[],
): Record<string, KbsInternalShortcut> {
  const result: Record<string, KbsInternalShortcut> = {};
  for (const shortcut of shortcuts) {
    const keys = shortcutToKeys(shortcut);
    for (const key of keys) {
      if (result[key] !== undefined) {
        // eslint-disable-next-line no-console
        console.warn(
          `A global shortcut was already defined for key the combination ${key}. It will be overridden.`,
        );
      }
      result[key] = shortcut;
    }
  }
  return result;
}
