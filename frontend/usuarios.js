const tablaUsuarios = document.getElementById("tablaUsuarios");
const mensajeUsuarios = document.getElementById("mensajeUsuarios");


// Cargar usuarios al abrir la página

document.addEventListener("DOMContentLoaded", cargarUsuarios);


async function cargarUsuarios() {

    try {

        const respuesta = await fetch(
            "http://localhost:8080/api/usuarios"
        );

        if (!respuesta.ok) {

            throw new Error(
                "No se pudieron obtener los usuarios."
            );

        }

        const usuarios = await respuesta.json();

        mostrarUsuarios(usuarios);

    } catch (error) {

        console.error(
            "Error al cargar usuarios:",
            error
        );

        tablaUsuarios.innerHTML = `
            <tr>
                <td colspan="5">
                    No se pudieron cargar los usuarios.
                </td>
            </tr>
        `;

        mostrarMensaje(
            "No se pudo conectar con la API de Tecnologi.",
            "error"
        );
    }
}


// Mostrar usuarios en la tabla

function mostrarUsuarios(usuarios) {

    tablaUsuarios.innerHTML = "";

    if (usuarios.length === 0) {

        tablaUsuarios.innerHTML = `
            <tr>
                <td colspan="5">
                    No hay usuarios registrados.
                </td>
            </tr>
        `;

        return;
    }


    usuarios.forEach(usuario => {

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${usuario.id}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.apellido}</td>
            <td>${usuario.correo}</td>

            <td>

                <button
                    class="btn-eliminar"
                    onclick="eliminarUsuario(${usuario.id})">
                    Eliminar
                </button>

            </td>
        `;

        tablaUsuarios.appendChild(fila);

    });
}


// Eliminar usuario

async function eliminarUsuario(id) {

    const confirmar = confirm(
        "¿Está seguro de que desea eliminar este usuario?"
    );

    if (!confirmar) {
        return;
    }


    try {

        const respuesta = await fetch(
            `http://localhost:8080/api/usuarios/${id}`,
            {
                method: "DELETE"
            }
        );


        if (respuesta.ok) {

            mostrarMensaje(
                "Usuario eliminado correctamente.",
                "exito"
            );

            cargarUsuarios();

        } else {

            mostrarMensaje(
                "No se pudo eliminar el usuario.",
                "error"
            );

        }

    } catch (error) {

        console.error(
            "Error al eliminar usuario:",
            error
        );

        mostrarMensaje(
            "No se pudo conectar con la API.",
            "error"
        );
    }
}


// Mostrar mensajes

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