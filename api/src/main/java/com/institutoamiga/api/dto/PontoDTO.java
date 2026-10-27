package com.institutoamiga.api.dto;

public record PontoDTO(
    Long id,
    String nome,
    String endereco,
    String diasHorarios,
    String recebeDistribui,
    Double latitude,
    Double longitude
) {
}