const server = require('./server')
const port = process.env.PORT || 3000

server.listen(port)
console.log('Servidor listening ' + port)

server.on('error', (err) => {
  console.error(err)
})
