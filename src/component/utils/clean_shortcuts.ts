import type {
  KbsDefinition,
  KbsInternalShortcut,
  KbsKeyDefinition,
} from '../types.ts';

import type { Modifiers } from './make_key.ts';

const defaultModifiers: Modifiers = {
  ctrl: false,
  shift: undefined,
  alt: false,
};

export function cleanShortcuts(
  inputs: ReadonlyArray<readonly KbsDefinition[]>,
): readonly KbsInternalShortcut[] {
  const result: KbsInternalShortcut[] = [];
  for (const input of inputs) {
    for (const definition of input) {
      const [main, ...aliases] = shortcutToObjects(definition.shortcut);
      result.push({
        shortcut: main as KbsKeyDefinition,
        aliases,
        handler: definition.handler,
        meta: definition.meta,
        maxFrequency: definition.maxFrequency ?? 0,
      });
    }
  }
  return result;
}

function shortcutToObjects(
  shortcut:
    | string
    | KbsKeyDefinition
    | ReadonlyArray<string | KbsKeyDefinition>,
): readonly KbsKeyDefinition[] {
  if (typeof shortcut === 'string') {
    return [{ ...defaultModifiers, key: shortcut.toLowerCase() }];
  } else if (
    // Cannot use `Array.isArray` because it does not narrow `ReadonlyArray` (<https://github.com/microsoft/TypeScript/issues/17002>)
    'map' in shortcut
  ) {
    return shortcut.map((shortcut) => {
      if (typeof shortcut === 'string') {
        return { ...defaultModifiers, key: shortcut.toLowerCase() };
      } else if ('key' in shortcut) {
        return {
          ...defaultModifiers,
          ...shortcut,
          key: shortcut.key.toLowerCase(),
        };
      } else {
        return {
          ...defaultModifiers,
          ...shortcut,
          code: shortcut.code.toLowerCase(),
        };
      }
    });
  } else if ('key' in shortcut) {
    return [
      { ...defaultModifiers, ...shortcut, key: shortcut.key.toLowerCase() },
    ];
  } else {
    return [
      { ...defaultModifiers, ...shortcut, code: shortcut.code.toLowerCase() },
    ];
  }
}
