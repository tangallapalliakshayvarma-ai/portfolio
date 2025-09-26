// Custom JavaScript (script.js)

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('back-to-top');

    // Menu toggle (mobile)
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scroll + active link update
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                // Scroll target offset for fixed header
                const offsetTop = target.offsetTop - 80; 
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });

                // close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) mobileMenu.classList.add('hidden');

                // update active class
                navLinks.forEach(n => n.classList.remove('active'));
                const matching = document.querySelectorAll(`.nav-link[href="${href}"]`);
                matching.forEach(m => m.classList.add('active'));
            }
        });
    });

    // Update active link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 90;
        sections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(n => n.classList.remove('active'));
                document.querySelectorAll(`.nav-link[href="#${id}"]`).forEach(el => el.classList.add('active'));
            }
        });

        // back-to-top visibility
        if (backToTop) {
            if (window.scrollY > 400) backToTop.classList.remove('hidden'); else backToTop.classList.add('hidden');
        }
    });

    // Back to top click
    if (backToTop) {
        backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    /* ---------------------------------------------------------------------- */
    /* Skill Animation using Intersection Observer (Uses data-target in HTML) */
    /* ---------------------------------------------------------------------- */
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null, 
            rootMargin: '0px',
            threshold: 0.8 // Trigger when 80% of the element is visible
        };

        const skillObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    // Reads the target percentage from the HTML attribute (e.g., "95")
                    const targetWidth = bar.getAttribute('data-target');

                    if (targetWidth) {
                        // Sets the final width, which triggers the CSS transition (from 0% to X%)
                        bar.style.width = targetWidth + '%';
                    }
                    
                    // Stop observing after the animation runs
                    observer.unobserve(bar);
                }
            });
        }, observerOptions);

        // Start observing all skill bars
        skillProgressBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    } else {
        // Fallback: set the final width immediately if Observer is not supported
        skillProgressBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-target');
            if (targetWidth) {
                 bar.style.width = targetWidth + '%';
            }
        });
    }
});