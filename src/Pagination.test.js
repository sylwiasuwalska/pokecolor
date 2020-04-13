import React from "react";
import { render, cleanup, waitForElement, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from "./components/Pagination";

afterEach(cleanup);

test('getPageIndicator returns value "active" at least once', () => {
  const getPageIndicator = jest.fn(() => "active");
  getPageIndicator();
  expect(getPageIndicator).toHaveReturned();
});

test('check if renders correct amount of page indicators', async () => {
  const { getByText } = render(<Pagination rowsPerPage={12} totalRows={25} loadCurrentPage currentPage={1} />);
  const page = await waitForElement(() => getByText("3"));
  expect(page).toBeInTheDocument();
});

test('check if click on page indicator changes page', async (done) => {
  const handleClick = () => {
    done();
  }
  const { getByText } = render(<Pagination rowsPerPage={12} totalRows={25} loadCurrentPage={handleClick} currentPage={1} />);
  const page = await waitForElement(() => getByText("3"));
  fireEvent.click(page)
});

