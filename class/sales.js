
class SaleDetail{

    static _line = 0

    constructor(product, quantity){
        SaleDetail._line++
        this.id = SaleDetail._line
        this.product = product
        this.precio = product.precio
        this.quantity = quantity
    }

    toString() {
        return `${this.id} ${this.product.descripcion} ${this.precio} ${this.quantity}`;
    }

}

export default class Sale{

    static next = 0
    static FACTOR_IVA = 0.12

    constructor(client){
        Sale.next++
        this.invoice = Sale.next
        this.date = new Date().toLocaleDateString()
        this.client = client
        this.subtotal = 0
        this.percentage_discount = client.discount;
        this.discount = 0
        this.iva = 0
        this.total = 0
        this.sale_detail = []
    }

    toString() {
        return `Factura# ${this.invoice} ${this.date} ${this.client.fullName()} ${this.total}`;
    }

    cal_iva(iva = 0.12, valor = 0) {
        return (valor * iva);
    }

    cal_discount(valor = 0, discount = 0) {
        return (valor * discount);
    }

    add_detail(prod, qty){
        let detail = new SaleDetail(prod, qty)
        this.subtotal += detail.precio*detail.quantity
        this.discount = this.cal_discount(this.subtotal, this.percentage_discount)
        this.iva = this.cal_iva(Sale.FACTOR_IVA, this.subtotal - this.discount)
        this.total = (this.subtotal + this.iva - this.discount)
        this.sale_detail.push(detail)
    }

    getJson() {
        let invoice = {
            factura: this.invoice,
            fecha: this.date,
            dni_de_cliente: this.client.dni,
            cliente: this.client.fullName(),
            subtotal: this.subtotal,
            descuento: this.discount,
            iva: this.iva,
            total: this.total,
            detalle: []
        };
        this.sale_detail.forEach(det => {
            invoice.detalle.push({
                id: det.product.id,
                producto: det.product.descripcion,
                precio: det.precio,
                cantidad: det.quantity,
                stock: det.product.stock
            });
        });
        return invoice;
    }

}

