import LocalStorageFile from '../../clsLocalStorage/clsLocalStorage.js'
import RegularClient from '../../class/regularCustomer.js'
import VipClient from '../../class/vipCustomer.js'
import Valida from '../../components/validations.js'

//Formulario y selects para los eventos
const formulary = document.getElementById("fromClient")
const clientTypeSelect = document.getElementById("client_type")
const cardSelect = document.getElementById("card")
const cardLabel = document.querySelector('label[for="card"]')

//Eventos de estilos de select
clientTypeSelect.addEventListener("change", () => {
    if(clientTypeSelect.value == "regular"){
        cardSelect.style.display = "block"
        cardLabel.style.display = "block"
    }else{
        cardSelect.style.display = "none"
        cardLabel.style.display = "none"
    }
})

const validador = new Valida()

const handleCreateClient = (e) => {

    e.preventDefault()
    
    const name = document.getElementById("name")
    const lastName = document.getElementById("last_name")
    const dni = document.getElementById("dni")
    const clientType = document.getElementById("client_type")
    const local_clients = new LocalStorageFile("clients")

    if (!validador.soloLetras(name.value) || !validador.soloLetras(lastName.value) || !validador.cedula(dni.value)) {
        alert("Por favor, verifica que los campos Nombre, Apellido y DNI sean válidos.");
        return; // Detener el proceso si los datos no son válidos
    }

    let data = local_clients.find("dni", dni.value)
    const dataClients = local_clients.read()

    if(data.length > 0){

        alert("Ya existe un usuario con ese dni")
        return

    }else{

        if(clientType.value == "regular"){
            const card = cardSelect.value
            if(card == "true"){
                const regular_client = new RegularClient(name.value, lastName.value, dni.value, true)
                const json_client = regular_client.getJson()
                dataClients.push(json_client)
                local_clients.save(dataClients)
    
            }else if(card == "false"){ 
                const regular_client = new RegularClient(name.value, lastName.value, dni.value, false)
                const json_client = regular_client.getJson()
                dataClients.push(json_client)
                local_clients.save(dataClients)
            } 
    
        }else if(clientType.value == "vip"){
            const vip_client = new VipClient(name.value, lastName.value, dni.value)
            const json_client = vip_client.getJson()
            dataClients.push(json_client)
            local_clients.save(dataClients)
        } 

    }
    
    alert("Cliente Registrado con éxito!")
    name.value = ""
    lastName.value = ""
    dni.value = ""
}

//evento de envio de formulario
formulary.addEventListener("submit", handleCreateClient)







