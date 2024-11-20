import { Col, Image, Rate, Row } from 'antd'
import React, { useMemo } from 'react'
import imageProductSmall4 from '../../assets/images/small4.webp'
// import imageProductSmall2 from '../../assets/images/small.webp'
import imageProductSmall3 from '../../assets/images/small2.webp'
import imageProductSmall from '../../assets/images/small3.webp'
import { WrapperAddressProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperStyleColImage, WrapperStyleImageCenter, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStyleTextSell } from './style'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import Loading from '../LoadingComponent/Loading'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { addOrderProduct, resetOrder } from '../../redux/slides/orderSlide'
import { convertPrice, initFacebookSDK } from '../../utils'
import { useEffect } from 'react'
import * as message from '../Message/Message'
import LikeButtunComponet from '../LikeButtunComponent/LikeButtunComponet'
import CommentComponent from '../CommentComponent/CommentComponent'




const ProductDetailsComponent = ({ idProduct }) => {
    const [numProduct, setNumProduct] = useState(1)
    const user = useSelector((state) => state.user)
    const order = useSelector((state) => state.order)
    const [errorLimitOrder, setErrorLimitOrder] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onChange = (value) => {
        setNumProduct(Number(value))
    }

    const fetchGetDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        if (id) {
            const res = await ProductService.getDetailsProduct(id)
            return res.data
        }
    }
    useEffect(() => {
        const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id);

        // Kiểm tra số lượng sản phẩm và tồn kho
        if ((orderRedux?.amount + numProduct) <= productDetails?.countInStock ||
            (!orderRedux && productDetails?.countInStock > 0)) {
            setErrorLimitOrder(false); // Không có lỗi nếu đủ số lượng
        } else if (productDetails?.countInStock === 0) {
            setErrorLimitOrder(true); // Có lỗi nếu vượt quá tồn kho
        }
    }, [numProduct, order]);

    useEffect(() => {
        if (order.isSucessOrder) {
            message.success('Đã thêm vào giỏ hàng')
        }
        return () => {
            dispatch(resetOrder())
        }
    }, [order.isSucessOrder])
    const handleChangeCount = (type, limited) => {

        if (type === 'increase') {
            if (!limited) {
                setNumProduct(numProduct + 1)
            }
        } else {
            if (!limited) {
                setNumProduct(numProduct - 1)
            }
        }
    }
    useEffect(() => {
        initFacebookSDK()
    }, [])




    const { isPending, data: productDetails } = useQuery({
        queryKey: ['product-details', idProduct],
        queryFn: fetchGetDetailsProduct,
        enabled: !!idProduct,
    });
    const handleAddOrderProduct = () => {
        if (!user?.id) {
            navigate('/sign-in', { state: location?.pathname });
        } else {
            const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id);

            // Kiểm tra số lượng sản phẩm và tồn kho
            if ((orderRedux?.amount + numProduct) <= productDetails?.countInStock ||
                (!orderRedux && productDetails?.countInStock > 0)) {

                dispatch(addOrderProduct({
                    orderItem: {
                        name: productDetails?.name,
                        amount: numProduct,
                        image: productDetails?.image,
                        price: productDetails?.price,
                        product: productDetails?._id,
                        discount: productDetails?.discount,
                        countInStock: productDetails?.countInStock,
                    },
                }));

                // Thông báo thành công
                message.success('Sản phẩm đã được thêm vào giỏ hàng!');
            } else {
                // Thông báo lỗi nếu vượt quá giới hạn kho
                setErrorLimitOrder(true);
                message.error('Sản phẩm đã hết hàng hoặc vượt quá số lượng trong kho.');
            }
        }
    };
    console.log('productdetails', productDetails)

    return (
        <Loading isPending={isPending}>
            <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
                <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px' }}>
                    <WrapperStyleImageCenter>
                        <Image src={productDetails?.image} alt="Product Image" preview={false} />
                    </WrapperStyleImageCenter>
                    <Row style={{ paddingTop: '10px', justifyContent: 'space-between', borderRadius: '4px' }}>
                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageProductSmall} alt="image product mall" preview={true} />
                        </WrapperStyleColImage>
                        <WrapperStyleColImage span={4}>
                            {/* <WrapperStyleImageSmall src={imageProductSmall2} alt="image product mall" preview={true} /> */}
                        </WrapperStyleColImage>
                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageProductSmall3} alt="image pproduct mall" preview={true} />
                        </WrapperStyleColImage>
                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageProductSmall4} alt="image product mall" preview={true} />
                        </WrapperStyleColImage>
                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageProductSmall} alt="image product mall" preview={true} />
                        </WrapperStyleColImage>
                    </Row>
                </Col>
                <Col span={14} style={{ paddingLeft: '12px' }}>
                    <WrapperStyleNameProduct> {productDetails?.name}</WrapperStyleNameProduct>
                    <div>
                        <Rate allowHalf defaultValue={productDetails?.rating} value={productDetails?.rating} />
                        <WrapperStyleTextSell> | Đã Bán {productDetails?.selled}+</WrapperStyleTextSell>
                    </div>
                    <WrapperPriceProduct>
                        <WrapperPriceTextProduct>{convertPrice((productDetails?.price) * numProduct)}</WrapperPriceTextProduct>
                    </WrapperPriceProduct>
                    <LikeButtunComponet
                        dataHref={process.env.REACT_APP_IS_LOCAL
                            ? "https://developers.facebook.com/docs/plugins/"
                            : window.location.href}
                    />
                    <div style={{ margin: '10px 0 20px', padding: '10px 0', border: '1px solid #e5e5e5', borderbottom: '1px solid #ccc' }}>
                        <div style={{ marginBottom: '10px' }}> Số lượng</div>
                        <WrapperQualityProduct>
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease', numProduct === 1)}>
                                <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                            <WrapperInputNumber onChange={onChange} defaultValue={1} max={productDetails?.countInStock} min={0} value={numProduct} size="small" />
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase', numProduct === productDetails?.countInStock)}>
                                <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                        </WrapperQualityProduct>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div>
                            <ButtonComponent
                                size={40}
                                styleButton={{
                                    background: 'rgb(255, 57, 69)',
                                    height: '48px',
                                    width: '220px',
                                    border: 'none',
                                    borderRadius: '4px',
                                }}
                                onClick={handleAddOrderProduct}
                                texbutton={"Chọn mua"}
                                styletexbutton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                            ></ButtonComponent>
                            {errorLimitOrder && <div style={{ color: 'red' }}>Sản phẩm đã hết hàng </div>}
                        </div>
                        <ButtonComponent
                            size={40}
                            styleButton={{
                                background: '#fff',
                                height: '48px',
                                width: '220px',
                                border: '1px solid rgb(13, 92, 182)',
                                borderRadius: '4px',
                            }}
                            texbutton={"Mua trả sau  "}
                            styletexbutton={{ color: 'rgb(13, 92, 182)', fontSize: '15px' }}
                        ></ButtonComponent>
                    </div>
                </Col>
                <CommentComponent dataHref={process.env.REACT_APP_IS_LOCAL
                    ? "https://developers.facebook.com/docs/plugins/comments#configurator"
                    : window.location.href
                }
                    width="1270"
                />
            </Row>

        </Loading >
    )
}
export default ProductDetailsComponent