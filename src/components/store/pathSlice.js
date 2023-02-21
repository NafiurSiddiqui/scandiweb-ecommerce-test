import { createSlice } from '@reduxjs/toolkit';

export const pathSlice = createSlice({
	name: 'pathSlice',
	initialState: {
		currentPath: '',
	},
	reducers: {
		getPage: (state, action) => {
			state.currentPath = action.payload;
		},
	},
});

export const { getPage } = pathSlice.actions;

export default pathSlice.reducer;
