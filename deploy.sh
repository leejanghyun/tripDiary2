echo "> FE 배포"
cd /home/ubuntu/deploy/next-app
pm2 delete tripDiary
yarn install
yarn build
pm2 start yarn --name "tripDiary" -- start