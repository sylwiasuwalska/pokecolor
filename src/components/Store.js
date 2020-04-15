import React, {createContext, useEffect, useState} from "react";
import axios from "axios";

const Store = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [dataPreparing, setDataPreparing] = useState(true);
    const [color, setColor] = useState(6);
    const [pokeState, setPokeState] = useState({});

    useEffect(() => {
        setDataPreparing(true);
        axios
            .get(`https://pokeapi.co/api/v2/pokemon-color/${color}/`)
            .then((response) => {
                setLoading(false);
                setError("");
                pokeDataFetch(response.data);
            })
            .catch((err) => {
                setLoading(false);
                setPokeState("");
                setError(true);
            });
    }, [color]);

    const pokeDataFetch = (data) => {
        const responsesSpecies = data.pokemon_species.map(
            (currentElement, index) => {
                return axios
                    .get(currentElement.url)
                    .then((response) => {
                        const responsesPokemon = response.data.varieties.map(
                            (currEl, ind) => {
                                return axios.get(currEl.pokemon.url).then((response) => {
                                    return setAsPoke(response.data);
                                });
                            }
                        );
                        return Promise.all(responsesPokemon);
                    })
                    .catch(() => {
                        setError(true);
                    });
            }
        );

        Promise.all(responsesSpecies).then((data) => {
            setPokeState(data.flat());
            setDataPreparing(false);
        });
    };

    const setAsPoke = (data) => {
        const name = data.name;
        const id = data.id;
        const baseExperience = data.base_experience;
        const types = data.types.map((property) => property.type.name);
        const abilities = data.abilities.map((property) => property.ability.name);
        return {name, id, baseExperience, types, abilities};
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
