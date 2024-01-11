import React, { useState } from "react";
import "./ProfilePage.sass";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/users/useAuth";
import CustomButton from "../../components/CustomButton/CustomButton";
import avatar from "/src/assets/avatar.png";
import {useInsurances} from "../../hooks/insurances/useInsurances.ts";
import {useInsurance} from "../../hooks/insurances/useInsurance.ts";

const ProfilePage = () => {
	const navigate = useNavigate();
	const { is_moderator, user_name,user_id, user_email, logOut,userUpdate} = useAuth();

	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({
		name: user_name,
		email: user_email,
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		if (name === "email" && !value.includes("@user.com")) {
			// If the email field doesn't contain "@", prevent updating the formData
			return;
		}
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleSave = async () => {

		await userUpdate(formData);
		setIsEditing(false);
	};

	const doLogOut = async () => {
		await logOut();
		navigate("/drivers");
	};

	return (
		<div className="profile-wrapper">
			<img src={avatar} className="user-avatar" alt="" />
			<div className="user-info-wrapper">
        <span>
          Имя:{" "}
			{isEditing ? (
				<input
					type="text"
					name="name"
					value={formData.name}
					onChange={handleInputChange}
				/>
			) : (
				<span>{user_name}</span>
			)}
        </span>
				<span>
          Почта:{" "}
					{isEditing ? (
						<input
							type="text"
							name="email"
							value={formData.email}
							onChange={handleInputChange}
						/>
					) : (
						<span>{user_email}</span>
					)}
        </span>
				<span>Статус: {is_moderator ? "Модератор" : "Пользователь"}</span>
				{isEditing ? (
					<CustomButton onClick={handleSave}>Сохранить</CustomButton>
				) : (
					<CustomButton onClick={handleEdit}>Изменить</CustomButton>
				)}
				<CustomButton onClick={doLogOut}>Выйти</CustomButton>
			</div>
		</div>
	);
};

export default ProfilePage;
