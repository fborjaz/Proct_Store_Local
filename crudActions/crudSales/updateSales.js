import LocalStorageFile from "../../clsLocalStorage/clsLocalStorage.js";
import Valida from "../../components/validations.js";
import RegularClient from "../../class/regularCustomer.js";
import Product from "../../class/product.js";
import Sale from "../../class/sales.js";

//Instancias
const clients_local = new LocalStorageFile("clients")
const products_local = new LocalStorageFile("products")
const sales_local = new LocalStorageFile("sales")
const validador = new Valida()

//Objetos del DOM
const formNumFacture = document.getElementById("formNumFacture")
const inputNumFacture = document.getElementById("inputNumFacture")
const divLiSales = document.getElementById("divLiSales")
const saleLi = document.getElementById("saleLi")
const saleUl = document.getElementById("saleUl")
const updateSelectForm = document.getElementById("updateSelectForm")
const selectUpdate = document.getElementById("selectUpdate")
const formIdProduct = document.getElementById("formIdProduct")
const inputIdProduct = document.getElementById("inputIdProduct")
const formProductAmount = document.getElementById("formProductAmount")
const inputAmount = document.getElementById("inputAmount")
const divLiProduct = document.getElementById("divLiProduct")
const productLi = document.getElementById("productLi")
const formIdProductDelete = document.getElementById("formIdProductDelete")
const inputIdProductDelete = document.getElementById("inputIdProductDelete")

//variables
let facture = null // factura en cuestion
let productInstance = null //producto a añadir instancia
let clientInstance = null //CLiente intancia
let saleInstance = null

const handleSubmitNumFacture = (e) => {
    e.preventDefault()
    const numFacture = parseInt(inputNumFacture.value.trim()) //num de factura
    if(!validador.soloNumeros(numFacture)){
        alert("Número de factura inválido")
        return
    }
    const dataFactures = sales_local.find("factura", numFacture)
    if(dataFactures.length > 0){

        facture = dataFactures[0]
        divLiSales.style.display = "block"
        saleLi.textContent = `FACTURA: ${facture.factura} - CLIENTE: ${facture.cliente} - SUBTOTAL: ${facture.subtotal.toFixed(2)} - TOTAL: ${facture.total.toFixed(2)}`
        const detail_facture = facture.detalle
        detail_facture.forEach(det => {
            const li = document.createElement("li")
            li.textContent = `ID: ${det.id} PRODUCTO: ${det.producto} PRECIO: ${det.precio} CANTIDAD: ${det.cantidad}`
            saleUl.appendChild(li)
        })
        formNumFacture.style.display = "block"
        divLiSales.style.display = "block"
        updateSelectForm.style.display = "block"

    }else{
        alert("La factura no existe")
    }
}

const handleSelectForm = (e) => {
    e.preventDefault()
    const valueSelect = selectUpdate.value
    if(valueSelect == "addProductSale"){
        formIdProduct.style.display = "block"
        updateSelectForm.style.display = "none"
        
    }else if(valueSelect == "deleteProductSale"){
        formIdProductDelete.style.display = "block"
        updateSelectForm.style.display = "none"
    }
}

const handleInputIdProduct = (e) => {

    e.preventDefault()
    const idProduct = parseInt(inputIdProduct.value)
    if(!validador.soloNumeros(idProduct)){
        alert("Id invalido")
        return
    }

    const dataProduct = products_local.find("id", idProduct)
    if(dataProduct.length > 0){
        const productToIns = dataProduct[0] //Producto a instancear
        productInstance = new Product(productToIns.id, productToIns.descripcion, productToIns.precio, productToIns.stock)

        let clientToIns = clients_local.find("dni", facture.dni_de_cliente)
        clientToIns = clientToIns[0]
        clientInstance = new RegularClient(clientToIns.nombre, clientToIns.apellido, clientToIns.dni, true) // cliente a instancear
        formProductAmount.style.display = "block"

        productLi.textContent = `${productToIns.descripcion}`
        divLiProduct.style.display = "block"

    }else{
        alert("No existe el producto")
        return
    }

}

const handleProductAmount = (e) => {
    e.preventDefault()

    const amout = parseInt(inputAmount.value)
    if(!validador.soloNumeros(amout)){
        alert("Cantidad invalida")
        return
    }

    const detalles_product = facture.detalle //detalles para instancer de nuevo
    const num_facture = facture.factura //numero de factura para reemplazar
    let dataFacture = sales_local.read() 
    const indexFacture = dataFacture.findIndex(fac => fac.factura === num_facture) //indice de factura
    saleInstance = new Sale(clientInstance)

    detalles_product.forEach(det => {
        const product = new Product(det.id, det.producto, det.precio, det.stock)
        saleInstance.add_detail(product, det.cantidad)
    })
    saleInstance.add_detail(productInstance, amout) 
    
    const json_sales = saleInstance.getJson()
    json_sales.factura = num_facture

    dataFacture[indexFacture] = json_sales

    sales_local.save(dataFacture)

    alert("Producto agregado con éxito!")
    window.location.href = '../../templates/MenúVentas.html'
}

const handleFormProductDelete = (e) => {

    e.preventDefault()
    const idProductDelete = parseInt(inputIdProductDelete.value)
    if(!validador.soloNumeros(idProductDelete)){
        alert("Id invalido")
    }

    let detalle = facture.detalle
    //producto a eliminar
    const productDelete = detalle.find(product => product.id === idProductDelete)
    if(productDelete){
        let clientToIns = clients_local.find("dni", facture.dni_de_cliente)
        clientToIns = clientToIns[0]
        //Cliente instanciado
        clientInstance = new RegularClient(clientToIns.nombre, clientToIns.apellido, clientToIns.dni, true)
        //Instancia de sale
        saleInstance = new Sale(clientInstance)
        
        detalle = detalle.filter(det => det.id !== idProductDelete)

        //añadir detalles
        detalle.forEach(product => {
            const productAdd = new Product(product.id, product.producto, product.precio, product.stock)
            saleInstance.add_detail(productAdd, product.cantidad)
        })

        const json_sales = saleInstance.getJson()
        json_sales.factura = facture.factura
        let dataFacture = sales_local.read() 
        const indexFacture = dataFacture.findIndex(fac => fac.factura === facture.factura)
        dataFacture[indexFacture] = json_sales
        sales_local.save(dataFacture)
        alert("Producto eliminado con éxito!")
        window.location.href = '../../templates/MenúVentas.html'

    }else{
        alert("Un producto con ese id no existe en tu factura")
    }
}

formNumFacture.addEventListener("submit", handleSubmitNumFacture)
updateSelectForm.addEventListener("submit", handleSelectForm)
formIdProduct.addEventListener("submit", handleInputIdProduct)
formProductAmount.addEventListener("submit", handleProductAmount)
formIdProductDelete.addEventListener("submit", handleFormProductDelete)