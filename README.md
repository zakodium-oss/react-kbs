# react-kbs

React library to manage your application's keyboard shortcuts.

## Installation

```console
npm i react-kbs
```

## Documentation

### Shortcut definition

A shortcut is defined using an object with at least two fields: `shortcut` and `handler`.

- `handler` is the function that will be called when the shortcut is triggered.
- `shortcut` is definition of the key combination the must be used to trigger the shortcut. It can be:
  - a string defining the keyboard's key (case-insensitive)
  - an object of the form `{ key: string; ctrl?: boolean; shift?: boolean; alt?: boolean }`
  - an array of such strings and/or objects

There are some things to note about the behavior of shortcuts in `react-kbs`:

- On macOS, `ctrl` automatically maps to the `command` key. This means that if a
  shortcut is defined with `{ key: 's', ctrl: true }`, the `Ctrl+S` combination
  must be pressed on Linux and Windows, whereas `Cmd+S`must be pressed on macOS.
- By default, if the `shift` property is not specified, the state of the Shift key
  doesn't matter. In other words, the shortcut will be triggered with or without
  the Shift key being pressed.

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

Then, anywhere down the tree, you can call the `useKbsGlobal` hook to add global
shortcuts to the context:

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
the page is focused.

To setup local shortcuts call the `useKbs` hook and pass the value it returns as
props to the element for which you want to enable the shortcuts. The following
attributes will be set:

- `tabIndex={0}`: makes the element focusable
- `onKeyDown={handler}`: event handler
- `data-kbs-receiver={true}`: internal attribute necessary to differenciate from
  other focusable elements

```js
function MyComponent(props) {
  const shortcutProps = useKbs([
    {
      shortcut: 'delete',
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

### Disable global shortcuts

It may be useful in some cases to disable all global shortcuts (for example
when a dialog is open). To do this, you can call the `useKbsDisableGlobal` hook.

```js
import { useKbsDisableGlobal } from 'react-kbs';

function MyDialog({ open }) {
  useKbsDisableGlobal(open);
}
```

### Get the list of global shortcuts

To get the list of all currently defined global shortcuts, call the `useKbsGlobalList` hook.

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

`react-kbs` doesn't use the metadata object, which can have any shape. It can be
used to dynamically render a list with all shortcuts with documentation about them.

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
declare module 'react-kbs' {
  interface KbsMetadata {
    description: string;
  }
}
```
