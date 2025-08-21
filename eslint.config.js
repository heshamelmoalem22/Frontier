// eslint.config.js
import js from '@eslint/js';
import babelParser from '@babel/eslint-parser';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: babelParser,
      globals: {
        document: 'readonly',
        window: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react'],
        },
      },
    },
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh,
    },
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/react-in-jsx-scope': 'off', // Not needed with React 17+
      'no-unused-vars': ['warn', { varsIgnorePattern: '^React$|^App$' }],
      'react/prop-types': 'off', // Optional: disable PropTypes warning if using TypeScript or not using PropTypes
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
