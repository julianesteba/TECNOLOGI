package com.tecnologi.tecnologi_api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tecnologi.tecnologi_api.entity.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {

    Optional<Categoria> findByNombre(String nombre);

}