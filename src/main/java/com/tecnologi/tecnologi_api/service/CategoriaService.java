package com.tecnologi.tecnologi_api.service;

import java.util.List;
import java.util.Optional;

import com.tecnologi.tecnologi_api.entity.Categoria;

public interface CategoriaService {

    List<Categoria> listarCategorias();

    Optional<Categoria> obtenerPorId(Integer id);

    Optional<Categoria> buscarPorNombre(String nombre);

    Categoria guardarCategoria(Categoria categoria);

    Categoria actualizarCategoria(Integer id, Categoria categoria);

    void eliminarCategoria(Integer id);

}