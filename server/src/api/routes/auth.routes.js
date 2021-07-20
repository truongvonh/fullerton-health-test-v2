import { Router } from 'express'
import { getUserInfoController, signInController, signUpController } from '../controller/auth.controller'
import inputValidateMiddleWare from '../middlewares/inputValidate.middleware'
import validateSchema from '../controller/validation'
import { verifyToken } from '../middlewares/verifyToken'

const authRouter = Router()
authRouter.post('/sign-up', inputValidateMiddleWare(validateSchema.signUp), signUpController)

authRouter.get('/current-user', verifyToken, getUserInfoController)

authRouter.post('/login', inputValidateMiddleWare(validateSchema.signIn), signInController)

export default authRouter
