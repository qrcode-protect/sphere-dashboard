#!/bin/bash

read_var() {
  VAR=$(grep "$1" "$2" | xargs)
  IFS="=" read -ra VAR <<<"${VAR}"
  #    VAR=(${VAR[1]//\#/ })
  #    echo ${VAR}
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

info() {
  echo -e "\033[36m$1\033[0m"
}

check() {
  result=$1
  if [ "${result}" != 0 ]; then
    exit "${result}"
  fi
}

command() {
  COMMAND=$1
  info "\n${COMMAND}\n"
  eval "${COMMAND}"
  check $?
}

envProduction=.env.production
#envDevelopment=.env.development

PWD=$(pwd)

if [ -n "$1" ]; then

  if [ "$1" == '--up' ]; then
    UP=1
    DOWN=0
  elif [ "$1" == '--down' ]; then
    UP=0
    DOWN=1
  fi
else
  UP=0
  DOWN=0
fi

if [ -f "${envProduction}" ]; then
  APP_ENV=$(read_var APP_ENV ${envProduction})

  if [ "${APP_ENV}" == 'production' ]; then
    WWW_PATH=$(read_var WWW_PATH ${envProduction})
    GIT_PATH=$(read_var GIT_PATH ${envProduction})

    if [ -n "${WWW_PATH}" ] && [ -n "${GIT_PATH}" ]; then
      command "sudo mkdir -p ${WWW_PATH}"

      #        cd "${GIT_PATH}" && npm run build
      cd "${GIT_PATH}" && npm install
      if [ "${UP}" -eq 1 ]; then
        npm run build-up
      elif [ "${DOWN}" -eq 1 ]; then
        npm run build-down
      else
        npm run build
      fi
      check $?

      RSYNC_CMD="sudo rsync -avzh --progress --delete ${GIT_PATH}/dist/ ${WWW_PATH}"

      command "${RSYNC_CMD} --dry-run"

      read -p "Faut-il l'exécuter ? (y/n) " answer

      if [ "${answer}" == 'y' ] || [ "${answer}" == 'Y' ] || [ "${answer}" == 'o' ] || [ "${answer}" == 'O' ]; then
        command "${RSYNC_CMD}"
        check $?
      else
        error "Aborted.."
      fi

    else
      error "Merci de remplir les variables WWW_PATH & GIT_PATH dans ${envProduction}"
    fi
  fi
else
  error "${envProduction} not found."
fi