import "./Search.sass"
import {Dispatch} from "react";
import {FaSearch} from "react-icons/fa";

const SearchBar = ({ query, setQuery }: {query:string, setQuery: Dispatch<string>}) => {



    const handleChange = (value: string) => {
        setQuery(value)
    }


    return (
        <form className="search-bar-wrapper" action="/api/drivers/search" method="GET" onSubmit={(e) => e.preventDefault()} >

            <input
                type="text"
                placeholder="Поиск..."
                name="full_name"
                autoComplete="off"
                value={query}
                onChange={(e) => handleChange(e.target.value)}
            />

            <button type="submit">
                <FaSearch className={"search-icon"}/>
            </button>

        </form>
    )
}

export default SearchBar;