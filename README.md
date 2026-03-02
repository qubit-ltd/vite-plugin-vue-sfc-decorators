# @qubit-ltd/vite-plugin-vue-sfc-decorators

[![npm package](https://img.shields.io/npm/v/@qubit-ltd/vite-plugin-vue-sfc-decorators.svg)](https://npmjs.com/package/@qubit-ltd/vite-plugin-vue-sfc-decorators)
[![License](https://img.shields.io/badge/License-Apache-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)
[![中文文档](https://img.shields.io/badge/文档-中文版-blue.svg)](README.zh_CN.md)
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/qubit-ltd/vite-plugin-vue-sfc-decorators/tree/master.svg?style=shield)](https://dl.circleci.com/status-badge/redirect/gh/qubit-ltd/vite-plugin-vue-sfc-decorators/tree/master)

[vite-plugin-vue-sfc-decorators] is a small [Vite] plugin that patches the internal [vite:vue] plugin
options so that Vue Single File Component (SFC) `<script>` blocks can parse decorator syntax
(e.g. `@Component`). It removes any existing `decorators` / `decorators-legacy` and `classProperties`
entries from the Vue plugin's Babel parser config and replaces them with the options you specify.
Designed for use in monorepos or npm packages where you need consistent decorator support in Vue SFCs.

## Installation

You can install this plugin using `npm`:

```shell
npm install --save-dev @qubit-ltd/vite-plugin-vue-sfc-decorators
```

Or with `yarn`:

```shell
yarn add --dev @qubit-ltd/vite-plugin-vue-sfc-decorators
```

## Usage

Import the plugin and add it to your [Vite] config. It runs at `configResolved` and patches the
[vite:vue] plugin, so it works regardless of plugin order as long as [@vitejs/plugin-vue] is present.

```js
import vue from '@vitejs/plugin-vue';
import vueSfcDecoratorsPlugin from '@qubit-ltd/vite-plugin-vue-sfc-decorators';

export default {
  plugins: [
    vue(),
    vueSfcDecoratorsPlugin({ decoratorsVersion: '2023-11' }),
  ],
};
```

## Configuration Options

Options are passed when creating the plugin. Available options and defaults:

| Option                   | Type      | Default     | Description                                                                 |
|--------------------------|-----------|-------------|-----------------------------------------------------------------------------|
| `decoratorsVersion`       | `string`  | `'2023-11'` | Decorators proposal version passed to the Babel parser (e.g. `'2023-11'`, `'2018-09'`). |
| `includeClassProperties` | `boolean` | `true`      | Whether to add the `classProperties` parser plugin (usually needed with decorators).     |

## Example with Vue and Babel

When using [Babel] (e.g. [@qubit-ltd/vite-plugin-babel]) for transpilation, enable decorators in the
Vue SFC script parser via this plugin, and configure Babel with matching decorator/class-property
plugins:

```javascript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueSfcDecoratorsPlugin from '@qubit-ltd/vite-plugin-vue-sfc-decorators';
import babel from '@qubit-ltd/vite-plugin-babel';

export default defineConfig({
  plugins: [
    vue(),
    vueSfcDecoratorsPlugin({ decoratorsVersion: '2023-11' }),
    babel({
      config: {
        presets: [['@babel/preset-env', { modules: false }]],
        plugins: [
          '@babel/plugin-transform-runtime',
          ['@babel/plugin-proposal-decorators', { version: '2023-11' }],
          '@babel/plugin-transform-class-properties',
        ],
      },
    }),
  ],
});
```

## Contributing

If you find any issues or have suggestions, please open an issue or submit a pull request to the
[GitHub repository].

## License

This plugin is distributed under the Apache 2.0 license. See the [LICENSE](LICENSE) file for details.

[vite-plugin-vue-sfc-decorators]: https://npmjs.com/package/@qubit-ltd/vite-plugin-vue-sfc-decorators
[Vite]: https://vitejs.dev/
[vite:vue]: https://www.npmjs.com/package/@vitejs/plugin-vue
[@vitejs/plugin-vue]: https://www.npmjs.com/package/@vitejs/plugin-vue
[Babel]: https://babeljs.io/
[@qubit-ltd/vite-plugin-babel]: https://npmjs.com/package/@qubit-ltd/vite-plugin-babel
[GitHub repository]: https://github.com/qubit-ltd/vite-plugin-vue-sfc-decorators
