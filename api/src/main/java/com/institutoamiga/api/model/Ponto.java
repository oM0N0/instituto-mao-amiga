package com.institutoamiga.api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Ponto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String endereco;
    private String diasHorarios;
    private String recebeDistribui;
    private Double latitude;
    private Double longitude;

    public Ponto() {}

    public Ponto(String nome, String endereco, String diasHorarios, String recebeDistribui, Double latitude, Double longitude) {
        this.nome = nome;
        this.endereco = endereco;
        this.diasHorarios = diasHorarios;
        this.recebeDistribui = recebeDistribui;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public String getDiasHorarios() { return diasHorarios; }
    public String getEndereco() { return endereco; }
    public Long getId() { return id; }
    public Double getLatitude() { return latitude; }
    public Double getLongitude() { return longitude; }
    public String getNome() { return nome; }
    public String getRecebeDistribui() { return recebeDistribui; }
}