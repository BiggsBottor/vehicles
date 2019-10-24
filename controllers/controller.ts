/*-- valores del coche --*/
var _plate = <HTMLInputElement>document.querySelector("#plate"); //matrícula
var _brand = <HTMLInputElement>document.querySelector("#brand"); //marca
var _color = <HTMLInputElement>document.querySelector("#color"); //color

/*-- llama a la función al pulsar el botón --*/
var submit = <HTMLElement>document.querySelector("#createCar");
submit.addEventListener("click", function() {
    createCar(_plate.value, _brand.value, _color.value)
});

/*-- crea y añade el HTML para mostrar los datos recogidos --*/
function createCar(plate:string,brand:string,color:string){
    let car=new Car(plate,color,brand);
    let section = <HTMLElement>document.querySelector("#carInfo");
    section.innerHTML = "";
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    let node1 = document.createTextNode("Car:");
    let node2 = `<b>PLATE</b>: ${plate} <br><b>BRAND</b>: ${brand} <br><b>COLOR</b>: ${color}`;
    p1.appendChild(node1);
    p2.innerHTML = node2;
    section.appendChild(p1);
    section.appendChild(p2);
}
/*-- back up --*/

/* function createCar(plate:string,brand:string,color:string){
    let car=new Car(plate,color,brand);
    car.addWheel(new Wheel(2,"SEAT"));
    document.body.innerText="CAR: PLATE: " + car.plate 
    + " COLOR: " +car.color + " BRAND: " + brand 
    + " WHEELS: " + JSON.stringify(car.wheels);
} */

