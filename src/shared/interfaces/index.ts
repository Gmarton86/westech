export interface Item {
  product: string;
  pcs: number;
  category: string;
  store: string;
}

export interface IHeader {
  title: string;
  isSortable: boolean;
  invisible?: boolean;
}

interface IProductSales {
  [store: string]: number;
}

export interface ICategoryProducts {
  [product: string]: IProductSales;
}

export interface ICategoryData {
  children: ICategoryProducts;
}

export interface ICategoryObject {
  [category: string]: ICategoryData;
}

export interface IColumn {
  [key: string]: number;
}

export interface IRowData {
  category: string;
  children: ICategoryProducts;
  cols: IColumn;
}
