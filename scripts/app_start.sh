#!/bin/bash
cd /home/ec2-user/bookourcab
pm2 start node_modules/react-scripts/scripts/start.js --name "bookourcab"
pm2 startup
pm2 save
pm2 restart bookourcab