import { IUtils } from '../utils/interfaces';
import { IProduct, ICartProduct, ICart } from './interfaces';

/**
 * Cart is a class that manages all the actions available for Cart
 * i.e. Add to cart, Delete from cart, Update Cart...
 */
 class Cart implements ICart {

  utils: IUtils;
  products: IProduct[];
  cartElements: ICartProduct[];
 
  constructor(products: IProduct[], utils: IUtils) {
      this.cartElements = [];
      this.products = products;
      this.utils = utils;
  }

  /**
   * Updating value of products at Cart
   * 
   * @param {array} products 
   * @returns {void}
   */
  updateProducts(products: IProduct[]): void {
      this.products = products;
  }

  /**
   * Adding an element to the cart
   * 
   * @param {Event} event 
   * @param {string} id
   * @returns {void}
   */
  addToCart(event: Event, id: string): void {
      this.updateCart(event, () => { this.productExits(id) ? this.updateCartItem(id, 'add') : this.addNewItemToCart(id) });
  }

  /**
   * Substracting an element from the cart
   * 
   * @param {Event} event 
   * @param {string} id
   * @returns {void}
   */
  substactFromCart(event: Event, id: string): void {
      this.updateCart(event, () => {
          if (this.productExits(id)) {
              this.updateCartItem(id, 'substract');
          }
      });
  }

  /**
   * Substracting an element from the cart
   * 
   * @param {Event} event 
   * @param {string} id
   * @returns {void}
   */
  deleteFromCart(event: Event, id: string): void {
      this.updateCart(event, () => { this.updateCartItem(id, 'delete'); });
  }

  /**
   * Updating cart elements by excecuting a custom action
   * 
   * @param {event} event 
   * @param {() => any} action
   * @returns {void}
   */
  updateCart(event: Event, action: () => any): void {
      event.preventDefault();
      action();
      this.updateAllItemsCartQuantity();
      this.updateCartSummary();
  }

  /**
   * Verify if a product exist within the cart
   * 
   * @param {string} id
   * @returns {boolean}
   */
  productExits(id: string) : boolean {
      return this.cartElements.some((item) => item.id === id);
  }

  /**
   * Updates the number of the items within my cart
   * by reducing the array and making a count of items.
   * 
   * @returns {void}
   */
  updateAllItemsCartQuantity(): void {
      const count: number = this.cartElements.reduce((acumulador, valorActual) => acumulador + valorActual.quantity, 0);
      this.utils.updateHTMLById('cart-items', count.toString());
  }

  /**
   * Updating the quantity of an item in my cart
   * 
   * @param {string} id 
   * @param {string} type 
   * @returns {void}
   */
  updateCartItem(id: string, type: string): void {
      if (type === 'delete') {
          this.cartElements = this.cartElements.filter((item) => {
              const quantity: number = 0;
              this.utils.updateHTMLById(`card-product-quantity-${id}`, quantity.toString());
              return item.id !== id;
          });
      } else {
          this.cartElements.map((item) => {
              if (item.id === id) {
                  switch (type) {
                      case 'add':
                          item.quantity += 1;
                          this.utils.updateHTMLById(`card-product-quantity-${item.id}`, item.quantity.toString());
                          break;
                      case 'substract':
                          if (item.quantity > 1) {
                            item.quantity -= 1;
                            this.utils.updateHTMLById(`card-product-quantity-${item.id}`, item.quantity.toString());
                          } else {
                            this.updateCartItem(id, 'delete')
                          }                          
                          break;
                  }
              }
              return item;
          });
      }
  }

  /**
   * Add a new item in my cart
   * 
   * @param {string} id 
   * @returns {void}
   */
  addNewItemToCart(id: string): void {
      // Adding to cart
      this.cartElements.push({
          id: id,
          quantity: 1
      });
      const quantity: number = 1;
      this.utils.updateHTMLById(`card-product-quantity-${id}`, quantity.toString());
  }

  /**
   * Updating summary of the cart items
   * 
   * @returns {void}
   */
  updateCartSummary(): void {
      let cartSummaryHTML: string = '';

      this.cartElements.forEach((product: ICartProduct) => {
          const productInformation: IProduct = this.getCartProduct(product);

          cartSummaryHTML += `
              <div class="col-3">
                  <div class="card">
                      <div class="card-body">
                      <h5 class="card-title">${productInformation.name}</h5>
                      <p class="card-text price">$${productInformation.price} ${productInformation.currency}</p>
                      <p class="card-text">Quantity ${productInformation.quantity}</p>
                      </div>
                  </div>
              </div>`;
      });

      this.utils.updateHTMLById('cart-summary', cartSummaryHTML);
  }

  /**
   * Getting the product from the cart and its details
   * 
   * @param {ICartProduct} product
   * @return {IProduct}
   */
  getCartProduct(product: ICartProduct): IProduct {
      const productData = this.products.find((item) => item.id === product.id);
      return { ...product, ...productData };
  }
}

export default Cart;
