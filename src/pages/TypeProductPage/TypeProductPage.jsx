import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';  // Thêm Link từ react-router-dom
import NavbarComponent from '../../components/NavbarComponenet/NavbarComponent';
import CardComponent from '../../components/CardComponent/CardComponent';
import { Col, Pagination, Row } from 'antd';
import { WrapperNavbar, WrapperProducts, ProductCardWrapper } from './style';
import * as ProductService from '../../services/ProductService';
import Loading from '../../components/LoadingComponent/Loading';
import { useSelector } from 'react-redux';
import { useDebounce } from '../../hooks/useDebounce';
import Slider from 'react-slick';
import {
    HomeOutlined
} from '@ant-design/icons';

// Import các ảnh slider từ thư mục assets
import slider1 from '../../assets/images/slider6.webp';
import slider2 from '../../assets/images/slider5.webp';
import slider3 from '../../assets/images/Slider4.webp';

// Mảng chứa các ảnh slider đã import
const sliderImages = [slider1, slider2, slider3];

const TypeProductPage = () => {
    const searchProduct = useSelector((state) => state?.product?.search);
    const searchDebounce = useDebounce(searchProduct, 500);
    const { state } = useLocation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [panigate, setPanigate] = useState({
        page: 0,
        limit: 10,
        total: 1,
    });

    const fetchProductType = async (type, page, limit) => {
        setLoading(true);
        const res = await ProductService.getProductType(type, page, limit);
        if (res?.status === 'OK') {
            setLoading(false);
            setProducts(res?.data);
            setPanigate({ ...panigate, total: res?.totalPage });
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (state) {
            fetchProductType(state, panigate.page, panigate.limit);
        }
    }, [state, panigate.page, panigate.limit]);

    const onChange = (current, pageSize) => {
        setPanigate({ ...panigate, page: current - 1, limit: pageSize });
    };

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <Loading isPending={loading}>
            <div style={{ width: '100%', background: '#fff', height: 'calc(100vh - 64px)' }}>
                <div style={{ width: '1270px', margin: '0 auto', height: '100%' }}>
                    <Row style={{ flexWrap: 'nowrap', paddingTop: '10px', height: 'calc(100% - 20px)' }}>

                        <Col span={20} style={{
                            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', maxWidth: '100%',
                            marginRight: '80px'
                        }}>
                            {/* Slider phía trên danh sách sản phẩm */}
                            <div style={{ marginBottom: '20px' }}>
                                <Slider style={{ maxWidth: '100%', margin: '0 auto', height: '60px' }} {...sliderSettings}>
                                    {sliderImages.map((img, index) => (
                                        <div key={index}>
                                            <img
                                                src={img}
                                                alt={`slide-${index}`}
                                                style={{
                                                    width: '100%',
                                                    maxWidth: '500px',
                                                    height: 'auto',
                                                    borderRadius: '10px',
                                                }}
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            </div>

                            {/* Tiêu đề có link về trang chủ */}
                            <h2 style={{ marginBottom: '10px', textTransform: 'capitalize', color: '#333' }}>
                                <Link to="/" style={{ textDecoration: 'none', color: '#707070' }}>
                                    <HomeOutlined style={{ marginRight: '8px' }} />
                                    Trang chủ
                                </Link>
                                {' -> '}
                                <span style={{ color: '#707070' }}>{state || 'Danh mục sản phẩm'}</span>
                            </h2>

                            {/* Danh sách sản phẩm */}
                            <WrapperProducts>
                                {products
                                    ?.filter((pro) => {
                                        if (searchDebounce === '') {
                                            return pro;
                                        } else if (pro?.name?.toLowerCase()?.includes(searchDebounce?.toLowerCase())) {
                                            return pro;
                                        }
                                        return null;
                                    })
                                    ?.map((product) => (
                                        <ProductCardWrapper key={product._id}>
                                            <CardComponent
                                                countInStock={product.countInStock}
                                                description={product.description}
                                                image={product.image}
                                                name={product.name}
                                                price={product.price}
                                                rating={product.rating}
                                                type={product.type}
                                                selled={product.selled}
                                                discount={product.discount}
                                                id={product._id}
                                            />
                                        </ProductCardWrapper>
                                    ))}
                            </WrapperProducts>

                            {/* Pagination */}
                            <Pagination
                                defaultCurrent={panigate.page + 1}
                                total={panigate?.total}
                                onChange={onChange}
                                style={{
                                    textAlign: 'center',
                                    marginTop: '10px',
                                    justifyContent: 'center',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </Loading>
    );
};

export default TypeProductPage;
