# Install PM2
npm install -g pm2
pm2-dev server.js

pm2 init simple

generate the ecosystem.config.js


# Start all applications
pm2 start ecosystem.config.js

# Stop all
pm2 stop ecosystem.config.js

# Restart all
pm2 restart ecosystem.config.js

# Reload all
pm2 reload ecosystem.config.js

# Delete all
pm2 delete ecosystem.config.js


pm2 start process.json --env production
pm2 restart process.json --env development