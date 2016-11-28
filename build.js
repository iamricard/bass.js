const fs = require('fs')
const R = require('ramda')
const nativeCSS = require('native-css')
const cssRules = nativeCSS.convert('node_modules/basscss/css/basscss.css')

const transformRuleDot = (rule) =>
  R.test(/\@media/, rule) ? rule : `.${R.replace(/_/g, '-', rule)}`
const transformRule = (rule) =>
  R.test(/\@media/, rule) ? rule : R.replace(/_/g, '-', rule)
const transformMediaQueries = (values, prependDot) => {
  if (R.has('__expression__', values)) {
    return R.compose(
      R.fromPairs,
      R.map(([rule, vals]) => [
        prependDot ? transformRuleDot(rule) : transformRule(rule),
        vals
      ]),
      R.toPairs,
      R.dissoc('__expression__')
    )(values)
  }

  return values
}
const dot = R.compose(
  R.fromPairs,
  R.map(([rule, values]) => [transformRuleDot(rule), transformMediaQueries(values, true)]),
  R.toPairs
)(cssRules)
const dotless = R.compose(
  R.fromPairs,
  R.map(([rule, values]) => [transformRule(rule), transformMediaQueries(values)]),
  R.toPairs
)(cssRules)

fs.writeFileSync(
  './dot.js',
  `module.exports = ${JSON.stringify(dot, null, 2)}\n`
)
fs.writeFileSync(
  './dotless.js',
  `module.exports = ${JSON.stringify(dotless, null, 2)}\n`
)
