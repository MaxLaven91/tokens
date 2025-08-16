// style-dictionary.config.mjs
import StyleDictionary from 'style-dictionary';

// Emit ONLY tokens that come from `source` (your semantic files)
StyleDictionary.registerFilter({
  name: 'only/semantic',
  filter: (t) =>
    t.isSource === true ||
    (typeof t.filePath === 'string' && t.filePath.includes('/semantic/'))
});

export default {
  log: { verbosity: 'verbose' },

  // Build from semantic tokens only…
  source: ['tokens/semantic/**/*.json'],
  // …but include primitives/aliases so references resolve
  include: ['tokens/primitives/**/*.json', 'tokens/aliases/**/*.json'],

  platforms: {
    css: {
      transforms: [
        'attribute/cti',
        'name/kebab',
        'fontFamily/css',
        'typography/css/shorthand', // turns composite typography into CSS `font` strings
        'color/css'
      ],
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          filter: 'only/semantic',
          options: {
            selector: ':root',
            // because primitives are filtered out, resolve refs to concrete values
            outputReferences: false
          }
        }
      ]
    },

    json: {
      transforms: ['attribute/cti', 'name/camel', 'color/hex'],
      buildPath: 'dist/json/',
      files: [
        { destination: 'tokens.json', format: 'json/nested', filter: 'only/semantic' }
      ]
    },

    ts: {
      transforms: ['attribute/cti', 'name/camel', 'color/hex'],
      buildPath: 'dist/ts/',
      files: [
        { destination: 'tokens.d.ts', format: 'typescript/es6-declarations', filter: 'only/semantic' },
        { destination: 'tokens.ts',   format: 'javascript/es6', options: { outputReferences: false }, filter: 'only/semantic' }
      ]
    }
  }
};