const fs = require('fs')
const R = require('ramda')
const nativeCSS = require('native-css')
const cssRules = nativeCSS.convert('node_modules/basscss/css/basscss.css')

const transformRuleName = (rule) =>
  R.test(/\@media/, rule) ? rule : `.${R.replace(/_/g, '-', rule)}`

const transformMediaQueries = (values) => {
  if (R.has('__expression__', values)) {
    return R.compose(
      R.fromPairs,
      R.map(([rule, vals]) => [transformRuleName(rule), vals]),
      R.toPairs,
      R.dissoc('__expression__')
    )(values)
  }

  return values
}
const formatKeys = R.compose(
  R.fromPairs,
  R.map(([rule, values]) => [transformRuleName(rule), transformMediaQueries(values)]),
  R.toPairs
)

const jsRules = formatKeys(cssRules)

fs.writeFileSync(
  './index.js',
  `module.exports = ${JSON.stringify(jsRules, null, 2)}\n`
)
