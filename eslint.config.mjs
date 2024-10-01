import globals from 'globals'
import pluginJs from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  eslintPluginPrettierRecommended,
  eslintConfigPrettier,
  pluginJs.configs.recommended,
  {
    ignores: ['dist/**', 'node_modules/**', 'bin/**', 'build/**'],
  },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.node } },
]
