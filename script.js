/*
 * =====================================
 * SCRIPT PRINCIPAL
 * =====================================
 * FunÃ§Ãµes compartilhadas entre todas as pÃ¡ginas
 */

// =====================================
// CONFIGURAÃ‡ÃƒO PADRÃƒO
// =====================================

const CONFIGURACAO_PADRAO = {
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

const PERCENTUAL_PREMIO = 0.7;
const WHATSAPP_COMPROVANTE = '5567992053023';
const TEMPO_LEITURA_ONLINE_MS = 25000;
const LIMITE_MINUTOS_PALPITE_APOS_INICIO = 60;
const STORAGE_SCHEMA_VERSION = 'bolao-online-leve-20260612-v11-whatsapp-unico';

const BANDEIRAS_TIMES = {
    'Ãfrica do Sul': 'ðŸ‡¿ðŸ‡¦',
    'AfeganistÃ£o': 'ðŸ‡¦ðŸ‡«',
    'Alemanha': 'ðŸ‡©ðŸ‡ª',
    'ArgÃ©lia': 'ðŸ‡©ðŸ‡¿',
    'Argentina': 'ðŸ‡¦ðŸ‡·',
    'ArÃ¡bia Saudita': 'ðŸ‡¸ðŸ‡¦',
    'AustrÃ¡lia': 'ðŸ‡¦ðŸ‡º',
    'Ãustria': 'ðŸ‡¦ðŸ‡¹',
    'BÃ©lgica': 'ðŸ‡§ðŸ‡ª',
    'Brasil': 'ðŸ‡§ðŸ‡·',
    'Cabo Verde': 'ðŸ‡¨ðŸ‡»',
    'CamarÃµes': 'ðŸ‡¨ðŸ‡²',
    'CanadÃ¡': 'ðŸ‡¨ðŸ‡¦',
    'Chipre': 'ðŸ‡¨ðŸ‡¾',
    'ColÃ´mbia': 'ðŸ‡¨ðŸ‡´',
    'Coreia do Sul': 'ðŸ‡°ðŸ‡·',
    'Costa Rica': 'ðŸ‡¨ðŸ‡·',
    'Costa do Marfim': 'ðŸ‡¨ðŸ‡®',
    'CroÃ¡cia': 'ðŸ‡­ðŸ‡·',
    'CuraÃ§ao': 'ðŸ‡¨ðŸ‡¼',
    'Dinamarca': 'ðŸ‡©ðŸ‡°',
    'Egito': 'ðŸ‡ªðŸ‡¬',
    'Equador': 'ðŸ‡ªðŸ‡¨',
    'EscÃ³cia': 'ðŸ´',
    'EslovÃ¡quia': 'ðŸ‡¸ðŸ‡°',
    'Espanha': 'ðŸ‡ªðŸ‡¸',
    'Estados Unidos': 'ðŸ‡ºðŸ‡¸',
    'FranÃ§a': 'ðŸ‡«ðŸ‡·',
    'Gana': 'ðŸ‡¬ðŸ‡­',
    'GrÃ©cia': 'ðŸ‡¬ðŸ‡·',
    'Haiti': 'ðŸ‡­ðŸ‡¹',
    'Holanda': 'ðŸ‡³ðŸ‡±',
    'Inglaterra': 'ðŸ´',
    'IndonÃ©sia': 'ðŸ‡®ðŸ‡©',
    'Ãndia': 'ðŸ‡®ðŸ‡³',
    'IrÃ£': 'ðŸ‡®ðŸ‡·',
    'Iraque': 'ðŸ‡®ðŸ‡¶',
    'IslÃ¢ndia': 'ðŸ‡®ðŸ‡¸',
    'ItÃ¡lia': 'ðŸ‡®ðŸ‡¹',
    'JapÃ£o': 'ðŸ‡¯ðŸ‡µ',
    'JordÃ¢nia': 'ðŸ‡¯ðŸ‡´',
    'Marrocos': 'ðŸ‡²ðŸ‡¦',
    'MÃ©xico': 'ðŸ‡²ðŸ‡½',
    'Noruega': 'ðŸ‡³ðŸ‡´',
    'Nova ZelÃ¢ndia': 'ðŸ‡³ðŸ‡¿',
    'PanamÃ¡': 'ðŸ‡µðŸ‡¦',
    'PaquistÃ£o': 'ðŸ‡µðŸ‡°',
    'Paraguai': 'ðŸ‡µðŸ‡¾',
    'PolÃ´nia': 'ðŸ‡µðŸ‡±',
    'Portugal': 'ðŸ‡µðŸ‡¹',
    'QuÃªnia': 'ðŸ‡°ðŸ‡ª',
    'Qatar': 'ðŸ‡¶ðŸ‡¦',
    'Rep. Tcheca': 'ðŸ‡¨ðŸ‡¿',
    'Senegal': 'ðŸ‡¸ðŸ‡³',
    'SÃ©rvia': 'ðŸ‡·ðŸ‡¸',
    'SuÃ©cia': 'ðŸ‡¸ðŸ‡ª',
    'SuÃ­Ã§a': 'ðŸ‡¨ðŸ‡­',
    'TailÃ¢ndia': 'ðŸ‡¹ðŸ‡­',
    'TunÃ­sia': 'ðŸ‡¹ðŸ‡³',
    'Turquia': 'ðŸ‡¹ðŸ‡·',
    'UcrÃ¢nia': 'ðŸ‡ºðŸ‡¦',
    'Uruguai': 'ðŸ‡ºðŸ‡¾',
    'UzbequistÃ£o': 'ðŸ‡ºðŸ‡¿',
    'VietnÃ£': 'ðŸ‡»ðŸ‡³',
    'BolÃ­via': 'ðŸ‡§ðŸ‡´',
    'Congo': 'ðŸ‡¨ðŸ‡©',
    'Jamaica': 'ðŸ‡¯ðŸ‡²',
    'PaÃ­s de Gales': 'ðŸ´',
    'RomÃªnia': 'ðŸ‡·ðŸ‡´'
};

// URL do Google Apps Script
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwME2l0eYH3Y0i6akgXvTZMQViLaGNo10fo8Jav9AKp1Fc_7GgFHNuigbMn31kp_QJb/exec';

// =====================================
// LOCAL STORAGE
// =====================================

function salvarDados(chave, dados) {
    try {
        localStorage.setItem(chave, JSON.stringify(dados));
    } catch (error) {
        console.error('Erro ao salvar:', error);
    }
}

function obterDados(chave) {
    try {
        const dados = localStorage.getItem(chave);
        return dados ? JSON.parse(dados) : null;
    } catch (error) {
        console.error('Erro ao obter:', error);
        return null;
    }
}

const CP1252_ENCODE_MAP = {
    0x20AC: 0x80, 0x201A: 0x82, 0x0192: 0x83, 0x201E: 0x84,
    0x2026: 0x85, 0x2020: 0x86, 0x2021: 0x87, 0x02C6: 0x88,
    0x2030: 0x89, 0x0160: 0x8A, 0x2039: 0x8B, 0x0152: 0x8C,
    0x017D: 0x8E, 0x2018: 0x91, 0x2019: 0x92, 0x201C: 0x93,
    0x201D: 0x94, 0x2022: 0x95, 0x2013: 0x96, 0x2014: 0x97,
    0x02DC: 0x98, 0x2122: 0x99, 0x0161: 0x9A, 0x203A: 0x9B,
    0x0153: 0x9C, 0x017E: 0x9E, 0x0178: 0x9F
};

const TEXTO_QUEBRADO_MAP = {
    'BolÃ£o': 'Bolão',
    'bolÃ£o': 'bolão',
    'InÃ­cio': 'Início',
    'inÃ­cio': 'início',
    'PrÃªmio': 'Prêmio',
    'prÃªmio': 'prêmio',
    'PRÃŠMIO': 'PRÊMIO',
    'PÃ¡gina': 'Página',
    'pÃ¡gina': 'página',
    'PrÃ³ximo': 'Próximo',
    'prÃ³ximo': 'próximo',
    'disponÃ­vel': 'disponível',
    'nÃ£o': 'não',
    'NÃ£o': 'Não',
    'cÃ³digo': 'código',
    'CÃ³digo': 'Código',
    'comeÃ§ar': 'começar',
    'FaÃ§a': 'Faça',
    'faÃ§a': 'faça',
    'CanadÃ¡': 'Canadá',
    'MÃ©xico': 'México',
    'Ã—': '×',
    'âš½': '⚽',
    'âœ…': '✅',
    'âŒ': '❌',
    'ðŸ‡ºðŸ‡¸': '🇺🇸',
    'ðŸ‡¨ðŸ‡¦': '🇨🇦',
    'ðŸ‡²ðŸ‡½': '🇲🇽',
    'ðŸ’°': '💰'
};

function corrigirTextoPorDicionario(texto) {
    let corrigido = String(texto);
    Object.entries(TEXTO_QUEBRADO_MAP).forEach(([quebrado, certo]) => {
        corrigido = corrigido.split(quebrado).join(certo);
    });
    return corrigido;
}

function textoPareceQuebrado(texto) {
    return /[ÃÂâð]|\uFFFD/.test(String(texto || ''));
}

function textoParaBytesWindows1252(texto) {
    const bytes = [];
    for (const caractere of String(texto)) {
        const codigo = caractere.codePointAt(0);
        if (CP1252_ENCODE_MAP[codigo] !== undefined) {
            bytes.push(CP1252_ENCODE_MAP[codigo]);
        } else if (codigo <= 255) {
            bytes.push(codigo);
        } else {
            return null;
        }
    }
    return new Uint8Array(bytes);
}

function corrigirTextoQuebrado(valor) {
    if (typeof valor !== 'string' || !textoPareceQuebrado(valor) || typeof TextDecoder === 'undefined') {
        return valor;
    }

    let texto = corrigirTextoPorDicionario(valor);
    if (!textoPareceQuebrado(texto)) return texto;

    const decoder = new TextDecoder('utf-8');

    for (let tentativa = 0; tentativa < 3; tentativa += 1) {
        const bytes = textoParaBytesWindows1252(texto);
        if (!bytes) break;

        const corrigido = decoder.decode(bytes);
        if (!corrigido || corrigido === texto || corrigido.includes('\uFFFD')) break;
        texto = corrigido;
    }

    return texto;
}

function corrigirDadosRecebidos(dados) {
    if (typeof dados === 'string') {
        return corrigirTextoQuebrado(dados);
    }

    if (Array.isArray(dados)) {
        return dados.map(item => corrigirDadosRecebidos(item));
    }

    if (dados && typeof dados === 'object') {
        const limpo = {};
        Object.entries(dados).forEach(([chave, valor]) => {
            limpo[chave] = corrigirDadosRecebidos(valor);
        });
        return limpo;
    }

    return dados;
}

function corrigirTextosVisiveisDaPagina() {
    if (!document || !document.body) return;

    document.title = corrigirTextoQuebrado(document.title);

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const textos = [];
    while (walker.nextNode()) {
        textos.push(walker.currentNode);
    }

    textos.forEach(node => {
        node.nodeValue = corrigirTextoQuebrado(node.nodeValue);
    });

    document.querySelectorAll('[placeholder], [title], [alt], [aria-label], input[value], button[value]').forEach(elemento => {
        ['placeholder', 'title', 'alt', 'aria-label', 'value'].forEach(atributo => {
            if (elemento.hasAttribute(atributo)) {
                elemento.setAttribute(atributo, corrigirTextoQuebrado(elemento.getAttribute(atributo)));
            }
        });
    });
}

function inicializarArmazenamentoLocal() {
    const versaoAtual = localStorage.getItem('bolao_schema_version');
    if (versaoAtual === STORAGE_SCHEMA_VERSION) return;

    ['config', 'participantes', 'palpites', 'jogos', 'resultados'].forEach(chave => {
        localStorage.removeItem(chave);
    });
    localStorage.removeItem('bolao_last_sync');
    localStorage.setItem('bolao_schema_version', STORAGE_SCHEMA_VERSION);
}

inicializarArmazenamentoLocal();

function inicializarDadosLocaisBasicos() {
    if (!obterDados('config')) {
        salvarDados('config', CONFIGURACAO_PADRAO);
    }

    ['participantes', 'palpites', 'resultados'].forEach(chave => {
        if (!Array.isArray(obterDados(chave))) {
            salvarDados(chave, []);
        }
    });

    const jogos = obterDados('jogos');
    if ((!Array.isArray(jogos) || jogos.length === 0) && typeof seedJogos2026Completo === 'function') {
        salvarDados('jogos', corrigirDadosRecebidos(seedJogos2026Completo()));
    }
}

inicializarDadosLocaisBasicos();

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', corrigirTextosVisiveisDaPagina);
}

// =====================================
// GOOGLE SHEETS
// =====================================

let sincronizacaoGoogleSheets = null;

function montarUrlGoogleSheets(action, params = {}) {
    const url = new URL(GOOGLE_SCRIPT_URL);
    url.searchParams.set('action', action);
    url.searchParams.set('_t', Date.now());

    Object.entries(params).forEach(([chave, valor]) => {
        if (valor !== undefined && valor !== null) {
            url.searchParams.set(chave, valor);
        }
    });

    return url.toString();
}

async function buscarDadosGoogleSheets(action, params = {}) {
    return buscarDadosGoogleSheetsJsonp(action, params);
}

function buscarDadosGoogleSheetsJsonp(action, params = {}) {
    return new Promise((resolve, reject) => {
        const callbackName = `bolaoJsonp_${Date.now()}_${Math.random().toString(36).slice(2)}`;
        const script = document.createElement('script');
        const timeoutMs = params.timeoutMs || TEMPO_LEITURA_ONLINE_MS;
        const parametrosUrl = { ...params };
        delete parametrosUrl.timeoutMs;

        const timeout = setTimeout(() => {
            limpar();
            reject(new Error(`Tempo esgotado ao buscar ${action}`));
        }, timeoutMs);

        function limpar() {
            clearTimeout(timeout);
            delete window[callbackName];
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        }

        window[callbackName] = function(dados) {
            limpar();
            resolve(dados);
        };

        script.onerror = function() {
            limpar();
            reject(new Error(`Erro JSONP ao buscar ${action}`));
        };

        script.src = montarUrlGoogleSheets(action, { ...parametrosUrl, callback: callbackName });
        document.head.appendChild(script);
    });
}

async function apiGet(action, params = {}) {
    return buscarDadosGoogleSheets(action, params);
}

async function apiPost(action, dados) {
    return enviarDadosGoogleSheets(action, dados);
}

async function enviarDadosGoogleSheets(action, dados) {
    if (!GOOGLE_SCRIPT_URL) return false;

    try {
        await fetch(montarUrlGoogleSheets(action), {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify(dados)
        });

        localStorage.removeItem('bolao_last_sync');
        localStorage.removeItem('bolao_sync_error');
        return true;
    } catch (erro) {
        console.error(`Erro ao enviar ${action} para Google Sheets:`, erro);
        return false;
    }
}

function salvarListaSeValida(chave, dados) {
    if (Array.isArray(dados)) {
        const limpos = corrigirDadosRecebidos(dados);
        salvarDados(chave, limpos);
        return limpos.length;
    }

    if (dados && dados.erro) {
        console.warn(`Google Sheets retornou erro para ${chave}:`, dados.erro);
    }

    return null;
}

function salvarConfiguracaoSeValida(dados) {
    if (!dados || dados.erro || Array.isArray(dados)) {
        return false;
    }

    salvarDados('config', corrigirDadosRecebidos({
        ...CONFIGURACAO_PADRAO,
        ...obterConfiguracao(),
        ...dados
    }));

    return true;
}

function aplicarDadosSincronizados(dadosGerais) {
    if (!dadosGerais || dadosGerais.erro) return false;

    let mudou = false;
    let jogosDados = Array.isArray(dadosGerais.jogos) ? dadosGerais.jogos : null;
    const resultadosDados = Array.isArray(dadosGerais.resultados) ? dadosGerais.resultados : [];

    if (Array.isArray(resultadosDados)) {
        salvarDados('resultados', corrigirDadosRecebidos(resultadosDados));
        mudou = true;
    }

    if (jogosDados) {
        jogosDados = aplicarResultadosAosJogos(corrigirDadosRecebidos(jogosDados), corrigirDadosRecebidos(resultadosDados));
        salvarListaSeValida('jogos', jogosDados);
        mudou = true;
    }

    if (Array.isArray(dadosGerais.participantes)) {
        salvarListaSeValida('participantes', dadosGerais.participantes);
        mudou = true;
    }

    if (Array.isArray(dadosGerais.palpites)) {
        salvarListaSeValida('palpites', dadosGerais.palpites);
        mudou = true;
    }

    if (dadosGerais.config && !dadosGerais.config.erro) {
        salvarConfiguracaoSeValida(dadosGerais.config);
        mudou = true;
    }

    if (mudou) {
        recalcularPontos();
        localStorage.setItem('bolao_last_sync', String(Date.now()));
    }

    return mudou;
}

async function sincronizarDadosGoogleSheets(opcoes = {}) {
    const force = opcoes.force === true;
    const somentePublico = opcoes.somentePublico === true;
    const timeoutMs = opcoes.timeoutMs || TEMPO_LEITURA_ONLINE_MS;

    if (sincronizacaoGoogleSheets && !force) {
        return sincronizacaoGoogleSheets;
    }

    sincronizacaoGoogleSheets = (async function() {
        try {
            const dadosPublicos = await buscarDadosGoogleSheets('publico', { timeoutMs }).catch(() => null);
            if (aplicarDadosSincronizados(dadosPublicos)) {
                console.log('Dados publicos sincronizados com Google Sheets');
                localStorage.removeItem('bolao_sync_error');
                return true;
            }

            if (somentePublico) {
                localStorage.setItem('bolao_sync_error', `Nao foi possivel ler a planilha online em ${Math.round(timeoutMs / 1000)}s.`);
                return false;
            }

            const dadosGerais = await buscarDadosGoogleSheets('dados').catch(() => null);
            if (aplicarDadosSincronizados(dadosGerais)) {
                console.log('Dados sincronizados com Google Sheets');
                localStorage.removeItem('bolao_sync_error');
                return true;
            }

            const [jogosRes, participantesRes, palpitesRes, configRes, resultadosRes] = await Promise.allSettled([
                buscarDadosGoogleSheets('jogos'),
                buscarDadosGoogleSheets('participantes'),
                buscarDadosGoogleSheets('palpites'),
                buscarDadosGoogleSheets('config'),
                buscarDadosGoogleSheets('resultados')
            ]);

            let jogosDados = jogosRes.status === 'fulfilled' && Array.isArray(jogosRes.value) ? jogosRes.value : null;
            const resultadosDados = resultadosRes.status === 'fulfilled' && Array.isArray(resultadosRes.value) ? resultadosRes.value : null;

            if (resultadosDados) {
                salvarDados('resultados', corrigirDadosRecebidos(resultadosDados));
            }
            const resultados = resultadosDados ? resultadosDados.length : null;

            if (jogosDados) {
                jogosDados = aplicarResultadosAosJogos(jogosDados, resultadosDados || obterDados('resultados') || []);
            }

            const jogos = jogosDados ? salvarListaSeValida('jogos', jogosDados) : null;
            const participantes = participantesRes.status === 'fulfilled' ? salvarListaSeValida('participantes', participantesRes.value) : null;
            const palpites = palpitesRes.status === 'fulfilled' ? salvarListaSeValida('palpites', palpitesRes.value) : null;
            const config = configRes.status === 'fulfilled' ? salvarConfiguracaoSeValida(configRes.value) : false;

            if (jogos !== null || participantes !== null || palpites !== null || resultados !== null || config) {
                recalcularPontos();
                localStorage.setItem('bolao_last_sync', String(Date.now()));
                localStorage.removeItem('bolao_sync_error');
                console.log('Dados sincronizados com Google Sheets', { jogos, participantes, palpites, resultados, config });
                return true;
            }

            localStorage.setItem('bolao_sync_error', 'A planilha online nao retornou dados validos.');
            return false;
        } catch (erro) {
            console.error('Erro ao sincronizar dados:', erro);
            localStorage.setItem('bolao_sync_error', erro.message || String(erro));
            return false;
        } finally {
            sincronizacaoGoogleSheets = null;
        }
    })();

    return sincronizacaoGoogleSheets;
}

async function sincronizarJogosGoogleSheets() {
    return sincronizarDadosGoogleSheets();
}

async function carregarDadosOnlineObrigatorios(opcoes = {}) {
    const ok = await sincronizarDadosGoogleSheets({
        force: true,
        somentePublico: true,
        timeoutMs: opcoes.timeoutMs || TEMPO_LEITURA_ONLINE_MS
    });

    return ok;
}

function obterErroSincronizacaoOnline() {
    return localStorage.getItem('bolao_sync_error') || '';
}

function obterConfiguracao() {
    let config = obterDados('config');
    if (!config) {
        config = CONFIGURACAO_PADRAO;
        salvarDados('config', config);
    }
    const configFinal = {
        ...CONFIGURACAO_PADRAO,
        ...corrigirDadosRecebidos(config)
    };

    if (normalizarTextoComparacao(configFinal.nome_bolao) === 'bolao online') {
        configFinal.nome_bolao = 'Bolão Online';
    }

    return configFinal;
}

function obterJogoPorId(id) {
    const jogos = obterDados('jogos') || [];
    return jogos.find(j => String(j.id) === String(id));
}

function timesIguais(timeA, timeB) {
    return normalizarNomeTime(timeA) === normalizarNomeTime(timeB);
}

function resultadoCorrespondeAoPalpite(resultado, palpite) {
    if (!resultado || !palpite) return false;
    if (resultado.jogo_id && palpite.jogo_id && String(resultado.jogo_id) === String(palpite.jogo_id)) return true;
    if (resultado.id && palpite.jogo_id && String(resultado.id) === String(palpite.jogo_id)) return true;

    return timesIguais(resultado.time_a, palpite.time_a) && timesIguais(resultado.time_b, palpite.time_b);
}

function jogoCorrespondeAoPalpite(jogo, palpite) {
    if (!jogo || !palpite) return false;
    if (jogo.id && palpite.jogo_id && String(jogo.id) === String(palpite.jogo_id)) return true;
    return timesIguais(jogo.time_a, palpite.time_a) && timesIguais(jogo.time_b, palpite.time_b);
}

function resultadoCorrespondeAoJogo(resultado, jogo) {
    if (!resultado || !jogo) return false;
    if (resultado.jogo_id && jogo.id && String(resultado.jogo_id) === String(jogo.id)) return true;
    if (resultado.id && jogo.id && String(resultado.id) === String(jogo.id)) return true;
    return timesIguais(resultado.time_a, jogo.time_a) && timesIguais(resultado.time_b, jogo.time_b);
}

function aplicarResultadosAosJogos(jogos, resultados) {
    if (!Array.isArray(jogos) || !Array.isArray(resultados) || resultados.length === 0) {
        return jogos;
    }

    return jogos.map(jogo => {
        const resultado = resultados.find(item => resultadoCorrespondeAoJogo(item, jogo));
        if (!resultado || !resultado.resultado) return jogo;
        return {
            ...jogo,
            resultado: resultado.resultado,
            ativo: false
        };
    });
}

function obterBandeiraTime(nome) {
    return '';
}

function normalizarNomeTime(nome) {
    return String(nome || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
}

function normalizarTextoComparacao(valor) {
    return String(valor || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .trim();
}

function normalizarNomePessoa(valor) {
    return normalizarTextoComparacao(valor)
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\bj\s*r\b/g, 'junior')
        .replace(/\bjr\b/g, 'junior')
        .replace(/\s+/g, ' ')
        .trim();
}

function normalizarContato(valor) {
    return String(valor || '').replace(/\D/g, '');
}

function jogoEnvolveTime(jogo, nomeTime) {
    const alvo = normalizarNomeTime(nomeTime);
    return normalizarNomeTime(jogo && jogo.time_a) === alvo
        || normalizarNomeTime(jogo && jogo.time_b) === alvo;
}

function palpitePertenceAoParticipante(palpite, participante) {
    if (palpite.participante_id && participante.id && String(palpite.participante_id) === String(participante.id)) {
        return true;
    }

    const mesmoNome = normalizarNomePessoa(palpite.nome) === normalizarNomePessoa(participante.nome);
    const participanteIdTexto = normalizarNomePessoa(palpite.participante_id);
    const participanteNomeTexto = normalizarNomePessoa(participante.nome);
    const contatoPalpite = normalizarContato(palpite.whatsapp);
    const contatoParticipante = normalizarContato(participante.whatsapp);
    const mesmoContato = contatoPalpite && contatoParticipante && contatoPalpite === contatoParticipante;

    if (mesmoContato) return true;
    if (mesmoNome) return true;
    if (participanteIdTexto && participanteIdTexto === participanteNomeTexto) return true;

    return false;
}

function obterChavePessoa(pessoa) {
    return normalizarNomePessoa(pessoa && pessoa.nome) || normalizarContato(pessoa && pessoa.whatsapp) || String((pessoa && pessoa.id) || '');
}

function obterResumoFinanceiro() {
    const participantes = obterDados('participantes') || [];
    const config = obterConfiguracao();
    const pagos = participantes.filter(p => p.pago).length;
    const pendentes = participantes.filter(p => !p.pago || p.pendente_pagamento).length;
    const valorPalpite = Number(config.valor_palpite) || 0;
    const arrecadado = pagos * valorPalpite;
    const premio = arrecadado * PERCENTUAL_PREMIO;
    const custos = arrecadado - premio;

    return {
        participantes: participantes.length,
        pagos,
        pendentes,
        arrecadado,
        premio,
        custos,
        valorPalpite
    };
}

function obterCodigoPix() {
    const config = obterConfiguracao();
    return config.codigo_pix || config.chave_pix || '';
}

function montarLinkComprovanteWhatsapp(dados = {}) {
    const config = obterConfiguracao();
    const resumo = obterResumoFinanceiro();
    const jogo = dados.jogo || {};
    const linhas = [
        'Olá! Quero enviar o comprovante PIX do Bolão.',
        dados.nome ? `Nome: ${dados.nome}` : '',
        dados.whatsapp ? `WhatsApp: ${dados.whatsapp}` : '',
        jogo.time_a && jogo.time_b ? `Jogo: ${jogo.time_a} x ${jogo.time_b}` : '',
        `Valor: ${formatarMoeda(resumo.valorPalpite || config.valor_palpite || 10)}`,
        '',
        'Segue o comprovante em anexo.'
    ].filter(Boolean);

    return `https://wa.me/${WHATSAPP_COMPROVANTE}?text=${encodeURIComponent(linhas.join('\n'))}`;
}

function copiarTexto(texto, botao) {
    if (!texto) {
        alert('Nenhum código PIX configurado ainda.');
        return;
    }

    const concluir = () => {
        if (!botao) return;
        const textoOriginal = botao.textContent;
        botao.textContent = 'Copiado!';
        setTimeout(() => {
            botao.textContent = textoOriginal;
        }, 2000);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texto).then(concluir).catch(() => {
            fallbackCopiarTexto(texto);
            concluir();
        });
        return;
    }

    fallbackCopiarTexto(texto);
    concluir();
}

function fallbackCopiarTexto(texto) {
    const input = document.createElement('textarea');
    input.value = texto;
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
}

function normalizarDataJogo(valorData) {
    if (!valorData) return '';
    const texto = String(valorData).trim();
    if (/^\d{4}-\d{2}-\d{2}/.test(texto)) return texto.substring(0, 10);

    const numeroSerial = Number(texto.replace(',', '.'));
    if (Number.isFinite(numeroSerial) && numeroSerial > 20000) {
        const dataSerial = new Date(Math.round((numeroSerial - 25569) * 86400 * 1000));
        const ano = dataSerial.getUTCFullYear();
        const mes = String(dataSerial.getUTCMonth() + 1).padStart(2, '0');
        const dia = String(dataSerial.getUTCDate()).padStart(2, '0');
        return `${ano}-${mes}-${dia}`;
    }

    const dataBrasil = texto.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (dataBrasil) {
        const dia = dataBrasil[1].padStart(2, '0');
        const mes = dataBrasil[2].padStart(2, '0');
        return `${dataBrasil[3]}-${mes}-${dia}`;
    }

    const data = new Date(texto);
    if (!Number.isNaN(data.getTime())) {
        const ano = data.getFullYear();
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const dia = String(data.getDate()).padStart(2, '0');
        return `${ano}-${mes}-${dia}`;
    }
    return texto;
}

function normalizarHoraJogo(valorHora) {
    if (!valorHora) return '00:00';
    const texto = String(valorHora).trim();

    const numeroSerial = Number(texto.replace(',', '.'));
    if (Number.isFinite(numeroSerial) && numeroSerial > 0 && numeroSerial < 1) {
        const minutosTotais = Math.round(numeroSerial * 24 * 60);
        const horas = String(Math.floor(minutosTotais / 60) % 24).padStart(2, '0');
        const minutos = String(minutosTotais % 60).padStart(2, '0');
        return `${horas}:${minutos}`;
    }

    const horaDireta = texto.match(/^(\d{1,2}):(\d{2})/);
    if (horaDireta) return `${horaDireta[1].padStart(2, '0')}:${horaDireta[2]}`;
    const horaIso = texto.match(/T(\d{2}):(\d{2})/);
    if (horaIso) return `${horaIso[1]}:${horaIso[2]}`;
    return '00:00';
}

function obterDataHoraJogo(jogo) {
    const data = normalizarDataJogo(jogo && jogo.data);
    const hora = normalizarHoraJogo(jogo && jogo.hora);
    if (!data) return null;
    const dataJogo = new Date(`${data}T${hora}`);
    return Number.isNaN(dataJogo.getTime()) ? null : dataJogo;
}

function obterLimitePalpiteJogo(jogo) {
    const dataJogo = obterDataHoraJogo(jogo);
    if (!dataJogo) return null;

    return new Date(dataJogo.getTime() + LIMITE_MINUTOS_PALPITE_APOS_INICIO * 60 * 1000);
}

function palpiteAindaPermitido(jogo, agora = new Date()) {
    const limite = obterLimitePalpiteJogo(jogo);
    if (!limite) return true;
    return agora <= limite;
}

function obterMensagemBloqueioPalpite(jogo) {
    const limite = obterLimitePalpiteJogo(jogo);
    if (!limite) {
        return 'As apostas para este jogo estao encerradas.';
    }

    return `As apostas deste jogo encerraram as ${limite.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    })} de ${limite.toLocaleDateString('pt-BR')}.`;
}

function formatarDataCurtaJogo(jogo) {
    if (!jogo || !jogo.data) return '-';
    const dataJogo = obterDataHoraJogo(jogo);
    if (!dataJogo || Number.isNaN(dataJogo.getTime())) return jogo.data;

    return dataJogo.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short'
    }).replace('.', '');
}

function formatarDataHoraJogo(jogo) {
    if (!jogo || !jogo.data) return '-';
    const dataJogo = obterDataHoraJogo(jogo);
    if (!dataJogo || Number.isNaN(dataJogo.getTime())) return `${jogo.data} ${jogo.hora || ''}`.trim();

    return dataJogo.toLocaleDateString('pt-BR', {
        weekday: 'short',
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function renderizarCardPremio() {
    const config = obterConfiguracao();
    const resumo = obterResumoFinanceiro();
    const textoPremio = config.texto_premio || 'Vai para quem vencer o bolão no final';

    return `
        <div class="premium-prize-card">
            <div>
                <span class="eyebrow">Prêmio acumulado total</span>
                <strong>${formatarMoeda(resumo.premio)}</strong>
                <small>${textoPremio}</small>
            </div>
            <span class="premium-prize-icon">$</span>
        </div>
    `;
}

function renderizarCardPix(opcoes = {}) {
    const config = obterConfiguracao();
    const resumo = obterResumoFinanceiro();
    const codigoPix = obterCodigoPix();
    const qrUrl = config.pix_qr_url || '';
    const titulo = opcoes.titulo || 'Pagamento via PIX';

    return `
        <section class="home-pix-card">
            <div class="section-kicker">${titulo}</div>
            <div class="home-pix-content">
                <div class="pix-qr-box ${qrUrl ? '' : 'pix-qr-placeholder'}">
                    ${qrUrl ? `<img src="${qrUrl}" alt="QR Code PIX">` : '<span>PIX</span>'}
                </div>
                <div class="pix-summary">
                    <strong>${config.recebedor_pix || 'Recebedor não configurado'}</strong>
                    <span>Entrada: ${formatarMoeda(resumo.valorPalpite)} por palpite</span>
                    ${config.cidade_pix ? `<span>${config.cidade_pix}</span>` : ''}
                    <button type="button" class="btn btn-secondary btn-small" onclick="copiarTexto(obterCodigoPix(), this)">Copiar código PIX</button>
                </div>
            </div>
        </section>
    `;
}

// =====================================
// FORMATAÃ‡ÃƒO
// =====================================

function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

function formatarData(dataString) {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function formatarDataHora(dataString) {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// =====================================
// PONTUAÃ‡ÃƒO
// =====================================

function calcularPontos(placarA, placarB, resultadoA, resultadoB) {
    const config = obterConfiguracao();

    if (placarA === resultadoA && placarB === resultadoB) {
        return config.pontos_exato;
    }

    const palpiteVencedor = placarA > placarB ? 'A' : placarA < placarB ? 'B' : 'EMPATE';
    const resultadoVencedor = resultadoA > resultadoB ? 'A' : resultadoA < resultadoB ? 'B' : 'EMPATE';

    if (palpiteVencedor === resultadoVencedor) {
        if (palpiteVencedor === 'EMPATE') {
            return config.pontos_empate;
        }
        return config.pontos_resultado;
    }

    return 0;
}

function extrairPlacarResultado(resultado) {
    const texto = String(resultado || '').trim();
    const match = texto.match(/(\d+)\s*[xX\-:]\s*(\d+)/);
    if (!match) return null;

    return {
        a: Number(match[1]),
        b: Number(match[2])
    };
}

function obterResultadoDoPalpite(palpite, jogos, resultados) {
    const jogo = jogos.find(j => jogoCorrespondeAoPalpite(j, palpite));
    const resultadoDoJogo = jogo && jogo.resultado ? jogo.resultado : '';
    if (resultadoDoJogo) return extrairPlacarResultado(resultadoDoJogo);

    const resultado = resultados.find(item => resultadoCorrespondeAoPalpite(item, palpite));
    if (resultado && resultado.resultado) return extrairPlacarResultado(resultado.resultado);

    if (palpite.resultado) return extrairPlacarResultado(palpite.resultado);
    return null;
}

function recalcularPontos() {
    const palpites = obterDados('palpites') || [];
    const jogos = obterDados('jogos') || [];
    const resultados = obterDados('resultados') || [];
    const participantes = obterDados('participantes') || [];

    palpites.forEach(palpite => {
        const placarResultado = obterResultadoDoPalpite(palpite, jogos, resultados);

        if (placarResultado) {
            palpite.resultado = `${placarResultado.a}x${placarResultado.b}`;
            palpite.pontos = calcularPontos(
                Number(palpite.placar_a),
                Number(palpite.placar_b),
                placarResultado.a,
                placarResultado.b
            );
        } else {
            palpite.pontos = 0;
        }
    });

    salvarDados('palpites', palpites);

    participantes.forEach(participante => {
        const palpitesParticipante = palpites.filter(p => palpitePertenceAoParticipante(p, participante));

        participante.pontos = palpitesParticipante.reduce((total, p) => total + (p.pontos || 0), 0);
        participante.acertos = palpitesParticipante.filter(p => p.pontos > 0).length;
    });

    salvarDados('participantes', participantes);
}

// =====================================
// VALIDAÃ‡ÃƒO
// =====================================

function validarEmail(email) {
    if (!email) return true;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarWhatsApp(whatsapp) {
    const cleaned = whatsapp.replace(/\D/g, '');
    return cleaned.length === 11;
}

function formatarWhatsApp(whatsapp) {
    const cleaned = whatsapp.replace(/\D/g, '');
    if (cleaned.length === 11) {
        return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }
    return whatsapp;
}

// =====================================
// EXPORTAÃ‡ÃƒO
// =====================================

function converterParaCSV(dados) {
    if (!dados || dados.length === 0) return '';

    const headers = Object.keys(dados[0]);
    const csv = [headers.join(',')];

    dados.forEach(linha => {
        const valores = headers.map(header => {
            const valor = linha[header];
            if (typeof valor === 'string' && valor.includes(',')) {
                return `"${valor}"`;
            }
            return valor;
        });
        csv.push(valores.join(','));
    });

    return csv.join('\n');
}

function baixarArquivo(nome, conteudo, tipo = 'text/plain') {
    const blob = new Blob([conteudo], { type: tipo });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = nome;
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}

// =====================================
// SINCRONIZAÃ‡ÃƒO DE NAVEGAÃ‡ÃƒO
// =====================================

document.addEventListener('DOMContentLoaded', function() {
    atualizarNavegacao();

    if (typeof inicializarSistema === 'function') {
        inicializarSistema();
    }
});

function atualizarNavegacao() {
    const paginaAtual = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');

        if (href === paginaAtual || (paginaAtual === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
