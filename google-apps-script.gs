/*
 * Bolao Online 2026 - Google Apps Script
 * Estrutura limpa para Google Sheets.
 *
 * Abas usadas:
 * - Configuracao
 * - Participantes
 * - Jogos
 * - Palpites
 */

const SHEET_NAMES = {
    CONFIG: 'Configuracao',
    PARTICIPANTES: 'Participantes',
    JOGOS: 'Jogos',
    PALPITES: 'Palpites'
};

const APP_VERSION = 'planilha-leve-v11-whatsapp-unico-ranking-20260612';
const PUBLIC_CACHE_KEY = 'bolao_dados_publicos_v11';
const PUBLIC_CACHE_SECONDS = 15;
const LIMITE_MINUTOS_PALPITE_APOS_INICIO = 60;

const HEADERS = {
    CONFIG: ['Chave', 'Valor'],
    PARTICIPANTES: [
        'ID',
        'Nome',
        'WhatsApp',
        'Pago',
        'Data Inscricao',
        'Data Pagamento',
        'Pontos',
        'Acertos'
    ],
    JOGOS: [
        'ID',
        'Fase',
        'Grupo',
        'Time A',
        'Time B',
        'Data',
        'Hora',
        'Local',
        'Ativo',
        'Resultado'
    ],
    PALPITES: [
        'ID',
        'Participante ID',
        'Nome',
        'WhatsApp',
        'Jogo ID',
        'Time A',
        'Time B',
        'Placar A',
        'Placar B',
        'Resultado',
        'Pontos',
        'Data Palpite'
    ]
};

const CONFIG_PADRAO = {
    nome_bolao: 'Bolão Online',
    valor_palpite: 10,
    chave_pix: 'chave@pix',
    codigo_pix: '',
    pix_qr_url: '',
    recebedor_pix: 'Recebedor',
    cidade_pix: '',
    texto_premio: 'Para quem fizer mais pontos no final',
    pontos_resultado: 1,
    pontos_empate: 1,
    pontos_exato: 5
};

const CONFIG_KEYS = [
    ['Nome do Bolao', 'nome_bolao'],
    ['Valor Palpite', 'valor_palpite'],
    ['Chave PIX', 'chave_pix'],
    ['Codigo PIX', 'codigo_pix'],
    ['URL QR Code PIX', 'pix_qr_url'],
    ['Recebedor PIX', 'recebedor_pix'],
    ['Cidade PIX', 'cidade_pix'],
    ['Texto do Premio', 'texto_premio'],
    ['Pontos Resultado', 'pontos_resultado'],
    ['Pontos Empate', 'pontos_empate'],
    ['Pontos Exato', 'pontos_exato']
];

// =====================================
// CRIACAO LIMPA DAS ABAS
// =====================================

function criarPlanilhas() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const abasNecessarias = Object.values(SHEET_NAMES);

    abasNecessarias.forEach(nome => {
        if (!ss.getSheetByName(nome)) {
            ss.insertSheet(nome);
        }
    });

    ss.getSheets().forEach(sheet => {
        if (!abasNecessarias.includes(sheet.getName()) && ss.getSheets().length > 1) {
            ss.deleteSheet(sheet);
        }
    });

    criarAbaConfiguracao(ss);
    criarAbaParticipantes(ss);
    criarAbaJogos(ss);
    criarAbaPalpites(ss);

    SpreadsheetApp.getUi().alert(
        'Planilha nova criada com sucesso.\n\n' +
        'Abas usadas: Configuracao, Participantes, Jogos e Palpites.\n' +
        'Agora cadastre/restaure os jogos pelo painel admin.'
    );
}

function criarAbaConfiguracao(ss) {
    const sheet = prepararAba(ss, SHEET_NAMES.CONFIG, HEADERS.CONFIG, '#1e7c3e', 'white');
    const linhas = CONFIG_KEYS.map(([chave, campo]) => [chave, CONFIG_PADRAO[campo]]);
    sheet.getRange(2, 1, linhas.length, 2).setValues(linhas);
    sheet.setColumnWidth(1, 180);
    sheet.setColumnWidth(2, 360);
}

function criarAbaParticipantes(ss) {
    const sheet = prepararAba(ss, SHEET_NAMES.PARTICIPANTES, HEADERS.PARTICIPANTES, '#ffd700', '#1a1a1a');
    ajustarLarguras(sheet, [90, 180, 150, 90, 170, 170, 90, 90]);
}

function criarAbaJogos(ss) {
    const sheet = prepararAba(ss, SHEET_NAMES.JOGOS, HEADERS.JOGOS, '#28a745', 'white');
    ajustarLarguras(sheet, [70, 140, 80, 160, 160, 120, 90, 240, 90, 110]);
}

function criarAbaPalpites(ss) {
    const sheet = prepararAba(ss, SHEET_NAMES.PALPITES, HEADERS.PALPITES, '#0066cc', 'white');
    ajustarLarguras(sheet, [100, 130, 180, 150, 90, 160, 160, 90, 90, 110, 90, 180]);
}

function prepararAba(ss, nome, headers, corFundo, corTexto) {
    const sheet = ss.getSheetByName(nome) || ss.insertSheet(nome);
    sheet.clear();
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length)
        .setBackground(corFundo)
        .setFontColor(corTexto)
        .setFontWeight('bold');
    sheet.setFrozenRows(1);
    return sheet;
}

function ajustarLarguras(sheet, larguras) {
    larguras.forEach((largura, index) => sheet.setColumnWidth(index + 1, largura));
}

// =====================================
// HELPERS
// =====================================

function obterAba(nome) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(nome);
    if (!sheet) {
        sheet = ss.insertSheet(nome);
    }
    return sheet;
}

function garantirCabecalhos(sheet, headers) {
    if (sheet.getLastRow() === 0 || sheet.getLastColumn() === 0) {
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
        return;
    }

    const existentes = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), headers.length)).getValues()[0].map(String);
    let mudou = false;

    headers.forEach(header => {
        if (!existentes.includes(header)) {
            existentes.push(header);
            mudou = true;
        }
    });

    if (mudou) {
        sheet.getRange(1, 1, 1, existentes.length).setValues([existentes]);
    }
}

function obterMapa(sheet, headers) {
    garantirCabecalhos(sheet, headers);
    const cabecalhos = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const mapa = {};
    cabecalhos.forEach((header, index) => {
        mapa[String(header)] = index;
    });
    return mapa;
}

function valorLinha(row, mapa, nome, fallback) {
    const index = mapa[nome];
    if (index === undefined) return fallback || '';
    return row[index] !== undefined && row[index] !== null ? row[index] : (fallback || '');
}

function escreverLinhaPorCabecalhos(sheet, rowIndex, headers, valores) {
    garantirCabecalhos(sheet, headers);
    const mapa = obterMapa(sheet, headers);
    const totalColunas = sheet.getLastColumn();
    const row = new Array(totalColunas).fill('');

    headers.forEach((header, index) => {
        row[mapa[header]] = valores[index];
    });

    sheet.getRange(rowIndex, 1, 1, totalColunas).setValues([row]);
}

function boolParaTexto(valor) {
    return textoParaBool(valor) ? 'Sim' : 'Nao';
}

function textoParaBool(valor) {
    const texto = String(valor || '').toLowerCase().trim();
    return valor === true || texto === 'sim' || texto === 'true' || texto === 'pago';
}

function numero(valor, fallback) {
    const n = Number(String(valor || '').replace(',', '.'));
    return isFinite(n) ? n : (fallback || 0);
}

function valorPresente(valor) {
    return valor !== undefined && valor !== null && String(valor).trim() !== '';
}

function pareceNumero(valor) {
    if (!valorPresente(valor)) return false;
    return isFinite(Number(String(valor).replace(',', '.')));
}

function normalizarTexto(valor) {
    return String(valor || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .trim();
}

function normalizarNomePessoa(valor) {
    return normalizarTexto(valor)
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\bj\s*r\b/g, 'junior')
        .replace(/\bjr\b/g, 'junior')
        .replace(/\s+/g, ' ')
        .trim();
}

function normalizarContato(valor) {
    return String(valor || '').replace(/\D/g, '');
}

function validarWhatsapp11(valor) {
    return normalizarContato(valor).length === 11;
}

function mesmoTime(a, b) {
    return normalizarTexto(a) === normalizarTexto(b);
}

function idsIguais(a, b) {
    return String(a || '').trim() !== '' && String(a) === String(b);
}

function formatarData(valorData) {
    if (!valorData) return '';
    const timezone = Session.getScriptTimeZone();

    if (Object.prototype.toString.call(valorData) === '[object Date]' && !isNaN(valorData.getTime())) {
        return Utilities.formatDate(valorData, timezone, 'yyyy-MM-dd');
    }

    const texto = String(valorData).trim();
    if (/^\d{4}-\d{2}-\d{2}/.test(texto)) return texto.substring(0, 10);

    const data = new Date(texto);
    if (!isNaN(data.getTime())) {
        return Utilities.formatDate(data, timezone, 'yyyy-MM-dd');
    }

    return texto;
}

function formatarHora(valorHora) {
    if (!valorHora) return '';
    const timezone = Session.getScriptTimeZone();

    if (Object.prototype.toString.call(valorHora) === '[object Date]' && !isNaN(valorHora.getTime())) {
        return Utilities.formatDate(valorHora, timezone, 'HH:mm');
    }

    const texto = String(valorHora).trim();
    const hora = texto.match(/^(\d{1,2}):(\d{2})/);
    if (hora) return `${hora[1].padStart(2, '0')}:${hora[2]}`;

    return texto;
}

function obterDataHoraJogo(jogo) {
    if (!jogo || !jogo.data) return null;

    const data = formatarData(jogo.data);
    const hora = formatarHora(jogo.hora) || '00:00';
    const partesData = String(data).match(/^(\d{4})-(\d{2})-(\d{2})/);
    const partesHora = String(hora).match(/^(\d{1,2}):(\d{2})/);

    if (!partesData) return null;

    const ano = Number(partesData[1]);
    const mes = Number(partesData[2]) - 1;
    const dia = Number(partesData[3]);
    const horas = partesHora ? Number(partesHora[1]) : 0;
    const minutos = partesHora ? Number(partesHora[2]) : 0;
    const dataHora = new Date(ano, mes, dia, horas, minutos, 0, 0);

    return isNaN(dataHora.getTime()) ? null : dataHora;
}

function palpiteAindaPermitido(jogo) {
    const dataHora = obterDataHoraJogo(jogo);
    if (!dataHora) return true;

    const limite = new Date(dataHora.getTime() + LIMITE_MINUTOS_PALPITE_APOS_INICIO * 60 * 1000);
    return new Date().getTime() <= limite.getTime();
}

function limparCachePublico() {
    try {
        CacheService.getScriptCache().remove(PUBLIC_CACHE_KEY);
    } catch (error) {
        // Se o cache falhar, a planilha continua funcionando normalmente.
    }
}

function extrairPlacar(resultado) {
    const match = String(resultado || '').trim().match(/(\d+)\s*[xX\-:]\s*(\d+)/);
    if (!match) return null;
    return { a: Number(match[1]), b: Number(match[2]) };
}

function criarResposta(e, response) {
    const json = JSON.stringify(response);
    const callback = e && e.parameter && e.parameter.callback;

    if (callback) {
        return ContentService.createTextOutput(`${callback}(${json});`)
            .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }

    return ContentService.createTextOutput(json)
        .setMimeType(ContentService.MimeType.JSON);
}

// =====================================
// CONFIGURACAO
// =====================================

function obterConfiguracaoBolao() {
    const sheet = obterAba(SHEET_NAMES.CONFIG);
    const mapa = obterMapa(sheet, HEADERS.CONFIG);
    const data = sheet.getDataRange().getValues();
    const config = Object.assign({}, CONFIG_PADRAO);

    for (let i = 1; i < data.length; i++) {
        const chave = String(valorLinha(data[i], mapa, 'Chave')).trim();
        const valor = valorLinha(data[i], mapa, 'Valor');
        const item = CONFIG_KEYS.find(([nome]) => nome === chave);
        if (!item) continue;

        const campo = item[1];
        if (['valor_palpite', 'pontos_resultado', 'pontos_empate', 'pontos_exato'].includes(campo)) {
            config[campo] = numero(valor, CONFIG_PADRAO[campo]);
        } else {
            config[campo] = valor || '';
        }
    }

    return config;
}

function atualizarConfiguracaoBolao(dados) {
    const sheet = obterAba(SHEET_NAMES.CONFIG);
    sheet.clear();
    sheet.getRange(1, 1, 1, HEADERS.CONFIG.length).setValues([HEADERS.CONFIG]);
    sheet.getRange(1, 1, 1, HEADERS.CONFIG.length).setBackground('#1e7c3e').setFontColor('white').setFontWeight('bold');

    const config = Object.assign({}, CONFIG_PADRAO, dados || {});
    const linhas = CONFIG_KEYS.map(([chave, campo]) => [chave, config[campo] !== undefined ? config[campo] : '']);
    sheet.getRange(2, 1, linhas.length, 2).setValues(linhas);
}

// =====================================
// PARTICIPANTES
// =====================================

function linhaParticipante(dados) {
    const pago = textoParaBool(dados.pago);
    return [
        dados.id || Date.now(),
        dados.nome || '',
        dados.whatsapp || '',
        boolParaTexto(pago),
        dados.data_inscricao || new Date(),
        pago ? (dados.data_pagamento || new Date()) : (dados.data_pagamento || ''),
        numero(dados.pontos, 0),
        numero(dados.acertos, 0)
    ];
}

function participanteDaLinha(row, mapa) {
    const pago = textoParaBool(valorLinha(row, mapa, 'Pago'));
    return {
        id: valorLinha(row, mapa, 'ID'),
        nome: valorLinha(row, mapa, 'Nome'),
        whatsapp: valorLinha(row, mapa, 'WhatsApp'),
        email: '',
        data_inscricao: valorLinha(row, mapa, 'Data Inscricao'),
        pago,
        pendente_pagamento: !pago,
        pontos: numero(valorLinha(row, mapa, 'Pontos'), 0),
        acertos: numero(valorLinha(row, mapa, 'Acertos'), 0),
        data_pagamento: valorLinha(row, mapa, 'Data Pagamento')
    };
}

function obterParticipantes() {
    const sheet = obterAba(SHEET_NAMES.PARTICIPANTES);
    const mapa = obterMapa(sheet, HEADERS.PARTICIPANTES);
    const data = sheet.getDataRange().getValues();
    const participantes = [];

    for (let i = 1; i < data.length; i++) {
        if (!valorLinha(data[i], mapa, 'Nome')) continue;
        participantes.push(participanteDaLinha(data[i], mapa));
    }

    return participantes;
}

function encontrarLinhaParticipante(sheet, dados) {
    const mapa = obterMapa(sheet, HEADERS.PARTICIPANTES);
    const data = sheet.getDataRange().getValues();
    const contatoDados = normalizarContato(dados.whatsapp);
    const nomeDados = normalizarNomePessoa(dados.nome);

    for (let i = 1; i < data.length; i++) {
        const mesmoId = idsIguais(valorLinha(data[i], mapa, 'ID'), dados.id);
        const mesmoContato = contatoDados && normalizarContato(valorLinha(data[i], mapa, 'WhatsApp')) === contatoDados;
        const mesmoNome = nomeDados && normalizarNomePessoa(valorLinha(data[i], mapa, 'Nome')) === nomeDados;
        if (mesmoId || mesmoNome || mesmoContato) return i + 1;
    }

    return -1;
}

function adicionarParticipante(dados) {
    if (!validarWhatsapp11(dados && dados.whatsapp)) {
        throw new Error('WhatsApp deve ter 11 digitos com DDD.');
    }

    dados.whatsapp = normalizarContato(dados.whatsapp);

    const sheet = obterAba(SHEET_NAMES.PARTICIPANTES);
    const rowIndex = encontrarLinhaParticipante(sheet, dados);
    let base = dados || {};

    if (rowIndex > 0) {
        const mapa = obterMapa(sheet, HEADERS.PARTICIPANTES);
        const atual = participanteDaLinha(sheet.getRange(rowIndex, 1, 1, sheet.getLastColumn()).getValues()[0], mapa);
        base = Object.assign({}, atual, dados || {});
    }

    const row = linhaParticipante(base);

    if (rowIndex > 0) {
        escreverLinhaPorCabecalhos(sheet, rowIndex, HEADERS.PARTICIPANTES, row);
    } else {
        escreverLinhaPorCabecalhos(sheet, sheet.getLastRow() + 1, HEADERS.PARTICIPANTES, row);
    }
}

function atualizarParticipante(dados) {
    adicionarParticipante(dados);
}

function reescreverParticipantes(participantes) {
    const sheet = obterAba(SHEET_NAMES.PARTICIPANTES);
    sheet.clear();
    sheet.getRange(1, 1, 1, HEADERS.PARTICIPANTES.length).setValues([HEADERS.PARTICIPANTES]);
    sheet.getRange(1, 1, 1, HEADERS.PARTICIPANTES.length).setBackground('#ffd700').setFontColor('#0f172a').setFontWeight('bold');
    sheet.setFrozenRows(1);

    if (participantes.length > 0) {
        sheet.getRange(2, 1, participantes.length, HEADERS.PARTICIPANTES.length).setValues(participantes.map(linhaParticipante));
    }
}

function deduplicarParticipantesPorNome() {
    const participantes = obterParticipantes();
    const mapa = {};
    const ordem = [];

    participantes.forEach(participante => {
        const chave = normalizarNomePessoa(participante.nome) || normalizarContato(participante.whatsapp) || String(participante.id || '');
        if (!chave) return;

        if (!mapa[chave]) {
            mapa[chave] = Object.assign({}, participante, {
                whatsapp: normalizarContato(participante.whatsapp) || participante.whatsapp || ''
            });
            ordem.push(chave);
            return;
        }

        const atual = mapa[chave];
        const contatoAtual = normalizarContato(atual.whatsapp);
        const contatoNovo = normalizarContato(participante.whatsapp);

        if ((!atual.nome || String(participante.nome || '').length > String(atual.nome || '').length) && participante.nome) {
            atual.nome = participante.nome;
        }

        if (!validarWhatsapp11(contatoAtual) && validarWhatsapp11(contatoNovo)) {
            atual.whatsapp = contatoNovo;
        } else if (!atual.whatsapp && participante.whatsapp) {
            atual.whatsapp = participante.whatsapp;
        }

        atual.pago = Boolean(atual.pago || participante.pago);
        atual.pendente_pagamento = !atual.pago;
        atual.data_inscricao = atual.data_inscricao || participante.data_inscricao;
        atual.data_pagamento = atual.data_pagamento || participante.data_pagamento;
        atual.pontos = 0;
        atual.acertos = 0;
    });

    const lista = ordem.map(chave => mapa[chave]);
    if (lista.length !== participantes.length) {
        reescreverParticipantes(lista);
    }

    return lista;
}

// =====================================
// JOGOS
// =====================================

function linhaJogo(dados) {
    return [
        dados.id || Date.now(),
        dados.fase || '',
        dados.grupo || '',
        dados.time_a || '',
        dados.time_b || '',
        dados.data || '',
        dados.hora || '',
        dados.local || '',
        boolParaTexto(dados.ativo !== false && dados.ativo !== 'false' && dados.ativo !== 'Nao'),
        dados.resultado || ''
    ];
}

function jogoDaLinha(row, mapa) {
    return {
        id: valorLinha(row, mapa, 'ID'),
        fase: valorLinha(row, mapa, 'Fase'),
        grupo: valorLinha(row, mapa, 'Grupo') || null,
        time_a: valorLinha(row, mapa, 'Time A'),
        time_b: valorLinha(row, mapa, 'Time B'),
        data: formatarData(valorLinha(row, mapa, 'Data')),
        hora: formatarHora(valorLinha(row, mapa, 'Hora')),
        local: valorLinha(row, mapa, 'Local'),
        ativo: textoParaBool(valorLinha(row, mapa, 'Ativo')),
        resultado: valorLinha(row, mapa, 'Resultado') || null
    };
}

function obterJogos() {
    const sheet = obterAba(SHEET_NAMES.JOGOS);
    const mapa = obterMapa(sheet, HEADERS.JOGOS);
    const data = sheet.getDataRange().getValues();
    const jogos = [];

    for (let i = 1; i < data.length; i++) {
        if (!valorLinha(data[i], mapa, 'Time A') || !valorLinha(data[i], mapa, 'Time B')) continue;
        jogos.push(jogoDaLinha(data[i], mapa));
    }

    return jogos;
}

function encontrarLinhaJogo(sheet, dados) {
    const mapa = obterMapa(sheet, HEADERS.JOGOS);
    const data = sheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
        const mesmoId = idsIguais(valorLinha(data[i], mapa, 'ID'), dados.id || dados.jogo_id);
        const mesmosTimes = mesmoTime(valorLinha(data[i], mapa, 'Time A'), dados.time_a)
            && mesmoTime(valorLinha(data[i], mapa, 'Time B'), dados.time_b);
        if (mesmoId || mesmosTimes) return i + 1;
    }

    return -1;
}

function adicionarJogo(dados) {
    const sheet = obterAba(SHEET_NAMES.JOGOS);
    const rowIndex = encontrarLinhaJogo(sheet, dados);
    const row = linhaJogo(dados);

    if (rowIndex > 0) {
        escreverLinhaPorCabecalhos(sheet, rowIndex, HEADERS.JOGOS, row);
    } else {
        escreverLinhaPorCabecalhos(sheet, sheet.getLastRow() + 1, HEADERS.JOGOS, row);
    }
}

function atualizarJogo(dados) {
    adicionarJogo(dados);
    atualizarPontuacaoPlanilha();
}

function adicionarJogosEmLote(dados) {
    const jogos = Array.isArray(dados) ? dados : (dados && Array.isArray(dados.jogos) ? dados.jogos : []);
    if (jogos.length === 0) {
        throw new Error('Nenhum jogo recebido para salvar.');
    }

    const sheet = obterAba(SHEET_NAMES.JOGOS);
    sheet.clear();
    sheet.getRange(1, 1, 1, HEADERS.JOGOS.length).setValues([HEADERS.JOGOS]);
    sheet.getRange(1, 1, 1, HEADERS.JOGOS.length).setBackground('#28a745').setFontColor('white').setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.getRange(2, 1, jogos.length, HEADERS.JOGOS.length).setValues(jogos.map(linhaJogo));
    return jogos.length;
}

function adicionarResultado(dados) {
    const sheet = obterAba(SHEET_NAMES.JOGOS);
    const rowIndex = encontrarLinhaJogo(sheet, dados);
    if (rowIndex <= 0) {
        throw new Error('Jogo nao encontrado para lancar resultado.');
    }

    const mapa = obterMapa(sheet, HEADERS.JOGOS);
    const row = sheet.getRange(rowIndex, 1, 1, sheet.getLastColumn()).getValues()[0];
    const jogo = jogoDaLinha(row, mapa);
    jogo.resultado = dados.resultado || '';
    jogo.ativo = false;

    escreverLinhaPorCabecalhos(sheet, rowIndex, HEADERS.JOGOS, linhaJogo(jogo));
    atualizarPontuacaoPlanilha();
}

function obterResultados() {
    return obterJogos()
        .filter(jogo => jogo.resultado)
        .map(jogo => ({
            jogo_id: jogo.id,
            time_a: jogo.time_a,
            time_b: jogo.time_b,
            resultado: jogo.resultado,
            data: jogo.data,
            hora: jogo.hora,
            fase: jogo.fase
        }));
}

// =====================================
// PALPITES E PONTUACAO
// =====================================

function linhaPalpite(dados) {
    return [
        dados.id || Date.now(),
        dados.participante_id || dados.participante || '',
        dados.nome || '',
        dados.whatsapp || '',
        dados.jogo_id || '',
        dados.time_a || '',
        dados.time_b || '',
        numero(dados.placar_a, 0),
        numero(dados.placar_b, 0),
        dados.resultado || '',
        numero(dados.pontos, 0),
        dados.data_palpite || new Date()
    ];
}

function palpiteDaLinha(row, mapa) {
    const participanteId = valorLinha(row, mapa, 'Participante ID');
    const nome = valorLinha(row, mapa, 'Nome');
    const whatsapp = valorLinha(row, mapa, 'WhatsApp');
    const jogoId = valorLinha(row, mapa, 'Jogo ID');
    const timeA = valorLinha(row, mapa, 'Time A');
    const timeB = valorLinha(row, mapa, 'Time B');
    const placarA = valorLinha(row, mapa, 'Placar A');
    const placarB = valorLinha(row, mapa, 'Placar B');

    // Corrige linhas gravadas por uma implantacao antiga, sem Participante ID:
    // ID | Nome | WhatsApp | Jogo ID | Time A | Placar A | Time B | Placar B...
    const linhaAntigaSemParticipanteId = !pareceNumero(jogoId)
        && pareceNumero(timeA)
        && valorPresente(timeB)
        && !pareceNumero(timeB)
        && pareceNumero(placarA);

    if (linhaAntigaSemParticipanteId) {
        return {
            id: valorLinha(row, mapa, 'ID'),
            participante_id: '',
            nome: participanteId,
            whatsapp: nome,
            jogo_id: whatsapp,
            time_a: jogoId,
            time_b: timeB,
            placar_a: numero(timeA, 0),
            placar_b: numero(placarA, 0),
            resultado: placarB || '',
            pontos: numero(valorLinha(row, mapa, 'Resultado'), 0),
            data_palpite: valorLinha(row, mapa, 'Pontos') || valorLinha(row, mapa, 'Data Palpite')
        };
    }

    // Corrige linhas gravadas por uma implantacao intermediaria:
    // ID | Nome | Participante ID | WhatsApp | Jogo ID | Time A | Placar A | Time B...
    const linhaAntigaComParticipanteId = pareceNumero(jogoId)
        && pareceNumero(timeB)
        && valorPresente(placarA)
        && !pareceNumero(placarA);

    if (linhaAntigaComParticipanteId) {
        return {
            id: valorLinha(row, mapa, 'ID'),
            participante_id: nome,
            nome: participanteId,
            whatsapp: whatsapp,
            jogo_id: jogoId,
            time_a: timeA,
            time_b: placarA,
            placar_a: numero(timeB, 0),
            placar_b: numero(placarB, 0),
            resultado: valorLinha(row, mapa, 'Resultado') || '',
            pontos: numero(valorLinha(row, mapa, 'Pontos'), 0),
            data_palpite: valorLinha(row, mapa, 'Data Palpite')
        };
    }

    return {
        id: valorLinha(row, mapa, 'ID'),
        participante_id: participanteId,
        nome: nome,
        whatsapp: whatsapp,
        jogo_id: jogoId,
        time_a: timeA,
        time_b: timeB,
        placar_a: numero(placarA, 0),
        placar_b: numero(placarB, 0),
        resultado: valorLinha(row, mapa, 'Resultado'),
        pontos: numero(valorLinha(row, mapa, 'Pontos'), 0),
        data_palpite: valorLinha(row, mapa, 'Data Palpite')
    };
}

function obterPalpites() {
    const sheet = obterAba(SHEET_NAMES.PALPITES);
    const mapa = obterMapa(sheet, HEADERS.PALPITES);
    const data = sheet.getDataRange().getValues();
    const palpites = [];

    for (let i = 1; i < data.length; i++) {
        const palpite = palpiteDaLinha(data[i], mapa);
        if (!valorPresente(palpite.nome) && !valorPresente(palpite.whatsapp) && !valorPresente(palpite.jogo_id)) continue;
        palpites.push(palpite);
    }

    return palpites;
}

function encontrarLinhaPalpite(sheet, id) {
    if (!id) return -1;
    const mapa = obterMapa(sheet, HEADERS.PALPITES);
    const data = sheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
        if (idsIguais(valorLinha(data[i], mapa, 'ID'), id)) return i + 1;
    }

    return -1;
}

function adicionarPalpite(dados) {
    if (!validarWhatsapp11(dados && dados.whatsapp)) {
        throw new Error('WhatsApp deve ter 11 digitos com DDD.');
    }

    const sheet = obterAba(SHEET_NAMES.PALPITES);
    const participante = encontrarParticipanteParaPalpite(dados);
    const jogo = encontrarJogoParaPalpite(dados);

    if (jogo && !palpiteAindaPermitido(jogo)) {
        throw new Error('Apostas encerradas para este jogo.');
    }

    const palpite = Object.assign({}, dados || {});
    palpite.whatsapp = normalizarContato(palpite.whatsapp);
    if (participante) {
        palpite.participante_id = participante.id;
        palpite.nome = participante.nome || palpite.nome;
        if (!validarWhatsapp11(participante.whatsapp) && validarWhatsapp11(palpite.whatsapp)) {
            participante.whatsapp = palpite.whatsapp;
            adicionarParticipante(participante);
        }
    }
    if (jogo) {
        palpite.jogo_id = jogo.id;
        palpite.time_a = jogo.time_a;
        palpite.time_b = jogo.time_b;
    }

    const rowIndex = encontrarLinhaPalpite(sheet, palpite.id);
    const row = linhaPalpite(palpite);

    if (rowIndex > 0) {
        escreverLinhaPorCabecalhos(sheet, rowIndex, HEADERS.PALPITES, row);
    } else {
        escreverLinhaPorCabecalhos(sheet, sheet.getLastRow() + 1, HEADERS.PALPITES, row);
    }

    // Palpite novo entra com 0 pontos. O recalculo pesado acontece ao lancar resultado.
}

function encontrarParticipanteParaPalpite(palpite) {
    const participantes = obterParticipantes();
    return participantes.find(p => idsIguais(p.id, palpite.participante_id))
        || participantes.find(p => normalizarContato(p.whatsapp) === normalizarContato(palpite.whatsapp)
            && normalizarNomePessoa(p.nome) === normalizarNomePessoa(palpite.nome))
        || participantes.find(p => normalizarNomePessoa(p.nome) === normalizarNomePessoa(palpite.nome));
}

function encontrarJogoParaPalpite(palpite) {
    const jogos = obterJogos();
    return jogos.find(j => idsIguais(j.id, palpite.jogo_id))
        || jogos.find(j => mesmoTime(j.time_a, palpite.time_a) && mesmoTime(j.time_b, palpite.time_b));
}

function jogoCorrespondePalpite(jogo, palpite) {
    if (!jogo || !palpite) return false;
    if (idsIguais(jogo.id, palpite.jogo_id)) return true;
    return mesmoTime(jogo.time_a, palpite.time_a) && mesmoTime(jogo.time_b, palpite.time_b);
}

function palpitePertenceParticipante(palpite, participante) {
    if (idsIguais(palpite.participante_id, participante.id)) return true;
    const mesmoContato = normalizarContato(palpite.whatsapp) && normalizarContato(palpite.whatsapp) === normalizarContato(participante.whatsapp);
    const mesmoNome = normalizarNomePessoa(palpite.nome) === normalizarNomePessoa(participante.nome);
    const participanteIdComoNome = normalizarNomePessoa(palpite.participante_id) && normalizarNomePessoa(palpite.participante_id) === normalizarNomePessoa(participante.nome);
    return mesmoContato || mesmoNome || participanteIdComoNome;
}

function calcularPontos(placarA, placarB, resultadoA, resultadoB, config) {
    if (placarA === resultadoA && placarB === resultadoB) {
        return numero(config.pontos_exato, 5);
    }

    const vencedorPalpite = placarA > placarB ? 'A' : placarA < placarB ? 'B' : 'EMPATE';
    const vencedorResultado = resultadoA > resultadoB ? 'A' : resultadoA < resultadoB ? 'B' : 'EMPATE';

    if (vencedorPalpite !== vencedorResultado) return 0;
    if (vencedorPalpite === 'EMPATE') return numero(config.pontos_empate, 1);
    return numero(config.pontos_resultado, 1);
}

function garantirParticipantesDosPalpites(palpites) {
    palpites.forEach(palpite => {
        if (!palpite.nome || !palpite.whatsapp) return;
        if (!validarWhatsapp11(palpite.whatsapp)) return;
        const participante = encontrarParticipanteParaPalpite(palpite);
        if (!participante) {
            adicionarParticipante({
                id: palpite.participante_id || Date.now(),
                nome: palpite.nome,
                whatsapp: palpite.whatsapp,
                pago: false,
                pontos: 0,
                acertos: 0
            });
        }
    });
}

function atualizarPontuacaoPlanilha() {
    const jogos = obterJogos();
    const config = obterConfiguracaoBolao();
    let palpites = obterPalpites();

    deduplicarParticipantesPorNome();
    garantirParticipantesDosPalpites(palpites);
    deduplicarParticipantesPorNome();

    palpites = palpites.map(palpite => {
        const participante = encontrarParticipanteParaPalpite(palpite);
        if (participante) {
            palpite.participante_id = participante.id;
            palpite.nome = participante.nome || palpite.nome;
            if (validarWhatsapp11(participante.whatsapp)) {
                palpite.whatsapp = normalizarContato(participante.whatsapp);
            }
        }

        const jogo = jogos.find(j => jogoCorrespondePalpite(j, palpite));
        if (jogo) {
            palpite.jogo_id = jogo.id;
            palpite.time_a = jogo.time_a;
            palpite.time_b = jogo.time_b;
            palpite.resultado = jogo.resultado || '';
        }

        const placarResultado = extrairPlacar(palpite.resultado);
        if (placarResultado) {
            palpite.pontos = calcularPontos(
                numero(palpite.placar_a, 0),
                numero(palpite.placar_b, 0),
                placarResultado.a,
                placarResultado.b,
                config
            );
        } else {
            palpite.pontos = 0;
        }

        return palpite;
    });

    reescreverPalpites(palpites);
    atualizarPontosParticipantes(palpites);
    return palpites.length;
}

function reescreverPalpites(palpites) {
    const sheet = obterAba(SHEET_NAMES.PALPITES);
    sheet.clear();
    sheet.getRange(1, 1, 1, HEADERS.PALPITES.length).setValues([HEADERS.PALPITES]);
    sheet.getRange(1, 1, 1, HEADERS.PALPITES.length).setBackground('#0066cc').setFontColor('white').setFontWeight('bold');
    sheet.setFrozenRows(1);

    if (palpites.length > 0) {
        sheet.getRange(2, 1, palpites.length, HEADERS.PALPITES.length).setValues(palpites.map(linhaPalpite));
    }
}

function atualizarPontosParticipantes(palpites) {
    const participantes = obterParticipantes();
    const sheet = obterAba(SHEET_NAMES.PARTICIPANTES);

    participantes.forEach((participante, index) => {
        const palpitesPessoa = palpites.filter(p => palpitePertenceParticipante(p, participante));
        participante.pontos = palpitesPessoa.reduce((total, p) => total + numero(p.pontos, 0), 0);
        participante.acertos = palpitesPessoa.filter(p => numero(p.pontos, 0) > 0).length;
        escreverLinhaPorCabecalhos(sheet, index + 2, HEADERS.PARTICIPANTES, linhaParticipante(participante));
    });
}

// =====================================
// RANKING
// =====================================

function obterRanking() {
    atualizarPontuacaoPlanilha();

    const participantes = obterParticipantes();
    const palpites = obterPalpites();
    const rankingMap = {};

    participantes.forEach(p => {
        const chave = normalizarNomePessoa(p.nome) || normalizarContato(p.whatsapp) || String(p.id || '');
        if (!rankingMap[chave]) {
            rankingMap[chave] = {
                nome: p.nome,
                whatsapp: p.whatsapp,
                pontos: 0,
                palpites: 0,
                acertos: 0,
                pago: Boolean(p.pago),
                pendente_pagamento: !p.pago
            };
        } else {
            rankingMap[chave].pago = Boolean(rankingMap[chave].pago || p.pago);
            rankingMap[chave].pendente_pagamento = rankingMap[chave].pago ? false : Boolean(rankingMap[chave].pendente_pagamento || !p.pago);
            if (!rankingMap[chave].whatsapp && p.whatsapp) rankingMap[chave].whatsapp = p.whatsapp;
        }
    });

    palpites.forEach(palpite => {
        const participante = participantes.find(p => palpitePertenceParticipante(palpite, p));
        const chave = normalizarNomePessoa((participante && participante.nome) || palpite.nome)
            || normalizarContato((participante && participante.whatsapp) || palpite.whatsapp)
            || String(palpite.participante_id || palpite.id || '');

        if (!rankingMap[chave]) {
            rankingMap[chave] = {
                nome: (participante && participante.nome) || palpite.nome || 'Participante',
                whatsapp: (participante && participante.whatsapp) || palpite.whatsapp || '',
                pontos: 0,
                palpites: 0,
                acertos: 0,
                pago: participante ? Boolean(participante.pago) : false,
                pendente_pagamento: participante ? !participante.pago : true
            };
        }

        const item = rankingMap[chave];
        item.pontos += numero(palpite.pontos, 0);
        item.palpites += 1;
        if (numero(palpite.pontos, 0) > 0) item.acertos += 1;
        if (participante) {
            item.pago = Boolean(item.pago || participante.pago);
            item.pendente_pagamento = item.pago ? false : Boolean(item.pendente_pagamento || !participante.pago);
        }
    });

    const ranking = Object.values(rankingMap);
    ranking.sort((a, b) => b.pontos - a.pontos);
    return ranking;
}

function obterDadosSite() {
    return {
        versao: APP_VERSION,
        config: obterConfiguracaoBolao(),
        jogos: obterJogos(),
        participantes: obterParticipantes(),
        palpites: obterPalpites(),
        resultados: obterResultados()
    };
}

// =====================================
// LEITURA PUBLICA SIMPLES
// =====================================

function obterAbaPublica(nomesPossiveis) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheets = ss.getSheets();

    for (let i = 0; i < nomesPossiveis.length; i++) {
        const sheet = ss.getSheetByName(nomesPossiveis[i]);
        if (sheet) return sheet;
    }

    const nomesNormalizados = nomesPossiveis.map(normalizarTexto);
    return sheets.find(sheet => nomesNormalizados.includes(normalizarTexto(sheet.getName()))) || null;
}

function criarMapaPublico(sheet) {
    if (!sheet || sheet.getLastRow() < 1 || sheet.getLastColumn() < 1) return {};
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const mapa = {};

    headers.forEach((header, index) => {
        const chave = normalizarTexto(header).replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
        if (chave) mapa[chave] = index;
    });

    return mapa;
}

function valorPublico(row, mapa, nomes) {
    for (let i = 0; i < nomes.length; i++) {
        const chave = normalizarTexto(nomes[i]).replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
        const index = mapa[chave];
        if (index !== undefined && row[index] !== undefined && row[index] !== null) {
            return row[index];
        }
    }
    return '';
}

function lerConfiguracaoPublica() {
    const sheet = obterAbaPublica(['Configuracao', 'Configuração', 'Config']);
    if (!sheet || sheet.getLastRow() < 2) return CONFIG_PADRAO;

    const mapa = criarMapaPublico(sheet);
    const data = sheet.getDataRange().getValues();
    const config = Object.assign({}, CONFIG_PADRAO);

    for (let i = 1; i < data.length; i++) {
        const chave = String(valorPublico(data[i], mapa, ['Chave', 'Campo'])).trim();
        const valor = valorPublico(data[i], mapa, ['Valor']);
        const item = CONFIG_KEYS.find(([nome]) => normalizarTexto(nome) === normalizarTexto(chave));
        if (!item) continue;

        const campo = item[1];
        if (['valor_palpite', 'pontos_resultado', 'pontos_empate', 'pontos_exato'].includes(campo)) {
            config[campo] = numero(valor, CONFIG_PADRAO[campo]);
        } else {
            config[campo] = valor || '';
        }
    }

    return config;
}

function lerParticipantesPublico() {
    const sheet = obterAbaPublica(['Participantes']);
    if (!sheet || sheet.getLastRow() < 2) return [];

    const mapa = criarMapaPublico(sheet);
    const data = sheet.getDataRange().getValues();
    const lista = [];

    for (let i = 1; i < data.length; i++) {
        const nome = valorPublico(data[i], mapa, ['Nome', 'Participante']);
        const whatsapp = valorPublico(data[i], mapa, ['WhatsApp', 'Whatsapp', 'Telefone']);
        if (!valorPresente(nome) && !valorPresente(whatsapp)) continue;

        const pago = textoParaBool(valorPublico(data[i], mapa, ['Pago', 'Status']));
        lista.push({
            id: valorPublico(data[i], mapa, ['ID', 'Participante ID']) || normalizarContato(whatsapp) || String(i),
            nome: nome || 'Participante',
            whatsapp: whatsapp || '',
            pago,
            pendente_pagamento: !pago,
            data_inscricao: valorPublico(data[i], mapa, ['Data Inscricao', 'Data Inscrição']),
            data_pagamento: valorPublico(data[i], mapa, ['Data Pagamento']),
            pontos: numero(valorPublico(data[i], mapa, ['Pontos']), 0),
            acertos: numero(valorPublico(data[i], mapa, ['Acertos']), 0)
        });
    }

    return lista;
}

function lerJogosPublico() {
    const sheet = obterAbaPublica(['Jogos']);
    if (!sheet || sheet.getLastRow() < 2) return [];

    const mapa = criarMapaPublico(sheet);
    const data = sheet.getDataRange().getValues();
    const lista = [];

    for (let i = 1; i < data.length; i++) {
        const timeA = valorPublico(data[i], mapa, ['Time A', 'Equipe A']);
        const timeB = valorPublico(data[i], mapa, ['Time B', 'Equipe B']);
        if (!valorPresente(timeA) || !valorPresente(timeB)) continue;

        lista.push({
            id: valorPublico(data[i], mapa, ['ID', 'Jogo ID']) || i,
            fase: valorPublico(data[i], mapa, ['Fase']) || 'Fase de Grupos',
            grupo: valorPublico(data[i], mapa, ['Grupo']),
            time_a: timeA,
            time_b: timeB,
            data: formatarData(valorPublico(data[i], mapa, ['Data'])),
            hora: formatarHora(valorPublico(data[i], mapa, ['Hora', 'Horario', 'Horário'])),
            local: valorPublico(data[i], mapa, ['Local', 'Estadio', 'Estádio']),
            ativo: !String(valorPublico(data[i], mapa, ['Ativo'])).trim() || textoParaBool(valorPublico(data[i], mapa, ['Ativo'])),
            resultado: valorPublico(data[i], mapa, ['Resultado'])
        });
    }

    return lista;
}

function lerPalpitesPublico() {
    const sheet = obterAbaPublica(['Palpites']);
    if (!sheet || sheet.getLastRow() < 2) return [];

    const mapa = criarMapaPublico(sheet);
    const data = sheet.getDataRange().getValues();
    const lista = [];

    for (let i = 1; i < data.length; i++) {
        const nome = valorPublico(data[i], mapa, ['Nome', 'Participante']);
        const whatsapp = valorPublico(data[i], mapa, ['WhatsApp', 'Whatsapp', 'Telefone']);
        const jogoId = valorPublico(data[i], mapa, ['Jogo ID', 'Jogo']);
        const timeA = valorPublico(data[i], mapa, ['Time A', 'Equipe A']);
        const timeB = valorPublico(data[i], mapa, ['Time B', 'Equipe B']);
        if (!valorPresente(nome) && !valorPresente(whatsapp) && !valorPresente(jogoId)) continue;

        lista.push({
            id: valorPublico(data[i], mapa, ['ID']) || String(i),
            participante_id: valorPublico(data[i], mapa, ['Participante ID', 'Participante']),
            nome: nome || '',
            whatsapp: whatsapp || '',
            jogo_id: jogoId || '',
            time_a: timeA || '',
            time_b: timeB || '',
            placar_a: numero(valorPublico(data[i], mapa, ['Placar A']), 0),
            placar_b: numero(valorPublico(data[i], mapa, ['Placar B']), 0),
            resultado: valorPublico(data[i], mapa, ['Resultado']),
            pontos: numero(valorPublico(data[i], mapa, ['Pontos']), 0),
            data_palpite: valorPublico(data[i], mapa, ['Data Palpite', 'Data'])
        });
    }

    return lista;
}

function obterDadosPublicosSimples() {
    const cache = CacheService.getScriptCache();
    const cacheTexto = cache.get(PUBLIC_CACHE_KEY);
    if (cacheTexto) {
        return JSON.parse(cacheTexto);
    }

    const jogos = lerJogosPublico();
    const dados = {
        versao: APP_VERSION,
        modo: 'publico-simples',
        config: lerConfiguracaoPublica(),
        jogos,
        participantes: lerParticipantesPublico(),
        palpites: lerPalpitesPublico(),
        resultados: jogos
            .filter(jogo => valorPresente(jogo.resultado))
            .map(jogo => ({
                jogo_id: jogo.id,
                time_a: jogo.time_a,
                time_b: jogo.time_b,
                resultado: jogo.resultado,
                data: jogo.data,
                hora: jogo.hora,
                fase: jogo.fase
            }))
    };

    const texto = JSON.stringify(dados);
    if (texto.length < 90000) {
        cache.put(PUBLIC_CACHE_KEY, texto, PUBLIC_CACHE_SECONDS);
    }

    return dados;
}

// =====================================
// ENDPOINTS
// =====================================

function doGet(e) {
    const action = e && e.parameter ? e.parameter.action : '';
    let response;

    try {
        switch (action) {
            case 'versao':
                response = { versao: APP_VERSION };
                break;
            case 'publico':
                response = obterDadosPublicosSimples();
                break;
            case 'dados':
                response = obterDadosSite();
                break;
            case 'config':
                response = obterConfiguracaoBolao();
                break;
            case 'participantes':
                response = obterParticipantes();
                break;
            case 'jogos':
                response = obterJogos();
                break;
            case 'palpites':
                response = obterPalpites();
                break;
            case 'resultados':
                response = obterResultados();
                break;
            case 'ranking':
                response = obterRanking();
                break;
            default:
                response = { erro: 'Acao invalida' };
        }
    } catch (error) {
        response = { erro: error.toString() };
    }

    return criarResposta(e, response);
}

function doPost(e) {
    const action = e && e.parameter ? e.parameter.action : '';
    const dados = e && e.postData && e.postData.contents ? JSON.parse(e.postData.contents) : {};
    let response;

    try {
        switch (action) {
            case 'atualizar_config':
                atualizarConfiguracaoBolao(dados);
                response = { sucesso: true };
                break;
            case 'adicionar_participante':
                adicionarParticipante(dados);
                response = { sucesso: true };
                break;
            case 'atualizar_participante':
                atualizarParticipante(dados);
                response = { sucesso: true };
                break;
            case 'adicionar_palpite':
                adicionarPalpite(dados);
                response = { sucesso: true };
                break;
            case 'adicionar_jogo':
                adicionarJogo(dados);
                response = { sucesso: true };
                break;
            case 'atualizar_jogo':
                atualizarJogo(dados);
                response = { sucesso: true };
                break;
            case 'adicionar_jogos_lote':
            case 'restaurar_jogos_2026':
                response = { sucesso: true, total: adicionarJogosEmLote(dados) };
                break;
            case 'adicionar_resultado':
                adicionarResultado(dados);
                response = { sucesso: true };
                break;
            default:
                response = { sucesso: false, erro: 'Acao invalida' };
        }

        if (response && response.sucesso) {
            limparCachePublico();
        }
    } catch (error) {
        response = { sucesso: false, erro: error.toString() };
    }

    return criarResposta(e, response);
}

// =====================================
// MENU DA PLANILHA
// =====================================

function onOpen() {
    SpreadsheetApp.getUi()
        .createMenu('Bolao Online')
        .addItem('Criar planilha limpa', 'criarPlanilhas')
        .addItem('Corrigir pontuacao', 'corrigirPontuacaoManual')
        .addItem('Ver ranking', 'atualizarRanking')
        .addItem('Ver URL Web App', 'mostrarUrlWebApp')
        .addToUi();
}

function corrigirPontuacaoManual() {
    const total = atualizarPontuacaoPlanilha();
    SpreadsheetApp.getUi().alert(`Pontuacao corrigida e participantes duplicados unidos. ${total} palpites verificados.`);
}

function atualizarRanking() {
    const ranking = obterRanking();
    let msg = 'RANKING ATUAL\n\n';

    ranking.slice(0, 10).forEach((pessoa, index) => {
        msg += `${index + 1}. ${pessoa.nome} - ${pessoa.pontos} pts (${pessoa.palpites} palpites)\n`;
    });

    if (ranking.length === 0) {
        msg += 'Nenhum participante ainda.';
    }

    SpreadsheetApp.getUi().alert(msg);
}

function mostrarUrlWebApp() {
    SpreadsheetApp.getUi().alert(
        'Para publicar:\n\n' +
        '1. Clique em Implantar.\n' +
        '2. Gerenciar implantacoes.\n' +
        '3. Clique no lapis.\n' +
        '4. Escolha Nova versao.\n' +
        '5. Clique em Implantar.\n\n' +
        'Depois copie a URL /exec.'
    );
}
