#!/bin/sh
cd www
yarn install
yarn build
yarn deploy:root:travis
