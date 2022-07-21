import { createSlice } from "@reduxjs/toolkit";

export const userSliceName = "user";
const userSlice = createSlice({
  name: userSliceName,
  initialState: {
    id: "10001",
    name: "asow",
    address: "shenzhen",
    deposit: 20000,
  },
  reducers: {
    updateAddress(state, action) {
      const { payload } = action;
      state.address = payload;
    },
    changeDeposit(state, action) {
      const { payload } = action;
      state.deposit = payload;
    },
  },
});

export const { updateAddress, changeDeposit } = userSlice.actions;
export default userSlice.reducer;
