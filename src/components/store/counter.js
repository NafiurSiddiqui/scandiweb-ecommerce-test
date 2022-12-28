import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
	imageCount: 0,
};

export const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		increment: (state, action) => {
			// console.log(`before :`, current(state));
			// console.log('Current state:', current(state) < 0);

			state.imageCount += 1;
			// console.log(`After :`, current(state));
		},
		decrement: (state) => {
			// console.log(`before :`, current(state));
			if (state.imageCount === 0) {
				console.log('Yes');
				return;
			}
			state.imageCount -= 1;
			// console.log(`After :`, current(state));
		},
	},
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
