# @qubit-ltd/vite-plugin-vue-sfc-decorators

A tiny plugin that patches the internal `vite:vue` plugin options so Vue SFC <script> blocks
can parse decorator syntax (e.g. `@Component`). Designed to be used in monorepos or npm packages.

Usage:

```js
import vueSfcDecoratorsPlugin from '@qubit-ltd/vite-plugin-vue-sfc-decorators';

export default {
  // ...
  plugins: [
    vueSfcDecoratorsPlugin({ decoratorsVersion: '2023-11' }),
  ]
}
```

