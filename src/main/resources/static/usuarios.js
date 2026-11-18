
const API_URL = "https://tecnologi-production.up.railway.app/api/usuarios";

const tablaUsuarios = document.getElementById("tablaUsuarios");
const mensajeUsuarios = document.getElementById("mensajeUsuarios");

document.addEventListener("DOMContentLoaded", cargarUsuarios);

// CARGAR USUARIOS
async function cargarUsuarios() {
    try {
        tablaUsuarios.innerHTML = `
            <tr>
                <td colspan="5">Cargando usuarios...</td>
            </tr>
        `;

        const respuesta = await fetch(API_URL);

        if (!respuesta.ok) {
            throw new Error("Error al consultar los usuarios.");
        }

        const usuarios = await respuesta.json();

        mostrarUsuarios(usuarios);

    } catch (error) {
        console.error("Error al cargar usuarios:", error);

        tablaUsuarios.innerHTML = `
            <tr>
                <td colspan="5">No se pudieron cargar los usuarios.</td>
            </tr>
        `;

        mostrarMensaje(
            "No se pudo conectar con la API de Tecnologi.",
            "error"
        );
    }
}

// MOSTRAR USUARIOS
function mostrarUsuarios(usuarios) {
    tablaUsuarios.innerHTML = "";

    if (!usuarios || usuarios.length === 0) {
        tablaUsuarios.innerHTML = `
            <tr>
                <td colspan="5">No hay usuarios registrados.</td>
            </tr>
        `;
        return;
    }

    usuarios.forEach(usuario => {
        const fila = document.createElement("tr");

        const id = document.createElement("td");
        id.textContent = usuario.id;

        const nombre = document.createElement("td");
        nombre.textContent = usuario.nombre;

        const apellido = document.createElement("td");
        apellido.textContent = usuario.apellido;

        const correo = document.createElement("td");
        correo.textContent = usuario.correo;

        const acciones = document.createElement("td");

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.className = "btn-eliminar";

        botonEliminar.addEventListener("click", () => {
            eliminarUsuario(usuario.id);
        });

        acciones.appendChild(botonEliminar);

        fila.append(id, nombre, apellido, correo, acciones);

        tablaUsuarios.appendChild(fila);
    });
}

// ELIMINAR USUARIO
async function eliminarUsuario(id) {
    const confirmar = confirm(
        "¿Está seguro de que desea eliminar este usuario?"
    );

    if (!confirmar) return;

    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!respuesta.ok) {
            throw new Error("No se pudo eliminar el usuario.");
        }

        mostrarMensaje(
            "Usuario eliminado correctamente.",
            "exito"
        );

        await cargarUsuarios();

    } catch (error) {
        console.error("Error al eliminar:", error);

        mostrarMensaje(
            "No se pudo eliminar el usuario.",
            "error"
        );
    }
}

// MOSTRAR MENSAJES
function mostrarMensaje(texto, tipo) {
    mensajeUsuarios.textContent = texto;
    mensajeUsuarios.style.display = "block";

    if (tipo === "exito") {
        mensajeUsuarios.style.backgroundColor = "#d1fae5";
        mensajeUsuarios.style.color = "#065f46";
    } else {
        mensajeUsuarios.style.backgroundColor = "#fee2e2";
        mensajeUsuarios.style.color = "#991b1b";
    }
}
