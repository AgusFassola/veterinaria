//variables
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

const formulario = document.querySelector('#nuevaCita');
const contenedorCitas = document.querySelector('#citas')
let editando;

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

    editarCita(citaActualizada){
        //busca entre las citas guardadas si alguna coincide con el id de la cita que quiero actualizar, 
        // de ser asi entonces guarda la cita actualizada
        //de lo contrario guarda la cita actual
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita )
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

            //boton de editar
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn','btn-info');
            btnEditar.innerHTML ='Editar';
            btnEditar.onclick = () => cargarEdición(cita);

            //agregar parrafo al div
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);


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

    if(editando){
        //mensaje
        ui.imprimirAlerta('Editado correctamente');

        //pasar el objeto de la cita a editar
        administrarCitas.editarCita({...citaObj});

        //cambiar texto del botón
        formulario.querySelector('button').textContent = 'Crear cita';
        editando = false;
    }else{
        //generar ID unico
        citaObj.id = Date.now();

        administrarCitas.agregarCita({...citaObj});

        //mensaje
        ui.imprimirAlerta('Agregado correctamente');
    }

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

function cargarEdición(cita){
    const  { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //llenando el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

   //cambiar texto del botón
   formulario.querySelector('button').textContent = 'Guardar cambios';
    editando = true;
}