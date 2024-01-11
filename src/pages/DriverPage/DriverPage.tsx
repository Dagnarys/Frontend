import "./DriverPage.sass"
import {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useDriver} from "../../hooks/drivers/useDriver.ts";

const DriverPage = () => {

    const { id } = useParams<{id: string}>();

    const {driver, fetchDriver} = useDriver()

    useEffect(() => {
        id && fetchDriver(id)
    }, [])

    if (driver == undefined) {
        return (
            <div>

            </div>
        )
    }

    const img = `http://127.0.0.1:8000/api/drivers/${id}/image/`

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={img}  alt=""/>

            </div>

            <div className="right">

                <div className="info-container">

                    <h2 className="name">{driver.name}</h2>

                    <br />

                    <span className="description">Паспорт: {driver.passport_number}</span>

                    <br />

                    <span className="foundation_date">Дата рождения: {driver.birth_date}</span>

                    <br />

                    <span className="grp">Адрес: {driver.address} </span>

                    <br />

                    <span className="square">Номер телефона: {driver.phone_number} </span>

                    <br />

                    <span className="climate">Email: {driver.email}</span>

                </div>

            </div>

        </div>
    )
}

export default DriverPage;