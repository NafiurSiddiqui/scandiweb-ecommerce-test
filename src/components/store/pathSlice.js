import { createSlice } from '@reduxjs/toolkit';

export const pathSlice = createSlice({
	name: 'path',
	initialState: {
		currentPath: '',
	},
	reducers: {
		getPage: (state, action) => {
			state.currentPath = action.payload.toLowerCase();
		},
	},
});

export const { getPage } = pathSlice.actions;

export default pathSlice.reducer;
