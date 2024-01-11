import "./DriverCard.sass"
import {Driver} from "../../utils/types";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/users/useAuth";
import {useInsurance} from "../../hooks/insurances/useInsurance.ts";
import CustomButton from "../CustomButton/CustomButton";
import {variables} from "../../utils/consts";

const DriverCard = ({ driver }: {driver:Driver}) => {
    
    const {is_authenticated, is_moderator} = useAuth()

    const {insurance, is_draft, addDriverToInsurance, deleteDriverFromInsurance} = useInsurance()

    const handleAddDriver = (e) => {
        e.preventDefault()
        addDriverToInsurance(driver)
    }

    const handleDeleteDriver = (e) => {
        deleteDriverFromInsurance(driver)
    }

    const is_chosen = insurance?.drivers.find(g => g.id == driver.id)

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={driver.image}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {driver.name} </h3>

                </div>

                <div className="content-bottom">

                    <Link to={`/drivers/${driver.id}`}>
                        <CustomButton bg={variables.primary}>
                            Подробнее
                        </CustomButton>
                    </Link>
                    
                    {is_authenticated && !is_chosen && !is_moderator && location.pathname.includes("drivers") &&
                        <CustomButton onClick={handleAddDriver} bg={variables.green}>Добавить</CustomButton>
                    }

                    {is_authenticated && is_chosen && location.pathname.includes("drivers") &&
                        <CustomButton onClick={handleDeleteDriver} bg={variables.red} >Удалить</CustomButton>
                    }

                    {is_authenticated && !is_moderator && is_draft && location.pathname.includes("insurances") &&
                        <CustomButton onClick={handleDeleteDriver} bg={variables.red}>Удалить</CustomButton>
                    }

                </div>

            </div>

        </div>
    )
}

export default DriverCard;