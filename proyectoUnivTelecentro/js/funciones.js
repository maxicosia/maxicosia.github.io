
//Creamos la clase telecentro
let telecentro = new Telecentro();
window.addEventListener("load", inicio);
// Numero de las llamadas
let num = 1;

//Funcion nexo HTML ---> JS
function inicio() {
    document.getElementById("agregarOperador").addEventListener("click", agregarOperador);
    document.getElementById("agregarOperador").addEventListener("click", agregarSelect);
    document.getElementById("agregarOperador").addEventListener("click", agregarSelectConsultar);
    document.getElementById("radioNombre").addEventListener("click", visualizarOperadores);
    document.getElementById("radioEdad").addEventListener("click", visualizarOperadores);
    document.getElementById("agregarLlamadas").addEventListener("click", agregarLlamada);
    document.getElementById("radioNombreNumero").addEventListener("click", visualizarLlamadas);
    document.getElementById("radioNumero").addEventListener("click", visualizarLlamadas);
    document.getElementById("botonConsultaHistoriaOperador").addEventListener("click", consultarOperador);
    document.getElementById("botonConsultarDuracion").addEventListener("click", consultarPorLlamadas);
    document.getElementById("botonPalabraConsultas").addEventListener("click", consultaPalabras);
    document.getElementById("distribucionConsultas").addEventListener("click", graficar)
}


// Funcion agregar operador a la lista de operadores en la clase Telecentro
function agregarOperador() {
    let operador = new Operador();

    //Asignacion de valores al objeto
    operador.nombre = document.getElementById("nombreRegistroOperador").value;
    operador.edad = document.getElementById("edadRegistroOperador").value;
    operador.mail = document.getElementById("mailRegistroOperador").value;

    //Checkea que no este en blanco / Los datos estan bien puestos
    if (operador.verificarNoBlanco() && telecentro.verificarNoRepetido(operador) && operador.checkeaMail() && operador.checkeaEdad()) {
        telecentro.agregarOperador(operador);
        document.getElementById("formRegistroOperador").reset();
    } else {
        alert("Ese operador ya existe o posee caracteres no válidos.");
    }

    //Visualiza los Operadores
    visualizarOperadores();
}

// Funcion agrega los operadores al select de las llamadas
function agregarSelect() {
    //Resetea select
    document.getElementById("operadorLlamadas").innerHTML = "";

    //Agrega los operadores nuevos al select
    for (let i = 0; i < telecentro.listaOperadores.length; i++) {
        let node = document.createElement("OPTION");
        let textNode = document.createTextNode(telecentro.listaOperadores[i].nombre);
        node.appendChild(textNode);
        document.getElementById("operadorLlamadas").appendChild(node);
    }
}

// Funcion agrega los operadores al select de las consultas
function agregarSelectConsultar() {
    //Resetea select
    document.getElementById("consultaOperador").innerHTML = "";

    //Agrega los operadores nuevos al select
    for (let i = 0; i < telecentro.listaOperadores.length; i++) {
        let node = document.createElement("OPTION");
        let textNode = document.createTextNode(telecentro.listaOperadores[i].nombre);
        node.appendChild(textNode);
        document.getElementById("consultaOperador").appendChild(node);
    }
}

// Funcion visualiza a todos los operadores en una lista no numerada
function visualizarOperadores() {
    //Resetea la visualizacion
    document.getElementById("visualOperadores").innerHTML = "";

    //Se fija cual radio button esta activado
    if (document.getElementById("radioNombre").checked) {
        ordenarNombre();
    } else if (document.getElementById("radioEdad").checked) {
        ordenarEdad();
    }

    //Visualiza a partir de listOperadores en la clase Telecentro
    for (let i = 0; i < telecentro.listaOperadores.length; i++) {
        let node = document.createElement("LI");
        let textNode = document.createTextNode(telecentro.listaOperadores[i].toString());
        node.appendChild(textNode);
        document.getElementById("visualOperadores").appendChild(node);
    }
}

//Ordena la lista de operadores por nombre
function ordenarNombre() {
    /* telecentro.listaOperadores.sort(); */
    telecentro.listaOperadores.sort(function (a, b) {
        if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
            return 1;
        }
        if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
            return -1;
        }
        return 0;
    });
}

//Ordena la lista de operadores por edad
function ordenarEdad() {
    telecentro.listaOperadores.sort((a, b) => (a.edad > b.edad) ? 1 : -1);
}

//Ordena la lista de llamadas por numero
function ordenarNumero() {
    telecentro.listaLlamadas.sort(function (a, b) {
        if (a.numero > b.numero) {
            return 1;
        }
        if (a.numero < b.numero) {
            return -1;
        }
        return 0;
    });
}

//Ordena la lista de llamadas por nombre y luego numero
function ordenarNombreNumero() {
    telecentro.listaLlamadas.sort(function (a, b) {
        if (a.operador > b.operador) {
            return 1;
        }
        if (a.operador < b.operador) {
            return -1;
        }
        return 0;
    });
}

// Funcion para agregar llamadas a la lista de llamadas en la clase telecentro
function agregarLlamada() {
    //Crear llamada generica
    let llamada = new Llamada();

    //Asignacion de valores al objeto
    llamada.numero = num.toString();
    llamada.operador = document.getElementById("operadorLlamadas").value;
    llamada.descripcion = document.getElementById("descripcionLlamadas").value;
    llamada.motivo = parseInt(document.getElementById("motivoLlamadas").value);
    llamada.duracion = document.getElementById("duracionLlamadas").value;
    llamada.celular = document.getElementById("celularLlamadas").value;

    //Checkea que no este en blanco / Los datos estan bien puestos
    if (document.getElementById("formRegistroLlamadas").checkValidity()) {
        if (llamada.verificarCelularNoLetras() && llamada.verificarCelularCeroNueve()) {
            telecentro.agregarLlamada(llamada);
            document.getElementById("formRegistroLlamadas").reset();
            num++;
        } else {
            alert("El celular posee caracteres invalidos.")
        }
    } else {
        alert("Esa llamada posee datos incorrectos, o faltan introducir algunos.")
    }

    //Visualizar Llamadas
    visualizarLlamadas();
}

// Funcion que visualiza las llamadas por una tabla
function visualizarLlamadas() {
    //Crea cuerpo de tabla
    let body = document.getElementById("bodyTablaLlamadas");

    //Resetea tabla
    body.innerHTML = "";

    let lista = telecentro.listaLlamadas;

    //Se fija cual radio boton esta activado y ordena
    if (document.getElementById("radioNumero").checked) {
        ordenarNumero();
    } else if (document.getElementById("radioNombreNumero").checked) {
        ordenarNombreNumero();
    }

    //Agrega a la tabla
    for (let i = 0; i < lista.length; i++) {
        let fila = body.insertRow();
        let dato = lista[i];
        for (let j in dato) {
            let celda = fila.insertCell();
            celda.innerHTML = dato[j];

            //Reemplaza el numero del motivo por la imagen
            if (dato[j] === dato.motivo) {
                celda.innerHTML = "";
                switch (dato.motivo) {
                    case 1:
                        let img1 = document.createElement("img");

                        img1.src = "img/1.png";
                        img1.height = "25";
                        img1.width = "25";

                        celda.appendChild(img1);
                        break;
                    case 2:
                        let img2 = document.createElement("img");

                        img2.src = "img/2.png";
                        img2.height = "25";
                        img2.width = "25";

                        celda.appendChild(img2);
                        break;
                    case 3:
                        let img3 = document.createElement("img");

                        img3.src = "img/3.png";
                        img3.height = "25";
                        img3.width = "25";

                        celda.appendChild(img3);
                        break;
                    case 4:
                        let img4 = document.createElement("img");

                        img4.src = "img/4.png";
                        img4.height = "25";
                        img4.width = "25";

                        celda.appendChild(img4);
                        break;
                    case 5:
                        let img5 = document.createElement("img");

                        img5.src = "img/5.png";
                        img5.height = "25";
                        img5.width = "25";

                        celda.appendChild(img5);
                        break;
                    case 6:
                        let img6 = document.createElement("img");

                        img6.src = "img/6.png";
                        img6.height = "25";
                        img6.width = "25";

                        celda.appendChild(img6);
                        break;
                    default:
                        alert("Something went terribly, terribly wrong.");
                        break;
                }
            }
        }
    }
}

// Funcion nexo a la funcionalidad de las consultas
function consultarOperador() {
    let nombreOperador = document.getElementById("consultaOperador").value

    if(!document.getElementById("consultaOperador").value == ""){
        motivosNoAtendio(nombreOperador);
        llamadaMasLarga(nombreOperador);
        promedioLlamada(nombreOperador);
    }else{
        alert("Debe seleccionar a un operador.")
    }
}

// Funcion para los motivos que los operadores no tuvieron
function motivosNoAtendio(operador) {
    //Revela todos los motivos
    document.getElementById("uno").style.display = "inline-block";
    document.getElementById("dos").style.display = "inline-block";
    document.getElementById("tres").style.display = "inline-block";
    document.getElementById("cuatro").style.display = "inline-block";
    document.getElementById("cinco").style.display = "inline-block";
    document.getElementById("seis").style.display = "inline-block";

    for (let i = 0; i < telecentro.listaLlamadas.length; i++) {

        let llamada = telecentro.listaLlamadas[i];
        if (llamada.operador == operador) {
            switch (llamada.motivo) {
                case 1:
                    document.getElementById("uno").style.display = "none";
                    break;
                case 2:
                    document.getElementById("dos").style.display = "none";
                    break;
                case 3:
                    document.getElementById("tres").style.display = "none";
                    break;
                case 4:
                    document.getElementById("cuatro").style.display = "none";
                    break;
                case 5:
                    document.getElementById("cinco").style.display = "none";
                    break;
                case 6:
                    document.getElementById("seis").style.display = "none";
                    break;
                default:
                    alert("Something went terribly, terribly wrong.");
                    break;
            }
        }
    }
}

// Funcion que revela la llamada mas larga del operador
function llamadaMasLarga(operador) {
    //Definimos variables default
    let masLarga = -1;
    let llamadaMasLarga = 0;

    //Recorremos lista de llamadas
    for (let i = 0; i < telecentro.listaLlamadas.length; i++) {
        //Tomamos una llamada
        let llamada = telecentro.listaLlamadas[i];

        //Busca las llamadas con el nombre insertado en el select
        if (llamada.operador == operador) {

            //Checkea si la llamada es mas larga
            if (parseInt(llamada.duracion) > masLarga) {

                //Cambia los valores a los correspondientes mas grandes
                masLarga = parseInt(llamada.duracion);
                llamadaMasLarga = llamada.numero;
            }
        }
    }
    //Inserta el texto en el parrafo
    document.getElementById("largoLlamada").innerHTML = "Numero: " + llamadaMasLarga + " Duración: " + masLarga;
}

//Funcion que revela el promedio por llamada de los operadores
function promedioLlamada(operador) {
    let suma = 0;
    let div = 0;

    for (let i = 0; i < telecentro.listaLlamadas.length; i++) {
        let llamada = telecentro.listaLlamadas[i];
        if (llamada.operador == operador) {
            div++;
            suma = suma + parseInt(llamada.duracion);
        }
    }

    document.getElementById("promedioLlamada").innerHTML = "Tiempo promedio de atención: " + suma / div;
}

// Funcion que consulta que operadores tuvieron llamadas de largo indicado
function consultarPorLlamadas() {
    document.getElementById("listaConsultarDuracion").innerHTML = "";
    let consultarDuracion = document.getElementById("duracionLlamadaConsultas").value;
    let lista = [];

    for (let i = 0; i < telecentro.listaLlamadas.length; i++) {
        if (consultarDuracion == telecentro.listaLlamadas[i].duracion) {
            if (!lista.includes(telecentro.listaLlamadas[i].operador)) {
                lista.push(telecentro.listaLlamadas[i].operador);
                document.getElementById("listaConsultarDuracion").innerHTML = "";
                for (let k = 0; k < lista.length; k++) {
                    let node = document.createElement("LI");
                    let textNode = document.createTextNode(lista[k]);
                    node.appendChild(textNode);
                    document.getElementById("listaConsultarDuracion").appendChild(node);
                }
            }
        }
    }
}

//Funcion que busca descripciones con ciertas palabras
function consultaPalabras() {
    let aux = [];

    let entrada = document.getElementById("palabraConsultas").value;
    let entradaArray = [];
    entradaArray = entrada.split(" ");

    for(let i = 0; i < telecentro.listaLlamadas.length; i++){
        let cant = 0;
        let descripcion = telecentro.listaLlamadas[i].descripcion;
        let descripcionArray = [];
        descripcionArray = descripcion.split(" ");

        for(let j = 0; j < entradaArray.length; j++){
            if(descripcion.includes(entradaArray[j])){
                cant++;
            }
        }

        if(cant > (descripcionArray.length)/2){
            aux.push(descripcion);
        }
    }
    visualizarConsultaPalabras(aux);
}

// Visualiza la consulta de las palabras a través de una tabla
function visualizarConsultaPalabras(aux) {
    //Crea cuerpo de tabla
    let body = document.getElementById("bodyTablaPalabras");
    body.innerHTML = "";

    let lista = telecentro.listaLlamadas;


    //Agrega a la tabla
    for (let i = 0; i < lista.length; i++) {
        for(let k = 0; k < aux.length; k++){
            if(lista[i].descripcion == aux[k]){
                let fila = body.insertRow();
                let dato = lista[i];
    
                for (let j in dato) {
                    let celda = fila.insertCell();
                    celda.innerHTML = dato[j];
        
                    //Reemplaza el numero del motivo por la imagen
                    if (dato[j] === dato.motivo) {
                        celda.innerHTML = "";
                        switch (dato.motivo) {
                            case 1:
                                let img1 = document.createElement("img");
    
                                img1.src = "img/1.png";
                                img1.height = "25";
                                img1.width = "25";
        
                                celda.appendChild(img1);
                                break;
                            case 2:
                                let img2 = document.createElement("img");
        
                                img2.src = "img/2.png";
                                img2.height = "25";
                                img2.width = "25";
        
                                celda.appendChild(img2);
                                break;
                            case 3:
                                let img3 = document.createElement("img");
        
                                img3.src = "img/3.png";
                                img3.height = "25";
                                img3.width = "25";
        
                                celda.appendChild(img3);
                                break;
                            case 4:
                                let img4 = document.createElement("img");
        
                                img4.src = "img/4.png";
                                img4.height = "25";
                                img4.width = "25";
        
                                celda.appendChild(img4);
                                break;
                            case 5:
                                let img5 = document.createElement("img");
        
                                img5.src = "img/5.png";
                                img5.height = "25";
                                img5.width = "25";
        
                                celda.appendChild(img5);
                                break;
                            case 6:
                                let img6 = document.createElement("img");
        
                                img6.src = "img/6.png";
                                img6.height = "25";
                                img6.width = "25";
        
                                celda.appendChild(img6);
                                break;
                            default:
                                alert("Something went terribly, terribly wrong.");
                                break;
                        }
                    }
                }
            }
        }
        
    }
}

// Funcion nexo para la grafica de Google Charts
function graficar(){
    document.getElementById("grafica").innerHTML = "";
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
}

// Dibujar la grafica de Google Charts
function drawChart(){
    var data = new google.visualization.DataTable();

    data.addColumn("string", "Operadores");
    data.addColumn("number", "Numero de Llamadas");

    data.addRows(telecentro.listaOperadores.length);
    
    for(let k = 0; k < telecentro.listaOperadores.length; k++){
        let nombre = telecentro.listaOperadores[k].nombre;
        let num = 0;
        for(let i = 0; i < telecentro.listaLlamadas.length; i++){
    
            for(let j = 0; j < telecentro.listaLlamadas.length; j++){ 
                if(telecentro.listaLlamadas[j].operador == nombre){
                        num++;
                }
            }
        }
        data.setCell(k ,0 , nombre);
        data.setCell(k ,1 , num);
    }
    
    
    var options = {'title':'Distribucion de llamadas', 'width':400, 'height':250, "backgroundColor":"transparent"};
      
    var chart = new google.visualization.PieChart(document.getElementById('grafica'));
    chart.draw(data, options);
}
