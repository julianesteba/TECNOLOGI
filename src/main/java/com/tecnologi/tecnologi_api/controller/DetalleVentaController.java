package com.tecnologi.tecnologi_api.controller;

import com.tecnologi.tecnologi_api.entity.DetalleVenta;
import com.tecnologi.tecnologi_api.service.DetalleVentaService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/detalleventas")
@CrossOrigin("*")
public class DetalleVentaController {

    private final DetalleVentaService detalleVentaService;

    public DetalleVentaController(DetalleVentaService detalleVentaService) {
        this.detalleVentaService = detalleVentaService;
    }

    @GetMapping
    public List<DetalleVenta> listar() {
        return detalleVentaService.listar();
    }

    @GetMapping("/{id}")
    public DetalleVenta buscarPorId(@PathVariable Integer id) {
        return detalleVentaService.buscarPorId(id);
    }

    @PostMapping
    public DetalleVenta guardar(@Valid @RequestBody DetalleVenta detalleVenta) {
        return detalleVentaService.guardar(detalleVenta);
    }

    @PutMapping("/{id}")
    public DetalleVenta actualizar(
            @PathVariable Integer id,
            @Valid @RequestBody DetalleVenta detalleVenta) {
        return detalleVentaService.actualizar(id, detalleVenta);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        detalleVentaService.eliminar(id);
    }
}