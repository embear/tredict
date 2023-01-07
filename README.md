# Personal Running Metrics for tredict

This repository contains personal running metrics for [tredict][tredict]. The
metrics are written in JavaScript in a "chatty" version. This repository
contains a Makefile that runs a JavaScript minifier on each metric to produce
a minimal version for upload.

## Remarks

There is the local possibility to use C preprocessor directive `#include` to
avoid duplication of code.

As tredict requires a return statement but the minifier does not like a return
outside of a function there is the ability to prepend and append code to the
minified JavaScript by adding lines that start either with `// PREPEND` or
`// APPEND`. Those lines will be copied unmodified to the output file.

[tredict]: https://www.tredict.com "tredict"
