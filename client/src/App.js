import './App.css'
import { Redirect, Route, Switch } from 'react-router-dom'
import { PageEnum } from './router/page.enum'
import React from 'react'
import MainLayout from './layouts/MainLayout'
import { routeConfig, RouteWithSubRoutes } from './router/config'
import { shallowEqual, useSelector } from 'react-redux'
import { selectUserInfo } from './pages/LoginPage/store/selector'
import { USER_ROLE } from './pages/LoginPage/store/actions'

const LoginPage = React.lazy(() => import('./pages/LoginPage'))

function App() {
  const userInfo = useSelector(selectUserInfo, shallowEqual)

  const checkBookingPage =
    userInfo.role === USER_ROLE.ADMIN
      ? PageEnum.ADMIN_BOOKING_PAGE
      : PageEnum.HR_BOOKING_PAGE

  return (
    <Switch>
      <Route exact path={PageEnum.LOGIN_PAGE} component={LoginPage} />

      <MainLayout>
        <Switch>
          <Redirect exact from={PageEnum.DEFAULT_PAGE} to={checkBookingPage} />

          {routeConfig.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </MainLayout>
    </Switch>
  )
}

export default App
