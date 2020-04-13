import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./components/App";

afterEach(cleanup);

test("should take a snapshot of App component", () => {
  const { asFragment } = render(<App />);

  expect(asFragment(<App />)).toMatchSnapshot();
});
