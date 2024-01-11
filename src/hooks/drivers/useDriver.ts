import {useDispatch, useSelector} from 'react-redux';
import {
	updateDriver,
	updateName,
	updateEmail,
	updatePassport_number,
	updatePhone_number,
	updateAddress,
	updateBirth_date,
	updateImage
} from "../../store/drivers/driverSlice.ts";
import {api} from "../../utils/api";

export function useDriver() {
	const driver = useSelector(state => state.driver.driver)
	const image = useSelector(state => state.driver.image)

	const dispatch = useDispatch()

	const setDriver = (value) => {
		dispatch(updateDriver(value))
	}

	const setName = (value) => {
		dispatch(updateName(value))
	}

	const setEmail = (value) => {
		dispatch(updateEmail(value))
	}

	const setPassport_number = (value) => {
		dispatch(updatePassport_number(value))
	}

	const setPhone_number = (value) => {
		dispatch(updatePhone_number(value))
	}

	const setAddress = (value) => {
		dispatch(updateAddress(value))
	}

	const setBirth_date = (value) => {
		dispatch(updateBirth_date(value))
	}

	const setImage = (value) => {
		dispatch(updateImage(value))
	}

	const fetchDriver = async (id) => {

		const {data} = await api.get(`drivers/${id}`);

		setDriver(data)

	};

	return {
		driver,
		image,
		setDriver,
		setName,
		setAddress,
		setEmail,
		setBirth_date,
		setPassport_number,
		setPhone_number,
		setImage,
		fetchDriver,
	};
}