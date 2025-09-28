#!/bin/bash

# ============================
# Foreman Affiliates Agency
# GitHub Pages Deploy Script
# ============================

# Exit if any command fails
set -e

# Stage all changes
git add -A

# Commit with timestamp
git commit -m "Auto-deploy: $(date '+%Y-%m-%d %H:%M:%S')"

# Push to main branch
git push origin main

echo "✅ Deployment complete — GitHub Pages should update live shortly."
