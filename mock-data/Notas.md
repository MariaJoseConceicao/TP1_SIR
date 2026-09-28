# Observações sobre o json-server

## Problema dos IDs

Quando faço um `POST` pelo Postman, envio o seguinte no body:

```json
{
  "id": "3",
  "nome": "Novo aluno"
}


 Contudo, o json-server gera um ID aleatório, por exemplo:
 
 ```json
{
  "id": "GdvZxwz26mI",
  "nome": "Novo aluno"
}

# nao sei porque isso acontece  -> perguntar ao stor!!!!