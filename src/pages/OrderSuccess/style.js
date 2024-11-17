import { Radio } from "antd";
import styled from "styled-components";

export const WrapperStyleHeader = styled.div`
    background: linear-gradient(135deg, #00c6ff, #0072ff); /* Gradient xanh cực kỳ bắt mắt */
    padding: 12px 20px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    span {
        color: #fff;
        font-weight: 700;
        font-size: 36px; /* Cỡ chữ lớn cho tiêu đề */
        transition: color 0.3s ease-in-out;
        &:hover {
            color: #ffeb3b; /* Màu vàng khi hover */
        }
    }
`;

export const WrapprerValue = styled.div`
    background: #f4f4f9; /* Màu xám sáng tinh tế */
    border: 1px solid #d0d0d0;
    padding: 12px 16px;
    border-radius: 8px;
    margin-top: 6px;
    font-size: 18px; /* Cỡ chữ lớn hơn để dễ đọc */
    color: #444;
    font-weight: 500;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

export const WrapperContainer = styled.div`
    width: 100%;
    max-width: 1270px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const WrapperListOrder = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const WrapperItemOrder = styled.div`
    display: flex;
    align-items: center;
    padding: 16px 20px;
    background: #ffffff;
    margin-top: 16px;
    justify-content: space-between;
    border-radius: 10px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.2);
    }

    /* Cỡ chữ cho các item trong danh sách đơn hàng */
    span {
        font-size: 18px; /* Cỡ chữ lớn hơn */
        font-weight: 600;
        color: #333;
    }
`;

export const WrapperPriceDiscount = styled.span`
    color: #ff4081; /* Màu hồng cho giảm giá */
    font-size: 18px; /* Cỡ chữ lớn hơn cho giá trị giảm giá */
    text-decoration: line-through;
    margin-left: 6px;
`;

export const WrapperCountOrder = styled.div`
    display: flex;
    align-items: center;
    width: 100px;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 6px;
    background: #f0f0f0; /* Màu nền sáng nhẹ */
`;

export const WrapperRight = styled.div`
    width: 350px;
    margin-left: 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
`;

export const WrapperInfo = styled.div`
    padding: 20px;
    border: 1px solid #d9d9d9;
    background: #fff;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 97%;
    margin-left: 0;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    font-size: 18px; /* Cỡ chữ lớn cho thông tin chi tiết */
`;

export const WrapperItemOrderInfo = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
    padding: 20px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
`;

export const WrapperTotal = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    background: #ffffff;
    border-radius: 12px;
    font-size: 20px; /* Cỡ chữ lớn cho tổng cộng */
    font-weight: bold;
    color: #e53935;
`;

export const Label = styled.span`
    font-size: 20px; /* Cỡ chữ lớn cho label */
    color: #444;
    font-weight: 700;
`;

export const WrapperRadio = styled(Radio.Group)`
    margin-top: 10px;
    background: #f0f8ff;
    border: 1px solid #b0e0e6;
    width: 100%;
    max-width: 600px;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    justify-content: center;
    font-size: 18px; /* Cỡ chữ lớn cho nhóm radio */
    color: #444;
    transition: background 0.3s ease;

    &:hover {
        background: #e0f7fa; /* Chuyển sang màu xanh nhẹ khi hover */
    }
`;

