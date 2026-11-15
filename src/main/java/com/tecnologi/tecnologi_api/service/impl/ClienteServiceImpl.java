package com.tecnologi.tecnologi_api.service.impl;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

import com.tecnologi.tecnologi_api.entity.Cliente;
import com.tecnologi.tecnologi_api.repository.ClienteRepository;
import com.tecnologi.tecnologi_api.service.ClienteService;

@Service
public class ClienteServiceImpl implements ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteServiceImpl(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @Override
    public List<Cliente> listarClientes() {
        return clienteRepository.findAll();
    }

    @Override
    public Optional<Cliente> obtenerPorId(Integer id) {
        return clienteRepository.findById(id);
    }

    @Override
    public Optional<Cliente> buscarPorCorreo(String correo) {
        return clienteRepository.findByCorreo(correo);
    }

    @Override
    public Optional<Cliente> buscarPorDocumento(String documento) {
        return clienteRepository.findByDocumento(documento);
    }

    @Override
    public Cliente guardarCliente(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    @Override
    public Cliente actualizarCliente(Integer id, Cliente cliente) {

        Optional<Cliente> clienteExistente = clienteRepository.findById(id);

        if (clienteExistente.isPresent()) {

            Cliente actual = clienteExistente.get();

            actual.setNombre(cliente.getNombre());
            actual.setApellido(cliente.getApellido());
            actual.setDocumento(cliente.getDocumento());
            actual.setTelefono(cliente.getTelefono());
            actual.setDireccion(cliente.getDireccion());
            actual.setCorreo(cliente.getCorreo());

            return clienteRepository.save(actual);
        }

        return null;
    }

    @Override
    public void eliminarCliente(Integer id) {
        clienteRepository.deleteById(id);
    }
}