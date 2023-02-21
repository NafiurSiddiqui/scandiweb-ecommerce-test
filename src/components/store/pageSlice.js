import { createSlice } from '@reduxjs/toolkit';

export const pageSlice = createSlice({
	name: 'pageSlice',
	initialState: {
		pageActive: '',
	},
	reducers: {
		getPage: (state, action) => {
			state.pageActive = action.payload;
		},
	},
});

export const { getPage } = pageSlice.actions;

export default pageSlice.reducer;
