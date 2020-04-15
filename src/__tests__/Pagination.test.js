import React from "react";
import { render, cleanup, waitForElement, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from "../components/Pagination";

afterEach(cleanup);


test('check if renders correct amount of pages', async () => {
  const { getByText } = render(<Pagination rowsPerPage={12} totalRows={25} setCurrentPage currentPage={1} />);
  const page = await waitForElement(() => getByText("page 1 of 3"));
  expect(page).toBeInTheDocument();
});

test('check if click on first page indicator changes page', async (done) => {
  const handleClick = () => {
    done();
  }
  const { getByText } = render(<Pagination rowsPerPage={12} totalRows={25} setCurrentPage={handleClick} currentPage={1} />);
  const page = await waitForElement(() => getByText("first"));
  fireEvent.click(page)
});

test('check if click on last page indicator changes page', async (done) => {
  const handleClick = () => {
    done();
  }
  const { getByText } = render(<Pagination rowsPerPage={12} totalRows={25} setCurrentPage={handleClick} currentPage={1} />);
  const page = await waitForElement(() => getByText("last"));
  fireEvent.click(page)
});

test('check if click on next page indicator changes page', async (done) => {
  const handleClick = () => {
    done();
  }
  const { getByText } = render(<Pagination rowsPerPage={12} totalRows={25} setCurrentPage={handleClick} currentPage={1} />);
  const page = await waitForElement(() => getByText("≫"));
  fireEvent.click(page)
});

test('check if click on next previous indicator changes page', async (done) => {
  const handleClick = () => {
    done();
  }
  const { getByText } = render(<Pagination rowsPerPage={12} totalRows={25} setCurrentPage={handleClick} currentPage={1} />);
  const page = await waitForElement(() => getByText("≪"));
  fireEvent.click(page)
});