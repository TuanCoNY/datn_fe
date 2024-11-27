import axios from 'axios';
import { axiosJWT } from './UserService';  // Nếu bạn đã cấu hình axiosJWT trong UserService

// Lấy tất cả mã giảm giá
export const getAllDiscounts = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/discount/promotions`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
};

// Tạo mã giảm giá mới
export const createDiscount = async (access_token, discountData) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/`, discountData, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
};

// Cập nhật mã giảm giá
export const updateDiscount = async (access_token, discountData) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}discount/${discountData.id}`, discountData, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
};

// Xóa mã giảm giá
export const deleteDiscount = async (access_token, discountId) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/api/discount/${discountId}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
};
