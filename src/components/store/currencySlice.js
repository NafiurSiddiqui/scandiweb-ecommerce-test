import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	bodyIsClicked: false,
	currencyIsOpen: false,
	selectedCurrency: '',
};

export const currencySlice = createSlice({
	name: 'currency',
	initialState,
	reducers: {
		setBodyIsClicked: (state, action) => {
			state.bodyIsClicked = action.payload;
		},
		setSelectedCurrency: (state, action) => {
			state.selectedCurrency = action.payload;
		},
		setCurrencyIsOpen: (state) => {
			state.currencyIsOpen = !state.currencyIsOpen;
		},
	},
});

export const { setBodyIsClicked, setSelectedCurrency, setCurrencyIsOpen } =
	currencySlice.actions;

export default currencySlice.reducer;
