import React, {useContext, useEffect, useState} from 'react';
import Flippy, {FrontSide, BackSide} from 'react-flippy';
import {dataPreparingContext, errorContext, stateContext} from "./Store";

function PokeContainer(props) {
    const state = useContext(stateContext);
    const error = useContext(errorContext);
    const dataPreparing = useContext(dataPreparingContext);
    const [pokeData, setPokeData] = useState(state);

    const renderTableData = () => {
        return Object.values(state).map((data) => {
            console.log(state);
            const {
                name,
                id,
                baseExperience,
                types,
                abilities,
            } = data;
            console.log(name, id, baseExperience)
            return (
                <div key={`row ${id}`} className="here1">
                    <div key={`${id}.${id}`} className="here2">{id} Sylwia</div>
                    <div key={`${id}.${name}`} className="here3">{name}</div>
                </div>
            )
        });
    };


    useEffect(() => {
        console.log("set state")
            setPokeData(state);

    }, [state]);

    //preventing from render when server doesn't respond
    if (error) {
        return (
            <div>
                <p>Retrieving data was unsuccessful. Check internet connection.</p>
            </div>
        );
    }

    if (pokeData[0]) {
        console.log("here pokedata empty")
        return (
            <div>
                <p>Preparing your data. Please wait.</p>
            </div>
        );
    }

    return (
        <div className="here4">

        </div>

    );
}

export default PokeContainer;