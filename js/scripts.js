
class Utils {
    /**
     * Updates HTML in an specific id
     * 
     * @param {string} id 
     * @param {string} html 
     */
    updateHTMLById(id, html) {
        document.getElementById(id).innerHTML = html;
    }
}

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
        this.updateCartQuantity();
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
    updateCartQuantity() {
        const count = this.cartElements.reduce((acumulador, valorActual) => acumulador + valorActual.quantity, 0);
        this.utils.updateHTMLById('cart-items', count);
    }

    /**
     * Updating the quantity of an item in my cart
     * 
     * @param {string} id 
     * @param {string} type 
     */
    updateCartItem = (id, type) => {
        if (type === 'delete') {
            this.cartElements = this.cartElements.filter((item) => {
                return item.id !== id;
            });
        } else {
            this.cartElements.map((item) => {
                if (item.id === id) {
                    switch (type) {
                        case 'add':
                            item.quantity += 1;
                            break;
                        case 'substract':
                            item.quantity > 1 ? item.quantity -= 1 : updateCartItem(id, 'delete');
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
    addNewItemToCart = (id) => {
        // Adding to cart
        this.cartElements.push({
            id: id,
            quantity: 1
        });
    };

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


// Variables declaration
let products = [];
const paginationItems = 8;
const utils = new Utils();
const cart = new Cart(products, utils);

/**
 * Loads the products within the page.
 */
const printProductsList = (search = null) => {
    let productsHTML = '';

    // Filter products
    const filteredProducts = products
    .filter((product) => {
        let showProduct = true;
        if (search) {
            const productName = product.name.toLowerCase();
            const searchQuery = search.toLowerCase();
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
        const activePage = getActivePage();
        // Get the number of pages that I need to display
        const productsPages = divideArray(filteredProducts, paginationItems);
        // Products tht needs to be displayed in the current active page
        const productsAtPage = productsPages[activePage - 1];

        // Load each product card HTML
        productsAtPage.forEach((product) => {
            productsHTML += getProductCardHTML(product);
        });

        // Print pagination HTML according the number of pages
        document.getElementById('pagination-list').innerHTML = loadPagination(productsPages.length, activePage);
        // Printing the product cards.
        document.getElementById('products-list').innerHTML = productsHTML;
    } else {
        // There are not results
        document.getElementById('products-list').innerHTML = 'No results found';
    }
}

/**
 * Create an Ajax Loader to perform API Calls
 */
const ajaxLoader = (method, path)=> {
    return new Promise((resolve, reject) => {
        // MAKE API CALL
        // Prepare a variable for the HTTP request
        let request;

        // Setup the request variable according the browser
        if (window.XMLHttpRequest) { // Mozilla, Safari, ...
            request = new XMLHttpRequest();
        } else if (window.ActiveXObject) { // IE
            request = new ActiveXObject("Microsoft.XMLHTTP");
        }

        // When the state of the request changes, do something
        request.onreadystatechange = function() {
            // if the case is 4 => completed
            if (request.readyState === 4) {
                if (request.status == 200) {
                    // IS SUCCESS
                    resolve(JSON.parse(request.responseText));
                } else {
                    // AN ERROR OCCURED
                    reject({
                        status: request.status,
                        message: 'Sorry, Something went wrong'
                    });
                }
            }
        };

        // Open a connection to the provided URL
        // By using the Method gotten
        request.open(method, path);
    
        // Do the request
        request.send();
    });
};


/**
 * Loads the products within the page.
 */
const loadProducts = () => {
    ajaxLoader('GET', 'https://61101b8dc848c900171b3a84.mockapi.io/products')
        .then((response) => {
            // FILL THE VARIABLE PRODUCTS WITH THE RESPONSE
            products = response;

            // PRINT THE PRODUCT LIST IN THE PAGE
            printProductsList();
            cart.updateProducts(products);
        })
        .catch(error => {
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
};

/**
 * Performing a Search.
 */
const doSearch = (event) => {
    event.preventDefault();
    const search = document.getElementById('search').value;
    printProductsList(search);
};

/**
 * Get Active page based on URL parameters
 * 
 * @return {number}
 */
 const getActivePage = () => {
    // Documentation at:
    // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams

    const searchParams = new URLSearchParams(window.location.search);
    return Number(searchParams.get('page')) || 1;
};

/**
 * Return product information as HTML
 * 
 * @param {object} product 
 * @returns 
 */
const getProductCardHTML = (product) => {
    return `
        <div class="col-3">
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text price">$${product.price} ${product.currency}</p>
                <a href="#" class="btn btn-primary" onClick="cart.addToCart(event, '${product.id}')">+</a>
                <span>0</span>
                <a href="#" class="btn btn-primary" onClick="cart.substactFromCart(event, '${product.id}')">-</a>
                <a href="#" class="btn btn-primary" onClick="cart.deleteFromCart(event, '${product.id}')">Delete All</a>
                </div>
            </div>
        </div>`;
}

/**
 * Creating pagination links
 * 
 * @param {number} length
 * @param {number} activePage
 * @returns {string}
 */
const loadPagination = (length, activePage) => {
    let links = '';

    for (let i = 1; i <= length; i++) {
        links += `<li class="page-item ${activePage === i ? 'active' : ''}">
            <a class="page-link" href="${window.location.origin}${window.location.pathname}?page=${i}">${i}</a>
        </li>`;
    }

    return links;
};

/**
 * Dividing an array based on an specific number of items
 * 
 * @param {array} array
 * @param {number} items
 * @return {array}
 */
const divideArray = (array, items) => {
    // Useful documentation:
    // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil
    // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
    // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/splice

    return new Array(Math.ceil(array.length / items))
    .fill()
    .map(() => array.splice(0, items));
};

// When the document is loaded, then I load the products.
loadProducts();
