# Changelog

## [2.0.0](https://github.com/zakodium-oss/react-kbs/compare/v1.0.0...v2.0.0) (2022-05-04)


### ⚠ BREAKING CHANGES

* Shortcuts will now be executed when buttons, links, or otherwise non-interactive elements are focused.

### Features

* allow to execute shortcuts when buttons and other elements are focused ([fc1e182](https://github.com/zakodium-oss/react-kbs/commit/fc1e1823ace96f821cffe873dc8998865182fc90))

## [1.0.0](https://www.github.com/zakodium/react-kbs/compare/v0.1.3...v1.0.0) (2021-07-12)


### Features

* add useKbsGlobalList and refactor metadata ([9ec9244](https://www.github.com/zakodium/react-kbs/commit/9ec924423192766325b1b62925bd2b54643f78ac))


### Miscellaneous Chores

* prepare next release ([bc076dc](https://www.github.com/zakodium/react-kbs/commit/bc076dc3802485d2a7673f3231d15902bdbda03c))

### [0.1.3](https://www.github.com/zakodium/react-kbs/compare/v0.1.2...v0.1.3) (2021-05-06)


### Bug Fixes

* do not wrap global handler in a div ([b8afafc](https://www.github.com/zakodium/react-kbs/commit/b8afafcfcaef64d6c4173e6b549dbac7e6018ee5))

### [0.1.2](https://www.github.com/zakodium/react-kbs/compare/v0.1.1...v0.1.2) (2021-05-06)


### Bug Fixes

* include typings in distribution ([b79ad3d](https://www.github.com/zakodium/react-kbs/commit/b79ad3de3a2f7f9295d82b34d1f9bf15ca2b4b53))

### [0.1.1](https://www.github.com/zakodium/react-kbs/compare/v0.1.0...v0.1.1) (2021-05-06)


### Bug Fixes

* correctly check for event target ([bfe61a7](https://www.github.com/zakodium/react-kbs/commit/bfe61a7a55af0e8206b578e8865b490e8bc66e49))
* specify prepack script ([c7b841b](https://www.github.com/zakodium/react-kbs/commit/c7b841b4224e87a5fe8aef2a88bf6acd4b19d7a7)), closes [#4](https://www.github.com/zakodium/react-kbs/issues/4)
* support SSR builds ([940d18e](https://www.github.com/zakodium/react-kbs/commit/940d18e281da2108ef10b11ed104c376df5baa8e))

## 0.1.0 (2021-05-05)


### Features

* add hook for local shortcuts and do not restrict shift key by default ([aae3f57](https://www.github.com/zakodium/react-kbs/commit/aae3f570559167ba8edf14a93b436933f47454e5))
* add useKbsDisableGlobal hook ([7fd7e11](https://www.github.com/zakodium/react-kbs/commit/7fd7e11f6cd13fd6bc9e4c39b83f06efcf4df446))
* allow shortcuts to have a description ([d51c168](https://www.github.com/zakodium/react-kbs/commit/d51c16860d1c626f4b304f5fae80197af0c5e120))
* implement global shortcuts ([e791933](https://www.github.com/zakodium/react-kbs/commit/e791933de99a770bddf95fa9d2365fcd1652320d))
* warn if a global shortcut is defined twice ([be173c3](https://www.github.com/zakodium/react-kbs/commit/be173c3d9b29cf5ae484b874c67fc08afad6a64d))


### Bug Fixes

* only handle event if target is focusable div ([67e101f](https://www.github.com/zakodium/react-kbs/commit/67e101f6c7fa56c7ddebeb34bdd58f7fc71ef057))
