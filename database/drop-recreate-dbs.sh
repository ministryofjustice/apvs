#!/bin/bash

# Assumes called from apvs/database folder with apvs-internal-web/apvs-external-web repos in parent source folder
node drop-schemas-users.js && node create-schemas-users.js
cd ../../apvs-internal-web
npm run-script migrations
cd ../apvs-external-web
npm run-script migrations
cd ..

