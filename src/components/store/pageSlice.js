import { createSlice } from '@reduxjs/toolkit';

const pageSlice = createSlice({
	name: 'pageSlice',
	pageActive: '',
	reducers: {
		getPage: (state, action) => (state.pageActive = action.payload),
	},
});

export const { getPage } = pageSlice.actions;

export default pageSlice.reducer;
