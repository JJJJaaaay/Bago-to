const products = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Aesthetic Outfit #${i + 1}`,
    price: (Math.random() * 50 + 20).toFixed(2),
    image: 'https://via.placeholder.com/200x250?text=Aesthetic+' + (i + 1)
}));

const productGrid = document.getElementById("productGrid");

products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" width="200">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productGrid.appendChild(card);
});
