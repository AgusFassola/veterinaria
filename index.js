//variables
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

const formulario = document.querySelector('#nuevaCita');
const contenedorCitas = document.querySelector('#citas')
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

    agregarCita(cita){
        this.citas = [...this.citas, cita];
        console.log(this.citas)
    }

    eliminarCita(id){
        this.citas = this.citas.filter( cita => cita.id !== id );
    }
}

class UI{
    imprimirAlerta(mensaje, tipo){
        //crear div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-flex', 'col-12','h-10','ml-20','justify-content-center');
        
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
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    imprimirCitas({citas}){ //aplica destructuring para sacar las citas dentro de Citas
        
        this.limpiarHTML();
        citas.forEach( cita => {
            const  { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita','p-3');
            divCita.dataset.id = id;

            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title','font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
                <span class="fw-bold">Propietario: </span> ${propietario}
            `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
                <span class="fw-bold">Telefono: </span> ${telefono}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
                <span class="fw-bold">Fecha: </span> ${fecha}
            `;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
                <span class="fw-bold">Sintomas: </span> ${sintomas}
            `;

            //boton de eliminar cita
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn','btn-danger','mr-2');
            btnEliminar.innerHTML = 'Eliminar';
            btnEliminar.onclick = ()=> eliminarCita(id);

            //agregar parrafo al div
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);

            //agregar cita al HTML
            contenedorCitas.appendChild(divCita);
        });
    }
    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
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
    
    //generar ID unico
    citaObj.id = Date.now();

    administrarCitas.agregarCita({...citaObj});

    ui.imprimirCitas(administrarCitas);

    reiniciarObjeto();

    formulario.reset();

}

function reiniciarObjeto(){
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha ='';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

function eliminarCita(id){
    //eliminar cita
    administrarCitas.eliminarCita(id);

    //mensaje
    ui.imprimirAlerta('Cita eliminada');

    //refrescar el HTML
    ui.imprimirCitas(administrarCitas);
}