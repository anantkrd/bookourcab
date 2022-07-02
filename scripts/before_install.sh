#!/bin/bash
cd /home/ec2-user/bookourcab
curl -sL https://deb.nodesource.com/setup_16.x| sudo -E bash -
sudo apt-get install -y nodejs npm