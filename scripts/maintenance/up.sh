#!/bin/bash

log-success() {
  echo -e "\033[32m$1\033[0m"
}

sed -i "s/APP_MAINTENANCE=true/APP_MAINTENANCE=false/g" .env.production
log-success "\nApplication is up\n"