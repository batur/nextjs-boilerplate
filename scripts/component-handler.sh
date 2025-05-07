#!/usr/bin/env bash
# move-component.sh  (v3)
# Usage: ./move-component.sh <ComponentName>

set -euo pipefail

###############################################################################
# CONFIG
###############################################################################
[[ $# -eq 1 ]] || { echo "Usage: $0 <ComponentName>"; exit 1; }

COMPONENT="$1"                             # e.g. Button
BASE_DIR="components/ui"               # adjust if different
BARREL="$BASE_DIR/index.ts"                # barrel file path

export_line="export { $COMPONENT } from './$COMPONENT';"

###############################################################################
# SHORT-CIRCUIT IF COMPONENT ALREADY PRESENT
###############################################################################
if [[ -d "$BASE_DIR/$COMPONENT" ]]; then
  echo "⚠️ Folder '$BASE_DIR/$COMPONENT' already exists - aborting."
  exit 0
fi

if [[ -f $BARREL ]] && grep -Fxq "$export_line" "$BARREL"; then
  echo "⚠️ Barrel already exports '$COMPONENT' - aborting."
  exit 0
fi

###############################################################################
# LOCATE SOURCE FILE  (button.tsx  or  button.ts)
###############################################################################
lowercase="$(echo "$COMPONENT" | tr '[:upper:]' '[:lower:]')"
for ext in tsx ts; do
  candidate="$BASE_DIR/$lowercase.$ext"
  [[ -f $candidate ]] && SRC="$candidate" && SRC_EXT="$ext" && break
done

[[ ${SRC:-} ]] || { echo "❌ No file $lowercase.tsx|ts found in $BASE_DIR"; exit 2; }

###############################################################################
# CREATE TARGET DIR AND MOVE (KEEP GIT HISTORY WHEN POSSIBLE)
###############################################################################
DEST_DIR="$BASE_DIR/$COMPONENT"
mkdir -p "$DEST_DIR"
DEST="$DEST_DIR/index.$SRC_EXT"

if git rev-parse --is-inside-work-tree &>/dev/null; then
  if git ls-files --error-unmatch "$SRC" &>/dev/null; then
    git mv "$SRC" "$DEST"
  else
    mv "$SRC" "$DEST"
    git add "$DEST"
  fi
else
  mv "$SRC" "$DEST"
fi

echo "✅ Moved: $SRC → $DEST"

###############################################################################
# UPDATE THE BARREL FILE
###############################################################################
touch "$BARREL"

if ! grep -Fxq "$export_line" "$BARREL"; then
  echo "$export_line" >> "$BARREL"
  echo "✅ Added to barrel: $export_line"
fi