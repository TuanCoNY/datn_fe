import { Form, Radio } from 'antd';
import React from 'react'
import { Label, WrapperLeft, WrapperRadio, WrapperRight, WrapperTotal, WrapperInfo } from './style';
import { useDispatch, useSelector } from 'react-redux';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { removeAllOrderProduct } from '../../redux/slides/orderSlide';
import { useState } from 'react';
import { convertPrice } from '../../utils';
import { useMemo } from 'react';
import { useEffect } from 'react';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
import { useMutationHooks } from '../../hooks/useMutationHooks';
import * as UserService from '../../services/UserService'
import * as OrderService from '../../services/OrderService'
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/userSlide';
import { useNavigate } from 'react-router-dom';
import { PayPalButton } from "react-paypal-button-v2";
import * as PaymentService from '../../services/PaymentService'



const PaymentPage = () => {
    const order = useSelector((state) => state.order)
    const user = useSelector((state) => state.user)

    const [delivery, setDelivery] = useState('fast')

    const [payment, setPayment] = useState('later_money')
    const [sdkReady, setSdkReady] = useState(false)

    const navigate = useNavigate()

    const [isOpenModalUpdateInfor, setIsOpenModalUpdateInfor] = useState(false)
    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
    })
    const [form] = Form.useForm();
    const dispatch = useDispatch()

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
        if (priceMemo > 300000 && priceMemo < 500000) {
            return 10000
        } else if (priceMemo >= 500000) {
            return 0
        } else {
            return 20000
        }
    }, [priceMemo])


    const totalPriceMemo = useMemo(() => {
        return Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)

    }, [priceMemo, priceDiscountMemo, diliveryPriceMemo])

    const handleAddOrder = () => {
        if (user?.access_token && order?.orderItemSelected && user?.name &&
            user?.address && user?.phone && user?.city && priceMemo && user?.id) {

            mutationAddOrder.mutate(
                {
                    token: user?.access_token,
                    orderItems: order?.orderItemSelected,
                    fullName: user?.name,
                    address: user?.address,
                    phone: user?.phone,
                    city: user?.city,
                    paymentMethod: payment,
                    itemsPrice: priceMemo,
                    shippingPrice: diliveryPriceMemo || 0,
                    totalPrice: totalPriceMemo,
                    user: user?.id,
                    email: user?.email
                },
            );
        } else {
            alert('Thông tin không hợp lệ hoặc giá trị không đủ để đặt hàng!');
        }
    };
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
    const mutationAddOrder = useMutationHooks(
        (data) => {
            const {
                token,
                ...rests
            } = data
            const res = OrderService.createOrder(
                { ...rests }, token)
            return res
        },

    )

    const { isPending, data } = mutationUpdate
    const { data: dataAddOrder, isPending: isPendingAddOrder, isSuccess, isError } = mutationAddOrder

    useEffect(() => {
        if (isSuccess && dataAddOrder?.status === 'OK') {
            const arrayOrderd = []
            order?.orderItemSelected?.forEach(element => {
                arrayOrderd.push(element.product)
            });
            message.success('Đặt hàng thành công')
            dispatch(removeAllOrderProduct({ listChecked: arrayOrderd }))
            navigate('/orderSuccess', {
                state: {
                    delivery,
                    payment,
                    orders: order?.orderItemSelected,
                    totalPriceMemo: totalPriceMemo
                }
            })
        } else if (isError) {
            message.error()
        }
    }, [isSuccess])


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
    const onSuccessPaypal = (details, data) => {
        mutationAddOrder.mutate(
            {
                token: user?.access_token,
                orderItems: order?.orderItemSelected,
                fullName: user?.name,
                address: user?.address,
                phone: user?.phone,
                city: user?.city,
                paymentMethod: payment,
                itemsPrice: priceMemo,
                shippingPrice: diliveryPriceMemo,
                totalPrice: totalPriceMemo,
                user: user?.id,
                isPaid: true,
                paidAt: details.update_time,
                email: user?.email
            },
        );

    }

    const handleUpdateInforUser = () => {
        const { name, address, phone, city } = stateUserDetails
        if (name && address && phone && city) {
            mutationUpdate.mutate({ id: user?.id, token: user?.access_token, ...stateUserDetails }, {
                onSuccess: () => {
                    dispatch(updateUser({ name, address, phone, city }))
                    setIsOpenModalUpdateInfor(false)
                }
            })
        }
    }

    const handleOnchangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value
        })
    }
    const handleDelivery = (e) => {
        setDelivery(e.target.value);
    }

    const handlePayment = (e) => {
        setPayment(e.target.value);
    }
    const addPaypalScript = async () => {
        const { data } = await PaymentService.getConfig()
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://sandbox.paypal.com/sdk/js?client-id=${data}`
        script.async = true;
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }
    useEffect(() => {
        if (!window.paypal) {
            addPaypalScript()
        } else {
            setSdkReady(true)
        }

    }, [])
    return (
        <div style={{ background: '#f5f5fa', width: '100%', height: '100vh' }}>
            <Loading isPending={isPendingAddOrder}>
                <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
                    <h3 style={{ fontSize: '18px' }}> Chọn phương thức thanh toán</h3>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <WrapperLeft>
                            <WrapperInfo>
                                <div>
                                    <Label> Chọn phương thức giao hàng</Label>
                                    <WrapperRadio onChange={handleDelivery} value={delivery}>
                                        <Radio value="fast"> <span style={{ color: '#ea8500', fontWeight: 'bold' }}>FAST</span>Giao hàng tiết kiệm</Radio>
                                        <Radio value="gojek"> <span style={{ color: '#ea8500', fontWeight: 'bold' }}>GO_JEK</span>Giao hàng tiết kiệm</Radio>
                                    </WrapperRadio>
                                </div>
                            </WrapperInfo>
                            <WrapperInfo>
                                <div>
                                    <Label> Chọn phương thức thanh toán</Label>
                                    <WrapperRadio onChange={handlePayment} value={payment}>
                                        <Radio value="later_money"> Thanh toán khi nhận hàng</Radio>
                                        <Radio value="paypal"> Thanh toán bằng Paypal</Radio>
                                    </WrapperRadio>
                                </div>
                            </WrapperInfo>
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
                            {payment == 'paypal' && sdkReady ? (
                                <div style={{ width: '320px' }}>
                                    <PayPalButton
                                        amount={Math.round(totalPriceMemo / 30000)}
                                        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                        onSuccess={onSuccessPaypal}
                                        onError={() => {
                                            alert('Error')
                                        }}
                                    />
                                </div>
                            ) : (
                                <ButtonComponent
                                    onClick={() => handleAddOrder()}
                                    size={40}
                                    styleButton={{
                                        background: 'rgb(255, 57, 69)',
                                        height: '48px',
                                        width: '100%',
                                        border: 'none',
                                        borderRadius: '4px'
                                    }}
                                    texbutton={'Đặt hàng'}
                                    styletexbutton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                                ></ButtonComponent>

                            )}

                        </WrapperRight>
                    </div>
                </div>
                <ModalComponent forceRender title="Cập nhật thông tin giao hàng" open={isOpenModalUpdateInfor} onCancel={handleCancelUpdate} onOk={handleUpdateInforUser}>
                    <Loading isPending={isPending}>
                        <Form
                            name="basic"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 20 }}
                            // onFinish={onUpdateUser}
                            autoComplete="on"
                            form={form}
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <InputComponent value={stateUserDetails['name']} onChange={handleOnchangeDetails} name="name" />
                            </Form.Item>
                            <Form.Item
                                label="City"
                                name="city"
                                rules={[{ required: true, message: 'Please input your city!' }]}
                            >
                                <InputComponent value={stateUserDetails.city} onChange={handleOnchangeDetails} name="city" />
                            </Form.Item>
                            <Form.Item
                                label="Phone"
                                name="phone"
                                rules={[{ required: true, message: 'Please input your phone!' }]}
                            >
                                <InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone" />
                            </Form.Item>
                            <Form.Item
                                label="Address"
                                name="address"
                                rules={[{ required: true, message: 'Please input your address!' }]}
                            >
                                <InputComponent value={stateUserDetails.address} onChange={handleOnchangeDetails} name="address" />
                            </Form.Item>
                        </Form>
                    </Loading>
                </ModalComponent >
            </Loading>
        </div>
    )
}

export default PaymentPage