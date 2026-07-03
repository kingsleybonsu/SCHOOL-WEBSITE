/*  STICKY NAVBAR  */
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });

    /* MOBILE MENU */
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    /* INTERSECTION OBSERVER — SCROLL REVEAL */
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* COUNTER ANIMATION */
    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          counters.forEach(counter => {
            const target = +counter.dataset.target;
            const suffix = counter.dataset.suffix || '';
            const duration = 2000;
            const start = performance.now();

            function update(now) {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              counter.textContent = Math.floor(eased * target) + suffix;
              if (progress < 1) requestAnimationFrame(update);
            }

            requestAnimationFrame(update);
          });
        }
      });
    }, { threshold: 0.5 });

    const statsSection = document.getElementById('stats');
    if (statsSection) counterObserver.observe(statsSection);

    /* TESTIMONIAL SLIDER */
    const track = document.getElementById('testimonialTrack');
    const slides = track.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.getElementById('testimonialDots');
    let currentSlide = 0;
    let autoSlideInterval;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('testimonial-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.testimonial-dot');

    function goToSlide(index) {
      currentSlide = index;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }

    document.getElementById('prevTestimonial').addEventListener('click', () => {
      goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
      resetAutoSlide();
    });

    document.getElementById('nextTestimonial').addEventListener('click', () => {
      goToSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
      resetAutoSlide();
    });

    function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
        goToSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 0);
      }, 6000);
    }

    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }

    startAutoSlide();

    /* ACTIVE NAV LINK ON SCROLL */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 120) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
      });
    });

    /*  FORM HANDLERS (demo) */
    document.getElementById('contactForm').addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you! Your message has been received. We will get back to you within 24 hours.');
      e.target.reset();
    });

    document.getElementById('newsletterForm').addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for subscribing to our newsletter!');
      e.target.reset();
    });