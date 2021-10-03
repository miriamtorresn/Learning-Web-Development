import './scss/styles.scss';

import AjaxHandler from './scripts/ajaxHandler';
import Utils from './scripts/utils';
import Pagination from './scripts/pagination';
import Shop from './scripts/Shop';

import { IUtils } from './scripts/utils/interfaces';

// Variables declaration
const ajax = new AjaxHandler();
const utils: IUtils = new Utils();
const pagination = new Pagination(utils);
const shop = new Shop(utils, pagination, ajax);
shop.loadProducts();

//global.shop = new Shop(utils, pagination, ajax);

// When the document is loaded, then I load the products.
//global.shop.loadProducts();
