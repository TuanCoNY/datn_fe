import { createSlice } from '@reduxjs/toolkit'

// Khai báo initialState
const initialState = {
  search: '', // Giá trị mặc định, bạn có thể thay đổi tùy thuộc vào nhu cầu của bạn
}

export const productSlide = createSlice({
  name: 'product',
  initialState, // Sử dụng initialState đã khai báo
  reducers: {
    searchProduct: (state, action) => {
      state.search = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { searchProduct } = productSlide.actions

export default productSlide.reducer;

