import "./Search.sass"
import React, {Dispatch, FormEvent} from "react";
import {FaSearch} from "react-icons/fa";
interface SearchBarProps {
    query: string;
    setQuery: Dispatch<string>;

}
const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery, h }) => {
    const handleChange = (value: string) => {
        setQuery(value);


    };


    return (
        <form className="search-bar-wrapper"  method="GET" >

            <input
                type="text"
                placeholder="Поиск..."
                name="full_name"

                value={query}
                onChange={(e) => handleChange(e.target.value)}
            />

            <button type="submit" >
                <FaSearch className={"search-icon"}/>
            </button>

        </form>
    )
}

export default SearchBar;