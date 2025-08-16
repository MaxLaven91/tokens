import StyleDictionary from 'style-dictionary';

export default {
  log: { verbosity: 'verbose' },
  source: ['tokens/**/*.json'],

  platforms: {
    css: {
      // v5 transform names
      transforms: ['attribute/cti', 'name/kebab', 'color/hex'],
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