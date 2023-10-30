#!/bin/bash
set -e

echo "Deployment started..."

# Pull the latest version of the app
git pull main
echo "New changes copied to server !"

echo "Installing Dependencies..."
npm install --yes

npm run build

echo "PM2 Reload"
pm2 reload 0

echo "Deployment Finished!"
