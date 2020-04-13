import React, {createContext, useEffect, useState} from "react";
import axios from "axios";

const Store = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [dataPreparing, setDataPreparing] = useState(true);
    const [color, setColor] = useState(1)
    const [pokeState, setPokeState] = useState({});

    //TODO: decide what to do with loading

    useEffect(() => {
        setDataPreparing(true)
        axios
            .get(`https://pokeapi.co/api/v2/pokemon-color/${color}/`)
            .then((response) => {
                setLoading(false);
                setError("");
                return response.data;
            })
            .then((data) => {
                pokeDataFetch(data);
            })
            .catch(() => {
                setLoading(false);
                setPokeState("");
                setError(true);
            });
    }, [color]);

    //TODO: refactor blocks of code as functions
    const pokeDataFetch = (data) => {
        const responsesSpecies = [];

        data.pokemon_species.map((currentElement, index) => {
            responsesSpecies[index] = axios
                .get(currentElement.url)
                .then((response) => {
                    const responsesPokemon = [];
                    response.data.varieties.map((currEl, ind) => {
                        responsesPokemon[ind] = axios
                            .get(currEl.pokemon.url)
                            .then((response) => {
                                const name = response.data.name;
                                const id = response.data.id;
                                const baseExperience = response.data.base_experience;
                                const types = response.data.types.map(
                                    (property) => property.type.name
                                );
                                const abilities = response.data.abilities.map(
                                    (property) => property.ability.name
                                );
                                return {name, id, baseExperience, types, abilities};
                            });
                    });

                    return Promise.all(responsesPokemon).then((data) => {
                        return data;
                    });
                })

                .catch(() => {
                    setError(true);
                });
        });

        Promise.all(responsesSpecies).then((data) => {
           setPokeState(data.flat());
           setDataPreparing(false)
        });
    };

    return (
        <colorContext.Provider value={[color, setColor]}>
                <stateContext.Provider value={[pokeState, error, dataPreparing]}>
                        {children}
                </stateContext.Provider>
        </colorContext.Provider>
    );
};

export const stateContext = createContext();
export const colorContext = createContext();

export default Store;
