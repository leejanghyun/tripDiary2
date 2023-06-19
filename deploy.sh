echo "> FE 배포"
cd /home/ubuntu/deploy/next-app
yarn install
pm2 stop tripDiary
yarn build
pm2 start yarn --name "tripDiary" -- start