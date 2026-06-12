/*
 * =====================================
 * GERENCIAMENTO DE JOGOS
 * =====================================
 * Agora salva localmente e também envia para Google Sheets
 */

let jogoEmEdicao = null;

document.addEventListener('DOMContentLoaded', function() {
    setupJogosTab();
});

function getLocal(chave) {
    if (typeof obterDados === 'function') return obterDados(chave);
    if (typeof loadFromLocalStorage === 'function') return loadFromLocalStorage(chave);
    const dados = localStorage.getItem(chave);
    return dados ? JSON.parse(dados) : null;
}

function setLocal(chave, dados) {
    if (typeof salvarDados === 'function') return salvarDados(chave, dados);
    if (typeof saveToLocalStorage === 'function') return saveToLocalStorage(chave, dados);
    localStorage.setItem(chave, JSON.stringify(dados));
}

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

function carregarJogosTab() {
    const jogos = getLocal('jogos') || [];
    exibirTabelaJogos(jogos);
}

function exibirTabelaJogos(jogos) {
    const table = document.getElementById('jogos-table');
    if (!table) return;

    if (!jogos || jogos.length === 0) {
        table.innerHTML = '<tr><td colspan="9" class="text-center">Nenhum jogo cadastrado</td></tr>';
        return;
    }

    table.innerHTML = jogos.map(jogo => `
        <tr>
            <td><strong>${jogo.id}</strong></td>
            <td><span class="fase-badge">${jogo.fase || '-'}</span></td>
            <td>${jogo.time_a || '-'}</td>
            <td>${jogo.time_b || '-'}</td>
            <td><small>${formatarDataHoraJogo(jogo.data, jogo.hora)}</small></td>
            <td><small>${jogo.local || '-'}</small></td>
            <td>${jogo.resultado ? `<strong class="resultado-badge">${jogo.resultado}</strong>` : '-'}</td>
            <td>
                <span class="status-badge ${jogo.ativo ? 'ativo' : 'inativo'}">
                    ${jogo.ativo ? '✅ Ativo' : '❌ Inativo'}
                </span>
            </td>
            <td>
                <button onclick="editarJogo(${Number(jogo.id)})" class="btn btn-sm btn-secondary" title="Editar">✏️</button>
                <button onclick="deletarJogo(${Number(jogo.id)})" class="btn btn-sm btn-danger" title="Deletar">🗑️</button>
            </td>
        </tr>
    `).join('');
}

function formatarDataHoraJogo(data, hora) {
    if (!data) return '-';
    const partes = String(data).split('-');
    if (partes.length === 3) {
        return `${partes[2]}/${partes[1]}/${partes[0]} ${hora || ''}`;
    }
    return `${data} ${hora || ''}`;
}

async function enviarJogoGoogleSheets(jogo) {
    if (typeof enviarDadosGoogleSheets === 'function') {
        return enviarDadosGoogleSheets('adicionar_jogo', jogo);
    }

    if (typeof GOOGLE_SCRIPT_URL === 'undefined' || !GOOGLE_SCRIPT_URL) {
        console.warn('GOOGLE_SCRIPT_URL não definida no script.js');
        return false;
    }

    try {
        const resposta = await fetch(`${GOOGLE_SCRIPT_URL}?action=adicionar_jogo`, {
            method: 'POST',
            body: JSON.stringify(jogo)
        });

        const retorno = await resposta.json();
        console.log('Retorno Google Sheets:', retorno);

        return retorno.sucesso === true;
    } catch (erro) {
        console.error('Erro ao enviar jogo para Google Sheets:', erro);
        return false;
    }
}

async function salvarJogo(e) {
    e.preventDefault();

    const fase = document.getElementById('jogo-fase').value;
    const time_a = document.getElementById('jogo-time-a').value.trim();
    const time_b = document.getElementById('jogo-time-b').value.trim();
    const data = document.getElementById('jogo-data').value;
    const hora = document.getElementById('jogo-hora').value;
    const local = document.getElementById('jogo-local').value.trim();
    const ativo = document.getElementById('jogo-ativo').value === 'true';
    const resultado = document.getElementById('jogo-resultado').value.trim() || '';

    if (!fase || !time_a || !time_b || !data || !hora || !local) {
        alert('Preencha todos os campos obrigatórios!');
        return;
    }

    let jogos = getLocal('jogos') || [];

    if (jogoEmEdicao) {
        const index = jogos.findIndex(j => Number(j.id) === Number(jogoEmEdicao));

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
                resultado: resultado || null
            };

            setLocal('jogos', jogos);

            alert('✅ Jogo atualizado localmente.\n\nPara atualizar na planilha, por enquanto edite a linha manualmente no Google Sheets.');
        }
    } else {
        const novoId = jogos.length > 0 ? Math.max(...jogos.map(j => Number(j.id) || 0)) + 1 : 1;

        const novoJogo = {
            id: novoId,
            fase,
            time_a,
            time_b,
            data,
            hora,
            local,
            ativo,
            resultado: resultado || null
        };

        jogos.push(novoJogo);
        setLocal('jogos', jogos);

        const enviado = await enviarJogoGoogleSheets(novoJogo);

        if (enviado) {
            alert('✅ Jogo criado e enviado para a planilha Google Sheets!');
        } else {
            alert('⚠️ Jogo criado no navegador, mas não consegui enviar para a planilha.\nVerifique a URL do Apps Script e a implantação.');
        }
    }

    limparFormJogo();
    carregarJogosTab();

    if (typeof loadAdminDashboard === 'function') {
        loadAdminDashboard();
    }
}

function editarJogo(jogoId) {
    const jogos = getLocal('jogos') || [];
    const jogo = jogos.find(j => Number(j.id) === Number(jogoId));

    if (!jogo) {
        alert('Jogo não encontrado!');
        return;
    }

    document.getElementById('jogo-id').value = jogo.id;
    document.getElementById('jogo-fase').value = jogo.fase;
    document.getElementById('jogo-time-a').value = jogo.time_a;
    document.getElementById('jogo-time-b').value = jogo.time_b;
    document.getElementById('jogo-data').value = jogo.data;
    document.getElementById('jogo-hora').value = jogo.hora;
    document.getElementById('jogo-local').value = jogo.local;
    document.getElementById('jogo-ativo').value = String(jogo.ativo);
    document.getElementById('jogo-resultado').value = jogo.resultado || '';

    jogoEmEdicao = jogoId;

    document.getElementById('jogo-form').scrollIntoView({ behavior: 'smooth' });

    const botao = document.querySelector('#jogo-form button[type="submit"]');
    if (botao) botao.textContent = '💾 Atualizar Jogo';
}

function limparFormJogo() {
    document.getElementById('jogo-form').reset();
    document.getElementById('jogo-id').value = '';
    jogoEmEdicao = null;

    const botao = document.querySelector('#jogo-form button[type="submit"]');
    if (botao) botao.textContent = '💾 Salvar Jogo';
}

function deletarJogo(jogoId) {
    if (!confirm('Tem certeza que deseja deletar este jogo?\n\nOs palpites associados também serão removidos apenas deste navegador.')) {
        return;
    }

    let jogos = getLocal('jogos') || [];
    let palpites = getLocal('palpites') || [];

    jogos = jogos.filter(j => Number(j.id) !== Number(jogoId));
    palpites = palpites.filter(p => Number(p.jogo_id) !== Number(jogoId));

    setLocal('jogos', jogos);
    setLocal('palpites', palpites);

    alert('✅ Jogo deletado localmente.\n\nSe ele estiver na planilha, delete a linha manualmente no Google Sheets.');
    carregarJogosTab();

    if (typeof loadAdminDashboard === 'function') {
        loadAdminDashboard();
    }
}

function filtrarJogos() {
    const searchInput = document.getElementById('jogos-search');
    const filterFaseInput = document.getElementById('jogos-filter-fase');

    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const filterFase = filterFaseInput ? filterFaseInput.value : '';

    let jogos = getLocal('jogos') || [];

    jogos = jogos.filter(jogo => {
        const matchSearch =
            String(jogo.time_a || '').toLowerCase().includes(searchTerm) ||
            String(jogo.time_b || '').toLowerCase().includes(searchTerm);

        const matchFase = !filterFase || jogo.fase === filterFase;

        return matchSearch && matchFase;
    });

    exibirTabelaJogos(jogos);
}

function exportarJogos() {
    const jogos = getLocal('jogos') || [];

    const data = jogos.map(jogo => ({
        'ID': jogo.id,
        'Fase': jogo.fase,
        'Time A': jogo.time_a,
        'Time B': jogo.time_b,
        'Data': formatarDataHoraJogo(jogo.data, jogo.hora),
        'Local': jogo.local,
        'Resultado': jogo.resultado || '-',
        'Status': jogo.ativo ? 'Ativo' : 'Inativo'
    }));

    if (typeof converterParaCSV === 'function' && typeof baixarArquivo === 'function') {
        const csv = converterParaCSV(data);
        baixarArquivo('jogos-copa-2026.csv', csv, 'text/csv');
    } else if (typeof convertToCSV === 'function' && typeof downloadCSV === 'function') {
        const csv = convertToCSV(data);
        downloadCSV('jogos-copa-2026.csv', csv);
    } else {
        alert('Função de exportação CSV não encontrada.');
    }
}

function carregarResultadosTab() {
    const jogos = getLocal('jogos') || [];
    const jogoSelect = document.getElementById('resultado-jogo');

    if (!jogoSelect) return;

    jogoSelect.innerHTML = '<option value="">-- Selecione um jogo --</option>';

    jogos.forEach(jogo => {
        const option = document.createElement('option');
        option.value = jogo.id;
        option.textContent = `${jogo.time_a} vs ${jogo.time_b} (${jogo.fase}) - ${formatarDataHoraJogo(jogo.data, jogo.hora)}`;
        jogoSelect.appendChild(option);
    });

    jogoSelect.onchange = function() {
        const jogoId = this.value;
        if (!jogoId) return;

        const jogo = jogos.find(j => Number(j.id) === Number(jogoId));

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
    };

    const jogosComResultado = jogos.filter(j => j.resultado);
    const table = document.getElementById('resultados-table');

    if (!table) return;

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
                <button onclick="deleteGameResult(${Number(jogo.id)})" class="btn btn-sm btn-danger">Deletar</button>
            </td>
        </tr>
    `).join('');
}

window.switchAdminTab = function(tabName) {
    document.querySelectorAll('.admin-tab-content').forEach(content => {
        content.classList.remove('active');
    });

    document.querySelectorAll('.admin-tab').forEach(btn => {
        btn.classList.remove('active');
    });

    const tabContent = document.getElementById(`${tabName}-tab`);
    if (tabContent) {
        tabContent.classList.add('active');
    }

    if (event && event.target) {
        event.target.classList.add('active');
    }

    switch(tabName) {
        case 'dashboard':
            if (typeof loadAdminDashboard === 'function') loadAdminDashboard();
            break;
        case 'jogos':
            carregarJogosTab();
            break;
        case 'pagamentos':
            if (typeof loadPagamentosTab === 'function') loadPagamentosTab();
            break;
        case 'resultados':
            carregarResultadosTab();
            break;
        case 'participantes':
            if (typeof loadParticipantesTab === 'function') loadParticipantesTab();
            break;
        case 'palpites':
            if (typeof loadPalpitesTab === 'function') loadPalpitesTab();
            break;
        case 'configuracoes':
            if (typeof loadConfiguracoes === 'function') loadConfiguracoes();
            break;
    }
};

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
