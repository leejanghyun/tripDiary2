module.exports = {
  apps: [
    {
      name: 'tripDiary',
      script: 'yarn',
      args: 'run start',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        PORT: 443,
        NODE_ENV: 'development',
      },
      env_production: {
        PORT: 443,
        NODE_ENV: 'production',
      },
      output: './logs/console.log',
      error: './logs/consoleError.log',
    },
  ],
}
