import { KeyboardEvent } from 'react';

export interface KbsKeyDefinition {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
}

export interface KbsDefinition {
  shortcut: string | KbsKeyDefinition | Array<string | KbsKeyDefinition>;
  handler: (event: KeyboardEvent<HTMLDivElement>) => void;
}
