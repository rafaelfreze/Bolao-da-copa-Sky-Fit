# 🏆 Bolão Online - Copa 2026

Sistema simples e funcional de bolão online para a Copa do Mundo 2026. Sem ficções, sem dados inventados - tudo cadastrado manualmente pelo administrador.

## 📋 Características

✅ **Simples e Limpo** - Interface moderna e intuitiva  
✅ **Totalmente Funcional** - Sem banco de dados externo  
✅ **Responsivo** - Funciona em celular, tablet e desktop  
✅ **Sem Dependências** - HTML5, CSS3, JavaScript puro  
✅ **GitHub Pages** - Hospedagem gratuita  
✅ **LocalStorage** - Armazenamento local no navegador  

## 🚀 Como Usar

### 1. Preparação Inicial

Clone ou baixe este repositório:

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

1. **Criar repositório no GitHub**
   - Crie um repositório chamado `bolao-online`

2. **Upload dos arquivos**
   ```bash
   git init
   git add .
   git commit -m "Adicionar Bolão Online"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/bolao-online.git
   git push -u origin main
   ```

3. **Ativar GitHub Pages**
   - Vá para Settings → Pages
   - Em "Source", selecione "Deploy from a branch"
   - Escolha branch "main" e pasta "/ (root)"
   - Clique em "Save"

4. **Acessar seu bolão**
   ```
   https://seu-usuario.github.io/bolao-online/
   ```

## 📁 Estrutura do Projeto

```
bolao-online/
├── index.html          # Página inicial
├── palpites.html       # Página de palpites
├── ranking.html        # Ranking de participantes
├── tabela.html         # Tabela de jogos
├── admin.html          # Painel administrativo
├── style.css           # Estilos CSS
├── script.js           # JavaScript compartilhado
├── admin.js            # JavaScript administrativo
└── README.md           # Este arquivo
```

## 🎮 Como Funciona

### Fluxo para Participantes

1. **Acessar o site** → Página inicial com próximo jogo
2. **Clicar "Fazer Palpite"** → Vai para página de palpites
3. **Preencher dados** → Nome, WhatsApp, email (opcional)
4. **Selecionar jogo** → Escolhe entre jogos disponíveis
5. **Informar placar** → Insere placar da aposta
6. **Clicar "Registrar"** → Palpite é salvo
7. **Ver dados PIX** → QR Code ou copiar chave
8. **Pagar via PIX** → Realiza pagamento
9. **Clicar "Já Fiz o Pagamento"** → Marca como pendente de confirmação

### Fluxo para Administrador

1. **Acessar** → `seu-site/admin.html`
2. **Senha** → `admin123`
3. **Gerenciar jogos** → Cadastrar, editar ou deletar
4. **Lançar resultados** → Informar placar final
5. **Confirmar pagamentos** → Validar quem pagou
6. **Visualizar configurações** → Ajustar dados do bolão

## 🔧 Painel Administrativo

### Senha Padrão
```
admin123
```

### Funcionalidades

#### 📊 Dashboard
- Visualizar estatísticas gerais
- Total de participantes
- Total arrecadado
- Quantidade de palpites e resultados

#### 🎮 Gerenciar Jogos
- **Criar jogo**: Adicionar novo jogo
- **Editar jogo**: Alterar dados do jogo
- **Deletar jogo**: Remover jogo
- **Campos**:
  - Fase (Grupos, Oitavas, Quartas, Semifinal, Terceiro Lugar, Final)
  - Time A e Time B
  - Data e Horário
  - Local
  - Status (Ativo/Inativo)

#### 🏆 Lançar Resultados
- Selecionar jogo
- Informar placar final
- Bloqueia automaticamente novas apostas
- Recalcula pontuação de todos

#### 💰 Confirmar Pagamentos
- Lista de todos os participantes
- Status de pagamento
- Marcar como pago
- Marcar como pendente

#### ⚙️ Configurações
- **Nome do bolão**
- **Valor do palpite**
- **Chave PIX**
- **Recebedor PIX**
- **Sistema de pontuação** (pontos por resultado, empate, placar exato)
- **Exportar dados** em JSON
- **Limpar todos os dados**

## 📊 Sistema de Pontuação

Por padrão:

| Evento | Pontos |
|--------|--------|
| Acertou resultado/vencedor | 1 |
| Acertou empate | 1 |
| Acertou placar exato | 5 |
| Errou | 0 |

Os pontos podem ser ajustados no painel administrativo.

## 📱 Páginas

### index.html (Início)
- Banner da Copa 2026
- Informações do bolão (valor, prêmio, participantes)
- Próximo jogo disponível
- Botão para fazer palpite

### palpites.html (Fazer Palpite)
- Formulário com dados do participante
- Seleção de jogo
- Campo para informar placar
- Dados PIX (chave e recebedor)
- Botão para copiar chave PIX
- Lista de meus palpites

### ranking.html (Ranking)
- Tabela com ranking de participantes
- Pódio (mobile)
- Filtros (todos, pagos, pendentes)
- Estatísticas gerais

### tabela.html (Jogos)
- Todos os jogos cadastrados
- Separados por fase
- Filtros por fase
- Status de cada jogo (próximo, ao vivo, finalizado)

### admin.html (Painel Admin)
- Login com senha
- 5 abas de gerenciamento
- Dashboard com estatísticas
- Gerenciar jogos
- Lançar resultados
- Confirmar pagamentos
- Configurações

## 💾 Dados Armazenados

Todos os dados são armazenados no **LocalStorage** do navegador:

```javascript
// Configuração
{
    nome_bolao: "Bolão Online",
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
    nome: "João Silva",
    whatsapp: "(11) 99999-9999",
    email: "joao@email.com",
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
    nome: "João Silva",
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

## 🔐 Segurança

⚠️ **Aviso**: Este sistema usa LocalStorage e não tem segurança de produção.

Para uso em produção:
- Implemente autenticação real
- Use banco de dados (Firebase, Supabase, etc)
- Implemente validação de servidor
- Use HTTPS
- Implemente criptografia de dados sensíveis

## 🐛 Troubleshooting

### Dados desapareceram
- LocalStorage foi limpo
- Navegador em modo incógnito não salva dados
- Tente em outro navegador

### Não consigo fazer login no admin
- Verifique a senha: `admin123`
- Limpe cache/cookies
- Tente em navegador incógnito

### Palpites não estão sendo salvos
- Verifique se JavaScript está ativado
- Abra o console (F12) para ver erros
- Tente atualizar a página (F5)

### Ranking não atualiza após resultado
- Recarregue a página (F5)
- Verifique se o resultado foi lançado corretamente
- Confirme que o jogo está associado aos palpites

## 📈 Como Crescer o Bolão

1. **Compartilhe o link** com amigos e colegas
2. **Configure o nome e dados** no painel admin
3. **Preencha com os jogos** da Copa 2026
4. **Defina o valor do palpite** desejado
5. **Customize a chave PIX** com seus dados
6. **Compartilhe em grupos** (WhatsApp, Telegram, etc)

## 🎯 Próximos Passos

Possíveis melhorias:

- [ ] Integração com Google Sheets
- [ ] Envio de notificações por WhatsApp
- [ ] Sistema de sorteio automático
- [ ] Estatísticas avançadas
- [ ] Integração com API PIX real
- [ ] Sistema de refil/múltiplas rodadas
- [ ] Modo escuro
- [ ] Suporte a múltiplos idiomas

## 📞 Contato e Suporte

Para dúvidas e sugestões:
- Abra uma issue no GitHub
- Verifique a documentação
- Teste em navegador diferentes
- Consulte o console do navegador para erros

## 📜 Licença

Este projeto é licenciado sob a MIT License - veja o arquivo LICENSE para detalhes.

## 🙏 Créditos

Desenvolvido para a **Copa do Mundo 2026**  
Sedes: **Estados Unidos, Canadá e México**

---

**Versão**: 1.0.0  
**Última atualização**: 2026  
**Status**: ✅ Funcional e Pronto para Usar

🚀 **Aproveite o bolão!**
