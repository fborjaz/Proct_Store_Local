import LocalStorageFile from "../../clsLocalStorage/clsLocalStorage.js";
import Valida from "../../components/validations.js";
import RegularClient from "../../class/regularCustomer.js";
import Product from "../../class/product.js";
import Sale from "../../class/sales.js";

//instancias
const clients_local = new LocalStorageFile("clients")
const products_local = new LocalStorageFile("products")
const sales_local = new LocalStorageFile("sales")
const validador = new Valida()

//objetos del dom
const dniFormClient = document.getElementById("formClient")
const idformProduct = document.getElementById("formProduct")
const inputDni = document.getElementById("dni")
const inputId = document.getElementById("id")
const inputAmount = document.getElementById("amount")
const productLi = document.getElementById("productLi")
const divLi = document.getElementById("divLi")
const formProductAmount = document.getElementById("formProductAmount")
const divLiClient = document.getElementById("divLiClient")
const clientLi = document.getElementById("clientLi")
const endSale = document.getElementById("endSale")

//Instancias
let clientInstance = null
let productInstance = null
let salesInstance = null
let dniClient = ""


const handleFormDni = (e) => {

    e.preventDefault()
    dniClient = inputDni.value.trim()

    if(!validador.cedula(dniClient)){
        alert("DNI invalido")
        return 
    }

    const clientData = clients_local.find("dni", dniClient)
    if(clientData.length > 0){
        const client = clientData[0]  //Cliente a instanciar en factura
        divLiClient.style.display = "block"
        clientLi.textContent = `${client.nombre}  ${client.apellido}`
        clientInstance = new RegularClient(client.nombre, client.apellido, client.dni, true)
        idformProduct.style.display = "block"
        console.log(clientInstance)
        dniFormClient.style.display = "none"
        endSale.style.display = "block"

    }else{
        alert("Cliente no encontrado")
        return
    }

}

const handleFromIdProduct = (e) => {

    e.preventDefault()
    const idProduct = parseInt(inputId.value)

    if(!validador.soloNumeros(idProduct)){
        alert("Id invalido")
        return
    }

    const dataProduct = products_local.find("id", idProduct)
    if(dataProduct.length > 0){
        const product = dataProduct[0] //instancer el producto
        productInstance = new Product(product.id, product.descripcion, product.precio, product.stock)
        console.log(productInstance)
        productLi.textContent = `${product.descripcion} $${product.precio}`
        divLi.style.display = "block"
        formProductAmount.style.display = "block"
        endSale.style.display = "none"

    }else{
        alert("No existe un producto con ese id")
        return
    }

}

const handleFormAmount = (e) => {

    e.preventDefault()
    const amount = (inputAmount.value)

    if(!validador.soloNumeros(amount)){
        alert("Cantidad invalida")
        return
    }

    if (clientInstance && clientInstance.dni) {
        if (!salesInstance || salesInstance.client.dni !== clientInstance.dni) {
            salesInstance = new Sale(clientInstance);
        }

        salesInstance.add_detail(productInstance, parseInt(amount));
        console.log(salesInstance);
    } else {
        console.log("No se puede acceder al atributo 'dni' de clientInstance.");
    }

    alert(`Prodcuto "${productInstance.descripcion}" comprado con éxito!`)
    formProductAmount.style.display = "none"
    divLi.style.display = "none"
    endSale.style.display = "block"
    inputId.value = ""
    inputAmount.value = ""
}

const handleClickEndSales = (e) => {
    if(salesInstance){
        alert("Compra exitosa!")
        let json = salesInstance.getJson()
        const dataSales = sales_local.read()
        if(dataSales.length > 0){
            const ult_invoice = dataSales[dataSales.length - 1]
            const new_facture = ult_invoice.factura + 1
            json.factura = new_facture
            dataSales.push(json)
            sales_local.save(dataSales)
        }else{
            dataSales.push(json)
            sales_local.save(dataSales)
        }
    }else{
        alert("No compró ningun producto, compra no realizada")
    }
}

dniFormClient.addEventListener("submit", handleFormDni)
idformProduct.addEventListener("submit", handleFromIdProduct)
formProductAmount.addEventListener("submit", handleFormAmount)
endSale.addEventListener("click", handleClickEndSales)









