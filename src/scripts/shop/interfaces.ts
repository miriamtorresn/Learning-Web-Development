import { ICart, IProduct } from '../cart/interfaces';
import { IUtils } from '../utils/interfaces';
import { IAjaxHandler } from '../ajaxHandler/interfaces';
import { IPagination } from '../pagination/interfaces';

export interface IShop {
  cart: ICart;
  products: IProduct[];
  utils: IUtils;
  ajax: IAjaxHandler;
  pagination: IPagination;
  paginationItems: number;
  loadProducts: () => void;
  printProductsList: (search: string) => void;
  getProductCardHTML: (product: IProduct) => string;
  doSearch: (event: Event) => void;
};