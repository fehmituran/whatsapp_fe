import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import storage from "redux-persist/lib/storage";
import createFilter from "redux-persist-transform-filter";
import { persistStore, persistReducer } from "redux-persist";
import chatSlice from "../features/chatSlice";

//saveUserOnlyFilter
const saveUserOnlyFilter = createFilter("user", ["user"]);

//persist config
const persistConfig = {
  key: "user",
  storage,
  whitelist: ["user"],
  transforms: [saveUserOnlyFilter],
};

const rootReducer = combineReducers({
  user: userSlice,
  chat: chatSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export const persistor = persistStore(store);
