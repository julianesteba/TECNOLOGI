package com.tecnologi.tecnologi_api.service;

import java.util.List;
import java.util.Optional;

import com.tecnologi.tecnologi_api.entity.Usuario;

public interface UsuarioService {

    List<Usuario> listarUsuarios();

    Optional<Usuario> obtenerPorId(Integer id);

    Usuario guardarUsuario(Usuario usuario);

    Usuario actualizarUsuario(Integer id, Usuario usuario);

    void eliminarUsuario(Integer id);

    Optional<Usuario> buscarPorCorreo(String correo);

}