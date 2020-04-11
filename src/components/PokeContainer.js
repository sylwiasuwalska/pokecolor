import React, { useContext, useEffect, useState } from "react";
import { dataPreparingContext, errorContext, stateContext } from "./Store";
import "../PokeContainer.css";
import loader from "../ring.svg";

function PokeContainer(props) {
  const state = useContext(stateContext);
  const error = useContext(errorContext);
  const dataPreparing = useContext(dataPreparingContext);

  const listItems = array => array.map((element) => <li>{element}</li>)
console.log(state)
  const renderTableData = () => {
    return Object.values(state).map((data) => {
      const { name, id, baseExperience, types, abilities } = data;

      return (
        <div key={`row ${id}`} className="pokeElement">
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img
                  src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png `}
                  width="200px"
                  height="200px"
                  alt="pokemon_image"
                />
                <h2>{name}</h2>
              </div>
              <div className="flip-card-back">
                <h2>{baseExperience}</h2>
                <p>base experience</p>
                <p>ID: {id}</p>
                <div className="type-abilities"><p>Abilities: {listItems(abilities)}</p></div>
                <div className="type-abilities"><p>Types: {listItems(types)}</p></div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  //preventing from render when server doesn't respond
  if (error) {
    return (
      <div>
        <p>Retrieving data was unsuccessful. Check internet connection.</p>
      </div>
    );
  }

  if (dataPreparing) {
    return (
      <div>
        <img src={loader} alt="ball" height="100px" width="100px"/>
        <p>Preparing your data. Please wait.</p>
      </div>
    );
  }

  return <div className="">{renderTableData()}</div>;
}

export default PokeContainer;
