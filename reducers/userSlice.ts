import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		data: null,
	},
	reducers: {
		setUser(state, action: PayloadAction<{}>) {
			state.data = action.payload;
		},
	},
});

export const { setUser } = userSlice.actions;

export const userSelector = (state) => state.user.data;
export default userSlice.reducer;
