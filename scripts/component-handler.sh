#!/usr/bin/env bash
#
# wrap-ui-components.sh
#
# Walks through src/components/ui/
#  • finds every *.tsx|*.ts that sits directly in that folder
#  • converts   foo-bar.tsx  →  FooBar/index.tsx
#  • keeps Git history when possible
#  • appends    export { FooBar } from './FooBar';   to the barrel
#
# Safe to run repeatedly – already-processed files are ignored.

set -euo pipefail

###############################################################################
# CONFIG
###############################################################################
BASE_DIR="components/ui"            # change if your tree differs
BARREL="$BASE_DIR/index.ts"

###############################################################################
# UTIL: kebab/underscore/camel → PascalCase  (alert → Alert, date-picker → DatePicker)
###############################################################################
to_pascal() {
  local raw="$1"
  local IFS='-_'
  read -ra parts <<< "$raw"
  local out=""
  for p in "${parts[@]}"; do
    first_char=$(printf '%s' "${p:0:1}" | tr '[:lower:]' '[:upper:]')
    out+="${first_char}${p:1}"
  done
  printf '%s' "$out"
}

###############################################################################
# PREP
###############################################################################
touch "$BARREL"                         # create barrel if missing

printf "🔍 Scanning %s …\n\n" "$BASE_DIR"

###############################################################################
# MAIN LOOP
###############################################################################
find "$BASE_DIR" -maxdepth 1 -type f \( -name '*.tsx' -o -name '*.ts' \) ! -name 'index.ts' | while read -r SRC; do
  filename=$(basename "$SRC")           # e.g. alert.tsx
  base="${filename%.*}"                 # alert
  ext="${filename##*.}"                 # tsx | ts
  component=$(to_pascal "$base")        # Alert

  # Skip if folder already exists (already wrapped)
  if [[ -d "$BASE_DIR/$component" ]]; then
    printf "⏭  %s — already wrapped\n" "$component"
    continue
  fi

  # Skip if barrel already exports it
  export_line="export { $component } from './$component';"
  if grep -Fxq "$export_line" "$BARREL"; then
    printf "⏭  %s — already in barrel\n" "$component"
    continue
  fi

  # ------- move & rename ----------------------------------------------------
  dest_dir="$BASE_DIR/$component"
  dest="$dest_dir/index.$ext"
  mkdir -p "$dest_dir"

  if git rev-parse --is-inside-work-tree &>/dev/null; then
    if git ls-files --error-unmatch "$SRC" &>/dev/null; then
      git mv "$SRC" "$dest"
    else
      mv "$SRC" "$dest"
      git add "$dest"
    fi
  else
    mv "$SRC" "$dest"
  fi
  printf "✅  Wrapped %s  →  %s\n" "$filename" "$component/"

  # ------- update barrel ----------------------------------------------------
  echo "$export_line" >> "$BARREL"
  printf "➕ Added export: %s\n\n" "$export_line"
done

printf "\n🎉  Done. Barrel file is up to date.\n"