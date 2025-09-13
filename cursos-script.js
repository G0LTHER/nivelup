document.addEventListener('DOMContentLoaded', () => {
    // --- SEU CÓDIGO DE CONFIGURAÇÃO DO CURSO ---
    const courseData = [
        { 
            module: "Módulo 1: Fundamentos",
            lessons: [
                { title: 'Boas-vindas e preparação', videoId: 'epDCjks-kmw', materialsUrl: 'https://classroom.google.com/c/ODA1OTY0MzU3MTQ5?cjc=krvpsu2v', quizUrl: 'SEU_LINK_FORMS_AULA_1', forumUrl: 'https://classroom.google.com/c/ODA2MjUxODE0Mjcy?cjc=ewkdwsun' },
                { title: 'Estrutura básica do HTML', videoId: 'gqrySQQzvvQ', materialsUrl: 'https://classroom.google.com/c/ODA1OTY5NDEyNjEz?cjc=p4j3s67h', quizUrl: 'SEU_LINK_FORMS_AULA_2', forumUrl: 'https://classroom.google.com/c/ODA2MjUxODE0Mjcy?cjc=ewkdwsun' }
            ] 
        },
        { 
            module: "Módulo 2: Estilização",
            lessons: [
                { title: 'Estilizando com CSS3', videoId: 'Ehnq_dbS114', materialsUrl: 'https://classroom.google.com/c/ODA1OTY3OTE0OTkz?cjc=cy5lxngi', quizUrl: 'SEU_LINK_FORMS_AULA_3', forumUrl: 'https://classroom.google.com/c/NzgwNTQzMjExMzcy?cjc=flkxxn3u' },
                { title: 'Layout responsável', videoId: '57n6A3J_08I', materialsUrl: 'https://classroom.google.com/c/ODA2MjUyNTI5MDk3?cjc=w2osuayd', quizUrl: 'SEU_LINK_FORMS_AULA_4', forumUrl: 'https://classroom.google.com/c/NzgwNTQzMjExMzcy?cjc=flkxxn3u' }
            ] 
        },
        { 
            module: "Módulo 3: Ferramentas",
            lessons: [
                { title: 'Versionando com Github', videoId: '2alg7MQ6_sI', materialsUrl: 'https://classroom.google.com/c/ODA2MjQxNTE0MzI1?cjc=wbr2jbij', quizUrl: 'SEU_LINK_FORMS_AULA_5', forumUrl: 'https://classroom.google.com/c/ODA2MjUxNDUwOTYw?cjc=yx2rtetb' },
                { title: 'Hospedando seu projeto', videoId: 'CwGnwvi2p2c', materialsUrl: 'https://classroom.google.com/c/ODA2MjQxMjUyMzQ0?cjc=rhojssnw', quizUrl: 'SEU_LINK_FORMS_AULA_6', forumUrl: 'https://classroom.google.com/c/ODA2MjUxNDUwOTYw?cjc=yx2rtetb' }
            ]
        },
        {
            module: "Módulo Final: Avaliação",
            isAssessment: true,
            assessmentUrl: "https://classroom.google.com/c/ODA2MjU0MDA3NTUy?cjc=as4tn6gz",
            lessons: []
        }
    ];

    // --- ELEMENTOS DO DOM ---
    const sidebar = document.querySelector('.sidebar');
    const openSidebarBtn = document.querySelector('.open-sidebar-btn');
    const modulesNav = document.querySelector('.modules-nav');
    const videoPlayer = document.getElementById('video-player-iframe');
    const currentLessonHeaderTitle = document.getElementById('current-lesson-header-title');
    const prevLessonBtn = document.getElementById('prev-lesson-btn');
    const nextLessonBtn = document.getElementById('next-lesson-btn');
    const materialsLink = document.getElementById('materials-link'); // Referência ao botão de materiais

    let flatLessons = [];
    let currentLessonIndex = 0;

    // --- FUNÇÕES ---
    function populateSidebar() {
        let lessonCounter = 0;
        courseData.forEach(moduleData => {
            if (moduleData.isAssessment) {
                const assessmentDiv = document.createElement('div');
                assessmentDiv.className = 'assessment-module';
                assessmentDiv.innerHTML = `<a href="${moduleData.assessmentUrl}" target="_blank" class="assessment-link"><i class="ph ph-seal-check"></i> Atividade Avaliativa Final</a>`;
                modulesNav.appendChild(assessmentDiv);
                return;
            }

            const details = document.createElement('details');
            if (lessonCounter === 0) details.open = true;

            const summary = document.createElement('summary');
            summary.textContent = moduleData.module;
            details.appendChild(summary);

            const ul = document.createElement('ul');
            ul.className = 'lessons-list';
            
            moduleData.lessons.forEach(lesson => {
                const li = document.createElement('li');
                li.className = 'lesson-item';

                const a = document.createElement('a');
                a.href = '#';
                a.className = 'lesson-link';
                a.dataset.index = lessonCounter;
                a.innerHTML = `<span class="lesson-name">${lesson.title}</span>`;
                li.appendChild(a);

                const subActions = document.createElement('div');
                subActions.className = 'lesson-sub-actions';
                subActions.innerHTML = `
                    <a href="${lesson.quizUrl}" target="_blank" class="lesson-action-link"><i class="ph ph-pencil-simple"></i> Atividade</a>
                    <a href="${lesson.forumUrl}" target="_blank" class="lesson-action-link"><i class="ph ph-chats-circle"></i> Fórum</a>
                `;
                li.appendChild(subActions);
                ul.appendChild(li);
                
                flatLessons.push(lesson);
                lessonCounter++;
            });
            details.appendChild(ul);
            modulesNav.appendChild(details);
        });
    }

    function loadLesson(index) {
        if (index < 0 || index >= flatLessons.length) return;
        currentLessonIndex = index;
        const lesson = flatLessons[index];

        videoPlayer.src = `https://www.youtube.com/embed/${lesson.videoId}`;
        currentLessonHeaderTitle.textContent = lesson.title;
        
        // AJUSTE FINAL: ATUALIZA O LINK DE MATERIAIS
        materialsLink.href = lesson.materialsUrl;

        document.querySelectorAll('.lesson-link').forEach(link => {
            link.classList.remove('active');
            if (parseInt(link.dataset.index) === index) {
                link.classList.add('active');
            }
        });
        updateNavButtons();
    }

    function updateNavButtons() {
        prevLessonBtn.disabled = currentLessonIndex === 0;
        nextLessonBtn.disabled = currentLessonIndex === flatLessons.length - 1;
    }
    
    // --- INICIALIZAÇÃO E EVENTOS ---
    populateSidebar();
    if (flatLessons.length > 0) {
        loadLesson(0);
    }
    
    openSidebarBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        document.body.classList.toggle('sidebar-open');
    });

    modulesNav.addEventListener('click', (e) => {
        if (e.target.matches('.lesson-link, .lesson-link *')) {
            e.preventDefault();
            const link = e.target.closest('.lesson-link');
            loadLesson(parseInt(link.dataset.index));
        }
    });

    prevLessonBtn.addEventListener('click', () => loadLesson(currentLessonIndex - 1));
    nextLessonBtn.addEventListener('click', () => loadLesson(currentLessonIndex + 1));
});