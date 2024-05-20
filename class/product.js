
export default class Product{

    constructor(id = 0, descrip = "Ninguno", preci = 0, stock = 0){
        this.id = id
        this.descripcion = descrip
        this.precio = preci
        this.stock = stock
    }

    show() {
        console.log(`${this.id}  ${this.descripcion} ${this.precio}  ${this.stock}`);
    }

    getJson() {
        return { id: this.id, descripcion: this.descripcion, precio: this.precio, stock: this.stock };
    }

}






















