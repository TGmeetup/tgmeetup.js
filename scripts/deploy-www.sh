#!/bin/sh
cd www
yarn install
yarn deploy:root:travis
