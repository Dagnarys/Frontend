import "./DriverEditPage.sass"
import {Link, useParams, useNavigate} from "react-router-dom";
import {useDriver} from "../../hooks/drivers/useDriver.ts";
import React, {useEffect, useState} from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";
import CustomButton from "../../components/CustomButton/CustomButton";
import {api} from "../../utils/api";
import {useToken} from "../../hooks/users/useToken";
import UploadButton from "../../components/UploadButton/UploadButton";
import {variables} from "../../utils/consts";

const DriverEditPage = () => {

    const navigate = useNavigate()

    const {access_token} = useToken()

    const { id } = useParams<{id: string}>();

    const {
        driver,
        fetchDriver,
        setName,
        setPhone_number,
        setPassport_number,
        setAddress,
        setEmail,
        setBirth_date,
        setImage
    } = useDriver()

    useEffect(() => {
        id && fetchDriver(id)
    }, [])

    const [img, setImg] = useState<File | undefined>(undefined)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const img = e.target?.files[0]
            setImg(img)
            setImage(URL.createObjectURL(img))
        }
    }

    const saveDriver = async() => {
        let form_data = new FormData()

        form_data.append('name', driver.name)
        form_data.append('passport_number', driver.passport_number)
        form_data.append('address', driver.address)
        form_data.append('email', driver.email)
        form_data.append('birth_date', driver.birth_date)
        form_data.append('phone_number', driver.phone_number)

        if (img != undefined) {
            form_data.append('image', img, img.name)
        }

        const response = await api.put(`drivers/${driver.id}/update/`, form_data, {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': access_token
            }
        })

        if (response.status == 200) {
            setImg(undefined)
            navigate("/drivers/")
        }
    }

    const deleteDriver = async () => {

        const response = await api.delete(`drivers/${driver.id}/delete/`, {
            headers: {
                'authorization': access_token
            }
        })

        if (response.status == 200) {
            setImg(undefined)
            navigate("/drivers/")
        }

    }

    if (id == undefined) {
        return (
            <div>

            </div>
        )
    }

    if (driver == undefined) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="edit-page-wrapper">

            <div className="left">

                <img src={driver.image} alt=""/>

                <UploadButton handleFileChange={handleFileChange} />

            </div>

            <div className="right">

                <div className="info-container">

                    <CustomInput placeholder="ФИО" value={driver.name} setValue={setName} />

                    <CustomInput placeholder="Паспорт" value={driver.passport_number} setValue={setPhone_number} />

                    <CustomInput placeholder="Адрес" value={driver.address} setValue={setPassport_number} />

                    <CustomInput placeholder="Почта" value={driver.email} setValue={setAddress} />

                    <CustomInput placeholder="Дата рождения" value={driver.birth_date} setValue={setEmail} />

                    <CustomInput placeholder="Телефон " value={driver.phone_number} setValue={setBirth_date} />

                    <div className="buttons-container">

                        <CustomButton bg={variables.green} onClick={saveDriver}>
                            Сохранить
                        </CustomButton>

                        <CustomButton bg={variables.red} onClick={deleteDriver}>
                            Удалить
                        </CustomButton>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default DriverEditPage