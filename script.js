document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // Preloader Animation
    // ======================
    const loaderWrapper = document.querySelector('.loader-wrapper');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            loaderWrapper.style.opacity = '0';
            setTimeout(function() {
                loaderWrapper.style.display = 'none';
                document.body.style.overflow = 'auto'; // Enable scrolling after preloader
            }, 500);
        }, 1000);
    });

    // ======================
    // Mobile Navigation
    // ======================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu ul');
    const navLinks = document.querySelectorAll('.nav-menu ul li a');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // ======================
    // Sticky Header
    // ======================
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ======================
    // Active Section Detection
    // ======================
    const sections = document.querySelectorAll('section');
    const navDots = document.querySelectorAll('.nav-dots .dot');
    
    function setActiveSection() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        navDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('href').includes(current)) {
                dot.classList.add('active');
            }
        });
    }

    // Initial call
    setActiveSection();
    
    // Call on scroll
    window.addEventListener('scroll', setActiveSection);

    // ======================
    // Navigation Dots
    // ======================
    navDots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            const targetSection = document.querySelector(target);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // ======================
    // Back to Top Button
    // ======================
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ======================
    // Typing Animation
    // ======================
    const typingText = document.querySelector('.typing-text');
    const texts = ["Software Developer", "IAM Specialist", "Blockchain Enthusiast", "Problem Solver"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isEnd = true;
            isDeleting = true;
            setTimeout(type, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            isEnd = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        } else {
            const speed = isDeleting ? 100 : 150;
            setTimeout(type, speed);
        }
    }
    
    // Start typing animation after a delay
    setTimeout(type, 2000);

    // ======================
    // Animate Skill Bars
    // ======================
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsSection = document.querySelector('.skills');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 100);
        });
    }
    
    // Intersection Observer for skill bars animation
    const observerOptions = {
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target === skillsSection) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);
    
    observer.observe(skillsSection);

    // ======================
    // Smooth Scrolling
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ======================
    // Project Hover Effects
    // ======================
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(255, 42, 109, 0.4)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(255, 42, 109, 0.3)';
        });
    });

    // ======================
    // Form Submission
    // ======================
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    // ======================
    // Download CV Button
    // ======================
    const downloadCvBtn = document.querySelector('.download-cv');
    
    if (downloadCvBtn) {
        downloadCvBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Replace with actual CV download link
            const link = document.createElement('a');
            link.href = 'PATH_TO_YOUR_CV.pdf'; // Add your CV path here
            link.download = 'Abhi-Shah-CV.pdf';
            link.click();
        });
    }

    // ======================
    // Initialize Animations
    // ======================
    const animatedElements = document.querySelectorAll('.section-title, .section-divider, .about-image, .about-text, .education-item, .certificate-item');
    
    const elementObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        elementObserver.observe(element);
    });

    // ======================
    // X (Twitter) Icon Hover Effect
    // ======================
    const xTwitterIcons = document.querySelectorAll('.fa-x-twitter');
    
    xTwitterIcons.forEach(icon => {
        const parentLink = icon.closest('a');
        
        parentLink.addEventListener('mouseenter', function() {
            icon.style.color = 'white';
            parentLink.style.backgroundColor = '#000000';
        });
        
        parentLink.addEventListener('mouseleave', function() {
            icon.style.color = 'inherit';
            parentLink.style.backgroundColor = '';
        });
    });
});