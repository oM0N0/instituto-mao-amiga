package com.institutoamiga.api.dto;

public record PontoDTO(
    String pontoId,
    String nome,
    String endereco,
    String diasHorarios,
    String recebeDistribui,
    Double latitude,
    Double longitude
) {
}
