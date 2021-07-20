import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import {
  selectBookingModalStatus,
  selectbookingActionLoading,
} from '../../store/selector'
import { memo, useState } from 'react'
import { Button, DatePicker, Divider, Form, Modal, Select, message } from 'antd'
import { booking } from '../../store/reducer'
import TextArea from 'antd/lib/input/TextArea'
import { EVENT_TYPE, EVENT_TYPE_LABEL, TIME_FORMAT } from './constant'
import moment from 'moment'
import { onAddBooking } from '../../store/actions'

const { Option } = Select

const { toggleVisibleAddBooking } = booking.actions

const AddBookingModal = () => {
  const dispatch = useDispatch()
  const isVisibleBookingModel = useSelector(
    selectBookingModalStatus,
    shallowEqual
  )
  const bookingActionLoading = useSelector(
    selectbookingActionLoading,
    shallowEqual
  )

  const handleCancel = () => {
    dispatch(toggleVisibleAddBooking(false))
  }
  const [form] = Form.useForm()

  const onSerializeProposedDate = (formData) => {
    const result = { ...formData }
    result.proposedDate = []
    let index = 0
    for (const [key, value] of Object.entries(result)) {
      if (key.includes('proposedDate')) {
        if (moment.isMoment(value)) {
          result.proposedDate = [
            ...result.proposedDate,
            moment(value).format(TIME_FORMAT),
          ]
        }
        delete result[`proposedDate[${index}]`]

        index++
      }
    }

    return result
  }

  const onValidateProposedDate = (proposedDate) => {
    return new Set(proposedDate).size !== proposedDate.length
  }

  const onFinish = async (formData) => {
    const serializeProposedDate = onSerializeProposedDate(formData)

    const isDuplicateDate = onValidateProposedDate(
      serializeProposedDate.proposedDate
    )

    if (isDuplicateDate) {
      return message.error(
        'The Proposed Date are duplicated. Please check it again!'
      )
    }

    dispatch(onAddBooking(serializeProposedDate, form))
  }

  function disabledDate(current) {
    return current && current - 1 < moment().add(-1, 'days').endOf('day')
  }

  return (
    <Modal
      title="Create Booking for Admin"
      destroyOnClose
      visible={isVisibleBookingModel}
      onCancel={handleCancel}
      initialValues={{ proposedDate: [new Date(), new Date(), new Date()] }}
      footer={null}
    >
      <Form
        form={form}
        name="createBooking"
        onFinish={onFinish}
        layout={'vertical'}
        scrollToFirstError
      >
        <Form.Item
          name="location"
          label="Location"
          rules={[
            {
              required: true,
              message: 'Please input location!',
              whitespace: true,
            },
          ]}
        >
          <TextArea />
        </Form.Item>

        <Form.Item
          name="type"
          label="Booking type"
          rules={[{ required: true, message: 'Please select event type!' }]}
        >
          <Select placeholder="Select event type">
            {Object.values(EVENT_TYPE).map((value, index) => (
              <Option key={index} value={value}>
                {Object.values(EVENT_TYPE_LABEL)[index]}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {[0, 1, 2].map((_, index) => (
          <Form.Item
            key={index}
            label={`Proposed Date ${index + 1}`}
            name={`proposedDate[${index}]`}
            rules={[{ required: true, message: 'Please select date' }]}
          >
            <DatePicker
              format={TIME_FORMAT}
              showTime
              disabledDate={disabledDate}
            />
          </Form.Item>
        ))}

        <Divider />
        <div className={'booking-btn-wrapper'}>
          <Button
            type="primary"
            htmlType="submit"
            loading={bookingActionLoading}
          >
            Add
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default memo(AddBookingModal)
