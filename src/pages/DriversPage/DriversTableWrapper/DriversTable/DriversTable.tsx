import "./DriversTable.sass"
import CustomTable from "../../../../components/CustomTable/CustomTable";
import {useCustomTable} from "../../../../hooks/other/useCustomTable";
import {useNavigate } from "react-router-dom";
import DriversFilters from "../../DriversFilters/DriversFilters";

const DriversTable = ({isLoading, data, isSuccess, refetch}) => {

    const columns = [
        {
            Header: "№",
            accessor: "id"
        },
        {
            Header: "ФИО",
            accessor: "name",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Паспорт",
            accessor: "passport_number",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Адрес",
            accessor: "address",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Почта",
            accessor: "email",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Дата рождения",
            accessor: "birth_date",
            Cell: ({ value }) => { return value }
        }
    ]

    const navigate = useNavigate()

    const {
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow
    } = useCustomTable(
        columns,
        isSuccess,
        data
    )

    const openEditDriverPage = (driver_id) => {
        navigate(`/drivers/${driver_id}/edit`)
    }

    return (
        <div>

            <CustomTable
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                page={page}
                prepareRow={prepareRow}
                isLoading={isLoading}
                onClick={openEditDriverPage}
            >
                <DriversFilters refetch={refetch} />
            </CustomTable>

        </div>

    )
}

export default DriversTable