import LocalStorageFile from "../../clsLocalStorage/clsLocalStorage.js";
import Valida from "../../components/validations.js";

//componentes
const client_local = new LocalStorageFile("clients")
const validador = new Valida() 

//objetos del dom a utizar
const selectConsult = document.getElementById("selectConsult")
const dniForm = document.getElementById("formDni")
const inputDni = document.getElementById("dni")
const clientsList = document.getElementById("usersList")

//Traer datos del local
const dataClients = client_local.read()

//mostrar todos los clientes
const showAllClients = () => {
    dataClients.forEach(client => {
        const li = document.createElement("li")
        li.textContent = `NOMBRE: ${client.nombre} - APELLIDO: ${client.apellido} - DNI: ${client.dni} VALOR: ${client.valor}`;
        clientsList.appendChild(li)
    })
}

const handleChangeSelect = (e) => {
    if(e.target.value == "dni"){

        dniForm.style.display = "block"
        clientsList.style.display = "none"

    }else if(e.target.value == "allClients"){

        clientsList.innerHTML= ""
        dniForm.style.display = "none"
        showAllClients()
        clientsList.style.display = "block"

    }
}

const handleSubmitForm = (e) => {

    clientsList.innerHTML = ""
    
    e.preventDefault()
    const inputValue = inputDni.value
    if(!validador.cedula(inputValue.trim())){
        alert("Dni inválido")
        return
    }

    let client = client_local.find("dni", inputValue.trim())
    if(client.length > 0){
        client = client[0]
        const li = document.createElement("li")
        li.textContent = `NOMBRE: ${client.nombre} - APELLIDO: ${client.apellido} - DNI: ${client.dni} VALOR: ${client.valor}`
        clientsList.appendChild(li)
        clientsList.style.display = "block"
    }else{
        alert("El cliente no existe")
    }
    inputDni.value = ""
}


selectConsult.addEventListener("change", handleChangeSelect)
dniForm.addEventListener("submit", handleSubmitForm)



























