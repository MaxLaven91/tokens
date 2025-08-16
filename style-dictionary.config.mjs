import StyleDictionary from 'style-dictionary';

// Source only semantic; include primitives (and optional aliases) for reference
export default {
  log: { verbosity: 'verbose' },

  // Only semantic files are "source"
  source: ['tokens/semantic/**/*.json'],

  // Primitives (and aliases if you have them) are available for references,
  // but won't be emitted if we filter on isSource.
  include: ['tokens/primitives/**/*.json', 'tokens/aliases/**/*.json'],

  platforms: {
    css: {
      // Built-in transforms; shorthand turns composite typography into a CSS `font` string
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
          // Only emit tokens that came from `source` (i.e., semantic)
          filter: (t) => t.isSource === true,
          // Important: if a semantic token references a primitive, don't emit a var ref to it
          // (since primitives are filtered out); use the resolved value instead.
          options: { outputReferences: false, selector: ':root' }
        }
      ]
    },

    json: {
      transforms: ['attribute/cti', 'name/camel', 'color/hex'],
      buildPath: 'dist/json/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/nested',
          filter: (t) => t.isSource === true
        }
      ]
    },

    ts: {
      transforms: ['attribute/cti', 'name/camel', 'color/hex'],
      buildPath: 'dist/ts/',
      files: [
        {
          destination: 'tokens.d.ts',
          format: 'typescript/es6-declarations',
          filter: (t) => t.isSource === true
        },
        {
          destination: 'tokens.ts',
          format: 'javascript/es6',
          options: { outputReferences: false },
          filter: (t) => t.isSource === true
        }
      ]
    }
  }
};