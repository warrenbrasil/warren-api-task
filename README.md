# Warren Backend Task

Bem vindo!

Esse exercicio de backend envolve construir uma REST API simples em Node.js/Express.js.

## Modelos de dados

### Customer

Estrutura de usuario padrão da plataforma. Alguns pontos de atenção:
- `balance`: saldo da conta do usuario. Por este atributo que ocorrem as transações financeiras. Saldo da conta nunca pode ser negativo.
- `portfolios`: lista de subdocumentos de `Portfolio`

### Portfolio

Portfólio de investimentos é o conjunto de aplicações do investidor, também chamado de carteira de investimentos. Neste exercicio foi simplificada para uma estrutura mais basica:
- `amount`: quantidade atualmente alocada no portfolio
- `amountGoal`: quantidade total do objetivo alvo do portfolio

### Transaction

`Transaction` é o mapeamento de uma transação financeira da plataforma:
- `type`: tipo da transação:
  - `deposit`: deposito externo para saldo da conta do `customer`
  - `withdraw`: resgate do saldo do usuario para fora da plataforma
  - `account_transfer`: transferencia entre dois `customer` a partir de seus saldos de conta
  - `portfolio_deposit`: movimentação financeira do saldo de um `customer` para o `amount` de um portfolio pertencente
  - `portfolio_transfer`: transferencia entre dois portfolios de um mesmo `customer`
  - `portfolio_withdraw`: retirada de uma certa quantia de um portfolio para o saldo do customer dono do portfolio
- `status`: status atual da transação:
  - `pending`: transação em processamento
  - `accepted`: transação processada e aceita
  - `rejected`: transação processada e recusada
  - `deleted`: transação deletada
- `fromPortfolio`: referencia `Portfolio` para transações com direção saindo de um portfolio. Se não tem relação a portfolio campo não existe no documento.
- `toPortfolio`: referencia `Portfolio` para transações com direção entrando em um portfolio. Se não tem relação a portfolio campo não existe no documento.
- `toCustomer`: referencia `Customer` para transações com direção entrando para um outro customer. Se transação não é `account_transfer` campo não existe no documento.

**Toda transação financeira realizada deve ser registrado um novo documento no banco com as informações devidas**

## Rodando o projeto

A imagem da API do projeto é construida apartir de um Dockerfile. Utilizamos [docker-compose](https://docs.docker.com/compose/gettingstarted/) para inicializar os containers da API e database.

Para rodar a aplicação, inicializar e popular o banco de dados basta rodar `docker-compose up`.

## APIs a implementar

Para especificar qual customer da request é repassado o seu id via header: `customer-id = <string>`

1. ***GET*** `/portfolios/:id` - Essa rota esta quebrada! Dado um id de um portfolio essa rota deve retornar os dados do portfolio.

1. ***GET*** `/portfolios/goalReached` - Retorna uma lista de todos portfolios de um determinado customer em que a quantidade alocada no portfolio é igual ou maior que o objetivo alvo do portfolio.

1. ***GET*** `/transactions/deposits?status=<string>&start=<date>&end=<date>` - Retorna uma lista de transações `deposit` do customer abertas de um determinado `status` entre um determinado período de tempo delimitado por `start` e `end`

1. ***POST*** `/transactions/deposit` - Depositar um valor `amount` na conta do usuario que fez a requisição.

1. ***POST*** `/transactions/account-transfer/:customerId` - Transferência entre customer que fez a chamada em direção a conta de outro customer `<customerId>`

1. ***POST*** `/transactions/portfolio-transfer?fromPortfolio=<string>toPortfolio=<string>` - Transferência entre dois portfolios de um customer.

1. ***GET*** `/admin/topAllocationAmount?page=<integer>&pageSize=<integer>` - Retorna lista de clientes com maior valor alocado juntando todos seus portfolios. Contém paginação[^1].

1. ***GET*** `/admin/topCashChurn?page=<integer>&pageSize=<integer>&start=<date>&end=<date>` - Retorna os clientes que mais retiraram dinheiro da plataforma entre um determinado periodo de tempo delimitado por `start` e `end`. Contém paginação[^1].

[^1]: `pageSize` (*limit*) é o número de itens a serem retornados, `page` (*offset*) é o número da página a ser mostrada a partir do `pageSize` descrito. Exemplo: `pageSize=10` e `page=0` retorna somente os 10 primeiros itens listados, `pageSize=10` e `page=1` retorna dos 11 aos 20 itens listados.

## Pontos de atenção

- Toda novo pacote adicionado deve ter uma breve explicação do motivo a ser usado.
- Você tem total liberdade para mudar a estrutura base dos modelos de dados fornecidos nesse desafio.
- Seria interessante que todas alterações e novas features fossem levadas para a branch principal do projeto utilizando as melhores praticas de seu conhecimento.

## Indo além dos requisitos

Aqui na Warren prezamos pelo nosso lema *Get Shit Done*, ou seja, concluir o esperado e da melhor maneira possível.
Se você ficou com tempo sobrando seria interessante demonstrar seus conhecimentos como um diferencial. Por exemplo, testes unitários ou uma diferente estrutura de projeto.
