import { IUtils } from '../utils/interfaces';

export interface IPagination {
  utils: IUtils;
  getActivePage: () => number;
  loadPagination: (length: number, activePage: number) => string;
};