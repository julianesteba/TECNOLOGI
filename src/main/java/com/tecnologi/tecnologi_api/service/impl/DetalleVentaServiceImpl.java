package com.tecnologi.tecnologi_api.service.impl;

import com.tecnologi.tecnologi_api.entity.DetalleVenta;
import com.tecnologi.tecnologi_api.repository.DetalleVentaRepository;
import com.tecnologi.tecnologi_api.service.DetalleVentaService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DetalleVentaServiceImpl implements DetalleVentaService {

private final DetalleVentaRepository detalleVentaRepository;

public DetalleVentaServiceImpl(DetalleVentaRepository detalleVentaRepository) {
    this.detalleVentaRepository = detalleVentaRepository;
}

    @Override
    public List<DetalleVenta> listar() {
        return detalleVentaRepository.findAll();
    }

    @Override
    public DetalleVenta guardar(DetalleVenta detalleVenta) {
        return detalleVentaRepository.save(detalleVenta);
    }

    @Override
    public DetalleVenta buscarPorId(Integer id) {
        return detalleVentaRepository.findById(id).orElse(null);
    }

    @Override
    public DetalleVenta actualizar(Integer id, DetalleVenta detalleVenta) {

        DetalleVenta detalleExistente = buscarPorId(id);

        if (detalleExistente != null) {
            detalleExistente.setCantidad(detalleVenta.getCantidad());
            detalleExistente.setPrecio(detalleVenta.getPrecio());
            detalleExistente.setVenta(detalleVenta.getVenta());
            detalleExistente.setProducto(detalleVenta.getProducto());

            return detalleVentaRepository.save(detalleExistente);
        }

        return null;
    }

    @Override
    public void eliminar(Integer id) {
        detalleVentaRepository.deleteById(id);
    }
}