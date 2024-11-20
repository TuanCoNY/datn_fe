import styled from "styled-components";

// Wrapper cho header
export const WrapperStyleHeader = styled.div`
    background: linear-gradient(135deg, #f7f7f7, #ffffff);
    padding: 12px 20px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    span {
        color: #333;
        font-weight: 500;
        font-size: 14px;
    }

    &:hover {
        background: linear-gradient(135deg, #e0e0e0, #ffffff);
    }
`;

// Wrapper cho header delivery
export const WrapperStyleHeaderDelivery = styled.div`
    background: linear-gradient(135deg, #f7f7f7, #ffffff);
    padding: 12px 20px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    span {
        color: #333;
        font-weight: 500;
        font-size: 14px;
    }

    &:hover {
        background: linear-gradient(135deg, #e0e0e0, #ffffff);
    }
`;

// Wrapper bên trái với chiều rộng cố định
export const WrapperLeft = styled.div`
    width: 910px;
    display: flex;
    flex-direction: column;
`;

// Wrapper cho danh sách đơn hàng
export const WrapperListOrder = styled.div`
    padding: 10px 0;
`;

// Wrapper cho mỗi item trong đơn hàng
export const WrapperItemOrder = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 20px;
    background: #ffffff;
    margin-top: 12px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;

    &:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        background: #f9f9f9;
    }
`;

// Wrapper cho giá giảm giá
export const WrapperPriceDiscount = styled.span`
    color: #999;
    font-size: 14px;
    text-decoration: line-through;
    margin-left: 6px;
`;

// Wrapper cho số lượng đơn hàng
export const WrapperCountOrder = styled.div`
    display: flex;
    align-items: center;
    width: 100px;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 4px;
    background: #fafafa;

    input {
        border: none;
        outline: none;
        text-align: center;
        font-size: 14px;
        width: 100%;
        padding: 4px;
        background: transparent;
    }
`;

// Wrapper bên phải với chiều rộng cố định
export const WrapperRight = styled.div`
    width: 320px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
`;

// Wrapper thông tin đơn hàng
export const WrapperInfo = styled.div`
    padding: 25px; /* Tăng khoảng cách giữa các phần tử bên trong để dễ nhìn hơn */
    border-bottom: 1px solid #e0e0e0; /* Đường viền mỏng, màu xám nhạt */
    background: #ffffff; /* Màu nền trắng tinh khiết */
    border-radius: 10px; /* Bo góc tròn để tăng sự mềm mại */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* Bóng mờ giúp tạo chiều sâu và thu hút sự chú ý */

    h3 {
        font-size: 20px; /* Kích thước chữ lớn hơn để thu hút sự chú ý */
        font-weight: 600; /* Làm chữ đậm để nổi bật */
        color: #333; /* Màu chữ tối để tương phản tốt với nền */
        margin-bottom: 10px; /* Khoảng cách giữa tiêu đề và nội dung bên dưới */
    }

    span {
        font-size: 15px; /* Kích thước chữ nhỏ gọn hơn */
        color: #555; /* Màu xám nhẹ, dễ đọc */
        display: block; /* Đặt các đoạn văn không nối tiếp */
        margin-bottom: 5px; /* Khoảng cách giữa các đoạn văn */
    }
`;


// Wrapper cho tổng tiền
export const WrapperTotal = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    h3 {
        font-size: 20px;
        font-weight: 600;
        color: #333;
    }

    span {
        font-size: 18px;
        font-weight: 500;
        color: #e60000; /* Màu đỏ cho giá */
    }

    &:hover {
        background: #f9f9f9;
    }
`;
