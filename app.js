// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const contactForm = document.getElementById('contactForm');
const sections = document.querySelectorAll('section');

// Hamburger Menu
hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// Typed Text Effect
const typedText = document.querySelector('.typed-text');
if (typedText) {
    const words = ['Yosh dasturchi', 'HTML/CSS', 'Bootstrap', 'Tailwind', 'JavaScript'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typedText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeEffect, 500);
        } else {
            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }
    }
    
    typeEffect();
}

// Menu Active State Management
function removeActiveClasses() {
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
}

function setActiveLink(link) {
    removeActiveClasses();
    link.classList.add('active');
}

// Scroll bo'lganda active linkni o'zgartirish
window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === `#${current}`) {
            setActiveLink(link);
        }
    });
});

// Link bosilganda active holatga o'tkazish
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        setActiveLink(link);
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Sahifa yuklanganda birinchi linkni active qilish
window.addEventListener('load', () => {
    const homeLink = document.querySelector('.nav-link[href="#home"]');
    if (homeLink) {
        setActiveLink(homeLink);
    }
});

// Portfolio filter
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Contact form
contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const btn = contactForm.querySelector('.btn-submit');
    btn.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
        
        const formData = new FormData(contactForm);
        console.log('Form submitted:', Object.fromEntries(formData));
        
        contactForm.reset();
        
        alert('Xabar yuborildi! Tez orada javob beramiz.');
    }, 300);
});

// Scroll animation for sections
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(section);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        navbar.style.padding = '10px 0';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.padding = '15px 0';
    }
});

// Certificate Modal function (YANGI)
const certificateModal = document.getElementById('certificateModal');
const modalImage = document.getElementById('modalImage');
const modalCloseBtn = document.querySelector('.modal-close');

function closeCertificateModal() {
    if (certificateModal) {
        certificateModal.style.display = 'none';
    }
}

function openCertificateModal(imgSrc, event) {
    if (event) {
        event.preventDefault();
    }

    if (!certificateModal || !modalImage) {
        return;
    }

    certificateModal.style.display = 'block';
    modalImage.src = imgSrc;
}

modalCloseBtn?.addEventListener('click', closeCertificateModal);

certificateModal?.addEventListener('click', (event) => {
    if (event.target === certificateModal) {
        closeCertificateModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCertificateModal();
    }
});

// Certificates filter functionality (YANGI)
const certFilterBtns = document.querySelectorAll('.certificates-filter .filter-btn');
const certificateItems = document.querySelectorAll('.certificate-item');

if (certFilterBtns.length > 0) {
    certFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all filter buttons
            certFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            certificateItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Download button functionality (YANGI)
document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const certificateCard = btn.closest('.certificate-card');
        const imgSrc = certificateCard.querySelector('img').src;
        
        // Create a temporary link to download the image
        const link = document.createElement('a');
        link.href = imgSrc;
        link.download = 'sertifikat.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show notification
        alert('Sertifikat yuklab olinmoqda...');
    });
});