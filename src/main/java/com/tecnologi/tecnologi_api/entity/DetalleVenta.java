package com.tecnologi.tecnologi_api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Entity
@Table(name = "detalle_ventas")
public class DetalleVenta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    @NotNull(message = "La cantidad es obligatoria")
    @Positive(message = "La cantidad debe ser un valor positivo")
    private Integer cantidad;

    @Column(nullable = false)
    @NotNull(message = "El precio es obligatorio")
    @Positive(message = "El precio debe ser un valor positivo")
    private Double precio;

    @ManyToOne
    @JoinColumn(name = "venta_id", nullable = false)
    @NotNull(message = "La venta es obligatoria")
    private Venta venta;

    @ManyToOne
    @JoinColumn(name = "producto_id", nullable = false)
    @NotNull(message = "El producto es obligatorio")
    private Producto producto;

    public DetalleVenta() {
    }

    public DetalleVenta(Integer id, Integer cantidad, Double precio, Venta venta, Producto producto) {
        this.id = id;
        this.cantidad = cantidad;
        this.precio = precio;
        this.venta = venta;
        this.producto = producto;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public Venta getVenta() {
        return venta;
    }

    public void setVenta(Venta venta) {
        this.venta = venta;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }
}