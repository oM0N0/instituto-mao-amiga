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
- O banco fica gravado em arquivo na pasta `api/data/`. Na primeira execução são cadastrados 8 pontos em Goiânia; nas próximas a carga não duplica.

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
