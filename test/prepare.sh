#!/usr/bin/env bash

LANG_MODULE_SRC="$PWD/node_modules/hyphenation.en-us/lib/en-us.js"
LANG_MODULE_DEST="$PWD/test/lib/en-us.js"

HYPHER_MODULE_SRC="$PWD/hypher/lib/hypher.js"
HYPHER_MODULE_DEST="$PWD/test/lib/hypher.js"

JQUERY_SRC="$PWD/node_modules/jquery/dist/jquery.min.js"
JQUERY_DEST="$PWD/test/lib/jquery.min.js"

GARBLER_MODULE_SRC="$PWD/index.js"
GARBLER_MODULE_DEST="$PWD/test/lib/garbler-es5.js"

CMD_TRANSPILE="$PWD/node_modules/.bin/babel --module-root Garbler $GARBLER_MODULE_SRC"

# node_modules/.bin/babel index.js --out-file test/lib/garbler-es5.js

declare -a FILES=($LANG_MODULE_SRC $JQUERY_SRC $GARBLER_MODULE_SRC)

for f in "${FILES[@]}"; do
  if [[ ! -f $f ]]; then
    printf '%s does not exist, exiting.\n' "$f"
    exit 1
  fi
done

module_head() { # module
  while [[ $# -gt 0 ]]; do local "$1"; shift; done
  echo "(function (root, factory) {if (typeof define === 'function' && define.amd) {define([], factory);} else if (typeof module === 'object' && module.exports) {module.exports = factory();} else {root.$module = factory();}}(this, function () {"
}

module_foot() { # module
  while [[ $# -gt 0 ]]; do local "$1"; shift; done
  echo "return $module}));"
}

module_write() { # name, src, dest
  while [[ $# -gt 0 ]]; do local "$1"; shift; done
  printf '%s\n' "$(module_head module=$name)" > "$dest"
  printf '%s\n' "$src" >> "$dest"
  printf '%s\n' "$(module_foot module=$name)" >> "$dest"
  printf 'Wrote file: %s\n' "$dest"
}

module_copy() { # src, dest
  while [[ $# -gt 0 ]]; do local "$1"; shift; done
  printf '%s\n' "$src" > "$dest"
  printf 'Wrote file: %s\n' "$dest"
}

module_copy src="$(cat "$HYPHER_MODULE_SRC")" dest="$HYPHER_MODULE_DEST"
module_copy src="$(cat "$JQUERY_SRC")" dest="$JQUERY_DEST"
module_write name=Garbler src="$(eval "$CMD_TRANSPILE")" dest="$GARBLER_MODULE_DEST"
