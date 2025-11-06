import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "Cart",
  initialState: localStorage.getItem("Cart")
    ? JSON.parse(localStorage.getItem("Cart"))
    : [],
  reducers: {
    addCart: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("Cart", JSON.stringify(state));
    },
    removeCart: (state, action) => {
      const newState = state.filter((item) => item._id !== action.payload);
      localStorage.setItem("Cart", JSON.stringify(newState));
      return newState;
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.find(item => item._id === id);
      
      if (item) {
        item.quantity = quantity;
        localStorage.setItem("Cart", JSON.stringify(state));
      }
    },
  },
});

export const { addCart, removeCart, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;