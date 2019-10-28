/*-- valores del coche --*/
var _plate = <HTMLInputElement>document.querySelector("#plate"); //matrícula
var _brand = <HTMLInputElement>document.querySelector("#brand"); //marca
var _color = <HTMLInputElement>document.querySelector("#color"); //color

var sectionWheels = <HTMLElement>document.querySelector("#createWheelsForm");
const wheelsTxt = ["Front Left", "Front Right", "Back Left", "Back Right"];

var submitCar = <HTMLButtonElement>document.querySelector("#createCarBtn");
var submitWheels = <HTMLButtonElement>document.querySelector("#createWheelsBtn");

/*-- llama a la función al pulsar el botón --*/
submitCar.addEventListener("click", function() {
    createCar(_plate.value, _brand.value, _color.value)
    submitCar.disabled = true;
    submitCar.classList.toggle("btn-primary");
    submitCar.classList.toggle("btn-secondary");
    sectionWheels.classList.remove("d-none");
});

var currentCar:Car;

/*-- crea y añade el HTML para mostrar los datos recogidos --*/
function createCar(plate:string,brand:string,color:string){
    let car=new Car(plate,color,brand);    
    currentCar = car;    
    let section = <HTMLElement>document.querySelector("#carInfo");
    section.innerHTML = "";
    //crea el titulo
    let h4 = document.createElement("h4");
    h4.classList.add("mb-4");
    let node1 = document.createTextNode("Car:");
    h4.appendChild(node1);
    section.appendChild(h4);
    //crea el texto del coche
    let p = document.createElement("p");
    let node2 = `<b>PLATE</b>: ${plate}, <b>BRAND</b>: ${brand}, <b>COLOR</b>: ${color}`;
    p.innerHTML = node2;
    section.appendChild(p);

}

var wheelBrand:NodeListOf<HTMLInputElement> = document.querySelectorAll(".wheel_brand");
var wheelDiameter:NodeListOf<HTMLInputElement> = document.querySelectorAll(".wheel_diameter");
var wheelsBrand: HTMLInputElement[] = Array.prototype.slice.call(wheelBrand);
var wheelsDiameter: HTMLInputElement[] = Array.prototype.slice.call(wheelDiameter);


submitWheels.addEventListener("click", function(){
    CreateWheels(currentCar);
    submitWheels.disabled = true;
    submitWheels.classList.toggle("btn-primary");
    submitWheels.classList.toggle("btn-secondary");
});


/*-- crea ruedas de 1 en 1 para pasarle al coche creado --*/
function createWheel(diameter:number, brand:string){
     var w = new Wheel(diameter, brand);     
     currentCar.addWheel(w);
}

/*-- obtiene los datos de las ruedas para añadirlas al coche actual y mostralo por pantalla --*/
function CreateWheels(c:Car){    
    for (let w = 0; w < 4; w++){
        // añadiendo el símbolo "+" delante de la variable, se convierte en tipo number
        createWheel(+wheelsDiameter[w].value, wheelsBrand[w].value); 
    }    
    let section = <HTMLElement>document.querySelector("#wheelsInfo");
    section.innerHTML = "";
    //crea el titulo
    let h4 = document.createElement("h4");
    h4.classList.add("mb-4");
    let node1 = document.createTextNode("Wheels:");
    h4.appendChild(node1);
    section.appendChild(h4);
    //crea el texto de las ruedas
    let p = document.createElement("p");
    let w = c.wheels;        
    for (let i = 0; i < w.length; i++){
        let node = `${wheelsTxt[i]}=> <b>Brand:</b> ${w[i].brand} <b>Diameter:</b> ${w[i].diameter}<br>`;
        p.innerHTML += node;
    }
    section.appendChild(p);    
}
