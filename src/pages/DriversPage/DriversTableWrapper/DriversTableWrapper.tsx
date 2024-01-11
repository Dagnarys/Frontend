import {useDrivers} from "../../../hooks/drivers/useDrivers.ts";
import {useQuery} from "react-query";
import DriversTable from "./DriversTable/DriversTable.tsx";

const DriversTableWrapper = () => {

    const {searchDrivers} = useDrivers()

    const { isLoading, data, isSuccess, refetch } = useQuery(
        ["drivers"],
        () => searchDrivers(),
        {
            keepPreviousData: true,
        }
    )

    if (data == undefined) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div>
            <DriversTable isLoading={isLoading} data={data} isSuccess={isSuccess} refetch={refetch} />
        </div>
    )
}

export default DriversTableWrapper