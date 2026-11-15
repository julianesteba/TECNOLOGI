package com.tecnologi.tecnologi_api.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.tecnologi.tecnologi_api.entity.Producto;
import com.tecnologi.tecnologi_api.repository.ProductoRepository;
import com.tecnologi.tecnologi_api.service.ProductoService;

@Service
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository productoRepository;

    public ProductoServiceImpl(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    @Override
    public List<Producto> listarProductos() {
        return productoRepository.findAll();
    }

    @Override
    public Optional<Producto> obtenerPorId(Integer id) {
        return productoRepository.findById(id);
    }

    @Override
    public Producto guardarProducto(Producto producto) {
        return productoRepository.save(producto);
    }

    @Override
    public Producto actualizarProducto(Integer id, Producto producto) {

        Optional<Producto> productoExistente = productoRepository.findById(id);

        if (productoExistente.isPresent()) {

            Producto actual = productoExistente.get();

            actual.setNombre(producto.getNombre());
            actual.setDescripcion(producto.getDescripcion());
            actual.setPrecio(producto.getPrecio());
            actual.setStock(producto.getStock());
            actual.setCategoria(producto.getCategoria());

            return productoRepository.save(actual);
        }

        return null;
    }

    @Override
    public void eliminarProducto(Integer id) {
        productoRepository.deleteById(id);
    }
}