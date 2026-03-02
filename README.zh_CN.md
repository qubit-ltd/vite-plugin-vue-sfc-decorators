# @qubit-ltd/vite-plugin-vue-sfc-decorators

[![npm package](https://img.shields.io/npm/v/@qubit-ltd/vite-plugin-vue-sfc-decorators.svg)](https://npmjs.com/package/@qubit-ltd/vite-plugin-vue-sfc-decorators)
[![License](https://img.shields.io/badge/License-Apache-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)
[![English Document](https://img.shields.io/badge/Document-English-blue.svg)](README.md)
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/qubit-ltd/vite-plugin-vue-sfc-decorators/tree/master.svg?style=shield)](https://dl.circleci.com/status-badge/redirect/gh/qubit-ltd/vite-plugin-vue-sfc-decorators/tree/master)

[vite-plugin-vue-sfc-decorators] 是一个小型 [Vite] 插件，用于修补内部 [vite:vue] 插件的选项，使 Vue
单文件组件（SFC）的 `<script>` 块能够解析装饰器语法（例如 `@Component`）。它会从 Vue 插件的 Babel
解析器配置中移除已有的 `decorators` / `decorators-legacy` 和 `classProperties` 项，并用你指定的选项替换。
适用于需要在 Vue SFC 中统一支持装饰器的 monorepo 或 npm 包。

## 安装

可使用 `npm` 安装：

```shell
npm install --save-dev @qubit-ltd/vite-plugin-vue-sfc-decorators
```

或使用 `yarn`：

```shell
yarn add --dev @qubit-ltd/vite-plugin-vue-sfc-decorators
```

## 使用方法

在 [Vite] 配置中引入并添加该插件。插件在 `configResolved` 阶段执行并修补 [vite:vue] 插件，因此只要
项目中存在 [@vitejs/plugin-vue]，插件顺序无关紧要。

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

## 配置选项

在创建插件时传入选项。可用选项及默认值如下：

| 选项                     | 类型      | 默认值       | 说明                                                                         |
|--------------------------|-----------|--------------|------------------------------------------------------------------------------|
| `decoratorsVersion`       | `string`  | `'2023-11'`  | 传给 Babel 解析器的装饰器提案版本（如 `'2023-11'`、`'2018-09'`）。           |
| `includeClassProperties`  | `boolean` | `true`       | 是否添加 `classProperties` 解析器插件（与装饰器一起使用时通常需要）。       |

## 与 Vue 和 Babel 一起使用示例

若使用 [Babel]（例如 [@qubit-ltd/vite-plugin-babel]）做转译，可通过本插件在 Vue SFC 的 script 解析器中启用装饰器，并在 Babel 中配置对应的装饰器/类属性插件：

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

## 贡献

如有问题或建议，欢迎在 [GitHub 仓库] 提交 issue 或 pull request。

## 许可

本插件采用 Apache 2.0 许可证。详见 [LICENSE](LICENSE) 文件。

[vite-plugin-vue-sfc-decorators]: https://npmjs.com/package/@qubit-ltd/vite-plugin-vue-sfc-decorators
[Vite]: https://vitejs.dev/
[vite:vue]: https://www.npmjs.com/package/@vitejs/plugin-vue
[@vitejs/plugin-vue]: https://www.npmjs.com/package/@vitejs/plugin-vue
[Babel]: https://babeljs.io/
[@qubit-ltd/vite-plugin-babel]: https://npmjs.com/package/@qubit-ltd/vite-plugin-babel
[GitHub 仓库]: https://github.com/qubit-ltd/vite-plugin-vue-sfc-decorators
