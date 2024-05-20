import LocalStorageFile from '../../clsLocalStorage/clsLocalStorage.js'
import Valida from '../../components/validations.js'

const products_local = new LocalStorageFile("products")
const validador = new Valida()

const productList = document.getElementById("productList")
const deleteForm = document.getElementById("deleteForm")
const productIdInput = document.getElementById("productId")

function showProducts() {
    const productsData = products_local.read();
    productList.innerHTML = "";

    productsData.forEach(product => {
        const li = document.createElement("li")
        li.textContent = `ID: ${product.id} - Descripción: ${product.descripcion} - Precio: ${product.precio} - Stock: ${product.stock}`;
        productList.appendChild(li)
    })
}

const handleDeleteProduct = (e) => {
    e.preventDefault()

    const productIdToDelete = parseInt(productIdInput.value.trim()); 

    if (isNaN(productIdToDelete)) {
        alert("ID inválido");
        return;
    }

    let data = products_local.find("id", productIdToDelete);
    if (data.length < 1) {
        alert("El producto no se encuentra registrado");
        return;
    } else {
        const productsDataModify = products_local.read().filter(product => product.id !== productIdToDelete)
        products_local.save(productsDataModify)
        alert("Producto eliminado con éxito")
        showProducts()
        productIdInput.value = ""; 
    }
}

deleteForm.addEventListener("submit", handleDeleteProduct)

showProducts();
