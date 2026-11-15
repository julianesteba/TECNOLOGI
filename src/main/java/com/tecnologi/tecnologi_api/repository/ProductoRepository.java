package com.tecnologi.tecnologi_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tecnologi.tecnologi_api.entity.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Integer> {

}