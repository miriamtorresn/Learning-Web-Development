import AjaxHandler from './scripts/ajaxHandler';
import Utils from './scripts/utils';
import Pagination from './scripts/pagination';
import Shop from './scripts/Shop';

// Variables declaration
const ajax = new AjaxHandler();
const utils = new Utils();
const pagination = new Pagination(utils);
global.shop = new Shop(utils, pagination, ajax);

// When the document is loaded, then I load the products.
global.shop.loadProducts();
