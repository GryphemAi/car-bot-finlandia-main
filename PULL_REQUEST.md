# Implementação do Banco de Dados SQLite

> Última atualização: 03 de janeiro de 2024
>
> Status: Otimizações de performance e limpeza de código implementadas

## Histórico de Atualizações

### 03 de janeiro de 2024

- Atualização do sistema de deploy
- Configurações de ambiente atualizadas
- Otimização do processo de build

### 29 de novembro de 2023

- Otimizações de performance no banco de dados
- Remoção de arquivos não utilizados
- Limpeza e organização do código
- Atualização das migrações Prisma

### 28 de novembro de 2023

- Implementação inicial do banco SQLite
- Criação dos modelos e estruturas básicas
- Configuração inicial das APIs

## Descrição

Esta implementação adiciona um banco de dados SQLite ao projeto para armazenar os dados dos carros de forma persistente. O SQLite foi escolhido por ser:

- Leve e não necessitar de servidor separado
- Fácil de configurar e manter
- Ideal para desenvolvimento e testes

## Alterações Realizadas

### 1. Novas Dependências

- Adicionado `sqlite3` para o banco de dados
- Adicionado `sequelize` como ORM

### 2. Estrutura do Banco de Dados

- Criado modelo `Car` com os campos:
  - id (PRIMARY KEY, autoincrement)
  - nome (nome do carro)
  - ID (identificador único do carro)
  - placa (placa do veículo)
  - vendedor (nome do vendedor)
  - preco (valor do veículo)
  - data (data do anúncio)
  - condicao (estado do veículo)
  - contato (informações de contato)
  - quilometragem (quilometragem do veículo)
  - ano (ano do veículo)
  - motor (especificações do motor)
  - cambio (tipo de câmbio)
  - proprietarios (histórico de proprietários)
  - inspecionado (status de inspeção)
  - sistema_de_transmissao (tipo de transmissão)
  - especificacoes (detalhes técnicos)
  - seguranca (itens de segurança)
  - interior_comodidades (características internas)
  - eletronica (equipamentos eletrônicos)
  - informacoes_adicionais (outras informações)
  - outros (dados complementares)
  - imagem (URL da imagem do veículo)
  - createdAt e updatedAt (timestamps automáticos)
- Atualizado o modelo `Car` com otimizações de performance
- Removido arquivo de journal do SQLite para evitar bloqueios
- Simplificada a estrutura de migrações do Prisma
- Otimizada a configuração do banco de dados para melhor desempenho

### 3. APIs Implementadas

- GET `/api/cars` - Lista todos os carros
- POST `/api/cars` - Adiciona um novo carro

### 4. Limpeza de Código

- Removidos arquivos não utilizados (route.js/ts)
- Atualizada a estrutura do projeto para melhor organização
- Otimizadas as dependências no package.json

## Como Testar

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor:

```bash
npm run dev
```

3. Para adicionar um carro (POST `/api/cars`):

```json
{
  "nome": "Toyota Corolla",
  "ID": "CAR123",
  "placa": "ABC1234",
  "vendedor": "João Silva",
  "preco": 120000,
  "data": "2023-11-30",
  "condicao": "Seminovo",
  "contato": "(11) 99999-9999",
  "quilometragem": "50000",
  "ano": "2022",
  "motor": "2.0",
  "cambio": "Automático",
  "proprietarios": "Único dono",
  "inspecionado": true,
  "sistema_de_transmissao": "CVT",
  "especificacoes": "Flex, 4 portas",
  "seguranca": "Airbag, ABS",
  "interior_comodidades": "Ar condicionado, Direção elétrica",
  "eletronica": "Central multimídia, Câmera de ré",
  "informacoes_adicionais": "IPVA pago",
  "outros": "Manual, chave reserva",
  "imagem": "https://exemplo.com/imagem.jpg"
}
```

4. Para listar os carros, acesse GET `/api/cars`

## Estrutura de Arquivos

```
database/
  ├── config.js           # Configuração do SQLite
  └── models/
      └── Car.js         # Modelo de dados do carro
app/
  └── api/
      └── cars/
          └── route.js   # Endpoints da API
```

## Próximos Passos

1. Adicionar mais endpoints (DELETE, PUT)
2. Implementar validações de dados
3. Adicionar testes automatizados
4. Implementar paginação na listagem de carros
5. Adicionar busca por campos específicos
6. Implementar filtros de pesquisa

## Observações

- O arquivo do banco de dados será criado em `./database/cars.sqlite`
- As timestamps são geradas automaticamente
- Campos obrigatórios: nome, ID, placa, vendedor, preco, data, condicao, contato, quilometragem, ano, motor, cambio, proprietarios
- Campos opcionais: sistema_de_transmissao, especificacoes, seguranca, interior_comodidades, eletronica, informacoes_adicionais, outros, imagem
