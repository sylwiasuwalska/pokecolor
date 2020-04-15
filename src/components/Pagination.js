import React from "react";
import "../styles/Pagination.css";
import {Col} from "react-bootstrap";

function Pagination({rowsPerPage, totalRows, setCurrentPage, currentPage}) {
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
            <button onClick={() => setCurrentPage(1)}>first</button>

            <button
                onClick={() =>
                    setCurrentPage(getFirstAndLastItem(currentPage - 1, pageNumbers))
                }
            >
                ≪
            </button>

            <button>
                page {currentPage} of {pageNumbers.length}
            </button>
            <button
                onClick={() =>
                    setCurrentPage(getFirstAndLastItem(currentPage + 1, pageNumbers))
                }
            >
                ≫
            </button>
            <button onClick={() => setCurrentPage(pageNumbers.length)}>last</button>
        </Col>
    );
}

export default Pagination;
