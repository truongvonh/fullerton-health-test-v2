import dotenv from 'dotenv'
dotenv.config()

const ENV = {
  API_URL: 'http://localhost:3000',
  APP_PORT: '5000',
  DB_USER_NAME: 'vonhattruong',
  DB_PASSWORD: 'brl8rMmRP2bhjfp5',
  DB_NAME: 'fullerton-health-db',

  EXPIRE_TIME: '24h',
  HASH_ALGORITHM: 'HS384',
  SECRET_KEY: '2D&9EqNy',
}

export const getEnv = (value) => ENV[value]

export const corsOptions = {
  // allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
  preflightContinue: false,
}

export const convertMongoObjectToJson = (data) => JSON.parse(JSON.stringify(data))
