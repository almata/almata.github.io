#!/bin/bash

git add .
git commit -m "(Note) $1"
git push origin master
cd _site
git checkout CNAME
git add .
git commit -m "(Note) $1"
git push origin master
cd ..
