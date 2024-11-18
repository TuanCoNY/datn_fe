import { createSlice } from '@reduxjs/toolkit'

// Khai báo initialState
const initialState = {
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: '',
    access_token: '',
    id: '',
    isAdmin: false,
    city: '',
}

export const userSlide = createSlice({
    name: 'user',
    initialState, // Sử dụng initialState đã khai báo
    reducers: {
        updateUser: (state, action) => {
            const { name = '', email = '', address = '', phone = '', avatar = '', access_token = '', _id = '', isAdmin, city = '',
                refreshToken = '' } = action.payload
            state.name = name;
            state.email = email;
            state.address = address;
            state.phone = phone;
            state.avatar = avatar;
            state.id = _id;
            state.access_token = access_token;
            state.isAdmin = isAdmin;
            state.city = city;
            state.refreshToken = refreshToken;
        },
        resetUser: (state) => {
            state.name = '';
            state.email = '';
            state.address = '';
            state.phone = '';
            state.avatar = '';
            state.id = '';
            state.access_token = '';
            state.isAdmin = false;
            state.city = '';
            state.refreshToken = '';
        },
    },
})

export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer;

