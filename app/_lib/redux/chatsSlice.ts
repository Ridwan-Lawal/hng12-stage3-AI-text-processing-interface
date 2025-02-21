import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  prompts: object[];
}

const initialState: InitialState = {
  prompts: [],
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    addPrompts(state, action) {
      state.prompts = [...state.prompts, action.payload];
    },

    clearAllPrompts(state) {
      state.prompts = [];
    },
  },
});

export const { addPrompts, clearAllPrompts } = chatsSlice.actions;

export default chatsSlice?.reducer;
