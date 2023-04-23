import { configureStore } from '@reduxjs/toolkit';
import messageReducer from './reducers/slice';

export const store = configureStore({
	reducer: {
		message: messageReducer,
	},
});
