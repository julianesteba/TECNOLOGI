
const API_CLIENTES = "http://localhost:8080/api/clientes";

const formulario = document.getElementById("formularioCliente");
const mensaje = document.getElementById("mensajeRegistro");
const botonRegistrar = document.getElementById("btnRegistrar");

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    mensaje.textContent = "Registrando cliente...";
    botonRegistrar.disabled = true;

    const cliente = {
        nombre: document.getElementById("nombre").value.trim(),
        apellido: document.getElementById("apellido").value.trim(),
        documento: document.getElementById("documento").value.trim(),
        telefono: document.getElementById("telefono").value.trim(),
        correo: document.getElementById("correo").value.trim(),
        direccion: document.getElementById("direccion").value.trim()
    };

    try {
        const respuesta = await fetch(API_CLIENTES, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cliente)
        });

        const texto = await respuesta.text();

        let resultado = null;

        try {
            resultado = texto ? JSON.parse(texto) : null;
        } catch {
            resultado = null;
        }

        if (!respuesta.ok) {
            const errores = resultado && typeof resultado === "object"
                ? Object.values(resultado).join(" ")
                : "";

            throw new Error(
                errores || `No se pudo registrar el cliente (HTTP ${respuesta.status}).`
            );
        }

        mensaje.textContent =
            `Cliente registrado correctamente. ID: ${resultado?.id ?? "asignado"}`;

        mensaje.classList.add("mensaje-exito");
        formulario.reset();

        setTimeout(() => {
            window.location.href = "clientes.html";
        }, 1500);

    } catch (error) {
        console.error("Error al registrar cliente:", error);

        mensaje.textContent =
            error.message.includes("Failed to fetch")
                ? "No se pudo conectar con la API. Verifica que Spring Boot esté iniciado y que CORS esté configurado."
                : error.message;

        mensaje.classList.remove("mensaje-exito");
    } finally {
        botonRegistrar.disabled = false;
    }
});
