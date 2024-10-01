const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const dotenv = require('dotenv')
const router = require('./routes')
const connectToDatabase = require('./config/database')
const errorHandlerMiddleware = require('./middlewares/errorHandler.middleware')
dotenv.config()

const PORT = process.env.PORT || 4000

const app = express()

app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(router)
app.use(errorHandlerMiddleware)

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Starting Express server on http://localhost:${PORT}`)
    })
  })
  .catch((e) => {
    console.log(`Some error occurred while trying to start the server`, e)
  })

module.exports = app
