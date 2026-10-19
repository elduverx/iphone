module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  overrides: [{ files: ['scripts/**'], env: { node: true } }],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    // el proyecto no usa PropTypes
    'react/prop-types': 'off',
    // las props de React Three Fiber (position, intensity…) no son atributos DOM
    'react/no-unknown-property': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
