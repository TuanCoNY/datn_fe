import { useQuery } from '@tanstack/react-query'
import React from 'react'
import * as OrderService from '../../services/OrderService'
import Loading from '../../components/LoadingComponent/Loading'
import { convertPrice } from '../../utils'
import { WrapperItemOrder, WrapperStatus, WrapperListOrder, WrapperContainer, WrapperHeaderItem, WrapperFooterItem, WrapperHeaderTitle } from './style'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutationHooks } from '../../hooks/useMutationHooks'
import { useEffect } from 'react'
import { message } from 'antd'

const MyOrderPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { state } = location
  const fetchMyOrder = async () => {
    const res = await OrderService.getOrderbyUserId(state?.id, state?.token)
    return res.data

  }
  const queryOrder = useQuery({
    queryKey: ['orders'],
    queryFn: fetchMyOrder,
    enabled: !!state?.id && !!state?.token
  });


  const { isPending, data } = queryOrder
  const handleDetailsOrder = (id) => {
    navigate(`/details-order/${id}`, {
      state: state?.token,
    })
  }
  const mutation = useMutationHooks(
    (data) => {
      const { id, token, orderItems } = data
      const res = OrderService.cancelOrder(id, token, orderItems)
      return res
    }
  )
  const handleCancelOrder = (order) => {
    mutation.mutate({ id: order._id, token: state?.token, orderItems: order?.orderItems }, {
      onSuccess: () => {
        queryOrder.refetch()
      }
    })
  }
  const { isPending: isPendingCancel, isSuccess: isSuccessCancel, isError: isErrorCancel, data: dataCancel } = mutation
  useEffect(() => {
    if (isSuccessCancel && dataCancel?.status === 'OK') {
      message.success('Hủy đơn hàng thành công')
    } else if (isErrorCancel) {
      message.error()
    }
  }, [isErrorCancel, isSuccessCancel])
  const renderProduct = (data) => {
    return data?.map((order) => {
      return <WrapperHeaderItem key={order?._id}>
        <img src={order?.image}
          style={{
            width: "120px",
            height: "120px",
            objectFit: "cover",
            border: "1px solid rgb(238, 238, 238)",
            padding: "2px",
          }}
        />
        <div style={{
          width: 260,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          marginLeft: "10px"
        }}>
          {order?.name}
        </div>
        <span style={{ fontSize: "13px", color: "#242424", marginLeft: "auto" }}>
          {convertPrice(order?.price)}
        </span>
      </WrapperHeaderItem>
    })
  }
  return (
    <Loading isPending={isPending || isPendingCancel}>
      <WrapperContainer>
        <div style={{ height: '100%', width: '1270px', margin: '0, auto' }}>
          <WrapperHeaderTitle>Đơn hàng của tôi</WrapperHeaderTitle>
          <WrapperListOrder>
            {data?.map((order) => {
              console.log(order)

              return (
                <WrapperItemOrder key={order?._id}>
                  <WrapperStatus>
                    <span style={{ fontSize: "14px", fontWeight: "bold" }}>Trạng thái</span>
                    <div>
                      <span style={{ color: "rgb(255, 66, 78)" }}>Giao hàng: </span>
                      {order.isDelivered ? 'Đã giao hàng' : 'Chưa giao hàng'}
                    </div>
                    <div>
                      <span style={{ color: "rgb(255, 66, 78)" }}>Thanh toán: </span>
                      {order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                    </div>
                  </WrapperStatus>
                  {renderProduct(order?.orderItems)}
                  <WrapperFooterItem>
                    <span style={{ color: "rgb(255, 66, 78)" }}>Tổng tiền: </span>
                    <span
                      style={{ fontSize: "13px", color: "rgb(56, 56, 61)", fontWeight: 700 }}
                    >
                      {convertPrice(order?.totalPrice)}
                    </span>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <ButtonComponent
                        onClick={() => handleCancelOrder(order)}
                        size={40}
                        styleButton={{
                          height: "36px",
                          border: "1px solid rgb(11, 116, 229)",
                          borderRadius: "4px",
                        }}
                        texbutton={"Hủy đơn hàng"}
                        styletexbutton={{ color: "rgb(11, 116, 229)", fontSize: "14px" }}
                      />
                      <ButtonComponent
                        onClick={() => handleDetailsOrder(order?._id)}
                        size={40}
                        styleButton={{
                          height: "36px",
                          border: "1px solid rgb(11, 116, 229)",
                          borderRadius: "4px",
                        }}
                        texbutton={"Xem chi tiết"}
                        styletexbutton={{ color: "rgb(11, 116, 229)", fontSize: "14px" }}
                      />
                      <span style={{ display: 'flex', justifyItems: 'center', alignItems: 'center' }}> Địa chỉ giao hàng : {order?.shippingAddress?.address} - {order?.shippingAddress?.city}</span>
                    </div>
                  </WrapperFooterItem>

                </WrapperItemOrder>
              )
            })
            }
          </WrapperListOrder>
        </div>
      </WrapperContainer>
    </Loading>
  )
}

export default MyOrderPage