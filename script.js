/* =============================================
   BARKAMOL OLIMOV — Enhanced Portfolio JS
   ============================================= */

// ── NAVBAR ──────────────────────────────────────
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.nav-link');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    }
});

// Close navbar on nav link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

// ── HEADER SCROLL EFFECT ──────────────────────
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    updateActiveNav();
    handleScrollTop();
});

// ── ACTIVE NAV ON SCROLL ──────────────────────
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ── TYPED.JS ──────────────────────────────────
const typed = new Typed('.multiple-text', {
    strings: [
        'Frontend Developer',
        'Web Developer',
        'CS Student',
        'UI/UX Enthusiast',
        'Telegram Mini App Dev',
        'Problem Solver',
    ],
    typeSpeed: 75,
    backSpeed: 50,
    backDelay: 1500,
    loop: true,
    smartBackspace: true,
});

// ── READ MORE ─────────────────────────────────
const readMoreBtn = document.querySelector('#readMoreBtn');
const aboutMore = document.querySelector('#aboutMore');

if (readMoreBtn && aboutMore) {
    readMoreBtn.addEventListener('click', () => {
        aboutMore.classList.toggle('active');
        const isOpen = aboutMore.classList.contains('active');
        readMoreBtn.innerHTML = isOpen
            ? '<i class="bx bx-chevron-up"></i> Read Less'
            : '<i class="bx bx-chevron-down"></i> Read More';
    });
}

// ── SKILLS PROGRESS ANIMATION ─────────────────
function animateSkills() {
    const progressBars = document.querySelectorAll('.progress span');
    progressBars.forEach(bar => {
        bar.classList.add('animated');
    });
}

// Trigger skills animation when section comes into view
const skillsSection = document.querySelector('#skills');
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            skillsAnimated = true;
            animateSkills();
        }
    });
}, { threshold: 0.2 });

if (skillsSection) skillsObserver.observe(skillsSection);

// ── SCROLL REVEAL ANIMATION ───────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.services-box, .skill-category, .contact-card, .about-stats, .tech-badges').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// ── TESTIMONIAL SLIDER ────────────────────────
const track = document.querySelector('#testimonialTrack');
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');
const dotsContainer = document.querySelector('#sliderDots');

if (track && prevBtn && nextBtn) {
    const items = track.querySelectorAll('.testimonial-item');
    const totalItems = items.length;
    let current = 0;
    let autoplayInterval;

    // Get items per view based on screen width
    function getItemsPerView() {
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 1200) return 2;
        return 3;
    }

    // Create dots
    function createDots() {
        dotsContainer.innerHTML = '';
        const perView = getItemsPerView();
        const dotCount = Math.ceil(totalItems / perView);
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot-item' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        }
    }

    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.dot-item');
        const perView = getItemsPerView();
        const idx = Math.floor(current / perView);
        dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    }

    function goTo(index) {
        const perView = getItemsPerView();
        const maxIndex = Math.max(0, totalItems - perView);
        current = Math.max(0, Math.min(index * perView, maxIndex));
        updateSlider();
    }

    function updateSlider() {
        const itemWidth = items[0].offsetWidth + 25; // 25 = gap
        track.style.transform = `translateX(-${current * itemWidth}px)`;
        updateDots();
    }

    function next() {
        const perView = getItemsPerView();
        const maxIndex = totalItems - perView;
        if (current < maxIndex) {
            current++;
        } else {
            current = 0;
        }
        updateSlider();
    }

    function prev() {
        const perView = getItemsPerView();
        const maxIndex = totalItems - perView;
        if (current > 0) {
            current--;
        } else {
            current = maxIndex;
        }
        updateSlider();
    }

    prevBtn.addEventListener('click', () => {
        prev();
        resetAutoplay();
    });

    nextBtn.addEventListener('click', () => {
        next();
        resetAutoplay();
    });

    function startAutoplay() {
        autoplayInterval = setInterval(next, 4500);
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    // Touch / swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) next(); else prev();
            resetAutoplay();
        }
    }, { passive: true });

    window.addEventListener('resize', () => {
        createDots();
        current = 0;
        updateSlider();
    });

    // Init
    createDots();
    startAutoplay();
}

// ── SCROLL TO TOP ─────────────────────────────
const scrollTopBtn = document.querySelector('#scrollTop');

function handleScrollTop() {
    if (scrollTopBtn) {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }
}

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ── CONTACT FORM ──────────────────────────────
const contactForm = document.querySelector('#contactForm');
const sendBtn = document.querySelector('#sendBtn');

if (contactForm && sendBtn) {
    contactForm.addEventListener('submit', function (e) {
        const originalHTML = sendBtn.innerHTML;
        sendBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
        sendBtn.disabled = true;

        // Re-enable after 3s fallback (formspree handles redirect)
        setTimeout(() => {
            sendBtn.innerHTML = originalHTML;
            sendBtn.disabled = false;
        }, 3000);
    });
}

// ── PARTICLE BACKGROUND ───────────────────────
(function createParticles() {
    const bg = document.querySelector('#particles-bg');
    if (!bg) return;

    const count = 30;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(${Math.random() > 0.5 ? '79,142,247' : '124,92,191'}, ${Math.random() * 0.4 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 20 + 15}s linear infinite;
            animation-delay: ${Math.random() * -20}s;
        `;
        bg.appendChild(p);
    }

    // Add keyframes for particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 0.5; }
            100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
})();

// ── SMOOTH HOVER TILT on service cards ───────
document.querySelectorAll('.services-box').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-8px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ── INIT ──────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
    updateActiveNav();
    handleScrollTop();
});
