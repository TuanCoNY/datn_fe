import axios from "axios"
import { axiosJWT } from "./UserService"


export const createOrder = async (data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/order/create`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const getOrderbyUserId = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-all-order/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const getDetailsOrder = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-details-order/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const cancelOrder = async (id, access_token, orderItems) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/order/cancel-order/${id}`, { data: orderItems }, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}
//
export const deleteManyOrders = async (orderIds, access_token) => {
    try {
        const res = await axiosJWT.delete(
            `${process.env.REACT_APP_API_URL}/order/delete-many-orders`,
            { data: { orderIds } }, // Gửi orderIds dưới dạng body
            {
                headers: {
                    token: `Bearer ${access_token}`,
                },
            }
        );
        return res.data;
    } catch (error) {
        console.error("Error deleting orders:", error);
        throw error; // Đảm bảo trả về lỗi nếu có
    }
};

// export const cancelOrder = async (id, access_token, orderItems) => {
//     const res = await axiosJWT.patch(
//         `${process.env.REACT_APP_API_URL}/order/cancel-order/${id}`,
//         { orderItems },
//         {
//             headers: {
//                 token: `Bearer ${access_token}`,
//             }
//         }
//     )
//     return res.data
// }
export const getAllOrder = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-all-order`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const updateOrderStatus = async (access_token, orderId, status) => {
    const config = {
        headers: { Authorization: `Bearer ${access_token}` },
    };
    const body = { status };
    console.log("Calling API to update order status...");
    try {
        const response = await axios.patch(`${process.env.REACT_APP_API_URL}/order/update-status/${orderId}`, body, config);
        console.log("Response data:", response.data); // Log phản hồi từ backend
        return response.data;
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        throw error; // Ném lại lỗi để có thể xử lý tại nơi gọi
    }
};
export const markOrderAsReceived = async (orderId, access_token) => {
    try {
        console.log("orderId:", orderId);
        console.log("access_token:", access_token);
        const res = await axiosJWT.put(
            `${process.env.REACT_APP_API_URL}/order/mark-received/${orderId}`,
            {},
            {
                headers: {
                    token: `Bearer ${access_token}`,
                },
            }
        );
        return res.data;
    } catch (error) {
        console.error("Error marking order as received:", error.response ? error.response.data : error.message);
        throw error;
    }
};

