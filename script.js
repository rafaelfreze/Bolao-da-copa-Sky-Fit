/*
 * =====================================
 * SCRIPT PRINCIPAL - BOLÃO DA COPA 2026
 * =====================================
 * Gerencia armazenamento local, utilidades gerais
 * e funções compartilhadas entre páginas
 */

// =====================================
// LOCAL STORAGE
// =====================================

/**
 * Salva dados no localStorage
 */
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Erro ao salvar no localStorage:', error);
    }
}

/**
 * Carrega dados do localStorage
 */
function loadFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Erro ao carregar do localStorage:', error);
        return null;
    }
}

/**
 * Remove dados do localStorage
 */
function removeFromLocalStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Erro ao remover do localStorage:', error);
    }
}

// =====================================
// INICIALIZAÇÃO DOS DADOS
// =====================================

/**
 * Inicializa os dados da Copa 2026 no localStorage
 */
function initializeCopa2026Data() {
    const existingGames = loadFromLocalStorage('jogos');
    
    if (existingGames && existingGames.length > 0) {
        console.log('Dados da Copa 2026 já existem.');
        return;
    }

    const jogos = generateCopa2026Games();
    saveToLocalStorage('jogos', jogos);
    console.log('Dados da Copa 2026 inicializados com sucesso!');
}

/**
 * Gera todos os jogos da Copa 2026
 */
function generateCopa2026Games() {
    const games = [
        // GRUPO A
        { id: 1, grupo: 'A', time_a: 'Argentina', time_b: 'Canadá', data: '2026-06-12T14:00:00', local: 'México City, México', resultado: null },
        { id: 2, grupo: 'A', time_a: 'Marrocos', time_b: 'Peru', data: '2026-06-12T20:00:00', local: 'Toronto, Canadá', resultado: null },
        { id: 3, grupo: 'A', time_a: 'Argentina', time_b: 'Marrocos', data: '2026-06-16T18:00:00', local: 'Houston, Estados Unidos', resultado: null },
        { id: 4, grupo: 'A', time_a: 'Canadá', time_b: 'Peru', data: '2026-06-16T20:00:00', local: 'Vancouver, Canadá', resultado: null },
        { id: 5, grupo: 'A', time_a: 'Peru', time_b: 'Argentina', data: '2026-06-21T20:00:00', local: 'Los Angeles, Estados Unidos', resultado: null },
        { id: 6, grupo: 'A', time_a: 'Canadá', time_b: 'Marrocos', data: '2026-06-21T20:00:00', local: 'Phoenix, Estados Unidos', resultado: null },

        // GRUPO B
        { id: 7, grupo: 'B', time_a: 'Dinamarca', time_b: 'Tunísia', data: '2026-06-13T14:00:00', local: 'Chicago, Estados Unidos', resultado: null },
        { id: 8, grupo: 'B', time_a: 'França', time_b: 'Holanda', data: '2026-06-13T20:00:00', local: 'São Paulo, Brasil', resultado: null },
        { id: 9, grupo: 'B', time_a: 'França', time_b: 'Dinamarca', data: '2026-06-17T16:00:00', local: 'Miami, Estados Unidos', resultado: null },
        { id: 10, grupo: 'B', time_a: 'Tunísia', time_b: 'Holanda', data: '2026-06-17T20:00:00', local: 'Toronto, Canadá', resultado: null },
        { id: 11, grupo: 'B', time_a: 'Holanda', time_b: 'Dinamarca', data: '2026-06-22T20:00:00', local: 'Orlando, Estados Unidos', resultado: null },
        { id: 12, grupo: 'B', time_a: 'Tunísia', time_b: 'França', data: '2026-06-22T20:00:00', local: 'Rio de Janeiro, Brasil', resultado: null },

        // GRUPO C
        { id: 13, grupo: 'C', time_a: 'Brasil', time_b: 'Sérvia', data: '2026-06-13T14:00:00', local: 'São Paulo, Brasil', resultado: null },
        { id: 14, grupo: 'C', time_a: 'Suíça', time_b: 'Camarões', data: '2026-06-14T14:00:00', local: 'Guadalajara, México', resultado: null },
        { id: 15, grupo: 'C', time_a: 'Brasil', time_b: 'Suíça', data: '2026-06-17T18:00:00', local: 'Brasília, Brasil', resultado: null },
        { id: 16, grupo: 'C', time_a: 'Camarões', time_b: 'Sérvia', data: '2026-06-18T18:00:00', local: 'Monterrey, México', resultado: null },
        { id: 17, grupo: 'C', time_a: 'Sérvia', time_b: 'Suíça', data: '2026-06-22T20:00:00', local: 'Curitiba, Brasil', resultado: null },
        { id: 18, grupo: 'C', time_a: 'Camarões', time_b: 'Brasil', data: '2026-06-23T20:00:00', local: 'Monterrey, México', resultado: null },

        // GRUPO D
        { id: 19, grupo: 'D', time_a: 'Espanha', time_b: 'Costa Rica', data: '2026-06-14T16:00:00', local: 'Los Angeles, Estados Unidos', resultado: null },
        { id: 20, grupo: 'D', time_a: 'Itália', time_b: 'Japão', data: '2026-06-14T20:00:00', local: 'Salvador, Brasil', resultado: null },
        { id: 21, grupo: 'D', time_a: 'Espanha', time_b: 'Itália', data: '2026-06-18T20:00:00', local: 'Mexico City, México', resultado: null },
        { id: 22, grupo: 'D', time_a: 'Costa Rica', time_b: 'Japão', data: '2026-06-19T18:00:00', local: 'Recife, Brasil', resultado: null },
        { id: 23, grupo: 'D', time_a: 'Japão', time_b: 'Espanha', data: '2026-06-23T20:00:00', local: 'Fortaleza, Brasil', resultado: null },
        { id: 24, grupo: 'D', time_a: 'Costa Rica', time_b: 'Itália', data: '2026-06-23T20:00:00', local: 'Monterrey, México', resultado: null },

        // GRUPO E
        { id: 25, grupo: 'E', time_a: 'Alemanha', time_b: 'México', data: '2026-06-15T14:00:00', local: 'Dallas, Estados Unidos', resultado: null },
        { id: 26, grupo: 'E', time_a: 'Polônia', time_b: 'Arábia Saudita', data: '2026-06-15T20:00:00', local: 'Edmonton, Canadá', resultado: null },
        { id: 27, grupo: 'E', time_a: 'Alemanha', time_b: 'Polônia', data: '2026-06-19T20:00:00', local: 'Denver, Estados Unidos', resultado: null },
        { id: 28, grupo: 'E', time_a: 'México', time_b: 'Arábia Saudita', data: '2026-06-19T20:00:00', local: 'Guadalajara, México', resultado: null },
        { id: 29, grupo: 'E', time_a: 'Arábia Saudita', time_b: 'Alemanha', data: '2026-06-24T20:00:00', local: 'Kansas City, Estados Unidos', resultado: null },
        { id: 30, grupo: 'E', time_a: 'México', time_b: 'Polônia', data: '2026-06-24T20:00:00', local: 'Guadalajara, México', resultado: null },

        // GRUPO F
        { id: 31, grupo: 'F', time_a: 'Bélgica', time_b: 'Canadá', data: '2026-06-15T18:00:00', local: 'Toronto, Canadá', resultado: null },
        { id: 32, grupo: 'F', time_a: 'Croácia', time_b: 'Marrocos', data: '2026-06-16T14:00:00', local: 'Glendale, Estados Unidos', resultado: null },
        { id: 33, grupo: 'F', time_a: 'Bélgica', time_b: 'Croácia', data: '2026-06-20T14:00:00', local: 'Montreal, Canadá', resultado: null },
        { id: 34, grupo: 'F', time_a: 'Canadá', time_b: 'Marrocos', data: '2026-06-20T18:00:00', local: 'Vancouver, Canadá', resultado: null },
        { id: 35, grupo: 'F', time_a: 'Marrocos', time_b: 'Bélgica', data: '2026-06-24T20:00:00', local: 'Miami, Estados Unidos', resultado: null },
        { id: 36, grupo: 'F', time_a: 'Canadá', time_b: 'Croácia', data: '2026-06-25T20:00:00', local: 'Toronto, Canadá', resultado: null },

        // GRUPO G
        { id: 37, grupo: 'G', time_a: 'Portugal', time_b: 'Uruguai', data: '2026-06-16T16:00:00', local: 'Miami, Estados Unidos', resultado: null },
        { id: 38, grupo: 'G', time_a: 'Gana', time_b: 'Coreia do Sul', data: '2026-06-17T14:00:00', local: 'Austin, Estados Unidos', resultado: null },
        { id: 39, grupo: 'G', time_a: 'Portugal', time_b: 'Gana', data: '2026-06-20T20:00:00', local: 'Boston, Estados Unidos', resultado: null },
        { id: 40, grupo: 'G', time_a: 'Uruguai', time_b: 'Coreia do Sul', data: '2026-06-21T14:00:00', local: 'Seattle, Estados Unidos', resultado: null },
        { id: 41, grupo: 'G', time_a: 'Coreia do Sul', time_b: 'Portugal', data: '2026-06-25T20:00:00', local: 'San Francisco, Estados Unidos', resultado: null },
        { id: 42, grupo: 'G', time_a: 'Uruguai', time_b: 'Gana', data: '2026-06-25T20:00:00', local: 'Nashville, Estados Unidos', resultado: null },

        // GRUPO H
        { id: 43, grupo: 'H', time_a: 'Suécia', time_b: 'Estados Unidos', data: '2026-06-17T20:00:00', local: 'Minneapolis, Estados Unidos', resultado: null },
        { id: 44, grupo: 'H', time_a: 'Inglaterra', time_b: 'Irã', data: '2026-06-18T14:00:00', local: 'Dallas, Estados Unidos', resultado: null },
        { id: 45, grupo: 'H', time_a: 'Suécia', time_b: 'Inglaterra', data: '2026-06-21T16:00:00', local: 'Detroit, Estados Unidos', resultado: null },
        { id: 46, grupo: 'H', time_a: 'Irã', time_b: 'Estados Unidos', data: '2026-06-21T20:00:00', local: 'Las Vegas, Estados Unidos', resultado: null },
        { id: 47, grupo: 'H', time_a: 'Estados Unidos', time_b: 'Inglaterra', data: '2026-06-25T20:00:00', local: 'Atlanta, Estados Unidos', resultado: null },
        { id: 48, grupo: 'H', time_a: 'Irã', time_b: 'Suécia', data: '2026-06-26T20:00:00', local: 'Chicago, Estados Unidos', resultado: null }
    ];

    return games;
}

/**
 * Inicializa dados quando o documento é carregado
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeCopa2026Data();
    updatePageLinks();
});

// =====================================
// ATUALIZAÇÃO DE LINKS DA PÁGINA
// =====================================

/**
 * Atualiza os links ativos na navegação
 */
function updatePageLinks() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// =====================================
// FUNÇÕES DE FORMATAÇÃO
// =====================================

/**
 * Formata telefone para padrão brasileiro
 */
function formatPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length !== 11) return phone;
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
}

/**
 * Formata moeda para real
 */
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

/**
 * Formata data
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

/**
 * Formata data e hora
 */
function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        weekday: 'short',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// =====================================
// FUNÇÕES DE VALIDAÇÃO
// =====================================

/**
 * Valida email
 */
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Valida WhatsApp brasileiro
 */
function isValidPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 11;
}

/**
 * Valida nome
 */
function isValidName(name) {
    return name.trim().length >= 3;
}

// =====================================
// SISTEMA DE PONTUAÇÃO
// =====================================

/**
 * Obtém configurações de pontuação
 */
function getScoringConfig() {
    let config = loadFromLocalStorage('scoring-config');
    
    if (!config) {
        config = {
            winner: 1,
            draw: 1,
            exactScore: 5
        };
        saveToLocalStorage('scoring-config', config);
    }
    
    return config;
}

/**
 * Calcula pontos de um palpite
 */
function calculatePoints(bet, result) {
    if (!result) return 0;

    const config = getScoringConfig();
    const [betA, betB] = bet.split('x').map(s => parseInt(s.trim()));
    const [resultA, resultB] = result.split('x').map(s => parseInt(s.trim()));

    // Acertou o placar exato
    if (betA === resultA && betB === resultB) {
        return config.exactScore;
    }

    // Acertou o vencedor ou empate
    const betWinner = betA > betB ? 'A' : betA < betB ? 'B' : 'DRAW';
    const resultWinner = resultA > resultB ? 'A' : resultA < resultB ? 'B' : 'DRAW';

    if (betWinner === resultWinner) {
        return betWinner === 'DRAW' ? config.draw : config.winner;
    }

    return 0;
}

// =====================================
// EXPORTAÇÃO DE DADOS
// =====================================

/**
 * Converte array para CSV
 */
function convertToCSV(data) {
    if (!data || data.length === 0) return '';

    const headers = Object.keys(data[0]);
    const csv = [headers.join(',')];

    data.forEach(row => {
        const values = headers.map(header => {
            const value = row[header];
            if (typeof value === 'string' && value.includes(',')) {
                return `"${value}"`;
            }
            return value;
        });
        csv.push(values.join(','));
    });

    return csv.join('\n');
}

/**
 * Baixa arquivo CSV
 */
function downloadCSV(filename, csv) {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Baixa arquivo JSON
 */
function downloadJSON(filename, data) {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// =====================================
// UTILITIES
// =====================================

/**
 * Copia texto para clipboard
 */
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
    } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

/**
 * Exibe notificação toast
 */
function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#0066cc'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, duration);
}

// Adicionar animações
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);