/*
 * =====================================
 * GOOGLE APPS SCRIPT
 * =====================================
 * Script para integração com Google Sheets
 * Para usar: Criar um Google Apps Script e colar este código
 */

// ID da planilha (substitua pelo seu)
const SPREADSHEET_ID = 'SEU_ID_AQUI';

// Nomes das abas
const SHEETS = {
    PARTICIPANTES: 'Participantes',
    PALPITES: 'Palpites',
    JOGOS: 'Jogos',
    RESULTADOS: 'Resultados'
};

/**
 * Função para criar as planilhas necessárias
 */
function createSheets() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Remover abas padrão
    const sheets = ss.getSheets();
    sheets.forEach(sheet => {
        if (sheet.getName() !== 'Participantes') {
            ss.deleteSheet(sheet);
        }
    });

    // Criar aba Participantes
    createParticipantesSheet();
    
    // Criar aba Palpites
    createPalpitesSheet();
    
    // Criar aba Jogos
    createJogosSheet();
    
    // Criar aba Resultados
    createResultadosSheet();
}

/**
 * Criar aba Participantes
 */
function createParticipantesSheet() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEETS.PARTICIPANTES);
    
    if (!sheet) {
        sheet = ss.insertSheet(SHEETS.PARTICIPANTES);
    }
    
    const headers = ['ID', 'Nome', 'WhatsApp', 'Email', 'Data Inscrição', 'Pago', 'Pontos', 'Acertos'];
    sheet.appendRow(headers);
    
    // Formatar header
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#1e7c3e').setFontColor('white').setFontWeight('bold');
}

/**
 * Criar aba Palpites
 */
function createPalpitesSheet() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEETS.PALPITES);
    
    if (!sheet) {
        sheet = ss.insertSheet(SHEETS.PALPITES);
    }
    
    const headers = ['ID', 'Participante', 'WhatsApp', 'Jogo', 'Time A', 'Placar A', 'Time B', 'Placar B', 'Data Palpite', 'Resultado', 'Pontos'];
    sheet.appendRow(headers);
    
    // Formatar header
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#ffd700').setFontColor('#1a1a1a').setFontWeight('bold');
}

/**
 * Criar aba Jogos
 */
function createJogosSheet() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEETS.JOGOS);
    
    if (!sheet) {
        sheet = ss.insertSheet(SHEETS.JOGOS);
    }
    
    const headers = ['ID', 'Grupo', 'Time A', 'Time B', 'Data', 'Local', 'Resultado'];
    sheet.appendRow(headers);
    
    // Formatar header
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#0066cc').setFontColor('white').setFontWeight('bold');
}

/**
 * Criar aba Resultados
 */
function createResultadosSheet() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEETS.RESULTADOS);
    
    if (!sheet) {
        sheet = ss.insertSheet(SHEETS.RESULTADOS);
    }
    
    const headers = ['Jogo', 'Resultado', 'Data', 'Local', 'Participantes que Acertaram'];
    sheet.appendRow(headers);
    
    // Formatar header
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#28a745').setFontColor('white').setFontWeight('bold');
}

/**
 * Adicionar participante na planilha
 */
function addParticipant(participante) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEETS.PARTICIPANTES);
    
    const row = [
        participante.id,
        participante.nome,
        participante.whatsapp,
        participante.email || '',
        participante.data_inscricao,
        participante.pago ? 'Sim' : 'Não',
        participante.pontos || 0,
        participante.acertos || 0
    ];
    
    sheet.appendRow(row);
}

/**
 * Adicionar palpite na planilha
 */
function addBet(palpite) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEETS.PALPITES);
    
    const row = [
        palpite.id,
        palpite.nome,
        palpite.whatsapp,
        `${palpite.time_a} vs ${palpite.time_b}`,
        palpite.time_a,
        palpite.placar_a,
        palpite.time_b,
        palpite.placar_b,
        palpite.data_palpite,
        palpite.resultado || 'Não finalizado',
        palpite.pontos || 0
    ];
    
    sheet.appendRow(row);
}

/**
 * Adicionar jogo na planilha
 */
function addGame(jogo) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEETS.JOGOS);
    
    const row = [
        jogo.id,
        jogo.grupo,
        jogo.time_a,
        jogo.time_b,
        jogo.data,
        jogo.local,
        jogo.resultado || 'Não finalizado'
    ];
    
    sheet.appendRow(row);
}

/**
 * Obter todos os participantes
 */
function getParticipants() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEETS.PARTICIPANTES);
    const data = sheet.getDataRange().getValues();
    
    const participants = [];
    for (let i = 1; i < data.length; i++) {
        participants.push({
            id: data[i][0],
            nome: data[i][1],
            whatsapp: data[i][2],
            email: data[i][3],
            data_inscricao: data[i][4],
            pago: data[i][5] === 'Sim',
            pontos: data[i][6],
            acertos: data[i][7]
        });
    }
    
    return participants;
}

/**
 * Obter todos os palpites
 */
function getBets() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEETS.PALPITES);
    const data = sheet.getDataRange().getValues();
    
    const bets = [];
    for (let i = 1; i < data.length; i++) {
        bets.push({
            id: data[i][0],
            nome: data[i][1],
            whatsapp: data[i][2],
            jogo: data[i][3],
            time_a: data[i][4],
            placar_a: data[i][5],
            time_b: data[i][6],
            placar_b: data[i][7],
            data_palpite: data[i][8],
            resultado: data[i][9],
            pontos: data[i][10]
        });
    }
    
    return bets;
}

/**
 * Obter ranking
 */
function getRanking() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEETS.PARTICIPANTES);
    const data = sheet.getDataRange().getValues();
    
    const ranking = [];
    for (let i = 1; i < data.length; i++) {
        ranking.push({
            nome: data[i][1],
            whatsapp: data[i][2],
            pontos: data[i][6],
            acertos: data[i][7],
            pago: data[i][5] === 'Sim'
        });
    }
    
    // Ordenar por pontos
    ranking.sort((a, b) => b.pontos - a.pontos);
    
    return ranking;
}

/**
 * Atualizar resultado do jogo
 */
function updateGameResult(gameId, resultado) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEETS.JOGOS);
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
        if (data[i][0] === gameId) {
            sheet.getRange(i + 1, 7).setValue(resultado);
            break;
        }
    }
}

/**
 * Função Web - Endpoint para obter ranking
 */
function doGet(e) {
    const action = e.parameter.action;
    
    let response;
    
    switch(action) {
        case 'ranking':
            response = getRanking();
            break;
        case 'participantes':
            response = getParticipants();
            break;
        case 'palpites':
            response = getBets();
            break;
        default:
            response = { error: 'Ação inválida' };
    }
    
    return ContentService.createTextOutput(JSON.stringify(response))
        .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Função Web - Endpoint para POST
 */
function doPost(e) {
    const action = e.parameter.action;
    const data = JSON.parse(e.postData.contents);
    
    let response;
    
    switch(action) {
        case 'add_participant':
            addParticipant(data);
            response = { success: true, message: 'Participante adicionado' };
            break;
        case 'add_bet':
            addBet(data);
            response = { success: true, message: 'Palpite adicionado' };
            break;
        case 'add_game':
            addGame(data);
            response = { success: true, message: 'Jogo adicionado' };
            break;
        case 'update_result':
            updateGameResult(data.gameId, data.resultado);
            response = { success: true, message: 'Resultado atualizado' };
            break;
        default:
            response = { success: false, error: 'Ação inválida' };
    }
    
    return ContentService.createTextOutput(JSON.stringify(response))
        .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Instalar função para criar menu
 */
function onOpen() {
    const ui = SpreadsheetApp.getUi();
    ui.createMenu('Bolão Copa 2026')
        .addItem('Criar Planilhas', 'createSheets')
        .addSeparator()
        .addItem('Gerar URL para publicar', 'deployWebApp')
        .addToUi();
}

/**
 * Deploy Web App
 */
function deployWebApp() {
    alert('Para publicar este script:\n1. Clique em "Implantar" (ícone de foguete)\n2. Selecione "Novo implante"\n3. Tipo: "Aplicativo Web"\n4. Executar como: Sua conta\n5. Acessar como: Qualquer pessoa\n6. Clique em "Implantar"\n\nCopie a URL gerada e coloque no seu site!');
}