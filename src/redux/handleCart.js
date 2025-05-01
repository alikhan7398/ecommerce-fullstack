import { createSlice } from '@reduxjs/toolkit';

// Load cart from localStorage
const loadCartState = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (e) {
    return [];
  }
};

const handleCart = createSlice({
  name: "cart",
  initialState: loadCartState(),
  reducers: {
    addCart(state, action) {
      const product = action.payload;
      const exist = state.find((x) => x.id === product.id);
      let newState;
      if (exist) {
        newState = state.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty + 1 } : x
        );
      } else {
        newState = [...state, { ...product, qty: 1 }];
      }
      localStorage.setItem('cart', JSON.stringify(newState));
      return newState;
    },
    delCart(state, action) {
      const product = action.payload;
      const exist = state.find((x) => x.id === product.id);
      let newState;
      if (exist.qty === 1) {
        newState = state.filter((x) => x.id !== product.id);
      } else {
        newState = state.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty - 1 } : x
        );
      }
      localStorage.setItem('cart', JSON.stringify(newState));
      return newState;
    },
    removeCart(state, action) {
      const newState = state.filter((x) => x.id !== action.payload.id);
      localStorage.setItem('cart', JSON.stringify(newState));
      return newState;
    },
    clearCart(state) {
      localStorage.setItem('cart', JSON.stringify([]));
      return [];
    },
  },
});

export const { addCart, delCart, removeCart, clearCart } = handleCart.actions;
export default handleCart.reducer;