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