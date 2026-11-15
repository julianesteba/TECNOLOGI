package com.tecnologi.tecnologi_api.service;

import com.tecnologi.tecnologi_api.entity.Venta;
import java.util.List;

public interface VentaService {

    List<Venta> listar();

    Venta guardar(Venta venta);

    Venta buscarPorId(Integer id);

    Venta actualizar(Integer id, Venta venta);

    void eliminar(Integer id);

}