// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html',
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.config.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    'global-require': 0,
    'no-param-reassign': 0,
    'no-return-await': 0,
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never',
      'json': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    'prefer-template': 0,
    'semi': [2, 'never'],
    'comma-dangle': 0,
    'no-console': 0,
    'no-plusplus': 0,
    'no-unused-vars': [2, { 'args': 'none' }],
    'space-before-function-paren': 0,
    'function-paren-newline': 0,
    'prefer-promise-reject-errors': 0,
    'func-names': 0,
    'prefer-rest-params': 0,
    'import/prefer-default-export': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
