import { Button, Checkbox, Form, Steps } from 'antd';
import React from 'react'
import { WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperPriceDiscount, WrapperRight, WrapperStyleHeader, WrapperStyleHeaderDelivery, WrapperTotal } from './style';
import { WrapperInputNumber } from '../../components/ProductDetailsComponent/style';
import { PlusOutlined, MinusOutlined, DeleteOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct, selectedOrder } from '../../redux/slides/orderSlide';
import { useState } from 'react';
import { convertPrice } from '../../utils';
import { useMemo } from 'react';
import { useEffect } from 'react';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
import { useMutationHooks } from '../../hooks/useMutationHooks';
import * as UserService from '../../services/UserService'
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/userSlide';
import { useNavigate } from 'react-router-dom';
import StepComponent from '../../components/StepComponent/StepComponent';



const OrderPage = () => {
  const order = useSelector((state) => state.order)
  const user = useSelector((state) => state.user)
  const [listChecked, setListChecked] = useState([])
  const [isOpenModalUpdateInfor, setIsOpenModalUpdateInfor] = useState(false)
  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
  })

  const navigate = useNavigate()
  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const onChange = (e) => {
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter((item) => item !== e.target.value)
      setListChecked(newListChecked)
    } else {
      setListChecked([...listChecked, e.target.value])
    }
  };
  const handleChangeCount = (type, idProduct, limited) => {
    if (type === 'increase') {
      if (!limited) {
        dispatch(increaseAmount({ idProduct }))
      }

    } else {
      if (!limited) {
        dispatch(decreaseAmount({ idProduct }))
      }

    }

  }

  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }))
  }
  const handleOnchangeCheckAll = (e) => {
    if (e.target.checked) {
      const newListChecked = []
      order?.orderItems?.forEach((item) => {
        newListChecked.push(item?.product)
      })
      setListChecked(newListChecked)
    } else {
      setListChecked([])
    }
  }
  useEffect(() => {
    dispatch(selectedOrder({ listChecked }))

  }, [listChecked])
  useEffect(() => {
    form.setFieldsValue(stateUserDetails)

  }, [form, stateUserDetails])

  useEffect(() => {
    if (isOpenModalUpdateInfor) {
      setStateUserDetails({
        city: user?.city,
        name: user?.name,
        address: user?.address,
        phone: user?.phone,
      })
    }
  }, [isOpenModalUpdateInfor])

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfor(true)
  }

  const priceMemo = useMemo(() => {
    // Tính tổng giá trị sản phẩm
    return order?.orderItemSelected?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0) || 0; // Đảm bảo trả về 0 nếu không có sản phẩm
  }, [order?.orderItemSelected]); // Chỉ phụ thuộc vào orderItemSelected

  const priceDiscountMemo = useMemo(() => {
    // Tính tổng giảm giá
    return order?.orderItemSelected?.reduce((total, cur) => {
      const discount = cur.discount || 0; // Giá trị giảm giá, mặc định là 0
      return total + (cur.price * cur.amount * discount) / 100;
    }, 0) || 0; // Đảm bảo trả về 0 nếu không có giảm giá
  }, [order?.orderItemSelected]); // Chỉ phụ thuộc vào orderItemSelected


  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo >= 300000 && priceMemo < 500000) {
      return 10000;
    } else if (priceMemo >= 500000 || order?.orderItemSelected?.length === 0) {
      return 0;
    } else {
      return 20000;
    }
  }, [priceMemo, order?.orderItemSelected?.length]);

  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)

  }, [priceMemo, priceDiscountMemo, diliveryPriceMemo])

  const handleRemoveAllOrder = () => {
    if (listChecked?.length) {
      dispatch(removeAllOrderProduct({ listChecked }))
    }
  }

  const handleAddCard = () => {
    if (!order?.orderItemSelected?.length) {
      message.error('Vui lòng chọn sản phẩm')
    } else if (!user?.id) {
      navigate('/sign-in',);
    }
    else if (!user?.phone || !user.address || !user.name || !user.city) {
      setIsOpenModalUpdateInfor(true)
    } else {
      navigate('/payment')
    }
  }

  const mutationUpdate = useMutationHooks(
    (data) => {
      const { id,
        token,
        ...rests
      } = data
      const res = UserService.updateUser(
        id,
        { ...rests }, token)
      return res
    },
  )

  const { isPending, data } = mutationUpdate

  const handleCancelUpdate = () => {
    setStateUserDetails({
      name: '',
      email: '',
      phone: '',
      isAdmin: false,
    })
    form.resetFields()
    setIsOpenModalUpdateInfor(false)
  }
  const handleGetDetailsUser = async (id, token) => {
    try {
      const res = await UserService.getDetailsUser(id, token);
      // Dispatch thông tin người dùng mới vào Redux
      dispatch(updateUser({
        ...res?.data,
        access_token: token
      }));
    } catch (error) {
      console.error('Có lỗi khi lấy thông tin người dùng:', error);
      message.error('Không thể lấy thông tin người dùng!');
    }
  };

  const handleUpdateInforUser = () => {
    const { name, address, phone, city } = stateUserDetails;

    // Kiểm tra tất cả các trường thông tin có hợp lệ hay không
    if (!name || !address || !phone || !city) {
      message.error('Vui lòng điền đầy đủ thông tin!');
      return;  // Dừng hàm nếu thiếu thông tin
    }

    // Gửi yêu cầu cập nhật thông tin người dùng
    mutationUpdate.mutate(
      { id: user?.id, token: user?.access_token, ...stateUserDetails },
      {
        onSuccess: () => {
          // Sau khi cập nhật thành công, gọi lại API lấy thông tin người dùng mới
          handleGetDetailsUser(user?.id, user?.access_token);

          // Cập nhật thông tin người dùng trong Redux
          dispatch(updateUser({ name, address, phone, city }));

          // Đóng modal sau khi cập nhật thành công
          setIsOpenModalUpdateInfor(false);

          message.success('Cập nhật thông tin thành công!');
        },
        onError: () => {
          message.error('Chưa đăng nhập hoặc Có lỗi xảy ra khi cập nhật thông tin!');
        },
      }
    );
  };

  // Hàm gọi API để lấy lại thông tin người dùng



  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value
    })
  }
  const itemsDelivery = [
    { title: '20.000 VNĐ', description: 'Dưới 300.000 VNĐ' },
    { title: '10.000 VNĐ', description: 'Từ 300.000 VND đến dưới 500.000 VNĐ' },
    { title: '0 VNĐ', description: 'Trên 500.000 VNĐ' },
  ];


  return (
    <div style={{ background: '#f5f5fa', width: '100%', height: '100vh' }}>
      <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
        <h3> Giỏ hàng</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <WrapperLeft>
            <WrapperStyleHeaderDelivery>
              <StepComponent
                items={itemsDelivery}
                current={
                  diliveryPriceMemo === 10000
                    ? 2
                    : diliveryPriceMemo === 20000
                      ? 1
                      : order?.orderItemSelected?.length === 0
                        ? 0
                        : 3
                }
              />
            </WrapperStyleHeaderDelivery>
            <WrapperStyleHeader>
              <span style={{ display: 'inline-block', width: '390px' }}>
                <Checkbox onChange={handleOnchangeCheckAll} checked={listChecked?.length === order?.orderItems?.length}></Checkbox>
                <span> Tất cả ({order?.orderItems?.length}) sản phẩm</span>
              </span>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '16px' }}>
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Thành tiền</span>
                <DeleteOutlined style={{ cursor: 'pointer' }} onClick={handleRemoveAllOrder} />
              </div>
            </WrapperStyleHeader>
            <WrapperListOrder>
              {order?.orderItems?.map((order) => {
                return (
                  <WrapperItemOrder key={order?.product}>
                    <div style={{ width: '390px', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Checkbox onChange={onChange} value={order?.product} checked={listChecked.includes(order?.product)}></Checkbox>
                      <img src={order?.image} style={{ width: '77px', height: '79px', objectFit: 'cover' }} />
                      <div style={{
                        width: '260px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>{order?.name}</div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>
                        <span style={{ fontSize: '13px', color: '#242424' }}>{convertPrice(order?.price)}</span>
                      </span>
                      <WrapperCountOrder>
                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease', order?.product, order?.amount === 1)}>
                          <MinusOutlined style={{ color: '#000', fontSize: '10px' }} />

                        </button>
                        <WrapperInputNumber defaultValue={order?.amount} value={order?.amount} size="small" min={1} max={order?.countInStock} />
                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase', order?.product, order?.amount === order?.countInStock, order?.amount === 1)}>
                          <PlusOutlined style={{ color: '#000', fontSize: '10px' }} />
                        </button>
                      </WrapperCountOrder>
                      <span style={{ color: 'rgb(255, 66, 78)', fontSize: '13px', fontWeight: 500 }}>{convertPrice(order?.price * order?.amount)} </span>
                      <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => handleDeleteOrder(order?.product)} />
                    </div>
                  </WrapperItemOrder>
                )
              })}
            </WrapperListOrder>
          </WrapperLeft>
          <WrapperRight>
            <div style={{ width: '100%' }}>
              <WrapperInfo>
                <div style={{ fontSize: '16px' }}>
                  <span>Địa chỉ giao hàng: </span>
                  <span style={{ color: 'red', fontWeight: 'bold' }}>{`${user?.address} ${user?.city}`}</span>
                  <span onClick={handleChangeAddress} style={{ color: 'blue', cursor: 'pointer' }}>Thay đổi địa chỉ</span>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '16px' }}>
                  <span> Tạm Tính</span>
                  <span style={{ color: '#000', fontSize: '18px', fontWeight: 'bold' }}>{convertPrice(priceMemo)}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '16px' }}>
                  <span> Giảm giá</span>
                  <span style={{ color: '#000', fontSize: '18px', fontWeight: 'bold' }}>{convertPrice(priceDiscountMemo)}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '16px' }}>
                  <span> Phí giao hàng</span>
                  <span style={{ color: '#000', fontSize: '18px', fontWeight: 'bold' }}>{convertPrice(diliveryPriceMemo)}</span>
                </div>
              </WrapperInfo>
              <WrapperTotal>
                <span>Tổng tiền</span>
                <span style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}>{convertPrice(totalPriceMemo)}</span>
                  <span style={{ color: '#000', fontSize: '11px' }}>(Đã bao gồm VAT nếu có)</span>
                </span>
              </WrapperTotal>
            </div>
            <ButtonComponent
              onClick={() => handleAddCard()}
              size={40}
              styleButton={{
                background: 'rgb(255, 57, 69)',
                height: '48px',
                width: '100%',
                border: 'none',
                borderRadius: '4px'
              }}
              texbutton={'Mua Hàng'}
              styletexbutton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            ></ButtonComponent>
          </WrapperRight>
        </div>
      </div>
      <ModalComponent
        forceRender
        title="Cập nhật thông tin giao hàng"
        open={isOpenModalUpdateInfor}
        onCancel={handleCancelUpdate}
        onOk={handleUpdateInforUser}
      >
        <Loading isPending={isPending}>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            //onFinish={onUpdateUser} // Đảm bảo có hàm onFinish xử lý cập nhật
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <InputComponent
                value={stateUserDetails?.name || ''}
                onChange={handleOnchangeDetails}
                name="name"
              />
            </Form.Item>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: 'Please input your city!' }]}
            >
              <InputComponent
                value={stateUserDetails?.city || ''}
                onChange={handleOnchangeDetails}
                name="city"
              />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: 'Please input your phone!' }]}
            >
              <InputComponent
                value={stateUserDetails?.phone || ''}
                onChange={handleOnchangeDetails}
                name="phone"
              />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please input your address!' }]}
            >
              <InputComponent
                value={stateUserDetails?.address || ''}
                onChange={handleOnchangeDetails}
                name="address"
              />
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>

    </div>
  )
}

export default OrderPage