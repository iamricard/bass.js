# bass.js

## Summary

Exports [Brent Jackson](https://github.com/jxnblk)'s
[basscss](https://github.com/basscss/basscss) rules as a JS object for easy
usage with tools such as [JSS](https://github.com/cssinjs/jss), via
[compose](https://github.com/cssinjs/jss-compose) or
[Aphrodite](https://github.com/Khan/aphrodite).

## Installation

**NOTE:** The `bassjs` module is a another project by @jxnblk. This one has
a dot before the `js`.

```sh
yarn add bass.js
```

## Usage

You have two versions `bass.js/dot` and `bass.js/dotless` the only difference
is the fact that `dot` will provide classes as `.h1`, `.m0`, while the
`dotless` version will simply be `h1` and `m0`. Defaults to `bass.js/dot`.

Versioning follows basscss's.
