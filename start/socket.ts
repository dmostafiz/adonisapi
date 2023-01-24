import Ws from 'App/Services/Ws'
Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {

  console.log('Client connection established')

  socket.emit('news', { hello: 'world' })

  socket.on('greetings', (data) => {
    console.log('Server say\'s: ', data)
  })






  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })

})


