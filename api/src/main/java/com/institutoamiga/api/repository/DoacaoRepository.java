package com.institutoamiga.api.repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.institutoamiga.api.entity.Doacao;

public interface DoacaoRepository extends JpaRepository<Doacao, UUID> {

    @Query("SELECT d FROM Doacao d WHERE LOWER(d.tipoItem) LIKE LOWER(CONCAT('%', :filtro, '%'))")
    Page<Doacao> filtrar(@Param("filtro") String filtro, Pageable pageable);
}
