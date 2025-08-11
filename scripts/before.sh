#!/bin/bash

DEST="/var/www/html/technubo-rest"
APP_NAME="nubo-rest"
ENV_BACKUP="/tmp/technubo-rest.env.backup"

echo "Before install script execution started."

# Ensure target directory exists
mkdir -p "$DEST"

# Stop and remove PM2 process if it exists
if command -v pm2 >/dev/null 2>&1; then
  pm2 stop "$APP_NAME" || true
  pm2 delete "$APP_NAME" || true
fi

# Backup existing .env file if present
if [ -f "$DEST/.env" ]; then
  cp "$DEST/.env" "$ENV_BACKUP"
  echo "Backed up .env to $ENV_BACKUP"
fi

# Optional cleanup: remove old build output
rm -rf "$DEST/dist"

echo "Before install script execution completed."
