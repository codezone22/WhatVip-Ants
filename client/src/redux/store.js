import {combineReducers, configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import userReducer from './slices/userSlice'
import nonUserReducer from './slices/nonUserSlice'
import productReducer from './slices/productSlice'
import importProductsReducer from './slices/importProductsSlice'
import orderAdminReducer from './slices/orderAdminSlice'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

//------------------------------Bỏ reducer hết vô đây

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    nonUser: nonUserReducer,
    product: productReducer,
    importProduct: importProductsReducer,
    orderAdmin: orderAdminReducer
})

//------------------------------------------------------------//

const persistConfig = {
    key: 'root',
    version: 1,
    whitelist: ['auth', 'nonUser'],
    storage,
    stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
  
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  })

export let persistor = persistStore(store)