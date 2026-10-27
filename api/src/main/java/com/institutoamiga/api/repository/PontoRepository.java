package com.institutoamiga.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.institutoamiga.api.model.Ponto;

public interface PontoRepository extends JpaRepository<Ponto, Long> {
}