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

export default class VipClient extends Client{

    constructor(first_name = "Consumidor", last_name = "Final", dni = "9999999999") {
        super(first_name, last_name, dni);
        this.limit = 10000;
        this.discount = 0
    }

    show() {
        console.log(`Cliente Vip: DNI:${this.dni} Nombre: ${this.first_name} ${this.last_name} Cupo: ${this.limit}`);
    }

    getJson() {
        return { dni: this.dni, nombre: this.first_name, apellido: this.last_name, valor: this.limit, discount: 0 };
    }

}
