import "./DriverList.sass"
import SearchBar from "./Search/Search.tsx";
import {useEffect, useState} from "react";
import DriverCard from "./DriverCard/DriverCard.tsx";
import {DriversMock, requestTime} from "../../Consts.ts";
import {Driver} from "../../Types.ts";

const DriverList = () => {

    const [drivers, setDrivers] = useState<Driver[]>([]);

    const [query, setQuery] = useState<string>("");

    const [isMock, setIsMock] = useState<boolean>(false);
    console.log(drivers)
    const searchDrivers = async () => {

        try {

            const response = await fetch(`http://localhost:8000/api/drivers/search?&full_name=${query}`, {
                method: "GET",

                signal: AbortSignal.timeout(requestTime)
            })
            console.log(response.status);
            if (!response.ok){
                createMock();
                return;
            }

            const responseData = await response.json();

            // Assuming responseData is an object with a "drivers" property
            const drivers: Driver[] = responseData.drivers || [];

            setDrivers(drivers);
            setIsMock(false);
        } catch (e) {
            createMock();
        }
    }

    const createMock = () => {

        setIsMock(true);
        setDrivers(DriversMock)

    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await searchDrivers();
            } catch (error) {
                console.error("Error in fetchData:", error);
            }
        };

        fetchData(); // Call the async function within useEffect

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    const cards = drivers.map(driver  => (
        <DriverCard driver={driver} key={driver.id} isMock={isMock} />
    ))

    return (

        <div className="cards-list-wrapper">

            <div className="top">

                <h2>Поиск водителей</h2>

                <SearchBar query={query} setQuery={setQuery} />

            </div>

            <div className="bottom">

                { cards }

            </div>

        </div>
    )
}

export default DriverList;