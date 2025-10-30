document.addEventListener('DOMContentLoaded', () => {
    
    // ===============================
    // LÓGICA DO MENU HAMBÚRGUER (OFF-CANVAS)
    // ===============================
    const menuToggle = document.getElementById('menu-toggle');
    const offcanvasMenu = document.getElementById('offcanvas-menu');
    const closeMenuButton = document.getElementById('close-menu');
    // Seleciona os links do menu off-canvas
    const navLinks = offcanvasMenu.querySelectorAll('.offcanvas-nav a');

    // Abre o menu off-canvas
    menuToggle.addEventListener('click', () => {
        offcanvasMenu.classList.add('open');
        // Opcional: Adicionar uma classe ao body para evitar rolagem
        document.body.style.overflow = 'hidden'; 
    });

    // Função para fechar o menu off-canvas
    const closeOffCanvas = () => {
        offcanvasMenu.classList.remove('open');
        document.body.style.overflow = '';
    };

    // Fecha o menu com o botão 'X'
    closeMenuButton.addEventListener('click', closeOffCanvas);

    // Fecha o menu off-canvas ao clicar em um link
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
    // LÓGICA DO ACORDEÃO (Código existente)
    // ===============================
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Fecha todos os itens que estiverem abertos
            accordionItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.accordion-content').style.maxHeight = null;
            });

            // Se o item clicado não estava ativo, abre ele
            if (!isActive) {
                item.classList.add('active');
                const content = item.querySelector('.accordion-content');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
});