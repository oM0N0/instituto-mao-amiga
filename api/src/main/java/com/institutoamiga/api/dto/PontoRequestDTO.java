package com.institutoamiga.api.dto;

import jakarta.validation.constraints.NotBlank;

public record PontoRequestDTO(
    @NotBlank(message = "Nome é obrigatório")
    String nome,

    @NotBlank(message = "Endereço é obrigatório")
    String endereco,

    @NotBlank(message = "Bairro é obrigatório")
    String bairro,

    @NotBlank(message = "Horário é obrigatório")
    String horario,

    @NotBlank(message = "Tipo é obrigatório")
    String tipo
) {
}
