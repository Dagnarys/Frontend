import {configureStore} from "@reduxjs/toolkit";

import driverReducer from "./drivers/driverSlice"
import draftInsuranceReducer from "./insurances/insuranceSlice"
import authReducer from "./users/authSlice"
import insurancesReducer from "./insurances/insurancesSlice"
import driversReducer  from "./drivers/driversSlice"

export default configureStore({
	reducer: {
		driver: driverReducer,
		drivers: driversReducer,
		insurance: draftInsuranceReducer,
		insurances: insurancesReducer,
		user: authReducer
	}
});