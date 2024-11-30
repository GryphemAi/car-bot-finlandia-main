# Implementação do Banco de Dados SQLite

> Última atualização: 30 de novembro de 2024
>
> Status: Otimizações de performance e limpeza de código implementadas

## Histórico de Atualizações

### 30 de novembro de 2024

- Implementada e testada integração com API externa via Insomnia
- Adicionados logs detalhados para debug nas rotas
- Correção de campos obrigatórios no modelo Car
- Documentação atualizada com instruções de teste
- Validação e tratamento de erros aprimorados
- Atualização do sistema de deploy
- Configurações de ambiente atualizadas
- Otimização do processo de build

### 29 de novembro de 2024

- Otimizações de performance no banco de dados
- Remoção de arquivos não utilizados
- Limpeza e organização do código
- Atualização das migrações Prisma

### 28 de novembro de 2024

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

### 1. Configuração do Ambiente

```bash
# Instalar dependências
npm install

# Inicializar o banco de dados
node database/init.js

# Iniciar o servidor
node app.js
```

### 2. Testando a API com Insomnia

1. Criar novo request POST para `http://localhost:3000/api/cars`
2. Configurar header `Content-Type: application/json`
3. Adicionar o seguinte JSON no body:

```json
{
  "nome": "Toyota Corolla",
  "carId": "TC2023001",
  "preco": 85000.0,
  "ano": "2023",
  "placa": "ABC1234",
  "vendedor": "João Silva",
  "quilometragem": "15000",
  "data": "2024-01-01",
  "condicao": "novo",
  "contato": "(11) 99999-9999",
  "motor": "2.0",
  "cambio": "Automático",
  "proprietarios": "1",
  "inspecionado": true
}
```

4. Para listar os carros cadastrados, criar request GET para `http://localhost:3000/api/cars`

### 3. Integração com Bot Externo

Para integrar um bot externo com a API, siga estas instruções:

1. O bot deve fazer uma requisição POST para `http://localhost:3000/api/cars`
2. Headers necessários:
   - `Content-Type: application/json`
3. O body deve conter todos os campos obrigatórios do modelo Car:

   - nome
   - carId
   - placa
   - vendedor
   - preco
   - data
   - condicao
   - contato
   - quilometragem
   - ano
   - motor
   - cambio
   - proprietarios
   - inspecionado

4. Exemplo de código para integração (Node.js):

```javascript
const axios = require('axios');

async function enviarCarro(dadosCarro) {
  try {
    const response = await axios.post(
      'http://localhost:3000/api/cars',
      dadosCarro,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('Carro salvo com sucesso:', response.data);
  } catch (error) {
    console.error(
      'Erro ao salvar carro:',
      error.response?.data || error.message
    );
  }
}
```

## Próximos Passos

1. Implementar validação de dados mais robusta
2. Adicionar endpoints para atualização e deleção de carros
3. Implementar sistema de cache para melhorar performance
4. Adicionar testes automatizados

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

## Observações

- O arquivo do banco de dados será criado em `./database/cars.sqlite`
- As timestamps são geradas automaticamente
- Campos obrigatórios: nome, ID, placa, vendedor, preco, data, condicao, contato, quilometragem, ano, motor, cambio, proprietarios
- Campos opcionais: sistema_de_transmissao, especificacoes, seguranca, interior_comodidades, eletronica, informacoes_adicionais, outros, imagem
