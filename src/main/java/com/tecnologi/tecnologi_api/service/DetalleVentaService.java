package com.tecnologi.tecnologi_api.service;

import com.tecnologi.tecnologi_api.entity.DetalleVenta;
import java.util.List;

public interface DetalleVentaService {

    List<DetalleVenta> listar();

    DetalleVenta guardar(DetalleVenta detalleVenta);

    DetalleVenta buscarPorId(Integer id);

    DetalleVenta actualizar(Integer id, DetalleVenta detalleVenta);

    void eliminar(Integer id);

}