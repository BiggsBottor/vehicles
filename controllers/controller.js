"use strict";
/*-- valores del coche --*/
var _plate = document.querySelector("#plate"); //matrícula
var _brand = document.querySelector("#brand"); //marca
var _color = document.querySelector("#color"); //color
var sectionWheels = document.querySelector("#createWheelsForm");
var wheelsTxt = ["Front Left", "Front Right", "Back Left", "Back Right"];
var submitCar = document.querySelector("#createCarBtn");
var submitWheels = document.querySelector("#createWheelsBtn");
/*-- llama a la función al pulsar el botón --*/
submitCar.addEventListener("click", function () {
    createCar(_plate.value, _brand.value, _color.value);
    submitCar.disabled = true;
    submitCar.classList.toggle("btn-primary");
    submitCar.classList.toggle("btn-secondary");
    sectionWheels.classList.remove("d-none");
});
var currentCar;
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
var wheelBrand = document.querySelectorAll(".wheel_brand");
var wheelDiameter = document.querySelectorAll(".wheel_diameter");
var wheelsBrand = Array.prototype.slice.call(wheelBrand);
var wheelsDiameter = Array.prototype.slice.call(wheelDiameter);
submitWheels.addEventListener("click", function () {
    CreateWheels(currentCar);
    submitWheels.disabled = true;
    submitWheels.classList.toggle("btn-primary");
    submitWheels.classList.toggle("btn-secondary");
});
/*-- crea ruedas de 1 en 1 para pasarle al coche creado --*/
function createWheel(diameter, brand) {
    var w = new Wheel(diameter, brand);
    currentCar.addWheel(w);
}
/*-- obtiene los datos de las ruedas para añadirlas al coche actual y mostralo por pantalla --*/
function CreateWheels(c) {
    for (var w_1 = 0; w_1 < 4; w_1++) {
        // añadiendo el símbolo "+" delante de la variable, se convierte en tipo number
        createWheel(+wheelsDiameter[w_1].value, wheelsBrand[w_1].value);
    }
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
    for (var i = 0; i < w.length; i++) {
        var node = wheelsTxt[i] + "=> <b>Brand:</b> " + w[i].brand + " <b>Diameter:</b> " + w[i].diameter + "<br>";
        p.innerHTML += node;
    }
    section.appendChild(p);
}
