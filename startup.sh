#!/bin/bash
cd simple-api
npm install
npm start &

cd ../posts-app
npm install
npm start
