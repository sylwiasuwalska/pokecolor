import React, {useContext} from "react";
import Button from "react-bootstrap/Button";
import "../ButtonContainer.css";
import {colorContext} from "./Store";

function ButtonContainer(props) {
  const [color, setColor] = useContext(colorContext)
  const colors = [
    {
      id: 1,
      name: "black",
    },
    {
      id: 2,
      name: "blue",
    },
    {
      id: 3,
      name: "brown",
    },
    {
      id: 4,
      name: "grey",
    },
    {
      id: 5,
      name: "green",
    },
    {
      id: 6,
      name: "pink",
    },
    {
      id: 7,
      name: "purple",
    },
    {
      id: 8,
      name: "red",
    },
    {
      id: 9,
      name: "white",
    },
    {
      id: 10,
      name: "yellow",
    },
  ];

  const buttonList = Object.values(colors).map((currentElement, index) => {
    return (
      <Button
        variant="primary"
        size="lg"
        key={index}
        style={{ background: currentElement.name }}
        onClick={()=> setColor(currentElement.id)}
      >
        {currentElement.name}{" "}
      </Button>
    );
  });

  return (
    <div>
      <h3>Choose color of Pokemons you want to see:</h3>
      <div>{buttonList}</div>

    </div>
  );
}

export default ButtonContainer;
