import React from 'react'
import { WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperContainer, WrapprerValue } from './style';
import Loading from '../../components/LoadingComponent/Loading';
import { Label } from './style';
import { useLocation } from 'react-router-dom';
import { orderContant } from '../../contant';
import { convertPrice } from '../../utils';
import { WrapperItemOrderInfo } from './style';

const OrderSuccess = () => {
    const location = useLocation();
    const { state } = location;

    return (
        <div style={{ background: '#f5f5fa', width: '100%', height: '100vh' }}>
            <Loading isPending={false}>
                <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
                    <h3 style={{ fontSize: '18px' }}>Đơn hàng đặt thành công</h3>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <WrapperContainer>
                            <WrapperInfo>
                                <div>
                                    <Label>Phương thức giao hàng</Label>
                                    <WrapprerValue>
                                        <span style={{ color: '#ea8500', fontWeight: 'bold' }}>
                                            {orderContant.delivery[state?.delivery]}
                                        </span>
                                        Giao hàng tiết kiệm
                                    </WrapprerValue>
                                </div>
                            </WrapperInfo>
                            <WrapperInfo>
                                <div>
                                    <Label>Phương thức thanh toán</Label>
                                    <WrapprerValue>
                                        {orderContant.payment[state?.payment]}
                                    </WrapprerValue>
                                </div>
                            </WrapperInfo>

                            <WrapperItemOrderInfo>
                                {/* Render các sản phẩm */}
                                {state.orders?.map((order) => {
                                    return (
                                        <WrapperItemOrder key={order?.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <img src={order.image} style={{ width: '77px', height: '79px', objectFit: 'cover' }} />
                                                <div style={{ width: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                    {order?.name}
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                                <span style={{ fontSize: '13px', color: '#242424' }}>Giá tiền: {convertPrice(order?.price)}</span>
                                                <span style={{ fontSize: '13px', color: '#242424' }}>Số lượng: {order?.amount}</span>
                                            </div>
                                        </WrapperItemOrder>
                                    );
                                })}

                                {/* Tổng tiền */}
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                                    <span style={{
                                        fontSize: '20px',
                                        color: '#e10000',
                                        fontWeight: 'bold',
                                        textAlign: 'right',
                                        marginTop: '10px',
                                        padding: '10px',
                                        border: '2px solid #e10000',
                                        borderRadius: '8px',
                                        backgroundColor: '#fff'
                                    }}>
                                        Tổng tiền: {convertPrice(state?.totalPriceMemo)}
                                    </span>
                                </div>
                            </WrapperItemOrderInfo>
                        </WrapperContainer>
                    </div>
                </div>
            </Loading>
        </div>
    );
}

export default OrderSuccess;
