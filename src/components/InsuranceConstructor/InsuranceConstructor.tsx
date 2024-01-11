import "./InsuranceConstructor.sass"
import {useInsurance} from "../../hooks/insurances/useInsurance.ts";
import {Link} from "react-router-dom";

const InsuranceConstructor = () => {

    const {insurance} = useInsurance()

    if (insurance == undefined) {
        return (
            <div className="constructor-container disabled">
                <span className="title">Новая страховка</span>
            </div>
        )
    }

    return (
        <Link to={`/insurances/${insurance.id}`} className="constructor-container">
            <span className="title">Новая страховка</span>
            {insurance.drivers.length > 0 && <span className="badge">{insurance.drivers.length}</span>}
        </Link>
    )
}

export default InsuranceConstructor