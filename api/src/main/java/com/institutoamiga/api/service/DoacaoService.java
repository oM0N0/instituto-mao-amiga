package com.institutoamiga.api.service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.NoSuchElementException;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.institutoamiga.api.dto.DoacaoRequestDTO;
import com.institutoamiga.api.dto.DoacaoResponseDTO;
import com.institutoamiga.api.entity.Doacao;
import com.institutoamiga.api.repository.DoacaoRepository;

@Service
public class DoacaoService {

    private final DoacaoRepository repository;

    public DoacaoService(DoacaoRepository repository) {
        this.repository = repository;
    }

    public Page<DoacaoResponseDTO> filtrar(String filtro, Pageable pageable) {
        return repository.filtrar(filtro, pageable).map(this::toResponse);
    }

    public DoacaoResponseDTO buscarPorId(UUID id) {
        return toResponse(buscarEntidade(id));
    }

    public DoacaoResponseDTO cadastrar(DoacaoRequestDTO dto) {
        Doacao doacao = new Doacao();
        doacao.setTipoItem(dto.tipoItem());
        doacao.setQuantidade(dto.quantidade());
        doacao.setPontoDestino(dto.pontoDestino());
        // a data é definida aqui no servidor, nunca vem do app
        doacao.setCriadoEm(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS));
        return toResponse(repository.save(doacao));
    }

    public DoacaoResponseDTO editar(UUID id, DoacaoRequestDTO dto) {
        Doacao doacao = buscarEntidade(id);
        doacao.setTipoItem(dto.tipoItem());
        doacao.setQuantidade(dto.quantidade());
        doacao.setPontoDestino(dto.pontoDestino());
        // criadoEm não é alterado na edição
        return toResponse(repository.save(doacao));
    }

    public void excluir(UUID id) {
        if (!repository.existsById(id)) {
            throw new NoSuchElementException("Doação não encontrada");
        }
        repository.deleteById(id);
    }

    private Doacao buscarEntidade(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Doação não encontrada"));
    }

    private DoacaoResponseDTO toResponse(Doacao d) {
        return new DoacaoResponseDTO(d.getId(), d.getTipoItem(), d.getQuantidade(), d.getPontoDestino(), d.getCriadoEm());
    }
}
