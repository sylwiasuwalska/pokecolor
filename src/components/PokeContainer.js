import React, {useContext, useEffect, useState} from "react";
import {colorContext, stateContext} from "./Store";
import Pagination from "./Pagination";
import Filtering from "./Filtering";
import "../PokeContainer.css";
import loader from "../ring.svg";
import {colors} from "../colors.js";

function PokeContainer(props) {
    const [state, error, dataPreparing] = useContext(stateContext);
    const [color, setColor] = useContext(colorContext);
    const [pokeData, setPokeData] = useState(state);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);

    const [filterWord, setFilterWord] = useState();

    //filtering
    const filterList = (array) => {
        let filteredData = Object.values(array);
        filteredData = filteredData.filter((data) => {
            return (
                data.id.toString().search(filterWord.toLowerCase()) !== -1 ||
                data.name.toLowerCase().search(filterWord.toLowerCase()) !== -1  ||
                data.baseExperience.toString().search(filterWord.toLowerCase()) !== -1 ||
                data.types.toString().search(filterWord.toLowerCase()) !== -1 ||
                data.abilities.toString().search(filterWord.toLowerCase()) !== -1);
        });
        setPokeData(filteredData);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // rendering data
    const listItems = (array) =>
        array.map((element, index) => <li key={index}>{element}</li>);

    const renderTableData = () => {
        //pagination
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = pokeData.slice(indexOfFirstItem, indexOfLastItem);

        const colorElement = colors.find((element) => {
            if (color === element.id) return element.color;
        });

        const checkIfWhite = () => (colorElement.color === "#faf4ee") ? ("#626466") : ("#fff")

        return Object.values(currentItems).map((data) => {
            const {name, id, baseExperience, types, abilities} = data;

            return (
                <div key={`row ${id}`} className="pokeElement">
                    <div className="flip-card">
                        <div className="flip-card-inner">
                            <div
                                className="flip-card-front"
                                style={{backgroundColor: colorElement.color}}
                            >
                                <img
                                    src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png `}
                                    width="200px"
                                    height="200px"
                                    alt="pokemon_image"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src =
                                            "https://www.freeiconspng.com/uploads/no-image-icon-15.png";
                                    }}
                                />
                                <h2 style={{color: checkIfWhite()}}>{name}</h2>
                            </div>
                            <div className="flip-card-back">
                                <h2>{baseExperience}</h2>
                                <p>base experience</p>
                                <p>Pokedex ID: {id}</p>
                                <div className="type-abilities">
                                    <p>Abilities: {listItems(abilities)}</p>
                                </div>
                                <div className="type-abilities">
                                    <p>Types: {listItems(types)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    };

    useEffect(() => {
        filterList(state);
    }, [filterWord]);

    useEffect(() => {
        if (state[0]) {
            setPokeData(state);
            setCurrentPage(1);

        }
    }, [state]);

    //preventing from render when server doesn't respond
    if (error) {
        return (
            <div>
                <p>Retrieving data was unsuccessful. Check internet connection.</p>
            </div>
        );
    }


    //preventing from render when data isn't prepared yet
    if (dataPreparing) {
        return (
            <div className="dataPreparing">
                <img src={loader} alt="ball" height="100px" width="100px"/>
                <p>Preparing your data. Please wait.</p>
            </div>
        );
    }

    return (
        <div>
            <Filtering
                color={color}
                setFilterWord={setFilterWord}
                setCurrentPage={setCurrentPage}
            />
            <Pagination
                rowsPerPage={itemsPerPage}
                totalRows={pokeData.length}
                paginate={paginate}
                currentPage={currentPage}
            />
            <div>{renderTableData()}</div>
        </div>
    );
}

export default PokeContainer;
