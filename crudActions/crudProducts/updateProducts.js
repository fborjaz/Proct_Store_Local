import LocalStorageFile from '../../clsLocalStorage/clsLocalStorage.js'
import Valida from '../../components/validations.js'

const products_local = new LocalStorageFile("products")
const validador = new Valida()

const productsData = products_local.read()
const productList = document.getElementById("productList")
const updateForm = document.getElementById("updateForm")
const updateFormAfter = document.getElementById("updateFormAfter")
const productIdInput = document.getElementById("productId")

function showProducts() {
    productList.innerHTML = "";

    productsData.forEach(product => {
        const li = document.createElement("li")
        li.textContent = `ID: ${product.id} - Descripción: ${product.descripcion} - Precio: ${product.precio} - Stock: ${product.stock}`;
        productList.appendChild(li)
    })
}
showProducts()

const handleUpdateProduct = (e) => {
    e.preventDefault()

    const productId = parseInt(productIdInput.value.trim()); // Convertir a entero

    if (isNaN(productId)) {
        alert("ID inválido")
        return
    }

    let product = products_local.find("id", productId)
    if (product.length > 0) {
        product = product[0]
        updateFormAfter.style.display = "block"
        const p_product = document.getElementById("productUpdate")
        const input_description = document.getElementById("descriptionProduct")
        const input_price = document.getElementById("priceProduct")
        const input_stock = document.getElementById("stockProduct")
        p_product.textContent = `Producto a actualizar: ${product.descripcion} - Precio: ${product.precio} - Stock: ${product.stock}`
        input_description.value = product.descripcion
        input_price.value = product.precio
        input_stock.value = product.stock
    } else {
        alert("El producto no está registrado")
        return
    }
}

const handleUpdateProductAfter = (e) => {
    e.preventDefault()

    const input_description = document.getElementById("descriptionProduct")
    const input_price = document.getElementById("priceProduct")
    const input_stock = document.getElementById("stockProduct")

    if (!validador.soloLetras(input_description.value) || isNaN(parseFloat(input_price.value)) || isNaN(parseInt(input_stock.value))) {
        alert("Ingresaste un campo incorrecto, revise")
        return
    }

    const productId = parseInt(productIdInput.value.trim());

    let product = products_local.find("id", productId)
    const product_id = product[0].id

    const updatedProductsData = productsData.map(product => {
        if (product.id === product_id) {
            product.descripcion = input_description.value;
            product.precio = parseFloat(input_price.value);
            product.stock = parseInt(input_stock.value)
        }
        return product;
    });

    alert("Producto modificado con éxito")
    products_local.save(updatedProductsData)
    window.location.href = '../../templates/MenúProducts.html'
}

updateFormAfter.addEventListener("submit", handleUpdateProductAfter)
updateForm.addEventListener("submit", handleUpdateProduct)
