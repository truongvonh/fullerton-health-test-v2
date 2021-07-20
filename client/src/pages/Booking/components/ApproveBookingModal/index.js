import { memo } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import {
  selectBookingSelected,
  selectVisibleApproveModal,
} from '../../store/selector'
import { booking } from '../../store/reducer'
import { Button, Divider, Form, Modal, Radio, Space } from 'antd'
import moment from 'moment'
import { TIME_FORMAT } from '../AddBookingModal/constant'
import {onAdminUpdateBookingStatus} from "../../store/actions";

const { toggleApproveModal } = booking.actions

const ApproveBookingModal = () => {
  const dispatch = useDispatch()
  const isVisibleApproveModal = useSelector(
    selectVisibleApproveModal,
    shallowEqual
  )
  const bookingSelected = useSelector(selectBookingSelected, shallowEqual)
  const handleCancel = () => {
    dispatch(toggleApproveModal({ isVisibleApproveModal: false }))
  }

  const [form] = Form.useForm()

  const onFinish = ({ confirmDate }) => {
    dispatch(onAdminUpdateBookingStatus(confirmDate))
  }

  return (
    <Modal
      title="Approve this booking"
      destroyOnClose
      visible={isVisibleApproveModal}
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
          name="confirmDate"
          label="Confirm date"
          rules={[{ required: true, message: 'Please select confirm date!' }]}
        >
          <Radio.Group>
            {bookingSelected?.proposedDate?.map((date, index) => (
              <Radio key={index} value={date}>
                {moment(date).format(TIME_FORMAT)}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>

        <Divider />

        <div className={'booking-btn-wrapper'}>
          <Space>
            <Button type={'ghost'} danger onClick={handleCancel}>
              Cancel
            </Button>

            <Button type={'primary'} htmlType={'submit'}>
              Approve
            </Button>
          </Space>
        </div>
      </Form>
    </Modal>
  )
}

export default memo(ApproveBookingModal)
