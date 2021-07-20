import { Button, Popconfirm, Space, Table, Tag } from 'antd'
import { memo } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { selectUserInfo } from '../../../LoginPage/store/selector'
import { USER_ROLE } from '../../../LoginPage/store/actions'
import {
  CheckOutlined,
  CloseCircleFilled,
  CloseOutlined,
} from '@ant-design/icons'
import { onCancelBookingAction } from '../../store/actions'
import { EVENT_TYPE_LABEL, TIME_FORMAT } from '../AddBookingModal/constant'
import moment from 'moment'
import { booking } from '../../store/reducer'

const { toggleApproveModal, toggleRejectModal } = booking.actions

export const EVENT_STATUS = {
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTION: 'Rejection',
  CANCEL: 'cancel',
}

const TAG_COLOR = {
  [EVENT_STATUS.PENDING]: 'geekblue',
  [EVENT_STATUS.APPROVED]: 'green',
  [EVENT_STATUS.REJECTION]: 'volcano',
  [EVENT_STATUS.CANCEL]: 'cyan',
}

const columnsV2 = (
  userRole,
  onCancelBooking = () => null,
  onApproveBooking = () => null,
  onRejectBooking = () => null
) => [
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: (type) => EVENT_TYPE_LABEL[type] || '',
  },
  {
    title: 'Reason Rejected',
    dataIndex: 'reasonRejected',
    key: 'reasonRejected',
  },
  {
    title: 'Created Date',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (createdAt) => moment(createdAt).format(TIME_FORMAT),
  },
  {
    title: 'Confirm Date',
    dataIndex: 'confirmDate',
    key: 'confirmDate',
    render: (confirmDate) => moment(confirmDate).format(TIME_FORMAT),
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (status) => (
      <>
        <Tag color={TAG_COLOR[status]} key={status}>
          {status}
        </Tag>
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => {
      if (record.status === EVENT_STATUS.CANCEL) return null

      if (userRole === USER_ROLE.HR && record.status === EVENT_STATUS.PENDING) {
        return (
          <div>
            <Popconfirm
              placement="topLeft"
              title={'Are you sure for cancel this booking'}
              onConfirm={() => onCancelBooking(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger>
                <CloseCircleFilled />
                Cancel
              </Button>
            </Popconfirm>
          </div>
        )
      }

      if (
        userRole === USER_ROLE.ADMIN &&
        record.status === EVENT_STATUS.PENDING
      ) {
        return (
          <div>
            <Space>
              <Button
                type={'primary'}
                onClick={() => onApproveBooking(record._id)}
              >
                <CheckOutlined />
                Approve
              </Button>
              <Button
                onClick={() => onRejectBooking(record._id)}
                type={'danger'}
              >
                <CloseOutlined />
                Reject
              </Button>
            </Space>
          </div>
        )
      }
    },
  },
]

const ListBooking = ({ dataSource, loading }) => {
  const user = useSelector(selectUserInfo, shallowEqual)
  const dispatch = useDispatch()

  const onCancelBooking = (bookingId) => {
    dispatch(onCancelBookingAction(bookingId))
  }

  const onApproveBooking = (bookingId) => {
    dispatch(toggleApproveModal({ bookingId, isVisibleApproveModal: true }))
  }

  const onRejectBooking = (bookingId) =>
    dispatch(toggleRejectModal({ bookingId, isVisibleRejectModal: true }))

  return (
    <Table
      columns={columnsV2(
        user.role,
        onCancelBooking,
        onApproveBooking,
        onRejectBooking
      )}
      dataSource={dataSource}
      loading={loading}
    />
  )
}

export default memo(ListBooking)
