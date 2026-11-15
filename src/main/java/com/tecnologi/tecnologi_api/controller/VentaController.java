package com.tecnologi.tecnologi_api.controller;

import com.tecnologi.tecnologi_api.entity.Venta;
import com.tecnologi.tecnologi_api.service.VentaService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ventas")
@CrossOrigin("*")
public class VentaController {

    private final VentaService ventaService;

    public VentaController(VentaService ventaService) {
        this.ventaService = ventaService;
    }

    @GetMapping
    public List<Venta> listar() {
        return ventaService.listar();
    }

    @GetMapping("/{id}")
    public Venta buscarPorId(@PathVariable Integer id) {
        return ventaService.buscarPorId(id);
    }

    @PostMapping
    public Venta guardar(@Valid @RequestBody Venta venta) {
        return ventaService.guardar(venta);
    }

    @PutMapping("/{id}")
    public Venta actualizar(
            @PathVariable Integer id,
            @Valid @RequestBody Venta venta) {
        return ventaService.actualizar(id, venta);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        ventaService.eliminar(id);
    }
}