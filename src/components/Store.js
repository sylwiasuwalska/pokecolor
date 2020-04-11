import React, {createContext, useEffect, useState} from "react";
import axios from "axios";

const Store = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [dataPreparing, setDataPreparing] = useState(true);

    const [pokeState, setPokeState] = useState({});

    useEffect(() => {
        axios
            .get("https://pokeapi.co/api/v2/pokemon-color/6/")
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
    }, []);

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
        <errorContext.Provider value={error}>
            <dataPreparingContext.Provider value={dataPreparing}>
                <stateContext.Provider value={pokeState}>
                    <loadingContext.Provider value={loading}>
                        {children}
                    </loadingContext.Provider>
                </stateContext.Provider>
            </dataPreparingContext.Provider>
        </errorContext.Provider>
    );
};

export const stateContext = createContext();
export const loadingContext = createContext();
export const errorContext = createContext();
export const dataPreparingContext = createContext();
export default Store;
