document.addEventListener('DOMContentLoaded', () => {
    
    // ===============================
    // LÓGICA DO TEMA CLARO/ESCURO 
    // ===============================
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');

    // Função para atualizar o ícone
    const updateThemeIcon = (isDarkMode) => {
        if (isDarkMode) {
            themeIcon.classList.remove('ph-sun');
            themeIcon.classList.add('ph-moon'); // Lua (Moon) indica que o modo escuro está ativo
        } else {
            themeIcon.classList.remove('ph-moon');
            themeIcon.classList.add('ph-sun'); // Sol (Sun) indica que o modo claro está ativo
        }
    };

    // 1. Carregar a preferência do usuário (localStorage)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.remove('dark-mode', 'light-mode');
        body.classList.add(savedTheme);
        updateThemeIcon(savedTheme === 'dark-mode');
    } else {
        // Usa o padrão definido no HTML (dark-mode) se não houver preferência salva
        updateThemeIcon(body.classList.contains('dark-mode'));
    }

    // 2. Lógica de alternância ao clique
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            // Estava no modo claro, muda para escuro
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
            updateThemeIcon(true);
        } else {
            // Estava no modo escuro, muda para claro
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
            updateThemeIcon(false);
        }
    });


    // ===============================
    // LÓGICA DO MENU HAMBÚRGUER (OFF-CANVAS)
    // ===============================
    const menuToggle = document.getElementById('menu-toggle');
    const offcanvasMenu = document.getElementById('offcanvas-menu');
    const closeMenuButton = document.getElementById('close-menu');
    const navLinks = offcanvasMenu.querySelectorAll('.offcanvas-nav a');

    const closeOffCanvas = () => {
        offcanvasMenu.classList.remove('open');
        document.body.style.overflow = '';
    };

    menuToggle.addEventListener('click', () => {
        offcanvasMenu.classList.add('open');
        document.body.style.overflow = 'hidden'; 
    });

    closeMenuButton.addEventListener('click', closeOffCanvas);
    navLinks.forEach(link => {
        link.addEventListener('click', closeOffCanvas);
    });

    // Fechar o menu ao clicar fora dele (apenas em mobile)
    document.addEventListener('click', (event) => {
        if (window.innerWidth <= 768) {
            const isClickInsideMenu = offcanvasMenu.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);

            if (!isClickInsideMenu && !isClickOnToggle && offcanvasMenu.classList.contains('open')) {
                closeOffCanvas();
            }
        }
    });


    // ===============================
    // LÓGICA DO ACORDEÃO (Conteúdo do Curso e FAQ)
    // Funciona para todos os elementos com a classe .accordion-item
    // ===============================
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Itera sobre todos os itens de acordeão para fechar os abertos
            accordionItems.forEach(otherItem => {
                // Fecha apenas os itens que não são o item clicado
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-content').style.maxHeight = null;
                }
            });

            // Se o item clicado não estava ativo, abre ele
            if (!isActive) {
                item.classList.add('active');
                const content = item.querySelector('.accordion-content');
                // Usa scrollHeight para definir a altura correta e animar a abertura
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                // Se o item clicado JÁ estava ativo, fecha ele
                item.classList.remove('active');
                item.querySelector('.accordion-content').style.maxHeight = null;
            }
        });
    });


    // ===============================
    // LÓGICA DA EXPANSÃO DA EQUIPE (Desenvolvedores)
    // ===============================
    const teamToggleButton = document.getElementById('team-toggle-button');
    const teamGridContainer = document.getElementById('team-grid-container');
    const toggleText = document.getElementById('toggle-text');
    const teamToggleIcon = document.getElementById('team-toggle-icon');

    // Estado inicial: Fechado (CSS já configura max-height: 0)
    // O texto deve ser "Conheça os Desenvolvedores"
    
    teamToggleButton.addEventListener('click', () => {
        const isExpanded = teamGridContainer.classList.contains('expanded');

        if (isExpanded) {
            // Fechar
            teamGridContainer.classList.remove('expanded');
            teamGridContainer.style.maxHeight = null;
            toggleText.textContent = 'Conheça os Desenvolvedores';
            teamToggleIcon.classList.remove('ph-caret-up');
            teamToggleIcon.classList.add('ph-caret-down');

        } else {
            // Abrir
            // Nota: Se a altura da grid mudar, o max-height deve ser grande o suficiente
            teamGridContainer.classList.add('expanded');
            // Calcula a altura exata do conteúdo para a transição
            teamGridContainer.style.maxHeight = teamGridContainer.scrollHeight + 'px'; 
            toggleText.textContent = 'Esconder Desenvolvedores';
            teamToggleIcon.classList.remove('ph-caret-down');
            teamToggleIcon.classList.add('ph-caret-up');
        }
    });

    // ===============================
    // SCROLL SUAVE DOS CARDS DE MÓDULO (NOVO)
    // ===============================
    const moduleCards = document.querySelectorAll('.module-card');
    
    moduleCards.forEach(card => {
        card.addEventListener('click', (event) => {
            // Evita o comportamento padrão se o card tiver um link ou outro elemento clicável
            if (event.target.tagName === 'A' || event.target.closest('a')) {
                return;
            }
            
            // Pega o target do atributo data-target
            const targetSelector = card.getAttribute('data-target');
            if (targetSelector) {
                const targetElement = document.querySelector(targetSelector);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

});