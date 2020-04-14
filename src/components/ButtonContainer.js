import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import "../styles/ButtonContainer.css";
import { colorContext } from "./Store";
import { colors } from "../colors.js";
import {Col, Row} from "react-bootstrap";

function ButtonContainer(props) {
  const [color, setColor] = useContext(colorContext);

  const buttonList = Object.values(colors).map((currentElement, index) => {
    const checkIfWhite = () =>
      currentElement.color === "#faf4ee" ? "#626466" : "#fff";
    return (
      <Button
        variant="primary"
        size="lg"
        key={index}
        style={{
          backgroundColor: currentElement.color,
          borderColor: currentElement.color,
          borderRadius: 0,
          color: checkIfWhite(),
        }}
        onClick={() => setColor(currentElement.id)}
      >
        {currentElement.name}{" "}
      </Button>
    );
  });

  return (
    <Row>
      <Col className="buttonContainer">
        <h4>Choose color of Pokemons you want to see:</h4>
        {buttonList}
      </Col>
    </Row>
  );
}

export default ButtonContainer;
