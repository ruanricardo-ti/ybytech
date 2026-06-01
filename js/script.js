// ===== HEADER SCROLL EFFECT =====
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== MENU MOBILE TOGGLE =====
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('active');
    });
}

// Fechar menu ao clicar em um link
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('active');
    });
});

// ===== ANIMAÇÃO DOS CONTADORES =====
const counters = document.querySelectorAll('.stat-number');
let animated = false;

function animateCounters() {
    if (animated) return;
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        let current = 0;
        const increment = target / 50;
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.innerText = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCounter();
    });
    animated = true;
}

// Observador para ativar contadores quando visível
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsContainer = document.querySelector('.sobre-stats');
if (statsContainer) {
    observer.observe(statsContainer);
}

// ===== ANIMAÇÃO DE SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.card, .service-card, .tech-item, .sobre-content');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    revealObserver.observe(el);
});

// ===== MODAL DOS PROJETOS =====
const modal = document.getElementById('projetoModal');
const modalTitulo = document.getElementById('modalTitulo');
const modalDescricao = document.getElementById('modalDescricao');
const modalTech = document.getElementById('modalTech');
const modalFeatures = document.getElementById('modalFeatures');
const modalLink = document.getElementById('modalLink');

// Dados dos projetos
const projetosData = {
    simucare: {
        titulo: 'SimuCare',
        descricao: 'SimuCare é um simulador clínico desenvolvido para instituições de ensino na área da saúde. O sistema oferece casos realistas, diagnósticos interativos e relatórios de desempenho para alunos e professores.',
        tecnologias: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL', 'Bootstrap'],
        features: [
            'Casos clínicos realistas',
            'Diagnóstico interativo',
            'Relatórios de desempenho',
            'Painel do professor',
            'Histórico de pacientes'
        ],
        link: '#'
    },
    granmaq: {
        titulo: 'GranMaq',
        descricao: 'GranMaq é um sistema completo de gestão para empresas de maquinário pesado e locações. Controle de frota, manutenção preventiva, agendamento de locações e faturamento integrado.',
        tecnologias: ['React', 'Node.js', 'PostgreSQL', 'Express', 'JWT'],
        features: [
            'Controle de frota',
            'Manutenção preventiva',
            'Agendamento de locações',
            'Faturamento integrado',
            'Dashboard gerencial'
        ],
        link: '#'
    },
   dispensasys: {
        titulo: 'DispensaSys',
        descricao: 'DispensaSys é um simulador educacional de farmácia hospitalar desenvolvido para treinar estudantes e profissionais na prática de gestão de medicamentos, validação de prescrições e dispensação segura.',
        tecnologias: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL', 'Bootstrap'],
        features: [
            'Simula situações reais sem risco para pacientes',
            'Aluno aprende a identificar erros e alergias',
            'Pratica o fluxo de dispensação hospitalar',
            'Aprende curva ABC e controle de validade',
            'Sistema de avaliação com anti-trapaça'
        ],
        link: '#'
    },
      barbeariaestilopro: {
        titulo: 'Barbearia Estilo PRO',
        descricao: 'O Barbearia Estilo PRO é uma solução completa para barbearias que desejam modernizar o atendimento e nunca mais perder clientes por falta de agenda. Com ele, o cliente pode agendar horários diretamente pelo celular, escolher o profissional de preferência, entrar na fila de espera e receber confirmação no WhatsApp. O barbeiro tem um painel administrativo completo para gerenciar serviços, profissionais, horários, dias de funcionamento e personalizar a identidade visual da sua barbearia.',
        tecnologias: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL', 'WhatsApp API', 'Bootstrap'],
        features: [
            'Cliente agenda 24/7 pelo celular',
            'Painel administrativo completo',
            'WhatsApp integrado (lembretes e confirmações)',
            'Fila de espera digital',
            'Personalização com logo e cores da barbearia',
            'Dias de funcionamento flexíveis'
        ],
        link: '#'
    },
       clareia: {
    titulo: "Clare.ia",
    descricao: "O Clare.ia é uma ferramenta web que ajuda pessoas leigas a entenderem documentos complexos como contratos, cartas de banco, termos de consentimento e muito mais. Com um clique, o sistema identifica termos jurídicos, bancários e de saúde, explicando cada um em português claro e simples.",
    tecnologias: ["HTML5", "CSS3", "JavaScript", "Tesseract.js", "OCR", "Web Speech API"],
    features: [
        "📸 OCR - Tire foto do documento ou escolha da galeria",
        "📝 Digitar/Colar - Cole o texto diretamente",
        "✨ Clarear - Marca termos difíceis com explicações",
        "🔊 Leitura por voz - Escute com velocidade ajustável",
        "📥 Download - Salve em TXT ou PDF",
        "📋 Copiar - Copie o resultado para área de transferência",
        "📱 Responsivo - Funciona perfeitamente no celular"
    ],
}
};
    
// Abrir modal
document.querySelectorAll('[data-projeto]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projetoId = btn.getAttribute('data-projeto');
        const projeto = projetosData[projetoId];
        
        if (projeto) {
            modalTitulo.textContent = projeto.titulo;
            modalDescricao.textContent = projeto.descricao;
            
            // Tecnologias
            modalTech.innerHTML = projeto.tecnologias.map(tech => `<span>${tech}</span>`).join('');
            
            // Features
            modalFeatures.innerHTML = `<ul>${projeto.features.map(f => `<li>${f}</li>`).join('')}</ul>`;
            
            modalLink.href = projeto.link;
            modal.style.display = 'flex';
        }
    });
});

// Fechar modal
document.querySelector('.modal-close').addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// ===== EFEITO DE PARTICLAS NO HERO =====
function createParticles() {
    const hero = document.querySelector('.hero-particles');
    if (!hero) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 'px';
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = `rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 50}, 255, ${Math.random() * 0.5})`;
        particle.style.borderRadius = '50%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animation = `floatParticle ${Math.random() * 10 + 5}s linear infinite`;
        hero.appendChild(particle);
    }
}

// Adicionar estilo das partículas
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
    .hero-particles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 1;
    }
    .particle {
        position: absolute;
        pointer-events: none;
    }
`;
document.head.appendChild(style);
createParticles();

// ===== SMOOTH SCROLL PARA LINKS INTERNOS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== ATUALIZAR ANO NO COPYRIGHT =====
const yearSpan = document.querySelector('.footer-bottom p');
if (yearSpan) {
    yearSpan.innerHTML = `&copy; ${new Date().getFullYear()} YbyTech. Todos os direitos reservados.`;
}

console.log('YbyTech - Site carregado com sucesso! 🚀');
