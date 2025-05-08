function getCart() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id) {
    let cart = getCart();
    let item = cart.find(p => p.id === id);
    if (item) {
        item.qty += 1;
    } else {
        const product = products.find(p => p.id === id);
        cart.push({ ...product, qty: 1 });
    }
    saveCart(cart);
    alert("Item added to cart!");
}
