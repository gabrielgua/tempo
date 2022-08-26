# Tempo App

## Descrição
  - Projeto de previsão do tempo consumindo duas APIs externas.
  
## Utilização
  - Ao abrir o app, o mesmo pesquisará através das coordenadas do navegador a localização do usuário, e assim buscará o tempo na área.
  - Caso queira pesquisar uma cidade, apenas busque pelo nome no campo de busca.
  
    - Para cidades fora do Brasil o nome pesquisado deve ser em inglês.
    - Caso exista mais de uma cidade com o mesmo nome e a retornada não for a desejada, é possível buscar por países também, apenas inserindo o nome da cidade separada por uma vírgula com o código [ISO 3166](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) do país. Ex.: London, US ou London, GB.
    - Caso a cidade pesquisada não for encontrada, o app retornará uma mensagem de erro e a previsão de tempo da localização atual do usuário.

## Live Demo
  - https://tempo-beta.vercel.app/
  
## Tecnologias utilizadas
  - Angular 14 (front-end)
  - Vercel (deploy)
  - ### APIs
    - [OpenWeatherMap](https://openweathermap.org/api/one-call-3/)
    - [Geocoding API](https://openweathermap.org/api/geocoding-api)
