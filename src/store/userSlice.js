import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  registeredUsers: [],
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const newUser = {
        id: Date.now(),
        ...action.payload,
        avatar: null,
      };
      state.registeredUsers.push(newUser);
    },
    loginUser: (state, action) => {
      const { email } = action.payload;
      const user = state.registeredUsers.find(u => u.email === email);
      if (user) {
        state.currentUser = user;
        state.isLoggedIn = true;
      }
    },
    updateUserAvatar: (state, action) => {
      if (state.currentUser) {
        state.currentUser.avatar = action.payload;
        // Also update in registeredUsers array
        const userIndex = state.registeredUsers.findIndex(u => u.id === state.currentUser.id);
        if (userIndex !== -1) {
          state.registeredUsers[userIndex].avatar = action.payload;
        }
      }
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
    },
  },
});

export const { registerUser, loginUser, updateUserAvatar, logoutUser } = userSlice.actions;
export default userSlice.reducer;