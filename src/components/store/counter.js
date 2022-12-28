import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
	GalleryCount: 0,
};

export const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		increment: (state) => {
			console.log(`before :`, current(state));
			state.GalleryCount += 1;
			console.log(`After :`, current(state));
		},
		decrement: (state) => {
			console.log(`before :`, current(state));
			state.GalleryCount -= 1;
			console.log(`After :`, current(state));
		},
	},
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
