import styled from "styled-components";

export const WrapperContainer = styled.div`
   
    width: 100%;
    background-color: #f5f5fa;
    display: flex;
    justify-content: flex-end; /* Đẩy các phần tử sang bên phải */
    align-items: flex-start; /* Căn phần tử theo chiều dọc lên trên */
    padding: 20px;
`;

export const WrapperListOrder = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-top: 20px;
    overflow-y: auto;
    width: 100%;
    max-width: 1000px; /* Giới hạn chiều rộng tối đa của danh sách đơn hàng */
`;

export const WrapperItemOrder = styled.div`
    display: flex;
    align-items: center;
    padding: 20px 16px;
    background: #fff;
    margin-top: 12px;
    flex-direction: column;
    width: 900px; /* Kích thước của mỗi đơn hàng */
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 12px 12px #ccc;
    min-height: 150px;
    margin-left: auto; /* Đẩy các đơn hàng sang bên phải */
    max-width: 100%;
`;








export const WrapperStatus = styled.div`
    display: flex;
    align-items: flex-start;
    width: 100%; /* thêm dấu chấm phẩy thiếu */
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid rgb(235, 235, 240);
    flex-direction: column;  /* sửa từ 'clumn' thành 'column' */
`;

export const WrapperHeaderItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;

  img {
    width: 70px;
    height: 70px;
    object-fit: cover;
    border: 1px solid rgb(238, 238, 238);
    padding: 2px;
  }

  div {
    width: 260px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 10px;
    font-size: 14px;
    color: #333;
  }

  span {
    font-size: 13px;
    color: #242424;
    margin-left: auto;
    font-weight: bold;
  }
`;

export const WrapperFooterItem = styled.div`
  display: flex;
  flex-direction: column;  /* Xếp các phần tử theo chiều dọc */
  align-items: flex-end;   /* Căn chỉnh phần tử con về phía bên phải */
  padding: 10px 0;
  border-top: 1px solid #eee;
  margin-top: 10px;

  /* Đảm bảo phần tổng tiền và giá trị của nó nằm cùng 1 dòng */
  .total-price-container {
    display: flex;
    align-items: center;  /* Căn giữa tổng tiền và giá trị của nó */
    gap: 5px; /* Khoảng cách giữa "Tổng tiền" và giá trị */
    margin-bottom: 10px;  /* Khoảng cách với các nút bên dưới */
  }

  span:first-child {
    color: rgb(255, 66, 78);
    font-size: 14px;
    font-weight: bold;
  }

  span:last-child {
    font-size: 13px;
    color: rgb(56, 56, 61);
    font-weight: 700;
    margin-left: 5px;
  }

  .button-group {
    display: flex;
    gap: 10px;
    margin-top: 10px;  /* Thêm một chút khoảng cách giữa tổng tiền và các nút */
  }

  button {
    height: 36px;
    border: 1px solid rgb(11, 116, 229);
    border-radius: 4px;
    padding: 0 10px;
    font-size: 14px;
    color: rgb(11, 116, 229);
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: rgb(11, 116, 229);
      color: #fff;
    }
  }
`;




