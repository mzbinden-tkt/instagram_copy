const apiServices = require('../controller/index')

const routers = (app) => {
  app.use('/api', apiServices)
}

module.exports = routers
