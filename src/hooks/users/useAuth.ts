import {useDispatch, useSelector} from 'react-redux';
import {updateUser, cleanUser} from "../../store/users/authSlice";
import {useToken} from "./useToken";
import {api} from "../../utils/api";

export function useAuth() {
	const {is_authenticated, is_moderator, user_id, user_name, user_email} = useSelector(state => state.user)

	const { access_token, setAccessToken, resetAccessToken } = useToken()


	const dispatch = useDispatch()

	const setUser = (value) => {
		dispatch(updateUser(value))
	}

	const resetUser = () => {
		dispatch(cleanUser())
	}

	const logOut = async () => {

		const response = await api.post(`logout/`, {}, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			resetAccessToken()
			resetUser()
		}

	}


	const register = async (formData) => {

		try {

			const response = await api.post(`register/`, formData as FormData)

			if (response.status == 201) {
				setAccessToken(response.data["access_token"])
				return true
			}

		} catch (error) {

			return false
		}
	}


	const login = async (formData) => {

		try {
			const response = await api.post(`login/`, formData)
			console.log(formData)
			setAccessToken(response.data['access_token'])

			const permissions = {
				is_authenticated: true,
				is_moderator: response.data["is_moderator"],
				user_id: response.data["user_id"],
				user_name: response.data["name"],
				user_email: response.data["email"]
			}

			setUser(permissions)

			return true

		} catch (error){

		}
	}
	const userUpdate = async (formData) => {
		console.log(formData)
		console.log(user_id)
		try {
			const form_data = new FormData();

			// Append the updated name and email to the form data
			form_data.append('name', formData.name);
			form_data.append('email', formData.email);
			console.log(form_data)
			// Make the API call to update the user
			const response = await api.put(`update_user/`, form_data, {
				headers: {
					'authorization': access_token
				}
			});

			// Check if the update was successful
			if (response.status === 200) {
				// Update the local state with the new data
				const updatedPermissions = {
					is_authenticated: true,
					is_moderator: response.data["is_moderator"],
					user_id: response.data["user_id"],
					user_name: response.data["name"],
					user_email: response.data["email"]
				};

				setUser(updatedPermissions);

				return true;
			} else {
				// Handle the case where the update was not successful
				console.error('User update failed:', response);
				return false;
			}
		} catch (error) {
			// Handle any unexpected errors
			console.error('Error updating user:', error);
			return false;
		}
	};


	const auth = async () => {

		if (is_authenticated)
		{
			return true
		}

		if (access_token === "undefined") {
			return false
		}

		try {

			const response = await api.post(`check/`, {}, {
				headers: {
					'authorization': access_token
				}
			})

			if (response.status == 200)
			{
				const permissions = {
					is_authenticated: true,
					is_moderator: response.data["is_moderator"],
					user_id: response.data["user_id"],
					user_name: response.data["name"],
					user_email: response.data["email"]
				}

				setUser(permissions)

				return true
			}

		} catch (error) {

			return false

		}

	}



	return {
		is_authenticated,
		is_moderator,
		user_id,
		user_name,
		user_email,
		setUser,
		logOut,
		login,
		auth,
		register,
		userUpdate
	};
}