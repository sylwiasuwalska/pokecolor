import React, {Fragment} from "react";
import {Col, Form} from "react-bootstrap";
import "../Filtering.css";
import { colors } from "../colors.js";

function Filtering({ color, setFilterWord, setCurrentPage }) {
  const colorName = colors.find((element) => {
    if (color === element.id) return element.name;
  });

  return (
    <Col sm={12} md={6} className="filtering">
      <input
        type="text"
        placeholder={`Filter info about ${colorName.name} Pokemons here...`}
        onChange={(e) => {
          setFilterWord(e.target.value);
          setCurrentPage(1);
        }}
      />
    </Col>
  );
}

export default Filtering;
