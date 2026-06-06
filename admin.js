/*
 * =====================================
 * SCRIPT ADMINISTRATIVO
 * =====================================
 * Gerencia o painel administrativo
 */

const SENHA_ADMIN = 'admin123';
let jogoEmEdicao = null;

document.addEventListener('DOMContentLoaded', function() {
    // Verificar se está logado
    if (estaLogado()) {
        mostrarAdmin();
    } else {
        mostrarLogin();
    }

    // Setup abas
    setupAbas();
});

// =====================================
// AUTENTICAÇÃO
// =====================================

function fazerLogin(event) {
    event.preventDefault();

    const senha = document.getElementById('senha-input').value;

    if (senha === SENHA_ADMIN) {
        localStorage.setItem('admin-logado', 'true');
        document.getElementById('senha-input').value = '';
        mostrarAdmin();
    } else {
        const erro = document.getElementById('erro-login');
        erro.textContent = '❌ Senha incorreta!';
        erro.style.display = 'block';
        setTimeout(() => {
            erro.style.display = 'none';
        }, 3000);
    }
}

function fazerLogout() {
    if (confirm('Deseja fazer logout?')) {
        localStorage.removeItem('admin-logado');
        window.location.href = 'index.html';
    }
}

function estaLogado() {
    return localStorage.getItem('admin-logado') === 'true';
}

function mostrarLogin() {
    document.getElementById('login-section').style.display = 'flex';
    document.getElementById('admin-main').style.display = 'none';
    document.getElementById('senha-input').focus();
}

function mostrarAdmin() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('admin-main').style.display = 'block';
    carregarDashboard();
}

// =====================================
// ABAS
// =====================================

function setupAbas() {
    document.querySelectorAll('.admin-tab').forEach(btn => {
        btn.addEventListener('click', function() {
            trocarAba(this.dataset.tab);
        });
    });
}

function trocarAba(nomeAba) {
    // Ocultar todas as abas
    document.querySelectorAll('.admin-tab-content').forEach(el => {
        el.classList.remove('active');
    });

    // Remover active dos botões
    document.querySelectorAll('.admin-tab').forEach(el => {
        el.classList.remove('active');
    });

    // Mostrar aba ativa
    document.getElementById(nomeAba + '-tab').classList.add('active');
    event.target.classList.add('active');

    // Carregar dados da aba
    if (nomeAba === 'dashboard') {
        carregarDashboard();
    } else if (nomeAba === 'jogos') {
        carregarListaJogos();
    } else if (nomeAba === 'resultados') {
        carregarSelectResultados();
    } else if (nomeAba === 'pagamentos') {
        carregarListaPagamentos();
    } else if (nomeAba === 'configuracoes') {
        carregarConfiguracoesForm();
    }
}

// =====================================
// DASHBOARD
// =====================================

function carregarDashboard() {
    const participantes = obterDados('participantes') || [];
    const palpites = obterDados('palpites') || [];
    const jogos = obterDados('jogos') || [];

    const config = obterConfiguracao();
    const pagos = participantes.filter(p => p.pago).length;
    const pendentes = participantes.filter(p => p.pendente_pagamento).length;
    const premio = pagos * config.valor_palpite;
    const resultados = jogos.filter(j => j.resultado).length;

    document.getElementById('dash-participantes').textContent = participantes.length;
    document.getElementById('dash-pagos').textContent = pagos;
    document.getElementById('dash-pendentes').textContent = pendentes;
    document.getElementById('dash-premio').textContent = formatarMoeda(premio);
    document.getElementById('dash-palpites').textContent = palpites.length;
    document.getElementById('dash-jogos').textContent = jogos.length;
    document.getElementById('dash-resultados').textContent = resultados;
}

// =====================================
// GERENCIAR JOGOS
// =====================================

function carregarListaJogos() {
    const jogos = obterDados('jogos') || [];
    const container = document.getElementById('lista-jogos');

    if (jogos.length === 0) {
        container.innerHTML = '<p class="text-center text-muted">Nenhum jogo cadastrado.</p>';
        return;
    }

    // Agrupar por fase
    const agrupado = {};
    jogos.forEach(jogo => {
        if (!agrupado[jogo.fase]) {
            agrupado[jogo.fase] = [];
        }
        agrupado[jogo.fase].push(jogo);
    });

    let html = '';
    Object.entries(agrupado).forEach(([fase, jogosGrupo]) => {
        html += `<h4 style="margin-top: 1.5rem; color: var(--secondary);">${fase}</h4>`;
        html += jogosGrupo.map(jogo => `
            <div class="jogo-item">
                <div class="jogo-info">
                    <strong>${jogo.time_a} vs ${jogo.time_b}</strong><br>
                    <small>📅 ${formatarData(jogo.data)} ${jogo.hora}</small><br>
                    <small>📍 ${jogo.local}</small><br>
                    <small>
                        ${jogo.resultado ? `<strong>Resultado: ${jogo.resultado}</strong>` : ''}
                        ${jogo.ativo ? '✅ Ativo' : '❌ Inativo'}
                    </small>
                </div>
                <div class="jogo-actions">
                    <button class="btn btn-secondary btn-small" onclick="editarJogo(${jogo.id})">✏️ Editar</button>
                    <button class="btn btn-danger btn-small" onclick="deletarJogo(${jogo.id})">🗑️ Deletar</button>
                </div>
            </div>
        `).join('');
    });

    container.innerHTML = html;
}

function salvarJogo(event) {
    event.preventDefault();

    const fase = document.getElementById('form-fase').value;
    const time_a = document.getElementById('form-time-a').value.trim();
    const time_b = document.getElementById('form-time-b').value.trim();
    const data = document.getElementById('form-data').value;
    const hora = document.getElementById('form-hora').value;
    const local = document.getElementById('form-local').value.trim();
    const ativo = document.getElementById('form-ativo').value === 'true';

    if (!fase || !time_a || !time_b || !data || !hora || !local) {
        alert('Preencha todos os campos!');
        return;
    }

    let jogos = obterDados('jogos') || [];

    if (jogoEmEdicao) {
        // Editar
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
                ativo
            };
            alert('✅ Jogo atualizado!');
        }
    } else {
        // Criar novo
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
            resultado: null
        });
        alert('✅ Jogo criado!');
    }

    salvarDados('jogos', jogos);
    limparFormJogo();
    carregarListaJogos();
    carregarDashboard();
}

function editarJogo(jogoId) {
    const jogos = obterDados('jogos') || [];
    const jogo = jogos.find(j => j.id === jogoId);

    if (!jogo) {
        alert('Jogo não encontrado!');
        return;
    }

    document.getElementById('form-fase').value = jogo.fase;
    document.getElementById('form-time-a').value = jogo.time_a;
    document.getElementById('form-time-b').value = jogo.time_b;
    document.getElementById('form-data').value = jogo.data;
    document.getElementById('form-hora').value = jogo.hora;
    document.getElementById('form-local').value = jogo.local;
    document.getElementById('form-ativo').value = jogo.ativo.toString();

    jogoEmEdicao = jogoId;

    document.querySelector('#form-jogo button[type="submit"]').textContent = '💾 ATUALIZAR';
    document.getElementById('form-jogo').scrollIntoView({ behavior: 'smooth' });
}

function limparFormJogo() {
    document.getElementById('form-jogo').reset();
    jogoEmEdicao = null;
    document.querySelector('#form-jogo button[type="submit"]').textContent = '💾 SALVAR';
}

function deletarJogo(jogoId) {
    if (!confirm('Tem certeza? Os palpites deste jogo também serão deletados.')) {
        return;
    }

    let jogos = obterDados('jogos') || [];
    let palpites = obterDados('palpites') || [];

    jogos = jogos.filter(j => j.id !== jogoId);
    palpites = palpites.filter(p => p.jogo_id !== jogoId);

    salvarDados('jogos', jogos);
    salvarDados('palpites', palpites);

    alert('✅ Jogo deletado!');
    carregarListaJogos();
    carregarDashboard();
}

// =====================================
// LANÇAR RESULTADOS
// =====================================

function carregarSelectResultados() {
    const jogos = obterDados('jogos') || [];
    const agora = new Date();
    const select = document.getElementById('form-resultado-jogo');

    select.innerHTML = '<option value="">-- Selecione um jogo --</option>';

    const jogosDisponiveis = jogos.filter(j => {
        const dataJogo = new Date(j.data + 'T' + j.hora);
        return dataJogo <= agora; // Apenas jogos que já passaram
    });

    jogosDisponiveis.forEach(jogo => {
        const option = document.createElement('option');
        option.value = jogo.id;
        const dataFormatada = formatarDataHora(jogo.data + 'T' + jogo.hora);
        option.textContent = `${jogo.time_a} vs ${jogo.time_b} - ${dataFormatada}`;
        select.appendChild(option);
    });

    select.addEventListener('change', function() {
        if (!this.value) return;

        const jogo = jogos.find(j => j.id == this.value);
        if (jogo) {
            document.getElementById('label-jogo-time-a').textContent = jogo.time_a;
            document.getElementById('label-jogo-time-b').textContent = jogo.time_b;

            if (jogo.resultado) {
                const [a, b] = jogo.resultado.split('x').map(v => parseInt(v.trim()));
                document.getElementById('form-resultado-a').value = a;
                document.getElementById('form-resultado-b').value = b;
            } else {
                document.getElementById('form-resultado-a').value = '';
                document.getElementById('form-resultado-b').value = '';
            }
        }
    });

    carregarListaResultados();
}

function salvarResultado(event) {
    event.preventDefault();

    const jogoId = parseInt(document.getElementById('form-resultado-jogo').value);
    const placarA = parseInt(document.getElementById('form-resultado-a').value);
    const placarB = parseInt(document.getElementById('form-resultado-b').value);

    if (!jogoId || isNaN(placarA) || isNaN(placarB)) {
        alert('Preencha todos os campos!');
        return;
    }

    const jogos = obterDados('jogos') || [];
    const jogo = jogos.find(j => j.id === jogoId);

    if (jogo) {
        jogo.resultado = `${placarA}x${placarB}`;
        jogo.ativo = false; // Bloquear novas apostas
        salvarDados('jogos', jogos);

        // Recalcular pontos
        recalcularPontos();

        alert('✅ Resultado lançado!');
        document.getElementById('form-resultado').reset();
        carregarSelectResultados();
        carregarDashboard();
    }
}

function carregarListaResultados() {
    const jogos = obterDados('jogos') || [];
    const jogosComResultado = jogos.filter(j => j.resultado);
    const container = document.getElementById('lista-resultados');

    if (jogosComResultado.length === 0) {
        container.innerHTML = '<p class="text-center text-muted">Nenhum resultado lançado.</p>';
        return;
    }

    container.innerHTML = jogosComResultado.map(jogo => `
        <div class="jogo-item">
            <div class="jogo-info">
                <strong>${jogo.time_a} vs ${jogo.time_b}</strong><br>
                <strong style="color: var(--success);">Resultado: ${jogo.resultado}</strong><br>
                <small>📍 ${jogo.local}</small>
            </div>
            <div class="jogo-actions">
                <button class="btn btn-danger btn-small" onclick="deletarResultado(${jogo.id})">🗑️ Deletar</button>
            </div>
        </div>
    `).join('');
}

function deletarResultado(jogoId) {
    if (!confirm('Tem certeza que deseja deletar este resultado?')) {
        return;
    }

    const jogos = obterDados('jogos') || [];
    const jogo = jogos.find(j => j.id === jogoId);

    if (jogo) {
        jogo.resultado = null;
        jogo.ativo = true; // Reabrir apostas
        salvarDados('jogos', jogos);

        recalcularPontos();

        alert('✅ Resultado deletado!');
        carregarSelectResultados();
        carregarDashboard();
    }
}

// =====================================
// CONFIRMAR PAGAMENTOS
// =====================================

function carregarListaPagamentos() {
    const participantes = obterDados('participantes') || [];
    const container = document.getElementById('lista-pagamentos');

    if (participantes.length === 0) {
        container.innerHTML = '<p class="text-center text-muted">Nenhum participante cadastrado.</p>';
        return;
    }

    const html = participantes.map((p, index) => `
        <div class="jogo-item">
            <div class="jogo-info">
                <strong>${p.nome}</strong><br>
                <small>${p.whatsapp}</small><br>
                <small>${p.email ? p.email : '-'}</small><br>
                <small>
                    ${p.pago ? '✅ Pago' : '⏳ Pendente'}
                    ${p.pendente_pagamento ? '| 🔔 Aguardando confirmação' : ''}
                </small>
            </div>
            <div class="jogo-actions">
                <button class="btn btn-success btn-small" onclick="confirmarPagamento(${index})">✅ Pago</button>
                <button class="btn btn-warning btn-small" onclick="marcarPendente(${index})">⏳ Pendente</button>
            </div>
        </div>
    `).join('');

    container.innerHTML = html;
}

function confirmarPagamento(index) {
    const participantes = obterDados('participantes') || [];
    participantes[index].pago = true;
    participantes[index].pendente_pagamento = false;
    participantes[index].data_pagamento = new Date().toISOString();
    salvarDados('participantes', participantes);

    alert(`✅ Pagamento de ${participantes[index].nome} confirmado!`);
    carregarListaPagamentos();
    carregarDashboard();
}

function marcarPendente(index) {
    const participantes = obterDados('participantes') || [];
    participantes[index].pago = false;
    participantes[index].pendente_pagamento = false;
    salvarDados('participantes', participantes);

    alert(`⏳ ${participantes[index].nome} marcado como pendente!`);
    carregarListaPagamentos();
    carregarDashboard();
}

// =====================================
// CONFIGURAÇÕES
// =====================================

function carregarConfiguracoesForm() {
    const config = obterConfiguracao();

    document.getElementById('config-nome').value = config.nome_bolao;
    document.getElementById('config-valor').value = config.valor_palpite;
    document.getElementById('config-pix').value = config.chave_pix;
    document.getElementById('config-recebedor').value = config.recebedor_pix;
    document.getElementById('config-premio').value = config.texto_premio || '';

    document.getElementById('pontos-resultado').value = config.pontos_resultado;
    document.getElementById('pontos-empate').value = config.pontos_empate;
    document.getElementById('pontos-exato').value = config.pontos_exato;
}

function salvarConfiguracao(event) {
    event.preventDefault();

    let config = obterConfiguracao();

    config.nome_bolao = document.getElementById('config-nome').value;
    config.valor_palpite = parseFloat(document.getElementById('config-valor').value) || 10;
    config.chave_pix = document.getElementById('config-pix').value;
    config.recebedor_pix = document.getElementById('config-recebedor').value;
    config.texto_premio = document.getElementById('config-premio').value;

    salvarDados('config', config);
    alert('✅ Configurações salvas!');
}

function salvarPontuacao(event) {
    event.preventDefault();

    let config = obterConfiguracao();

    config.pontos_resultado = parseInt(document.getElementById('pontos-resultado').value);
    config.pontos_empate = parseInt(document.getElementById('pontos-empate').value);
    config.pontos_exato = parseInt(document.getElementById('pontos-exato').value);

    salvarDados('config', config);
    recalcularPontos();
    alert('✅ Pontuação atualizada!');
}

// =====================================
// FERRAMENTAS
// =====================================

function exportarDados() {
    const dados = {
        config: obterConfiguracao(),
        participantes: obterDados('participantes') || [],
        palpites: obterDados('palpites') || [],
        jogos: obterDados('jogos') || []
    };

    const json = JSON.stringify(dados, null, 2);
    baixarArquivo('bolao-backup.json', json, 'application/json');
    alert('✅ Dados exportados!');
}
