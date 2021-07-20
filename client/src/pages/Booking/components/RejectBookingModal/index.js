import { memo } from 'react'
import { Button, Divider, Form, Input, Modal, Space } from 'antd'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { selectVisibleRejectModal } from '../../store/selector'
import { booking } from '../../store/reducer'
import { onAdminUpdateBookingStatus } from '../../store/actions'
import { EVENT_STATUS } from '../ListBooking'

const { toggleRejectModal } = booking.actions

const RejectBookingModal = () => {
  const isVisibleRejectModal = useSelector(
    selectVisibleRejectModal,
    shallowEqual
  )
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const handleCancel = () => {
    dispatch(toggleRejectModal({ isVisibleRejectModal: false }))
  }

  const onFinish = ({ reasonRejected }) =>
    dispatch(onAdminUpdateBookingStatus(reasonRejected, EVENT_STATUS.REJECTION))

  return (
    <Modal
      title="Reject this booking"
      destroyOnClose
      visible={isVisibleRejectModal}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        form={form}
        name="approveBooking"
        onFinish={onFinish}
        layout={'vertical'}
      >
        <Form.Item
          name="reasonRejected"
          label="Reason rejected"
          rules={[
            { required: true, message: 'Please select input the reason!' },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Divider />

        <div className={'booking-btn-wrapper'}>
          <Space>
            <Button type={'ghost'} danger onClick={handleCancel}>
              Cancel
            </Button>

            <Button type={'primary'} danger htmlType={'submit'}>
              Reject
            </Button>
          </Space>
        </div>
      </Form>
    </Modal>
  )
}

export default memo(RejectBookingModal)
