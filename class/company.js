
export default class Company{
    static next = 0

    constructor(name = "SuperMaxi", ruc = "0943564322"){
        Company.next++
        this.id = Company.next
        this.business_name = name
        this.ruc = ruc
    }

    show(){
        console.log(`Id:${this._id} Empresa: ${this.business_name} ruc:${this.ruc}`)
    }

    getJson() {
        return { id: this._id, business_name: this.business_name, ruc: this.ruc };
    }

    static getBusinessName() {
        return "Empresa: Corporacion el Rosado ruc: 0876543294001";
    }

}












