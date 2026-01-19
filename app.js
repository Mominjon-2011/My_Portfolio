    // Mobile Menu Toggle
        document.querySelector('.menu-toggle').addEventListener('click', function () {
            document.querySelector('.sidebar').classList.toggle('active');
        });

        // Portfolio Filter
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // Form Submission
        document.getElementById('contactForm').addEventListener('submit', function (e) {
            e.preventDefault();

            // Form ma'lumotlarini yig'ish
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Bu yerda form ma'lumotlarini serverga yuborishingiz mumkin
            console.log('Form ma\'lumotlari:', formData);

            // Muvaffaqiyat xabari
            alert('Xabaringiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog\'lanaman.');
            this.reset();
        });

        // Smooth Scrolling for Navigation Links
        document.querySelectorAll('.nav-link').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                window.scrollTo({
                    top: targetSection.offsetTop - 20,
                    behavior: 'smooth'
                });

                // Update active nav item
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');

                // Close mobile menu after click
                if (window.innerWidth <= 768) {
                    document.querySelector('.sidebar').classList.remove('active');
                }
            });
        });

        // Add animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = `fadeInUp 1s ease forwards`;
                    entry.target.style.opacity = '1';
                }
            });
        }, observerOptions);

        // Observe all sections for animation
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            observer.observe(section);
        });

        // Update active nav item on scroll
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');

            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 100)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // Typing effect for hero text
        const typingText = document.getElementById('typing-text');
        const texts = [
            "Full Stack Developer",
            "UI/UX Designer",
            "Veb Dasturchi",
            "Mobile App Developer"
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeWriter() {
            const currentText = texts[textIndex];

            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 1000; // Pause at the end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500; // Pause before starting new text
            }

            setTimeout(typeWriter, typingSpeed);
        }

        // Start typing effect after page load
        window.addEventListener('load', () => {
            setTimeout(typeWriter, 1000);
        });

        // Profile image error handling
        document.addEventListener('DOMContentLoaded', function () {
            const profilePhoto = document.querySelector('.profile-photo');
            const profilePlaceholder = document.querySelector('.profile-placeholder');

            if (profilePhoto && profilePhoto.complete && profilePhoto.naturalHeight === 0) {
                profilePhoto.style.display = 'none';
                profilePlaceholder.style.display = 'flex';
            }
        });