const inputElements = new Set(['INPUT', 'TEXTAREA', 'SELECT']);

export function shouldIgnoreElement(element: HTMLElement): boolean {
  return (
    inputElements.has(element.tagName) ||
    element.isContentEditable ||
    Object.hasOwn(element.dataset, 'kbsIgnore')
  );
}
