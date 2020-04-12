import React from "react";
import "../Filtering.css";
import {colors} from "../colors.js"

function Filtering({color, setFilterWord, setCurrentPage}) {

    const colorName = colors.find((element) => {
        if (color === element.id) return element.name;
    });
    console.log(colorName.name)
    return (
        <div className="filtering">
            <p>Filter info about {colorName.name} Pokemons here: </p>
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
