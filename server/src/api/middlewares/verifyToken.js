import jwt from 'jsonwebtoken'
import { jsonError, jsonSuccess } from '../../utils/result'
import { getEnv } from '../../utils/common'
import { MESSAGE_ERROR } from '../../constant/errors'
import { STATUS_CODE } from '../../constant/statusCode'
import { User } from '../models/users.model'

export const verifyToken = (req, res, next) => {
  try {
    let token = req.headers['x-access-token'] || req.headers['authorization']
    if (!token) {
      return res.status(STATUS_CODE.FORBIDDEN).json(jsonError(MESSAGE_ERROR.NO_ACCESS_TOKEN))
    }
    if (token && token.startsWith('Bearer ')) token = token.slice(7, token.length)
    jwt.verify(token, getEnv('SECRET_KEY'), async (err, decoded) => {
      if (err) {
        return res.status(STATUS_CODE.FORBIDDEN).json(jsonError(MESSAGE_ERROR.TOKEN_NOT_VALID))
      }

      const { id } = decoded

      const user = await User.findOne({ _id: id }).lean()

      delete user.password

      req.user = user
      next()
    })
  } catch (e) {
    throw e
  }
}
