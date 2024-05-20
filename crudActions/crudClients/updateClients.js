import LocalStorageFile from '../../clsLocalStorage/clsLocalStorage.js'
import Valida from '../../components/validations.js'

const client_local = new LocalStorageFile("clients")
const validador = new Valida()

const clientsData = client_local.read()
const usersList = document.getElementById("usersList")
const updateForm = document.getElementById("updateForm")
const updateFormAfter = document.getElementById("updateFormAfter")
const dniInput = document.getElementById("dni")

function showUsers(){
    usersList.innerHTML = ""

    clientsData.forEach(client => {
        const li = document.createElement("li")
        li.textContent = `NOMBRE: ${client.nombre} - APELLIDO: ${client.apellido} - DNI: ${client.dni} - VALOR: ${client.valor}`;
        usersList.appendChild(li)
    })
}
showUsers()

const handleUpdateClient = (e) => {

    e.preventDefault()
    const dni = dniInput.value
    
    if(!validador.cedula(dni)){
        alert("DNI inválido")
        return
    }

    //Encontrar el usuario
    let client = client_local.find("dni", dni)
    if(client.length > 0){
        client = client[0]
        updateFormAfter.style.display = "block"
        const p_client = document.getElementById("clientUpdate")
        const input_nombre = document.getElementById("nombreClient")
        const input_apellido = document.getElementById("apellidoClient")
        const input_valor = document.getElementById("valorClient")
        p_client.textContent = ` Cliente a actualizar: ${client.nombre} ${client.apellido}`
        input_nombre.value = client.nombre
        input_apellido.value = client.apellido
        input_valor.value = client.valor
    }else{
        alert("El usuario no está registrado")
        return
    }
}

const handleUpdateClientAfter = (e) => {
    e.preventDefault()
    const input_nombre = document.getElementById("nombreClient")
    const input_apellido = document.getElementById("apellidoClient")
    const input_valor = document.getElementById("valorClient")
    
    if(!validador.soloLetras(input_nombre.value) || (!validador.soloLetras(input_apellido.value)) || (!validador.validarEnteroYDecimal(input_valor.value))){
        alert("Ingresaste un campo incorrecto, revise")
        return
    }

    const dni = dniInput.value
    let client = client_local.find("dni", dni)
    const client_id = client[0].dni
    const updatedClientsData = clientsData.map(client => {
        if (client.dni === client_id) {
            client.nombre = input_nombre.value;
            client.apellido = input_apellido.value;
            client.valor = input_valor.value
        }
        return client;
    });
    
    alert("Cliente modificado con éxito")
    client_local.save(updatedClientsData)
    window.location.href = '../../templates/MenúClients.html'
}

updateFormAfter.addEventListener("submit", handleUpdateClientAfter)
updateForm.addEventListener("submit", handleUpdateClient)
