#! /bin/sh
npm i
npm run build
rm -rf publish
mkdir publish
cp -r dist/* publish
cd publish

git init
git add -A
date_str=`date "+DATE: %m/%d/%Y%nTIME: %H:%M:%S"`
git commit -m "build on $date_str"
#exit
echo 'push remote github'
git push -u git@github.com:ksky521/welicai.git master:gh-pages --force
