const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const m = (name, text, id) => ({name, text, id})

io.on('connection', socket => {
  socket.on('userJoined', (data, cd) => {
    if (!data.name || !data.room) {
      return cd('Data is incorrect')
    }

    socket.join(data.room)
    cd({userId: socket.id})
    socket.emit('newMessage', m('admin', `Welcome ${data.name}.`))
    socket.broadcast
      .to(data.room)
      .emit('newMessage', m('admin', `User ${data.name} come in.`))
  })

  socket.on('createMessage', data => {
    setTimeout(() => {
      socket.emit('newMessage', {
        text: data.text + ' SERVER'
      })
    }, 500)
  })
})

module.exports = {
  app,
  server
}
