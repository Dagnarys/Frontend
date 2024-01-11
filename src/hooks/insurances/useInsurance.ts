import {useDispatch, useSelector} from 'react-redux';
import {
	updateInsurance,
	updateDrivers,
	updateInsuranceName
} from "../../store/insurances/insuranceSlice.ts";
import {useToken} from "../users/useToken";
import {api} from "../../utils/api";

export function useInsurance() {

	const {access_token} = useToken()

	const insurance = useSelector(state => state.insurance.insurance)

	const name = useSelector(state => state.insurance.name)

	const is_draft = insurance?.status == 1

	const dispatch = useDispatch()

	const setInsurance = (value) => {
		dispatch(updateInsurance(value))
	}

	const setDrivers = (value) => {
		dispatch(updateDrivers(value))
	}

	const setName = (value) => {
		dispatch(updateInsuranceName(value))
	}

	const sendInsurance = async () => {

		const response = await api.put(`insurances/${insurance.id}/update_status_user/`, {}, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setInsurance(undefined)
			setName("")
		}
	}

	const deleteInsurance = async () => {

		const response = await api.delete(`insurances/${insurance.id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setInsurance(undefined)
			setName("")
		}

	}

	const saveInsurance = async () => {

		const form_data = new FormData()

		form_data.append('name', name)

		await api.put(`insurances/${insurance.id}/update/`, form_data, {
			headers: {
				'authorization': access_token
			}
		})

	}

	const fetchInsurance = async (insurance_id) => {

		const {data} = await api.get(`insurances/${insurance_id}/`, {
			headers: {
				'authorization': access_token
			},
		})

		setInsurance(data)
		setName(data["name"])
	}

	const addDriverToInsurance = async (driver) => {

		const response = await api.post(`drivers/${driver.id}/add_to_insurance/`, {}, {
			headers: {
				'authorization': access_token
			},
		});

		if (response.status == 200) {
			setInsurance(response.data)
		}
	}

	const deleteDriverFromInsurance = async (driver) => {
		const response = await api.delete(`insurances/${insurance.id}/delete_driver/${driver.id}/`, {
			headers: {
				'authorization': access_token
			},
		});

		if (response.status == 200) {
			setDrivers(response.data)
		}
	}

	return {
		insurance,
		name,
		is_draft,
		setInsurance,
		setDrivers,
		setName,
		saveInsurance,
		sendInsurance,
		deleteInsurance,
		fetchInsurance,
		addDriverToInsurance,
		deleteDriverFromInsurance
	};
}