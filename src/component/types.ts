import { KeyboardEvent } from 'react';

export interface KbsShortcutKey {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
}

export interface KbsShortcut {
  shortcut: string | KbsShortcutKey | Array<string | KbsShortcutKey>;
  handler: (event: KeyboardEvent<HTMLDivElement>) => void;
}
