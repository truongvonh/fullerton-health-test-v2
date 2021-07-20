import { createSlice } from '@reduxjs/toolkit'
import {AUTH_KEY} from "../../../constants/localStorage";

const initialState = {
  userInfo: JSON.parse(localStorage.getItem(AUTH_KEY.USER_LOGIN) || "{}"),
  loading: false,
  error: null,
}

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startProcess(state) {
      state.loading = true
    },
    getUserInfo(state, action) {
      state.userInfo = action.payload
    },
    onErrored(state, action) {
      state.error = action.payload
    },
    endProcess(state) {
      state.loading = false
    },
  },
})
