import React from "react";
import { IHeader } from "../../shared/interfaces";

interface IPivotTableHeaderProps {
  headers: IHeader[];
  requestSort: (key: string) => void;
}

const PivotTableHeader = ({ headers, requestSort }: IPivotTableHeaderProps) => {
  return (
    <tr className="pivot-table">
      {headers.map((header) => (
        <th
          className="pivot-table"
          id={header.title}
          key={header.title}
          onClick={() => header.isSortable && requestSort(header.title)}
        >
          {!header.invisible && header.title}
        </th>
      ))}
    </tr>
  );
};

export default PivotTableHeader;
