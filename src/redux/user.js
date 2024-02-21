import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: null,
  id: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { name, id } = action.payload;
      state.userName = name;
      state.id = id;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;
export const selectUserName = (state) => state.user.userName;
export const selectUserId = (state) => state.user.id;

export default userSlice.reducer;
