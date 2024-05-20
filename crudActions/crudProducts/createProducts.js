import LocalStorageFile from '../../clsLocalStorage/clsLocalStorage.js'
import Product from '../../class/product.js'
import Valida from '../../components/validations.js'

const formulary = document.getElementById("fromProduct")
const productDescription = document.getElementById("descripcion")
const productPrice = document.getElementById("precio")
const productStock = document.getElementById("stock")

const local_products = new LocalStorageFile("products")

let productIdCounter = 1;

const handleCreateProduct = (e) => {
    e.preventDefault()

    const descripcion = productDescription.value
    const precio = parseFloat(productPrice.value)
    const stock = parseInt(productStock.value)

    if (isNaN(precio) || isNaN(stock) || precio <= 0 || stock <= 0) {
        alert("Por favor, verifica que los campos Precio y Stock sean números válidos mayores que cero.")
        return; 
    }

    const dataProducts = local_products.read()

    const isDuplicate = dataProducts.some(product => product.descripcion === descripcion);
    if (isDuplicate) {
        alert("Ya existe un producto con este nombre.");
        return;
    }

    const id = parseInt(productIdCounter.toString()); 
    productIdCounter++; 

    const product = new Product(id, descripcion, precio, stock)
    let json_product = product.getJson()
    if(dataProducts.length > 0){
        const ult_product = dataProducts[dataProducts.length - 1]
        const new_product = ult_product.id + 1
        json_product.id = new_product
    }
    dataProducts.push(json_product)
    local_products.save(dataProducts)

    alert("Producto Registrado con éxito!")
    productDescription.value = ""
    productPrice.value = ""
    productStock.value = ""
}

formulary.addEventListener("submit", handleCreateProduct)
