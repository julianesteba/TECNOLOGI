package com.tecnologi.tecnologi_api.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import com.tecnologi.tecnologi_api.entity.Producto;
import com.tecnologi.tecnologi_api.service.ProductoService;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin("*")
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping
    public List<Producto> listarProductos() {
        return productoService.listarProductos();
    }

    @GetMapping("/{id}")
    public Optional<Producto> obtenerPorId(@PathVariable Integer id) {
        return productoService.obtenerPorId(id);
    }

    @PostMapping
    public Producto guardarProducto(@Valid @RequestBody Producto producto) {
        return productoService.guardarProducto(producto);
    }

    @PutMapping("/{id}")
    public Producto actualizarProducto(
            @PathVariable Integer id,
            @Valid @RequestBody Producto producto) {
        return productoService.actualizarProducto(id, producto);
    }

    @DeleteMapping("/{id}")
    public void eliminarProducto(@PathVariable Integer id) {
        productoService.eliminarProducto(id);
    }
}