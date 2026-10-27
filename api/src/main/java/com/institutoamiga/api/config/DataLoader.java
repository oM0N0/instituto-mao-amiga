package com.institutoamiga.api.config;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.institutoamiga.api.model.Ponto;
import com.institutoamiga.api.repository.PontoRepository;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(PontoRepository repository) {
        return args -> {
            repository.saveAll(List.of(
                new Ponto("Mercado Central de Goiânia", "Av. Anhanguera, 1000 - Setor Central", "Seg a Sáb, 7h às 18h", "Recebe: alimentos não perecíveis, roupas", -16.6799, -49.2550),
                new Ponto("Feira do Setor Sul", "Praça do Cruzeiro - Setor Sul", "Sáb e Dom, 6h às 12h", "Distribui: cestas básicas, hortifrúti", -16.6920, -49.2640),
                new Ponto("Paróquia São José", "Rua 3, 250 - Setor Oeste", "Ter e Qui, 14h às 17h", "Distribui: roupas, cobertores, brinquedos", -16.6830, -49.2680),
                new Ponto("Escola Municipal Esperança", "Av. Goiás, 1500 - Setor Central", "Seg a Sex, 7h às 12h", "Recebe: material escolar, alimentos", -16.6770, -49.2530),
                new Ponto("Centro Comunitário Vila Nova", "Rua VN-7, Quadra 15 - Vila Nova", "Seg, Qua e Sex, 9h às 16h", "Distribui: cestas básicas, produtos de higiene", -16.6450, -49.2970),
                new Ponto("Associação Parque Atheneu", "Av. Rio Verde, 2800 - Parque Atheneu", "Ter a Sáb, 8h às 14h", "Recebe: alimentos, roupas, móveis usados", -16.7350, -49.2200),
                new Ponto("Supermercado Boa Vida - Campinas", "Av. T-9, 500 - Setor Campinas", "Seg a Sáb, 9h às 20h", "Recebe: alimentos não perecíveis", -16.6680, -49.2760),
                new Ponto("Igreja Jardim América", "Rua C-150, 78 - Jardim América", "Qua e Sex, 10h às 15h", "Distribui: roupas, calçados, cobertores", -16.6960, -49.2830)
            ));
        };
    }
}