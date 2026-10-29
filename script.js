const formulario = document.querySelector("#form-registro");
const mensaje = document.querySelector("#mensaje");

function obtenerRegistros() {
  const guardado = localStorage.getItem("registros");
  return guardado ? JSON.parse(guardado) : [];
}

function guardarRegistro(registro) {
  const registros = obtenerRegistros();
  registros.push(registro);
  localStorage.setItem("registros", JSON.stringify(registros));
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault(); // evita que la página se recargue

  const nombre = document.querySelector("#nombre").value.trim();
  const correo = document.querySelector("#correo").value.trim();
  const eventoElegido = eventos.find((e) => e.id === Number(selectEvento.value));

  if (nombre.length < 3) {
    mostrarMensaje("El nombre debe tener al menos 3 caracteres.", "error");
    return;
  }

  const yaRegistrado = obtenerRegistros().some(
    (r) => r.correo === correo && r.eventoId === eventoElegido.id
  );

  if (yaRegistrado) {
    mostrarMensaje("Ese correo ya está registrado en este evento.", "error");
    return;
  }

  guardarRegistro({
    nombre,
    correo,
    eventoId: eventoElegido.id,
    fecha: new Date().toISOString(),
  });

  mostrarAsistentes();

  mostrarMensaje(
    `¡Gracias, ${nombre}! Quedaste registrado en "${eventoElegido.nombre}". Te escribiremos a ${correo}.`,
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
  { id: 5, nombre: "Taller de Unity 3D", fecha: "2026-12-23", lugar: "Campus Principal" },
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
      <button>Registrarme</button>
    `;
    listaEventos.appendChild(tarjeta);

    tarjeta.querySelector("button").addEventListener("click", () => {
        selectEvento.value = evento.id;
        document.querySelector("#form-registro").scrollIntoView({ behavior: "smooth" });
        document.querySelector("#nombre").focus();
    });
  });
}

buscador.addEventListener("input", () => {
  const texto = buscador.value.toLowerCase();
  const filtrados = eventos.filter((evento) =>
    evento.nombre.toLowerCase().includes(texto) ||
    evento.lugar.toLowerCase().includes(texto)
  );
  mostrarEventos(filtrados);
});

const selectEvento = document.querySelector("#evento-select");

eventos.forEach((evento) => {
  const opcion = document.createElement("option");
  opcion.value = evento.id;
  opcion.textContent = evento.nombre;
  selectEvento.appendChild(opcion);
});

mostrarEventos(eventos);

const listaAsistentes = document.querySelector("#lista-asistentes");

function mostrarAsistentes() {
  const registros = obtenerRegistros();
  listaAsistentes.innerHTML = "";

  if (registros.length === 0) {
    listaAsistentes.innerHTML = "<li>Aún no hay registros.</li>";
    return;
  }

  registros.forEach((registro) => {
    const evento = eventos.find((e) => e.id === registro.eventoId);
    const item = document.createElement("li");
    item.textContent = `${registro.nombre} (${registro.correo}) - ${evento.nombre}`;
    listaAsistentes.appendChild(item);
  });
}

