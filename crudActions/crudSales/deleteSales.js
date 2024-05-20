import LocalStorageFile from "../../clsLocalStorage/clsLocalStorage.js";
import Valida from "../../components/validations.js";

const sales_local = new LocalStorageFile("sales")
const validador = new Valida()

const formNumFacture = document.getElementById("formNumFacture")
const inputNumFacture = document.getElementById("inputNumFacture")
const divLiSales = document.getElementById("divLiSales")
const saleUl = document.getElementById("saleUl")
const saleLi = document.getElementById("saleLi")
const ButtonDelete = document.getElementById("buttonDeleteSale")

let numFacture = null

const handleFormNumFacture = (e) => {
    e.preventDefault()

    numFacture = parseInt(inputNumFacture.value)
    if(!validador.soloNumeros(numFacture)){
        alert("Numero de factura invalido")
        return
    }

    let dataFacture = sales_local.find("factura", numFacture)
    if(dataFacture.length > 0){
        const factura = dataFacture[0]
        const detalles = factura.detalle
        saleLi.textContent = `FACTURA#${factura.factura} - CLIENTE: ${factura.cliente} - FECHA: ${factura.fecha} - TOTAL: ${factura.total.toFixed(2)}`
        console.log(detalles)
        detalles.forEach(det => {
            const li = document.createElement("Li")
            li.textContent = `PRODUCTO: ${det.producto}  CANTIDAD: ${det.cantidad} PRECIO: ${det.precio}`
            saleUl.appendChild(li)
        })
        divLiSales.style.display = "block"

    }else{ 
        alert("No existe la factura")
    }
}

const handleDeleteSale = (e) => {
    e.preventDefault()
    let dataFacture = sales_local.read()
    dataFacture = dataFacture.filter(fac => fac.factura !== numFacture)
    sales_local.save(dataFacture)
    alert(`La factura #${numFacture} ha sido eliminada con éxito`)
    window.location.href = '../../templates/MenúVentas.html'
}

formNumFacture.addEventListener("submit", handleFormNumFacture)
ButtonDelete.addEventListener("click", handleDeleteSale)


















