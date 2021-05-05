import { KbsShortcut } from '../types';

import { shortcutToKeys } from './makeKey';

export function combineShortcuts(
  allShortcuts: KbsShortcut[][],
): Record<string, KbsShortcut> {
  const result: Record<string, KbsShortcut> = {};
  for (const shortcuts of allShortcuts) {
    for (const shortcut of shortcuts) {
      const keys = shortcutToKeys(shortcut);
      for (const key of keys) {
        if (result[key] !== undefined) {
          // eslint-disable-next-line no-console
          console.warn(
            `A global shortcut was already defined for key the combination ${key}. It will be overriden.`,
          );
        }
        result[key] = shortcut;
      }
    }
  }
  return result;
}
