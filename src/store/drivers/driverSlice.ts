import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	driver: undefined
};

const driverSlice = createSlice({
	name: 'driver',
	initialState: initialState,
	reducers: {
		updateDriver(state, action) {
			state.driver = action.payload
		},
		updateName(state, action) {
			state.driver.name = action.payload
		},
		updatePassport_number(state, action) {
			state.driver.passport_number = action.payload
		},
		updateBirth_date(state, action) {
			state.driver.birth_date = action.payload
		},
		updateAddress(state, action) {
			state.driver.address = action.payload
		},
		updatePhone_number(state, action) {
			state.driver.phone_number = action.payload
		},
		updateEmail(state, action) {
			state.driver.email = action.payload
		},
		updateImage(state, action) {
			state.driver.image = action.payload
		}
	}
})

export const {
	updateDriver,
	updateName,
	updateEmail,
	updatePassport_number,
	updatePhone_number,
	updateAddress,
	updateBirth_date,
	updateImage
} = driverSlice.actions;

export default driverSlice.reducer;