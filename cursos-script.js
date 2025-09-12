const CoursePlatform = {
    state: { currentLessonIndex: 0, progress: { completedLessons: [], passedModules: [] } },
    lessons: [],
    quizzes: {
        '1': { title: 'Atividade do Módulo 1', questions: [{ q: "Qual tag é usada para criar o título principal?", options: ["<h1>", "<h2>", "<p>", "<div>"], a: 0 }, { q: "Qual atributo define o destino de um link?", options: ["src", "link", "href", "target"], a: 2 }, { q: "Como se cria uma lista não ordenada?", options: ["<ol>", "<li>", "<list>", "<ul>"], a: 3 }, { q: "Qual tag é usada para inserir uma imagem?", options: ["<picture>", "<img>", "<image>", "<src>"], a: 1 }, { q: "O que significa HTML?", options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tooling Markup Language"], a: 0 }], passPercent: 60 },
        '2': { title: 'Atividade do Módulo 2', questions: [{ q: "Qual propriedade CSS altera a cor do texto?", options: ["font-color", "text-color", "color", "font-style"], a: 2 }, { q: "Como você seleciona um elemento com id 'meu-id'?", options: [".meu-id", "#meu-id", "meu-id", "*meu-id"], a: 1 }, { q: "Qual valor do 'display' torna os elementos flexíveis?", options: ["block", "inline", "grid", "flex"], a: 3 }, { q: "Qual propriedade adiciona espaço DENTRO de um elemento?", options: ["margin", "border", "padding", "spacing"], a: 2 }, { q: "Como se linka uma folha de estilos externa?", options: ["<style>", "<script>", "<css>", "<link>"], a: 3 }], passPercent: 60 },
        '3': { title: 'Prova Final', questions: [{ q: "Qual tag HTML define o corpo do documento?", options: ["<head>", "<body>", "<main>", "<section>"], a: 1 }, { q: "Em CSS, qual seletor tem a maior especificidade?", options: ["Seletor de classe", "Seletor de tag", "Seletor de ID", "Seletor universal"], a: 2 }, { q: "Qual comando Git inicia um novo repositório?", options: ["git start", "git new", "git init", "git create"], a: 2 }, { q: "O que 'git clone' faz?", options: ["Cria um novo branch", "Envia arquivos para o repositório remoto", "Copia um repositório remoto para sua máquina", "Lista os commits"], a: 2 }, { q: "Para que serve a tag <meta charset='UTF-8'>?", options: ["Para definir o idioma", "Para carregar um script", "Para garantir a correta exibição de caracteres especiais", "Para definir o título da página"], a: 2 }, { q: "Qual propriedade CSS controla o tamanho da fonte?", options: ["font-size", "text-size", "font-style", "text-style"], a: 0 }, { q: "O que é 'responsividade'?", options: ["O site ser rápido", "O site se adaptar a diferentes tamanhos de tela", "O site ter muitas animações", "O site ser seguro"], a: 1 }, { q: "Qual comando Git envia suas alterações para o repositório remoto?", options: ["git commit", "git pull", "git add", "git push"], a: 3 }, { q: "Qual o propósito da tag <footer>?", options: ["Definir o conteúdo principal", "Definir o rodapé da página ou de uma seção", "Criar um formulário", "Definir o cabeçalho"], a: 1 }, { q: "Qual propriedade do Flexbox alinha os itens no eixo principal?", options: ["align-items", "flex-direction", "justify-content", "flex-wrap"], a: 2 }], passPercent: 60 }
    },
    dom: {},

    init() {
        this.dom.allLessonLinks = document.querySelectorAll('.lesson-link');
        this.dom.videoPlayer = document.getElementById('video-player-element');
        this.dom.lessonTitle = document.getElementById('lesson-title');
        this.dom.lessonDescription = document.getElementById('lesson-description');
        this.dom.prevLessonBtn = document.getElementById('prev-lesson-btn');
        this.dom.nextLessonBtn = document.getElementById('next-lesson-btn');
        this.dom.markCompleteBtn = document.getElementById('mark-complete-btn');
        this.dom.progressBar = document.getElementById('progress-bar');
        this.dom.progressText = document.getElementById('progress-text');
        this.dom.quizModal = document.getElementById('quiz-modal');
        this.dom.quizView = document.getElementById('quiz-view');
        this.dom.resultView = document.getElementById('result-view');
        this.dom.quizTitle = document.getElementById('quiz-title');
        this.dom.quizQuestions = document.getElementById('quiz-questions');
        this.dom.submitQuizBtn = document.getElementById('submit-quiz-btn');
        this.dom.resultTitle = document.getElementById('result-title');
        this.dom.resultScore = document.getElementById('result-score');
        this.dom.resultMessage = document.getElementById('result-message');
        this.dom.resultActionBtn = document.getElementById('result-action-btn');
        this.dom.activityButtons = document.querySelectorAll('.activity-btn');
        this.dom.themeToggleBtn = document.getElementById('theme-toggle-btn');
        this.lessons = Array.from(this.dom.allLessonLinks);
        
        this.loadProgress();
        this.attachEventListeners();
        this.updateUI();
    },
    
    attachEventListeners() {
        this.lessons.forEach((link, index) => {
            link.addEventListener('click', (e) => { e.preventDefault(); this.state.currentLessonIndex = index; this.updateUI(); });
        });
        this.dom.nextLessonBtn.addEventListener('click', () => this.changeLesson(1));
        this.dom.prevLessonBtn.addEventListener('click', () => this.changeLesson(-1));
        this.dom.markCompleteBtn.addEventListener('click', () => this.markLessonAsComplete());
        this.dom.activityButtons.forEach(button => {
            button.addEventListener('click', () => { const moduleId = button.dataset.module; this.loadQuiz(moduleId); });
        });
        if(this.dom.themeToggleBtn) {
            this.dom.themeToggleBtn.addEventListener('click', () => {
                const isLight = document.documentElement.classList.contains('light-mode');
                if (isLight) { document.documentElement.className = 'dark-mode'; localStorage.setItem('theme', 'dark'); } 
                else { document.documentElement.className = 'light-mode'; localStorage.setItem('theme', 'light'); }
            });
        }
    },
    
    changeLesson(direction) {
        const newIndex = this.state.currentLessonIndex + direction;
        if (newIndex >= 0 && newIndex < this.lessons.length) {
            this.state.currentLessonIndex = newIndex;
            this.updateUI();
        }
    },
    
    updateUI() {
        this.updateLessonContent();
        this.updateNavButtons();
        this.updateProgressBar();
        this.updateCompletionStatus();
        this.updateModuleLocks();
    },

    updateLessonContent() {
        const link = this.lessons[this.state.currentLessonIndex];
        const { videoSrc, title, description } = link.dataset;
        this.dom.videoPlayer.src = videoSrc;
        this.dom.videoPlayer.load();
        this.dom.lessonTitle.textContent = title;
        this.dom.lessonDescription.textContent = description;
        this.dom.allLessonLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    },

    updateNavButtons() {
        this.dom.prevLessonBtn.disabled = this.state.currentLessonIndex === 0;
        this.dom.nextLessonBtn.disabled = this.state.currentLessonIndex === this.lessons.length - 1;
    },

    markLessonAsComplete() {
        const index = this.state.currentLessonIndex;
        if (!this.state.progress.completedLessons.includes(index)) {
            this.state.progress.completedLessons.push(index);
            this.saveProgress();
            this.updateUI();
        }
    },

    updateCompletionStatus() {
        this.lessons.forEach((link, index) => {
            if (this.state.progress.completedLessons.includes(index)) { link.classList.add('completed'); } 
            else { link.classList.remove('completed'); }
        });
    },
    
    updateProgressBar() {
        const percentage = this.lessons.length > 0 ? (this.state.progress.completedLessons.length / this.lessons.length) * 100 : 0;
        this.dom.progressBar.style.width = `${percentage}%`;
        this.dom.progressText.textContent = `${percentage.toFixed(0)}% concluído`;
    },
    
    updateModuleLocks() {
        this.state.progress.passedModules.forEach(moduleId => {
            const nextModuleId = parseInt(moduleId) + 1;
            const moduleElement = document.getElementById(`module-${nextModuleId}`);
            if (moduleElement) {
                moduleElement.classList.remove('locked');
                moduleElement.querySelector('.activity-btn').disabled = false;
            }
        });
    },

    loadQuiz(moduleId) {
        const quizData = this.quizzes[moduleId];
        this.dom.quizTitle.textContent = quizData.title;
        this.dom.quizQuestions.innerHTML = '';
        quizData.questions.forEach((q, index) => {
            const optionsHTML = q.options.map((option, i) => `<label class="option-label"><input type="radio" name="question-${index}" value="${i}"> ${option}</label>`).join('');
            this.dom.quizQuestions.innerHTML += `<div class="question-item"><p>${index + 1}. ${q.q}</p><div class="options-group">${optionsHTML}</div></div>`;
        });
        this.dom.quizView.style.display = 'block';
        this.dom.resultView.style.display = 'none';
        this.dom.quizModal.style.display = 'flex';
        this.dom.submitQuizBtn.onclick = () => this.checkAnswers(moduleId);
    },

    checkAnswers(moduleId) {
        const quizData = this.quizzes[moduleId];
        let score = 0;
        quizData.questions.forEach((q, index) => {
            const selected = document.querySelector(`input[name="question-${index}"]:checked`);
            if (selected && parseInt(selected.value) === q.a) score++;
        });

        const percentage = (score / quizData.questions.length) * 100;
        this.dom.resultScore.textContent = `Você acertou ${score} de ${quizData.questions.length} (${percentage.toFixed(0)}%)`;

        if (percentage >= quizData.passPercent) {
            this.dom.resultTitle.textContent = "Parabéns, você passou!";
            this.dom.resultMessage.textContent = "O próximo módulo foi desbloqueado.";
            this.dom.resultActionBtn.textContent = "Continuar";
            if (!this.state.progress.passedModules.includes(moduleId)) { this.state.progress.passedModules.push(moduleId); }
            this.dom.resultActionBtn.onclick = () => { this.dom.quizModal.style.display = 'none'; this.saveProgress(); this.updateUI(); };
        } else {
            this.dom.resultTitle.textContent = "Não foi desta vez...";
            this.dom.resultMessage.textContent = `Você precisa de ${quizData.passPercent}% de acerto. Tente novamente!`;
            this.dom.resultActionBtn.textContent = "Fechar";
            this.dom.resultActionBtn.onclick = () => { this.dom.quizModal.style.display = 'none'; };
        }
        this.dom.quizView.style.display = 'none';
        this.dom.resultView.style.display = 'block';
    },

    saveProgress() {
        localStorage.setItem('nivelUpProgress', JSON.stringify(this.state.progress));
    },

    loadProgress() {
        const savedProgress = localStorage.getItem('nivelUpProgress');
        if (savedProgress) { this.state.progress = JSON.parse(savedProgress); }
    }
};

document.addEventListener('DOMContentLoaded', () => CoursePlatform.init());