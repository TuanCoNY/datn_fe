import styled from "styled-components";

export const WrapperContainer = styled.div`
    width: 100%;
    background: linear-gradient(135deg, #f5f5fa, #e0e0e0);  /* Gradient nhẹ để tạo cảm giác mềm mại */
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    padding: 30px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);  /* Thêm bóng đổ nhẹ cho container */
    border-radius: 8px;
`;

export const WrapperListOrder = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-top: 20px;
    overflow-y: auto;
    width: 100%;
    max-width: 1000px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);  /* Thêm bóng đổ cho danh sách đơn hàng */
`;

export const WrapperItemOrder = styled.div`
    display: flex;
    align-items: center;
    padding: 20px 16px;
    background: #ffffff;
    margin-top: 12px;
    flex-direction: column;
    width: 900px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);  /* Thêm bóng đổ để tạo chiều sâu */
    min-height: 150px;
    margin-left: auto;
    max-width: 100%;
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: translateY(-5px);  /* Hiệu ứng nhấc lên nhẹ khi hover */
    }
`;

export const WrapperStatus = styled.div`
    display: flex;
    align-items: flex-start;
    width: 100%;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 2px solid #eaeaea;
    flex-direction: column;

    h3 {
        font-size: 24px;
        font-weight: 600;
        color: #333;
        margin: 0;
    }

    span {
        font-size: 18px;
        color: #666;
    }
`;

export const WrapperHeaderItem = styled.div`
    width: 518px;
    display: flex;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #eee;

    img {
        width: 150px;
        height: 150px;
        object-fit: cover;
        border: 2px solid #eee;
        border-radius: 6px;
        padding: 4px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);  /* Thêm bóng đổ cho ảnh */
    }

    div {
        width: 260px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-left: 15px;
        font-size: 15px;
        color: #333;
    }

    span {
        font-size: 14px;
        color: #007BFF;
        margin-left: auto;
        font-weight: 600;
    }
`;

export const WrapperFooterItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 15px 0;
    border-top: 1px solid #eee;
    margin-top: 10px;

    .total-price-container {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 15px;
    }

    span:first-child {
        color: #ff424d;
        font-size: 16px;
        font-weight: bold;
    }

    span:last-child {
        font-size: 15px;
        color: #36383d;
        font-weight: 700;
        margin-left: 5px;
    }

    .button-group {
        display: flex;
        gap: 15px;
        margin-top: 10px;
    }

    button {
        height: 40px;
        border: 1px solid #007bff;
        border-radius: 6px;
        padding: 0 15px;
        font-size: 15px;
        color: #007bff;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
            background-color: #007bff;
            color: white;
            border-color: #0056b3;
        }

        &:active {
            transform: scale(0.98);  /* Hiệu ứng nhấn nút */
        }
    }
`;
export const WrapperHeaderTitle = styled.h4`
    font-size: 24px;
    font-weight: 600;
    color: #333;
    text-align: left;  /* Căn chỉnh chữ về phía bên trái */
    margin: 0;
    transition: transform 0.3s ease, color 0.3s ease; /* Thêm transition cho hiệu ứng mượt mà */

    &:hover {
        transform: translateY(-10px);
        color: #007BFF;  /* Thay đổi màu chữ khi hover */
    }
`;
