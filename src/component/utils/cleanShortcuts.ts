import { KbsDefinition, KbsKeyDefinition, KbsInternalShortcut } from '../types';

import { Modifiers } from './makeKey';

const defaultModifiers: Modifiers = {
  ctrl: false,
  shift: undefined,
  alt: false,
};

export function cleanShortcuts(
  inputs: KbsDefinition[][],
): KbsInternalShortcut[] {
  const result: KbsInternalShortcut[] = [];
  for (const input of inputs) {
    for (const definition of input) {
      const [main, ...aliases] = shortcutToObjects(definition.shortcut);
      result.push({
        shortcut: main,
        aliases,
        handler: definition.handler,
        meta: definition.meta,
      });
    }
  }
  return result;
}

function shortcutToObjects(
  shortcut: string | KbsKeyDefinition | Array<string | KbsKeyDefinition>,
): KbsKeyDefinition[] {
  if (typeof shortcut === 'string') {
    return [{ ...defaultModifiers, key: shortcut.toLowerCase() }];
  } else if (Array.isArray(shortcut)) {
    return shortcut.map((shortcut) => {
      if (typeof shortcut === 'string') {
        return { ...defaultModifiers, key: shortcut.toLowerCase() };
      } else {
        return {
          ...defaultModifiers,
          ...shortcut,
          key: shortcut.key.toLowerCase(),
        };
      }
    });
  } else {
    return [
      { ...defaultModifiers, ...shortcut, key: shortcut.key.toLowerCase() },
    ];
  }
}
