#!/bin/bash
cd /home/ec2-user/bookourcab
url -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -
yum install nodejs npm