import {useDispatch, useSelector} from 'react-redux';
import {
	updateStatus,
	updateDateStart,
	updateDateEnd,
	updateUser
} from "../../store/insurances/insurancesSlice.ts";
import {api} from "../../utils/api";
import {useToken} from "../users/useToken";

export function useInsurances() {
	const status = useSelector(state => state.insurances.status)
	const date_start = useSelector(state => state.insurances.date_start)
	const date_end = useSelector(state => state.insurances.date_end)
	const user = useSelector(state => state.insurances.user)

	const dispatch = useDispatch()

	const {access_token} = useToken()

	const setStatus = (value) => {
		dispatch(updateStatus(value))
	}

	const setDateStart = (value) => {
		dispatch(updateDateStart(value))
	}

	const setDateEnd = (value) => {
		dispatch(updateDateEnd(value))
	}

	const setUser = (value) => {
		dispatch(updateUser(value))
	}

	const searchInsurances = async () => {

		const {data} = await api.get(`insurances/search/`, {
			params: {
				status: status,
				date_start: new Date(date_start),
				date_end: new Date(date_end)
			},
			headers: {
				'authorization': access_token
			}
		})

		return data.filter(insurance => insurance.employer.name.includes(user))

	}


	return {
		status,
		date_start,
		date_end,
		setStatus,
		searchInsurances,
		setDateStart,
		setDateEnd,
		setUser
	};
}