document.addEventListener('DOMContentLoaded', () => {
    const allLessonLinks = document.querySelectorAll('.lesson-link');
    const videoPlayer = document.getElementById('video-player-iframe');
    const lessonTitle = document.getElementById('lesson-title');
    const lessonDescription = document.getElementById('lesson-description');
    const prevLessonBtn = document.getElementById('prev-lesson-btn');
    const nextLessonBtn = document.getElementById('next-lesson-btn');

    let currentLessonIndex = 0;

    function updateNavButtons() {
        prevLessonBtn.disabled = currentLessonIndex === 0;
        nextLessonBtn.disabled = currentLessonIndex === allLessonLinks.length - 1;
    }

    function updateLessonContent(link, index) {
        const videoId = link.dataset.videoId;
        const title = link.dataset.title;
        const description = link.dataset.description;

        videoPlayer.src = `https://www.youtube.com/embed/${videoId}`;
        lessonTitle.textContent = title;
        lessonDescription.textContent = description;

        allLessonLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        currentLessonIndex = index;
        updateNavButtons();
    }

    allLessonLinks.forEach((link, index) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            updateLessonContent(link, index);
        });
    });

    nextLessonBtn.addEventListener('click', () => {
        if (currentLessonIndex < allLessonLinks.length - 1) {
            allLessonLinks[currentLessonIndex + 1].click();
        }
    });

    prevLessonBtn.addEventListener('click', () => {
        if (currentLessonIndex > 0) {
            allLessonLinks[currentLessonIndex - 1].click();
        }
    });

    updateNavButtons();
});