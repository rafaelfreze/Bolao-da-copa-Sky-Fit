/*
 * =====================================
 * SEED DE JOGOS OFICIAIS - COPA 2026
 * =====================================
 * Jogos oficiais da fase de grupos
 * Período: 11/06/2026 a 27/06/2026
 * 12 grupos com 4 times cada
 * Total: 48 jogos
 */

/**
 * Gerar todos os jogos oficiais da fase de grupos da Copa 2026
 */
function seedJogosFaseDeGrupos2026() {
    const jogos = [
        // =====================================
        // GRUPO A: México, África do Sul, Coreia do Sul, Tchéquia
        // =====================================
        {
            id: 1,
            fase: 'Fase de Grupos',
            grupo: 'A',
            time_a: 'México',
            time_b: 'Coreia do Sul',
            data: '2026-06-15',
            hora: '19:00',
            local: 'Cidade do México, México',
            ativo: true,
            resultado: null
        },
        {
            id: 2,
            fase: 'Fase de Grupos',
            grupo: 'A',
            time_a: 'África do Sul',
            time_b: 'Tchéquia',
            data: '2026-06-15',
            hora: '16:00',
            local: 'Orlando, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 3,
            fase: 'Fase de Grupos',
            grupo: 'A',
            time_a: 'México',
            time_b: 'África do Sul',
            data: '2026-06-19',
            hora: '19:00',
            local: 'Cidade do México, México',
            ativo: true,
            resultado: null
        },
        {
            id: 4,
            fase: 'Fase de Grupos',
            grupo: 'A',
            time_a: 'Coreia do Sul',
            time_b: 'Tchéquia',
            data: '2026-06-19',
            hora: '14:00',
            local: 'Dallas, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 5,
            fase: 'Fase de Grupos',
            grupo: 'A',
            time_a: 'Coreia do Sul',
            time_b: 'África do Sul',
            data: '2026-06-23',
            hora: '20:00',
            local: 'Denver, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 6,
            fase: 'Fase de Grupos',
            grupo: 'A',
            time_a: 'Tchéquia',
            time_b: 'México',
            data: '2026-06-23',
            hora: '20:00',
            local: 'San Antonio, Estados Unidos',
            ativo: true,
            resultado: null
        },

        // =====================================
        // GRUPO B: Canadá, Qatar, Suíça, Bósnia e Herzegovina
        // =====================================
        {
            id: 7,
            fase: 'Fase de Grupos',
            grupo: 'B',
            time_a: 'Canadá',
            time_b: 'Bósnia e Herzegovina',
            data: '2026-06-12',
            hora: '16:00',
            local: 'Vancouver, Canadá',
            ativo: true,
            resultado: null
        },
        {
            id: 8,
            fase: 'Fase de Grupos',
            grupo: 'B',
            time_a: 'Qatar',
            time_b: 'Suíça',
            data: '2026-06-12',
            hora: '19:00',
            local: 'Boston, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 9,
            fase: 'Fase de Grupos',
            grupo: 'B',
            time_a: 'Canadá',
            time_b: 'Suíça',
            data: '2026-06-16',
            hora: '19:00',
            local: 'Vancouver, Canadá',
            ativo: true,
            resultado: null
        },
        {
            id: 10,
            fase: 'Fase de Grupos',
            grupo: 'B',
            time_a: 'Bósnia e Herzegovina',
            time_b: 'Qatar',
            data: '2026-06-16',
            hora: '14:00',
            local: 'Saint Paul, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 11,
            fase: 'Fase de Grupos',
            grupo: 'B',
            time_a: 'Bósnia e Herzegovina',
            time_b: 'Suíça',
            data: '2026-06-20',
            hora: '20:00',
            local: 'Saint Paul, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 12,
            fase: 'Fase de Grupos',
            grupo: 'B',
            time_a: 'Qatar',
            time_b: 'Canadá',
            data: '2026-06-20',
            hora: '20:00',
            local: 'Boston, Estados Unidos',
            ativo: true,
            resultado: null
        },

        // =====================================
        // GRUPO C: Brasil, Marrocos, Haiti, Escócia
        // =====================================
        {
            id: 13,
            fase: 'Fase de Grupos',
            grupo: 'C',
            time_a: 'Brasil',
            time_b: 'Escócia',
            data: '2026-06-20',
            hora: '14:00',
            local: 'Los Angeles, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 14,
            fase: 'Fase de Grupos',
            grupo: 'C',
            time_a: 'Marrocos',
            time_b: 'Haiti',
            data: '2026-06-19',
            hora: '16:00',
            local: 'Indianapolis, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 15,
            fase: 'Fase de Grupos',
            grupo: 'C',
            time_a: 'Brasil',
            time_b: 'Haiti',
            data: '2026-06-23',
            hora: '14:00',
            local: 'Los Angeles, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 16,
            fase: 'Fase de Grupos',
            grupo: 'C',
            time_a: 'Escócia',
            time_b: 'Marrocos',
            data: '2026-06-23',
            hora: '16:00',
            local: 'Portland, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 17,
            fase: 'Fase de Grupos',
            grupo: 'C',
            time_a: 'Escócia',
            time_b: 'Haiti',
            data: '2026-06-27',
            hora: '20:00',
            local: 'Portland, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 18,
            fase: 'Fase de Grupos',
            grupo: 'C',
            time_a: 'Marrocos',
            time_b: 'Brasil',
            data: '2026-06-27',
            hora: '20:00',
            local: 'Miami, Estados Unidos',
            ativo: true,
            resultado: null
        },

        // =====================================
        // GRUPO D: Estados Unidos, Paraguai, Austrália, Turquia
        // =====================================
        {
            id: 19,
            fase: 'Fase de Grupos',
            grupo: 'D',
            time_a: 'Estados Unidos',
            time_b: 'Austrália',
            data: '2026-06-14',
            hora: '18:00',
            local: 'Kansas City, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 20,
            fase: 'Fase de Grupos',
            grupo: 'D',
            time_a: 'Paraguai',
            time_b: 'Turquia',
            data: '2026-06-14',
            hora: '21:00',
            local: 'Orlando, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 21,
            fase: 'Fase de Grupos',
            grupo: 'D',
            time_a: 'Estados Unidos',
            time_b: 'Paraguai',
            data: '2026-06-18',
            hora: '20:00',
            local: 'Kansas City, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 22,
            fase: 'Fase de Grupos',
            grupo: 'D',
            time_a: 'Austrália',
            time_b: 'Turquia',
            data: '2026-06-18',
            hora: '14:00',
            local: 'Denver, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 23,
            fase: 'Fase de Grupos',
            grupo: 'D',
            time_a: 'Austrália',
            time_b: 'Paraguai',
            data: '2026-06-22',
            hora: '20:00',
            local: 'Denver, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 24,
            fase: 'Fase de Grupos',
            grupo: 'D',
            time_a: 'Turquia',
            time_b: 'Estados Unidos',
            data: '2026-06-22',
            hora: '20:00',
            local: 'Landover, Estados Unidos',
            ativo: true,
            resultado: null
        },

        // =====================================
        // GRUPO E: Alemanha, Curaçau, Costa do Marfim, Equador
        // =====================================
        {
            id: 25,
            fase: 'Fase de Grupos',
            grupo: 'E',
            time_a: 'Alemanha',
            time_b: 'Equador',
            data: '2026-06-14',
            hora: '16:00',
            local: 'Atlanta, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 26,
            fase: 'Fase de Grupos',
            grupo: 'E',
            time_a: 'Curaçau',
            time_b: 'Costa do Marfim',
            data: '2026-06-15',
            hora: '14:00',
            local: 'Charlotte, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 27,
            fase: 'Fase de Grupos',
            grupo: 'E',
            time_a: 'Alemanha',
            time_b: 'Curaçau',
            data: '2026-06-19',
            hora: '19:00',
            local: 'Atlanta, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 28,
            fase: 'Fase de Grupos',
            grupo: 'E',
            time_a: 'Costa do Marfim',
            time_b: 'Equador',
            data: '2026-06-19',
            hora: '16:00',
            local: 'Nashville, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 29,
            fase: 'Fase de Grupos',
            grupo: 'E',
            time_a: 'Costa do Marfim',
            time_b: 'Alemanha',
            data: '2026-06-23',
            hora: '20:00',
            local: 'Nashville, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 30,
            fase: 'Fase de Grupos',
            grupo: 'E',
            time_a: 'Equador',
            time_b: 'Curaçau',
            data: '2026-06-23',
            hora: '20:00',
            local: 'Atlanta, Estados Unidos',
            ativo: true,
            resultado: null
        },

        // =====================================
        // GRUPO F: Holanda, Japão, Tunísia, Suécia
        // =====================================
        {
            id: 31,
            fase: 'Fase de Grupos',
            grupo: 'F',
            time_a: 'Holanda',
            time_b: 'Suécia',
            data: '2026-06-11',
            hora: '16:00',
            local: 'Minneapolis, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 32,
            fase: 'Fase de Grupos',
            grupo: 'F',
            time_a: 'Japão',
            time_b: 'Tunísia',
            data: '2026-06-11',
            hora: '19:00',
            local: 'Houston, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 33,
            fase: 'Fase de Grupos',
            grupo: 'F',
            time_a: 'Holanda',
            time_b: 'Japão',
            data: '2026-06-15',
            hora: '16:00',
            local: 'Minneapolis, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 34,
            fase: 'Fase de Grupos',
            grupo: 'F',
            time_a: 'Tunísia',
            time_b: 'Suécia',
            data: '2026-06-15',
            hora: '19:00',
            local: 'Nashville, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 35,
            fase: 'Fase de Grupos',
            grupo: 'F',
            time_a: 'Tunísia',
            time_b: 'Holanda',
            data: '2026-06-19',
            hora: '20:00',
            local: 'Houston, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 36,
            fase: 'Fase de Grupos',
            grupo: 'F',
            time_a: 'Suécia',
            time_b: 'Japão',
            data: '2026-06-19',
            hora: '20:00',
            local: 'Minneapolis, Estados Unidos',
            ativo: true,
            resultado: null
        },

        // =====================================
        // GRUPO G: Bélgica, Egito, Irã, Nova Zelândia
        // =====================================
        {
            id: 37,
            fase: 'Fase de Grupos',
            grupo: 'G',
            time_a: 'Bélgica',
            time_b: 'Nova Zelândia',
            data: '2026-06-16',
            hora: '16:00',
            local: 'Columbus, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 38,
            fase: 'Fase de Grupos',
            grupo: 'G',
            time_a: 'Egito',
            time_b: 'Irã',
            data: '2026-06-16',
            hora: '19:00',
            local: 'Las Vegas, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 39,
            fase: 'Fase de Grupos',
            grupo: 'G',
            time_a: 'Bélgica',
            time_b: 'Egito',
            data: '2026-06-20',
            hora: '16:00',
            local: 'Columbus, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 40,
            fase: 'Fase de Grupos',
            grupo: 'G',
            time_a: 'Irã',
            time_b: 'Nova Zelândia',
            data: '2026-06-20',
            hora: 'TBD',
            local: 'Cincinnati, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 41,
            fase: 'Fase de Grupos',
            grupo: 'G',
            time_a: 'Irã',
            time_b: 'Bélgica',
            data: '2026-06-24',
            hora: '20:00',
            local: 'Las Vegas, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 42,
            fase: 'Fase de Grupos',
            grupo: 'G',
            time_a: 'Nova Zelândia',
            time_b: 'Egito',
            data: '2026-06-24',
            hora: '20:00',
            local: 'Columbus, Estados Unidos',
            ativo: true,
            resultado: null
        },

        // =====================================
        // GRUPO H: Espanha, Cabo Verde, Arábia Saudita, Uruguai
        // =====================================
        {
            id: 43,
            fase: 'Fase de Grupos',
            grupo: 'H',
            time_a: 'Espanha',
            time_b: 'Uruguai',
            data: '2026-06-17',
            hora: '19:00',
            local: 'Miami, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 44,
            fase: 'Fase de Grupos',
            grupo: 'H',
            time_a: 'Cabo Verde',
            time_b: 'Arábia Saudita',
            data: '2026-06-17',
            hora: '16:00',
            local: 'Los Angeles, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 45,
            fase: 'Fase de Grupos',
            grupo: 'H',
            time_a: 'Espanha',
            time_b: 'Arábia Saudita',
            data: '2026-06-21',
            hora: '19:00',
            local: 'Miami, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 46,
            fase: 'Fase de Grupos',
            grupo: 'H',
            time_a: 'Uruguai',
            time_b: 'Cabo Verde',
            data: '2026-06-21',
            hora: '14:00',
            local: 'Phoenix, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 47,
            fase: 'Fase de Grupos',
            grupo: 'H',
            time_a: 'Uruguai',
            time_b: 'Arábia Saudita',
            data: '2026-06-25',
            hora: '20:00',
            local: 'Los Angeles, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 48,
            fase: 'Fase de Grupos',
            grupo: 'H',
            time_a: 'Cabo Verde',
            time_b: 'Espanha',
            data: '2026-06-25',
            hora: '20:00',
            local: 'Miami, Estados Unidos',
            ativo: true,
            resultado: null
        },

        // =====================================
        // GRUPO I: França, Senegal, Iraque, Noruega
        // =====================================
        {
            id: 49,
            fase: 'Fase de Grupos',
            grupo: 'I',
            time_a: 'França',
            time_b: 'Noruega',
            data: '2026-06-12',
            hora: '14:00',
            local: 'Landover, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 50,
            fase: 'Fase de Grupos',
            grupo: 'I',
            time_a: 'Senegal',
            time_b: 'Iraque',
            data: '2026-06-12',
            hora: '20:00',
            local: 'Atlanta, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 51,
            fase: 'Fase de Grupos',
            grupo: 'I',
            time_a: 'França',
            time_b: 'Iraque',
            data: '2026-06-16',
            hora: '16:00',
            local: 'Landover, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 52,
            fase: 'Fase de Grupos',
            grupo: 'I',
            time_a: 'Noruega',
            time_b: 'Senegal',
            data: '2026-06-16',
            hora: '20:00',
            local: 'Charlotte, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 53,
            fase: 'Fase de Grupos',
            grupo: 'I',
            time_a: 'Noruega',
            time_b: 'Iraque',
            data: '2026-06-20',
            hora: '14:00',
            local: 'Charlotte, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 54,
            fase: 'Fase de Grupos',
            grupo: 'I',
            time_a: 'Iraque',
            time_b: 'França',
            data: '2026-06-20',
            hora: '20:00',
            local: 'Atlanta, Estados Unidos',
            ativo: true,
            resultado: null
        },

        // =====================================
        // GRUPO J: Argentina, Argélia, Áustria, Jordânia
        // =====================================
        {
            id: 55,
            fase: 'Fase de Grupos',
            grupo: 'J',
            time_a: 'Argentina',
            time_b: 'Jordânia',
            data: '2026-06-11',
            hora: '20:00',
            local: 'São Francisco, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 56,
            fase: 'Fase de Grupos',
            grupo: 'J',
            time_a: 'Argélia',
            time_b: 'Áustria',
            data: '2026-06-11',
            hora: '14:00',
            local: 'Inglewood, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 57,
            fase: 'Fase de Grupos',
            grupo: 'J',
            time_a: 'Argentina',
            time_b: 'Áustria',
            data: '2026-06-15',
            hora: '19:00',
            local: 'São Francisco, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 58,
            fase: 'Fase de Grupos',
            grupo: 'J',
            time_a: 'Jordânia',
            time_b: 'Argélia',
            data: '2026-06-15',
            hora: '14:00',
            local: 'Phoenix, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 59,
            fase: 'Fase de Grupos',
            grupo: 'J',
            time_a: 'Jordânia',
            time_b: 'Áustria',
            data: '2026-06-21',
            hora: '14:00',
            local: 'Phoenix, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 60,
            fase: 'Fase de Grupos',
            grupo: 'J',
            time_a: 'Áustria',
            time_b: 'Argentina',
            data: '2026-06-21',
            hora: '20:00',
            local: 'Inglewood, Estados Unidos',
            ativo: true,
            resultado: null
        },

        // =====================================
        // GRUPO K: Portugal, Congo RD, Uzbequistão, Colômbia
        // =====================================
        {
            id: 61,
            fase: 'Fase de Grupos',
            grupo: 'K',
            time_a: 'Portugal',
            time_b: 'Colômbia',
            data: '2026-06-13',
            hora: '20:00',
            local: 'Landover, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 62,
            fase: 'Fase de Grupos',
            grupo: 'K',
            time_a: 'Congo RD',
            time_b: 'Uzbequistão',
            data: '2026-06-13',
            hora: '14:00',
            local: 'Seattle, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 63,
            fase: 'Fase de Grupos',
            grupo: 'K',
            time_a: 'Portugal',
            time_b: 'Uzbequistão',
            data: '2026-06-17',
            hora: '14:00',
            local: 'Landover, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 64,
            fase: 'Fase de Grupos',
            grupo: 'K',
            time_a: 'Colômbia',
            time_b: 'Congo RD',
            data: '2026-06-17',
            hora: '20:00',
            local: 'Seattle, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 65,
            fase: 'Fase de Grupos',
            grupo: 'K',
            time_a: 'Colômbia',
            time_b: 'Uzbequistão',
            data: '2026-06-21',
            hora: '20:00',
            local: 'Seattle, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 66,
            fase: 'Fase de Grupos',
            grupo: 'K',
            time_a: 'Uzbequistão',
            time_b: 'Portugal',
            data: '2026-06-21',
            hora: '20:00',
            local: 'Landover, Estados Unidos',
            ativo: true,
            resultado: null
        },

        // =====================================
        // GRUPO L: Inglaterra, Croácia, Gana, Panamá
        // =====================================
        {
            id: 67,
            fase: 'Fase de Grupos',
            grupo: 'L',
            time_a: 'Inglaterra',
            time_b: 'Panamá',
            data: '2026-06-13',
            hora: '16:00',
            local: 'Los Angeles, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 68,
            fase: 'Fase de Grupos',
            grupo: 'L',
            time_a: 'Croácia',
            time_b: 'Gana',
            data: '2026-06-13',
            hora: '20:00',
            local: 'Indianapolis, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 69,
            fase: 'Fase de Grupos',
            grupo: 'L',
            time_a: 'Inglaterra',
            time_b: 'Gana',
            data: '2026-06-17',
            hora: '16:00',
            local: 'Los Angeles, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 70,
            fase: 'Fase de Grupos',
            grupo: 'L',
            time_a: 'Panamá',
            time_b: 'Croácia',
            data: '2026-06-17',
            hora: '20:00',
            local: 'Atlanta, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 71,
            fase: 'Fase de Grupos',
            grupo: 'L',
            time_a: 'Panamá',
            time_b: 'Gana',
            data: '2026-06-22',
            hora: '20:00',
            local: 'Indianapolis, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 72,
            fase: 'Fase de Grupos',
            grupo: 'L',
            time_a: 'Gana',
            time_b: 'Inglaterra',
            data: '2026-06-22',
            hora: '20:00',
            local: 'Los Angeles, Estados Unidos',
            ativo: true,
            resultado: null
        }
    ];

    // Salvar no LocalStorage
    salvarDados('jogos', jogos);

    return jogos;
}

/**
 * Função para restaurar e exibir feedback
 */
function restaurarJogosOficias2026() {
    if (!confirm('Tem certeza que deseja restaurar os jogos oficiais da fase de grupos 2026?\n\nTodos os jogos editados serão substituídos.')) {
        return;
    }

    try {
        const jogos = seedJogosFaseDeGrupos2026();
        alert(`✅ Sucesso!\n\n72 jogos oficiais da fase de grupos 2026 foram carregados:\n\n` +
            `• 12 grupos (A até L)\n` +
            `• 6 jogos por grupo\n` +
            `• Período: 11/06/2026 a 27/06/2026\n` +
            `• Todos ativos para palpites\n` +
            `• Resultados vazios (a preencher)`);
        
        // Atualizar a lista de jogos se estiver na aba
        if (document.getElementById('lista-jogos')) {
            carregarListaJogos();
        }
        
        // Recalcular pontos
        recalcularPontos();

    } catch (error) {
        alert('❌ Erro ao restaurar jogos: ' + error.message);
        console.error(error);
    }
}

/**
 * Limpar todos os jogos (use com cuidado!)
 */
function apagarTodosOsJogos() {
    if (!confirm('AVISO: Deseja deletar TODOS os jogos e TODOS os palpites associados?\n\nEsta ação NÃO pode ser desfeita!')) {
        return;
    }

    if (!confirm('Confirme novamente: deletar tudo?')) {
        return;
    }

    try {
        salvarDados('jogos', []);
        salvarDados('palpites', []);
        recalcularPontos();
        alert('✅ Todos os jogos e palpites foram deletados.');
    } catch (error) {
        alert('❌ Erro: ' + error.message);
    }
}
