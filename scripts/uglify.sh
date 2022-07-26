#!/bin/bash

PROJECT_FOLDER=$1

minifyy() {
  log-success "\n#####################\n#                   #\n#      MINIFY ${1}!     #\n#                   #\n#####################\n"
}

log-warning() {
  echo -e "\033[33m$1\033[0m"
}

log-error() {
  echo -e "\033[31m$1\033[0m"
}

log-success() {
  echo -e "\033[32m$1\033[0m"
}

log-info() {
  echo -e "\033[36m$1\033[0m"
}

log-normal() {
  echo -e "\033[0m$1\033[0m"
}

log-warning "Initialisation"

#scripts=($(ls -Af './dist/static/css/'))


npm install -g postcss uglifycss terser postcss-cli autoprefixer

scripts=(
  "unsupported-browser.css"
  "fonts.css"
  "main.css"
  "colors.css"
)

links=()
minify="main.$(date +"%m%d%H%M%S").min.css"
files=""
temporary="uglify-tmp.css"
temporary2="uglify-tmp2.css"

#log-normal "\nCréation du fichier temporaire\n"

#jsscripts=($(ls -Af './dist/static/js/'))
minifyy "CSS"
for script in "${scripts[@]}"; do
  file="./dist/static/css/${script}"
  if [[ "${script}" != '.' ]] && [[ "${script}" != '..' ]] && [[ "${file}" != *"tmp-"* ]] && [[ -f "${file}" ]]; then
    log-warning "\nProcessing ${script}"
    fileTmp="${file}.tmp"
    postcss "${file}" --use autoprefixer >${fileTmp}
    uglifycss --debug --output "${file}" "${fileTmp}"
    log-info "-- Finished ${script} --"
    if [[ -f "${fileTmp}" ]]; then
        rm -rf "${fileTmp}"
    fi
  else
    if [[ ! -f "${file}" ]] && [[ ! -d "${file}" ]]; then
      log-error "File ${file} not found"
    fi
  fi
done

#for script in "${scripts[@]}"; do
#  if [[ "${script}" != '.' ]] && [[ "${script}" != '..' ]]; then
##    links+=("<link href=./static/css/${script} rel=stylesheet type=text/css>")
##    file="${PROJECT_FOLDER}/dist/static/css/${script}"
##
##    if [[ -f "${file}" ]]; then
##      files="${files}${file} "
##      cat "${file}" >>${temporary}
##      rm -rf "${file}"
##    else
##      log-error "File ${file} not found"
##    fi
#  fi;
#done

#echo $links
#
#log-normal "\nModification du fichier index.html\n"
#for link in "${links[@]}"; do
#  source=$(echo "${link}" | sed 's/\//\\\//g')
#
#  if [[ ${link} == *"app.min.css"* ]]; then
#    target=$(echo "<link href=./static/css/${minify} rel=stylesheet type=text/css>" | sed 's/\//\\\//g')
#    sed -i "s/$source/$target/g" "${PROJECT_FOLDER}/dist/index.html"
#  else
#    sed -i "s/$source//g" "${PROJECT_FOLDER}/dist/index.html"
#  fi
#done

#if [[ -f "${temporary}" ]]; then
#  minifyy
#  postcss "${temporary}" --use autoprefixer >${temporary2}
#  uglifycss --debug --output dist/static/css/"${minify}" "${temporary2}"
#fi

#log-warning "Suppression du fichier temporaire"
#rm -rf "${temporary}" "${temporary2}"

minifyy "JS"
jsscripts=($(ls -Af './dist/static/js/'))
for script in "${jsscripts[@]}"; do
  file="./dist/static/js/${script}"
  if [[ "${script}" != '.' ]] && [[ "${script}" != '..' ]] && [[ "${file}" != *"tmp-"* ]] && [[ -f "${file}" ]]; then
    log-warning "\nProcessing ${script}"
    terser "${file}" -o "${file}" -b beautify=false,max_line_len=9007199254740991
    log-info "-- Finished ${script} --"
  else
    if [[ ! -f "${file}" ]] && [[ ! -d "${file}" ]]; then
      log-error "File ${file} not found"
    fi
  fi
done
