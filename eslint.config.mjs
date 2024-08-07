import react from 'eslint-config-zakodium/react';
import ts from 'eslint-config-zakodium/ts';
import unicorn from 'eslint-config-zakodium/unicorn';

export default [
  {
    ignores: ['build', 'dist', 'lib-cjs', 'lib-esm'],
  },
  ...ts,
  ...react,
  ...unicorn,
];
