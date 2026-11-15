const formulario = document.getElementById("registerForm");
const mensaje = document.getElementById("mensaje");
const botonRegistro = document.getElementById("btnRegistro");

formulario.addEventListener("submit", async function(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const contrasena = document.getElementById("contrasena").value;
    const confirmarContrasena =
        document.getElementById("confirmarContrasena").value;

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
        const respuesta = await fetch(
            "http://localhost:8080/api/usuarios",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            }
        );

        const datos = await respuesta.json();

        if (respuesta.ok) {
            mostrarMensaje(
                "¡Registro exitoso! El usuario fue registrado correctamente.",
                "exito"
            );

            formulario.reset();
        } else {
            mostrarMensaje(
                datos.message ||
                "No se pudo registrar el usuario. Verifica los datos.",
                "error"
            );
        }

    } catch (error) {
        console.error("Error:", error);

        mostrarMensaje(
            "No se pudo conectar con el servidor. Verifica que la API esté ejecutándose.",
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