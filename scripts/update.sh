#!/bin/bash

read_var() {
  VAR=$(grep "$1" "$2" | xargs)
  IFS="=" read -ra VAR <<<"${VAR}"
  echo "${VAR[1]}"
}

error() {
  echo -e "\033[31m$1\033[0m"
  if [[ -n $2 ]]; then
    exit "$2"
  else
    exit 1
  fi
}

warning() {
  echo -e "\033[33m$1\033[0m"
  if [[ -n $2 ]]; then
    exit "$2"
  else
    exit 2
  fi
}

envFile=.env.production

PWD=$(pwd)

if [ -f "${envFile}" ]; then
  APP_ENV=$(read_var APP_ENV ${envFile})

  if [ "${APP_ENV}" == 'production' ]; then
    GIT_PATH=$(read_var GIT_PATH ${envFile})

    if [ -n "${GIT_PATH}" ]; then
      cd "${GIT_PATH}" && git reset --hard && git pull && (cd "${PWD}" || exit)
      npm run project-install --update
    else
      error "Merci de remplir la variable GIT_PATH dans ${envFile}"
    fi
  else
    warning "You're not in production."
  fi
else
  error "${envFile} not found."
fi
