import React, { useState } from "react";
import "../styles/Sorting.css";

function Sorting({ data, setData }) {
  const sortingKeys = [
    {
      id: "name",
      name: "name",
    },
    {
      id: "baseExperience",
      name: "base experience",
    },
    {
      id: "id",
      name: "ID",
    },
    {
      id: "abilities",
      name: "base ability",
    },
    {
      id: "types",
      name: "base type",
    },
  ];


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

  const renderSortButtons = Object.values(sortingKeys).map((element) => {
      return <button key={element.id} type="button" onClick={()=> sortByField(element.id)} className={getSortIndicator(element.id)}>sort by {element.name}</button>
  })

  return (
    <div className="sorting">
        {renderSortButtons}
    </div>
  );
}

export default Sorting;

