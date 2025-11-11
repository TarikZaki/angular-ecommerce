import nx from '@nx/eslint-plugin';
import baseConfig from '../../eslint.config.mjs';
import jsdoc from 'eslint-plugin-jsdoc';

export default [
  ...baseConfig,
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  jsdoc.configs['flat/recommended'],
  {
    files: ['**/*.ts'],
    plugins: {
      jsdoc,
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      'jsdoc/require-description': 'error',
    },
  },
  {
    files: ['**/*.html'],
    // Override or add rules here
    rules: {},
  },
];
