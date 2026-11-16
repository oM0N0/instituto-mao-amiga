package com.institutoamiga.api.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.institutoamiga.api.entity.Ponto;

public interface PontoRepository extends JpaRepository<Ponto, UUID> {
}
