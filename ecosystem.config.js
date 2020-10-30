module.exports = {
  apps : [{
    name: 'style_nodejs',
    script: 'index.js',
    autorestart: true,
    watch: false,
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
