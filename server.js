const express = require('express')
const connectDB = require('./config/db')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

connectDB()

//Allows us to access the request data
app.use(express.json({ extended: false }))

app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

if (process.env.NODE_ENV === 'production') {
   app.use(express.static('client/build'))
   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
   })
}

io.on("connection", socket => {
   console.log('Socket Connected')
   socket.on('post', status => {
      socket.broadcast.emit('Post status', status)
   })
   socket.on('comment', status => {
      socket.broadcast.emit('Comment status', status)
   })
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
   console.log(`Server started at port ${PORT}`)
})
