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
    padding: 20px;
    border-bottom: 1px solid #f5f5f5;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    h3 {
        font-size: 18px;
        font-weight: 600;
        color: #333;
    }

    span {
        font-size: 14px;
        color: #666;
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
