/**
 * Portfolio Interactive Scripts
 * Zelalem Fissha - Full-Stack Developer & Software Engineer
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. THEME SWITCHER (Light / Dark Mode)
  // ==========================================
  const themeToggle = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or system preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    htmlRoot.setAttribute('data-theme', savedTheme);
  } else if (systemPrefersDark) {
    htmlRoot.setAttribute('data-theme', 'dark');
  } else {
    htmlRoot.setAttribute('data-theme', 'light');
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlRoot.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlRoot.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  });

  // ==========================================
  // 2. NAVIGATION MENU (Hamburger Drawer)
  // ==========================================
  const menuToggle = document.getElementById('menuToggle');
  const navDropdown = document.getElementById('navDropdown');
  const navLinks = document.querySelectorAll('.nav-link');

  function toggleMenu() {
    const isOpen = navDropdown.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    navDropdown.classList.add('open');
    menuToggle.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    navDropdown.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!navDropdown.contains(e.target) && !menuToggle.contains(e.target)) {
      closeMenu();
    }
  });

  // ==========================================
  // 3. RESUME SEGMENTED TABS
  // ==========================================
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Update button states
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Update panel visibility
      tabPanels.forEach(panel => {
        if (panel.id === `panel${targetTab.charAt(0).toUpperCase() + targetTab.slice(1)}`) {
          panel.classList.add('active');
          panel.removeAttribute('hidden');
        } else {
          panel.classList.remove('active');
          panel.setAttribute('hidden', '');
        }
      });
    });
  });

  // ==========================================
  // 4. SCROLLSPY (Highlight Active Nav Link)
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  
  function updateScrollSpy() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 150;
      const sectionId = current.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else if (link.getAttribute('href')?.startsWith('#')) {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateScrollSpy, { passive: true });

  // ==========================================
  // 5. SCROLL TO TOP BUTTON
  // ==========================================
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================
  // 6. SERVICES DETAILS MODAL (Matching Screenshot)
  // ==========================================
  const serviceModal = document.getElementById('serviceModal');
  const serviceModalClose = document.getElementById('serviceModalClose');
  const modalServiceTitle = document.getElementById('modalServiceTitle');
  const modalServiceIcon = document.getElementById('modalServiceIcon');
  const modalServiceBody = document.getElementById('modalServiceBody');
  const serviceBtns = document.querySelectorAll('.service-details-btn');

  const servicesData = {
    frontend: {
      title: 'Frontend Development',
      themeClass: 'service-theme-frontend',
      iconSvg: `
        <svg viewBox="0 0 28 28" fill="none">
          <rect x="3.5" y="4.5" width="21" height="14" rx="2.5" stroke="#06b6d4" stroke-width="2.2" fill="#0c1b2c"/>
          <path d="M10.5 8.5L8 11.5L10.5 14.5" stroke="#06b6d4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M17.5 8.5L20 11.5L17.5 14.5" stroke="#06b6d4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M1.5 22.5H26.5" stroke="#06b6d4" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M4 18.5L2.5 22.5H25.5L24 18.5" stroke="#06b6d4" stroke-width="1.8" fill="none"/>
        </svg>
      `,
      items: [
        'Make websites using JavaScript, TypeScript, React.js, and Next.js',
        'Design nice and easy-to-use pages with Tailwind CSS',
        'Build web pages that work well on phones and computers',
        'Use modern tools to create fast and interactive websites'
      ]
    },
    backend: {
      title: 'Backend Development',
      themeClass: 'service-theme-backend',
      iconSvg: `
        <svg viewBox="0 0 28 28" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <ellipse cx="14" cy="6.5" rx="10" ry="3.5" fill="#092018"/>
          <path d="M24 13.5c0 1.93-4.48 3.5-10 3.5S4 15.43 4 13.5"/>
          <path d="M4 6.5v14c0 1.93 4.48 3.5 10 3.5s10-1.57 10-3.5v-14"/>
        </svg>
      `,
      items: [
        'Build scalable APIs and server-side applications with Node.js and Express',
        'Design and optimize databases with PostgreSQL, MongoDB, and MySQL',
        'Implement secure authentication, role-based access control, and data validation',
        'Integrate real-time communications using Socket.IO and WebSockets'
      ]
    },
    mobile: {
      title: 'Mobile App Development',
      themeClass: 'service-theme-mobile',
      iconSvg: `
        <svg viewBox="0 0 28 28" fill="none" stroke="#a855f7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="6.5" y="2.5" width="15" height="23" rx="3.5" fill="#170d2b"/>
          <line x1="12" y1="21.5" x2="16" y2="21.5"/>
          <line x1="11" y1="5.5" x2="17" y2="5.5"/>
        </svg>
      `,
      items: [
        'Develop high-performance cross-platform mobile apps using Flutter and Dart',
        'Build responsive, fluid UI/UX adapted for both Android and iOS',
        'Integrate offline storage, cloud synchronization, and RESTful APIs',
        'Deploy and maintain native features including push notifications and GPS tracking'
      ]
    }
  };

  serviceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceKey = btn.getAttribute('data-service');
      const data = servicesData[serviceKey];
      if (data) {
        modalServiceTitle.textContent = data.title;
        modalServiceIcon.innerHTML = data.iconSvg;
        
        // Remove prior service theme classes and apply current
        const dialog = serviceModal.querySelector('.service-modal-dialog');
        dialog.classList.remove('service-theme-frontend', 'service-theme-backend', 'service-theme-mobile');
        dialog.classList.add(data.themeClass);

        // Build deliverables list with checkmarks matching screenshot
        const checkSvg = `
          <svg viewBox="0 0 24 24" fill="none" class="check-svg-icon">
            <circle cx="12" cy="12" r="11" fill="#f59e0b"></circle>
            <path d="M7.5 12.5L10.5 15.5L16.5 9.5" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        `;

        modalServiceBody.innerHTML = `
          <ul class="service-deliverables-list">
            ${data.items.map((itemText, index) => `
              <li class="deliverable-item" style="--item-index: ${index};">
                <span class="deliverable-check-icon">${checkSvg}</span>
                <span class="deliverable-text">${itemText}</span>
              </li>
            `).join('')}
          </ul>
        `;

        serviceModal.classList.add('open');
        serviceModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeServiceModal() {
    serviceModal.classList.remove('open');
    serviceModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (serviceModalClose) {
    serviceModalClose.addEventListener('click', closeServiceModal);
  }

  serviceModal.addEventListener('click', (e) => {
    if (e.target === serviceModal) {
      closeServiceModal();
    }
  });

  // ==========================================
  // 7. QUICK CONTACT & CHAT MODAL
  // ==========================================
  const floatingChatBtn = document.getElementById('floatingChatBtn');
  const chatModal = document.getElementById('chatModal');
  const chatModalClose = document.getElementById('chatModalClose');
  const contactForm = document.getElementById('contactForm');

  function openChatModal() {
    chatModal.classList.add('open');
    chatModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeChatModal() {
    chatModal.classList.remove('open');
    chatModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (floatingChatBtn) {
    floatingChatBtn.addEventListener('click', openChatModal);
  }

  if (chatModalClose) {
    chatModalClose.addEventListener('click', closeChatModal);
  }

  chatModal.addEventListener('click', (e) => {
    if (e.target === chatModal) {
      closeChatModal();
    }
  });

  // Handle contact form submission
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value;
      const email = document.getElementById('contactEmail').value;
      const subject = document.getElementById('contactSubject').value;
      const message = document.getElementById('contactMessage').value;

      // Construct mailto link
      const mailtoLink = `mailto:dagmawifissha6@gmail.com?subject=${encodeURIComponent(`[Portfolio] ${subject} - ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      
      window.location.href = mailtoLink;

      // Friendly visual feedback
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `<span>Opening Mail Client...</span> ✓`;
      submitBtn.style.background = '#10b981';

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        closeChatModal();
        contactForm.reset();
      }, 2000);
    });
  }

  // ==========================================
  // 8. PROJECT PREVIEW IMAGE SWITCHER
  // ==========================================
  const previewSwitchBtns = document.querySelectorAll('.preview-switch-btn');
  previewSwitchBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetImgSrc = btn.getAttribute('data-img');
      const wrap = btn.closest('.project-preview-wrap');
      if (wrap) {
        const img = wrap.querySelector('.project-img');
        if (img && targetImgSrc) {
          img.src = targetImgSrc;
        }
        wrap.querySelectorAll('.preview-switch-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }
    });
  });

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (serviceModal.classList.contains('open')) closeServiceModal();
      if (chatModal.classList.contains('open')) closeChatModal();
      if (navDropdown.classList.contains('open')) closeMenu();
    }
  });
});
