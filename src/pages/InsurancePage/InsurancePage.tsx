import {useEffect} from "react";
import {useInsurance} from "../../hooks/insurances/useInsurance.ts";
import {useNavigate, useParams} from "react-router-dom"
import DriverCard from "../../components/DriverCard/DriverCard.tsx";
import "./InsurancePage.sass"
import {useAuth} from "../../hooks/users/useAuth";
import {STATUSES, variables} from "../../utils/consts";
import {ru} from "../../utils/momentLocalization";
import moment from "moment";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";

const InsurancePage = () => {

    const {is_moderator} = useAuth()

    const navigate = useNavigate()

    const { id } = useParams<{id: string}>();

    const {insurance, name, setName, fetchInsurance, saveInsurance, sendInsurance, deleteInsurance, setInsurance} = useInsurance()

    useEffect(() => {
        id && fetchInsurance(id)
        
        return () => {
            setInsurance(undefined)
            setName("")
        };
    }, [])

    if (id == undefined || insurance == undefined)
    {
        return (
            <div className="insurance-page-wrapper">
                <h1>Пусто</h1>
            </div>
        )
    }

    const onSendInsurance = async() => {
        await sendInsurance()
        navigate("/insurances")
    }

    const onDeleteInsurance = async () => {
        await deleteInsurance()
        navigate("/drivers")
    }

    const cards = insurance.drivers.map(driver  => (
        <DriverCard driver={driver} key={driver.id} />
    ))


    const ButtonsContainer = () => {
        return (
            <div className="buttons-wrapper">

                <CustomButton onClick={saveInsurance} bg={variables.green}>Сохранить</CustomButton>

                <CustomButton onClick={onSendInsurance} bg={variables.primary}>Отправить</CustomButton>

                <CustomButton onClick={onDeleteInsurance} bg={variables.red}>Удалить</CustomButton>

            </div>
        )
    }

    const is_draft = insurance.status == 1

    const completed = [3, 4].includes(insurance.status)
    console.log(insurance.premium_amount)
    const premium_amount = () => {


        return insurance.premium_amount
    }

    return (
        <div className="insurance-page-wrapper">

            <div className="insurance-drivers-wrapper">
                <div className="top">
                    <h3>{is_draft ? "Новая страховка" : insurance.name}</h3>
                </div>

                <div className="insurance-info-container">
                    <span>Статус: {STATUSES.find(status => status.id == insurance.status).name}</span>
                    <span>Дата создания: {moment(insurance.date_created).locale(ru()).format("D MMMM HH:mm")}</span>
                    {[2, 3, 4].includes(insurance.status) && <span>Дата формирования: {moment(insurance.date_formation).locale(ru()).format("D MMMM HH:mm")}</span>}
                    {completed && <span>Дата завершения: {moment(insurance.date_complete).locale(ru()).format("D MMMM HH:mm")}</span> }
                    {is_moderator && <span>Пользователь: {insurance.employer.name}</span> }
                    {completed && <span>Сумма: {premium_amount()}</span>}
                </div>

                {is_draft &&
                    <div className="inputs-container">

                    <CustomInput placeholder={"Номер страховки"} value={name} setValue={setName}/>

                    </div>
                }


                <div className="bottom">

                    {cards}

                </div>
            </div>

            {!is_moderator && is_draft && <ButtonsContainer />}

        </div>
    )
}

export default InsurancePage