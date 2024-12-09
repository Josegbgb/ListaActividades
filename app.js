let contenedor = document.getElementById("caja");
let contenedor_modal = document.getElementById("modal");
let tabla = document.getElementById("tabla-datos");
let mensaje_eliminar = document.getElementById("mensaje-eliminar");
let mensaje_listo = document.getElementById("mensaje-listo");

function añadir() {
  contenedor_modal.style.display = "inline-block";
}
function enviar() {
  let actividad = document.getElementById("actividad").value;
  let descripcion = document.getElementById("descripcion").value;

  const hoy = new Date();
  const año = hoy.getFullYear();
  const mes = ("0" + (hoy.getMonth() + 1)).slice(-2);
  const dia = ("0" + hoy.getDate()).slice(-2);
  const fecha = `${mes}-${dia}-${año}`;

  if (actividad && descripcion) {
    let nuevaActividad = {
      actividad: actividad,
      fecha: fecha,
      descripcion: descripcion,
    };
    let lista = JSON.parse(localStorage.getItem("actividades")) || [];
    lista.push(nuevaActividad);
    localStorage.setItem("actividades", JSON.stringify(lista));
    recuperarActividades();
  }
}
function recuperarActividades() {
  let lista = JSON.parse(localStorage.getItem("actividades")) || [];
  const fragmento = document.createDocumentFragment();

  lista.forEach((item) => {
    const fila = document.createElement("tr");
    fila.classList.add("contenido");
    fila.innerHTML = `
        
        <td class="index">${item.actividad}</td>
        <td id="fecha">${item.fecha}</td>
        <td>${item.descripcion}</td>
        <td id="botones">
        <button class="listo-btn" onclick=eliminar(this)></button>
        <button class="eliminar-btn" onclick=eliminar(this)></button>
        </td>
        
    `;
    fragmento.appendChild(fila);
  });
  tabla.innerHTML = "";
  tabla.appendChild(fragmento);
}
function eliminar(boton) {
  let selectorMensaje = boton.classList.contains("eliminar-btn");
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
  actividad.style.display = "inline-block";
  setInterval(function () {
    actividad.style.display = "none";
  }, 3000);
}

window.onload = function () {
  recuperarActividades();
};
