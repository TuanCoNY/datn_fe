import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { Button } from "antd";

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: flex-start;
    height: 44px;

    & > * {
        transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease, color 0.3s ease;
    }

    /* Hiệu ứng chung khi hover */
    & > *:hover {
        transform: translateY(-5px); /* Nhảy lên */
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2); /* Hiệu ứng đổ bóng */
        color: #fff; /* Màu chữ khi hover */
        border-radius: 15px; /* Tăng độ bo góc khi hover */
    }

    /* Màu nền riêng cho từng phần tử khi hover */
    & > *:nth-child(1):hover {
        background-color: #ff7f7f; /* Đỏ nhạt */
    }

    & > *:nth-child(2):hover {
        background-color: #7fff7f; /* Xanh lá nhạt */
    }

    & > *:nth-child(3):hover {
        background-color: #7f7fff; /* Xanh dương nhạt */
    }

    & > *:nth-child(4):hover {
        background-color: #ffbf7f; /* Cam nhạt */
    }

    & > *:nth-child(5):hover {
        background-color: #ff7fff; /* Hồng nhạt */
    }

    & > *:nth-child(6):hover {
        background-color: #7fffff; /* Xanh ngọc nhạt */
    }

    & > *:nth-child(7):hover {
        background-color: #ffff7f; /* Vàng nhạt */
    }

    & > *:nth-child(8):hover {
        background-color: #d97fff; /* Tím nhạt */
    }

    & > *:nth-child(9):hover {
        background-color: #7fafff; /* Xanh lam nhạt */
    }

    & > *:nth-child(10):hover {
        background-color: #7f7f7f; /* Xám nhạt */
    }
`;



export const WrapperButtonMore = styled(ButtonComponent)`
    width: 100%;
    text-align: center;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    color: ${(props) => (props.disabled ? '#fff' : '#0d5cb6')}; /* Đặt màu chữ rõ ràng khi không bị disabled */
    background: ${(props) => (props.disabled ? '#ccc' : '#ffffff')}; /* Màu nền mặc định */
    border: 1px solid ${(props) => (props.disabled ? '#ccc' : '#0d5cb6')}; /* Viền nút */
    padding: 10px 20px;
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
        background: ${(props) => (props.disabled ? '#ccc' : '#0d5cb6')}; /* Màu nền khi hover */
        color: ${(props) => (props.disabled ? '#fff' : '#ffffff')}; /* Màu chữ khi hover */
        transform: ${(props) => (props.disabled ? 'none' : 'scale(1.05)')}; /* Hiệu ứng phóng to nhẹ */
        box-shadow: ${(props) => (props.disabled ? 'none' : '0px 4px 15px rgba(0, 0, 0, 0.2)')}; /* Đổ bóng */
    }

    span {
        color: inherit; /* Kế thừa màu chữ từ cha */
    }
`;



export const WrapperProducts = styled.div`
    display: flex;
    gap: 14px;
    margin-top: 20px;
    flex-wrap: wrap;

    > div {
        transition: transform 0.3s ease, box-shadow 0.3s ease; /* Thêm hiệu ứng */
        &:hover {
            transform: scale(1.03); /* Phóng to nhẹ khi hover */
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15); /* Đổ bóng */
        }
    }
`;



/* Wrapper cho các phần tử sắp xếp */
export const WrapperSortOptions = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
`;

/* Style cho dropdown sắp xếp */
export const SelectSort = styled.select`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #fff;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        border-color: #0b74e5;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); /* Đổ bóng nhẹ khi hover */
    }

    option {
        padding: 8px;
    }
`;

/* Style cho nút Reset */
export const ResetButton = styled(Button)`
    padding: 10px 20px;
    background-color: #f5f5f5;
    color: #0d5cb6;
    border: 1px solid #ccc;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        background-color: #0d5cb6;
        color: #fff;
        transform: scale(1.05);
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    }

    &:active {
        background-color: #0a64c3;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
    }
`;

/* Wrapper cho các nút */
export const WrapperButtonGroup = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 20px;
`;


