# 🏆 Bolão da Copa 2026 - SKY FIT Academia

Sistema completo de bolão online para a Copa do Mundo 2026, com funcionalidades de apostas, ranking, painel administrativo e pagamento via PIX.

## 📋 Características Principais

✅ **Página Inicial Responsiva** - Banner atrativo com informações do bolão  
✅ **Sistema de Palpites** - Interface intuitiva para fazer apostas  
✅ **Ranking Dinâmico** - Visualização em tempo real do desempenho  
✅ **Tabela Completa** - Todos os 48 jogos da fase de grupos da Copa 2026  
✅ **Sistema de PIX** - QR Code e copia e cola para pagamento  
✅ **Painel Administrativo** - Gerenciamento completo do bolão com senha  
✅ **Responsivo** - Funciona perfeitamente em celulares, tablets e desktops  
✅ **Sem Dependências Externas** - HTML5, CSS3 e JavaScript puro  
✅ **Armazenamento Local** - Dados armazenados no navegador (localStorage)  
✅ **Exportação de Dados** - Backup em CSV e JSON  

## 🚀 Como Usar

### 1. Preparação Inicial

Clone ou baixe este repositório para sua máquina:

```bash
git clone https://github.com/rafaelfreze/Bolao-da-copa-Sky-Fit.git
cd Bolao-da-copa-Sky-Fit
```

### 2. Estrutura do Projeto

```
Bolao-da-copa-Sky-Fit/
├── index.html                 # Página inicial
├── palpites.html             # Página de palpites e pagamento
├── ranking.html              # Ranking e estatísticas
├── tabela.html               # Tabela de todos os jogos
├── admin.html                # Painel administrativo
├── style.css                 # Estilos CSS (responsivo)
├── script.js                 # JavaScript compartilhado
├── admin.js                  # JavaScript administrativo
├── google-apps-script.gs     # Integração Google Sheets (opcional)
└── README.md                 # Este arquivo
```

### 3. Instalação e Execução Local

**Opção 1: Abrir no Navegador Diretamente**
- Simplesmente abra o arquivo `index.html` no seu navegador
- Nenhuma instalação ou servidor necessário

**Opção 2: Usar um Servidor Local (Recomendado)**

Python 3:
```bash
python -m http.server 8000
```

Node.js com http-server:
```bash
npx http-server
```

Em seguida, abra no navegador: `http://localhost:8000`

### 4. Publicar no GitHub Pages

1. **Criar um repositório** no GitHub chamado `Bolao-da-copa-Sky-Fit`

2. **Fazer upload dos arquivos**:
   - Clone o repositório localmente
   - Copie todos os 10 arquivos para a raiz do repositório
   - Faça commit e push

   ```bash
   git add .
   git commit -m "Adicionar Bolão da Copa 2026"
   git push origin main
   ```

3. **Ativar GitHub Pages**:
   - Vá para Settings (⚙️) → Pages
   - Em "Source", selecione "Deploy from a branch"
   - Escolha a branch `main` e folder `/ (root)`
   - Clique em "Save"

4. **Acessar seu bolão**:
   ```
   https://rafaelfreze.github.io/Bolao-da-copa-Sky-Fit/
   ```

## 🔐 Painel Administrativo

### Como Acessar
- **URL**: `/admin.html`
- **Senha**: `Freze8270`

### Funcionalidades Disponíveis

#### 📊 Dashboard
- Total de participantes
- Quantidade de pagamentos confirmados
- Pagamentos pendentes de confirmação
- Prêmio acumulado (R$ 10,00 por participante pago)
- Total de palpites registrados
- Quantidade de jogos finalizados

#### 💰 Gerenciar Pagamentos
- Visualizar lista de todos os participantes
- Confirmar pagamentos manualmente
- Rejeitar pagamentos
- Ver status de cada participante
- Histórico de pagamentos

#### 🏆 Inserir Resultados
- Seleção de jogo da Copa 2026
- Inserção de placar do resultado
- Recalcular pontuação automaticamente
- Visualizar jogos já finalizados
- Deletar resultados errados

#### 👥 Gerenciar Participantes
- Visualizar todos os participantes
- Ver pontos, acertos e status de pagamento
- Deletar participantes (remove também seus palpites)
- Ver número de palpites por participante

#### 🎯 Visualizar Palpites
- Ver todos os palpites registrados
- Buscar por nome ou WhatsApp
- Visualizar resultado do jogo e pontos obtidos
- Exportar palpites em Excel (CSV)

#### ⚙️ Configurações
- **Ajustar Pontuação**:
  - Pontos por acertar vencedor (padrão: 1)
  - Pontos por acertar empate (padrão: 1)
  - Pontos por acertar placar exato (padrão: 5)

- **Inicializar Banco de Dados**:
  - Carregar todos os 48 jogos da Copa 2026
  - Preserva resultados já inseridos

- **Exportar Dados**:
  - Exportar todos os dados em JSON
  - Backup completo do bolão

- **Limpar Dados**:
  - Limpar todo o banco de dados (⚠️ irreversível)

## 💰 Sistema de Pagamento PIX

### Dados Configurados no Sistema
- **Chave PIX**: `31.721.213/0001-36`
- **Recebedor**: `OnPlay Marketing e Serviços a Laser`
- **Valor por Aposta**: `R$ 10,00`
- **Método**: QR Code + Copia e Cola

### Como Funciona
1. Participante acessa `palpites.html`
2. Preenche nome, WhatsApp e email
3. Seleciona um jogo disponível
4. Insere seu palpite (placar)
5. Clica em "Registrar Palpite"
6. Recebe QR Code PIX para escanear
7. Realiza o pagamento via app do banco
8. Clica em "Já Realizei o Pagamento"
9. Administrador confirma o pagamento no painel

**Obs**: O sistema não realiza validação automática. O administrador deve confirmar manualmente cada pagamento.

## 🎯 Sistema de Pontuação

### Como Funciona

| Evento | Pontos |
|--------|--------|
| Acertou o Vencedor | 1 ponto |
| Acertou o Empate | 1 ponto |
| Acertou o Placar Exato | 5 pontos |
| Errou | 0 pontos |

### Exemplo
- Palpite: Brasil 3x2 Sérvia
- Resultado Real: Brasil 2x1 Sérvia
- Resultado: Acertou o vencedor → 1 ponto

- Palpite: Brasil 2x1 Sérvia
- Resultado Real: Brasil 2x1 Sérvia
- Resultado: Acertou placar exato → 5 pontos

**Os pontos podem ser ajustados** a qualquer momento no painel administrativo.

## 📱 Responsividade

O sistema foi otimizado para diferentes tamanhos de tela:

### Celular (320px - 767px)
- Menu compacto
- Tabelas otimizadas
- Botões maiores para toque
- Layout vertical

### Tablet (768px - 1024px)
- Interface balanceada
- Grades adaptativas
- Navegação em abas

### Desktop (1025px+)
- Interface completa
- Múltiplas colunas
- Todas as funcionalidades visíveis

## 🎨 Cores e Design

O design foi inspirado no site "Bolão do Hexa" com paleta de cores da CBF:

| Elemento | Cor | Código |
|----------|-----|--------|
| Primária | Verde | `#1e7c3e` |
| Secundária | Amarelo | `#ffd700` |
| Destaque | Azul | `#0066cc` |
| Sucesso | Verde | `#28a745` |
| Perigo | Vermelho | `#dc3545` |
| Fundo | Cinza Claro | `#f0f4f8` |

## 📊 Dados Armazenados

### Local Storage
Todos os dados são armazenados no `localStorage` do navegador:

```javascript
// Participantes
{
  id, nome, whatsapp, email, data_inscricao,
  pago, pendente_pagamento, pontos, acertos,
  data_pagamento, data_pagamento_solicitado
}

// Palpites
{
  id, nome, whatsapp, jogo_id, time_a, time_b,
  placar_a, placar_b, data_palpite, pontos
}

// Jogos (Fase de Grupos)
{
  id, grupo, time_a, time_b, data, local, resultado
}

// Configurações
{
  winner, draw, exactScore
}
```

### Chaves no LocalStorage
- `jogos` - Array com todos os jogos
- `participantes` - Array com participantes
- `palpites` - Array com palpites
- `scoring-config` - Configuração de pontuação
- `admin-logged` - Indica se admin está logado

## 🔄 Exportar e Importar Dados

### Exportar via Painel Admin
1. Acesse o painel administrativo
2. Vá para a aba "⚙️ Configurações"
3. Clique em "📊 Exportar Todos os Dados"
4. Um arquivo JSON será baixado automaticamente

### Exportar via Console (F12)
```javascript
// Abra o console do navegador (F12)
// Cole este código:

const dados = {
  participantes: loadFromLocalStorage('participantes'),
  palpites: loadFromLocalStorage('palpites'),
  jogos: loadFromLocalStorage('jogos'),
  configuracoes: loadFromLocalStorage('scoring-config')
};

console.log(JSON.stringify(dados, null, 2));
```

### Fazer Backup Manual
Recomenda-se fazer backup regularmente:
1. Exporte os dados em JSON
2. Salve em local seguro (Google Drive, Dropbox, etc)
3. Faça backup também do CSV de palpites

## 🐛 Solução de Problemas

### Problema: Dados não aparecem
**Solução**:
- Limpe o cache do navegador: `Ctrl+Shift+Delete`
- Verifique se localStorage está ativado
- Tente em outro navegador

### Problema: Senha admin não funciona
**Solução**:
- Verifique se está digitando correto: `Freze8270`
- Limpe cookies: `Ctrl+Shift+Delete`
- Recarregue a página

### Problema: PIX não aparece na página de palpites
**Solução**:
- Verifique se a biblioteca QR Code carregou
- Recarregue a página (F5)
- Verifique se JavaScript está ativado

### Problema: Pontos não calculam automaticamente
**Solução**:
- Insira o resultado no painel admin
- Aguarde alguns segundos
- Recarregue a página de ranking

### Problema: Responsividade não funciona
**Solução**:
- Adicione `<meta name="viewport" content="width=device-width, initial-scale=1.0">` no HTML
- Use navegadores modernos (Chrome, Firefox, Safari, Edge)

## 🔗 Integração com Google Sheets (Opcional)

O arquivo `google-apps-script.gs` permite sincronizar dados com Google Sheets.

### Como Configurar
1. Crie uma planilha no Google Sheets
2. Abra "Extensões" → "Apps Script"
3. Copie o conteúdo de `google-apps-script.gs`
4. Substitua `SPREADSHEET_ID` pelo ID da sua planilha
5. Clique em "Implantar" como "Aplicativo Web"
6. Configure as abas automaticamente

## 📄 Licença

Este projeto é de código aberto e pode ser usado livremente para fins educacionais e comerciais.

## 🙏 Créditos

Desenvolvido para **Sky Fit Academia**  
Copa do Mundo 2026 - Canadá, México e Estados Unidos

**Inspiração Visual**: Bolão do Hexa  
**Cores**: CBF (Confederação Brasileira de Futebol)

## 📞 Suporte e Dúvidas

Para dúvidas técnicas:
1. Verifique se está usando um navegador moderno
2. Teste em incógnito/privado
3. Verifique o console (F12) para erros
4. Limpe cache e cookies

## 🗂️ Estrutura de Pastas Recomendada

```
seu-repositorio/
├── index.html
├── palpites.html
├── ranking.html
├── tabela.html
├── admin.html
├── style.css
├── script.js
├── admin.js
├── google-apps-script.gs
├── README.md
└── .gitignore
```

## 🔄 Atualizações Futuras

Possíveis melhorias para versões futuras:
- [ ] Integração com API PIX em tempo real
- [ ] Autenticação com Google
- [ ] Suporte para oitavas de final e fases posteriores
- [ ] Notificações por email/WhatsApp
- [ ] Gráficos e análises avançadas
- [ ] Modo escuro
- [ ] Suporte a múltiplos idiomas

## 📅 Informações da Copa 2026

- **Período**: Junho a Julho de 2026
- **Sedes**: Canadá, México e Estados Unidos
- **Fase de Grupos**: 48 jogos (12 grupos com 4 times cada)
- **Total de Equipes**: 48 países
- **Bandeira**: Primeira Copa do Mundo fora da Europa e América do Sul

## 🏅 Status do Projeto

- ✅ Versão 1.0.0 - Completa
- ✅ Testes realizados em múltiplos navegadores
- ✅ Responsividade validada
- ✅ Documentação completa

---

**Última atualização**: Junho 2026  
**Versão**: 1.0.0  
**Desenvolvido com ❤️ para a Sky Fit Academia**

Para mais informações e suporte, acesse o repositório no GitHub.