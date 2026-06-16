/* =============================================
   NAVBAR — sticky + hamburger + active link
   ============================================= */
const navbar     = document.getElementById('navbar');
const hamburger  = document.getElementById('hamburger');
const navMenu    = document.getElementById('navMenu');
const navLinks   = document.querySelectorAll('.navbar__link');
const backToTop  = document.getElementById('backToTop');

hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    navMenu.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// Highlight the active nav link based on current scroll position
function setActiveLink() {
    const scrollY = window.scrollY + 100;
    document.querySelectorAll('section[id]').forEach(section => {
        const top    = section.offsetTop;
        const height = section.offsetHeight;
        const id     = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(l => l.classList.remove('active'));
            const match = document.querySelector(`.navbar__link[href="#${id}"]`);
            if (match) match.classList.add('active');
        }
    });
}

window.addEventListener('scroll', () => {
    // Sticky shadow
    navbar.classList.toggle('scrolled', window.scrollY > 20);

    // Back-to-top visibility
    backToTop.classList.toggle('visible', window.scrollY > 450);

    setActiveLink();
}, { passive: true });

/* =============================================
   SMOOTH SCROLL with navbar offset
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top: offset, behavior: 'smooth' });
    });
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* =============================================
   TYPING ANIMATION (hero title)
   ============================================= */
const titles     = ['Front-End Developer', 'Mobile Developer', 'UX/UI Designer'];
const typingEl   = document.getElementById('typingText');
let titleIdx     = 0;
let charIdx      = 0;
let isDeleting   = false;

function typeWriter() {
    const current = titles[titleIdx];
    typingEl.textContent = isDeleting
        ? current.slice(0, charIdx - 1)
        : current.slice(0, charIdx + 1);

    isDeleting ? charIdx-- : charIdx++;

    let delay = isDeleting ? 55 : 95;

    if (!isDeleting && charIdx === current.length) {
        delay      = 1800;
        isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        titleIdx   = (titleIdx + 1) % titles.length;
        delay      = 380;
    }
    setTimeout(typeWriter, delay);
}
typeWriter();

/* =============================================
   COUNTER ANIMATION (hero stats)
   ============================================= */
function animateCounter(el) {
    const target   = parseInt(el.dataset.count, 10);
    const duration = 1600;
    const step     = 16;
    const increment = target / (duration / step);
    let current    = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current);
        }
    }, step);
}

// Trigger counters once the hero stats are visible
const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.hero__stat-number').forEach(animateCounter);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.6 });

const statsEl = document.querySelector('.hero__stats');
if (statsEl) statsObserver.observe(statsEl);

/* =============================================
   SCROLL REVEAL — section-level elements
   ============================================= */
const revealTargets = document.querySelectorAll(
    '.section-header, .about__grid, .skills__grid, ' +
    '.experience__grid, .contact__grid, .timeline__item, ' +
    '.footer__top'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach(el => revealObserver.observe(el));

/* =============================================
   STAGGER ANIMATION — project & skill cards
   ============================================= */
function staggerCards(selector, delay = 100) {
    const cards = document.querySelectorAll(selector);
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find the card's index among its siblings
                const siblings = [...entry.target.parentElement.children];
                const idx      = siblings.indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    entry.target.style.transitionDelay = '0ms'; // Reset after fire
                }, idx * delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));
}

staggerCards('.project-card', 90);

// Skill cards — simpler stagger via CSS transition-delay
document.querySelectorAll('.skill-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 60}ms`;
});

/* =============================================
   CONTACT FORM — validation + Web3Forms submit
   ============================================= */
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');

contactForm.addEventListener('submit', async e => {
    e.preventDefault();

    // Basic validation
    const name    = contactForm.name.value.trim();
    const email   = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
        showModal('error', 'กรอกข้อมูลไม่ครบ', 'กรุณากรอกชื่อ อีเมล และข้อความให้ครบถ้วน');
        return;
    }
    if (!emailRx.test(email)) {
        showModal('error', 'อีเมลไม่ถูกต้อง', 'รูปแบบอีเมลไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง');
        return;
    }

    // Loading state
    const originalHTML  = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled  = true;

    // Send to Web3Forms (access_key is a hidden field in the form)
    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method:  'POST',
            headers: { 'Accept': 'application/json' },
            body:    new FormData(contactForm)
        });
        const data = await response.json();

        if (data.success) {
            showModal('success', 'ส่งข้อความสำเร็จ!', 'ขอบคุณค่ะ ฉันจะติดต่อกลับโดยเร็วที่สุด');
            contactForm.reset();
        } else {
            showModal('error', 'ส่งไม่สำเร็จ', data.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
        }
    } catch (err) {
        showModal('error', 'เชื่อมต่อไม่สำเร็จ', 'กรุณาตรวจสอบอินเทอร์เน็ตแล้วลองใหม่อีกครั้ง');
    } finally {
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled  = false;
    }
});

/* Result popup (modal) */
const formModal  = document.getElementById('formModal');
const modalIcon  = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalTitle');
const modalText  = document.getElementById('modalText');

function showModal(type, title, text) {
    modalIcon.innerHTML    = type === 'success'
        ? '<img src="kawaii_wai_nobg.gif" alt="ส่งสำเร็จ" class="modal__img">'
        : '<i class="fas fa-xmark"></i>';
    modalTitle.textContent = title;
    modalText.textContent  = text;
    formModal.className     = `modal modal--${type} open`;
    formModal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
    formModal.classList.remove('open');
    formModal.setAttribute('aria-hidden', 'true');
}

formModal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModal));
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && formModal.classList.contains('open')) closeModal();
});

/* =============================================
   INPUT FOCUS EFFECT — floating label feel
   ============================================= */
document.querySelectorAll('.form-input, .form-textarea').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
    });
});
