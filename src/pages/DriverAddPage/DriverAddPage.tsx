import "./DriverAddPage.sass"
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";
import CustomButton from "../../components/CustomButton/CustomButton";
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import mock from "/src/assets/mock.jpg"
import {api} from "../../utils/api";
import {useToken} from "../../hooks/users/useToken";
import UploadButton from "../../components/UploadButton/UploadButton";
import {variables} from "../../utils/consts";

const DriverAddPage = () => {

    const {access_token} = useToken()

    const navigate = useNavigate()

    const [name, setName] = useState("asd")
    const [birth_date, setBirth_date] = useState("asdf")
    const [address, setAddress] = useState("23")
    const [phone_number, setPhone_number] = useState("23")
    const [email, setEmail] = useState("asdf")
    const [passport_number, setPassport_number] = useState("23")

    const [imgFile, setImgFile] = useState<File | undefined>()
    const [imgURL, setImgURL] = useState<string | undefined>(mock)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const img = e.target?.files[0]
            setImgFile(img)
            setImgURL(URL.createObjectURL(img))
        }
    }

    const addDriver = async () => {

        const response = await api.post(`drivers/create/`, {}, {
            headers: {
                'authorization': access_token
            }
        })

        if (response.status == 200){
            const driver_id = response.data["id"]
            await updateDriver(driver_id)
        }

    }

    const updateDriver = async (driver_id) => {

        const form_data = new FormData()

        form_data.append('name', name)
        form_data.append('birth_date', birth_date)
        form_data.append('foundation_date', address)
        form_data.append('phone_number', phone_number)
        form_data.append('email', email)
        form_data.append('passport_number', passport_number)

        if (imgFile != undefined) {
            form_data.append('image', imgFile, imgFile.name)
        }

        for (const pair of form_data.entries()) {
            console.log(pair[0]+ ', ' + pair[1]);
        }

        const response = await api.put(`drivers/${driver_id}/update/`, form_data, {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': access_token
            }
        })

        if (response.status == 200){
            navigate("/drivers/")
        }
    }


    return (
        <div className="add-page-wrapper">
            <div className="left">

                <img src={imgURL} className="faculty-image" alt=""/>

                <UploadButton handleFileChange={handleFileChange} />

            </div>

            <div className="right">

                <div className="info-container">

                    <CustomInput placeholder="Имя" value={name} setValue={setName} />

                    <CustomInput  placeholder="Дата рождения" value={birth_date} setValue={setBirth_date} />

                    <CustomInput placeholder="Адрес" value={address} setValue={setAddress} />

                    <CustomInput placeholder="Телефон" value={phone_number} setValue={setPhone_number} />

                    <CustomInput placeholder="Паспорт" value={passport_number} setValue={setPassport_number} />

                    <CustomInput placeholder="Почта" value={email} setValue={setEmail} />

                    <div className="buttons-container">

                        <CustomButton bg={variables.green} onClick={addDriver}>
                            Создать
                        </CustomButton>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default DriverAddPage