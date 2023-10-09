import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REGISTER, PURGE, PERSIST, PAUSE, REHYDRATE } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import constant from './constant_store';
import production from './production_store';
import auth from './auth_store';
import account from './account_store';
import region from './region_store';
import summary from './summary_store';
import compay_region from './company_region_store';
import unit from './unit_store';

/// Root Reducer
const rootReducer = combineReducers({
    constant,
    production,
    auth,
    account,
    region,
    summary,
    compay_region,
    unit,
});

/// Persist Configuration
const rootPersistConfig = {
    version: 1.0,
    key: 'root',
    storage,
    whiteList: ["constants", "production", "region", "summary"],
    blackList: ["auth", "account", "compay_region"],
}

/// Persisted Reducer
const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

/// Redux Store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }
    })
});


/// Peristor
export const persistor = persistStore(store);

/// State Type
export type RootState = ReturnType<typeof store.getState>

/// Dispatch Type
export type AppDispatch = typeof store.dispatch

