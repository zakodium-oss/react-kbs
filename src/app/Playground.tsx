import { Link } from 'react-router-dom';

export default function Playground() {
  return (
    <div className="p-1">
      <h2 className="my-2">
        Try to use the shortcuts while one of the following elements is focused:
      </h2>
      <div className="grid grid-cols-2 gap-1">
        <div>Button</div>
        <button
          className="p-1 border-2 border-blue-500 bg-blue-200 rounded focus:ring focus:outline-none"
          type="button"
        >
          Button
        </button>

        <div>Link (a)</div>
        <Link to="" className="underline focus:ring focus:outline-none">
          Link
        </Link>

        <div>Input</div>
        <input
          type="text"
          className="p-1 border border-blue-400 rounded focus:ring focus:outline-none"
        />

        <div>Textarea</div>
        <textarea className="p-1 border border-blue-400 rounded focus:ring focus:outline-none" />

        <div>Select</div>
        <select className="p-1 border border-blue-400 rounded focus:ring focus:outline-none" />

        <div>Div contenteditable</div>
        <div
          contentEditable="true"
          className="p-1 border border-blue-400 rounded focus:ring focus:outline-none"
        />

        <div>Div with tabindex</div>
        <div
          tabIndex={0}
          className="p-1 border border-blue-400 rounded focus:ring focus:outline-none"
        />

        <div>Div with tabindex and data-kbs-ignore</div>
        <div
          tabIndex={0}
          data-kbs-ignore
          className="p-1 border border-blue-400 rounded focus:ring focus:outline-none"
        />
      </div>
    </div>
  );
}
