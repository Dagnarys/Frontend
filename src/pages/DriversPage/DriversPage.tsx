import "./DriversPage.sass"
import {useAuth} from "../../hooks/users/useAuth";
import DriversList from "./DriversList/DriversList";
import DriversTableWrapper from "./DriversTableWrapper/DriversTableWrapper";

const DriversPage = () => {

    const {is_moderator} = useAuth()

    return (
        <div className="drivers-wrapper">

            <DriversList />
            {is_moderator && <DriversTableWrapper />}

        </div>
    )
}

export default DriversPage;