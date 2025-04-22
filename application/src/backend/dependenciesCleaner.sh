#!/bin/bash

rm -rf node_modules
rm package-lock.json
npm cache clean --force

echo "Dependencies cleaned."
