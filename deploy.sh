echo "> FE 배포"
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2
cd /home/ubuntu/deploy/next-app
yarn install
yarn build
pm2 delete all
yarn start