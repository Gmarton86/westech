import React, { useState } from "react";
import { ICategoryProducts, IHeader, IRowData } from "../../shared/interfaces";
import PivotTableHeader from "./PivotTableHeader";
import PivotTableRows from "./PivotTableRows";

interface IPivotTableProps {
  headers: IHeader[];
  data: IRowData[];
}

enum ESorting {
  ASC = "ascending",
  DESC = "descending",
}

const PivotTable = ({ data, headers }: IPivotTableProps) => {
  const initialConfigValue = { key: null, direction: null };

  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: ESorting | null;
  }>(initialConfigValue);

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;

    const { key: sortKey, direction } = sortConfig;

    const compareValues = (a: any, b: any) => {
      if (a < b) return direction === ESorting.ASC ? -1 : 1;
      if (a > b) return direction === ESorting.ASC ? 1 : -1;
      return 0;
    };

    const sortChildren = (children: ICategoryProducts) => {
      const sortedEntries = Object.entries(children).sort(
        ([keyA, childA], [keyB, childB]) =>
          compareValues(childA[sortKey], childB[sortKey])
      );
      return Object.fromEntries(sortedEntries);
    };

    return data
      .map((row) => ({
        ...row,
        children: row.children ? sortChildren(row.children) : row.children,
      }))
      .sort((a, b) => compareValues(a.cols[sortKey], b.cols[sortKey]));
  }, [data, sortConfig]);

  const requestSort = (key: string) => {
    let direction: ESorting.ASC | ESorting.DESC = ESorting.ASC;

    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === ESorting.ASC
    ) {
      direction = ESorting.DESC;
    }
    setSortConfig({ key, direction });
  };

  return (
    <>
      <button
        className="clear-button"
        onClick={() => setSortConfig(initialConfigValue)}
      >
        Clear sorting
      </button>
      <table className="pivot-table">
        <thead className="pivot-table">
          <PivotTableHeader headers={headers} requestSort={requestSort} />
        </thead>
        <tbody className="pivot-table">
          <PivotTableRows rows={sortedData} headers={headers} />
        </tbody>
      </table>
    </>
  );
};

export default PivotTable;
