/**
 * NACLORA - Professional B2B Website
 * Main JavaScript File
 */

(function() {
  'use strict';

  // ============================================
  // DOM Elements
  // ============================================
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const navLinks = document.querySelectorAll('.nav__link');
  const fadeElements = document.querySelectorAll('.fade-in');
  const contactForm = document.getElementById('contact-form');

  // ============================================
  // Header Scroll Effect
  // ============================================
  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // Throttle scroll events for better performance
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function() {
        handleScroll();
        scrollTimeout = null;
      }, 10);
    }
  });

  // Initial check
  handleScroll();

  // ============================================
  // Mobile Navigation
  // ============================================
  function toggleMobileMenu() {
    mobileToggle.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.classList.toggle('menu-open');
  }

  function closeMobileMenu() {
    mobileToggle.classList.remove('active');
    mobileNav.classList.remove('open');
    document.body.classList.remove('menu-open');
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileMenu);
  }

  // Close menu when clicking a nav link
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 968) {
        closeMobileMenu();
      }
    });
  });

  // Close menu on window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 968) {
      closeMobileMenu();
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (mobileNav && mobileNav.classList.contains('open')) {
      if (!mobileNav.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeMobileMenu();
      }
    }
  });

  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================
  // Intersection Observer for Fade Animations
  // ============================================
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };

  const fadeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(function(element) {
    fadeObserver.observe(element);
  });

  // ============================================
  // Contact Form Handling
  // ============================================
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const data = {};
      
      formData.forEach(function(value, key) {
        data[key] = value;
      });
      
      // Basic validation
      if (!data.name || !data.email) {
        showNotification('Por favor, completa todos los campos requeridos.', 'error');
        return;
      }
      
      if (!isValidEmail(data.email)) {
        showNotification('Por favor, introduce un email válido.', 'error');
        return;
      }
      
      // Simulate form submission
      const submitBtn = this.querySelector('.form__submit');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Enviando...</span>';
      
      // Simulate API call
      setTimeout(function() {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
        showNotification('Mensaje enviado correctamente. Te contactaremos pronto.', 'success');
      }, 1500);
    });
  }

  // Email validation helper
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // ============================================
  // Notification System
  // ============================================
  function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification notification--' + type;
    notification.innerHTML = '\n      <div class="notification__content">\n        <span class="notification__icon">\n          ' + (type === 'success' 
            ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>'
            : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
          ) + '\n        </span>\n        <span class="notification__message">' + message + '</span>\n        <button class="notification__close" onclick="this.parentElement.parentElement.remove()">\n          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>\n        </button>\n      </div>\n    ';
    
    // Add styles if not already present
    if (!document.querySelector('#notification-styles')) {
      const styles = document.createElement('style');
      styles.id = 'notification-styles';
      styles.textContent = '\n        .notification {\n          position: fixed;\n          top: 100px;\n          right: 20px;\n          z-index: 9999;\n          animation: slideIn 0.3s ease;\n        }\n        @keyframes slideIn {\n          from { opacity: 0; transform: translateX(100px); }\n          to { opacity: 1; transform: translateX(0); }\n        }\n        .notification__content {\n          display: flex;\n          align-items: center;\n          gap: 12px;\n          padding: 16px 20px;\n          background: #fff;\n          border-radius: 8px;\n          box-shadow: 0 10px 40px rgba(0,0,0,0.15);\n          max-width: 400px;\n        }\n        .notification--success .notification__content {\n          border-left: 4px solid #22c55e;\n        }\n        .notification--error .notification__content {\n          border-left: 4px solid #ef4444;\n        }\n        .notification__icon {\n          width: 24px;\n          height: 24px;\n          flex-shrink: 0;\n        }\n        .notification--success .notification__icon { color: #22c55e; }\n        .notification--error .notification__icon { color: #ef4444; }\n        .notification__icon svg {\n          width: 100%;\n          height: 100%;\n        }\n        .notification__message {\n          font-size: 14px;\n          color: #333;\n        }\n        .notification__close {\n          width: 20px;\n          height: 20px;\n          padding: 0;\n          background: none;\n          border: none;\n          cursor: pointer;\n          color: #999;\n          flex-shrink: 0;\n        }\n        .notification__close:hover { color: #333; }\n        .notification__close svg {\n          width: 100%;\n          height: 100%;\n        }\n      ';
      document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(function() {
      if (notification.parentElement) {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(function() {
          notification.remove();
        }, 300);
      }
    }, 5000);
  }

  // ============================================
  // Animated Counter for Stats
  // ============================================
  function animateCounter(element, target, suffix) {
    suffix = suffix || '';
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(function() {
      current += increment;
      if (current >= target) {
        element.textContent = target + suffix;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current) + suffix;
      }
    }, 16);
  }

  // Observe stats for animation
  const statElements = document.querySelectorAll('.stat__value, .hero__stat-value');
  const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated');
        
        const text = entry.target.textContent;
        const match = text.match(/([>]?)(\d+)(%?|x?)/);
        
        if (match) {
          const prefix = match[1] || '';
          const number = parseInt(match[2]);
          const suffix = match[3] || '';
          
          entry.target.textContent = prefix + '0' + suffix;
          
          setTimeout(function() {
            animateCounter(entry.target, number, suffix);
            if (prefix) {
              const updateWithPrefix = setInterval(function() {
                entry.target.textContent = prefix + entry.target.textContent;
                if (entry.target.textContent.includes(String(number))) {
                  clearInterval(updateWithPrefix);
                  entry.target.textContent = prefix + number + suffix;
                }
              }, 50);
            }
          }, 200);
        }
        
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statElements.forEach(function(stat) {
    statsObserver.observe(stat);
  });

  // ============================================
  // Lazy Loading Images
  // ============================================
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(function(img) {
      imageObserver.observe(img);
    });
  }

  // ============================================
  // Keyboard Navigation Support
  // ============================================
  document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // ============================================
  // Prevent Body Scroll When Menu Open
  // ============================================
  const style = document.createElement('style');
  style.textContent = '\n    body.menu-open {\n      overflow: hidden;\n    }\n  ';
  document.head.appendChild(style);

  // ============================================
  // Initialize on DOM Ready
  // ============================================
  console.log('Naclora Website Initialized');

})();
