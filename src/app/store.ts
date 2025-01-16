import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './slices/userSlice';
import { stockApi } from './slices/stockApi';
import { storyApi } from './slices/storyApi';
import { agentApi } from './slices/agentApi';
import { costTypeApi } from './slices/costTypeSlice';
import { storeApi } from './slices/storeApi';
import { driverApi } from './slices/driverApi';
import { categoryApi } from './slices/categoryApi';
import { regionApi } from './slices/regionApi';
import { itemApi } from './slices/itemApi';
import { faqApi } from './slices/faqApi';

const persistConfig = {
  key: 'baiElim',
  version: 1,
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  user: userReducer,
  [stockApi.reducerPath]: stockApi.reducer,
  [storyApi.reducerPath]: storyApi.reducer,
  [agentApi.reducerPath]: agentApi.reducer,
  [costTypeApi.reducerPath]: costTypeApi.reducer,
  [storeApi.reducerPath]: storeApi.reducer,
  [driverApi.reducerPath]: driverApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [regionApi.reducerPath]: regionApi.reducer,
  [itemApi.reducerPath]: itemApi.reducer,
  [faqApi.reducerPath]: faqApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(
      stockApi.middleware,
      storyApi.middleware,
      agentApi.middleware,
      costTypeApi.middleware,
      storeApi.middleware,
      driverApi.middleware,
      categoryApi.middleware,
      regionApi.middleware,
      itemApi.middleware,
      faqApi.middleware
    ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
