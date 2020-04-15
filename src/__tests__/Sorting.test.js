import React from "react";
import { render, cleanup, waitForElement, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Sorting from "../components/Sorting";

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

const sortingKeys = [
  {
    id: "name",
    name: "name",
  },
  {
    id: "baseExperience",
    name: "base experience",
  }]

const sortDirection = "ascending"
const fieldToSort = "name"

test('check if renders first button', async () => {
  const { getByText } = render(<Sorting data setData/>);
  const button = await waitForElement(() => getByText("sort by name"));
  expect(button).toBeInTheDocument();
});

test('check if renders last button', async () => {
  const { getByText } = render(<Sorting data setData/>);
  const button = await waitForElement(() => getByText("sort by base type"));
  expect(button).toBeInTheDocument();
});

test('check if click on button calls function', async (done) => {
  const handleClick = () => {
    done();
  }
  const { getByText } = render(<Sorting data={data} setData={handleClick} />);
  const button = await waitForElement(() => getByText("sort by name"));
  fireEvent.click(button)
});
