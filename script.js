// --- Lógica para o site do Portfólio Musical ---

document.addEventListener('DOMContentLoaded', () => {
    
    // --- NAVEGAÇÃO E HEADER ---
    const header = document.getElementById('main-header');
    const navLinks = document.getElementById('nav-links');
    const hamburgerBtn = document.getElementById('hamburger-btn');

    // Efeito de sombra no header ao rolar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Menu responsivo (hamburger)
    hamburgerBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Rolagem suave para os links da navegação
    document.querySelectorAll('#main-nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
            // Fecha o menu hamburger se estiver aberto
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // --- PLAYER DE MÚSICA E LETRAS ---
    const audioPlayer = document.getElementById('audio-player');
    const playButtons = document.querySelectorAll('.play-btn');
    const lyricsButtons = document.querySelectorAll('.lyrics-btn');

    let currentPlayingButton = null;

    // Lógica para os botões de tocar música
    playButtons.forEach(button => {
        button.addEventListener('click', () => {
            const songSrc = button.getAttribute('data-src');

            if (currentPlayingButton === button) {
                // Se o botão clicado já está tocando, pausa a música
                audioPlayer.pause();
                button.textContent = '▶ Tocar';
                button.classList.remove('playing');
                currentPlayingButton = null;
            } else {
                // Pausa a música anterior, se houver
                if (currentPlayingButton) {
                    currentPlayingButton.textContent = '▶ Tocar';
                    currentPlayingButton.classList.remove('playing');
                }
                
                // Toca a nova música
                audioPlayer.src = songSrc;
                audioPlayer.play();
                button.textContent = '❚❚ Pausar';
                button.classList.add('playing');
                currentPlayingButton = button;
            }
        });
    });

    // Quando uma música termina, reseta o botão
    audioPlayer.addEventListener('ended', () => {
        if (currentPlayingButton) {
            currentPlayingButton.textContent = '▶ Tocar';
            currentPlayingButton.classList.remove('playing');
            currentPlayingButton = null;
        }
    });

    // Lógica para os botões de ver a letra
    lyricsButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lyricsContent = button.closest('.music-card').querySelector('.lyrics-content');
            lyricsContent.classList.toggle('visible');
        });
    });

    // --- ANIMAÇÕES DE SCROLL ---
    const scrollElements = document.querySelectorAll('.animate-on-scroll');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                el.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    // Dispara uma vez no carregamento para os elementos já visíveis
    handleScrollAnimation();
    
    // --- FORMULÁRIO DE CONTATO ---
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Mensagem enviada! (Isso é uma demonstração)');
        contactForm.reset();
    });

});