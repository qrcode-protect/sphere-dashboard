#!/bin/bash

log-error() {
  echo -e "\033[31m$1\033[0m"
}

sed -i "s/APP_MAINTENANCE=false/APP_MAINTENANCE=true/g" .env.production
log-error "\nApplication is down\n"