import "../../../../fix/src/components/DriverCard/DriverCard.sass"
import {Driver} from "../../../../fix/src/utils/types";
import {Link} from "react-router-dom";
import {useAuth} from "../../../../fix/src/hooks/users/useAuth";
import {useInsurance} from "../../../../fix/src/hooks/insurances/useInsurance.ts";
import CustomButton from "../../../../fix/src/components/CustomButton/CustomButton";
import {variables} from "../../../../fix/src/utils/consts";
import {useNavigate} from "react-router-dom"
import {useDrivers} from "../../../../fix/src/hooks/drivers/useDrivers";

const DriverCard = ({ driver }: {driver:Driver}) => {

    const navigate = useNavigate()

    const {is_authenticated} = useAuth()

    const {searchDrivers} = useDrivers()

    const {insurance, is_draft, addDriverToInsurance, deleteDriverFromInsurance} = useInsurance()

    const handleAddDriver = async (e) => {
        e.preventDefault()
        await addDriverToInsurance(driver)
        await searchDrivers()
    }

    const handleDeleteDriver = async (e) => {
        e.preventDefault()
        await deleteDriverFromInsurance(driver, navigate)
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
                    
                    {is_authenticated && !is_chosen && location.pathname.includes("drivers") &&
                        <CustomButton onClick={handleAddDriver} bg={variables.green}>Добавить</CustomButton>
                    }

                    {is_authenticated && is_chosen  && location.pathname.includes("drivers") &&
                        <CustomButton onClick={handleDeleteDriver} bg={variables.red} >Удалить</CustomButton>
                    }

                    {is_authenticated  && is_draft && location.pathname.includes("insurances") &&
                        <CustomButton onClick={handleDeleteDriver} bg={variables.red}>Удалить</CustomButton>
                    }

                </div>

            </div>

        </div>
    )
}

export default DriverCard;