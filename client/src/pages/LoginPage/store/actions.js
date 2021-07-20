import { auth } from './reducer'
import { AUTH_ENDPOINT } from '../../../constants/endpoint'
import axiosInstance from '../../../api/axiosInstance'
import { AUTH_KEY } from '../../../constants/localStorage'
import { message } from 'antd'
import { sleep } from '../../../utils/helper'
import { PageEnum } from '../../../router/page.enum'

const { startProcess, onErrored, endProcess } = auth.actions

export const USER_ROLE = {
  HR: 'HR',
  ADMIN: 'ADMIN',
}

export const loginUser = (payload) => async (dispatch, getState) => {
  try {
    dispatch(startProcess())

    const userLoginResponse = await new axiosInstance.post(
      AUTH_ENDPOINT.LOGIN,
      payload
    )
    localStorage.setItem(AUTH_KEY.USER_TOKEN, userLoginResponse?.data?.token)

    const currentUserResponse = await new axiosInstance.get(
      AUTH_ENDPOINT.CURRENT_USER
    )

    localStorage.setItem(
      AUTH_KEY.USER_LOGIN,
      JSON.stringify(currentUserResponse?.data)
    )
    message.success('Login success!')

    window.location =
      currentUserResponse.data.role === USER_ROLE.HR
        ? PageEnum.HR_BOOKING_PAGE
        : PageEnum.ADMIN_BOOKING_PAGE
  } catch (err) {
    message.error(err?.response?.data?.error || 'login failed')
    dispatch(onErrored(err))
  } finally {
    await new sleep(1000)
    dispatch(endProcess())
  }
}
