package com.institutoamiga.api.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record DoacaoResponseDTO(
    UUID id,
    String tipoItem,
    int quantidade,
    String pontoDestino,
    LocalDateTime criadoEm
) {
}
