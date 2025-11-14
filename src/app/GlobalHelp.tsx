/* eslint-disable react/no-array-index-key */

import type { KbsKeyDefinition, KbsShortcut } from '../component/index.ts';
import { useKbsDisableGlobal, useKbsGlobalList } from '../component/index.ts';

export default function GlobalHelp(props: { close: () => void }) {
  useKbsDisableGlobal();
  const shortcuts = useKbsGlobalList();
  return (
    <div
      className="absolute top-0 left-0 flex items-center w-screen h-screen bg-gray-500/70 flex-column"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          props.close();
        }
      }}
    >
      <div className="w-[350px] p-4 m-auto bg-white rounded-sm shadow-lg">
        <h1 className="text-lg font-semibold">Global shortcuts</h1>
        <ul className="mt-4">
          {shortcuts.map((shortcut, i) => (
            <li key={i}>
              <ShortcutItem shortcut={shortcut} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ShortcutItem({ shortcut }: { shortcut: KbsShortcut }) {
  return (
    <div className="p-1">
      <Key shortcut={shortcut.shortcut} />
      {shortcut.aliases.length > 0 && (
        <span className="ml-1">
          {'( aliase(s): '}
          {shortcut.aliases.map((alias, i) => (
            <Key key={i} shortcut={alias} />
          ))}
          {' )'}
        </span>
      )}
      {shortcut.meta?.description && (
        <span className="ml-2">{shortcut.meta.description}</span>
      )}
    </div>
  );
}

function Key({ shortcut }: { shortcut: KbsKeyDefinition }) {
  return (
    <kbd className="py-0.5 px-2 bg-gray-200 rounded-lg shadow-inner">
      {shortcut.ctrl && 'ctrl '}
      {shortcut.shift && 'shift '}
      {shortcut.alt && 'alt '}
      {'key' in shortcut ? shortcut.key : shortcut.code}
    </kbd>
  );
}
