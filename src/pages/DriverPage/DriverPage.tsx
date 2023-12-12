import "./DriverPage.sass"
import {Dispatch, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {DriversMock, requestTime} from "../../Consts.ts";
import {Driver} from "../../Types.ts";
import mockImage from "/src/assets/MockImage.png"

const DriverPage = ({ selectedDriver, setSelectedDriver }: { selectedDriver:Driver | undefined, setSelectedDriver: Dispatch<Driver| undefined>}) => {

    const { id } = useParams<{id: string}>();

    const [isMock, setIsMock] = useState<boolean>(false);

    useEffect(() => {
        fetchData()
    }, [])

    if (id == undefined){
        return;
    }

    const fetchData = async () => {

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/drivers/${id}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            });

            if (!response.ok)
            {
                CreateMock()
                return;
            }

            const driver: Driver = await response.json()

            setSelectedDriver(driver)

            setIsMock(false)
        } catch
        {
            CreateMock()
        }

    };

    const CreateMock = () => {
        setSelectedDriver(DriversMock.find((service:Driver) => service?.id == parseInt(id)))
        setIsMock(true)
    }

    const img = `http://127.0.0.1:8000/api/drivers/${id}/image/`

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={isMock ? mockImage : img}  alt=""/>

            </div>

            <div className="right">

                <div className="info-container">

                    <h2 className="name">{selectedDriver?.full_name}</h2>

                    <br />

                    <span className="passport_number">Паспорт: {selectedDriver?.passport_number}</span>

                    <br />

                    <span className="address"> Адрес: {selectedDriver?.address}</span>

                    <br />

                    <span className="phone_number">Телефон: {selectedDriver?.phone_number}</span>

                    <br />

                    <span className="email">E-mail: {selectedDriver?.email}</span>

                    <br />

                    <span className="driver_license_number">Водительское удостоверение: {selectedDriver?.driver_license_number}</span>

                    <br />

                    <span className="issue_date">Дата получения ВУ: {selectedDriver?.issue_date}</span>

                    <br />

                    <span className="expiration_date">Срок действия ВУ: {selectedDriver?.expiration_date}</span>

                    <br />



                </div>

            </div>

        </div>
    )
}

export default DriverPage;