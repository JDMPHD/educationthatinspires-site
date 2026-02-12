#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SOURCE_DIR="${1:-$ROOT_DIR/photos}"
OUTPUT_DIR="$ROOT_DIR/public/images/library/raw"
MANIFEST_PATH="$ROOT_DIR/docs/photo-manifest.tsv"
MAP_FILE="$(mktemp)"

cleanup() {
  rm -f "$MAP_FILE"
}
trap cleanup EXIT

mkdir -p "$OUTPUT_DIR"

if [ ! -d "$SOURCE_DIR" ]; then
  echo "Source directory not found: $SOURCE_DIR"
  exit 1
fi

rm -f "$OUTPUT_DIR"/eti-photo-* "$MANIFEST_PATH"
printf "status\tid\tsource_path\toutput_file\tsha256\tbytes\n" > "$MANIFEST_PATH"

if ! find "$SOURCE_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" -o -iname "*.heic" \) -print -quit | grep -q .; then
  echo "No image files found in $SOURCE_DIR"
  echo "Manifest written to $MANIFEST_PATH"
  exit 0
fi

unique_count=0
duplicate_count=0
total_count=0
file_id=1

while IFS= read -r file_path; do
  total_count=$((total_count + 1))

  sha256="$(shasum -a 256 "$file_path" | awk '{print $1}')"
  existing_file="$(awk -F '\t' -v hash="$sha256" '$1 == hash {print $2}' "$MAP_FILE")"

  if size_bytes="$(stat -f%z "$file_path" 2>/dev/null)"; then
    :
  else
    size_bytes="$(stat -c%s "$file_path")"
  fi

  if [ -n "$existing_file" ]; then
    duplicate_count=$((duplicate_count + 1))
    printf "duplicate\t-\t%s\t%s\t%s\t%s\n" "$file_path" "$existing_file" "$sha256" "$size_bytes" >> "$MANIFEST_PATH"
    continue
  fi

  extension="${file_path##*.}"
  extension="$(printf '%s' "$extension" | tr '[:upper:]' '[:lower:]')"
  output_file="$(printf 'eti-photo-%03d.%s' "$file_id" "$extension")"

  cp "$file_path" "$OUTPUT_DIR/$output_file"
  printf "%s\t%s\n" "$sha256" "$output_file" >> "$MAP_FILE"
  printf "unique\t%03d\t%s\t%s\t%s\t%s\n" "$file_id" "$file_path" "$output_file" "$sha256" "$size_bytes" >> "$MANIFEST_PATH"

  unique_count=$((unique_count + 1))
  file_id=$((file_id + 1))
done < <(find "$SOURCE_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" -o -iname "*.heic" \) | sort)

echo "Processed $total_count files"
echo "Unique images copied: $unique_count"
echo "Duplicates skipped: $duplicate_count"
echo "Library path: $OUTPUT_DIR"
echo "Manifest path: $MANIFEST_PATH"
