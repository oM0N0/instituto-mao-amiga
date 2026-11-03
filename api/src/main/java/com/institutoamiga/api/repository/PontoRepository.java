package com.institutoamiga.api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.institutoamiga.api.model.Ponto;

public interface PontoRepository extends JpaRepository<Ponto, Long> {
    Page<Ponto> findByNomeContainingIgnoreCase(String nome, Pageable pageable);
}
