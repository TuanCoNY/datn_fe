import styled from "styled-components";

export const WrapperLableText = styled.h4`
    color: #38383d;  /* Màu xám đậm cho sự sang trọng */
    font-size: 16px;  /* Tăng kích thước để dễ đọc */
    font-weight: 600; /* Độ đậm mạnh mẽ hơn */
    margin-bottom: 8px; /* Thêm khoảng cách dưới tiêu đề */
    letter-spacing: 0.5px; /* Khoảng cách giữa các ký tự */
    text-transform: uppercase; /* Tạo sự mạnh mẽ */
    transition: color 0.3s ease;

    &:hover {
        color: #1a73e8; /* Thay đổi màu khi hover */
    }
`;

export const WrapperTextValue = styled.span`
    color: #5f6368;  /* Màu xám nhẹ */
    font-size: 14px;  /* Cỡ chữ vừa phải */
    font-weight: 500; /* Đậm vừa phải */
    line-height: 1.5; /* Tăng độ cao dòng cho dễ đọc */
    transition: color 0.3s ease;

    &:hover {
        color: #1a73e8; /* Thay đổi màu khi hover */
    }
`;

export const WrapperContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;  /* Khoảng cách giữa các phần tử lớn hơn */
    padding: 20px;  /* Padding để tạo không gian rộng rãi */
    background-color: #f9f9f9;  /* Nền sáng nhẹ */
    border-radius: 8px;  /* Bo góc để mềm mại */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Bóng đổ nhẹ cho sự sang trọng */
`;

export const WrapperTextPrice = styled.div`
    padding: 8px 12px;  /* Thêm padding cho phần giá */
    color: #333;  /* Màu chữ tối cho sự dễ đọc */
    font-weight: 600; /* Độ đậm mạnh mẽ */
    background-color: #e9e9e9;  /* Nền xám nhẹ */
    border-radius: 20px;  /* Bo góc tròn để trông hiện đại */
    width: fit-content;  /* Để chiều rộng phù hợp với nội dung */
    font-size: 14px;  /* Cỡ chữ dễ nhìn */
    transition: background-color 0.3s ease, transform 0.3s ease;

    &:hover {
        background-color: #1a73e8; /* Nền màu xanh khi hover */
        color: white;  /* Chữ trắng khi hover */
        transform: scale(1.05);  /* Hiệu ứng phóng to nhẹ */
    }
`;
