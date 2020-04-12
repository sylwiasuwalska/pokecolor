import React from "react";
import "../Filtering.css";

function Filtering({setFilterWord, setCurrentPage}) {
    return (
        <div className="filtering">
            <p>Filter Pokemon's information here: </p>
            <input
                type="text"
                placeholder=""
                onChange={(e) => {
                    setFilterWord(e.target.value);
                    setCurrentPage(1)
                }}
            />
        </div>
    );
}

export default Filtering;
