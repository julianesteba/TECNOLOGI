
const API_URL = "https://tecnologi-production.up.railway.app/api/usuarios";

const formulario = document.getElementById("registerForm");
const mensaje = document.getElementById("mensaje");
const botonRegistro = document.getElementById("btnRegistro");

// Verificar que existan los elementos del formulario
if (formulario && mensaje && botonRegistro) {

    formulario.addEventListener("submit", async function(event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const contrasena = document.getElementById("contrasena").value;
        const confirmarContrasena = document.getElementById("confirmarContrasena").value;

        // Validar campos
        if (!nombre || !apellido || !correo || !contrasena || !confirmarContrasena) {
            mostrarMensaje("Todos los campos son obligatorios.", "error");
            return;
        }

        // Validar correo
        const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formatoCorreo.test(correo)) {
            mostrarMensaje("Ingresa un correo electrónico válido.", "error");
            return;
        }

        // Validar contraseña
        if (contrasena.length < 6) {
            mostrarMensaje("La contraseña debe tener mínimo 6 caracteres.", "error");
            return;
        }

        // Confirmar contraseña
        if (contrasena !== confirmarContrasena) {
            mostrarMensaje("Las contraseñas no coinciden.", "error");
            return;
        }

        const usuario = {
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            contrasena: contrasena
        };

        botonRegistro.disabled = true;
        botonRegistro.textContent = "Registrando...";

        try {
            const respuesta = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            });

            const textoRespuesta = await respuesta.text();

            let datos = {};

            try {
                datos = textoRespuesta ? JSON.parse(textoRespuesta) : {};
            } catch {
                datos = {};
            }

            if (respuesta.ok) {
                mostrarMensaje(
                    "¡Registro exitoso! Tu usuario fue guardado correctamente.",
                    "exito"
                );

                formulario.reset();

            } else {
                mostrarMensaje(
                    datos.message ||
                    datos.mensaje ||
                    `No se pudo registrar el usuario. Error ${respuesta.status}.`,
                    "error"
                );

                console.error("Error de la API:", datos);
            }

        } catch (error) {
            console.error("Error de conexión:", error);

            mostrarMensaje(
                "No se pudo conectar con la API de Tecnologi. Verifica que Railway esté funcionando.",
                "error"
            );

        } finally {
            botonRegistro.disabled = false;
            botonRegistro.textContent = "Crear Cuenta";
        }
    });

} else {
    console.error("No se encontraron los elementos del formulario de registro.");
}

// Mostrar mensajes
function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.style.display = "block";

    if (tipo === "exito") {
        mensaje.style.backgroundColor = "#d1fae5";
        mensaje.style.color = "#065f46";
    } else {
        mensaje.style.backgroundColor = "#fee2e2";
        mensaje.style.color = "#991b1b";
    }
}
