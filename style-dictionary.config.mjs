// style-dictionary.config.mjs
import StyleDictionary from 'style-dictionary';

export default {
  log: { verbosity: 'verbose' },
  source: ['tokens/**/*.json'],

  platforms: {
    css: {
      // Built-ins only; no custom registration needed.
      // Importantly, we DO NOT include `size/rem` so radius stays in px.
      transforms: [
        'attribute/cti',
        'name/kebab',
        'fontFamily/css',
        'typography/css/shorthand',
        'color/css'
      ],
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: { outputReferences: true, selector: ':root' }
        }
      ]
    },

    json: {
      transforms: ['attribute/cti', 'name/camel', 'color/hex'],
      buildPath: 'dist/json/',
      files: [{ destination: 'tokens.json', format: 'json/nested' }]
    },

    ts: {
      transforms: ['attribute/cti', 'name/camel', 'color/hex'],
      buildPath: 'dist/ts/',
      files: [
        { destination: 'tokens.d.ts', format: 'typescript/es6-declarations' },
        { destination: 'tokens.ts',   format: 'javascript/es6', options: { outputReferences: true } }
      ]
    }
  }
};