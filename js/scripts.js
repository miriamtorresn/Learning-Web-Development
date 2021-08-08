// Variables declaration
const cartElements = [];
const products = [
    { // => 0
        "id": "PROD0001",
        "name": "Product Name",
        "price": 234,
        "currency": "USD",
        "color": "red",
        "image": "producto1.jpeg",
        "description": "This is a great product!"
    },
    { // => 1
        "id": "PROD0002",
        "name": "Product Name2",
        "price": 50,
        "currency": "USD",
        "color": "pink",
        "image": "producto2.jpeg",
        "description": "This is a great product! 2"
    }
];

/**
 * Adding an element to the cart
 * 
 * @param {event} event 
 * @param {string} id
 */
const addToCart = (event, id) => {
    event.preventDefault();
    updateCartItems(id);
    updateCartQuantity();
    updateCartSummary();
};

/**
 * Updates items at the card, deciding to add a new item
 * or modify an existing one
 * 
 * @param {string} id
 */
const updateCartItems = (id) => {
    const alreadyExist = cartElements.find((item) => item.id === id);

    // Ternary condition
    alreadyExist ? updateCartItem(id, 'addition') : addNewItemToCart(id);
};

/**
 * Updates the number of the items within my cart
 * by reducing the array and making a count of items.
 */
const updateCartQuantity = () => {
    const count = cartElements.reduce((acumulador, valorActual) => acumulador + valorActual.quantity, 0);
    document.getElementById('cart-items').innerHTML = count;
};

/**
 * Updating the quantity of an item in my cart
 * 
 * @param {string} id 
 * @param {string} type 
 */
const updateCartItem = (id, type) => {
    cartElements.map((item) => {
        if (item.id === id) {
            type === 'addition' ? item.quantity += 1 : item.quantity -= 1;
        }
        return item;
    });
};

/**
 * Add a new item in my cart
 * 
 * @param {string} id 
 */
const addNewItemToCart = (id) => {
    // Adding to cart
    cartElements.push({
        id: id,
        quantity: 1
    });
};

/**
 * Updating summary of the cart items
 */
const updateCartSummary = () => {
    let cartSummaryHTML = '';

    cartElements.forEach((product) => {
        const productData = products.find((item) => item.id === product.id);
        const productInformation = { ...product, ...productData };

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

    document.getElementById('cart-summary').innerHTML = cartSummaryHTML;
}

/**
 * Loads the products within the page.
 */
const loadProducts = () => {
    let productsHTML = '';

    products.forEach((product) => {
        productsHTML += `
            <div class="col-3">
                <div class="card">
                    <img src="./imgs/productos/${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text price">$${product.price} ${product.currency}</p>
                    <a href="#" class="btn btn-primary" onClick="addToCart(event, '${product.id}')">Add to Cart</a>
                    </div>
                </div>
            </div>`;
    });
    
    document.getElementById('products-list').innerHTML = productsHTML;
};

// When the document is loaded, then I load the products.
loadProducts();
