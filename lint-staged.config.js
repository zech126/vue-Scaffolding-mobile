module.exports = {
  '*.js': [
    'eslint --fix',
    'prettier --write',
    'git add',
    'yarn test:unit --bail --findRelatedTests'
  ],
  '*.json': ['prettier --write', 'git add'],
  '*.vue': [
    'eslint --fix',
    'stylelint --fix',
    'prettier --write',
    'git add',
    'yarn test:unit --bail --findRelatedTests'
  ],
  '*.less': ['prettier --write', 'git add'],
  '*.md': ['markdownlint', 'prettier --write', 'git add'],
  '*.{png,jpeg,jpg,gif,svg}': ['imagemin-lint-staged', 'git add']
}
