package com.tecnologi.tecnologi_api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.tecnologi.tecnologi_api.entity.Cliente;


public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

    @Query("SELECT c FROM Cliente c WHERE c.correo = :correo")
    Optional<Cliente> findByCorreo(String correo);

    @Query("SELECT c FROM Cliente c WHERE c.documento = :documento")
    Optional<Cliente> findByDocumento(String documento);

}