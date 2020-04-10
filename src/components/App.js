import React from 'react';
import Store from "./Store";
import PokeContainer from "./PokeContainer";

import '../App.css';

function App() {
    return (
        <Store>
            <div className="App">
                <PokeContainer/>
            </div>
        </Store>
    );
}

export default App;
