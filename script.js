const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

const allSections = document.querySelectorAll('section[id]');
const navLinksList = document.querySelectorAll('.nav-links a');

function updateActiveLink() {
  let current = '';
  allSections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinksList.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink);

const projects = [
  {
    id: 1,
    title: "Персональное портфолио — Tech Stack",
    description: "Современное SPA‑портфолио под разработчика: демонстрация навыков, проектов и стека технологий. Показывает, как я подхожу к структуре и интерфейсу более сложных страниц.",
    fullDescription: "Одностраничное приложение с современным дизайном, созданное для демонстрации моих проектов и навыков. Полностью адаптивное решение с плавными анимациями.",
    type: "SPA-приложение",
    tags: ["React", "Portfolio"],
    technologies: ["React", "CSS Modules", "Vercel", "Responsive Design"],
    features: [
      "Современный SPA с реактивными компонентами",
      "Адаптивный дизайн для всех устройств",
      "Плавные анимации и переходы",
      "Оптимизация производительности",
      "SEO-дружественная структура"
    ],
    links: {
      demo: "https://tech-stack-denis.vercel.app",
      github: "https://github.com/orlioglodenis24"
    },
    image: "img/1.jpg",
    badge: "Live Demo"
  },
  {
    id: 2,
    title: "Сайт-визитка «Tomir Logistic»",
    description: "Адаптивный лендинг для логистической компании: кратко о компании, услугах, преимуществах и контактах. Подходит как пример сайта‑визитки для локального бизнеса (салон, сервис, студия, клиника).",
    fullDescription: "Корпоративный лендинг для логистической компании с акцентом на UX/UI. Сайт демонстрирует услуги компании и предоставляет контактную информацию.",
    type: "Корпоративный лендинг",
    tags: ["Landing Page", "Business"],
    technologies: ["HTML5", "CSS3", "JavaScript", "Vercel"],
    features: [
      "Полностью адаптивный дизайн",
      "Оптимизированная скорость загрузки",
      "Интуитивная навигация",
      "Контактная форма с валидацией",
      "Интеграция с картами"
    ],
    links: {
      demo: "https://logistic-test-seven.vercel.app",
      github: "https://github.com/orlioglodenis24"
    },
    image: "img/2.jpg",
    badge: "Live Demo"
  },
  {
    id: 3,
    title: "TofffixShop (демо-версия магазина)",
    description: "Прототип интернет‑магазина с базовой логикой каталога и карточек товара. Может быть основой для небольшого онлайн‑магазина или раздела «Каталог» на сайте компании.",
    fullDescription: "Демо-версия интернет-магазина с современным интерфейсом и базовой функциональностью корзины покупок.",
    type: "E-commerce демо",
    tags: ["E-commerce", "Demo"],
    technologies: ["HTML", "CSS", "JavaScript"],
    features: [
      "Каталог товаров с фильтрацией",
      "Корзина покупок",
      "Адаптивная сетка товаров",
      "Детальные страницы продуктов",
      "Базовые анимации интерфейса"
    ],
    links: {
      demo: "#",
      github: "https://github.com/orlioglodenis24"
    },
    image: "img/3.jpg",
    badge: "Demo Project"
  },
  {
    id: 4,
    title: "Анонимный чат-бот Telegram",
    description: "Бот для анонимного общения с случайными собеседниками",
    fullDescription: "Telegram бот для анонимного общения, который соединяет случайных пользователей для приватных разговоров без раскрытия личности.",
    type: "Telegram Bot",
    tags: ["Telegram", "Bot", "Chat"],
    technologies: ["Python", "Telegram API", "WebSockets"],
    features: [
      "Полная анонимность пользователей",
      "Поиск случайных собеседников",
      "Защита от спама и оскорблений",
      "Мгновенная передача сообщений",
      "Команды управления чатом (/stop, /search)"
    ],
    links: {
      demo: "https://t.me/TofixChat",
      github: "https://github.com/orlioglodenis24"
    },
    image: "img/4.jpg",
    badge: "Bot Live"
  }
];

const modal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalImage = document.getElementById('modalImage');
const modalTag = document.getElementById('modalTag');
const modalTitle = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const modalTech = document.getElementById('modalTech');
const modalFeatures = document.getElementById('modalFeatures');
const modalLinks = document.getElementById('modalLinks');

// ===== СЛАЙДЕР ПРОЕКТОВ =====
let currentSlide = 0;
let sliderInterval = null;
let isSliderInitialized = false;

function createProjectSlide(project) {
  return `
    <div class="slider-slide" data-id="${project.id}">
      ${project.badge ? `<div class="slide-badge">${project.badge}</div>` : ''}
      <div class="slide-image">
        <img src="${project.image}" alt="${project.title}" loading="lazy">
      </div>
      <div class="slide-content">
        <span class="slide-tag">${project.tags.join(' • ')}</span>
        <h3 class="slide-title">${project.title}</h3>
        <p class="slide-description">${project.description}</p>
        <div class="project-tech">
          ${project.technologies.slice(0, 3).map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
      </div>
    </div>
  `;
}

function createProjectCard(project) {
  return `
    <div class="project-card" data-id="${project.id}">
      ${project.badge ? `<div class="project-badge">${project.badge}</div>` : ''}
      <div class="project-image">
        <img src="${project.image}" alt="${project.title}" loading="lazy">
      </div>
      <div class="project-content">
        <span class="project-tag">${project.type}</span>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tech">
          ${project.technologies.slice(0, 4).map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
      </div>
    </div>
  `;
}

function createGitHubCard() {
  return `
    <a href="https://github.com/orlioglodenis24" target="_blank" rel="noopener noreferrer" class="project-card github-project-card">
      <div class="github-card-wrapper">
        <div class="github-icon-large">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </div>
        <div class="github-content">
          <span class="project-tag">Открытый код</span>
          <h3 class="project-title">12+ других проектов</h3>
          <p class="project-description">Полный код и документация — на моём GitHub. Открытые примеры верстки, интеграций и небольших приложений.</p>
          <div class="project-tech">
            <span class="tech-tag">React</span>
            <span class="tech-tag">SPA</span>
            <span class="tech-tag">API</span>
            <span class="tech-tag">UI/UX</span>
          </div>
          <div class="github-badge">
            github.com/orlioglodenis24 →
          </div>
        </div>
      </div>
    </a>
  `;
}

function updateSlider() {
  const sliderContainer = document.getElementById('sliderContainer');
  const dots = document.querySelectorAll('.slider-dot');
  
  if (!sliderContainer || !sliderContainer.children.length || !isSliderInitialized) return;
  
  const slideWidth = sliderContainer.children[0].offsetWidth;
  const gap = 24;
  const translateX = -(currentSlide * (slideWidth + gap));
  
  sliderContainer.style.transform = `translateX(${translateX}px)`;
  
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

function goToSlide(index) {
  const sliderContainer = document.getElementById('sliderContainer');
  if (!sliderContainer || !sliderContainer.children.length) return;
  
  const totalSlides = sliderContainer.children.length;
  currentSlide = (index + totalSlides) % totalSlides;
  updateSlider();
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function prevSlide() {
  goToSlide(currentSlide - 1);
}

function initializeSlider() {
  const sliderContainer = document.getElementById('sliderContainer');
  const sliderDots = document.getElementById('sliderDots');
  const projectsGrid = document.getElementById('projectsGrid');
  
  if (!sliderContainer || !sliderDots || !projectsGrid) return;
  
  // Очищаем контейнеры
  sliderContainer.innerHTML = '';
  sliderDots.innerHTML = '';
  projectsGrid.innerHTML = '';
  
  // Добавляем слайды и точки
  projects.forEach((project, index) => {
    sliderContainer.innerHTML += createProjectSlide(project);
    
    const dot = document.createElement('div');
    dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
    dot.dataset.index = index;
    dot.addEventListener('click', () => goToSlide(index));
    sliderDots.appendChild(dot);
    
    projectsGrid.innerHTML += createProjectCard(project);
  });
  
  // Добавляем GitHub карточку в сетку
  projectsGrid.innerHTML += createGitHubCard();
  
  // Инициализируем слайдер
  isSliderInitialized = true;
  updateSlider();
  
  // Обработчики кликов на карточки
  document.querySelectorAll('.project-card:not(.github-project-card), .slider-slide').forEach(card => {
    card.addEventListener('click', () => {
      const projectId = parseInt(card.dataset.id);
      openProjectModal(projectId);
    });
  });
}

function startAutoSlide() {
  if (window.innerWidth <= 960 && projects.length > 1) {
    stopAutoSlide();
    sliderInterval = setInterval(nextSlide, 5000);
  }
}

function stopAutoSlide() {
  if (sliderInterval) {
    clearInterval(sliderInterval);
    sliderInterval = null;
  }
}

function handleResize() {
  // Переинициализируем слайдер при изменении размера окна
  currentSlide = 0;
  updateSlider();
  
  // Перезапускаем автослайд
  stopAutoSlide();
  startAutoSlide();
}

// Добавляем обработчики свайпа для мобильных
function initSwipe() {
  let touchStartX = 0;
  let touchEndX = 0;
  
  const sliderContainer = document.getElementById('sliderContainer');
  if (!sliderContainer) return;
  
  sliderContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoSlide();
  });
  
  sliderContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    setTimeout(startAutoSlide, 1000);
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Свайп влево - следующий слайд
        nextSlide();
      } else {
        // Свайп вправо - предыдущий слайд
        prevSlide();
      }
    }
  }
}

function openProjectModal(projectId) {
  const project = projects.find(p => p.id === projectId);
  if (!project) return;
  
  modalImage.innerHTML = `<img src="${project.image}" alt="${project.title}">`;
  modalTag.textContent = project.type;
  modalTitle.textContent = project.title;
  modalSubtitle.textContent = project.fullDescription;
  
  modalTech.innerHTML = project.technologies.map(tech => 
    `<span class="tech-tag">${tech}</span>`
  ).join('');
  
  modalFeatures.innerHTML = project.features.map(feature => 
    `<li>${feature}</li>`
  ).join('');
  
  modalLinks.innerHTML = '';
  
  if (project.links.demo && project.links.demo !== '#') {
    const demoLink = document.createElement('a');
    demoLink.href = project.links.demo;
    demoLink.target = '_blank';
    demoLink.rel = 'noopener noreferrer';
    demoLink.className = 'modal-link demo';
    demoLink.innerHTML = `
      <span class="modal-link-icon">🌐</span>
      <div>
        <strong>Открыть демо</strong>
        <small>${project.links.demo}</small>
      </div>
    `;
    modalLinks.appendChild(demoLink);
  }
  
  const githubLink = document.createElement('a');
  githubLink.href = project.links.github;
  githubLink.target = '_blank';
  githubLink.rel = 'noopener noreferrer';
  githubLink.className = 'modal-link';
  githubLink.innerHTML = `
    <span class="modal-link-icon">💻</span>
    <div>
      <strong>Исходный код</strong>
      <small>GitHub репозиторий</small>
    </div>
  `;
  modalLinks.appendChild(githubLink);
  
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', () => {
  // Инициализируем слайдер
  initializeSlider();
  
  // Назначаем кнопки управления
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  
  // Запускаем автослайд
  startAutoSlide();
  
  // Инициализируем свайп для мобильных
  initSwipe();
  
  // Обработчики для паузы при наведении
  const mobileSlider = document.getElementById('mobileSlider');
  if (mobileSlider) {
    mobileSlider.addEventListener('mouseenter', stopAutoSlide);
    mobileSlider.addEventListener('mouseleave', startAutoSlide);
  }
  
  // Обработчик изменения размера окна
  window.addEventListener('resize', handleResize);
  
  // Обновляем слайдер при первой загрузке
  setTimeout(() => {
    updateSlider();
  }, 100);
  
  // Анимация элементов
  const elementsToAnimate = document.querySelectorAll('.service-card, .testimonial-card, .pricing-card');
  
  elementsToAnimate.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      el.style.transition = 'all 0.6s ease-out';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, index * 100);
  });
});

// Обработка клавиш для навигации по слайдам
document.addEventListener('keydown', (e) => {
  if (window.innerWidth <= 960 && isSliderInitialized) {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      e.preventDefault();
    }
    if (e.key === 'ArrowRight') {
      nextSlide();
      e.preventDefault();
    }
  }
});

modalClose.addEventListener('click', () => {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
  if (e.target === modal || e.target.classList.contains('modal-overlay')) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

document.addEventListener('keydown', (e) => {
  if (modal.style.display === 'block' && e.key === 'Escape') {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Обновленный обработчик формы с улучшенным форматированием
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const project = document.getElementById('project').value.trim();

  // Форматируем сообщение
  const message = `🎯 *Новая заявка с сайта denisdev.md*\n\n` +
                  `👤 *Имя:* ${name}\n` +
                  `📞 *Контакт:* ${email}\n\n` +
                  `📋 *О проекте:*\n${project}\n\n` +
                  `📅 *Когда получено:* ${new Date().toLocaleString('ru-RU')}`;

  // Кодируем для URL
  const encodedMessage = encodeURIComponent(message);
  
  // Открываем Telegram
  window.open(`https://t.me/orlioglodenis24?text=${encodedMessage}`, '_blank');
  
  // Очищаем форму
  document.getElementById('contactForm').reset();
  
  // Показываем уведомление
  alert('Сейчас откроется Telegram с готовым сообщением. Просто нажмите "Отправить"!');
});

// Other effects
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.service-card, .testimonial-card, .pricing-card').forEach(el => {
  observer.observe(el);
});

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const parallaxElements = document.querySelectorAll('.hero-visual');
  
  parallaxElements.forEach(el => {
    el.style.transform = `translateY(${scrolled * 0.3}px)`;
  });
});

const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.borderRadius = '50%';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'rippleEffect 0.6s ease-out';
    
    btn.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

window.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  
  document.querySelectorAll('.service-card').forEach(card => {
    const rect = card.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;
    
    const angle = Math.atan2(mouseY - cardCenterY, mouseX - cardCenterX);
    const distance = Math.sqrt(
      Math.pow(mouseX - cardCenterX, 2) + 
      Math.pow(mouseY - cardCenterY, 2)
    );
    
    if (distance < 300) {
      const strength = (300 - distance) / 300;
      card.style.transform = `perspective(1000px) rotateX(${Math.sin(angle) * strength * 5}deg) rotateY(${Math.cos(angle) * strength * 5}deg)`;
    } else {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
  });
});

class ParticleEffect {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.zIndex = '-1';
    this.canvas.style.pointerEvents = 'none';
    document.body.appendChild(this.canvas);
    
    this.particles = [];
    this.resize();
    this.animate();
    
    window.addEventListener('resize', () => this.resize());
    document.addEventListener('mousemove', (e) => this.createParticles(e.clientX, e.clientY));
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  createParticles(x, y) {
    for (let i = 0; i < 3; i++) {
      this.particles.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        life: 1,
        size: Math.random() * 3 + 1,
        color: `rgba(34, 197, 94, ${Math.random() * 0.5})`
      });
    }
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles = this.particles.filter(p => p.life > 0);
    
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.02;
      p.vy += 0.1;
      
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      this.ctx.fill();
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

new ParticleEffect();

const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
  input.addEventListener('focus', () => {
    input.parentElement.style.animation = 'pulse 0.5s ease';
  });
  
  input.addEventListener('blur', () => {
    input.parentElement.style.animation = 'none';
  });
});

let lastScrollY = 0;
window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  const nav = document.querySelector('nav');
  
  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    nav.style.transform = 'translateY(-100%)';
  } else {
    nav.style.transform = 'translateY(0)';
  }
  
  lastScrollY = currentScrollY;
});

const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
  card.addEventListener('mouseenter', () => {
    serviceCards.forEach((c, i) => {
      if (i !== index) {
        c.style.opacity = '0.6';
        c.style.transform = 'scale(0.95)';
      }
    });
  });
  
  card.addEventListener('mouseleave', () => {
    serviceCards.forEach(c => {
      c.style.opacity = '1';
      c.style.transform = 'scale(1)';
    });
  });
});

window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

const pricingButtons = document.querySelectorAll('.pricing-card button');
pricingButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.pricing-card');
    const priceName = card.querySelector('.pricing-name').textContent;
    const message = `Интересует пакет: ${encodeURIComponent(priceName)}`;
    window.open(`https://t.me/orlioglodenis24?text=${message}`, '_blank');
  });
});

const countUpElements = document.querySelectorAll('[data-count]');
countUpElements.forEach(element => {
  const target = parseInt(element.getAttribute('data-count'));
  let current = 0;
  const increment = target / 50;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && current === 0) {
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
          } else {
            element.textContent = Math.floor(current);
          }
        }, 30);
      }
    });
  });
  
  observer.observe(element);
});

const smoothLinks = document.querySelectorAll('a[href^="#"]');
smoothLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        if (window.innerWidth <= 768) {
          navLinks.classList.remove('active');
        }
      }
    }
  });
});

document.addEventListener('click', (e) => {
  if (e.target.matches('.btn-primary, .btn-secondary') && !e.target.href) {
    e.target.blur();
  }
});

window.addEventListener('load', () => {
  document.querySelectorAll('.service-card, .testimonial-card').forEach((card, index) => {
    setTimeout(() => {
      card.style.animation = 'fadeInUp 0.6s ease forwards';
    }, index * 100);
  });
});

const heroContent = document.querySelector('.hero-content');
if (heroContent) {
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.8s ease 0.2s forwards';
      }
    });
  });
  heroObserver.observe(heroContent);
}

document.addEventListener('touchstart', (e) => {
  if (e.target.closest('.btn')) {
    e.target.closest('.btn').style.opacity = '0.8';
  }
});

document.addEventListener('touchend', (e) => {
  if (e.target.closest('.btn')) {
    e.target.closest('.btn').style.opacity = '1';
  }
});