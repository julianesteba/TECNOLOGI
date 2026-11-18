
const formulario = document.getElementById("registerForm");
const mensaje = document.getElementById("mensaje");
const botonRegistro = document.getElementById("btnRegistro");

// Dirección de la API publicada en Railway
const API_URL = "https://tecnologi-production.up.railway.app/api/usuarios";

formulario.addEventListener("submit", async function(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const contrasena = document.getElementById("contrasena").value;
    const confirmarContrasena =
        document.getElementById("confirmarContrasena").value;

    if (!nombre || !apellido || !correo || !contrasena) {
        mostrarMensaje("Completa todos los campos.", "error");
        return;
    }

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

        const texto = await respuesta.text();

        let datos = {};
        try {
            datos = texto ? JSON.parse(texto) : {};
        } catch {
            datos = {};
        }

        if (respuesta.ok) {
            mostrarMensaje(
                "¡Registro exitoso! El usuario fue registrado correctamente.",
                "exito"
            );

            formulario.reset();

        } else {
            console.error("Respuesta del servidor:", texto);

            mostrarMensaje(
                datos.message ||
                datos.mensaje ||
                "No se pudo registrar el usuario. Verifica los datos.",
                "error"
            );
        }

    } catch (error) {
        console.error("Error de conexión:", error);

        mostrarMensaje(
            "No se pudo conectar con el servidor. Verifica la API y su configuración.",
            "error"
        );

    } finally {
        botonRegistro.disabled = false;
        botonRegistro.textContent = "Crear Cuenta";
    }
});

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
