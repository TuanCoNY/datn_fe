import { Col } from "antd";
import styled from "styled-components";

// Wrapper cho danh sách sản phẩm
export const WrapperProducts = styled.div`
    display: flex;
    gap: 14px;
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: space-between; /* Đảm bảo các item có khoảng cách đồng đều */
`;

export const WrapperNavbar = styled(Col)`
    background: #fff;
    margin-right: 10px;
    padding: 10px;
    border-radius: 6px;
    height: fit-content;
    margin-top: 20px;
    width: 200px;
`;

// Card bao quanh sản phẩm
export const ProductCardWrapper = styled.div`
    border-radius: 12px; /* Bo góc cho Card */
    border: 1px solid #d1d1d1; /* Đặt màu xám cho viền */
    overflow: hidden; /* Đảm bảo nội dung trong card không ra ngoài viền bo góc */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Thêm bóng nhẹ để nổi bật */
    transition: transform 0.3s ease; /* Thêm hiệu ứng chuyển động khi hover */

    &:hover {
        transform: translateY(-5px); /* Di chuyển card lên khi hover */
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15); /* Tăng bóng khi hover */
    }
`;

