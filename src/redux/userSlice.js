import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: localStorage.getItem('username') || null,
    token: localStorage.getItem('token') || null,
  },
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
      localStorage.setItem('username', action.payload.username);
      localStorage.setItem('token', action.payload.token);
    },
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;