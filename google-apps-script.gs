/*
 * =====================================
 * GOOGLE APPS SCRIPT
 * =====================================
 * Script para sincronizar Bolão Online com Google Sheets
 * 
 * Como usar:
 * 1. Crie uma planilha no Google Sheets
 * 2. Abra "Extensões" → "Apps Script"
 * 3. Cole este código
 * 4. Clique em "Implantar" → "Novo implante"
 * 5. Tipo: "Aplicativo Web"
 * 6. Executar como: Sua conta
 * 7. Acessar como: Qualquer pessoa
 * 8. Copie a URL gerada
 */

// =====================================
// CONFIGURAÇÃO
// =====================================

const SHEET_NAMES = {
    PARTICIPANTES: 'Participantes',
    PALPITES: 'Palpites',
    JOGOS: 'Jogos',
    RESULTADOS: 'Resultados',
    CONFIG: 'Configuração'
};

// =====================================
// INICIALIZAÇÃO
// =====================================

/**
 * Criar as planilhas necessárias
 */
function criarPlanilhas() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Criar aba Configuração
    criarAbaConfiguracao(ss);
    
    // Criar aba Participantes
    criarAbaParticipantes(ss);
    
    // Criar aba Palpites
    criandoAbaPalpites(ss);
    
    // Criar aba Jogos
    criarAbaJogos(ss);
    
    // Criar aba Resultados
    criarAbaResultados(ss);
    
    SpreadsheetApp.getUi().alert('✅ Planilhas criadas com sucesso!');
}

/**
 * Criar aba Configuração
 */
function criarAbaConfiguracao(ss) {
    let sheet = ss.getSheetByName(SHEET_NAMES.CONFIG);
    if (!sheet) {
        sheet = ss.insertSheet(SHEET_NAMES.CONFIG);
    } else {
        sheet.clear();
    }
    
    const headers = ['Chave', 'Valor'];
    sheet.appendRow(headers);
    
    const data = [
        ['Nome do Bolão', 'Bolão Online'],
        ['Valor Palpite', '10'],
        ['Chave PIX', 'chave@pix'],
        ['Recebedor PIX', 'Recebedor'],
        ['Pontos Resultado', '1'],
        ['Pontos Empate', '1'],
        ['Pontos Exato', '5']
    ];
    
    data.forEach(row => sheet.appendRow(row));
    
    // Formatar header
    const headerRange = sheet.getRange(1, 1, 1, 2);
    headerRange.setBackground('#1e7c3e').setFontColor('white').setFontWeight('bold');
}

/**
 * Criar aba Participantes
 */
function criarAbaParticipantes(ss) {
    let sheet = ss.getSheetByName(SHEET_NAMES.PARTICIPANTES);
    if (!sheet) {
        sheet = ss.insertSheet(SHEET_NAMES.PARTICIPANTES);
    } else {
        sheet.clear();
    }
    
    const headers = [
        'ID',
        'Nome',
        'WhatsApp',
        'Email',
        'Data Inscrição',
        'Pago',
        'Pendente Pagamento',
        'Pontos',
        'Acertos',
        'Data Pagamento'
    ];
    
    sheet.appendRow(headers);
    
    // Formatar header
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#ffd700').setFontColor('#1a1a1a').setFontWeight('bold');
    
    // Ajustar largura das colunas
    sheet.setColumnWidth(1, 80);
    sheet.setColumnWidth(2, 150);
    sheet.setColumnWidth(3, 130);
    sheet.setColumnWidth(4, 180);
    sheet.setColumnWidth(5, 150);
    sheet.setColumnWidth(6, 80);
    sheet.setColumnWidth(7, 150);
    sheet.setColumnWidth(8, 80);
    sheet.setColumnWidth(9, 80);
    sheet.setColumnWidth(10, 150);
}

/**
 * Criar aba Palpites
 */
function criandoAbaPalpites(ss) {
    let sheet = ss.getSheetByName(SHEET_NAMES.PALPITES);
    if (!sheet) {
        sheet = ss.insertSheet(SHEET_NAMES.PALPITES);
    } else {
        sheet.clear();
    }
    
    const headers = [
        'ID',
        'Participante',
        'WhatsApp',
        'Jogo ID',
        'Time A',
        'Placar A',
        'Time B',
        'Placar B',
        'Resultado',
        'Pontos',
        'Data Palpite'
    ];
    
    sheet.appendRow(headers);
    
    // Formatar header
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#0066cc').setFontColor('white').setFontWeight('bold');
    
    // Ajustar largura
    sheet.setColumnWidth(1, 80);
    sheet.setColumnWidth(2, 150);
    sheet.setColumnWidth(3, 130);
    sheet.setColumnWidth(4, 80);
    sheet.setColumnWidth(5, 120);
    sheet.setColumnWidth(6, 80);
    sheet.setColumnWidth(7, 120);
    sheet.setColumnWidth(8, 80);
    sheet.setColumnWidth(9, 100);
    sheet.setColumnWidth(10, 80);
    sheet.setColumnWidth(11, 150);
}

/**
 * Criar aba Jogos
 */
function criarAbaJogos(ss) {
    let sheet = ss.getSheetByName(SHEET_NAMES.JOGOS);
    if (!sheet) {
        sheet = ss.insertSheet(SHEET_NAMES.JOGOS);
    } else {
        sheet.clear();
    }
    
    const headers = [
        'ID',
        'Fase',
        'Time A',
        'Time B',
        'Data',
        'Hora',
        'Local',
        'Ativo',
        'Resultado'
    ];
    
    sheet.appendRow(headers);
    
    // Formatar header
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#28a745').setFontColor('white').setFontWeight('bold');
    
    // Ajustar largura
    sheet.setColumnWidth(1, 80);
    sheet.setColumnWidth(2, 130);
    sheet.setColumnWidth(3, 120);
    sheet.setColumnWidth(4, 120);
    sheet.setColumnWidth(5, 120);
    sheet.setColumnWidth(6, 100);
    sheet.setColumnWidth(7, 180);
    sheet.setColumnWidth(8, 80);
    sheet.setColumnWidth(9, 100);
}

/**
 * Criar aba Resultados
 */
function criarAbaResultados(ss) {
    let sheet = ss.getSheetByName(SHEET_NAMES.RESULTADOS);
    if (!sheet) {
        sheet = ss.insertSheet(SHEET_NAMES.RESULTADOS);
    } else {
        sheet.clear();
    }
    
    const headers = [
        'Jogo ID',
        'Time A',
        'Time B',
        'Resultado',
        'Data',
        'Hora',
        'Fase'
    ];
    
    sheet.appendRow(headers);
    
    // Formatar header
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#dc3545').setFontColor('white').setFontWeight('bold');
    
    // Ajustar largura
    sheet.setColumnWidth(1, 80);
    sheet.setColumnWidth(2, 120);
    sheet.setColumnWidth(3, 120);
    sheet.setColumnWidth(4, 100);
    sheet.setColumnWidth(5, 120);
    sheet.setColumnWidth(6, 100);
    sheet.setColumnWidth(7, 130);
}

// =====================================
// ADICIONAR DADOS
// =====================================

/**
 * Adicionar participante
 */
function adicionarParticipante(dados) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAMES.PARTICIPANTES);
    
    const row = [
        dados.id,
        dados.nome,
        dados.whatsapp,
        dados.email || '',
        dados.data_inscricao || new Date(),
        dados.pago ? 'Sim' : 'Não',
        dados.pendente_pagamento ? 'Sim' : 'Não',
        dados.pontos || 0,
        dados.acertos || 0,
        dados.data_pagamento || ''
    ];
    
    sheet.appendRow(row);
}

/**
 * Adicionar palpite
 */
function adicionarPalpite(dados) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAMES.PALPITES);
    
    const row = [
        dados.id,
        dados.nome,
        dados.whatsapp,
        dados.jogo_id,
        dados.time_a,
        dados.placar_a,
        dados.time_b,
        dados.placar_b,
        dados.resultado || '',
        dados.pontos || 0,
        dados.data_palpite || new Date()
    ];
    
    sheet.appendRow(row);
}

/**
 * Adicionar jogo
 */
function adicionarJogo(dados) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAMES.JOGOS);
    
    const row = [
        dados.id,
        dados.fase,
        dados.time_a,
        dados.time_b,
        dados.data,
        dados.hora,
        dados.local,
        dados.ativo ? 'Sim' : 'Não',
        dados.resultado || ''
    ];
    
    sheet.appendRow(row);
}

/**
 * Adicionar resultado
 */
function adicionarResultado(dados) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAMES.RESULTADOS);
    
    const row = [
        dados.id,
        dados.time_a,
        dados.time_b,
        dados.resultado,
        dados.data,
        dados.hora,
        dados.fase
    ];
    
    sheet.appendRow(row);
}

// =====================================
// OBTER DADOS
// =====================================

/**
 * Obter todos os participantes
 */
function obterParticipantes() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAMES.PARTICIPANTES);
    const data = sheet.getDataRange().getValues();
    
    const participantes = [];
    for (let i = 1; i < data.length; i++) {
        participantes.push({
            id: data[i][0],
            nome: data[i][1],
            whatsapp: data[i][2],
            email: data[i][3],
            data_inscricao: data[i][4],
            pago: data[i][5] === 'Sim',
            pendente_pagamento: data[i][6] === 'Sim',
            pontos: data[i][7],
            acertos: data[i][8],
            data_pagamento: data[i][9]
        });
    }
    
    return participantes;
}

/**
 * Obter todos os palpites
 */
function obterPalpites() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAMES.PALPITES);
    const data = sheet.getDataRange().getValues();
    
    const palpites = [];
    for (let i = 1; i < data.length; i++) {
        palpites.push({
            id: data[i][0],
            nome: data[i][1],
            whatsapp: data[i][2],
            jogo_id: data[i][3],
            time_a: data[i][4],
            placar_a: data[i][5],
            time_b: data[i][6],
            placar_b: data[i][7],
            resultado: data[i][8],
            pontos: data[i][9],
            data_palpite: data[i][10]
        });
    }
    
    return palpites;
}

/**
 * Obter todos os jogos
 */
function obterJogos() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAMES.JOGOS);
    const data = sheet.getDataRange().getValues();
    
    const jogos = [];
    for (let i = 1; i < data.length; i++) {
        jogos.push({
            id: data[i][0],
            fase: data[i][1],
            time_a: data[i][2],
            time_b: data[i][3],
            data: data[i][4],
            hora: data[i][5],
            local: data[i][6],
            ativo: data[i][7] === 'Sim',
            resultado: data[i][8]
        });
    }
    
    return jogos;
}

/**
 * Obter ranking
 */
function obterRanking() {
    const participantes = obterParticipantes();
    const palpites = obterPalpites();
    
    const ranking = participantes.map(p => {
        const palpitesParticipante = palpites.filter(
            pal => pal.nome === p.nome && pal.whatsapp === p.whatsapp
        );
        
        return {
            nome: p.nome,
            whatsapp: p.whatsapp,
            pontos: palpitesParticipante.reduce((total, pal) => total + (pal.pontos || 0), 0),
            palpites: palpitesParticipante.length,
            acertos: palpitesParticipante.filter(pal => pal.pontos > 0).length,
            pago: p.pago
        };
    });
    
    // Ordenar por pontos
    ranking.sort((a, b) => b.pontos - a.pontos);
    
    return ranking;
}

// =====================================
// ENDPOINTS WEB
// =====================================

/**
 * GET endpoint
 */
function doGet(e) {
    const action = e.parameter.action;
    
    let response;
    
    switch(action) {
        case 'participantes':
            response = obterParticipantes();
            break;
        case 'palpites':
            response = obterPalpites();
            break;
        case 'jogos':
            response = obterJogos();
            break;
        case 'ranking':
            response = obterRanking();
            break;
        default:
            response = { erro: 'Ação inválida' };
    }
    
    return ContentService.createTextOutput(JSON.stringify(response))
        .setMimeType(ContentService.MimeType.JSON);
}

/**
 * POST endpoint
 */
function doPost(e) {
    const action = e.parameter.action;
    const dados = JSON.parse(e.postData.contents);
    
    let response;
    
    try {
        switch(action) {
            case 'adicionar_participante':
                adicionarParticipante(dados);
                response = { sucesso: true, mensagem: 'Participante adicionado' };
                break;
            case 'adicionar_palpite':
                adicionarPalpite(dados);
                response = { sucesso: true, mensagem: 'Palpite adicionado' };
                break;
            case 'adicionar_jogo':
                adicionarJogo(dados);
                response = { sucesso: true, mensagem: 'Jogo adicionado' };
                break;
            case 'adicionar_resultado':
                adicionarResultado(dados);
                response = { sucesso: true, mensagem: 'Resultado adicionado' };
                break;
            default:
                response = { sucesso: false, erro: 'Ação inválida' };
        }
    } catch (error) {
        response = { sucesso: false, erro: error.toString() };
    }
    
    return ContentService.createTextOutput(JSON.stringify(response))
        .setMimeType(ContentService.MimeType.JSON);
}

// =====================================
// MENU
// =====================================

/**
 * Criar menu customizado
 */
function onOpen() {
    const ui = SpreadsheetApp.getUi();
    ui.createMenu('⚽ Bolão Online')
        .addItem('📋 Criar Planilhas', 'criarPlanilhas')
        .addItem('📊 Atualizar Ranking', 'atualizarRanking')
        .addItem('🔗 Ver URL Web App', 'mostrarUrlWebApp')
        .addToUi();
}

/**
 * Atualizar ranking
 */
function atualizarRanking() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Limpar e recriar aba de resultados se necessário
    const ranking = obterRanking();
    
    const ui = SpreadsheetApp.getUi();
    let msg = '🏆 RANKING ATUAL\n\n';
    
    ranking.slice(0, 10).forEach((p, index) => {
        msg += `${index + 1}º ${p.nome} - ${p.pontos} pts (${p.palpites} palpites, ${p.acertos} acertos)\n`;
    });
    
    ui.alert(msg);
}

/**
 * Mostrar URL do Web App
 */
function mostrarUrlWebApp() {
    const ui = SpreadsheetApp.getUi();
    ui.alert(
        'Para publicar este script:\n\n' +
        '1. Clique em "Implantar" (ícone de foguete)\n' +
        '2. Selecione "Novo implante"\n' +
        '3. Tipo: "Aplicativo Web"\n' +
        '4. Executar como: Sua conta\n' +
        '5. Acessar como: Qualquer pessoa\n' +
        '6. Clique em "Implantar"\n\n' +
        'Copie a URL gerada para usar nos seus scripts!'
    );
}

// =====================================
// SINCRONIZAÇÃO COM BOLÃO ONLINE
// =====================================

/**
 * Sincronizar dados do Bolão Online com Google Sheets
 * Use isto como um webhook para enviar dados
 */
function sincronizarComBolao(urlBolao) {
    try {
        const participantes = obterParticipantes();
        const palpites = obterPalpites();
        const jogos = obterJogos();
        
        const dados = {
            participantes: participantes,
            palpites: palpites,
            jogos: jogos,
            ranking: obterRanking(),
            data_sincronizacao: new Date()
        };
        
        const opcoes = {
            method: 'post',
            payload: JSON.stringify(dados),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        const resposta = UrlFetchApp.fetch(urlBolao, opcoes);
        Logger.log('✅ Sincronização realizada: ' + resposta.getContentText());
        
    } catch (error) {
        Logger.log('❌ Erro na sincronização: ' + error.toString());
    }
}
