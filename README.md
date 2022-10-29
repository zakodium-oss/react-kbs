# react-kbs

React library to manage your application's keyboard shortcuts.

<h3 align="center">

  <a href="https://www.zakodium.com">
    <img src="https://www.zakodium.com/brand/zakodium-logo-white.svg" width="50" alt="Zakodium logo" />
  </a>

  <p>
    Maintained by <a href="https://www.zakodium.com">Zakodium</a>
  </p>
  
  [![NPM version][npm-image]][npm-url]
  [![build status][ci-image]][ci-url]
  [![npm download][download-image]][download-url]

</h3>

## Installation

```console
npm i react-kbs
```

## Demo

https://zakodium-oss.github.io/react-kbs/

## Documentation

### Shortcut definition

A shortcut is defined using an object with at least two fields: `shortcut` and `handler`.

- `shortcut` is a definition of the key combination that must be used to trigger the shortcut. It can be:
  - a string defining the keyboard's key (case-insensitive). Example: `'a'`.
  - an object of the form `{ key: string; ctrl?: boolean; shift?: boolean; alt?: boolean }`. Example: `{ key: 's', ctrl: true }`.
  - an object of the form `{ code: string; ctrl?: boolean; shift?: boolean; alt?: boolean }`. Example: `{ code: 'Digit1', shift: true }`.
  - an array of such strings and/or objects. This allows to define aliases for the same handler. Example: `['/', { key: 'k', ctrl: true }]`
- `handler` is the function that will be called when the shortcut is triggered.

Use [`key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) when you want to refer to the character written by typing on the key
and [`code`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code) when you want to use the physical key code (e.g. `Digit1` for the `1` key).

There are some things to note about the behavior of shortcuts in `react-kbs`:

- On macOS, `ctrl` automatically maps to the `command` key. This means that if a
  shortcut is defined with `{ key: 's', ctrl: true }`, the `Ctrl+S` combination
  must be pressed on Linux and Windows, whereas `Cmd+S`must be pressed on macOS.
- By default, if the `shift` property is not specified, the state of the Shift key
  doesn't matter. In other words, the shortcut will be triggered with or without
  the Shift key being pressed. This is in order to make the shortcuts case-insensitive
  and to support any keyboard layout (the need to press Shift for some keys depend
  on the user's layout).

### Global shortcuts

Global shortcuts are shortcuts that are active anywhere on the page, as long as
no specific element has the focus.

To setup global shortcuts, you need to render the `KbsProvider` component high
in your React component tree:

```js
import { KbsProvider } from 'react-kbs';

export default function App() {
  return (
    <KbsProvider>
      <SubComponent />
    </KbsProvider>
  );
}
```

Then, anywhere down the tree, you can call the `useKbsGlobal` hook with an array
of [shortcut definitions](#shortcut-definition) to add global shortcuts to the context:

```js
import { useKbsGlobal } from 'react-kbs';

export function MyComponent() {
  const [counter, setCounter] = useState(0);
  useKbsGlobal([
    {
      shortcut: 'i',
      handler() {
        setCounter((current) => current + 1);
      },
    },
    {
      shortcut: 'd',
      handler() {
        setCounter((current) => current - 1);
      },
    },
  ]);

  return <div>Count: {counter}</div>;
}
```

### Local shortcuts

Local shortcuts are shortcuts that are only active when a specific element on
the page, or one of its children, is focused.

It is possible to nest such elements. In that case, the first shortcut definition
that matches the user input will apply.

To setup local shortcuts, call the `useKbs` hook with an array of
[shortcut definitions](#shortcut-definition) and pass the value it returns
as props to the element for which you want to enable the shortcuts. The following
attributes will be set:

- `tabIndex={0}`: makes the element focusable
- `onKeyDown={handler}`: event handler

```js
function MyComponent(props) {
  const shortcutProps = useKbs([
    {
      shortcut: ['delete', 'backspace'],
      handler: props.onDelete,
    },
  ]);

  return (
    <div {...shortcutProps}>
      <SomeContent />
    </div>
  );
}
```

### Effect of focus on keyboard shortcuts

When no particular element is focused, global shortcuts take effect.  
When simple focusable elements (buttons, links, elements that have a `tabindex`),
are focused, global or local shortcuts will usually be triggered, unless one of
the following conditions applies:

- The element is an HTML `<input>`, `<textarea>`, or `<select>`.
- The element is [`contenteditable`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable).
- The element has the `data-kbs-ignore` attribute.

### Disable global shortcuts

It may be useful in some cases to disable all global shortcuts (for example
when a dialog is open). To do this, call the `useKbsDisableGlobal` hook:

```js
import { useKbsDisableGlobal } from 'react-kbs';

function MyDialog({ open }) {
  useKbsDisableGlobal(open);
}
```

### Get the list of global shortcuts

To get the list of all currently defined global shortcuts, call the
`useKbsGlobalList` hook:

```js
import { useKbsGlobalList } from 'react-kbs';

function MyComponent() {
  const shortcuts = useKbsGlobalList();

  return <ShortcutHelp shortcuts={shortcuts} />;
}
```

### Shortcut metadata

It is possible to pass optional metadata with each shortcut in the `meta` field.
The metadata will then be available in the objects returned by `useKbsGlobalList()`.

`react-kbs` doesn't use the metadata object, which can have any shape. A common
use case is to dynamically render a list with all shortcuts and documentation
about them.

```js
useKbsGlobal([
  {
    shortcut: 'delete',
    handler: handleDelete,
    meta: {
      description: 'Delete the selected element',
    },
  },
]);
```

If using TypeScript, you will have to define the shape of the `meta` object
to suit your needs:

```ts
import 'react-kbs';

declare module 'react-kbs' {
  interface KbsMetadata {
    description: string;
  }
}
```

[npm-image]: https://img.shields.io/npm/v/react-kbs.svg
[npm-url]: https://npmjs.org/package/react-kbs
[ci-image]: https://github.com/zakodium-oss/react-kbs/workflows/Node.js%20CI/badge.svg?branch=main
[ci-url]: https://github.com/zakodium-oss/react-kbs/actions?query=workflow%3A%22Node.js+CI%22
[download-image]: https://img.shields.io/npm/dm/react-kbs.svg
[download-url]: https://npmjs.org/package/react-kbs
