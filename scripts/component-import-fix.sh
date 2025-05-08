#!/usr/bin/env bash
# fix-imports.sh
# Converts
#   import { cn } from "components/lib/utils";
# to
#   import { cn } from "@lib";
#
# Run: ./fix-imports.sh
# Idempotent: already-fixed files stay untouched.

set -euo pipefail

###############################################################################
# CONFIG — adjust paths if your layout differs
###############################################################################
BASE_DIR="components/ui"           # root to scan
SEARCH='["'\'']components/lib/utils["'\'']'  # the string to replace  (with quotes)
REPLACE='"@lib"'                       # the replacement string (with quotes)

###############################################################################
# Choose correct in-place flag for sed (BSD vs GNU)
###############################################################################
if sed --version >/dev/null 2>&1; then
  SED_INPLACE=('sed' '-Ei')            # GNU sed
else
  SED_INPLACE=('sed' '-Ei' '')         # BSD sed (needs empty ext.)
fi

###############################################################################
# MAIN WALK
###############################################################################
echo "🔍  Fixing imports under $BASE_DIR …"

find "$BASE_DIR" -type f \( -name '*.tsx' -o -name '*.ts' \) -print0 |
while IFS= read -r -d '' file; do
  if grep -q "$SEARCH" "$file"; then
    "${SED_INPLACE[@]}" "s|$SEARCH|$REPLACE|g" "$file"
    echo "✅  $file"
  fi
done

echo "🎉  Done."