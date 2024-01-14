import "./DriversFilters.sass"
import SearchBar from "../../../components/SearchBar/SearchBar";
import {useDrivers} from "../../../hooks/drivers/useDrivers.ts";
import {useAuth} from "../../../hooks/users/useAuth";
import {variables} from "../../../utils/consts";
import LinkButton from "../../../components/LinkButton/LinkButton";
import CustomButton from "../../../components/CustomButton/CustomButton";
import {useLocation} from "react-router-dom";

const DriversFilters = ({refetch}) => {

    const {is_moderator} = useAuth()

    const {query, setQuery} = useDrivers()

    const location = useLocation();
    const handleSubmit = (e) => {
        e.preventDefault()
        refetch()
    }

    return (
        <div className="drivers-filters">

            <h2>Поиск водителей</h2>

            <div className="right-container">
                {is_moderator && (location.pathname === '/drivers_table')&&
                    <LinkButton to="/drivers/create" bg={variables.primary} >
                        Добавить водителя
                    </LinkButton>
                }




                <form className="search-form" onSubmit={handleSubmit}>

                    <SearchBar query={query} setQuery={setQuery} placeholder={"Поиск..."} />

                    <CustomButton bg={variables.primary}>
                        Применить
                    </CustomButton>

                </form>
            </div>


        </div>
    )
}

export default DriversFilters