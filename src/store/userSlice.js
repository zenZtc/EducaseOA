import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  registeredUsers: [],
  currentUser: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      state.registeredUsers.push(action.payload);
    },
    loginUser: (state, action) => {
      const user = state.registeredUsers.find(u => u.email === action.payload.email);
      state.currentUser = user;
    },
    logoutUser: (state) => {
      state.currentUser = null;
    },
    updateUserAvatar: (state, action) => {
      if (state.currentUser) {
        state.currentUser.avatar = action.payload;
        // Also update in registered users array
        const userIndex = state.registeredUsers.findIndex(u => u.email === state.currentUser.email);
        if (userIndex !== -1) {
          state.registeredUsers[userIndex].avatar = action.payload;
        }
      }
    }
  }
});

export const { registerUser, loginUser, logoutUser, updateUserAvatar } = userSlice.actions;
export default userSlice.reducer;