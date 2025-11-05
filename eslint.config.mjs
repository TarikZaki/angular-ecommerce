import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import jsdoc from 'eslint-plugin-jsdoc';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  //  إعدادات JavaScript و TypeScript الأساسية
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      js,
      jsdoc, // نفعّل jsdoc plugin
    },
    extends: ['js/recommended'],
    rules: {
      // تفعيل قاعدة require-jsdoc
      'jsdoc/require-jsdoc': [
        'warn',
        {
          publicOnly: true,
          require: {
            ClassDeclaration: true,
            MethodDefinition: true,
            FunctionDeclaration: true,
            ArrowFunctionExpression: false,
            FunctionExpression: false,
          },
        },
      ],
      // قواعد إضافية لتحسين جودة الـ JSDoc
      'jsdoc/check-alignment': 'warn',
      'jsdoc/check-indentation': 'warn',
      'jsdoc/check-tag-names': 'warn',
      'jsdoc/require-param': 'warn',
      'jsdoc/require-returns': 'warn',
    },
  },

  // إعدادات TypeScript الافتراضية من typescript-eslint
  ...tseslint.configs.recommended,
]);
