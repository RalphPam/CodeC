const express = require('express')

const app = express()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
   console.log(`Server started at port ${PORT}`)
})

app.get('/', (req, res) => {
   res.send('API running')
})
