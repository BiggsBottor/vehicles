"use strict";
/*-- valores del coche --*/
var _plate = document.querySelector("#plate"); //matrícula
var _brand = document.querySelector("#brand"); //marca
var _color = document.querySelector("#color"); //color
/*-- patrón para comprobar la matrícula --*/
var platePattern = /\d{4}[A-Z]{3}/;
var rePlate = new RegExp(platePattern);
/*-- botones de creación --*/
var submitCar = document.querySelector("#createCarBtn");
var submitWheels = document.querySelector("#createWheelsBtn");
/*-- llama a la función al pulsar el botón --*/
submitCar.addEventListener("click", function () {
    if (_plate.value != "" && _brand.value != "" && _color.value != "") {
        if (rePlate.test(_plate.value)) {
            createCar(_plate.value, _brand.value, _color.value);
            submitCar.disabled = true;
            submitCar.classList.toggle("btn-primary");
            submitCar.classList.toggle("btn-secondary");
            sectionWheels.classList.remove("d-none");
        }
        else {
            alert("El formato de matr\u00EDcula correcto es 0000AAA");
        }
    }
    else {
        alert("Por favor, rellena los espacios en blanco");
    }
});
var currentCar; // variable de control para mantener los datos creados del coche
/*-- crea y añade el HTML para mostrar los datos recogidos --*/
function createCar(plate, brand, color) {
    var car = new Car(plate, color, brand);
    currentCar = car;
    var section = document.querySelector("#carInfo");
    section.innerHTML = "";
    //crea el titulo
    var h4 = document.createElement("h4");
    h4.classList.add("mb-4");
    var node1 = document.createTextNode("Car:");
    h4.appendChild(node1);
    section.appendChild(h4);
    //crea el texto del coche
    var p = document.createElement("p");
    var node2 = "<b>PLATE</b>: " + plate + ", <b>BRAND</b>: " + brand + ", <b>COLOR</b>: " + color;
    p.innerHTML = node2;
    section.appendChild(p);
}
/*-- sección de las ruedas --*/
var sectionWheels = document.querySelector("#createWheelsForm");
var wheelsTxt = ["Front Left", "Front Right", "Back Left", "Back Right"];
var wheelBrand = document.querySelectorAll(".wheel_brand"); //marcas de las ruedas
var wheelDiameter = document.querySelectorAll(".wheel_diameter"); //diámetro de las ruedas
var wheelsBrand = Array.prototype.slice.call(wheelBrand); //array de las marcas
var wheelsDiameter = Array.prototype.slice.call(wheelDiameter); // array de los diámteros
var brk = false; // variable que controla si habrá errores
submitWheels.addEventListener("click", function () {
    var empty = 0;
    for (var w = 0; w < 4; w++) {
        if (wheelsDiameter[w].value != "" && wheelsBrand[w].value != "") {
            empty++;
        }
        else {
            alert("Por favor, rellena los espacios en blanco");
            break;
        }
    }
    if (empty == 4) {
        CreateWheels(currentCar);
        if (!brk) { // si no han habido errores, se inhabilita el botón
            submitWheels.disabled = true;
            submitWheels.classList.toggle("btn-primary");
            submitWheels.classList.toggle("btn-secondary");
        }
    }
});
/*-- crea ruedas de 1 en 1 para pasarle al coche creado --*/
function createWheel(diameter, brand) {
    var w = new Wheel(diameter, brand);
    currentCar.addWheel(w);
}
/*-- obtiene los datos de las ruedas para añadirlas al coche actual y mostralo por pantalla --*/
function CreateWheels(c) {
    brk = false;
    for (var w = 0; w < 4; w++) {
        // añadiendo el símbolo "+" delante de la variable, se convierte en tipo number
        if (isNaN(+wheelsDiameter[w].value)) { // "NO es un numero"            
            brk = true;
            alert("El diametro de la rueda DEBE ser un número");
            break;
        }
        else { // "Es un numero"            
            if (+wheelsDiameter[w].value > 0.4 && +wheelsDiameter[w].value < 2) {
                createWheel(+wheelsDiameter[w].value, wheelsBrand[w].value);
            }
            else {
                brk = true;
                alert("el diámetro de la rueda debe ser entre 0.4 y 2 (no incluidos)");
                break;
            }
        }
    }
    if (!brk) //si no se ha interrumpido el rellenado de las ruedas del coche, se muestran por pantalla
     {
        var section = document.querySelector("#wheelsInfo");
        section.innerHTML = "";
        //crea el titulo
        var h4 = document.createElement("h4");
        h4.classList.add("mb-4");
        var node1 = document.createTextNode("Wheels:");
        h4.appendChild(node1);
        section.appendChild(h4);
        //crea el texto de las ruedas
        var p = document.createElement("p");
        var w = c.wheels;
        debugger;
        for (var i = 0; i < w.length; i++) {
            var node = wheelsTxt[i] + "=> <b>Brand:</b> " + w[i].brand + " <b>Diameter:</b> " + w[i].diameter + "<br>";
            p.innerHTML += node;
        }
        section.appendChild(p);
    }
    else //si se ha interrumpido el rellenado del array de ruedas, se vacia
     {
        if (c.wheels.length < 4) {
            c.wheels.length = 0;
        }
    }
}
