import styled from 'styled-components';

// Wrapper chính của phần thông tin người dùng
export const WrapperHeaderUser = styled.div`
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 30px;
    background: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-5px);  // Thêm hiệu ứng nâng khi hover
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);  // Tăng cường bóng đổ khi hover
    }
`;



// Wrapper cho từng phần thông tin người dùng
export const WrapperInfoUser = styled.div`
    flex: 1;
    min-width: 250px;
    margin-right: 20px;
    padding: 15px;
    background-color: #f9f9f9;  // Màu nền nhẹ cho mỗi mục
    border: 1px solid #ddd;  // Đường viền nhẹ xung quanh mỗi mục
    border-radius: 8px;  // Bo góc cho phần tử
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);  // Thêm bóng đổ nhẹ để tạo chiều sâu
`;


// Tiêu đề của các phần
export const WrapperLabel = styled.div`
    font-size: 16px;
    color: #333;  // Màu sắc chữ đậm hơn để dễ đọc
    font-weight: bold;
    margin-bottom: 8px;
`;


export const WrapperContentInfo = styled.div`
    display: flex;
    flex-direction: column;
    color: #555;  // Màu sắc chữ sáng hơn nhưng vẫn dễ đọc
    .name-info, .address-info, .phone-info {
        margin-bottom: 6px;
        font-size: 14px;  // Giảm size font để trông gọn gàng hơn
    }
`;


// Wrapper cho phần sản phẩm và các mục tính toán tổng tiền
export const WrapperStyleContent = styled.div`
    padding: 24px;
    background-color: #2d2d2d;  // Nền xám đậm
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    margin-top: 30px;

    & > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 0;
        border-bottom: 1px solid #3a3a3a;  // Đường viền xám sáng
        color: #f0f0f0;

        &:last-child {
            border-bottom: none;
        }
    }
`;

// Label của các mục như giá, số lượng
export const WrapperItemLabel = styled.div`
    font-size: 14px;
    font-weight: 600;
    color: #f1c40f;  // Màu vàng kim cho độ nhấn mạnh
`;

// Phần tử thông tin sản phẩm
export const WrapperProduct = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #3a3a3a;
`;

export const WrapperNameProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;

    img {
        width: 70px;
        height: 70px;
        object-fit: cover;
        border-radius: 8px;
        border: 1px solid #ccc;
    }

    div {
        max-width: 260px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
        color: #f0f0f0;
    }
`;

export const WrapperItem = styled.div`
    font-size: 14px;
    color: #f0f0f0;
    text-align: right;
`;

// Phần tổng kết đơn hàng
export const WrapperTotalSection = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 16px 0;
    font-size: 16px;
    font-weight: 700;
    color: #f0f0f0;
    border-top: 1px solid #3a3a3a;
    margin-top: 12px;
    background-color: #444444;
`;

// Nút mua hàng hoặc các hành động
export const ButtonPrimary = styled.button`
    background-color: #f1c40f; // Vàng kim nổi bật
    color: #333333;
    border: none;
    padding: 12px 24px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #e0b90f;
    }
`;
