#!/bin/bash
# Script to update git submodules for CI/CD

echo "Initializing and updating git submodules..."
git submodule init
git submodule update --remote --merge

echo "Submodules updated successfully!"