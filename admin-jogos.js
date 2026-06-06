/*
 * =====================================
 * GERENCIAMENTO DE JOGOS
 * =====================================
 * Script para gerenciar jogos no painel admin
 */

let jogoEmEdicao = null;

document.addEventListener('DOMContentLoaded', function() {
    setupJogosTab();
});

// =====================================
// SETUP DA ABA DE JOGOS
// =====================================

function setupJogosTab() {
    const form = document.getElementById('jogo-form');
    const searchInput = document.getElementById('jogos-search');
    const filterFase = document.getElementById('jogos-filter-fase');

    if (form) {
        form.addEventListener('submit', salvarJogo);
    }

    if (searchInput) {
        searchInput.addEventListener('input', filtrarJogos);
    }

    if (filterFase) {
        filterFase.addEventListener('change', filtrarJogos);
    }
}

// =====================================
// CARREGAR E EXIBIR JOGOS
// =====================================

function carregarJogosTab() {
    const jogos = loadFromLocalStorage('jogos') || [];
    exibirTabelaJogos(jogos);
}

function exibirTabelaJogos(jogos) {
    const table = document.getElementById('jogos-table');
    
    if (jogos.length === 0) {
        table.innerHTML = '<tr><td colspan="9" class="text-center">Nenhum jogo cadastrado</td></tr>';
        return;
    }

    table.innerHTML = jogos.map(jogo => `
        <tr>
            <td><strong>${jogo.id}</strong></td>
            <td>
                <span class="fase-badge">${jogo.fase}</span>
            </td>
            <td>${jogo.time_a}</td>
            <td>${jogo.time_b}</td>
            <td>
                <small>
                    ${formatarDataHora(jogo.data, jogo.hora)}
                </small>
            </td>
            <td><small>${jogo.local}</small></td>
            <td>
                ${jogo.resultado ? `<strong class="resultado-badge">${jogo.resultado}</strong>` : '-'}
            </td>
            <td>
                <span class="status-badge ${jogo.ativo ? 'ativo' : 'inativo'}">
                    ${jogo.ativo ? '✅ Ativo' : '❌ Inativo'}
                </span>
            </td>
            <td>
                <button onclick="editarJogo(${jogo.id})" class="btn btn-sm btn-secondary" title="Editar">✏️</button>
                <button onclick="deletarJogo(${jogo.id})" class="btn btn-sm btn-danger" title="Deletar">🗑️</button>
            </td>
        </tr>
    `).join('');
}

function formatarDataHora(data, hora) {
    if (!data) return '-';
    const date = new Date(data);
    const dataFormatada = date.toLocaleDateString('pt-BR');
    return `${dataFormatada} ${hora || ''}`;
}

// =====================================
// CRIAR/EDITAR JOGO
// =====================================

function salvarJogo(e) {
    e.preventDefault();

    const id = document.getElementById('jogo-id').value;
    const fase = document.getElementById('jogo-fase').value;
    const time_a = document.getElementById('jogo-time-a').value.trim();
    const time_b = document.getElementById('jogo-time-b').value.trim();
    const data = document.getElementById('jogo-data').value;
    const hora = document.getElementById('jogo-hora').value;
    const local = document.getElementById('jogo-local').value.trim();
    const ativo = document.getElementById('jogo-ativo').value === 'true';
    const resultado = document.getElementById('jogo-resultado').value.trim() || null;

    if (!fase || !time_a || !time_b || !data || !hora || !local) {
        alert('Preencha todos os campos obrigatórios!');
        return;
    }

    let jogos = loadFromLocalStorage('jogos') || [];

    if (jogoEmEdicao) {
        // Atualizar jogo existente
        const index = jogos.findIndex(j => j.id === jogoEmEdicao);
        if (index !== -1) {
            jogos[index] = {
                ...jogos[index],
                fase,
                time_a,
                time_b,
                data,
                hora,
                local,
                ativo,
                resultado
            };
            alert('✅ Jogo atualizado com sucesso!');
        }
    } else {
        // Criar novo jogo
        const novoId = jogos.length > 0 ? Math.max(...jogos.map(j => j.id)) + 1 : 1;
        
        jogos.push({
            id: novoId,
            fase,
            time_a,
            time_b,
            data,
            hora,
            local,
            ativo,
            resultado: resultado || null
        });
        alert('✅ Jogo criado com sucesso!');
    }

    saveToLocalStorage('jogos', jogos);
    limparFormJogo();
    carregarJogosTab();
    loadAdminDashboard();
}

function editarJogo(jogoId) {
    const jogos = loadFromLocalStorage('jogos') || [];
    const jogo = jogos.find(j => j.id === jogoId);

    if (!jogo) {
        alert('Jogo não encontrado!');
        return;
    }

    // Preencher o formulário
    document.getElementById('jogo-id').value = jogo.id;
    document.getElementById('jogo-fase').value = jogo.fase;
    document.getElementById('jogo-time-a').value = jogo.time_a;
    document.getElementById('jogo-time-b').value = jogo.time_b;
    document.getElementById('jogo-data').value = jogo.data;
    document.getElementById('jogo-hora').value = jogo.hora;
    document.getElementById('jogo-local').value = jogo.local;
    document.getElementById('jogo-ativo').value = jogo.ativo.toString();
    document.getElementById('jogo-resultado').value = jogo.resultado || '';

    jogoEmEdicao = jogoId;

    // Scroll para o formulário
    document.getElementById('jogo-form').scrollIntoView({ behavior: 'smooth' });

    // Atualizar botão
    const botao = document.querySelector('#jogo-form button[type="submit"]');
    botao.textContent = '💾 Atualizar Jogo';
}

function limparFormJogo() {
    document.getElementById('jogo-form').reset();
    document.getElementById('jogo-id').value = '';
    jogoEmEdicao = null;
    
    const botao = document.querySelector('#jogo-form button[type="submit"]');
    botao.textContent = '💾 Salvar Jogo';
}

function deletarJogo(jogoId) {
    if (!confirm('Tem certeza que deseja deletar este jogo?\n\nTodos os palpites associados também serão removidos.')) {
        return;
    }

    let jogos = loadFromLocalStorage('jogos') || [];
    let palpites = loadFromLocalStorage('palpites') || [];

    // Remover jogo
    jogos = jogos.filter(j => j.id !== jogoId);

    // Remover palpites do jogo
    palpites = palpites.filter(p => p.jogo_id !== jogoId);

    saveToLocalStorage('jogos', jogos);
    saveToLocalStorage('palpites', palpites);

    alert('✅ Jogo deletado com sucesso!');
    carregarJogosTab();
    loadAdminDashboard();
}

// =====================================
// FILTRAR JOGOS
// =====================================

function filtrarJogos() {
    const searchTerm = document.getElementById('jogos-search').value.toLowerCase();
    const filterFase = document.getElementById('jogos-filter-fase').value;

    let jogos = loadFromLocalStorage('jogos') || [];

    jogos = jogos.filter(jogo => {
        const matchSearch = jogo.time_a.toLowerCase().includes(searchTerm) || 
                           jogo.time_b.toLowerCase().includes(searchTerm);
        const matchFase = !filterFase || jogo.fase === filterFase;
        
        return matchSearch && matchFase;
    });

    exibirTabelaJogos(jogos);
}

// =====================================
// EXPORTAR JOGOS
// =====================================

function exportarJogos() {
    const jogos = loadFromLocalStorage('jogos') || [];

    const data = jogos.map(jogo => ({
        'ID': jogo.id,
        'Fase': jogo.fase,
        'Time A': jogo.time_a,
        'Time B': jogo.time_b,
        'Data': formatarDataHora(jogo.data, jogo.hora),
        'Local': jogo.local,
        'Resultado': jogo.resultado || '-',
        'Status': jogo.ativo ? 'Ativo' : 'Inativo'
    }));

    const csv = convertToCSV(data);
    downloadCSV('jogos-copa-2026.csv', csv);
    alert('✅ Jogos exportados com sucesso!');
}

// =====================================
// ATUALIZAR ABA RESULTADOS
// =====================================

function carregarResultadosTab() {
    const jogos = loadFromLocalStorage('jogos') || [];
    const jogoSelect = document.getElementById('resultado-jogo');

    // Limpar opções anteriores
    jogoSelect.innerHTML = '<option value="">-- Selecione um jogo --</option>';

    // Adicionar jogos disponíveis
    jogos.forEach(jogo => {
        const now = new Date();
        const gameDate = new Date(`${jogo.data}T${jogo.hora}`);
        
        // Mostrar apenas jogos que já começaram ou estão próximos
        if (gameDate <= now || gameDate.getTime() - now.getTime() < 24 * 60 * 60 * 1000) {
            const option = document.createElement('option');
            option.value = jogo.id;
            option.textContent = `${jogo.time_a} vs ${jogo.time_b} (${jogo.fase}) - ${formatarDataHora(jogo.data, jogo.hora)}`;
            jogoSelect.appendChild(option);
        }
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

    // Exibir jogos com resultados
    const jogosComResultado = jogos.filter(j => j.resultado);
    const table = document.getElementById('resultados-table');
    
    if (jogosComResultado.length === 0) {
        table.innerHTML = '<tr><td colspan="4" class="text-center">Nenhum resultado registrado</td></tr>';
        return;
    }

    table.innerHTML = jogosComResultado.map(jogo => `
        <tr>
            <td>${jogo.time_a} vs ${jogo.time_b} (${jogo.fase})</td>
            <td><strong>${jogo.resultado}</strong></td>
            <td>${jogo.local}</td>
            <td>
                <button onclick="deleteGameResult(${jogo.id})" class="btn btn-sm btn-danger">Deletar</button>
            </td>
        </tr>
    `).join('');
}

// =====================================
// QUANDO TROCAR DE ABA
// =====================================

// Interceptar o switch de abas original
const switchAdminTabOriginal = window.switchAdminTab;

window.switchAdminTab = function(tabName) {
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
        case 'jogos':
            carregarJogosTab();
            break;
        case 'pagamentos':
            loadPagamentosTab();
            break;
        case 'resultados':
            carregarResultadosTab();
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
};

// =====================================
// ESTILOS ADICIONAIS
// =====================================

const estilosAdicionais = document.createElement('style');
estilosAdicionais.textContent = `
    .form-row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
    }

    .form-actions {
        display: flex;
        gap: 1rem;
        justify-content: flex-start;
        margin-top: 1.5rem;
    }

    .form-actions .btn {
        flex: 1;
        max-width: 200px;
    }

    .filter-select {
        padding: 0.75rem;
        border: 2px solid var(--border-color);
        border-radius: var(--border-radius);
        font-size: 1rem;
        background-color: white;
        cursor: pointer;
    }

    .fase-badge {
        display: inline-block;
        padding: 0.4rem 0.8rem;
        background-color: #cce5ff;
        color: #0066cc;
        border-radius: 4px;
        font-size: 0.85rem;
        font-weight: 600;
    }

    .resultado-badge {
        background-color: #d4edda;
        color: #155724;
        padding: 0.4rem 0.8rem;
        border-radius: 4px;
        font-size: 0.9rem;
    }

    .status-badge.ativo {
        background-color: #d4edda;
        color: #155724;
    }

    .status-badge.inativo {
        background-color: #f8d7da;
        color: #721c24;
    }

    @media (max-width: 768px) {
        .form-row {
            grid-template-columns: 1fr;
        }

        .form-actions {
            flex-direction: column;
        }

        .form-actions .btn {
            max-width: 100%;
        }

        .admin-table {
            font-size: 0.85rem;
        }

        .admin-table th,
        .admin-table td {
            padding: 0.5rem;
        }
    }
`;
document.head.appendChild(estilosAdicionais);
