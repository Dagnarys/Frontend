import "./Search.sass"
import React, { FormEvent, useState} from "react";
import {FaSearch} from "react-icons/fa";
interface SearchBarMockProps {
    onSearch: (searchTerm: string) => void;
}

const SearchBarMock: React.FC<SearchBarMockProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        onSearch(searchTerm);
        console.log(searchTerm);
    };

    return (
        <form className="search-bar-wrapper" onSubmit={handleSearch}>

            <input
                type="text"
                placeholder="Поиск..."
                name="name"
                autoComplete="off"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button type="submit">
                <FaSearch className={"search-icon"} />
            </button>

        </form>
    );
};

export default SearchBarMock;