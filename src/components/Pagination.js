import React from "react";
import "../styles/Pagination.css";
import {Col} from "react-bootstrap";

function Pagination({ rowsPerPage, totalRows, loadCurrentPage, currentPage }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  const getFirstAndLastItem = (number, array) => {
    if (number === 0) {
      return 1;
    }
    if (number === array.length + 1) {
      return array.length;
    }
    return number;
  };

  return (
    <Col sm={12} md={6} className="pagination">

      <a onClick={() => loadCurrentPage(1)}>first</a>

      <a
        onClick={() =>
          loadCurrentPage(getFirstAndLastItem(currentPage - 1, pageNumbers))
        }
      >
        ≪
      </a>

      <p>
        page {currentPage} from {pageNumbers.length}
      </p>
      <a
        onClick={() =>
          loadCurrentPage(getFirstAndLastItem(currentPage + 1, pageNumbers))
        }
      >
        ≫
      </a>
      <a onClick={() => loadCurrentPage(pageNumbers.length)}>last</a>

    </Col>
  );
}

export default Pagination;
