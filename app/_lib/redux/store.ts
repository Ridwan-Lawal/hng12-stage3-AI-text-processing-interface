import chatsReducer from "@/app/_lib/redux/chatsSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    chats: chatsReducer,
  },
});

export default store;
