import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currencyIsOpen: false,
	selectedCurrency: '' || '$ USD',
};

export const currencySlice = createSlice({
	name: 'currency',
	initialState,
	reducers: {
		setSelectedCurrency: (state, action) => {
			state.selectedCurrency = action.payload;
		},
		setCurrencyIsOpen: (state, action) => {
			state.currencyIsOpen = action.payload;
		},
	},
});

export const { setSelectedCurrency, setCurrencyIsOpen } = currencySlice.actions;

export default currencySlice.reducer;
