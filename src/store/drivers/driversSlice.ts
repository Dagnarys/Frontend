import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	drivers: [],
	query: ""
};

const driversSlice = createSlice({
	name: 'drivers',
	initialState: initialState,
	reducers: {
		updateDrivers(state, action) {
			state.drivers = action.payload
		},
		updateQuery(state, action) {
			state.query = action.payload
		}
	}
})

export const {
	updateDrivers,
	updateQuery
} = driversSlice.actions;

export default driversSlice.reducer;