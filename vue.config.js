const { defineConfig } = require('@vue/cli-service')
module.exports = {
  devServer: {
    allowedHosts: "all",  // Permite todos los hosts
    host: '0.0.0.0',      // Permite conexiones externas
    port: 8080            // Puerto donde correrá el servidor
  }
};

