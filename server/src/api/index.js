import authRouter from './routes/auth.routes'
import express from 'express'
import bookingRoutes from "./routes/booking.routes";
const api = express()

api.use('/auth', authRouter)
api.use('/booking', bookingRoutes)

export default api
