import chatsReducer from "@/app/_lib/redux/chatsSlice";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem() {
      return Promise.resolve();
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const reduxStorage =
  typeof window !== "undefined" ? storage : createNoopStorage();

const chatsPersistConfig = {
  key: "chats",
  storage: reduxStorage,
  version: 1,
};

const store = configureStore({
  reducer: {
    chats: persistReducer(chatsPersistConfig, chatsReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
