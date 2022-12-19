import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	bodyIsClicked: false,
	selectedCurrency: '',
};

export const currencySlice = createSlice({
	name: 'currency',
	initialState,
	reducers: {
		setBodyIsClicked: (state, action) => {
			state.bodyIsClicked = !state.bodyIsClicked || action.payload;
			// console.log('Body clicked');
		},
		setSelectedCurrency: (state, action) => {
			state.selectedCurrency = action.payload;
		},
	},
});

export const { setBodyIsClicked, setSelectedCurrency } = currencySlice.actions;

export default currencySlice.reducer;
