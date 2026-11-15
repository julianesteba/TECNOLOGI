package com.tecnologi.tecnologi_api.service.impl;

import com.tecnologi.tecnologi_api.entity.Venta;
import com.tecnologi.tecnologi_api.repository.VentaRepository;
import com.tecnologi.tecnologi_api.service.VentaService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VentaServiceImpl implements VentaService {

private final VentaRepository ventaRepository;

public VentaServiceImpl(VentaRepository ventaRepository) {
    this.ventaRepository = ventaRepository;
}

    @Override
    public List<Venta> listar() {
        return ventaRepository.findAll();
    }

    @Override
    public Venta guardar(Venta venta) {
        return ventaRepository.save(venta);
    }

    @Override
    public Venta buscarPorId(Integer id) {
        return ventaRepository.findById(id).orElse(null);
    }

    @Override
    public Venta actualizar(Integer id, Venta venta) {

        Venta ventaExistente = buscarPorId(id);

        if (ventaExistente != null) {
            ventaExistente.setFecha(venta.getFecha());
            ventaExistente.setTotal(venta.getTotal());
            ventaExistente.setCliente(venta.getCliente());

            return ventaRepository.save(ventaExistente);
        }

        return null;
    }

    @Override
    public void eliminar(Integer id) {
        ventaRepository.deleteById(id);
    }
}