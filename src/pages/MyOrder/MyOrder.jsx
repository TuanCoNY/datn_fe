import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import * as OrderService from '../../services/OrderService';
import Loading from '../../components/LoadingComponent/Loading';
import { convertPrice } from '../../utils';
import { WrapperItemOrder, WrapperStatus, WrapperListOrder, WrapperContainer, WrapperHeaderItem, WrapperFooterItem, WrapperHeaderTitle } from './style';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutationHooks } from '../../hooks/useMutationHooks';
import { message } from 'antd';

const MyOrderPage = () => {
  const [orderReceived, setOrderReceived] = useState({}); // Dùng đối tượng để lưu trạng thái từng đơn hàng
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  // Khi component được mount, kiểm tra và lấy dữ liệu từ localStorage nếu có
  useEffect(() => {
    const storedOrderReceived = localStorage.getItem('orderReceived');
    if (storedOrderReceived) {
      setOrderReceived(JSON.parse(storedOrderReceived)); // Cập nhật lại state từ localStorage
    }
  }, []);

  const fetchMyOrder = async () => {
    const res = await OrderService.getOrderbyUserId(state?.id, state?.token);
    return res.data;
  };

  const queryOrder = useQuery({
    queryKey: ['orders'],
    queryFn: fetchMyOrder,
    enabled: !!state?.id && !!state?.token,
  });

  const { isPending, data } = queryOrder;

  const handleDetailsOrder = (id) => {
    navigate(`/details-order/${id}`, {
      state: state?.token,
    });
  };

  const mutation = useMutationHooks(
    (data) => {
      const { id, token, orderItems } = data;
      const res = OrderService.cancelOrder(id, token, orderItems);
      return res;
    }
  );

  const handleCancelOrder = (order) => {
    mutation.mutate({ id: order._id, token: state?.token, orderItems: order?.orderItems }, {
      onSuccess: () => {
        queryOrder.refetch();
      },
    });
  };

  const { isPending: isPendingCancel, isSuccess: isSuccessCancel, isError: isErrorCancel, data: dataCancel } = mutation;

  useEffect(() => {
    if (isSuccessCancel && dataCancel?.status === 'OK') {
      message.success('Hủy đơn hàng thành công');
    } else if (isErrorCancel) {
      message.error('Có lỗi xảy ra khi hủy đơn hàng');
    }
  }, [isErrorCancel, isSuccessCancel]);

  // Hàm xử lý khi người dùng nhấn "Đã nhận được hàng"
  const handleReceivedOrder = (order) => {
    OrderService.markOrderAsReceived(order._id, state?.token).then((res) => {
      if (res?.status === 'SUCCESS') {
        message.success('Đã nhận được hàng');
        queryOrder.refetch();  // Cập nhật lại dữ liệu đơn hàng
        setOrderReceived((prevState) => {
          const updatedState = {
            ...prevState,
            [order._id]: true,  // Cập nhật trạng thái của đơn hàng này là đã nhận
          };
          localStorage.setItem('orderReceived', JSON.stringify(updatedState)); // Lưu vào localStorage
          return updatedState;
        });
      } else {
        message.error('Có lỗi xảy ra khi cập nhật trạng thái đơn hàng');
      }
    });
  };

  const renderProduct = (data) => {
    return data?.map((order) => {
      return (
        <WrapperHeaderItem key={order?._id}>
          <img
            src={order?.image}
            style={{
              width: '120px',
              height: '120px',
              objectFit: 'cover',
              border: '1px solid rgb(238, 238, 238)',
              padding: '2px',
            }}
          />
          <div
            style={{
              width: 260,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              marginLeft: '10px',
            }}
          >
            {order?.name}
          </div>
          <span style={{ fontSize: '13px', color: '#242424', marginLeft: 'auto' }}>
            {convertPrice(order?.price)}
          </span>
        </WrapperHeaderItem>
      );
    });
  };

  return (
    <Loading isPending={isPending || isPendingCancel}>
      <WrapperContainer>
        <div style={{ height: '100%', width: '1270px', margin: '0, auto' }}>
          <WrapperHeaderTitle>Đơn hàng của tôi</WrapperHeaderTitle>
          <WrapperListOrder>
            {Array.isArray(data) && data?.map((order) => {
              return (
                <WrapperItemOrder key={order?._id}>
                  <WrapperStatus>
                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Trạng thái</span>
                    <div>
                      <span style={{ color: 'rgb(255, 66, 78)' }}>Giao hàng: </span>
                      {order.isDelivered ? 'Đã giao hàng' : 'Chưa giao hàng'}
                    </div>
                    <div>
                      <span style={{ color: 'rgb(255, 66, 78)' }}>Thanh toán: </span>
                      {order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                    </div>
                  </WrapperStatus>
                  {renderProduct(order?.orderItems)}
                  <WrapperFooterItem>
                    <span style={{ color: 'rgb(255, 66, 78)' }}>Tổng tiền: </span>
                    <span
                      style={{
                        fontSize: '13px',
                        color: 'rgb(56, 56, 61)',
                        fontWeight: 700,
                      }}
                    >
                      {convertPrice(order?.totalPrice)}
                    </span>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      {/* Nút hủy đơn hàng */}
                      <ButtonComponent
                        onClick={(e) => {
                          if (orderReceived[order._id]) {
                            e.preventDefault();
                            return;
                          }
                          handleCancelOrder(order);
                        }}
                        size={40}
                        styleButton={{
                          height: '36px',
                          border: '1px solid rgb(11, 116, 229)',
                          borderRadius: '4px',
                        }}
                        texbutton={'Hủy đơn hàng'}
                        styletexbutton={{ color: 'rgb(11, 116, 229)', fontSize: '14px' }}
                        disabled={orderReceived[order._id]}
                      />
                      {/* Nút xem chi tiết */}
                      <ButtonComponent
                        onClick={() => handleDetailsOrder(order?._id)}
                        size={40}
                        styleButton={{
                          height: '36px',
                          border: '1px solid rgb(11, 116, 229)',
                          borderRadius: '4px',
                        }}
                        texbutton={'Xem chi tiết'}
                        styletexbutton={{ color: 'rgb(11, 116, 229)', fontSize: '14px' }}
                      />
                      {/* Nút "Đã nhận được hàng" */}
                      <ButtonComponent
                        onClick={(e) => {
                          if (orderReceived[order._id]) {
                            e.preventDefault();
                            return;
                          }
                          handleReceivedOrder(order);
                        }}
                        size={40}
                        styleButton={{
                          height: '36px',
                          border: '1px solid rgb(11, 116, 229)',
                          borderRadius: '4px',
                        }}
                        texbutton={'Đã nhận được hàng'}
                        styletexbutton={{ color: 'rgb(11, 116, 229)', fontSize: '14px' }}
                        disabled={orderReceived[order._id]}
                      />
                      <span style={{ display: 'flex', justifyItems: 'center', alignItems: 'center' }}>
                        Địa chỉ giao hàng : {order?.shippingAddress?.address} - {order?.shippingAddress?.city}
                      </span>
                    </div>
                  </WrapperFooterItem>
                </WrapperItemOrder>
              );
            })}
          </WrapperListOrder>
        </div>
      </WrapperContainer>
    </Loading>
  );
};



export default MyOrderPage;
