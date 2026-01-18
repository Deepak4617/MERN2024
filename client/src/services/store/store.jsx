import { configureStore } from '@reduxjs/toolkit';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { rootReducer } from '../slices';
import { BlackListData} from '../constants/store';

import {
    persistStore,
    persistReducer,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    // transforms: [
    //     encryptTransform({
    //         secretKey: '23/Bo3;}0Q(v2H9wS^9826£<',
    //     }),
    // ],
    version: 1,
    blacklist: BlackListData
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }),
})

const persistor = persistStore(store);

export { store, persistor }
