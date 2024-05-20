import LocalStorageFile from '../../clsLocalStorage/clsLocalStorage.js'

const products_local = new LocalStorageFile("products")

const productList = document.getElementById("productList")
const searchForm = document.getElementById("searchForm")
const searchInput = document.getElementById("searchInput")

// Función para mostrar todos los productos
function showAllProducts() {
    const productsData = products_local.read();

    productList.innerHTML = "";

    productsData.forEach(product => {
        const li = document.createElement("li")
        li.textContent = `ID: ${product.id} - Descripción: ${product.descripcion} - Precio: ${product.precio} - Stock: ${product.stock}`;
        productList.appendChild(li)
    })
}

// Función para filtrar productos por ID
function filterProductsById(productId) {
    const productsData = products_local.read();

    const filteredProducts = productsData.filter(product => product.id === productId);

    productList.innerHTML = "";

    filteredProducts.forEach(product => {
        const li = document.createElement("li")
        li.textContent = `ID: ${product.id} - Descripción: ${product.descripcion} - Precio: ${product.precio} - Stock: ${product.stock}`;
        productList.appendChild(li)
    })
}

// Manejador de evento para búsqueda de productos por ID
const handleSearchProduct = (e) => {
    e.preventDefault();

    const productId = parseInt(searchInput.value.trim());

    if (!productId) {
        alert("Por favor, ingrese un ID de producto");
        return;
    }

    filterProductsById(productId);
}

// Escuchar el evento de envío del formulario de búsqueda
searchForm.addEventListener("submit", handleSearchProduct);

// Mostrar todos los productos al cargar la página
showAllProducts();
