////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2026.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
////////////////////////////////////////////////////////////////////////////////

export default [
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      'max-classes-per-file': 'off',
      'no-unused-vars': 'error',
      'no-console': 'warn',
    },
  },
  {
    files: ['test/**/*.js'],
    rules: {
      'max-classes-per-file': 'off',
    },
  },
];