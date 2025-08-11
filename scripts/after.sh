cd /var/www/html/technubo-rest/
sudo chown -R ubuntu:ubuntu .

#echo "Installing uvicorn for system Python..."
#sudo pip3.11 install uvicorn

#echo "Starting or restarting PM2 process..."
#pm2 start "uvicorn app.main:app --host 0.0.0.0 --port 9090" \
  #--name byelaw-be \
  #--interpreter python3.11 \
  #--cwd /var/www/html/byelaw-be
# npm install -
#echo "Saving PM2 process to ensure restart on reboot..."
# pm2 save
pm2 restart nubo-rest --log-date-format 'DD-MM HH:mm:ss.SSS'
echo "After install script execution completed."
