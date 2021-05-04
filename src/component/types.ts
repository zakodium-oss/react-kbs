import { KeyboardEvent } from 'react';

export interface KbsShortcut {
  key: string | string[];
  handler: (event: KeyboardEvent<HTMLDivElement>) => void;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
}
