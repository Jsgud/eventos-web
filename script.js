const formulario = document.querySelector("#form-registro");
const mensaje = document.querySelector("#mensaje");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault(); // evita que la página se recargue

  const nombre = document.querySelector("#nombre").value.trim();
  const correo = document.querySelector("#correo").value.trim();

  if (nombre.length < 3) {
    mostrarMensaje("El nombre debe tener al menos 3 caracteres.", "error");
    return;
  }

  mostrarMensaje(
    `¡Gracias, ${nombre}! Te enviaremos la confirmación a ${correo}.`,
    "exito"
  );
  formulario.reset();
});

function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = tipo;
}

const eventos = [
  { id: 1, nombre: "Feria de Tecnología 2026", fecha: "2026-11-15", lugar: "Auditorio Central" },
  { id: 2, nombre: "Taller de Programación Web", fecha: "2026-11-22", lugar: "Laboratorio 3" },
  { id: 3, nombre: "Conferencia de Ciberseguridad", fecha: "2026-12-05", lugar: "Sala de Conferencias" },
  { id: 4, nombre: "Hackatón Universitario", fecha: "2026-12-12", lugar: "Campus Principal" },
];

const listaEventos = document.querySelector("#lista-eventos");
const buscador = document.querySelector("#buscador");

function formatearFecha(fecha) {
  // Se agrega la hora para evitar que la zona horaria cambie el día
  return new Date(fecha + "T00:00:00").toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function mostrarEventos(lista) {
  listaEventos.innerHTML = "";

  if (lista.length === 0) {
    listaEventos.textContent = "No se encontraron eventos.";
    return;
  }

  lista.forEach((evento) => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "evento";
    tarjeta.innerHTML = `
      <h3>${evento.nombre}</h3>
      <p>Fecha: ${formatearFecha(evento.fecha)}</p>
      <p>Lugar: ${evento.lugar}</p>
    `;
    listaEventos.appendChild(tarjeta);
  });
}

buscador.addEventListener("input", () => {
  const texto = buscador.value.toLowerCase();
  const filtrados = eventos.filter((evento) =>
    evento.nombre.toLowerCase().includes(texto)
  );
  mostrarEventos(filtrados);
});

mostrarEventos(eventos);