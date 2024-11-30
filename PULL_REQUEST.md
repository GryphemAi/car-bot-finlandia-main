# Car Bot Finlândia - Sistema de Catálogo de Veículos

> Última atualização: 30 de novembro de 2024
>
> Status: Sistema em produção com Firebase Firestore

## Visão Geral do Projeto

O Car Bot Finlândia é um sistema integrado para gerenciamento e exibição de catálogo de veículos, composto por três componentes principais que trabalham em conjunto:

1. **Bot Externo de Coleta**

   - Coleta automatizada de dados de veículos de diversas fontes
   - Sistema independente que envia dados via API REST
   - Atualização periódica do catálogo em lotes
   - Substituição automática de dados antigos por novos

2. **Banco de Dados (Firebase Firestore)**

   - Armazenamento centralizado de todos os dados
   - Sistema de lotes para controle de versões
   - Acesso via API REST para o bot
   - Acesso direto via SDK para o site
   - Regras de segurança implementadas

3. **Site de Exibição**
   - Interface para visualização do catálogo
   - Atualização em tempo real dos dados
   - Consulta direta ao Firestore
   - Experiência otimizada para o usuário

## Funcionalidades Atuais

### 1. Gestão de Dados

- Coleta automática de informações de veículos
- Processamento e normalização dos dados
- Sistema de lotes para controle de versões
- Backup automático via Firebase

### 2. API REST

- Endpoint único para todas as operações
- Autenticação via Bearer Token
- Suporte a operações em lote
- Formato padronizado de dados

### 3. Segurança

- Autenticação obrigatória para escrita
- Leitura pública para o site
- Tokens com expiração de 1 hora
- Regras granulares no Firestore

### 4. Interface do Site

- Visualização do catálogo de veículos
- Atualização em tempo real
- Consultas otimizadas
- Interface responsiva

## Fluxo de Funcionamento

1. **Coleta de Dados**

   - Bot externo coleta informações de veículos
   - Dados são formatados no padrão do sistema
   - Token de acesso é gerado para autenticação

2. **Atualização do Banco**

   - Bot envia lote de dados via API REST
   - Sistema verifica autenticação
   - Dados antigos são removidos
   - Novos dados são inseridos

3. **Exibição no Site**
   - Site consulta dados atualizados
   - Informações são exibidas em tempo real
   - Interface atualiza automaticamente
   - Usuários veem sempre dados mais recentes

## Tecnologias Utilizadas

- **Backend**: Firebase Firestore
- **API**: REST com autenticação OAuth2
- **Segurança**: Regras do Firestore
- **Frontend**: SDK Firebase para Web

## Próximas Atualizações Planejadas

1. **Performance**

   - Implementação de cache no frontend
   - Otimização de consultas
   - Índices personalizados

2. **Monitoramento**

   - Sistema de logs detalhados
   - Métricas de uso e performance
   - Alertas automáticos

3. **Funcionalidades**
   - Filtros avançados de busca
   - Sistema de favoritos
   - Comparação de veículos

## Manutenção

O sistema requer mínima manutenção devido à:

- Infraestrutura serverless do Firebase
- Backup automático de dados
- Rotação automática de tokens
- Logs e monitoramento integrados
