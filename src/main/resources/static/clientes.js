
const API_CLIENTES = "http://localhost:8080/api/clientes";

const tablaClientes = document.getElementById("tablaClientes");
const mensaje = document.getElementById("mensaje");
const btnActualizar = document.getElementById("btnActualizar");

async function cargarClientes() {
    tablaClientes.replaceChildren();
    mensaje.textContent = "Cargando clientes...";

    try {
        const respuesta = await fetch(API_CLIENTES);

        if (!respuesta.ok) {
            throw new Error("No fue posible consultar los clientes.");
        }

        const clientes = await respuesta.json();

        if (!Array.isArray(clientes)) {
            throw new Error("La API devolvió una respuesta inesperada.");
        }

        if (clientes.length === 0) {
            mensaje.textContent = "Todavía no hay clientes registrados.";
            return;
        }

        mensaje.textContent = `Se encontraron ${clientes.length} cliente(s).`;

        clientes.forEach(cliente => {
            const fila = document.createElement("tr");

            const datos = [
                cliente.id,
                `${cliente.nombre ?? ""} ${cliente.apellido ?? ""}`.trim(),
                cliente.documento,
                cliente.correo,
                cliente.telefono,
                cliente.direccion
            ];

            datos.forEach(dato => {
                const celda = document.createElement("td");
                celda.textContent = dato ?? "";
                fila.appendChild(celda);
            });

            const celdaAcciones = document.createElement("td");
            const botonEliminar = document.createElement("button");

            botonEliminar.textContent = "Eliminar";
            botonEliminar.className = "boton-eliminar";
            botonEliminar.type = "button";

            botonEliminar.addEventListener("click", async () => {
                await eliminarCliente(cliente.id);
            });

            celdaAcciones.appendChild(botonEliminar);
            fila.appendChild(celdaAcciones);
            tablaClientes.appendChild(fila);
        });

    } catch (error) {
        mensaje.textContent =
            "No se pudieron cargar los clientes. Verifica que la API esté funcionando.";

        console.error("Error al cargar clientes:", error);
    }
}

async function eliminarCliente(id) {
    const confirmar = confirm(
        `¿Seguro que deseas eliminar el cliente con ID ${id}?`
    );

    if (!confirmar) return;

    try {
        const respuesta = await fetch(`${API_CLIENTES}/${id}`, {
            method: "DELETE"
        });

        if (!respuesta.ok) {
            throw new Error("No se pudo eliminar el cliente.");
        }

        alert("Cliente eliminado correctamente.");
        await cargarClientes();

    } catch (error) {
        console.error(error);
        alert(
            "No se pudo eliminar el cliente. Puede tener ventas asociadas."
        );
    }
}

btnActualizar.addEventListener("click", cargarClientes);

cargarClientes();
