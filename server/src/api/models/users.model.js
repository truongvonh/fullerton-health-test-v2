import * as mongoose from 'mongoose'

export const USER_ROLE_ENUM = {
  ADMIN: 'ADMIN',
  HR: 'HR',
}

export const UserModelName = 'User'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(USER_ROLE_ENUM),
    default: USER_ROLE_ENUM.ADMIN
  },
})

export const User = mongoose.model(UserModelName, UserSchema)
