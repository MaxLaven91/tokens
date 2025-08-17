// style-dictionary.config.mjs
import StyleDictionary from 'style-dictionary';

// Filters
StyleDictionary.registerFilter({
  name: 'only/semantic',
  filter: (t) => typeof t.filePath === 'string' && t.filePath.includes('/semantic/')
});
StyleDictionary.registerFilter({
  name: 'only/components',
  filter: (t) => typeof t.filePath === 'string' && t.filePath.includes('/components/')
});
StyleDictionary.registerFilter({
  name: 'only/published',
  filter: (t) =>
    typeof t.filePath === 'string' &&
    (t.filePath.includes('/semantic/') || t.filePath.includes('/components/'))
});

export default {
  log: { verbosity: 'verbose' },

  // Publish semantic + components
  source: [
    'tokens/semantic/**/*.json',
    'tokens/components/**/*.json'
  ],

  // Load primitives so references resolve (not emitted)
  include: [
    'tokens/primitives/**/*.json',
    'tokens/aliases/**/*.json'
  ],

  platforms: {
    css: {
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
          filter: 'only/published',
          options: {
            selector: ':root',
            // Components currently mix semantic + primitives → inline concrete values
            outputReferences: false
          }
        }
      ]
    },

    json: {
      transforms: ['attribute/cti', 'name/camel', 'color/hex'],
      buildPath: 'dist/json/',
      files: [
        { destination: 'tokens.json', format: 'json/nested', filter: 'only/published' }
      ]
    },

    ts: {
      transforms: ['attribute/cti', 'name/camel', 'color/hex'],
      buildPath: 'dist/ts/',
      files: [
        { destination: 'tokens.d.ts', format: 'typescript/es6-declarations', filter: 'only/published' },
        { destination: 'tokens.ts',   format: 'javascript/es6', options: { outputReferences: false }, filter: 'only/published' }
      ]
    }
  }
};