import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currencyIsOpen: false,
	selectedCurrency: '',
};

export const currencySlice = createSlice({
	name: 'currency',
	initialState,
	reducers: {
		setSelectedCurrency: (state, action) => {
			state.selectedCurrency = action.payload;
		},
		setCurrencyIsOpen: (state) => {
			state.currencyIsOpen = !state.currencyIsOpen;
		},
	},
});

export const { setSelectedCurrency, setCurrencyIsOpen } = currencySlice.actions;

export default currencySlice.reducer;
