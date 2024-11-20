import React from 'react';
import { StarFilled } from '@ant-design/icons';
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText, WrapperStyleTextSell } from './style';
import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { convertPrice } from '../../utils';

const CardComponent = (props) => {
    const { countInStock, description, image, name, price, rating, type, discount, selled, id } = props;
    const navigate = useNavigate();

    const handleDetailsProduct = (id) => {
        navigate(`/product-details/${id}`);
    };

    return (
        <WrapperCardStyle
            hoverable
            styles={{
                header: { width: '200px', height: '200px' }, // Thay thế headStyle
                body: { padding: '10px' }, // Thay thế bodyStyle
            }}
            style={{ width: 200 }}
            cover={<img alt="example" src={image} />}
            onClick={() => handleDetailsProduct(id)}
        >
            <img
                src={logo}
                alt="logo"
                style={{
                    width: '68px',
                    height: '14px',
                    position: 'absolute',
                    top: -1,
                    left: -1,
                    borderTopLeftRadius: '3px',
                }}
            />
            <StyleNameProduct> {name}</StyleNameProduct>
            <WrapperReportText>
                <span style={{ marginRight: '4px' }}>
                    <span> {rating} </span>
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }} />
                </span>
                <WrapperStyleTextSell> | Đã bán {selled || 1000}+</WrapperStyleTextSell>
            </WrapperReportText>
            <WrapperPriceText>
                {/* Kiểm tra nếu có discount */}
                {discount ? (
                    <>
                        {/* Giá cũ bị gạch bỏ */}
                        <span style={{ marginRight: '8px', textDecoration: 'line-through' }}>
                            {convertPrice(price)}
                        </span>
                        <WrapperDiscountText>- {discount}%</WrapperDiscountText>

                        {/* Giá mới sau khi giảm */}
                        <div style={{ marginRight: '8px' }}>
                            {convertPrice(price - (price * discount / 100))}
                        </div>

                        {/* Hiển thị giảm giá */}

                    </>
                ) : (
                    // Nếu không có discount, chỉ hiển thị giá gốc
                    <span style={{ marginRight: '8px' }}>
                        {convertPrice(price)}
                    </span>
                )}
            </WrapperPriceText>

        </WrapperCardStyle>
    );
};

export default CardComponent;
