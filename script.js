/*
 * =====================================
 * SCRIPT PRINCIPAL
 * =====================================
 * Funções compartilhadas entre todas as páginas
 */

// =====================================
// CONFIGURAÇÃO PADRÃO
// =====================================

const CONFIGURACAO_PADRAO = {
    nome_bolao: 'Bolão Online',
    valor_palpite: 10,
    chave_pix: 'chave@pix',
    recebedor_pix: 'Recebedor',
    pontos_resultado: 1,
    pontos_empate: 1,
    pontos_exato: 5
};

// URL do Google Apps Script
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbweCVHO8jem_r17GHTspve61KP7smdlzqs-fimSlYvUTUtbQ2-9-95Vco9CX7mfb1X7IQ/exec';

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

// =====================================
// GOOGLE SHEETS
// =====================================

async function sincronizarJogosGoogleSheets() {
    try {
        const resposta = await fetch(`${GOOGLE_SCRIPT_URL}?action=jogos`);
        const jogos = await resposta.json();

        if (Array.isArray(jogos) && jogos.length > 0) {
            salvarDados('jogos', jogos);
            console.log('✅ Jogos sincronizados com Google Sheets:', jogos.length);
        } else {
            console.warn('⚠️ Nenhum jogo encontrado na planilha.');
        }
    } catch (erro) {
        console.error('❌ Erro ao sincronizar jogos:', erro);
    }
}

function obterConfiguracao() {
    let config = obterDados('config');
    if (!config) {
        config = CONFIGURACAO_PADRAO;
        salvarDados('config', config);
    }
    return config;
}

function obterJogoPorId(id) {
    const jogos = obterDados('jogos') || [];
    return jogos.find(j => String(j.id) === String(id));
}

// =====================================
// FORMATAÇÃO
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
// PONTUAÇÃO
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

function recalcularPontos() {
    const palpites = obterDados('palpites') || [];
    const jogos = obterDados('jogos') || [];
    const participantes = obterDados('participantes') || [];

    palpites.forEach(palpite => {
        const jogo = obterJogoPorId(palpite.jogo_id);

        if (jogo && jogo.resultado) {
            const [resultadoA, resultadoB] = jogo.resultado.split('x').map(v => parseInt(v.trim()));
            palpite.pontos = calcularPontos(palpite.placar_a, palpite.placar_b, resultadoA, resultadoB);
        } else {
            palpite.pontos = 0;
        }
    });

    salvarDados('palpites', palpites);

    participantes.forEach(participante => {
        const palpitesParticipante = palpites.filter(
            p => p.nome === participante.nome && p.whatsapp === participante.whatsapp
        );

        participante.pontos = palpitesParticipante.reduce((total, p) => total + (p.pontos || 0), 0);
        participante.acertos = palpitesParticipante.filter(p => p.pontos > 0).length;
    });

    salvarDados('participantes', participantes);
}

// =====================================
// VALIDAÇÃO
// =====================================

function validarEmail(email) {
    if (!email) return true;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarWhatsApp(whatsapp) {
    const cleaned = whatsapp.replace(/\D/g, '');
    return cleaned.length >= 10;
}

function formatarWhatsApp(whatsapp) {
    const cleaned = whatsapp.replace(/\D/g, '');
    if (cleaned.length === 11) {
        return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }
    return whatsapp;
}

// =====================================
// EXPORTAÇÃO
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
// SINCRONIZAÇÃO DE NAVEGAÇÃO
// =====================================

document.addEventListener('DOMContentLoaded', async function() {
    atualizarNavegacao();
    await sincronizarJogosGoogleSheets();

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
