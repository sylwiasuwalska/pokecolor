import React from "react";
import "../Pagination.css";

function Pagination({ rowsPerPage, totalRows, loadCurrentPage, currentPage }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  const getFirstAndLastItem = (number, array) => {
    if (number === 0) {
      return 1;
    }
    if (number === array.length+1) {
      return array.length;
    }
    return number;
  };

  return (
    <div className="pagination">
      <a
        href="javascript:;"
        onClick={() => loadCurrentPage(1)}

      >
        first
      </a>

      <a
        href="javascript:;"
        onClick={() => loadCurrentPage(getFirstAndLastItem(currentPage-1, pageNumbers))}

      >
        ≪
      </a>

      <p>
        page {currentPage} from {pageNumbers.length}
      </p>

      <a
        href="javascript:;"
        onClick={() => loadCurrentPage(getFirstAndLastItem(currentPage+1, pageNumbers))}
      >
        ≫
      </a>
      <a
        href="javascript:;"
        onClick={() => loadCurrentPage(pageNumbers.length)}
      >
        last
      </a>
    </div>
  );
}

export default Pagination;
