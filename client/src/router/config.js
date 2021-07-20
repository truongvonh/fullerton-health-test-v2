import { Route, Redirect } from 'react-router-dom'
import { PageEnum } from './page.enum'
import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { selectUserInfo } from '../pages/LoginPage/store/selector'

const HRBookingPage = React.lazy(() => import('../pages/Booking/HR'))
const AdminBookingPage = React.lazy(() => import('../pages/Booking/Admin'))
const LoginPage = React.lazy(() => import('../pages/LoginPage'))
const NotFoundPage = React.lazy(() => import('../pages/NotFoundPage'))

export const routeConfig = [
  {
    path: PageEnum.HR_BOOKING_PAGE,
    isPrivate: true,
    exact: true,
    component: HRBookingPage,
  },
  {
    path: PageEnum.ADMIN_BOOKING_PAGE,
    isPrivate: true,
    exact: true,
    component: AdminBookingPage,
  },
  {
    path: PageEnum.BOARD_DETAIL_PAGE,
    isPrivate: true,
    exact: true,
    component: LoginPage,
  },
  { path: PageEnum.NOT_FOUND_PAGE, component: NotFoundPage },
]

const PrivateRoute = (privateProps) => {
  const userInfo = useSelector(selectUserInfo, shallowEqual)

  if (Object.values(userInfo).length)
    return <privateProps.component {...privateProps} />

  return <Redirect to={PageEnum.LOGIN_PAGE} />
}

export const RouteWithSubRoutes = (route) => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) =>
        route.isPrivate ? (
          <PrivateRoute {...route} />
        ) : (
          <route.component {...props} />
        )
      }
    />
  )
}
