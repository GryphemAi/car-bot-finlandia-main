# Configuração do Banco de Dados e Deploy

Este documento descreve a configuração e uso do Firebase Firestore como banco de dados para o projeto Car Bot Finlândia.

## Índice

- [Configuração do Firebase](#configuração-do-firebase)
- [Estrutura dos Dados](#estrutura-dos-dados)
- [Guia de Uso do Bot](#guia-de-uso-do-bot)
- [Scripts de Teste](#scripts-de-teste)
- [Segurança](#segurança)
- [Deploy na Vercel](#deploy-na-vercel)

## Configuração do Firebase

### 1. Criar Projeto no Firebase

1. Acesse o [Firebase Console](https://console.firebase.google.com)
2. Clique em "Adicionar projeto"
3. Digite um nome para o projeto (ex: "car-bot-finlandia")
4. Desative o Google Analytics (opcional)
5. Clique em "Criar projeto"

### 2. Configurar o Firestore Database

1. No menu lateral, clique em "Firestore Database"
2. Clique em "Criar banco de dados"
3. Selecione "Iniciar no modo de produção"
4. Escolha a região mais próxima (ex: "southamerica-east1")
5. Clique em "Ativar"

### 3. Gerar Credenciais de Serviço

1. No menu lateral, clique na engrenagem (⚙️) ao lado de "Visão geral do projeto"
2. Selecione "Configurações do projeto"
3. Vá para a aba "Contas de serviço"
4. Em "Firebase Admin SDK", clique em "Gerar nova chave privada"
5. Salve o arquivo JSON baixado

### 4. Configurar o Projeto

1. Renomeie o arquivo JSON baixado para `serviceAccountKey.json`
2. Mova-o para a pasta `config/` do projeto
3. Crie um arquivo `.env` na raiz do projeto com:
   ```env
   FIREBASE_PROJECT_ID=seu-projeto-id
   FIREBASE_CLIENT_EMAIL=seu-client-email
   FIREBASE_PRIVATE_KEY="sua-private-key"
   ```
   > ⚠️ Mantenha as aspas duplas na PRIVATE_KEY

## Estrutura dos Dados

### Coleção 'cars'

Cada documento na coleção representa um carro com os seguintes campos:

```json
{
  "nome": "Nome do Carro",
  "carID": "ID-ÚNICO",
  "placa": "ABC-1234",
  "vendedor": "Nome do Vendedor",
  "preco": "50000",
  "data": "2024-01-20",
  "condicao": "Usado",
  "quilometragem": "50000",
  "ano": "2020",
  "loteId": "2024-01-20-LOTE1",
  "createdAt": "2024-01-20T10:00:00Z",
  "updatedAt": "2024-01-20T10:00:00Z"
}
```

> 💡 O campo `loteId` é usado para identificar grupos de carros enviados juntos

## Guia de Uso do Bot

### 1. Autenticação

Para enviar dados, o bot precisa de um token de acesso OAuth2. Use o script fornecido:

```bash
node scripts/generate-token.js
```

O token gerado é válido por 1 hora. Guarde-o para usar nas requisições.

### 2. Envio de Lote de Carros

#### Endpoint

```
POST https://firestore.googleapis.com/v1/projects/SEU-PROJETO/databases/(default)/documents/cars:batchWrite
```

#### Headers

```
Content-Type: application/json
Authorization: Bearer SEU-TOKEN
```

#### Body (Exemplo)

```json
{
  "writes": [
    {
      "document": {
        "fields": {
          "nome": { "stringValue": "Fiat Uno" },
          "carID": { "stringValue": "123" },
          "loteId": { "stringValue": "2024-01-20-LOTE1" }
          // ... outros campos
        }
      }
    }
  ]
}
```

### 3. Substituição Automática de Lotes

Para substituir todos os carros antigos por um novo lote:

1. **Gere um novo `loteId`** único (ex: data atual + identificador)
2. **Envie o novo lote** usando o endpoint acima
3. **Delete o lote antigo** usando:

```bash
node scripts/delete-all-cars.js --loteid LOTE-ANTIGO
```

> 💡 O sistema mantém apenas os carros do lote mais recente

### 4. Verificação dos Dados

Para verificar os carros enviados:

```bash
# Listar todos os carros
node scripts/list-cars.js

# Listar carros de um lote específico
node scripts/list-cars.js --loteid SEU-LOTE-ID
```

## Scripts de Teste

O projeto inclui scripts úteis em `scripts/`:

- `generate-token.js`: Gera token de acesso
- `list-cars.js`: Lista carros no banco
- `delete-all-cars.js`: Remove carros por lote
- `test-firestore-api.js`: Testa a API do Firestore

## Segurança

⚠️ **Importante**:

1. NUNCA compartilhe seu `serviceAccountKey.json`
2. NUNCA comite credenciais no Git
3. Mantenha o `.env` no `.gitignore`
4. Gere novos tokens periodicamente
5. Use HTTPS para todas as requisições

## Deploy na Vercel

O projeto está configurado para ser facilmente deployado na Vercel. Siga estas etapas:

### 1. Preparação

1. Crie uma conta na [Vercel](https://vercel.com)
2. Conecte seu repositório GitHub
3. Selecione o repositório para deploy

### 2. Configuração de Variáveis de Ambiente

No painel da Vercel, vá em Settings > Environment Variables e adicione:

```bash
# Firebase Web SDK (públicas)
NEXT_PUBLIC_FIREBASE_API_KEY=seu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_projeto_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id

# Firebase Admin SDK (privadas)
FIREBASE_PROJECT_ID=seu_projeto_id
FIREBASE_CLIENT_EMAIL=seu_client_email
FIREBASE_PRIVATE_KEY="sua_private_key"  # Mantenha as aspas!
```

> ⚠️ Para `FIREBASE_PRIVATE_KEY`, copie o valor exato do arquivo JSON, incluindo as quebras de linha.

### 3. Deploy

1. A Vercel detectará automaticamente que é um projeto Next.js
2. Use a configuração padrão sugerida
3. Clique em "Deploy"

### 4. Verificação

Após o deploy:

1. Teste o acesso ao Firestore pelo site
2. Verifique se o bot ainda consegue enviar dados
3. Confirme se as listagens de carros aparecem corretamente

### Observações Importantes

- O bot e o site são independentes:
  - Bot: usa API REST do Firestore com token OAuth2
  - Site: usa SDK do Firebase com credenciais da Vercel
- As variáveis `NEXT_PUBLIC_*` ficam expostas no cliente (normal)
- As variáveis `FIREBASE_*` são usadas apenas no servidor
- O site pode usar tanto a API REST quanto o SDK do Firebase

## Suporte

Se encontrar problemas:

1. Verifique se as credenciais estão corretas
2. Confirme se o token está válido
3. Use os scripts de teste para debug
4. Verifique os logs do Firebase Console
