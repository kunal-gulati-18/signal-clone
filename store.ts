import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/userSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
	user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: [thunk],
});

export const persistor = persistStore(store);
