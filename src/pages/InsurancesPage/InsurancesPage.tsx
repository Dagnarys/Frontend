import InsurancesTable from "./InsurancesTable/InsurancesTable.tsx";
import {useAuth} from "../../hooks/users/useAuth";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom"

const InsurancesPage = () => {

    const {is_authenticated} = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/drivers")
        }
    }, [])

    return (
        <div>
            <InsurancesTable />
        </div>
    )
}

export default InsurancesPage;

