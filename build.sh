#!/bin/bash
# https://chat.openai.com/share/5d475bb8-68cb-4741-8125-e36bf4dad92d
# Exit on any command failure
set -e

# Install dependencies
npm install

# Build the React project
npm run build

# Add the generated build files to the staging area
git add build
