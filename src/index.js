////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2026.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

// Patch the vite:vue plugin options so that Vue SFC <script> can parse decorators
// (e.g. @Component). This removes any existing 'decorators' / 'decorators-legacy'
// and 'classProperties' entries and replaces them with the desired set.

function isDecoratorsPlugin(p) {
  return (p === 'decorators')
    || (p === 'decorators-legacy')
    || (Array.isArray(p) && (p[0] === 'decorators' || p[0] === 'decorators-legacy'));
}

function isClassPropertiesPlugin(p) {
  return (p === 'classProperties')
    || (Array.isArray(p) && p[0] === 'classProperties');
}

export default function createVueSfcDecoratorsPlugin(options = {}) {
  const decoratorsVersion = options.decoratorsVersion || '2023-11';
  const includeClassProperties = ('includeClassProperties' in options) ? Boolean(options.includeClassProperties) : true;

  return {
    name: 'vite-plugin-vue-sfc-decorators',
    configResolved(config) {
      for (const plugin of config.plugins || []) {
        if (plugin && (plugin.name === 'vite:vue') && plugin.api) {
          const currentOptions = plugin.api.options || {};
          const currentScript = currentOptions.script || {};
          const currentParserPlugins = currentScript.babelParserPlugins || [];

          const nextParserPlugins = currentParserPlugins
            .filter((p) => !isDecoratorsPlugin(p) && !isClassPropertiesPlugin(p));

          nextParserPlugins.push(['decorators', { version: decoratorsVersion }]);
          if (includeClassProperties) {
            nextParserPlugins.push('classProperties');
          }
          plugin.api.options = {
            ...currentOptions,
            script: {
              ...currentScript,
              babelParserPlugins: nextParserPlugins,
            },
          };
        }
      }
    },
  };
}
