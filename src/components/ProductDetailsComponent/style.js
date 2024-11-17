import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";

// Cập nhật WrapperStyleImageSmall cho giao diện hiện đại hơn
// Wrapper cho ảnh nhỏ với kích thước tự thu gọn và bo tròn
export const WrapperStyleImageSmall = styled(Image)`
    height: 100px;
    width: 100px;
    object-fit: cover; /* Giữ tỷ lệ khung hình của ảnh mà không làm méo */
    border-radius: 8px; /* Bo tròn góc ảnh */
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.05); /* Thêm hiệu ứng phóng to nhẹ khi hover */
    }
`

// Wrapper cho cột chứa ảnh, giúp ảnh linh động và không chiếm diện tích quá lớn
export const WrapperStyleColImage = styled(Col)`
    flex-basis: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 120px; /* Giới hạn kích thước cột để ảnh không quá rộng */
    margin: 0 auto;
`



// Tạo hiệu ứng đẹp cho tên sản phẩm
export const WrapperStyleNameProduct = styled.h1`
    color: #333;
    font-size: 26px;
    font-weight: 600;
    line-height: 34px;
    word-break: break-word;
    margin: 10px 0;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
    transition: color 0.3s ease;

    &:hover {
        color: #007BFF;
    }
`

// Cập nhật WrapperStyleTextSell với màu sắc và hiệu ứng đẹp
export const WrapperStyleTextSell = styled.span`
    font-size: 16px;
    color: #888;
    line-height: 24px;
    font-weight: 400;
    margin-top: 5px;
    transition: color 0.3s ease;

    &:hover {
        color: #555;
    }
`

// Tạo hiệu ứng và màu sắc cho giá sản phẩm
export const WrapperPriceProduct = styled.div`
    background: #f1f1f1;
    border-radius: 8px;
    padding: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    margin-top: 20px;
    transition: background 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        background: #007BFF;
        box-shadow: 0 8px 16px rgba(0, 123, 255, 0.3);
    }
`

// Thiết kế đẹp cho giá trị sản phẩm
export const WrapperPriceTextProduct = styled.h1`
    font-size: 34px;
    font-weight: 600;
    line-height: 40px;
    margin-right: 8px;
    color: #333;
    padding: 10px;
    margin-top: 10px;
    transition: color 0.3s ease;

    &:hover {
        color: #fff;
    }
`

// Cập nhật địa chỉ với kiểu dáng đẹp và dễ nhìn
export const WrapperAddressProduct = styled.div`
    span.address {
        text-decoration: underline;
        font-size: 15px;
        line-height: 24px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #555;
        transition: color 0.3s ease;

        &:hover {
            color: #007BFF;
        }
    }

    span.change-address {
        color: #007BFF;
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
        cursor: pointer;
        transition: color 0.3s ease;

        &:hover {
            color: #0056b3;
        }
    }
`

// Cập nhật WrapperQualityProduct với viền và hiệu ứng hover
export const WrapperQualityProduct = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
    width: 130px;
    border: 2px solid #ccc;
    border-radius: 8px;
    padding: 8px;
    transition: border-color 0.3s ease;

    &:hover {
        border-color: #007BFF;
    }
`

// Cập nhật WrapperInputNumber cho giao diện gọn gàng và hiện đại
export const WrapperInputNumber = styled(InputNumber)`
    &.ant-input-number.ant-input-number-sm {
        width: 50px;
        border-top: none;
        border-bottom: none;
        padding: 5px;
        background-color: #f8f9fa;
        border-radius: 6px;
        font-size: 16px;
        transition: background-color 0.3s ease, border-color 0.3s ease;

        &:focus {
            background-color: #e9ecef;
            border-color: #007BFF;
        }

        .ant-input-number-handler-wrap {
            display: none;
        }
    }
`
