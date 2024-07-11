import React, { useState, useCallback } from "react";
import {
  ICategoryProducts,
  IColumn,
  IHeader,
  IRowData,
} from "../../shared/interfaces";

interface IPivotTableRowsProps {
  rows: IRowData[];
  headers: IHeader[];
}

const PivotTableRows = ({ rows, headers }: IPivotTableRowsProps) => {
  return (
    <>
      {rows.map((row) => (
        <PivotTableRow
          cols={row.cols}
          key={row.category}
          category={row.category}
          children={row.children}
          headers={headers}
        />
      ))}
    </>
  );
};

export default PivotTableRows;

const PivotTableRow = ({
  category,
  children,
  headers,
  cols,
}: IRowData & { headers: IHeader[] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderStoreCells = useCallback(
    (cols: ICategoryProducts) => {
      return Object.keys(cols).map((product) => (
        <tr key={product}>
          <td></td>
          <td>{product}</td>
          {headers.slice(2).map((header) => (
            <td key={header.title}>{cols[product][header.title] || 0}</td>
          ))}
        </tr>
      ));
    },
    [headers]
  );

  const renderStoreCellsCategory = useCallback(
    (cols: IColumn) => {
      return headers
        .slice(2)
        .map((header) => <td key={header.title}>{cols[header.title] || 0}</td>);
    },
    [headers]
  );

  return (
    <>
      <tr className="pivot-table">
        <td className="pivot-table">
          <button onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "-" : "+"}
          </button>
          <span> {category}</span>
        </td>
        <td className="pivot-table"></td>
        {renderStoreCellsCategory(cols)}
      </tr>
      {isExpanded && renderStoreCells(children)}
    </>
  );
};
