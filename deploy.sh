echo "> FE 배포"
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2
cd /home/ubuntu/deploy/next-app
yarn install
pm2 stop tripDiary
yarn build
yarn start