import React, {createContext, useEffect, useState} from "react";
import axios from "axios";

const Store = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [dataPreparing, setDataPreparing] = useState(true);

    const [pokeState, setPokeState] = useState({});

    useEffect(() => {
        axios
            .get("https://pokeapi.co/api/v2/pokemon-color/1/")
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
        const responsesPokemon = [];
        const pokeData = [];
        const allPromises = [];

        for (let i = 0; i <= data.pokemon_species.length - 1; i++) {
            responsesSpecies[i] = axios
                .get(data.pokemon_species[i].url)
                .then((response) => {
                    for (let j = 0; j <= response.data.varieties.length - 1; j++) {
                        responsesPokemon[j] = axios
                            .get(response.data.varieties[j].pokemon.url)
                            .then((response) => {
                                //console.log(response.data)
                                const name = response.data.name;
                                const id = response.data.id;
                                const baseExperience = response.data.base_experience;
                                const types = response.data.types.map(
                                    (property) => property.type.name
                                );
                                const abilities = response.data.abilities.map(
                                    (property) => property.ability.name
                                );
                                pokeData.push({name, id, baseExperience, types, abilities});
                                console.log("fetch" + i + " " + j);
                            });
                    }
                    console.log("fetch" + i + " " );
                })
                .catch(() => {
                    setError(true);
                });
        }

        Promise.all(responsesSpecies).then(() => {
            setPokeState(pokeData);
            setDataPreparing(false);
            console.log("allPromises");
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
