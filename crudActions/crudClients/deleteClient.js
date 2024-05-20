import LocalStorageFile from '../../clsLocalStorage/clsLocalStorage.js'
import Valida from '../../components/validations.js'

const clients_local = new LocalStorageFile("clients")
const validador = new Valida()

const clientsData = clients_local.read()
const usersList = document.getElementById("usersList")
const deleteForm = document.getElementById("deleteForm")
const dniInput = document.getElementById("dni")

//Mostrar usuarios existentes en lista
function showUsers(){
    usersList.innerHTML = ""

    clientsData.forEach(client => {
        const li = document.createElement("li")
        li.textContent = `NOMBRE: ${client.nombre} - APELLIDO: ${client.apellido} - DNI: ${client.dni}`;
        usersList.appendChild(li)
    })
}

showUsers()

const handleDeleteClient = (e) => {
    const dniToDelete = dniInput.value.trim()

    if(!validador.cedula(dniToDelete)){
        e.preventDefault()
        alert("DNI invalido")
        return
    }
    
    let data = clients_local.find("dni", dniToDelete)
    if(data.length < 1){
        e.preventDefault()
        alert("El usuario no se encuentra registrado")
        return
    }else{
        const clientsDataModify = clientsData.filter(client => client.dni !== dniToDelete) 
        clients_local.save(clientsDataModify)
        alert("Usuario eliminado con éxito")
    }

}

deleteForm.addEventListener("submit", handleDeleteClient)
















