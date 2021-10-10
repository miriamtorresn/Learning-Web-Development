import Cart from '../cart';
import { ICart, IProduct } from '../cart/interfaces';
import { IUtils } from '../utils/interfaces';
import { IAjaxHandler, IAjaxError } from '../ajaxHandler/interfaces';
import { IPagination } from '../pagination/interfaces';
import { IShop } from './interfaces';

/**
 * Shop is a class that adds the ability of managing
 * my Online Store and products
 */
 class Shop implements IShop {
  cart: ICart;
  products: IProduct[];
  utils: IUtils;
  ajax: IAjaxHandler;
  pagination: IPagination;
  paginationItems: number;

  constructor(utils: IUtils, pagination: IPagination, ajax: IAjaxHandler) {
      this.products = [];
      this.paginationItems = 8;
      this.pagination = pagination;
      this.utils = utils;
      this.ajax = ajax;
      this.cart = new Cart(this.products, utils);
  }

  /**
   * Loads the products within the page.
   * 
   * @returns {void}
   */
  loadProducts(): void {
      this.ajax.get('https://61101b8dc848c900171b3a84.mockapi.io/products')
          .then((response: IProduct[]) => {
              // FILL THE VARIABLE PRODUCTS WITH THE RESPONSE
              this.products = response;

              // PRINT THE PRODUCT LIST IN THE PAGE
              this.printProductsList();
              this.cart.updateProducts(this.products);
          })
          .catch((error: IAjaxError) => {
              console.error(error);
              // IS NOT SUCCESS
              // SAY TO THE USER THAT SOMETHING WENT WRONG
              document.body.innerHTML = `
                  <div class="error-page">
                      <div class="container">
                          <div class="row">
                              <div class="col-1"><h1>:(</h1></div>
                              <div class="col-11">
                                  <h2>${error.message}</h2>
                                  <p>Código del error: ${error.status}</p>
                              </div>
                          </div>                            
                      </div>
                  </div>
              `;
          });
  }

  /**
   * Loads the products within the page.
   * 
   * @param {string} search
   * @returns {void}
   */
  printProductsList(search: string = null) : void {
      let productsHTML: string = '';

      // Filter products
      const filteredProducts: IProduct[] = this.products
          .filter((product: IProduct) => {
              let showProduct: boolean = true;
              if (search) {
                  const productName: string = product.name.toLowerCase();
                  const searchQuery: string = search.toLowerCase();
                  // Reto: Usar expresion regular
                  // https://www.codecademy.com/resources/docs/javascript/regexp
                  // https://regex101.com/

                  showProduct = productName.includes(searchQuery);
              }
              return showProduct;
          });

      if (filteredProducts.length > 0) {
          // There are results

          // Get page that I have active in the URL
          const activePage: number = this.pagination.getActivePage();
          // Get the number of pages that I need to display
          const productsPages: IProduct[][] = this.utils.divideArray(filteredProducts, this.paginationItems);

          // Products tht needs to be displayed in the current active page
          const productsAtPage: IProduct[] = productsPages[activePage - 1];

          // Load each product card HTML
          productsAtPage.forEach((product: IProduct) => {
              productsHTML += this.getProductCardHTML(product);
          });

          // Print pagination HTML according the number of pages
          document.getElementById('pagination-list').innerHTML = this.pagination.loadPagination(productsPages.length, activePage);
          // Printing the product cards.
          document.getElementById('products-list').innerHTML = productsHTML;
      } else {
          // There are not results
          document.getElementById('products-list').innerHTML = 'No results found';
      }
  }

  /**
   * Return product information as HTML
   * 
   * @param {IProduct} product 
   * @returns {string}
   */
  getProductCardHTML(product: IProduct): string {
      return `
          <div class="col-3">
              <div class="card">
                  <img src="${product.image}" class="card-img-top" alt="${product.name}">
                  <div class="card-body">
                  <h5 class="card-title">${product.name}</h5>
                  <p class="card-text">${product.description}</p>
                  <p class="card-text price">$${product.price} ${product.currency}</p>
                  <a href="#" class="btn btn-secondary btn-small" onClick="shop.cart.addToCart(event, '${product.id}')">+</a>
                  <span id="card-product-quantity-${product.id}">0</span>
                  <a href="#" class="btn btn-secondary btn-small" onClick="shop.cart.substactFromCart(event, '${product.id}')">-</a>
                  <a href="#" class="btn btn-secondary" onClick="shop.cart.deleteFromCart(event, '${product.id}')">Delete All</a>
                  </div>
              </div>
          </div>`;
  }

  /**
   * Performing a Search.
   * 
   * @param {Event} event
   * @returns {void}
   */
  doSearch(event: Event): void {
      event.preventDefault();
      const search: string = (<HTMLInputElement>document.getElementById('search')).value;
      this.printProductsList(search);
  }
}

export default Shop;