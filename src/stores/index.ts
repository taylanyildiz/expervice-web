import { AnyAction, CombinedState, combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REGISTER, PURGE, PERSIST, PAUSE, REHYDRATE } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import constant from './constant_store';
import production from './production_store';
import auth from './auth_store';
import account from './account_store';
import region from './region_store';
import summary from './summary_store';
import companyRegion from './company_region_store';
import unit from './unit_store';
import internalUser from './internal_user_store';
import customer from './customer_user_store';
import user from './user_store';
import technician from './technician_store';
import job from './job_store';
import form from './form_store';
import notification from './notification_store';

/// Root Reducer
const appReducer = combineReducers({
    constant,
    production,
    auth,
    account,
    region,
    summary,
    companyRegion,
    unit,
    internalUser,
    customer,
    user,
    technician,
    job,
    form,
    notification,
});

/// Persist Configuration
const rootPersistConfig = {
    version: 1.0,
    key: 'root',
    storage,
    blackList: [auth, account, companyRegion],
}

/// Persisted Reducer
const persistedReducer = persistReducer(rootPersistConfig, (state: CombinedState<any>, action: AnyAction) => {
    if (action.type === 'account/logout') {
        state = undefined;
    }
    return appReducer(state, action);
})

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