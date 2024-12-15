//variables
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

const formulario = document.querySelector('#nuevaCita');
const contenedorCitas = document.querySelector('#Citas')
eventListeners();

//listeners
function eventListeners(){
    mascotaInput.addEventListener('change', datosCita);
    propietarioInput.addEventListener('change', datosCita);
    telefonoInput.addEventListener('change', datosCita);
    fechaInput.addEventListener('change', datosCita);
    horaInput.addEventListener('change', datosCita);
    sintomasInput.addEventListener('change', datosCita);

    formulario.addEventListener('submit', nuevaCita);
}

class Citas{
    constructor(){
        this.citas = [];
    }
}

class UI{
    imprimirAlerta(mensaje, tipo){
        //crear div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-flex', 'col-12','w-75','h-10','ml-20','justify-content-center');
        
        //agregar clase en base al tipo de error
        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }
        //mensaje de error
        divMensaje.textContent = mensaje;

        //agregar al DOM
        document.querySelector('.contenedor').before(divMensaje);
        
        //eliminarla despues de 3 segundos
        /* setTimeout(() => {
            divMensaje.remove();
        }, 3000); */
    }
}

const ui = new UI();
const administrarCitas = new Citas();


//objeto principal
const citaObj = {
    mascota: '',
    propietario:'',
    telefono: '',
    fecha:'',
    hora: '',
    sintomas:''
}

//agregar datos al objeto de citas
function datosCita(e){
    citaObj[e.target.name] = e.target.value;
}

//validar y agregar citas a la clase citas
function nuevaCita(e){
    e.preventDefault();

    const  { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    //validar
    if ( mascota === '' || propietario === '' || telefono === '' || fecha ==='' || hora === '' || sintomas === ''){
        ui.imprimirAlerta('Todos los campos son obligatorios','error');
        return;
    }

}