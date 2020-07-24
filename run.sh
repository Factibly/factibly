#!/usr/bin/env bash

# FAKECHECK PROJECT SETUP SCRIPT
# Created by Jadon
# Last updated on July 22, 2020


function kill_local_host {
  kill $(lsof -t -i:$1)
}

function cleanup {
  echo "Cleaning up after your stuff..."
  kill_local_host 3000 || echo "No need for a clean-up on port 3000"
  kill_local_host 8000 || echo "No need for a clean-up on port 8000"
}

trap cleanup EXIT
trap cleanup INT


set -e


function display_help {
  echo "
    USAGE: ./run.sh [-h] [-b] [-p] [-c num] [-w path] [-a path]
    --------------------------------------------------------------------------------------------------------------
    |  FLAG  |  DESCRIPTION                                          |  VALUE        |  DEFAULT                  |
    |--------|-------------------------------------------------------|---------------|---------------------------|
    |  -h    |  display help messages                                |  -------      |  not specified            |  
    |  -b    |  install dependencies through homebrew (recommended)  |  -------      |  not specified            |  
    |  -p    |  resolve common psycopg2 installation issue           |  -------      |  not specified            |  
    |  -c    |  0: no clone, 1: public repos, 2: private repos       |  integer      |  0                        |  
    |  -w    |  change directory path of the web front-end project   |  path         |  initial child directory  |  
    |  -a    |  change directory path of the back-end project        |  path         |  initial child directory  |  
    --------------------------------------------------------------------------------------------------------------
  "
}

BREW_FLOW=0
RESOLVE_PSYCOGP2=0
CLONE_REPO=0
REMOTE_BRANCH=master
WEB_DIR="./Fakenews-Web"
API_DIR="./Fakenews-backend"
ERR_NUM=0

while getopts ":hbpc:u:w:a:" FLAG
do
  case $FLAG in
    h) display_help; ERR_NUM=1;;
    b) BREW_FLOW=1;;
    p) RESOLVE_PSYCOGP2=1;;
    c) CLONE_REPO=$OPTARG;; 
    u) REMOTE_BRANCH=$OPTARG;;
    w) WEB_DIR=$OPTARG;;
    a) API_DIR=$OPTARG;;
    \?) echo "ERROR: One or more of the flags is not recognized by this script"; display_help; ERR_NUM=1;;
  esac
done
wait

if [ $ERR_NUM -ge 1 ] ; then
  exit 1
fi


if [ $BREW_FLOW -ge 1 ] ; then
  which -s brew
  if [[ $? != 0 ]] ; then
    /bin/bash "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  else
    brew update
  fi

  PYTHON_STANDARD=$(python --version)
  PYTHON_FALLBACK=$(python3 --version)
  PYTHON_3_7_REGEX="^Python3.7.*$" 
  if [[ ! $PYTHON_STANDARD =~ $PYTHON_3_7_REGEX} ]] || [[ ! $PYTHON_FALLBACK =~ $PYTHON_3_7_REGEX ]] ; then
    brew install python@3.7
    export PATH="/usr/local/opt/python/libexec/bin:$PATH"
  fi 

  which -s git
  if [[ $? != 0 ]] ; then
    brew install git
    export PATH="/usr/local/bin:${PATH}"
  fi

  brew install yarn

  brew install pipenv
  brew install docker
  brew install docker-compose
  brew install postgresql

  etc=/Applications/Docker.app/Contents/Resources/etc
  ln -s $etc/docker.bash-completion $(brew --prefix)/etc/bash_completion.d/docker
  ln -s $etc/docker-compose.bash-completion $(brew --prefix)/etc/bash_completion.d/docker-compose
  if [ -f $(brew --prefix)/etc/bash_completion ]; then
  . $(brew --prefix)/etc/bash_completion
  else
    exit 1
  fi
fi


if [ $CLONE_REPO -eq 1 ] ; then
  git clone https://github.com/Sapphire-Labs/Hackathon.git
  WEB_DIR="FE"
  API_DIR="BE"
elif [ $CLONE_REPO -eq 2 ] ; then
  git clone https://github.com/Sapphire-Labs/Fakenews-Web.git
  git clone https://github.com/Sapphire-Labs/Fakenews-backend.git
else 
  echo "WARNING: This script has assumed that you have a copy of the source code for this project and therefore did not run git clone (see the -g flag options)"
fi


function run_front {
  cd $WEB_DIR

  yarn install
  yarn global add forever

  yarn start
  wait

  cd -
}


function run_back_docker {
  cd $API_DIR

  docker-compose up

  cd -
}


function run_back_pipenv {
  cd $API_DIR

  if [ $RESOLVE_PSYCOGP2 -eq 1 ] ; then
    brew reinstall openssl
    export LIBRARY_PATH=$LIBRARY_PATH:/usr/local/opt/openssl/lib
    export LDFLAGS="-L/usr/local/opt/openssl/lib"
    export CPPFLAGS="-I/usr/local/opt/openssl/include"
    pip3 install psycopg2-binary
  fi
  pipenv install || echo "ERROR: The pipenv install command did not run successfully, perhaps due to the psycopg2 package (see the -p flag options for a potential fix)"
  export PIPENV_VENV_IN_PROJECT="enabled"

  pipenv run python3 manage.py migrate
  pipenv run python3 manage.py runserver

  cd -
}


run_front &
run_back_docker &
run_back_pipenv &
{
  wait
  echo "SUCCESS: The installation process was successfully completed"
  echo "SUCCESS: You can view and test the website locally on http://localhost:3000"
  echo "SUCCESS: You can make API calls through http://localhost:8000"
}
