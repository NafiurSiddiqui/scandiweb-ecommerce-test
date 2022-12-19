import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	bodyIsClicked: false,
	selectedCurrency: '',
};

export const currencySlice = createSlice({
	name: 'currency',
	initialState,
	reducers: {
		setBodyIsClicked: () => {},
		setSelectedCurrency: (state, action) => {
			state.bodyIsClicked = action.payload;
		},
	},
});

export const { setBodyIsClicked, setSelectedCurrency } = currencySlice.actions;

export default currencySlice.reducer;
