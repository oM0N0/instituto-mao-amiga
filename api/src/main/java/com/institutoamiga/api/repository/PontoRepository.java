package com.institutoamiga.api.repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.institutoamiga.api.entity.Ponto;

public interface PontoRepository extends JpaRepository<Ponto, UUID> {

    @Query("SELECT p FROM Ponto p WHERE LOWER(p.nome) LIKE LOWER(CONCAT('%', :filtro, '%')) OR LOWER(p.bairro) LIKE LOWER(CONCAT('%', :filtro, '%'))")
    Page<Ponto> filtrar(@Param("filtro") String filtro, Pageable pageable);
}
