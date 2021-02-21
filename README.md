## WEB API BIONEXO TESTE FULL-STACK

Este projeto tem como finalidade desenvolver uma web api para geolocalizar unidades basicas de atendimento (UBS) mais proximas. 

##### Configuração/Ferramentas

---

- Banco de dados sqlite (não utilizado) - sem migrates
- Ruby 2.6.5
- Rails 6.1.3
- Comando abaixo para iniciar o projeto :

```
  bundle install
  rails db:migrate
  rails s
```
- Postman Canary utilizado para requisições REST.
###### END POINTS

- URL de envio:

```shell
curl --location --request GET 'http://localhost:3000/api/v1/find_ubs?query=-23.604936,-46.692999&page=1&per_page=10' \
```
- parametros

```code
query = [-23.604936,-46.692999]
page = 1
per_page = 10
```
- Exemplo de retorno

```json
{
    "current_page": 1,
    "per_page": 2,
    "total_entries": 37690,
    "entries": [
        {
            "id": 419,
            "name": "UBS VILA PAULINA SAUDE DA FAMILIA",
            "address": "VILA PAULINA - AVENIDA AFRANIO PEIXOTO",
            "city": "Diadema",
            "phone": "1140590660",
            "geocode": {
                "lat": -23.7298464775079,
                "long": -46.6179513931261
            },
            "scores": {
                "size_ambience": "Desempenho mediano ou  um pouco abaixo da média",
                "adaptation_for_seniors": "Desempenho mediano ou  um pouco abaixo da média",
                "medical_equipment": "Desempenho mediano ou  um pouco abaixo da média",
                "medicine": "Desempenho mediano ou  um pouco abaixo da média"
            }
        },
        {
            "id": 1058,
            "name": "UBS JORDANOPOLIS",
            "address": "JORDANOPOLIS - RUA OSWALDO CRUZ",
            "city": "São Bernardo do Campo",
            "phone": "1141789949",
            "geocode": {
                "lat": -23.6838841438287,
                "long": -46.5755081176744
            },
            "scores": {
                "size_ambience": "Desempenho acima da média",
                "adaptation_for_seniors": "Desempenho mediano ou  um pouco abaixo da média",
                "medical_equipment": "Desempenho mediano ou  um pouco abaixo da média",
                "medicine": "Desempenho muito acima da média"
            }
        }
    ]
}
```

### Pagina inicial
* No seu navegado digite a url abaixo para visualização do front end
  * http://localhost:3000
  
### TESTES

* Para executa os testes, no terminal raiz do projeto digite:
```shell
 bundle exec rspec spec/controller/unities_controller_spec.rb
```