let contenedor_modal = document.getElementById("modal-padre");
let tabla = document.getElementById("tabla-datos");
let mensaje_eliminar = document.getElementById("mensaje-eliminar");
let mensaje_listo = document.getElementById("mensaje-listo");
let interval;

//Mostrar modal
function añadir() {
  contenedor_modal.style.display = "flex";
}

//Funcion para agregar actividad
function enviar() {
  //Tomar los datos escritos en los input
  let actividad = document.getElementById("actividad").value;
  let descripcion = document.getElementById("descripcion").value;
  const hoy = new Date();
  const año = hoy.getFullYear();
  const mes = ("0" + (hoy.getMonth() + 1)).slice(-2);
  const dia = ("0" + hoy.getDate()).slice(-2);
  const fecha = `${mes}-${dia}-${año}`;

  //Verificar que ambos campos tengan informacion
  if (actividad && descripcion) {
    //Convertir a objetos
    let nuevaActividad = {
      actividad: actividad,
      fecha: fecha,
      descripcion: descripcion,
    };
    //Declarar lista y obtiene los datos en actividades en caso de que tenga, de lo contrario regresa un array vacio
    let lista = JSON.parse(localStorage.getItem("actividades")) || [];
    //Push el objeto creado a lista que viene del localstorage
    lista.push(nuevaActividad);
    //Guardar el nuevo valor actualizando lista
    localStorage.setItem("actividades", JSON.stringify(lista));
    //Llmar a la funcion para escribir los datos de lista en el DOM
    recuperarActividades();
    location.reload();
  } else {
    //En caso de tener un campo vacio crear el div con el mensaje para notificar
    const mensajeError = `
    <div id="mensaje-error">
      <p>Asegurate de ingresar datos en ambos campos.</p>
    </div>
    `;
    clearTimeout(interval);
    const botones = document.getElementById("btn-modal");
    //insertar el div con el mensaje antes de los botones
    if (document.getElementById("mensaje-error") === null) {
      botones.insertAdjacentHTML("beforebegin", mensajeError);
    }
    interval = setTimeout(function () {
      document.getElementById("mensaje-error").remove();
    }, 2000);
  }
}

//funcion para cerrar modal en caso de que no desee agragar actividades
function cerrarModal() {
  if (document.getElementById("mensaje-error")) {
    document.getElementById("mensaje-error").remove();
    contenedor_modal.style.display = "none";
  } else {
    contenedor_modal.style.display = "none";
  }
}

//funcion para escribir las actividades del localstorage en el DOM
function recuperarActividades() {
  //toma los valores que se encuentran
  let lista = JSON.parse(localStorage.getItem("actividades")) || [];
  const fragmento = document.createDocumentFragment();
  //por cada objeto que este dentro del array lista creara un tr
  lista.forEach((item) => {
    const fila = document.createElement("tr");
    fila.classList.add("contenido");
    //Creara td para cada valor que tenga el objeto que esta iterando dentro del array lista
    fila.innerHTML = `
        
        <td class="index">${item.actividad}</td>
        <td id="fecha">${item.fecha}</td>
        <td>${item.descripcion}</td>
        <td id="botones">
        <button class="listo-btn" onclick=eliminar(this)></button>
        <button class="eliminar-btn" onclick=eliminar(this)></button>
        </td>    
    `;
    //por ultimo se inserta al fragmento para posteriormente insertarlo a tabla que ya se encuentra en HTML
    fragmento.appendChild(fila);
  });
  tabla.innerHTML = "";
  tabla.appendChild(fragmento);
}

//funcion para eliminar actividades
function eliminar(boton) {
  //en el caso de que el btn presionado tenga la clase eliminar retorna true
  let selectorMensaje = boton.classList.contains("eliminar-btn");
  //Independientemente si es true o false accedemos al tr para eliminar la actividad por completo
  let padre = boton.closest(".contenido");
  padre.remove();

  let local_storage = JSON.parse(localStorage.getItem("actividades"));
  local_storage = local_storage.filter(
    (fila) => `${fila.actividad}` !== padre.childNodes[1].textContent
  );
  localStorage.setItem("actividades", JSON.stringify(local_storage));
  if (selectorMensaje === true) {
    mensaje(mensaje_eliminar);
  } else {
    mensaje(mensaje_listo);
  }
}

function mensaje(actividad) {
  actividad.style.display = "flex";
  setInterval(function () {
    actividad.style.display = "none";
  }, 3000);
}

window.onload = function () {
  recuperarActividades();
};
