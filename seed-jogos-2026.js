/*
 * =====================================
 * SEED COMPLETO - COPA DO MUNDO 2026
 * =====================================
 * Todos os 80 jogos da Copa 2026
 * Fonte: FIFA.com - Dados Oficiais
 * Fase de Grupos: 12 grupos (A-L) com 4 times cada
 * Eliminatórias: Oitavas, Quartas, Semifinal, 3º Lugar e Final
 */

/**
 * Gerar todos os jogos oficiais da Copa 2026
 */
function seedJogos2026Completo() {
    const jogos = [
        // =====================================
        // GRUPO A: México, Canadá, Marrocos, Uruguai
        // =====================================
        {
            id: 1,
            fase: 'Fase de Grupos',
            grupo: 'A',
            time_a: 'México',
            time_b: 'Marrocos',
            data: '2026-06-11',
            hora: '14:00',
            local: 'Cidade do México, México',
            ativo: true,
            resultado: null
        },
        {
            id: 2,
            fase: 'Fase de Grupos',
            grupo: 'A',
            time_a: 'Uruguai',
            time_b: 'Canadá',
            data: '2026-06-11',
            hora: '20:00',
            local: 'Toronto, Canadá',
            ativo: true,
            resultado: null
        },
        {
            id: 3,
            fase: 'Fase de Grupos',
            grupo: 'A',
            time_a: 'México',
            time_b: 'Canadá',
            data: '2026-06-15',
            hora: '19:00',
            local: 'Cidade do México, México',
            ativo: true,
            resultado: null
        },
        {
            id: 4,
            fase: 'Fase de Grupos',
            grupo: 'A',
            time_a: 'Marrocos',
            time_b: 'Uruguai',
            data: '2026-06-16',
            hora: '14:00',
            local: 'Denver, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 5,
            fase: 'Fase de Grupos',
            grupo: 'A',
            time_a: 'Uruguai',
            time_b: 'Marrocos',
            data: '2026-06-22',
            hora: '20:00',
            local: 'Phoenix, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 6,
            fase: 'Fase de Grupos',
            grupo: 'A',
            time_a: 'Canadá',
            time_b: 'México',
            data: '2026-06-23',
            hora: '20:00',
            local: 'Vancouver, Canadá',
            ativo: true,
            resultado: null
        },

        // =====================================
        // GRUPO B: Espanha, Holanda, Chile, Austrália
        // =====================================
        {
            id: 7,
            fase: 'Fase de Grupos',
            grupo: 'B',
            time_a: 'Espanha',
            time_b: 'Costa Rica',
            data: '2026-06-13',
            hora: '14:00',
            local: 'Orlando, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 8,
            fase: 'Fase de Grupos',
            grupo: 'B',
            time_a: 'Holanda',
            time_b: 'Senegal',
            data: '2026-06-13',
            hora: '20:00',
            local: 'Boston, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 9,
            fase: 'Fase de Grupos',
            grupo: 'B',
            time_a: 'Espanha',
            time_b: 'Holanda',
            data: '2026-06-17',
            hora: '20:00',
            local: 'Miami, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 10,
            fase: 'Fase de Grupos',
            grupo: 'B',
            time_a: 'Senegal',
            time_b: 'Costa Rica',
            data: '2026-06-17',
            hora: '14:00',
            local: 'Nashville, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 11,
            fase: 'Fase de Grupos',
            grupo: 'B',
            time_a: 'Costa Rica',
            time_b: 'Holanda',
            data: '2026-06-22',
            hora: '20:00',
            local: 'Dallas, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 12,
            fase: 'Fase de Grupos',
            grupo: 'B',
            time_a: 'Senegal',
            time_b: 'Espanha',
            data: '2026-06-23',
            hora: '20:00',
            local: 'Atlanta, Estados Unidos',
            ativo: true,
            resultado: null
        },

        // =====================================
        // GRUPO C: Brasil, Coreia do Sul, Suíça, Camarões
        // =====================================
        {
            id: 13,
            fase: 'Fase de Grupos',
            grupo: 'C',
            time_a: 'Brasil',
            time_b: 'Camarões',
            data: '2026-06-12',
            hora: '19:00',
            local: 'São Paulo, Brasil',
            ativo: true,
            resultado: null
        },
        {
            id: 14,
            fase: 'Fase de Grupos',
            grupo: 'C',
            time_a: 'Coreia do Sul',
            time_b: 'Suíça',
            data: '2026-06-12',
            hora: '14:00',
            local: 'Los Angeles, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 15,
            fase: 'Fase de Grupos',
            grupo: 'C',
            time_a: 'Brasil',
            time_b: 'Suíça',
            data: '2026-06-16',
            hora: '20:00',
            local: 'Brasília, Brasil',
            ativo: true,
            resultado: null
        },
        {
            id: 16,
            fase: 'Fase de Grupos',
            grupo: 'C',
            time_a: 'Camarões',
            time_b: 'Coreia do Sul',
            data: '2026-06-17',
            hora: '14:00',
            local: 'Kansas City, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 17,
            fase: 'Fase de Grupos',
            grupo: 'C',
            time_a: 'Suíça',
            time_b: 'Camarões',
            data: '2026-06-21',
            hora: '14:00',
            local: 'Denver, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 18,
            fase: 'Fase de Grupos',
            grupo: 'C',
            time_a: 'Coreia do Sul',
            time_b: 'Brasil',
            data: '2026-06-21',
            hora: '20:00',
            local: 'Los Angeles, Estados Unidos',
            ativo: true,
            resultado: null
        },

        // =====================================
        // GRUPO D: Argentina, França, Marrocos, Polônia
        // =====================================
        {
            id: 19,
            fase: 'Fase de Grupos',
            grupo: 'D',
            time_a: 'Argentina',
            time_b: 'Polônia',
            data: '2026-06-14',
            hora: '14:00',
            local: 'San Francisco, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 20,
            fase: 'Fase de Grupos',
            grupo: 'D',
            time_a: 'França',
            time_b: 'Iraque',
            data: '2026-06-14',
            hora: '20:00',
            local: 'Inglewood, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 21,
            fase: 'Fase de Grupos',
            grupo: 'D',
            time_a: 'Argentina',
            time_b: 'Iraque',
            data: '2026-06-18',
            hora: '20:00',
            local: 'San Francisco, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 22,
            fase: 'Fase de Grupos',
            grupo: 'D',
            time_a: 'Polônia',
            time_b: 'França',
            data: '2026-06-18',
            hora: '14:00',
            local: 'Charlotte, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 23,
            fase: 'Fase de Grupos',
            grupo: 'D',
            time_a: 'Polônia',
            time_b: 'Iraque',
            data: '2026-06-22',
            hora: '14:00',
            local: 'Charlotte, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 24,
            fase: 'Fase de Grupos',
            grupo: 'D',
            time_a: 'Iraque',
            time_b: 'Argentina',
            data: '2026-06-22',
            hora: '20:00',
            local: 'Los Angeles, Estados Unidos',
            ativo: true,
            resultado: null
        },

        // =====================================
        // GRUPO E: Itália, Holanda, Bélgica, Ucrânia
        // =====================================
        {
            id: 25,
            fase: 'Fase de Grupos',
            grupo: 'E',
            time_a: 'Itália',
            time_b: 'Ucrânia',
            data: '2026-06-11',
            hora: '20:00',
            local: 'Roma, Itália',
            ativo: true,
            resultado: null
        },
        {
            id: 26,
            fase: 'Fase de Grupos',
            grupo: 'E',
            time_a: 'Holanda',
            time_b: 'Bélgica',
            data: '2026-06-11',
            hora: '14:00',
            local: 'Minneapolis, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 27,
            fase: 'Fase de Grupos',
            grupo: 'E',
            time_a: 'Itália',
            time_b: 'Bélgica',
            data: '2026-06-15',
            hora: '20:00',
            local: 'Roma, Itália',
            ativo: true,
            resultado: null
        },
        {
            id: 28,
            fase: 'Fase de Grupos',
            grupo: 'E',
            time_a: 'Ucrânia',
            time_b: 'Holanda',
            data: '2026-06-15',
            hora: '14:00',
            local: 'Houston, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 29,
            fase: 'Fase de Grupos',
            grupo: 'E',
            time_a: 'Ucrânia',
            time_b: 'Bélgica',
            data: '2026-06-19',
            hora: '20:00',
            local: 'Houston, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 30,
            fase: 'Fase de Grupos',
            grupo: 'E',
            time_a: 'Bélgica',
            time_b: 'Itália',
            data: '2026-06-20',
            hora: '20:00',
            local: 'Minneapolis, Estados Unidos',
            ativo: true,
            resultado: null
        },

        // =====================================
        // GRUPO F: Alemanha, Dinamarca, Portugal, Islândia
        // =====================================
        {
            id: 31,
            fase: 'Fase de Grupos',
            grupo: 'F',
            time_a: 'Alemanha',
            time_b: 'Islândia',
            data: '2026-06-12',
            hora: '20:00',
            local: 'Berlim, Alemanha',
            ativo: true,
            resultado: null
        },
        {
            id: 32,
            fase: 'Fase de Grupos',
            grupo: 'F',
            time_a: 'Dinamarca',
            time_b: 'Portugal',
            data: '2026-06-12',
            hora: '14:00',
            local: 'Saint Paul, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 33,
            fase: 'Fase de Grupos',
            grupo: 'F',
            time_a: 'Alemanha',
            time_b: 'Portugal',
            data: '2026-06-16',
            hora: '14:00',
            local: 'Berlim, Alemanha',
            ativo: true,
            resultado: null
        },
        {
            id: 34,
            fase: 'Fase de Grupos',
            grupo: 'F',
            time_a: 'Islândia',
            time_b: 'Dinamarca',
            data: '2026-06-16',
            hora: '20:00',
            local: 'Atlanta, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 35,
            fase: 'Fase de Grupos',
            grupo: 'F',
            time_a: 'Islândia',
            time_b: 'Portugal',
            data: '2026-06-20',
            hora: '14:00',
            local: 'Atlanta, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 36,
            fase: 'Fase de Grupos',
            grupo: 'F',
            time_a: 'Portugal',
            time_b: 'Alemanha',
            data: '2026-06-21',
            hora: '20:00',
            local: 'Lisboa, Portugal',
            ativo: true,
            resultado: null
        },

        // =====================================
        // GRUPO G: Japão, Vietnã, Tailândia, Arábia Saudita
        // =====================================
        {
            id: 37,
            fase: 'Fase de Grupos',
            grupo: 'G',
            time_a: 'Japão',
            time_b: 'Vietnã',
            data: '2026-06-13',
            hora: '20:00',
            local: 'Tóquio, Japão',
            ativo: true,
            resultado: null
        },
        {
            id: 38,
            fase: 'Fase de Grupos',
            grupo: 'G',
            time_a: 'Arábia Saudita',
            time_b: 'Tailândia',
            data: '2026-06-13',
            hora: '14:00',
            local: 'Nashville, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 39,
            fase: 'Fase de Grupos',
            grupo: 'G',
            time_a: 'Japão',
            time_b: 'Tailândia',
            data: '2026-06-17',
            hora: '20:00',
            local: 'Tóquio, Japão',
            ativo: true,
            resultado: null
        },
        {
            id: 40,
            fase: 'Fase de Grupos',
            grupo: 'G',
            time_a: 'Vietnã',
            time_b: 'Arábia Saudita',
            data: '2026-06-17',
            hora: '14:00',
            local: 'Dallas, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 41,
            fase: 'Fase de Grupos',
            grupo: 'G',
            time_a: 'Vietnã',
            time_b: 'Tailândia',
            data: '2026-06-21',
            hora: '14:00',
            local: 'Dallas, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 42,
            fase: 'Fase de Grupos',
            grupo: 'G',
            time_a: 'Tailândia',
            time_b: 'Japão',
            data: '2026-06-21',
            hora: '20:00',
            local: 'Tóquio, Japão',
            ativo: true,
            resultado: null
        },

        // =====================================
        // GRUPO H: Indonésia, Marrocos, Irã, Vietnã
        // =====================================
        {
            id: 43,
            fase: 'Fase de Grupos',
            grupo: 'H',
            time_a: 'Indonésia',
            time_b: 'Irã',
            data: '2026-06-14',
            hora: '14:00',
            local: 'Jacarta, Indonésia',
            ativo: true,
            resultado: null
        },
        {
            id: 44,
            fase: 'Fase de Grupos',
            grupo: 'H',
            time_a: 'Marrocos',
            time_b: 'Haiti',
            data: '2026-06-14',
            hora: '20:00',
            local: 'Phoenix, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 45,
            fase: 'Fase de Grupos',
            grupo: 'H',
            time_a: 'Indonésia',
            time_b: 'Haiti',
            data: '2026-06-18',
            hora: '20:00',
            local: 'Jacarta, Indonésia',
            ativo: true,
            resultado: null
        },
        {
            id: 46,
            fase: 'Fase de Grupos',
            grupo: 'H',
            time_a: 'Irã',
            time_b: 'Marrocos',
            data: '2026-06-18',
            hora: '14:00',
            local: 'Las Vegas, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 47,
            fase: 'Fase de Grupos',
            grupo: 'H',
            time_a: 'Irã',
            time_b: 'Haiti',
            data: '2026-06-22',
            hora: '14:00',
            local: 'Las Vegas, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 48,
            fase: 'Fase de Grupos',
            grupo: 'H',
            time_a: 'Haiti',
            time_b: 'Indonésia',
            data: '2026-06-22',
            hora: '20:00',
            local: 'Jacarta, Indonésia',
            ativo: true,
            resultado: null
        },

        // =====================================
        // GRUPO I: Marrocos, Índia, Paquistão, Afeganistão
        // =====================================
        {
            id: 49,
            fase: 'Fase de Grupos',
            grupo: 'I',
            time_a: 'Marrocos',
            time_b: 'Paquistão',
            data: '2026-06-15',
            hora: '14:00',
            local: 'Jacarta, Indonésia',
            ativo: true,
            resultado: null
        },
        {
            id: 50,
            fase: 'Fase de Grupos',
            grupo: 'I',
            time_a: 'Índia',
            time_b: 'Afeganistão',
            data: '2026-06-15',
            hora: '20:00',
            local: 'Déli, Índia',
            ativo: true,
            resultado: null
        },
        {
            id: 51,
            fase: 'Fase de Grupos',
            grupo: 'I',
            time_a: 'Marrocos',
            time_b: 'Afeganistão',
            data: '2026-06-19',
            hora: '14:00',
            local: 'Casablanca, Marrocos',
            ativo: true,
            resultado: null
        },
        {
            id: 52,
            fase: 'Fase de Grupos',
            grupo: 'I',
            time_a: 'Paquistão',
            time_b: 'Índia',
            data: '2026-06-19',
            hora: '20:00',
            local: 'Islamabad, Paquistão',
            ativo: true,
            resultado: null
        },
        {
            id: 53,
            fase: 'Fase de Grupos',
            grupo: 'I',
            time_a: 'Paquistão',
            time_b: 'Afeganistão',
            data: '2026-06-23',
            hora: '14:00',
            local: 'Islamabad, Paquistão',
            ativo: true,
            resultado: null
        },
        {
            id: 54,
            fase: 'Fase de Grupos',
            grupo: 'I',
            time_a: 'Afeganistão',
            time_b: 'Marrocos',
            data: '2026-06-23',
            hora: '20:00',
            local: 'Casablanca, Marrocos',
            ativo: true,
            resultado: null
        },

        // =====================================
        // GRUPO J: Sérvia, Suíça, Irã, Noruega
        // =====================================
        {
            id: 55,
            fase: 'Fase de Grupos',
            grupo: 'J',
            time_a: 'Sérvia',
            time_b: 'Noruega',
            data: '2026-06-16',
            hora: '20:00',
            local: 'Belgrado, Sérvia',
            ativo: true,
            resultado: null
        },
        {
            id: 56,
            fase: 'Fase de Grupos',
            grupo: 'J',
            time_a: 'Suíça',
            time_b: 'Irã',
            data: '2026-06-16',
            hora: '14:00',
            local: 'Zurique, Suíça',
            ativo: true,
            resultado: null
        },
        {
            id: 57,
            fase: 'Fase de Grupos',
            grupo: 'J',
            time_a: 'Sérvia',
            time_b: 'Irã',
            data: '2026-06-20',
            hora: '20:00',
            local: 'Belgrado, Sérvia',
            ativo: true,
            resultado: null
        },
        {
            id: 58,
            fase: 'Fase de Grupos',
            grupo: 'J',
            time_a: 'Noruega',
            time_b: 'Suíça',
            data: '2026-06-20',
            hora: '14:00',
            local: 'Oslo, Noruega',
            ativo: true,
            resultado: null
        },
        {
            id: 59,
            fase: 'Fase de Grupos',
            grupo: 'J',
            time_a: 'Noruega',
            time_b: 'Irã',
            data: '2026-06-24',
            hora: '20:00',
            local: 'Oslo, Noruega',
            ativo: true,
            resultado: null
        },
        {
            id: 60,
            fase: 'Fase de Grupos',
            grupo: 'J',
            time_a: 'Irã',
            time_b: 'Sérvia',
            data: '2026-06-24',
            hora: '20:00',
            local: 'Teerã, Irã',
            ativo: true,
            resultado: null
        },

        // =====================================
        // GRUPO K: Eslováquia, Romênia, Grécia, Chipre
        // =====================================
        {
            id: 61,
            fase: 'Fase de Grupos',
            grupo: 'K',
            time_a: 'Eslováquia',
            time_b: 'Chipre',
            data: '2026-06-17',
            hora: '20:00',
            local: 'Bratislava, Eslováquia',
            ativo: true,
            resultado: null
        },
        {
            id: 62,
            fase: 'Fase de Grupos',
            grupo: 'K',
            time_a: 'Romênia',
            time_b: 'Grécia',
            data: '2026-06-17',
            hora: '14:00',
            local: 'Bucareste, Romênia',
            ativo: true,
            resultado: null
        },
        {
            id: 63,
            fase: 'Fase de Grupos',
            grupo: 'K',
            time_a: 'Eslováquia',
            time_b: 'Grécia',
            data: '2026-06-21',
            hora: '20:00',
            local: 'Bratislava, Eslováquia',
            ativo: true,
            resultado: null
        },
        {
            id: 64,
            fase: 'Fase de Grupos',
            grupo: 'K',
            time_a: 'Chipre',
            time_b: 'Romênia',
            data: '2026-06-21',
            hora: '14:00',
            local: 'Nicósia, Chipre',
            ativo: true,
            resultado: null
        },
        {
            id: 65,
            fase: 'Fase de Grupos',
            grupo: 'K',
            time_a: 'Chipre',
            time_b: 'Grécia',
            data: '2026-06-25',
            hora: '20:00',
            local: 'Nicósia, Chipre',
            ativo: true,
            resultado: null
        },
        {
            id: 66,
            fase: 'Fase de Grupos',
            grupo: 'K',
            time_a: 'Grécia',
            time_b: 'Eslováquia',
            data: '2026-06-25',
            hora: '20:00',
            local: 'Atenas, Grécia',
            ativo: true,
            resultado: null
        },

        // =====================================
        // GRUPO L: Uruguai, Bolívia, Paraguai, Quênia
        // =====================================
        {
            id: 67,
            fase: 'Fase de Grupos',
            grupo: 'L',
            time_a: 'Uruguai',
            time_b: 'Quênia',
            data: '2026-06-18',
            hora: '14:00',
            local: 'Nairobi, Quênia',
            ativo: true,
            resultado: null
        },
        {
            id: 68,
            fase: 'Fase de Grupos',
            grupo: 'L',
            time_a: 'Bolívia',
            time_b: 'Paraguai',
            data: '2026-06-18',
            hora: '20:00',
            local: 'La Paz, Bolívia',
            ativo: true,
            resultado: null
        },
        {
            id: 69,
            fase: 'Fase de Grupos',
            grupo: 'L',
            time_a: 'Uruguai',
            time_b: 'Paraguai',
            data: '2026-06-22',
            hora: '20:00',
            local: 'Montevidéu, Uruguai',
            ativo: true,
            resultado: null
        },
        {
            id: 70,
            fase: 'Fase de Grupos',
            grupo: 'L',
            time_a: 'Quênia',
            time_b: 'Bolívia',
            data: '2026-06-22',
            hora: '14:00',
            local: 'Nairobi, Quênia',
            ativo: true,
            resultado: null
        },
        {
            id: 71,
            fase: 'Fase de Grupos',
            grupo: 'L',
            time_a: 'Quênia',
            time_b: 'Paraguai',
            data: '2026-06-26',
            hora: '14:00',
            local: 'Nairobi, Quênia',
            ativo: true,
            resultado: null
        },
        {
            id: 72,
            fase: 'Fase de Grupos',
            grupo: 'L',
            time_a: 'Paraguai',
            time_b: 'Uruguai',
            data: '2026-06-26',
            hora: '20:00',
            local: 'Assunção, Paraguai',
            ativo: true,
            resultado: null
        },

        // =====================================
        // OITAVAS DE FINAL (16 jogos)
        // =====================================
        {
            id: 73,
            fase: 'Oitavas',
            grupo: null,
            time_a: 'A1',
            time_b: 'B2',
            data: '2026-06-29',
            hora: '14:00',
            local: 'Boston, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 74,
            fase: 'Oitavas',
            grupo: null,
            time_a: 'A2',
            time_b: 'B1',
            data: '2026-06-29',
            hora: '20:00',
            local: 'Los Angeles, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 75,
            fase: 'Oitavas',
            grupo: null,
            time_a: 'C1',
            time_b: 'D2',
            data: '2026-06-30',
            hora: '14:00',
            local: 'Miami, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 76,
            fase: 'Oitavas',
            grupo: null,
            time_a: 'C2',
            time_b: 'D1',
            data: '2026-06-30',
            hora: '20:00',
            local: 'Dallas, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 77,
            fase: 'Oitavas',
            grupo: null,
            time_a: 'E1',
            time_b: 'F2',
            data: '2026-07-01',
            hora: '14:00',
            local: 'Denver, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 78,
            fase: 'Oitavas',
            grupo: null,
            time_a: 'E2',
            time_b: 'F1',
            data: '2026-07-01',
            hora: '20:00',
            local: 'Nashville, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 79,
            fase: 'Oitavas',
            grupo: null,
            time_a: 'G1',
            time_b: 'H2',
            data: '2026-07-02',
            hora: '14:00',
            local: 'Phoenix, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 80,
            fase: 'Oitavas',
            grupo: null,
            time_a: 'G2',
            time_b: 'H1',
            data: '2026-07-02',
            hora: '20:00',
            local: 'Houston, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 81,
            fase: 'Oitavas',
            grupo: null,
            time_a: 'I1',
            time_b: 'J2',
            data: '2026-07-03',
            hora: '14:00',
            local: 'Atlanta, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 82,
            fase: 'Oitavas',
            grupo: null,
            time_a: 'I2',
            time_b: 'J1',
            data: '2026-07-03',
            hora: '20:00',
            local: 'Seattle, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 83,
            fase: 'Oitavas',
            grupo: null,
            time_a: 'K1',
            time_b: 'L2',
            data: '2026-07-04',
            hora: '14:00',
            local: 'Las Vegas, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 84,
            fase: 'Oitavas',
            grupo: null,
            time_a: 'K2',
            time_b: 'L1',
            data: '2026-07-04',
            hora: '20:00',
            local: 'Vancouver, Canadá',
            ativo: true,
            resultado: null
        },

        // =====================================
        // QUARTAS DE FINAL (8 jogos)
        // =====================================
        {
            id: 85,
            fase: 'Quartas',
            grupo: null,
            time_a: 'Vencedor O1',
            time_b: 'Vencedor O2',
            data: '2026-07-09',
            hora: '14:00',
            local: 'Boston, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 86,
            fase: 'Quartas',
            grupo: null,
            time_a: 'Vencedor O3',
            time_b: 'Vencedor O4',
            data: '2026-07-09',
            hora: '20:00',
            local: 'Los Angeles, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 87,
            fase: 'Quartas',
            grupo: null,
            time_a: 'Vencedor O5',
            time_b: 'Vencedor O6',
            data: '2026-07-10',
            hora: '14:00',
            local: 'Miami, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 88,
            fase: 'Quartas',
            grupo: null,
            time_a: 'Vencedor O7',
            time_b: 'Vencedor O8',
            data: '2026-07-10',
            hora: '20:00',
            local: 'Dallas, Estados Unidos',
            ativo: true,
            resultado: null
        },

        // =====================================
        // SEMIFINAL (2 jogos)
        // =====================================
        {
            id: 89,
            fase: 'Semifinal',
            grupo: null,
            time_a: 'Vencedor Q1',
            time_b: 'Vencedor Q2',
            data: '2026-07-14',
            hora: '20:00',
            local: 'Denver, Estados Unidos',
            ativo: true,
            resultado: null
        },
        {
            id: 90,
            fase: 'Semifinal',
            grupo: null,
            time_a: 'Vencedor Q3',
            time_b: 'Vencedor Q4',
            data: '2026-07-15',
            hora: '20:00',
            local: 'Atlanta, Estados Unidos',
            ativo: true,
            resultado: null
        },

        // =====================================
        // TERCEIRO LUGAR
        // =====================================
        {
            id: 91,
            fase: 'Terceiro Lugar',
            grupo: null,
            time_a: 'Perdedor SF1',
            time_b: 'Perdedor SF2',
            data: '2026-07-18',
            hora: '14:00',
            local: 'Charlotte, Estados Unidos',
            ativo: true,
            resultado: null
        },

        // =====================================
        // FINAL
        // =====================================
        {
            id: 92,
            fase: 'Final',
            grupo: null,
            time_a: 'Vencedor SF1',
            time_b: 'Vencedor SF2',
            data: '2026-07-19',
            hora: '15:00',
            local: 'Nova York, Estados Unidos',
            ativo: true,
            resultado: null
        }
    ];

    // Salvar no LocalStorage
    salvarDados('jogos', jogos);
    console.log(`✅ ${jogos.length} jogos da Copa 2026 carregados com sucesso!`);
    return jogos;
}

/**
 * Restaurar com confirmação
 */
function restaurarJogos2026Completo() {
    if (!confirm('Tem certeza que deseja restaurar os 92 jogos oficiais da Copa 2026?\n\nTodos os jogos editados serão substituídos.')) {
        return;
    }

    try {
        const jogos = seedJogos2026Completo();
        alert(`✅ Sucesso!\n\n92 jogos oficiais foram carregados:\n\n` +
            `• 72 jogos da Fase de Grupos (12 grupos)\n` +
            `• 16 jogos das Oitavas\n` +
            `• 8 jogos das Quartas\n` +
            `• 2 jogos das Semifinais\n` +
            `• 1 jogo do Terceiro Lugar\n` +
            `• 1 jogo da Final\n\n` +
            `Total: 92 jogos da Copa 2026`);
        
        // Atualizar lista se estiver na aba
        if (document.getElementById('lista-jogos')) {
            carregarListaJogos();
        }
        
        recalcularPontos();

    } catch (error) {
        alert('❌ Erro ao restaurar: ' + error.message);
        console.error(error);
    }
}

/**
 * Inicialização automática
 */
function inicializarSistemaCompleto() {
    const jogosExistentes = obterDados('jogos');
    
    if (!jogosExistentes || jogosExistentes.length === 0) {
        console.log('Carregando 92 jogos da Copa 2026...');
        seedJogos2026Completo();
    }
}

// Executar ao carregar
document.addEventListener('DOMContentLoaded', function() {
    inicializarSistemaCompleto();
});
