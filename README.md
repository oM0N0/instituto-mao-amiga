# Instituto Mão Amiga

App para o Instituto Mão Amiga, ONG que opera um banco de alimentos comunitário.
O app resolve a falta de visibilidade sobre os pontos de coleta e distribuição de doações.

A partir da N2, pontos de coleta e doações ficam numa API Spring Boot, que está na pasta [`api/`](api/) deste mesmo repositório. O app (Expo / React Native) fica na raiz.

## Como rodar

### API (pasta `api/`)

- Java 17 ou superior.
- Dentro da pasta `api/`, rodar:
  - Windows (PowerShell): `.\mvnw spring-boot:run`
  - Linux/Mac: `./mvnw spring-boot:run`
- A API sobe em `http://localhost:8080`.
- Swagger: http://localhost:8080/swagger-ui/index.html
- Console do H2: http://localhost:8080/h2-console (JDBC URL `jdbc:h2:file:./data/instituto`, usuário `sa`, sem senha).
- O banco fica gravado em arquivo na pasta `api/data/`. Na primeira execução são cadastrados 25 pontos em Goiânia; nas próximas a carga não duplica. Para voltar ao estado inicial, apague a pasta `api/data/` com a API desligada.

### App

1. `npm install`
2. Em `src/services/api.ts`, trocar o IP da constante `API_URL` pelo IP do computador que está rodando a API. No Windows, o IP aparece no comando `ipconfig` ("Endereço IPv4"). O celular precisa estar na mesma rede Wi-Fi que o computador.
3. `npx expo start` e abrir no Expo Go.

O app acessa a API pelo IP do computador na rede local (não usa `localhost`), por isso funciona no celular.

## API: pontos de coleta

| Método | URL | O que faz | Respostas |
|---|---|---|---|
| GET | `http://localhost:8080/api/v1/pontos` | lista todos os pontos | 200 |
| GET | `http://localhost:8080/api/v1/pontos/{id}` | busca um ponto pelo id | 200, 404 |
| POST | `http://localhost:8080/api/v1/pontos` | cadastra um ponto | 201, 400 |
| PUT | `http://localhost:8080/api/v1/pontos/{id}` | edita um ponto | 200, 400, 404 |
| DELETE | `http://localhost:8080/api/v1/pontos/{id}` | exclui um ponto | 204, 404 |

Corpo do POST e do PUT (todos os campos são obrigatórios; `tipo` é `coleta` ou `distribuição`):

```json
{
  "nome": "Paróquia São José",
  "endereco": "Rua 3, 250",
  "bairro": "Setor Oeste",
  "horario": "Ter e Qui, 14h às 17h",
  "tipo": "distribuição"
}
```

Se algum campo vier vazio, a API responde 400 com a mensagem de cada campo e não grava nada. Id que não existe responde 404.

## Busca paginada de pontos

`GET http://localhost:8080/api/v1/pontos/filtro?filtro=...&page=0&size=10`

- Procura o texto no nome ou no bairro, sem diferenciar maiúsculas.
- Sem `filtro`, devolve todos os pontos paginados.
- Padrão: 10 itens por página, ordenados por nome. `sort=bairro,asc` na URL troca a ordem.
- A resposta vem no formato `content` + `page`.

Chamadas de exemplo:

1. Sem filtro: `http://localhost:8080/api/v1/pontos/filtro`
2. Filtrando por bairro: `http://localhost:8080/api/v1/pontos/filtro?filtro=oeste`
3. Segunda página: `http://localhost:8080/api/v1/pontos/filtro?page=1`

## API: doações

| Método | URL | O que faz | Respostas |
|---|---|---|---|
| GET | `http://localhost:8080/api/v1/doacoes/filtro?filtro=...&page=0&size=10` | lista paginada, filtrando pelo tipo de item, da mais nova para a mais antiga | 200 |
| GET | `http://localhost:8080/api/v1/doacoes/{id}` | busca uma doação pelo id | 200, 404 |
| POST | `http://localhost:8080/api/v1/doacoes` | cadastra uma doação | 201, 400 |
| PUT | `http://localhost:8080/api/v1/doacoes/{id}` | edita uma doação | 200, 400, 404 |
| DELETE | `http://localhost:8080/api/v1/doacoes/{id}` | exclui uma doação | 204, 404 |

Corpo do POST e do PUT:

```json
{
  "tipoItem": "Arroz",
  "quantidade": 10,
  "pontoDestino": "Mercado Central de Goiânia"
}
```

`quantidade` precisa ser maior que zero; `tipoItem` e `pontoDestino` não podem ser vazios (senão 400). O campo `criadoEm` é preenchido pela API no cadastro e não muda na edição.
