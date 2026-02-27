import { describe, it, expect, beforeEach } from 'vitest';

import createVueSfcDecoratorsPlugin from '../src/index.js';

describe('vite-plugin-vue-sfc-decorators', () => {
  beforeEach(() => {
    // nothing for now
  });

  it('replaces existing decorators and classProperties and adds defaults', () => {
    const p = createVueSfcDecoratorsPlugin();
    const vuePlugin = {
      name: 'vite:vue',
      api: {
        options: {
          script: {
            babelParserPlugins: [
              'jsx',
              'decorators-legacy',
              ['classProperties', { loose: true }],
              ['other', {}],
            ],
          },
        },
      },
    };
    const config = { plugins: [vuePlugin] };
    p.configResolved(config);
    const result = vuePlugin.api.options.script.babelParserPlugins;
    expect(result).toContainEqual(['decorators', { version: '2023-11' }]);
    expect(result).toContain('classProperties');
    expect(result).not.toContain('decorators-legacy');
    // ensure other plugins remain
    expect(result).toContain('jsx');
    expect(result).toContainEqual(['other', {}]);
  });

  it('does not add classProperties when includeClassProperties is false', () => {
    const p = createVueSfcDecoratorsPlugin({ includeClassProperties: false });
    const vuePlugin = {
      name: 'vite:vue',
      api: { options: { script: { babelParserPlugins: [] } } },
    };
    const config = { plugins: [vuePlugin] };
    p.configResolved(config);
    const result = vuePlugin.api.options.script.babelParserPlugins;
    expect(result).toContainEqual(['decorators', { version: '2023-11' }]);
    expect(result).not.toContain('classProperties');
  });

  it('uses custom decoratorsVersion when provided', () => {
    const p = createVueSfcDecoratorsPlugin({ decoratorsVersion: '2018-09' });
    const vuePlugin = {
      name: 'vite:vue',
      api: { options: { script: { babelParserPlugins: [] } } },
    };
    p.configResolved({ plugins: [vuePlugin] });
    const result = vuePlugin.api.options.script.babelParserPlugins;
    expect(result).toContainEqual(['decorators', { version: '2018-09' }]);
  });

  it('creates script and babelParserPlugins when missing', () => {
    const p = createVueSfcDecoratorsPlugin();
    const vuePlugin = {
      name: 'vite:vue',
      api: { options: {} },
    };
    p.configResolved({ plugins: [vuePlugin] });
    const result = vuePlugin.api.options.script.babelParserPlugins;
    expect(Array.isArray(result)).toBe(true);
    expect(result).toContainEqual(['decorators', { version: '2023-11' }]);
  });

  it('does nothing when vite:vue plugin is not present', () => {
    const p = createVueSfcDecoratorsPlugin();
    const other = { name: 'something-else' };
    const config = { plugins: [other] };
    expect(() => p.configResolved(config)).not.toThrow();
    expect(config.plugins[0]).toBe(other);
  });
});

