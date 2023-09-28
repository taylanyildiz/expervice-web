import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REGISTER, PURGE, PERSIST, PAUSE, REHYDRATE } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import constant_hooks from './constant_hooks';
import production_hooks from './production_hooks';
import auth_hooks from './auth_hooks';

/// Root Reducer
const rootReducer = combineReducers({
    constants: constant_hooks,
    production: production_hooks,
    auth: auth_hooks,
});

/// Persist Configuration
const rootPersistConfig = {
    version: 1.0,
    key: 'root',
    storage,
    whiteList: ["constants", "production"],
    blackList: ["auth"],
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


