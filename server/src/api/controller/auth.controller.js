import {jsonError, jsonSuccess} from '../../utils/result'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {getEnv} from '../../utils/common'
import {User} from '../models/users.model'
import {MESSAGE_ERROR} from '../../constant/errors'
import {STATUS_CODE} from '../../constant/statusCode'

export const signUpController = async (req, res) => {
  const { name, email, password } = req.body
  const user = await User.findOne({ name })
  const userEmail = await User.findOne({ email })
  if (user) {
    return res.status(STATUS_CODE.INTERNAL_ERROR).json(jsonError(MESSAGE_ERROR.USER_EXIST))
  }

  if (userEmail) {
    return res.status(STATUS_CODE.INTERNAL_ERROR).json(jsonError(MESSAGE_ERROR.DOCUMENT_EXIST))
  }

  const result = await User.create({
    ...req.body,
    password: bcrypt.hashSync(password, 8),
  })

  return res.status(STATUS_CODE.SUCCESS).json(jsonSuccess(result))
}

export const signInController = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(STATUS_CODE.ERROR).json(jsonError(MESSAGE_ERROR.USER_NOT_FOUND))
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password)

  if (!passwordIsValid) {
    return res.status(STATUS_CODE.FORBIDDEN).json(jsonError(MESSAGE_ERROR.PASSWORD_WRONG))
  }

  const token = jwt.sign({ id: user.id }, getEnv('SECRET_KEY'), {
    expiresIn: getEnv('EXPIRE_TIME'),
    algorithm: getEnv('HASH_ALGORITHM'),
  })

  delete user.password

  return res.status(STATUS_CODE.SUCCESS).json(jsonSuccess({ token }))
}

export const getUserInfoController = async (req, res) => {
  const user = req.user

  return res.status(STATUS_CODE.SUCCESS).json(jsonSuccess({ ...user }))
}
