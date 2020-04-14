import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Store from "./Store";
import Header from "./Header";
import PokeContainer from "./PokeContainer";

import "../styles/App.css";
import ButtonContainer from "./ButtonContainer";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Store>
      <Container className="App">
          <Header />
          <ButtonContainer />
          <PokeContainer />
      </Container>
    </Store>
  );
}

export default App;
