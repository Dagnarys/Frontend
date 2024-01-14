import {useDispatch, useSelector} from 'react-redux';
import {
	updateDrivers,
	updateQuery
} from "../../store/drivers/driversSlice.ts";
import {api} from "../../utils/api";
import {useInsurance} from "../insurances/useInsurance.ts";
import {useToken} from "../users/useToken";

export function useDrivers() {
	const drivers = useSelector(state => state.drivers.drivers);
	const query = useSelector(state => state.drivers.query);

	const {access_token} = useToken()

	const {setInsurance, setInsuranceId} = useInsurance()

	const dispatch = useDispatch()

	const setDrivers = (value) => {
		dispatch(updateDrivers(value))
	}

	const setQuery = (value) => {
		dispatch(updateQuery(value))
	}

	const searchDrivers = async (navigate=null) => {

		const {data} = await api.get(`drivers/search/`, {
			params: {
				query: query
			},
			headers: {
				'authorization': access_token
			}
		})

		const draft_insurance_id = data["draft_insurance_id"]
		setInsuranceId(draft_insurance_id)

		if (!draft_insurance_id) {
			setInsurance(undefined)
			navigate && navigate("/")
		}

		return data["drivers"]
	}

	const fetchDrivers = async () => {
		searchDrivers().then(data => setDrivers(data))
	}

	return {
		drivers,
		setDrivers,
		query,
		setQuery,
		searchDrivers,
		fetchDrivers
	};
}