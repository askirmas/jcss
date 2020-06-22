#!/bin/bash
target="$1"
dir=$(realpath --relative-to "$target" $(dirname "$0"))
schema="doctest.schema.json"

cd "$target"

rm -f "$schema"
ln -s "$dir/$schema" "."
cp -n "$dir/function-schema.json" "."
cp -n "$dir/index.doctest.json" "."
