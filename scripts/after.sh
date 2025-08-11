#!/bin/bash

cd /var/www/html/technubo-rest/

# Restore .env backup if it exists and .env is missing
if [ -f /tmp/technubo-rest.env.backup ] && [ ! -f .env ]; then
  cp /tmp/technubo-rest.env.backup .env
  echo "Restored .env from backup"
fi

# Ensure correct ownership
sudo chown -R ubuntu:ubuntu .

# Restart the PM2 process
pm2 restart nubo-rest --log-date-format 'DD-MM HH:mm:ss.SSS'

echo "After install script execution completed."
