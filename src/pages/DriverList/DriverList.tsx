import "./DriverList.sass"
import SearchBar from "./Search/Search.tsx";
import {useEffect, useState} from "react";
import DriverCard from "./DriverCard/DriverCard.tsx";
import {DriversMock, requestTime} from "../../Consts.ts";
import {Driver} from "../../Types.ts";
import SearchBarMock from "./Search/SearchMock.tsx";

const DriverList = () => {
    console.log("DriverList rendered");
    const [drivers, setDrivers] = useState<Driver[]>([]);

    const [query, setQuery] = useState<string>("");

    const [isMock, setIsMock] = useState<boolean>(false);
    
    const searchDrivers = async () => {

        try {
            const response = await fetch(`/api/drivers/search/?&full_name=${query}`, {
                method: "GET",

                signal: new AbortController().signal,
            })

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
        setDrivers(DriversMock);

    }

    useEffect(() => {

        const fetchData = async () => {
            try {
                await searchDrivers();

            } catch (error) {
                console.error("Error in fetchData:", error);
            }
        };

        fetchData();

        // Cleanup function
        return () => {

            const controller = new AbortController();
            controller.abort();
        };
    }, [query]);

    useEffect(() => {
        // Additional logic if needed when isMock changes
    }, [isMock]);

    const searchDriversMock = (searchTerm: string) => {
        const searchTermLowerCase = searchTerm.toLowerCase();
        const filteredDrivers = DriversMock.filter((driver) =>
            driver.full_name.toLowerCase().includes(searchTermLowerCase)
        );
        setDrivers(filteredDrivers);
    };


    const cards = drivers.map(driver  => (
        <DriverCard driver={driver} key={driver.id} isMock={isMock} />
    ))
    return (

        <div className="cards-list-wrapper">

            <div className="top">

                <h2>Поиск водителей</h2>
                {isMock ? <SearchBarMock onSearch={searchDriversMock}/> : <SearchBar query={query} setQuery={setQuery}  />}



            </div>

            <div className="bottom">

                { cards }

            </div>

        </div>
    )
}

export default DriverList;