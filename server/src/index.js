import dotenv from 'dotenv'
dotenv.config()
import "regenerator-runtime/runtime";

import express from 'express'
import errorhandler from 'errorhandler'
import bodyParser from 'body-parser'
import cors from 'cors'
import { corsOptions, getEnv } from './utils/common'
import mongodbConnection from './db/connection'
import { uriConnection } from './db/dbUrlConnect'
import api from './api'
import morgan from 'morgan'
import notifier from 'node-notifier'

const app = express()

mongodbConnection(uriConnection)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors(corsOptions))

function errorNotification(err, str, req) {
  const title = 'Error in ' + req.method + ' ' + req.url

  notifier.notify({
    title,
    err,
    str,
    req,
  })
}

app.use(errorhandler({ log: errorNotification }))

app.get('/', (req, res) => res.json('Hello World!'))
app.use('/api', api)
app.use(morgan('common'))

app.listen(process.env.PORT || getEnv('APP_PORT'), () => console.log(`app is running on port: ${getEnv('APP_PORT')}`))
