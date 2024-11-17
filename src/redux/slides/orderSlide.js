import { createSlice } from '@reduxjs/toolkit'

// Khai báo initialState
const initialState = {
    orderItems: [],
    orderItemSelected: [],
    shippingAddress: {},
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
    isErrorOrder: false,
    isSucessOrder: false,
}

export const orderSlide = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const { orderItem } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem.product)
            if (itemOrder) {
                if (itemOrder.amount <= itemOrder.countInStock) {
                    itemOrder.amount += orderItem?.amount
                    state.isSucessOrder = true
                    state.isErrorOrder = false
                }
            } else {
                state.orderItems.push(orderItem)
            }

        },
        resetOrder: (state) => {
            state.isSucessOrder = false
        },
        increaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            // Kiểm tra nếu sản phẩm có trong orderItems và orderItemSelected
            const itemOrder = state.orderItems.find((item) => item.product === idProduct);
            const itemOrderSelected = state.orderItemSelected.find((item) => item.product === idProduct);

            // Nếu sản phẩm không có trong orderItems hoặc orderItemSelected, không làm gì
            if (!itemOrder || !itemOrderSelected) return;

            itemOrder.amount++;
            itemOrderSelected.amount++;
        },

        decreaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            // Kiểm tra nếu sản phẩm có trong orderItems và orderItemSelected
            const itemOrder = state.orderItems.find((item) => item.product === idProduct);
            const itemOrderSelected = state.orderItemSelected.find((item) => item.product === idProduct);

            // Nếu sản phẩm không có trong orderItems hoặc orderItemSelected, không làm gì
            if (!itemOrder || !itemOrderSelected) return;

            // Đảm bảo không giảm xuống dưới 1
            if (itemOrder.amount > 1) itemOrder.amount--;
            if (itemOrderSelected.amount > 1) itemOrderSelected.amount--;
        },

        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload
            const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct)
            const itemOrderSelected = state?.orderItemSelected?.filter((item) => item?.product !== idProduct)
            state.orderItems = itemOrder;
            state.orderItemSelected = itemOrderSelected;

        },
        removeAllOrderProduct: (state, action) => {
            const { listChecked } = action.payload
            const itemOrders = state?.orderItems?.filter((item) => !listChecked.includes(item.product))
            const itemOrderSelected = state?.orderItemSelected?.filter((item) => !listChecked.includes(item.product))
            state.orderItems = itemOrders
            state.orderItemSelected = itemOrderSelected
        },
        selectedOrder: (state, action) => {
            const { listChecked } = action.payload
            const orderSelected = []
            state.orderItems.forEach((order) => {
                if (listChecked.includes(order.product)) {
                    orderSelected.push(order)
                };
            });
            state.orderItemSelected = orderSelected
        }
    },
})

// Action creators are generated for each case reducer function
export const { addOrderProduct, increaseAmount, decreaseAmount, removeOrderProduct, removeAllOrderProduct, selectedOrder, resetOrder } = orderSlide.actions

export default orderSlide.reducer;

