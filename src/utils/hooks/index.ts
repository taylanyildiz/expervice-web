import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REGISTER, PURGE, PERSIST, PAUSE, REHYDRATE } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

/// Root Reducer
const rootReducer = combineReducers({});

/// Persist Configuration
const rootPersistConfig = {
    version: 1.0,
    key: 'root',
    storage,
    whiteList: [],
    blackList: [],
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


