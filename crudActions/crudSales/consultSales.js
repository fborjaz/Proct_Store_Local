import LocalStorageFile from "../../clsLocalStorage/clsLocalStorage.js";
import Valida from "../../components/validations.js";

const validador = new Valida()
const sales_local = new LocalStorageFile("sales")

//Objetos del dom
const selectConsult = document.getElementById("selectConsult")
const formNumFactura = document.getElementById("formNumFactura")
const inputNumFactura = document.getElementById("inputNumFactura")
const consultUl = document.getElementById("consultUl")

const handleSelectConsult = (e) => {
    if(e.target.value == "numFacture"){
        formNumFactura.style.display = "block"
        consultUl.innerHTML = ""

    }else if(e.target.value == "allFacture"){
        formNumFactura.style.display = "none"
        showAllFactures()
    }
}

const showAllFactures = () => {
    consultUl.innerHTML = ""
    const dataAllFactures = sales_local.read()
    dataAllFactures.forEach(fac => {
        let li = document.createElement("li")
        li.textContent = `FACTURA#${fac.factura} - FECHA: ${fac.fecha} - CLIENTE: ${fac.cliente} - SUBTOTAL: ${fac.subtotal.toFixed(2)} - TOTAL: ${fac.total.toFixed(2)} `
        fac.detalle.forEach(det => {
            let liDet = document.createElement("li")
            liDet.textContent = `PRODUCTO: ${det.producto} - PRECIO: ${det.precio} -  CANTIDAD: ${det.cantidad}`
            li.appendChild(liDet)
        })
        consultUl.appendChild(li)
    })
}

const handleNumFacture = (e) => {
    consultUl.innerHTML = ""
    e.preventDefault()
    const numFacture = parseInt(inputNumFactura.value)
    if(!validador.soloNumeros(numFacture)){
        alert("Numero de factura invalido")
    }
    let dataFacture = sales_local.find("factura", numFacture)

    if(dataFacture.length > 0){
       dataFacture = dataFacture[0]
       let li = document.createElement("Li")
       li.textContent = `FACTURA#${dataFacture.factura} - FECHA: ${dataFacture.fecha} - CLIENTE: ${dataFacture.cliente} - SUBTOTAL: ${dataFacture.subtotal.toFixed(2)} - TOTAL: ${dataFacture.total.toFixed(2)}`
       consultUl.appendChild(li)
       dataFacture.detalle.forEach(det => {
        const liDet = document.createElement("li")
        liDet.textContent = `PRODUCTO: ${det.producto} - PRECIO: ${det.precio} -  CANTIDAD: ${det.cantidad}`
        consultUl.appendChild(liDet)
    })
        
    }else{
        alert("No existe la factura")
    }
}   

selectConsult.addEventListener("change", handleSelectConsult)
formNumFactura.addEventListener("submit", handleNumFacture)









