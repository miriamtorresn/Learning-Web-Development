import './scss/styles.scss';

import AjaxHandler from './scripts/ajaxHandler';
import Utils from './scripts/utils';
import Pagination from './scripts/pagination';
import Shop from './scripts/shop';

import { IUtils } from './scripts/utils/interfaces';
import { IAjaxHandler } from './scripts/ajaxHandler/interfaces';
import { IPagination } from './scripts/pagination/interfaces';

// Variables declaration
const ajax: IAjaxHandler = new AjaxHandler();
const utils: IUtils = new Utils();
const pagination: IPagination = new Pagination(utils);
const globalContext: any = global;

globalContext.shop = new Shop(utils, pagination, ajax);

// When the document is loaded, then I load the products.
globalContext.shop.loadProducts();
