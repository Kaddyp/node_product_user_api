module.exports = {
  apps : [{
    name   : "node_product_user_api",
    script : "./server.js",
    max_memory_restart: '400MB',
    env_production: {
      NODE_ENV: "production"
   },
   env_development: {
      NODE_ENV: "development"
   }
  }]
}
