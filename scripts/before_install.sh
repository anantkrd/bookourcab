#!/bin/bash
cd /home/ec2-user/bookourcab
curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -
yum -y update nodejs npm