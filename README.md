# AngularClientCrud

Projeto destinado a testes com Angular. Nesse está contemplado conceitos básicos do angular, juntamente com práticas de testes unitários e de integração.

## Instalação e execução

Para instalar as dependências do projeto execute o seguinte comando:

`npm install`

Após isso basta rodar o comando `ng serve` para compilar e rodar o servidor. O projeto executará no endereço [http://localhost:4200](http://localhost:4200).

## Estrutura do projeto

A estrutura de pasta do projeto, no geral, segue o padrão já estabelecido pelo Angular. Contudo foi feito uma adição a essa estrutura a fim de deixar o projeto mais organizado. Dentro da pasta `app` temos subpastas que são referentes a módulos do Angular. O módulo `shared`, em específico, é o módulo responsável por reunir artefatos que são comuns a toda a aplicação. Dentro de cada módulo temos as pastas `components`, `models` e `services`. A pasta `components` contem os comoponentes do respectivo módulo, assim como `services` contem os serviços e `models` contem os modelos de domíno da aplicação.

## Compilação

Para compilar o projeto em modo de desenvolvimento execute o comando `ng build`. O resultado da compilação estará na pasta `dist` na raiz do projeto. Esta poderá ser servida pelo servidor web da sua preferência.

Para compilar o projeto em modo de produção basta adicionar o parâmetro `--prod` ao comando `ng build`.

## Testes

Para rodar os testes unitários basta executar o comando `ng test`. 

Para os testes de integração é necessário dois requisitos: ter o Chrome instalado na máquina onde os testes irão executar e ter a aplicação rodando no endereço `http://localhost:4200`. Após isso basta executar o comando `npm run cypress:open`, caso queira ver os testes rodando no browser, ou `npm run cypress:run` para que os mesmos rodem em linha de comando.

## Ambiente de produção

A aplicação está hospedada na plataforma [Netlify](https://www.netlify.com). Além de oferecer recursos para servir aplicações web também é provê suporte para implementar CI/CD. No caso deste projeto é necessário que as regras do TSLint sejam obedecidas e que os testes unitários estejam passando para que uma nova versão da aplicação possa rodar em produção. O endereço de acesso para a aplicação em produção é [https://angular-client-crud.netlify.com/](https://angular-client-crud.netlify.com/)

## Pontos de melhoria
- Aumentar a cobertura dos testes unitários
- Realizar testes unitários nos componentes
- Criar testes e2e para fluxos de exceção
- Substituir o local storage pelo indexeddb
