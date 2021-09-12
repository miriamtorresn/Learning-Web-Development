/**
 * Cart is a class that manages all the actions available for Cart
 * i.e. Add to cart, Delete from cart, Update Cart...
 */
 class Cart {
  constructor(products, utils) {
      this.cartElements = [];
      this.products = products;
      this.utils = utils;
  }

  /**
   * Updating value of products at Cart
   * 
   * @param {array} products 
   */
  updateProducts(products) {
      this.products = products;
  }

  /**
   * Adding an element to the cart
   * 
   * @param {event} event 
   * @param {string} id
   */
  addToCart(event, id) {
      this.updateCart(event, () => { this.productExits(id) ? this.updateCartItem(id, 'add') : this.addNewItemToCart(id) });
  }

  /**
   * Substracting an element from the cart
   * 
   * @param {event} event 
   * @param {string} id
   */
  substactFromCart(event, id) {
      this.updateCart(event, () => {
          if (this.productExits(id)) {
              this.updateCartItem(id, 'substract');
          }
      });
  }

  /**
   * Substracting an element from the cart
   * 
   * @param {event} event 
   * @param {string} id
   */
  deleteFromCart(event, id) {
      this.updateCart(event, () => { this.updateCartItem(id, 'delete'); });
  }

  /**
   * Updating cart elements by excecuting a custom action
   * 
   * @param {event} event 
   * @param {function} action
   */
  updateCart(event, action) {
      event.preventDefault();
      action();
      this.updateAllItemsCartQuantity();
      this.updateCartSummary();
  }

  /**
   * Verify if a product exist within the cart
   * 
   * @param {string} id
   * @return {boolean}
   */
  productExits(id) {
      return this.cartElements.some((item) => item.id === id);
  }

  /**
   * Updates the number of the items within my cart
   * by reducing the array and making a count of items.
   */
  updateAllItemsCartQuantity() {
      const count = this.cartElements.reduce((acumulador, valorActual) => acumulador + valorActual.quantity, 0);
      this.utils.updateHTMLById('cart-items', count);
  }

  /**
   * Updating the quantity of an item in my cart
   * 
   * @param {string} id 
   * @param {string} type 
   */
  updateCartItem(id, type) {
      if (type === 'delete') {
          this.cartElements = this.cartElements.filter((item) => {
              this.utils.updateHTMLById(`card-product-quantity-${id}`, 0);
              return item.id !== id;
          });
      } else {
          this.cartElements.map((item) => {
              if (item.id === id) {
                  switch (type) {
                      case 'add':
                          item.quantity += 1;
                          this.utils.updateHTMLById(`card-product-quantity-${item.id}`, item.quantity);
                          break;
                      case 'substract':
                          if (item.quantity > 1) {
                            item.quantity -= 1;
                            this.utils.updateHTMLById(`card-product-quantity-${item.id}`, item.quantity);
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
   */
  addNewItemToCart(id) {
      // Adding to cart
      this.cartElements.push({
          id: id,
          quantity: 1
      });
      this.utils.updateHTMLById(`card-product-quantity-${id}`, 1);
  }

  /**
   * Updating summary of the cart items
   */
  updateCartSummary() {
      let cartSummaryHTML = '';

      this.cartElements.forEach((product) => {
          const productInformation = this.getCartProduct(product);

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
   * @param {object} product
   * @return {object}
   */
  getCartProduct(product) {
      const productData = this.products.find((item) => item.id === product.id);
      return { ...product, ...productData };
  }
}