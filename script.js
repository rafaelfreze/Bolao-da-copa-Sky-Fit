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

// =====================================
// LOCAL STORAGE
// =====================================

/**
 * Salvar dados no localStorage
 */
function salvarDados(chave, dados) {
    try {
        localStorage.setItem(chave, JSON.stringify(dados));
    } catch (error) {
        console.error('Erro ao salvar:', error);
    }
}

/**
 * Obter dados do localStorage
 */
function obterDados(chave) {
    try {
        const dados = localStorage.getItem(chave);
        return dados ? JSON.parse(dados) : null;
    } catch (error) {
        console.error('Erro ao obter:', error);
        return null;
    }
}

/**
 * Obter configuração do bolão
 */
function obterConfiguracao() {
    let config = obterDados('config');
    if (!config) {
        config = CONFIGURACAO_PADRAO;
        salvarDados('config', config);
    }
    return config;
}

/**
 * Obter jogo por ID
 */
function obterJogoPorId(id) {
    const jogos = obterDados('jogos') || [];
    return jogos.find(j => j.id === id);
}

// =====================================
// FORMATAÇÃO
// =====================================

/**
 * Formatar valor em moeda brasileira
 */
function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

/**
 * Formatar data
 */
function formatarData(dataString) {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

/**
 * Formatar data e hora
 */
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

/**
 * Calcular pontos de um palpite
 */
function calcularPontos(placarA, placarB, resultadoA, resultadoB) {
    const config = obterConfiguracao();

    // Placar exato
    if (placarA === resultadoA && placarB === resultadoB) {
        return config.pontos_exato;
    }

    // Vencedor
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

/**
 * Recalcular pontos de todos os palpites
 */
function recalcularPontos() {
    const palpites = obterDados('palpites') || [];
    const jogos = obterDados('jogos') || [];
    const participantes = obterDados('participantes') || [];

    // Atualizar pontos dos palpites
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

    // Atualizar pontos dos participantes
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

/**
 * Validar email
 */
function validarEmail(email) {
    if (!email) return true; // Email é opcional
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Validar WhatsApp
 */
function validarWhatsApp(whatsapp) {
    const cleaned = whatsapp.replace(/\D/g, '');
    return cleaned.length >= 10;
}

/**
 * Formatar WhatsApp
 */
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

/**
 * Converter array para CSV
 */
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

/**
 * Baixar arquivo
 */
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

document.addEventListener('DOMContentLoaded', function() {
    atualizarNavegacao();
    inicializarSistema();
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

// =====================================
// INICIALIZAÇÃO AUTOMÁTICA
// =====================================

/**
 * Inicialização automática dos jogos
 * Verifica se há jogos salvos, se não, carrega os oficiais
 */
function inicializarSistema() {
    const jogosExistentes = obterDados('jogos');
    
    if (!jogosExistentes || jogosExistentes.length === 0) {
        console.log('Nenhum jogo encontrado. Carregando jogos oficiais da Copa 2026...');
        seedJogosFaseDeGrupos2026();
    }
}
