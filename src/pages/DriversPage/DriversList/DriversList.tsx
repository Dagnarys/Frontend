import "./DriversList.sass"
import DriverCard from "../../../../../homework/src/components/DriverCard/DriverCard.tsx";
import {useDrivers} from "../../../hooks/drivers/useDrivers.ts";
import {useQuery} from "react-query";
import DriversFilters from "../DriversFilters/DriversFilters";

const DriversList = () => {

    const {searchDrivers} = useDrivers()

    const { isLoading, data, refetch } = useQuery(
        ["drivers"],
        () => searchDrivers(),
        {
            keepPreviousData: true,
        }
    )

    if (isLoading) {
        return (
            <div>

            </div>
        )
    }

    const cards = data.map(driver  => (
        <DriverCard driver={driver} key={driver.id}/>
    ))

    return (
        <div className="drivers-list-wrapper">

            <DriversFilters refetch={refetch} />

            <div className="drivers-list">
                { cards }
            </div>

        </div>
    )
}

export default DriversList;