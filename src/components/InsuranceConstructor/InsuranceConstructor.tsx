import "./InsuranceConstructor.sass"
import {useInsurance} from "../../hooks/insurances/useInsurance.ts";
import {Link} from "react-router-dom";

const InsuranceConstructor = () => {

    const {insurance_id} = useInsurance()

    if (insurance_id == undefined) {
        return (
            <div className="constructor-container disabled">
                <span className="title">Новая страховка</span>
            </div>
        )
    }

    return (
        <Link to={`/insurances/${insurance_id}`} className="constructor-container">
            <span className="title">Новая страховка</span>
        </Link>
    )
}

export default InsuranceConstructor