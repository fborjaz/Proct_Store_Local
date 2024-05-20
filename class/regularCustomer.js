class Client{

    constructor(first_name = "Consumidor", last_name = "Final", dni = "0934215678"){
        this.first_name = first_name
        this.last_name = last_name
        this.dni = dni
    }   

    fullName() {
        return this.first_name + ' ' + this.last_name;
    }

    show() {
        console.log(`${this.fullName()}  ${this.dni}`);
    }

    getJson() {
        return { dni: this.dni, nombre: this.first_name, apellido: this.last_name };
    }

}

export default class RegularClient extends Client{

    constructor(first_name = "Cliente", last_name="Final", dni = "0934215678", card = false){
        super(first_name, last_name, dni)
        this.discount = card ? 0.10 : 0
    }

    show() {
        console.log(`Cliente Minorista: DNI:${this.dni} Nombre:${this.first_name} ${this.last_name} Descuento:${this.discount * 100}%`);
    }
    
    getJson() {
        return { dni: this.dni, nombre: this.first_name, apellido: this.last_name, valor: this.discount };
    }

}













