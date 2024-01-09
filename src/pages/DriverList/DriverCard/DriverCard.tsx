import "./DriverCard.sass"
import {Driver} from "../../../Types.ts";
import {Link} from "react-router-dom";
import mockImage from "/src/assets/MockImage.png"

const DriverCard = ({ driver, isMock }: {driver:Driver, isMock:boolean }) => {

    const img = `http://127.0.0.1:8000/api/drivers/${driver.id}/image/`

    return (
        <div className="card-wrapper">
            <Link to={`/drivers/${driver.id}/`} className="custom-link">
            <div className="preview">
                <img src={isMock ? mockImage : img}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {driver.full_name} </h3>

                </div>

            </div>
            </Link>

        </div>
    )
}

export default DriverCard;