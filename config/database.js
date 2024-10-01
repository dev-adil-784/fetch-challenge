const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST, MONGO_PORT, MONGO_DB_NAME } =
  process.env

const mongoURI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}?authSource=admin`

const options = {}

const connectToDatabase = async () => {
  mongoose
    .connect(mongoURI, options)
    .then(() => {
      console.log('Connected to MongoDB')
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error)
    })

  const db = mongoose.connection
  db.on('error', (error) => {
    console.error('MongoDB connection error:', error)
  })

  db.once('open', () => {
    console.log('Connection to MongoDB establish successfully')
  })

  db.on('disconnected', () => {
    console.log('Disconnected from MongoDB')
  })

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(
        'Mongoose connection is disconnected due to application termination',
      )
      process.exit(0)
    })
  })
}

module.exports = connectToDatabase
