package com.tecnologi.tecnologi_api.service;

import java.util.List;
import java.util.Optional;

import com.tecnologi.tecnologi_api.entity.Producto;

public interface ProductoService {

    List<Producto> listarProductos();

    Optional<Producto> obtenerPorId(Integer id);

    Producto guardarProducto(Producto producto);

    Producto actualizarProducto(Integer id, Producto producto);

    void eliminarProducto(Integer id);
}