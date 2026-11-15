package com.tecnologi.tecnologi_api.service;

import java.util.List;
import java.util.Optional;

import com.tecnologi.tecnologi_api.entity.Cliente;

public interface ClienteService {

    List<Cliente> listarClientes();

    Optional<Cliente> obtenerPorId(Integer id);

    Optional<Cliente> buscarPorCorreo(String correo);

    Optional<Cliente> buscarPorDocumento(String documento);

    Cliente guardarCliente(Cliente cliente);

    Cliente actualizarCliente(Integer id, Cliente cliente);

    void eliminarCliente(Integer id);

}