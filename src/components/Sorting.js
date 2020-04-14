import React, {useState} from "react";
import "../styles/Sorting.css";

function Sorting({data, setData}) {
    const [fieldToSort, setFieldToSort] = useState(null);
    const [sortDirection, setSortDirection] = useState("ascending");

    const sortByField = (field) => {
        setFieldToSort(field);
        let sortedData = data.slice().sort((a, b) => {
            if (a[field] < b[field]) {
                return sortDirection === "ascending" ? -1 : 1;
            }
            if (a[field] > b[field]) {
                return sortDirection === "ascending" ? 1 : -1;
            }
            return 0;
        });
        setData(sortedData);

        sortDirection === "ascending"
            ? setSortDirection("descending")
            : setSortDirection("ascending");
    };

    const getSortIndicator = (field) => {
        return field === fieldToSort ? `active ${sortDirection}` : undefined;
    };

    return (
        <div className="sorting">
            <button
                type="button"
                onClick={() => sortByField("name")}
                className={getSortIndicator("name")}
            >
                sort by name
            </button>
            <button
                type="button"
                onClick={() => sortByField("baseExperience")}
                className={getSortIndicator("baseExperience")}
            >
                sort by base experience
            </button>
            <button
                type="button"
                onClick={() => sortByField("id")}
                className={getSortIndicator("id")}
            >
                sort by ID
            </button>
            <button
                type="button"
                onClick={() => sortByField("abilities")}
                className={getSortIndicator("abilities")}
            >
                sort by base ability
            </button>
            <button
                type="button"
                onClick={() => sortByField("types")}
                className={getSortIndicator("types")}
            >
                sort by base type
            </button>
        </div>
    );
}

export default Sorting;
