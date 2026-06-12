# ðŸ† BolÃ£o Online - Copa 2026

Sistema simples e funcional de bolÃ£o online para a Copa do Mundo 2026. Sem ficÃ§Ãµes, sem dados inventados - tudo cadastrado manualmente pelo administrador.

## ðŸ“‹ CaracterÃ­sticas

âœ… **Simples e Limpo** - Interface moderna e intuitiva  
âœ… **Totalmente Funcional** - Usa Google Sheets como base online  
âœ… **Responsivo** - Funciona em celular, tablet e desktop  
âœ… **Sem DependÃªncias** - HTML5, CSS3, JavaScript puro  
âœ… **GitHub Pages** - Hospedagem gratuita  
âœ… **LocalStorage** - Cache local para manter a navegaÃ§Ã£o rÃ¡pida  

## ðŸš€ Como Usar

### 1. PreparaÃ§Ã£o Inicial

Clone ou baixe este repositÃ³rio:

```bash
git clone https://github.com/seu-usuario/bolao-online.git
cd bolao-online
```

### 2. Abrir no Navegador

Simplesmente abra o arquivo `index.html` no seu navegador:

```
Clique duas vezes em index.html
```

Ou, se preferir usar um servidor local:

**Python 3:**
```bash
python -m http.server 8000
```

**Node.js (http-server):**
```bash
npx http-server
```

Depois acesse: `http://localhost:8000`

### 3. Publicar no GitHub Pages

1. **Criar repositÃ³rio no GitHub**
   - Crie um repositÃ³rio chamado `bolao-online`

2. **Upload dos arquivos**
   ```bash
   git init
   git add .
   git commit -m "Adicionar BolÃ£o Online"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/bolao-online.git
   git push -u origin main
   ```

3. **Ativar GitHub Pages**
   - VÃ¡ para Settings â†’ Pages
   - Em "Source", selecione "Deploy from a branch"
   - Escolha branch "main" e pasta "/ (root)"
   - Clique em "Save"

4. **Acessar seu bolÃ£o**
   ```
   https://seu-usuario.github.io/bolao-online/
   ```

### 4. Conectar ao Google Sheets

1. Abra a planilha do bolÃ£o no Google Sheets.
2. VÃ¡ em **ExtensÃµes â†’ Apps Script**.
3. Cole o conteÃºdo atualizado de `google-apps-script.gs`.
4. Execute a funÃ§Ã£o `criarPlanilhas` uma vez para criar/ajustar as abas.
5. VÃ¡ em **Implantar â†’ Gerenciar implantaÃ§Ãµes** e publique uma nova versÃ£o do aplicativo web.
6. Mantenha a URL configurada em `script.js`:

```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwME2l0eYH3Y0i6akgXvTZMQViLaGNo10fo8Jav9AKp1Fc_7GgFHNuigbMn31kp_QJb/exec';
```

## ðŸ“ Estrutura do Projeto

```
bolao-online/
â”œâ”€â”€ index.html          # PÃ¡gina inicial
â”œâ”€â”€ palpites.html       # PÃ¡gina de palpites
â”œâ”€â”€ ranking.html        # Ranking de participantes
â”œâ”€â”€ tabela.html         # Tabela de jogos
â”œâ”€â”€ admin.html          # Painel administrativo
â”œâ”€â”€ style.css           # Estilos CSS
â”œâ”€â”€ script.js           # JavaScript compartilhado
â”œâ”€â”€ admin.js            # JavaScript administrativo
â””â”€â”€ README.md           # Este arquivo
```

## ðŸŽ® Como Funciona

### Fluxo para Participantes

1. **Acessar o site** â†’ PÃ¡gina inicial com prÃ³ximo jogo
2. **Clicar "Fazer Palpite"** â†’ Vai para pÃ¡gina de palpites
3. **Preencher dados** â†’ Nome e WhatsApp
4. **Selecionar jogo** â†’ Escolhe entre jogos disponÃ­veis
5. **Informar placar** â†’ Insere placar da aposta
6. **Clicar "Registrar"** â†’ Palpite Ã© salvo
7. **Ver dados PIX** â†’ QR Code ou copiar chave
8. **Pagar via PIX** â†’ Realiza pagamento
9. **Clicar "JÃ¡ Fiz o Pagamento"** â†’ Marca como pendente de confirmaÃ§Ã£o

### Fluxo para Administrador

1. **Acessar** â†’ `seu-site/admin.html`
2. **Senha** â†’ `admin123`
3. **Gerenciar jogos** â†’ Cadastrar, editar ou deletar
4. **LanÃ§ar resultados** â†’ Informar placar final
5. **Confirmar pagamentos** â†’ Validar quem pagou
6. **Visualizar configuraÃ§Ãµes** â†’ Ajustar dados do bolÃ£o

## ðŸ”§ Painel Administrativo

### Senha PadrÃ£o
```
admin123
```

### Funcionalidades

#### ðŸ“Š Dashboard
- Visualizar estatÃ­sticas gerais
- Total de participantes
- Total arrecadado
- Quantidade de palpites e resultados

#### ðŸŽ® Gerenciar Jogos
- **Criar jogo**: Adicionar novo jogo
- **Editar jogo**: Alterar dados do jogo
- **Deletar jogo**: Remover jogo
- **Campos**:
  - Fase (Grupos, Oitavas, Quartas, Semifinal, Terceiro Lugar, Final)
  - Time A e Time B
  - Data e HorÃ¡rio
  - Local
  - Status (Ativo/Inativo)

#### ðŸ† LanÃ§ar Resultados
- Selecionar jogo
- Informar placar final
- Bloqueia automaticamente novas apostas
- Recalcula pontuaÃ§Ã£o de todos

#### ðŸ’° Confirmar Pagamentos
- Lista de todos os participantes
- Status de pagamento
- Marcar como pago
- Marcar como pendente

#### âš™ï¸ ConfiguraÃ§Ãµes
- **Nome do bolÃ£o**
- **Valor do palpite**
- **Chave PIX**
- **Recebedor PIX**
- **Sistema de pontuaÃ§Ã£o** (pontos por resultado, empate, placar exato)
- **Exportar dados** em JSON
- **Limpar todos os dados**

## ðŸ“Š Sistema de PontuaÃ§Ã£o

Por padrÃ£o:

| Evento | Pontos |
|--------|--------|
| Acertou resultado/vencedor | 1 |
| Acertou empate | 1 |
| Acertou placar exato | 5 |
| Errou | 0 |

Os pontos podem ser ajustados no painel administrativo.

## ðŸ“± PÃ¡ginas

### index.html (InÃ­cio)
- Banner da Copa 2026
- InformaÃ§Ãµes do bolÃ£o (valor, prÃªmio, participantes)
- PrÃ³ximo jogo disponÃ­vel
- BotÃ£o para fazer palpite

### palpites.html (Fazer Palpite)
- FormulÃ¡rio com dados do participante
- SeleÃ§Ã£o de jogo
- Campo para informar placar
- Dados PIX (chave e recebedor)
- BotÃ£o para copiar chave PIX
- Lista de meus palpites

### ranking.html (Ranking)
- Tabela com ranking de participantes
- PÃ³dio (mobile)
- Filtros (todos, pagos, pendentes)
- EstatÃ­sticas gerais

### tabela.html (Jogos)
- Todos os jogos cadastrados
- Separados por fase
- Filtros por fase
- Status de cada jogo (prÃ³ximo, ao vivo, finalizado)

### admin.html (Painel Admin)
- Login com senha
- 5 abas de gerenciamento
- Dashboard com estatÃ­sticas
- Gerenciar jogos
- LanÃ§ar resultados
- Confirmar pagamentos
- ConfiguraÃ§Ãµes

## ðŸ’¾ Dados Armazenados

Os dados principais ficam no **Google Sheets** e tambÃ©m sÃ£o guardados no **LocalStorage** do navegador como cache:

```javascript
// ConfiguraÃ§Ã£o
{
    nome_bolao: "BolÃ£o Online",
    valor_palpite: 10,
    chave_pix: "...",
    recebedor_pix: "...",
    pontos_resultado: 1,
    pontos_empate: 1,
    pontos_exato: 5
}

// Participante
{
    id: timestamp,
    nome: "JoÃ£o Silva",
    whatsapp: "(11) 99999-9999",
    data_inscricao: "2026-01-15T10:30:00Z",
    pago: false,
    pendente_pagamento: false,
    pontos: 0,
    acertos: 0
}

// Palpite
{
    id: timestamp,
    jogo_id: 1,
    nome: "JoÃ£o Silva",
    whatsapp: "(11) 99999-9999",
    time_a: "Brasil",
    time_b: "Argentina",
    placar_a: 2,
    placar_b: 1,
    pontos: 1,
    data_palpite: "2026-01-15T10:30:00Z"
}

// Jogo
{
    id: 1,
    fase: "Fase de Grupos",
    time_a: "Brasil",
    time_b: "Argentina",
    data: "2026-06-15",
    hora: "14:00",
    local: "Miami, USA",
    ativo: true,
    resultado: null
}
```

## ðŸ” SeguranÃ§a

âš ï¸ **Aviso**: Este sistema usa Google Sheets + LocalStorage e nÃ£o tem seguranÃ§a de produÃ§Ã£o.

Para uso em produÃ§Ã£o:
- Implemente autenticaÃ§Ã£o real
- Use banco de dados (Firebase, Supabase, etc)
- Implemente validaÃ§Ã£o de servidor
- Use HTTPS
- Implemente criptografia de dados sensÃ­veis

## ðŸ› Troubleshooting

### Dados desapareceram
- LocalStorage foi limpo
- Navegador em modo incÃ³gnito nÃ£o salva dados
- Tente em outro navegador

### NÃ£o consigo fazer login no admin
- Verifique a senha: `admin123`
- Limpe cache/cookies
- Tente em navegador incÃ³gnito

### Palpites nÃ£o estÃ£o sendo salvos
- Verifique se JavaScript estÃ¡ ativado
- Abra o console (F12) para ver erros
- Tente atualizar a pÃ¡gina (F5)

### Ranking nÃ£o atualiza apÃ³s resultado
- Recarregue a pÃ¡gina (F5)
- Verifique se o resultado foi lanÃ§ado corretamente
- Confirme que o jogo estÃ¡ associado aos palpites

### Planilha nÃ£o sincroniza
- Confirme se o cÃ³digo atualizado de `google-apps-script.gs` foi colado no Apps Script
- Publique uma nova versÃ£o da implantaÃ§Ã£o web
- Verifique se o acesso do aplicativo web estÃ¡ como "Qualquer pessoa"

## ðŸ“ˆ Como Crescer o BolÃ£o

1. **Compartilhe o link** com amigos e colegas
2. **Configure o nome e dados** no painel admin
3. **Preencha com os jogos** da Copa 2026
4. **Defina o valor do palpite** desejado
5. **Customize a chave PIX** com seus dados
6. **Compartilhe em grupos** (WhatsApp, Telegram, etc)

## ðŸŽ¯ PrÃ³ximos Passos

PossÃ­veis melhorias:

- [x] IntegraÃ§Ã£o com Google Sheets
- [ ] Envio de notificaÃ§Ãµes por WhatsApp
- [ ] Sistema de sorteio automÃ¡tico
- [ ] EstatÃ­sticas avanÃ§adas
- [ ] IntegraÃ§Ã£o com API PIX real
- [ ] Sistema de refil/mÃºltiplas rodadas
- [ ] Modo escuro
- [ ] Suporte a mÃºltiplos idiomas

## ðŸ“ž Contato e Suporte

Para dÃºvidas e sugestÃµes:
- Abra uma issue no GitHub
- Verifique a documentaÃ§Ã£o
- Teste em navegador diferentes
- Consulte o console do navegador para erros

## ðŸ“œ LicenÃ§a

Este projeto Ã© licenciado sob a MIT License - veja o arquivo LICENSE para detalhes.

## ðŸ™ CrÃ©ditos

Desenvolvido para a **Copa do Mundo 2026**  
Sedes: **Estados Unidos, CanadÃ¡ e MÃ©xico**

---

**VersÃ£o**: 1.0.0  
**Ãšltima atualizaÃ§Ã£o**: 2026  
**Status**: âœ… Funcional e Pronto para Usar

ðŸš€ **Aproveite o bolÃ£o!**
