// Variables declaration
const ajax = new AjaxHandler();
const utils = new Utils();
const pagination = new Pagination(utils);
const shop = new Shop(utils, pagination, ajax);

// When the document is loaded, then I load the products.
shop.loadProducts();
