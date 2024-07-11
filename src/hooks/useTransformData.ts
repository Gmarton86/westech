import { useEffect, useState } from "react";
import {
  ICategoryObject,
  IColumn,
  IHeader,
  IRowData,
  Item,
} from "../shared/interfaces";

export const useTransformData = ({ response }: { response: Item[] }) => {
  const [headers, setHeaders] = useState<IHeader[]>([]);
  const [data, setData] = useState<IRowData[]>([]);

  useEffect(() => {
    const { headers, data } = transformData(response);
    setHeaders(headers);
    setData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const transformData = (
    items: Item[]
  ): { headers: IHeader[]; data: IRowData[] } => {
    const headers = createHeaders(items);
    const data = createData(items);
    return { headers, data };
  };

  const createHeaders = (items: Item[]): IHeader[] => {
    const stores: string[] = Array.from(
      new Set(items.map((item) => item.store))
    );
    return [
      { title: "Category", isSortable: false, invisible: true },
      { title: "Product", isSortable: false, invisible: true },
      ...stores.map((store) => ({ title: store, isSortable: true })),
    ];
  };

  const createData = (items: Item[]): IRowData[] => {
    const categories: ICategoryObject = items.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = { children: {} };
      }
      if (!acc[item.category].children[item.product]) {
        acc[item.category].children[item.product] = {};
      }
      acc[item.category].children[item.product][item.store] = item.pcs;
      return acc;
    }, {} as ICategoryObject);

    return Object.keys(categories).map((category) => {
      const childrenObject = categories[category].children;
      const cols = calculateCols(childrenObject);
      return { category, children: childrenObject, cols };
    });
  };

  const calculateCols = (childrenObject: {
    [key: string]: { [key: string]: number };
  }): IColumn => {
    return Object.keys(childrenObject).reduce((acc, child) => {
      Object.keys(childrenObject[child]).forEach((store) => {
        if (!acc[store]) acc[store] = 0;
        acc[store] += childrenObject[child][store];
      });
      return acc;
    }, {} as IColumn);
  };

  return { headers, data };
};
