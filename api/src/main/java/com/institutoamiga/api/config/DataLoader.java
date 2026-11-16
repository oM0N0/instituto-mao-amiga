package com.institutoamiga.api.config;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.institutoamiga.api.entity.Ponto;
import com.institutoamiga.api.repository.PontoRepository;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(PontoRepository repository) {
        return args -> {
            if (repository.count() > 0) return;

            repository.saveAll(List.of(
                new Ponto("Mercado Central de Goiânia", "Av. Anhanguera, 1000", "Setor Central", "Seg a Sáb, 7h às 18h", "coleta"),
                new Ponto("Feira do Setor Sul", "Praça do Cruzeiro", "Setor Sul", "Sáb e Dom, 6h às 12h", "distribuição"),
                new Ponto("Paróquia São José", "Rua 3, 250", "Setor Oeste", "Ter e Qui, 14h às 17h", "distribuição"),
                new Ponto("Escola Municipal Esperança", "Av. Goiás, 1500", "Setor Central", "Seg a Sex, 7h às 12h", "coleta"),
                new Ponto("Centro Comunitário Vila Nova", "Rua VN-7, Quadra 15", "Vila Nova", "Seg, Qua e Sex, 9h às 16h", "distribuição"),
                new Ponto("Associação Parque Atheneu", "Av. Rio Verde, 2800", "Parque Atheneu", "Ter a Sáb, 8h às 14h", "coleta"),
                new Ponto("Supermercado Boa Vida", "Av. T-9, 500", "Setor Campinas", "Seg a Sáb, 9h às 20h", "coleta"),
                new Ponto("Igreja Jardim América", "Rua C-150, 78", "Jardim América", "Qua e Sex, 10h às 15h", "distribuição"),
                new Ponto("CRAS Leste Universitário", "Rua 230, 120", "Setor Leste Universitário", "Seg a Sex, 8h às 17h", "distribuição"),
                new Ponto("Posto de Saúde Bueno", "Rua T-36, 300", "Setor Bueno", "Seg a Sex, 7h às 16h", "coleta"),
                new Ponto("Associação Setor Pedro Ludovico", "Rua 1040, 55", "Setor Pedro Ludovico", "Ter e Qui, 9h às 14h", "distribuição"),
                new Ponto("Mercado do Setor Marista", "Av. 136, 800", "Setor Marista", "Seg a Sáb, 8h às 19h", "coleta"),
                new Ponto("Centro Social Jardim Guanabara", "Rua JG-3, 90", "Jardim Guanabara", "Seg, Qua e Sex, 8h às 12h", "distribuição"),
                new Ponto("Paróquia Santa Rita", "Av. Independência, 450", "Setor Aeroporto", "Sáb, 9h às 13h", "coleta"),
                new Ponto("Escola Estadual do Setor Coimbra", "Rua C-180, 200", "Setor Coimbra", "Seg a Sex, 7h às 11h", "coleta"),
                new Ponto("ONG Mãos Solidárias", "Rua 15, 330", "Setor Norte Ferroviário", "Ter a Sex, 10h às 16h", "distribuição"),
                new Ponto("Feira do Setor Campinas", "Praça Campinas", "Setor Campinas", "Dom, 6h às 12h", "coleta"),
                new Ponto("Centro Espírita Setor Oeste", "Rua 9, 100", "Setor Oeste", "Qua e Sáb, 14h às 17h", "distribuição"),
                new Ponto("Supermercado Popular Bairro Feliz", "Av. Goiás Norte, 2200", "Bairro Feliz", "Seg a Sáb, 8h às 20h", "coleta"),
                new Ponto("Associação Jardim Novo Mundo", "Rua NM-5, 45", "Jardim Novo Mundo", "Seg a Sex, 9h às 15h", "distribuição"),
                new Ponto("CRAS Sudoeste", "Av. Rio Verde, 5000", "Setor Sudoeste", "Seg a Sex, 8h às 17h", "distribuição"),
                new Ponto("Igreja Setor Universitário", "Praça Universitária, 10", "Setor Universitário", "Ter e Qui, 10h às 14h", "coleta"),
                new Ponto("Mercado Setor Gentil Meireles", "Rua GM-1, 300", "Setor Gentil Meireles", "Seg a Sáb, 7h às 18h", "coleta"),
                new Ponto("Centro Comunitário Parque Amazônia", "Rua PA-12, 88", "Parque Amazônia", "Qua e Sex, 9h às 13h", "distribuição"),
                new Ponto("Associação Vila Redenção", "Rua VR-8, 60", "Vila Redenção", "Seg, Qua e Sex, 8h às 14h", "distribuição")
            ));
        };
    }
}
