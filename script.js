// Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for navigation links
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

        // Slideshow functionality
        let slideIndex = 0;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        
        function showSlides(n) {
            // Wrap around if at end
            if (n >= slides.length) slideIndex = 0;
            if (n < 0) slideIndex = slides.length - 1;
            
            // Hide all slides
            slides.forEach(slide => {
                slide.classList.remove('active');
                slide.classList.add('fade');
            });
            
            // Remove active class from all dots
            dots.forEach(dot => dot.classList.remove('active-dot'));
            
            // Show the current slide and dot
            slides[slideIndex].classList.add('active');
            dots[slideIndex].classList.add('active-dot');
        }

        // Next/previous controls
        document.querySelector('.next').addEventListener('click', () => {
            slideIndex++;
            showSlides(slideIndex);
        });

        document.querySelector('.prev').addEventListener('click', () => {
            slideIndex--;
            showSlides(slideIndex);
        });

        // Dot controls
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                slideIndex = index;
                showSlides(slideIndex);
            });
        });

        // Auto-advance slides
        setInterval(() => {
            slideIndex++;
            showSlides(slideIndex);
        }, 5000);

        // Section reveal on scroll
        function checkScroll() {
            const sections = document.querySelectorAll('.section');
            const windowHeight = window.innerHeight;
            
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                if (sectionTop < windowHeight * 0.75) {
                    section.classList.add('show');
                }
            });
        }

        // Initial check and then on scroll
        checkScroll();
        window.addEventListener('scroll', checkScroll);

        // Set active navigation link based on scroll position
        function setActiveNavLink() {
            const sections = document.querySelectorAll('.section');
            const navLinks = document.querySelectorAll('.navbar a');
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - 100) {
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

        window.addEventListener('scroll', setActiveNavLink);

        // Gallery animation on scroll
document.addEventListener('DOMContentLoaded', function() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  function animateGalleryItems() {
    galleryItems.forEach((item, idx) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        if (idx % 2 === 0) {
          item.classList.add('animate-left');
        } else {
          item.classList.add('animate-right');
        }
      }
    });
  }
  window.addEventListener('scroll', animateGalleryItems);
  animateGalleryItems(); // Run on load
});

// Add mobile menu toggle (hamburger)
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  // support either id="main-nav" or class="nav-links"
  const navLinks = document.getElementById('main-nav') || document.querySelector('.nav-links');

  if (!navbar || !hamburger || !navLinks) return;

  function setAriaExpanded(val) {
    hamburger.setAttribute('aria-expanded', String(val));
  }

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navbar.classList.toggle('open');
    setAriaExpanded(isOpen);
  });

  // close menu on link click (mobile)
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (navbar.classList.contains('open')) {
        navbar.classList.remove('open');
        setAriaExpanded(false);
      }
    });
  });

  // close when clicking outside
  document.addEventListener('click', (ev) => {
    if (!navbar.contains(ev.target) && navbar.classList.contains('open')) {
      navbar.classList.remove('open');
      setAriaExpanded(false);
    }
  });

  // close when resizing to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navbar.classList.contains('open')) {
      navbar.classList.remove('open');
      setAriaExpanded(false);
    }
  });
});