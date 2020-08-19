
class Operador{
    constructor(nombre, edad, mail){
        this.nombre = nombre;
        this.edad = edad;
        this.mail = mail;
    }
    
    toString(){
        return this.nombre + " " + this.edad + " " + this.mail;
    }  
    verificarNoBlanco(){
        if(this.nombre == "" || this.edad == "" || this.mail == ""){
            return false;
        }else{
            return true;
        }
    }
    checkeaMail(){
        if(this.mail.includes("@") && this.mail.includes(".")){
            for(let i = this.mail.length - 1; i >= 0; i--){
                let char = this.mail.charAt(i);
                for(let j = this.mail.length - 1; j >= 0; j--){
                    if(char == "."){
                        return true;
                    } else if(char == "@"){
                        return false;
                    }
                }
            }
        }
        return false;
    }
    checkeaEdad(){
        if(this.edad > 65 || this.edad < 18){
            return false;
        }
        return true;
    }
}


class Telecentro{
    constructor(){
        this.listaOperadores = [];
        this.listaLlamadas = [];
    }

    verificarNoRepetido(operador) {
        for (let i = 0; i < this.listaOperadores.length; i++) {
            if (this.listaOperadores[i].toString() == operador.toString()) {
                return false;
            }
        }
        return true;
    }

    agregarOperador(operador){
        this.listaOperadores.push(operador);
    }

    agregarLlamada(llamada){
        this.listaLlamadas.push(llamada);
    }
    mostrarOperadores(){
        for(let i = 0; i<this.listaOperadores.length; i++){
            alert(this.listaOperadores[i]);
        }
    }
    mostrarLlamadas(){

    }
}

class Llamada{
    constructor(numero, operador, descripcion, motivo, duracion, celular){
        this.numero = numero,
        this.operador = operador,
        this.descripcion = descripcion,
        this.motivo = motivo,
        this.duracion = duracion,
        this.celular = celular
    }
    toString(){
        return this.numero + " " + this.operador + " " + this.descripcion + " " + this.motivo + " " + this.duracion + " " + this.celular;
    }
    verificarNoBlancoLlamada(){
        if(this.numero == "" || this.descripcion == "" || this.motivo == "" || this.celular == "" || this.duracion == ""){
            return false;
        }else{
            return true;
        }
    }
    verificarCelularNoLetras(){
        for(let i = 0; i<this.celular.length; i++){
            let caracter = this.celular.charAt(i);
            if ((caracter.charCodeAt() < "/".charCodeAt()) || (caracter.charCodeAt() > ":".charCodeAt())){
                return false;
            }
        }
        return true;
    }
    verificarCelularCeroNueve(){
        if(this.celular.charAt(0)== 0 && this.celular.charAt(1) == 9 && this.celular.charAt(2) != 0){
            return true;
        } else{
            return false;
        }
    }
}