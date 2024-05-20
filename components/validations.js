export default class Valida {

    soloNumeros(valor) {
        return /^\d+$/.test(valor);
    }

    soloLetras(valor) {
        return /^[A-Za-z]+$/.test(valor);
    }

    soloDecimales(valor) {
        return /^\d+(\.\d+)?$/.test(valor);
    }

    cedula(cedula) {
        return /^\d{10}$/.test(cedula) && parseInt(cedula.substr(0, 2)) <= 30;
    }

    validarEnteroYDecimal(entrada) {
        return /^\d+(\.\d+)?$/.test(entrada);
    }
}







