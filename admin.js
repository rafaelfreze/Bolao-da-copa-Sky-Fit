/*
 * =====================================
 * SCRIPT ADMINISTRATIVO
 * =====================================
 * Gerencia o painel administrativo
 */

// =====================================
// CONFIGURAÇÃO E LOGIN
// =====================================

const ADMIN_PASSWORD = 'Freze8270';

document.addEventListener('DOMContentLoaded', function() {
    // Verificar se já está logado
    if (localStorage.getItem('admin-logged') === 'true') {
        showAdminDashboard();
    }

    // Setup login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }

    // Setup admin tabs
    setupAdminTabs();

    // Setup forms
    setupResultadoForm();
});

// =====================================
// FUNÇÕES DE LOGIN
// =====================================

function handleLogin() {
    const password = document.getElementById('admin-password').value;

    if (password === ADMIN_PASSWORD) {
        localStorage.setItem('admin-logged', 'true');
        document.getElementById('login-form').reset();
        showAdminDashboard();
    } else {
        const errorMsg = document.getElementById('login-error');
        errorMsg.textContent = '❌ Senha incorreta!';
        errorMsg.style.display = 'block';
        setTimeout(() => {
            errorMsg.style.display = 'none';
        }, 3000);
    }
}

function logout() {
    localStorage.removeItem('admin-logged');
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('admin-section').style.display = 'none';
    document.getElementById('login-form').reset();
    document.getElementById('admin-password').focus();
}

function showAdminDashboard() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('admin-section').style.display = 'block';
    loadAdminDashboard();
}

// =====================================
// ABAS ADMINISTRATIVAS
// =====================================

function setupAdminTabs() {
    const tabs = document.querySelectorAll('.admin-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            switchAdminTab(tabName);
        });
    });
}

function switchAdminTab(tabName) {
    // Ocultar todas as abas
    document.querySelectorAll('.admin-tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Remover classe active de todos os botões
    document.querySelectorAll('.admin-tab').forEach(btn => {
        btn.classList.remove('active');
    });

    // Mostrar aba ativa
    const tabContent = document.getElementById(`${tabName}-tab`);
    if (tabContent) {
        tabContent.classList.add('active');
    }

    // Marcar botão como ativo
    if (event && event.target) {
        event.target.classList.add('active');
    }

    // Carregar dados da aba
    switch(tabName) {
        case 'dashboard':
            loadAdminDashboard();
            break;
        case 'pagamentos':
            loadPagamentosTab();
            break;
        case 'resultados':
            loadResultadosTab();
            break;
        case 'participantes':
            loadParticipantesTab();
            break;
        case 'palpites':
            loadPalpitesTab();
            break;
        case 'configuracoes':
            loadConfiguracoes();
            break;
    }
}

// =====================================
// DASHBOARD
// =====================================

function loadAdminDashboard() {
    const participantes = loadFromLocalStorage('participantes') || [];
    const palpites = loadFromLocalStorage('palpites') || [];
    const jogos = loadFromLocalStorage('jogos') || [];

    const totalParticipants = participantes.length;
    const paidParticipants = participantes.filter(p => p.pago).length;
    const pendingParticipants = participantes.filter(p => p.pendente_pagamento).length;
    const totalPrize = paidParticipants * 10;
    const totalBets = palpites.length;
    const finishedGames = jogos.filter(g => g.resultado).length;

    document.getElementById('admin-total-participants').textContent = totalParticipants;
    document.getElementById('admin-paid-participants').textContent = paidParticipants;
    document.getElementById('admin-pending-participants').textContent = pendingParticipants;
    document.getElementById('admin-total-prize').textContent = formatCurrency(totalPrize);
    document.getElementById('admin-total-bets').textContent = totalBets;
    document.getElementById('admin-finished-games').textContent = finishedGames;
}

// =====================================
// ABA: PAGAMENTOS
// =====================================

function loadPagamentosTab() {
    const participantes = loadFromLocalStorage('participantes') || [];

    const table = document.getElementById('pagamentos-table');
    
    if (participantes.length === 0) {
        table.innerHTML = '<tr><td colspan="5" class="text-center">Nenhum participante cadastrado</td></tr>';
        return;
    }

    table.innerHTML = participantes.map((p, index) => `
        <tr>
            <td>${p.nome}</td>
            <td>${p.whatsapp}</td>
            <td>
                <span class="status-badge ${p.pago ? 'paid' : 'pending'}">
                    ${p.pago ? '✅ Pago' : '⏳ Pendente'}
                </span>
            </td>
            <td>${p.data_inscricao ? formatDate(p.data_inscricao) : '-'}</td>
            <td>
                <button onclick="confirmPayment(${index})" class="btn btn-sm btn-success">Confirmar</button>
                <button onclick="rejectPayment(${index})" class="btn btn-sm btn-danger">Rejeitar</button>
            </td>
        </tr>
    `).join('');
}

function confirmPayment(index) {
    const participantes = loadFromLocalStorage('participantes') || [];
    participantes[index].pago = true;
    participantes[index].data_pagamento = new Date().toISOString();
    participantes[index].pendente_pagamento = false;
    saveToLocalStorage('participantes', participantes);
    
    loadPagamentosTab();
    loadAdminDashboard();
    alert(`✅ Pagamento confirmado para ${participantes[index].nome}`);
}

function rejectPayment(index) {
    const participantes = loadFromLocalStorage('participantes') || [];
    if (confirm(`Rejeitar pagamento de ${participantes[index].nome}?`)) {
        participantes[index].pago = false;
        participantes[index].pendente_pagamento = false;
        saveToLocalStorage('participantes', participantes);
        loadPagamentosTab();
        loadAdminDashboard();
    }
}

// =====================================
// ABA: RESULTADOS
// =====================================

function setupResultadoForm() {
    const form = document.getElementById('resultado-form');
    if (!form) return;

    const jogoSelect = document.getElementById('resultado-jogo');
    
    // Carregar jogos
    const jogos = loadFromLocalStorage('jogos') || [];
    jogos.forEach(jogo => {
        const option = document.createElement('option');
        option.value = jogo.id;
        option.textContent = `${jogo.time_a} vs ${jogo.time_b} (Grupo ${jogo.grupo})`;
        jogoSelect.appendChild(option);
    });

    jogoSelect.addEventListener('change', function() {
        const jogoId = this.value;
        if (!jogoId) return;

        const jogo = jogos.find(j => j.id == jogoId);
        if (jogo) {
            document.getElementById('resultado-time-a').textContent = jogo.time_a;
            document.getElementById('resultado-time-b').textContent = jogo.time_b;
            
            if (jogo.resultado) {
                const [placarA, placarB] = jogo.resultado.split('x').map(s => parseInt(s.trim()));
                document.getElementById('resultado-placar-a').value = placarA;
                document.getElementById('resultado-placar-b').value = placarB;
            } else {
                document.getElementById('resultado-placar-a').value = '';
                document.getElementById('resultado-placar-b').value = '';
            }
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        saveGameResult();
    });
}

function saveGameResult() {
    const jogoId = parseInt(document.getElementById('resultado-jogo').value);
    const placarA = parseInt(document.getElementById('resultado-placar-a').value);
    const placarB = parseInt(document.getElementById('resultado-placar-b').value);

    if (!jogoId || placarA === '' || placarB === '') {
        alert('Preencha todos os campos!');
        return;
    }

    const jogos = loadFromLocalStorage('jogos') || [];
    const jogo = jogos.find(j => j.id === jogoId);

    if (jogo) {
        jogo.resultado = `${placarA}x${placarB}`;
        saveToLocalStorage('jogos', jogos);
        
        // Recalcular pontos
        recalculateAllPoints();
        
        alert('✅ Resultado salvo com sucesso!');
        document.getElementById('resultado-form').reset();
        loadResultadosTab();
        loadAdminDashboard();
    }
}

function loadResultadosTab() {
    const jogos = loadFromLocalStorage('jogos') || [];
    const jogosComResultado = jogos.filter(j => j.resultado);

    const table = document.getElementById('resultados-table');
    
    if (jogosComResultado.length === 0) {
        table.innerHTML = '<tr><td colspan="4" class="text-center">Nenhum resultado registrado</td></tr>';
        return;
    }

    table.innerHTML = jogosComResultado.map(jogo => `
        <tr>
            <td>${jogo.time_a} vs ${jogo.time_b}</td>
            <td><strong>${jogo.resultado}</strong></td>
            <td>${jogo.local}</td>
            <td>
                <button onclick="deleteGameResult(${jogo.id})" class="btn btn-sm btn-danger">Deletar</button>
            </td>
        </tr>
    `).join('');
}

function deleteGameResult(jogoId) {
    if (confirm('Tem certeza que deseja deletar este resultado?')) {
        const jogos = loadFromLocalStorage('jogos') || [];
        const jogo = jogos.find(j => j.id === jogoId);
        
        if (jogo) {
            jogo.resultado = null;
            saveToLocalStorage('jogos', jogos);
            recalculateAllPoints();
            loadResultadosTab();
            loadAdminDashboard();
            alert('✅ Resultado deletado!');
        }
    }
}

// =====================================
// CÁLCULO DE PONTOS
// =====================================

function recalculateAllPoints() {
    const palpites = loadFromLocalStorage('palpites') || [];
    const jogos = loadFromLocalStorage('jogos') || [];
    const participantes = loadFromLocalStorage('participantes') || [];

    // Resetar pontos de palpites
    palpites.forEach(palpite => {
        const jogo = jogos.find(j => j.id == palpite.jogo_id);
        if (jogo && jogo.resultado) {
            const bet = `${palpite.placar_a}x${palpite.placar_b}`;
            palpite.pontos = calculatePoints(bet, jogo.resultado);
        } else {
            palpite.pontos = 0;
        }
    });

    saveToLocalStorage('palpites', palpites);

    // Recalcular pontos dos participantes
    participantes.forEach(participante => {
        const userBets = palpites.filter(p => p.nome === participante.nome && p.whatsapp === participante.whatsapp);
        participante.pontos = userBets.reduce((total, bet) => total + (bet.pontos || 0), 0);
        participante.acertos = userBets.filter(b => b.pontos > 0).length;
    });

    saveToLocalStorage('participantes', participantes);
}

// =====================================
// ABA: PARTICIPANTES
// =====================================

function loadParticipantesTab() {
    const participantes = loadFromLocalStorage('participantes') || [];
    const palpites = loadFromLocalStorage('palpites') || [];

    const table = document.getElementById('participantes-table');
    
    if (participantes.length === 0) {
        table.innerHTML = '<tr><td colspan="7" class="text-center">Nenhum participante cadastrado</td></tr>';
        return;
    }

    table.innerHTML = participantes.map((p, index) => {
        const userBets = palpites.filter(bet => bet.nome === p.nome && bet.whatsapp === p.whatsapp);
        return `
            <tr>
                <td>${p.nome}</td>
                <td>${p.whatsapp}</td>
                <td>${p.email || '-'}</td>
                <td>${userBets.length}</td>
                <td><strong>${p.pontos || 0}</strong></td>
                <td>
                    <span class="status-badge ${p.pago ? 'paid' : 'pending'}">
                        ${p.pago ? '✅ Pago' : '⏳ Pendente'}
                    </span>
                </td>
                <td>
                    <button onclick="deleteParticipant(${index})" class="btn btn-sm btn-danger">Deletar</button>
                </td>
            </tr>
        `;
    }).join('');
}

function deleteParticipant(index) {
    const participantes = loadFromLocalStorage('participantes') || [];
    const nome = participantes[index].nome;
    
    if (confirm(`Deletar participante ${nome}? Seus palpites também serão removidos.`)) {
        const whatsapp = participantes[index].whatsapp;
        participantes.splice(index, 1);
        
        // Remover palpites do participante
        let palpites = loadFromLocalStorage('palpites') || [];
        palpites = palpites.filter(p => !(p.nome === nome && p.whatsapp === whatsapp));
        
        saveToLocalStorage('participantes', participantes);
        saveToLocalStorage('palpites', palpites);
        
        loadParticipantesTab();
        loadAdminDashboard();
        alert('✅ Participante deletado!');
    }
}

// =====================================
// ABA: PALPITES
// =====================================

function loadPalpitesTab() {
    const palpites = loadFromLocalStorage('palpites') || [];
    const jogos = loadFromLocalStorage('jogos') || [];

    const table = document.getElementById('palpites-table');
    
    if (palpites.length === 0) {
        table.innerHTML = '<tr><td colspan="6" class="text-center">Nenhum palpite cadastrado</td></tr>';
        return;
    }

    const palpitesComDetalhes = palpites.map(palpite => {
        const jogo = jogos.find(j => j.id == palpite.jogo_id);
        return {
            ...palpite,
            jogo: jogo
        };
    });

    table.innerHTML = palpitesComDetalhes.map(palpite => `
        <tr>
            <td>${palpite.nome}</td>
            <td>${palpite.jogo ? `${palpite.jogo.time_a} vs ${palpite.jogo.time_b}` : 'Jogo não encontrado'}</td>
            <td><strong>${palpite.placar_a}x${palpite.placar_b}</strong></td>
            <td>${palpite.jogo && palpite.jogo.resultado ? `<strong>${palpite.jogo.resultado}</strong>` : '-'}</td>
            <td>${palpite.pontos || 0}</td>
            <td>${formatDate(palpite.data_palpite)}</td>
        </tr>
    `).join('');

    // Setup busca
    const searchInput = document.getElementById('palpites-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const filtered = palpitesComDetalhes.filter(p => 
                p.nome.toLowerCase().includes(searchTerm) || 
                p.whatsapp.includes(searchTerm)
            );

            table.innerHTML = filtered.map(palpite => `
                <tr>
                    <td>${palpite.nome}</td>
                    <td>${palpite.jogo ? `${palpite.jogo.time_a} vs ${palpite.jogo.time_b}` : 'Jogo não encontrado'}</td>
                    <td><strong>${palpite.placar_a}x${palpite.placar_b}</strong></td>
                    <td>${palpite.jogo && palpite.jogo.resultado ? `<strong>${palpite.jogo.resultado}</strong>` : '-'}</td>
                    <td>${palpite.pontos || 0}</td>
                    <td>${formatDate(palpite.data_palpite)}</td>
                </tr>
            `).join('');
        });
    }
}

// =====================================
// EXPORTAÇÃO
// =====================================

function exportarPalpites() {
    const palpites = loadFromLocalStorage('palpites') || [];
    const jogos = loadFromLocalStorage('jogos') || [];

    const data = palpites.map(palpite => {
        const jogo = jogos.find(j => j.id == palpite.jogo_id);
        return {
            'Participante': palpite.nome,
            'WhatsApp': palpite.whatsapp,
            'Email': palpite.email || '-',
            'Jogo': jogo ? `${jogo.time_a} vs ${jogo.time_b}` : 'N/A',
            'Palpite': `${palpite.placar_a}x${palpite.placar_b}`,
            'Resultado': jogo && jogo.resultado ? jogo.resultado : 'Não finalizado',
            'Pontos': palpite.pontos || 0,
            'Data do Palpite': formatDate(palpite.data_palpite)
        };
    });

    const csv = convertToCSV(data);
    downloadCSV('palpites-copa-2026.csv', csv);
    alert('✅ Palpites exportados com sucesso!');
}

function exportarTodosOsDados() {
    const dados = {
        participantes: loadFromLocalStorage('participantes') || [],
        palpites: loadFromLocalStorage('palpites') || [],
        jogos: loadFromLocalStorage('jogos') || [],
        configuracoes: loadFromLocalStorage('scoring-config') || {}
    };

    downloadJSON('bolao-copa-2026-dados-completos.json', dados);
    alert('✅ Todos os dados foram exportados!');
}

// =====================================
// CONFIGURAÇÕES
// =====================================

function loadConfiguracoes() {
    const config = getScoringConfig();

    document.getElementById('points-vencedor').value = config.winner;
    document.getElementById('points-empate').value = config.draw;
    document.getElementById('points-placar').value = config.exactScore;
}

function saveConfiguracoes() {
    const config = {
        winner: parseInt(document.getElementById('points-vencedor').value),
        draw: parseInt(document.getElementById('points-empate').value),
        exactScore: parseInt(document.getElementById('points-placar').value)
    };

    saveToLocalStorage('scoring-config', config);
    alert('✅ Configurações salvas com sucesso!');
}

function initializeDatabase() {
    if (confirm('Carregar todos os 48 jogos da Copa 2026? (Existentes serão preservados)')) {
        const novosjogos = generateCopa2026Games();
        const jogoExistentes = loadFromLocalStorage('jogos') || [];

        // Preservar resultados existentes
        novosjogos.forEach(novoJogo => {
            const existente = jogoExistentes.find(j => j.id === novoJogo.id);
            if (existente && existente.resultado) {
                novoJogo.resultado = existente.resultado;
            }
        });

        saveToLocalStorage('jogos', novosjogos);
        alert('✅ Base de dados da Copa 2026 carregada com sucesso!');
    }
}

function limparTodosDados() {
    if (confirm('⚠️ AVISO: Isso deletará TODOS os dados! Tem certeza?')) {
        if (confirm('Confirme novamente: deseja REALMENTE limpar tudo?')) {
            localStorage.clear();
            alert('✅ Todos os dados foram deletados!');
            location.reload();
        }
    }
}