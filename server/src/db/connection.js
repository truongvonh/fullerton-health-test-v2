import mongoose from 'mongoose'
import { COMMON_MESSAGE } from '../constant/info'
import { MESSAGE_ERROR } from '../constant/errors'

const mongodbConnection = (db) => {
  const connect = () => {
    mongoose
      .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.info(`${COMMON_MESSAGE.SUCCESS_CONNECT_DB} ${db}`))
      .catch((error) => {
        console.error(`${MESSAGE_ERROR.CONNECT_DB_FAILED} ${error}`)
        return process.exit(1)
      })
  }
  connect()

  mongoose.connection.on('disconnected', connect)
}

export default mongodbConnection
