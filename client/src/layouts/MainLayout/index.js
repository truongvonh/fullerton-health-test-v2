import React, { memo } from 'react'
import { Breadcrumb, Button, Layout, Menu, Popconfirm } from 'antd'
import './style.scss'
import { shallowEqual, useSelector } from 'react-redux'
import { selectUserInfo } from '../../pages/LoginPage/store/selector'
import { PoweroffOutlined } from '@ant-design/icons'
import { AUTH_KEY } from '../../constants/localStorage'
import { PageEnum } from '../../router/page.enum'

const { Header, Content } = Layout

const MainLayout = ({ children }) => {
  const useInfo = useSelector(selectUserInfo, shallowEqual)

  const onLogOut = () => {
    localStorage.removeItem(AUTH_KEY.USER_LOGIN)
    localStorage.removeItem(AUTH_KEY.USER_TOKEN)
    window.location = PageEnum.LOGIN_PAGE
  }

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          {/*<Menu.Item key="1">nav 1</Menu.Item>*/}
          {/*<Menu.Item key="2">nav 2</Menu.Item>*/}
          {/*<Menu.Item key="3">nav 3</Menu.Item>*/}

          <Menu.Item style={{ marginLeft: 'auto' }} key="4" disabled>
            {useInfo.name}
          </Menu.Item>
          <Menu.Item key="5">
            <Popconfirm
              placement="topLeft"
              title={'Are you sure log out?'}
              onConfirm={onLogOut}
              okText="Yes"
              cancelText="No"
            >
              <Button type={'danger'}>
                <PoweroffOutlined />
                Log out
              </Button>
            </Popconfirm>
          </Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>{useInfo.role}</Breadcrumb.Item>
            <Breadcrumb.Item>Bookings</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default memo(MainLayout)
