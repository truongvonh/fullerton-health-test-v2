import React, { memo } from 'react'
import './style.scss'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Button, Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { selectUserInfo, selectUserLoading } from './store/selector'
import { loginUser } from './store/actions'
import { PageEnum } from '../../router/page.enum'
import { Redirect } from 'react-router-dom'

const LoginPage = () => {
  const dispatch = useDispatch()
  const loading = useSelector(selectUserLoading, shallowEqual)
  const userLogin = useSelector(selectUserInfo, shallowEqual)
  const [form] = Form.useForm()

  if (Object.values(userLogin).length) {
    return <Redirect to={PageEnum.BOOKING_PAGE} />
  }

  const onFinish = (values) => {
    dispatch(loginUser(values))
  }

  return (
    <div className={'login-page'}>
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        onFinish={onFinish}
      >
        <h1>Fullerton Health System</h1>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please input your Username!' },
            { type: 'email', message: 'The input is not valid E-mail!' },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            type={'email'}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default memo(LoginPage)
