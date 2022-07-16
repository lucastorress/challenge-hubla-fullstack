# Desafio de programação

O intuito desse teste é avaliar os seus conhecimentos técnicos em programação.

# Descrição do projeto

Surgiu uma nova demanda urgente e precisamos de uma área exclusiva para fazer o upload de um arquivo das transações
feitas na venda de produtos por nossos produtores.

Nossa plataforma trabalha no modelo produtor-afiliado, sendo assim um produtor pode vender seus produtos e ter 1 ou N
afiliados também vendendo esses produtos, desde que seja paga uma comissão por venda.

Sua tarefa é construir uma interface web que possibilite o upload de um arquivo de transações de produtos vendidos,
normalizar os dados e armazená-los em um banco de dados relacional.

Você deve utilizar o arquivo [PRODUCTS.txt](PRODUCTS.txt) para fazer o teste manual da aplicação.

# Sua aplicação deve

1. Ter uma tela (via formulário) para fazer o upload do arquivo
2. Fazer o parser do arquivo recebido, normalizar os dados e armazená-los em um banco de dados relacional, seguindo as definições de interpretação do arquivo
3. Exibir a lista das transações de produtos importadas por produtor/afiliado, com um totalizador do valor das
   transações realizadas
4. Ser simples de configurar e rodar, compatível com ambiente Unix (utilizar apenas bibliotecas gratuitas ou livres)
5. Ter um README descrevendo o projeto e como fazer o setup
6. Ter documentacao das APIs que o backend chama no frontend.

Sobre tecnologias e práticas de programação:

1. Escolha a linguagem que quiser
2. Use qualquer banco de dados relacional
3. Use commits pequenos no Git e escreva uma boa descrição para cada um
4. Escreva unit tests
5. Tente fazer o código mais legível e limpo possivel
6. Escreva o código (nomes e comentários) em inglês. Se se sentir confortável escreva as documentações também em
   inglês, mas pode ser em Português se preferir.

# Sua aplicação não precisa

1. Lidar com autenticação ou autorização (mas você ganha pontos extras se fizer)
2. Ser escrita usando algum framework específico (mas não tem problema usar)
3. Documentação da API (mas você ganha pontos extras se fizer)
4. Utilizar docker e docker-compose (mas você ganha pontos extras se fizer)
5. Ter testes integrados/end-to-end (mas você ganha pontos extras se fizer)

# Documentação do arquivo de cadastro

| Campo    | Início | Fim | Tamanho | Descrição                                       |
| -------- | ------ | --- | ------- | ----------------------------------------------- |
| Tipo     | 1      | 1   | 1       | Tipo da transação                               |
| Data     | 2      | 26  | 25      | Data - ISO Date + GMT                           |
| Produto  | 27     | 56  | 30      | Descrição do produto                            |
| Valor    | 57     | 66  | 10      | Valor da transação (precisa ser divido por 100) |
| Vendedor | 67     | 86  | 20      | Nome do vendedor                                |

# Documentação dos tipos de transação

| Tipo | Descrição         | Natureza | Sinal |
| ---- | ----------------- | -------- | ----- |
| 1    | Venda produtor    | Entrada  | +     |
| 2    | Venda afiliado    | Entrada  | +     |
| 3    | Comissão paga     | Saída    | -     |
| 4    | Comissão recebida | Entrada  | +     |

# Avaliação

Seu projeto será avaliado de acordo com os seguintes critérios:

1. Desenvolvimento dos [requisitos básicos](#Sua-aplicação-deve)
2. Documentação correta do setup do ambiente e execução da aplicação
3. Cobertura de testes

# Instruções para entrega do desafio

1. Faça o clone desse repositório
2. Implemente o projeto em seu clone local
3. Crie um git-bundle com o seu trabalho, veja detalhes na próxima sessão
4. Envie o arquivo do bundle para nós via email, para a mesma pessoa que te enviou o desafio.

**Dica:** Sugerimos abrir um branch partindo da `main` para o desenvolvimento do desafio.

## Criando o git-bundle

Para gerar um [git bundle](https://git-scm.com/docs/git-bundle), basta rodar
o seguinte comando, substituindo o seu nome:

```
git bundle create nome-sobrenome.bundle HEAD <nome_branch>
```

### Verificar o bundle

Para verificar o arquivo antes de enviar utilize o seguinte comando:

```
git clone nome-sobrenome.bundle hubla-take-home
```

A cópia do seu trabalho vai estar em `hubla-take-home`.

# Boa sorte!!!
