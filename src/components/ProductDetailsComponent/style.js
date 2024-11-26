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
    border-radius: 4px;
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
    background: #f8d7da; /* Màu nền xanh */
    color: #fff; /* Màu chữ trắng */
    border-radius: 12px; /* Bo góc tự động với border-radius */
    padding: 8px 16px; /* Padding tự động theo nội dung */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Bóng nhẹ */
    transition: background 0.3s ease, box-shadow 0.3s ease;

    display: inline-block; /* Giúp phần tử chỉ chiếm không gian vừa đủ */
    text-align: center; /* Căn chữ vào giữa */

    /* Điều chỉnh độ rộng tự động theo nội dung */
    max-width: auto;
    width: auto;

    &:hover {
        background: #0056b3; /* Màu nền khi hover */
        box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3); /* Tăng hiệu ứng shadow khi hover */
    }
`;


// Thiết kế đẹp cho giá trị sản phẩm




export const WrapperPriceTextProduct = styled.h1`
    font-size: 16px; /* Giảm kích thước font chữ để dễ đọc */
    font-weight: 400; /* Giảm độ đậm của font */
    line-height: 22px; /* Điều chỉnh khoảng cách dòng */
    margin-right: 5px; /* Giảm khoảng cách bên phải */
    color: #333; /* Màu chữ tối */
    padding: 4px 6px; /* Giảm padding */
    margin-top: 5px; /* Giảm khoảng cách phía trên */
    transition: color 0.3s ease, background-color 0.3s ease;

    max-width: 200px; /* Giới hạn chiều rộng để không quá dài */
    width: 100%; /* Cho phép phần tử sử dụng toàn bộ chiều rộng của container */
    text-align: left; /* Căn lề sang trái */

    background-color: #f8d7da; /* Màu nền đỏ hồng nhẹ */
    box-shadow: none; /* Loại bỏ bóng */

    &:hover {
        color: #fff; /* Đổi màu chữ khi hover */
        background-color: #e3c1d5; /* Màu nền hồng nhạt nhẹ khi hover */
    }
`;






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
export const WrapperStyleImageCenter = styled.div`
    display: flex;
    justify-content: center; /* Canh giữa theo chiều ngang */
    align-items: center; /* Canh giữa theo chiều dọc */
    height: 50vh; /* Chiều cao toàn màn hình, có thể chỉnh */
    border: 1px solid #blue; /* Tùy chọn: thêm đường viền để kiểm tra */
`;
