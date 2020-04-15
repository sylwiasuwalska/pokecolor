import React from "react";
import { render, cleanup, waitForElement, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Filtering from "../components/Filtering";

afterEach(cleanup);

const data = [
    {
        name: "Clee",
        id: 16,
        baseExperience: 199,
        abilities: ["hustle"],
        types: ["fairy"]
    },
    {
        name: "Jiggy",
        id: 86,
        baseExperience: 109,
        abilities: ["gluttony"],
        types: ["normal"]
    },
]

test('check if renders input', async () => {
    const { getByPlaceholderText } = render(<Filtering color={1} setFilterWord setCurrentPage/>);
    const input = await waitForElement(() => getByPlaceholderText("Filter info about black Pokemons here..."));
    expect(input).toBeInTheDocument();
});



test('check if functions setFilterWord and setCurrentPage are called on change', async (done) => {
    const handleChange = jest.fn(()=>done())

    const { getByPlaceholderText } = render(<Filtering color={1} setFilterWord={handleChange} setCurrentPage={handleChange}/>);
    const input = await waitForElement(() => getByPlaceholderText("Filter info about black Pokemons here..."));
    fireEvent.change(input, { target: { value: 'a' } })
    expect(handleChange).toHaveBeenCalledTimes(2)
});

