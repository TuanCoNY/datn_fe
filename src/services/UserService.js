import axios from "axios";

export const axiosJWT = axios.create();

export const loginUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`, data);
    console.log(res.data)

    return res.data;

};
export const resetPasswordService = async (data) => {
    console.log("Data sent to backend:", data);  // In dữ liệu gửi lên server
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/forgot-password`, data);

        console.log("Response from backend:", res.data);  // In ra phản hồi từ server
        return res.data;
    } catch (error) {
        console.error("Error during API call:", error.response || error.message);
        throw error;  // Để có thể catch error ở nơi gọi service
    }
};


export const signupUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-up`, data);
    console.log('data', res.data);
    return res.data;
};

export const getAllUser = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/getAll`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
};

export const getDetailsUser = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/get-details/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
};

export const deleteUser = async (id, access_token, data) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/user/delete-user/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
};

export const refreshToken = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refresh-token`, {
        withCredentials: true
    });
    return res.data;
};

export const logoutUser = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/log-out`);
    return res.data;
};

export const updateUser = async (id, data, access_token) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/user/update-user/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
};

export const deleteManyUser = async (data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/user/delete-many`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
};

// Thêm phương thức quên mật khẩu

export const sendVerificationCode = async (email) => {
    // (`${process.env.REACT_APP_API_URL}/user/log-out`)
    return await axios.post(`${process.env.REACT_APP_API_URL}/user/send-code`, { email });
};

export const verifyCode = async (email, code) => {
    return await axios.post(`${process.env.REACT_APP_API_URL}/user/verify-code`, { email, code });
};

export const resetPassword = async (email, newPassword) => {
    return await axios.post(`${process.env.REACT_APP_API_URL}/user/forgot-password`, { email, newPassword });
};
