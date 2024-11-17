const path = require('path')

const buildEslintCommand = filenames =>
  `next lint --fix --file ${filenames
    .map(f => path.relative(process.cwd(), f))
    .join(' --file ')}`

module.exports = {
  // '*.{js,jsx,ts,tsx}': [buildEslintCommand],
  '**/*.ts?(x)': [
    'npm run prettier:check',
    () => 'tsc -p tsconfig.json --noEmit',
    buildEslintCommand,
  ],
  '**/*.{js,jsx}': ['npm run prettier:check', buildEslintCommand],
}
