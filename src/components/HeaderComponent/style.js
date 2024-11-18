import { Row } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    background-color: rgb(26, 148, 255);
    align-items: center;
    gap: 16px;
    flex-wrap: nowrap;
    width: 100%;
    max-width: 1270px;
    padding: 10px 20px;
    border-radius: 8px; /* Bo tròn góc */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Hiệu ứng bóng đổ nhẹ */
    transition: all 0.3s ease-in-out; /* Thêm hiệu ứng chuyển động */
    
    /* Responsive: điều chỉnh layout khi trên màn hình nhỏ */
    @media (max-width: 768px) {
        padding: 10px 15px;
        flex-wrap: wrap;
        justify-content: center;
    }
`;

export const WrapperTextHeader = styled(Link)`
    font-size: 18px;
    color: #fff;
    font-weight: bold;
    text-align: left;
    text-decoration: none; /* Không có gạch dưới */
    transition: color 0.3s ease-in-out;
    
    &:hover {
        color: #ffcc00; /* Màu vàng khi hover */
        text-decoration: underline;
    }
`;

export const WrapperHeaderAccount = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    gap: 12px;
    font-size: 14px; /* Đã tăng size font cho dễ đọc */
    font-weight: 500;
    transition: color 0.3s ease-in-out;
    
    &:hover {
        color: #ffcc00; /* Thay đổi màu khi hover */
    }
    
    /* Responsive: giảm kích thước cho màn hình nhỏ */
    @media (max-width: 768px) {
        gap: 8px;
        font-size: 12px;
    }
`;

export const WrapperTextHeaderSmall = styled.span`
    font-size: 12px;
    color: #fff;
    white-space: nowrap;
    opacity: 0.8; /* Giảm độ sáng */
    transition: opacity 0.3s ease-in-out;
    
    &:hover {
        opacity: 1; /* Tăng độ sáng khi hover */
    }
`;

export const WrapperContentPopup = styled.p`
    cursor: pointer;
    color: #000;  /* Đặt màu chữ là đen để dễ nhìn trên nền trắng */
    font-size: 14px;
    background-color: #fff;  /* Nền trắng cho popup */
    padding: 8px 12px;  /* Thêm khoảng cách xung quanh chữ */
    border-radius: 4px;  /* Bo tròn các góc */
    transition: color 0.3s ease, transform 0.2s ease-in-out;
    
    &:hover {
        color: rgb(26, 148, 255);  /* Màu chữ khi hover */
        transform: translateX(5px);  /* Hiệu ứng chuyển động khi hover */
    }

    &:active {
        transform: scale(0.98);  /* Hiệu ứng khi click */
    }
`;

