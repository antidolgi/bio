// ===== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ И КОНФИГУРАЦИЯ =====
const CONFIG = {
    SITE_NAME: 'ТуалетБио',
    SITE_URL: 'туалетбио.рф',
    PHONE: '+7 (995) 788-66-68',
    EMAIL: 'antidolgi24@gmail.com',
    THEME_KEY: 'tualetbio_theme',
    FORM_DATA_KEY: 'tualetbio_form_data'
};

// Состояние приложения
const STATE = {
    theme: 'light',
    cart: [],
    currentModel: null,
    chatOpen: false,
    doorOpen: false,
    formData: {},
    calculator: {
        model: '1490',
        days: 7,
        quantity: 1,
        city: 'Москва'
    }
};

// DOM элементы
const DOM = {
    themeToggle: null,
    navbar: null,
    menuToggle: null,
    navLinks: null,
    mobileMenuOverlay: null,
    particlesCanvas: null,
    toiletDoor: null,
    scrollTop: null,
    pageProgress: null,
    successModal: null,
    privacyModal: null,
    model3DModal: null,
    orderForm: null,
    chatWidget: null,
    chatBody: null,
    chatInput: null,
    chatSend: null,
    calcModel: null,
    calcDays: null,
    daysValue: null,
    calcQuantity: null,
    calcCity: null,
    totalCost: null,
    rentCost: null,
    deliveryCost: null,
    serviceCost: null,
    discountValue: null,
    faqQuestions: null
};

// Данные для чат-бота
const CHAT_BOT_RESPONSES = {
    'рассчитать стоимость': 'Отлично! Перейдите в раздел "Калькулятор" или я помогу вам прямо здесь:\n1. На какой срок нужен биотуалет?\n2. Сколько человек будут использовать?\n3. В каком городе нужна доставка?',
    'подобрать модель': 'У нас есть 4 основные модели:\n🚽 Стандарт Эко - для строительных площадок\n🚽 Комфорт Плюс - с раковиной и зеркалом\n🚽 Премиум Люкс - VIP с подогревом\n🚽 Мобильный комплекс - для мероприятий\nКакой тип задач вам нужен?',
    'доставка': '🚚 Доставка в течение 2 часов по городу!\n• Бесплатная установка\n• Круглосуточная доставка\n• По всей России\n• Гарантия быстрой доставки',
    'обслуживание': '🧹 Обслуживаем каждые 3-7 дней\n• Биоразлагаемые реагенты\n• Дезинфекция\n• Отчёт о работе\n• Круглосуточный вызов',
    'менеджер': 'Сейчас перенаправлю вас на прямую линию с менеджером. Или позвоните прямо сейчас: ' + CONFIG.PHONE,
    'цена': 'Стоимость аренды от 990 ₽/сутки\n• Стандарт: 990 ₽/сутки\n• Комфорт: 1 490 ₽/сутки\n• Премиум: 1 990 ₽/сутки\n• Комплекс: 6 500 ₽/сутки',
    'гарантия': '✅ Гарантия 12 месяцев\n✅ Бесплатный ремонт в течение 24 часов\n✅ Страхование оборудования\n✅ Круглосуточная поддержка',
    'документы': 'Мы предоставляем полный пакет документов:\n• Договор аренды/продажи\n• Акт приёма-передачи\n• Накладные\n• Закрывающие акты\n• Отчётность по обслуживанию'
};

// ===== ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ =====
document.addEventListener('DOMContentLoaded', () => {
    console.log(`%c🚀 ${CONFIG.SITE_NAME} v3.0`, 'font-size: 20px; color: #00C9B1; font-weight: bold;');
    console.log('%c✨ Технологии: WebGL, CSS 3D, AI-бот, PWA', 'color: #FF7A00;');
    
    initializeDOM();
    initializeTheme();
    initializeNavigation();
    initializeParticles();
    initialize3DModel();
    initializeCalculator();
    initializeForm();
    initializeChatBot();
    initializeFAQ();
    initializeScroll();
    initializeModals();
    
    // Показываем сайт
    setTimeout(() => {
        document.body.classList.add('loaded');
        startCountAnimations();
    }, 100);
});

// ===== ИНИЦИАЛИЗАЦИЯ DOM ЭЛЕМЕНТОВ =====
function initializeDOM() {
    DOM.themeToggle = document.querySelector('.theme-toggle');
    DOM.navbar = document.querySelector('.navbar');
    DOM.menuToggle = document.getElementById('menuToggle');
    DOM.navLinks = document.querySelector('.nav-links');
    DOM.mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    DOM.particlesCanvas = document.getElementById('particles-canvas');
    DOM.toiletDoor = document.getElementById('toiletDoor');
    DOM.scrollTop = document.getElementById('scrollTop');
    DOM.pageProgress = document.getElementById('progressBar');
    DOM.successModal = document.getElementById('successModal');
    DOM.privacyModal = document.getElementById('privacyModal');
    DOM.model3DModal = document.getElementById('model3DModal');
    DOM.orderForm = document.getElementById('orderForm');
    DOM.chatWidget = document.querySelector('.chat-bot-widget');
    DOM.chatBody = document.getElementById('chatBody');
    DOM.chatInput = document.getElementById('chatInput');
    DOM.chatSend = document.getElementById('chatSend');
    DOM.calcModel = document.getElementById('calcModel');
    DOM.calcDays = document.getElementById('calcDays');
    DOM.daysValue = document.getElementById('daysValue');
    DOM.calcQuantity = document.getElementById('calcQuantity');
    DOM.calcCity = document.getElementById('calcCity');
    DOM.totalCost = document.getElementById('totalCost');
    DOM.rentCost = document.getElementById('rentCost');
    DOM.deliveryCost = document.getElementById('deliveryCost');
    DOM.serviceCost = document.getElementById('serviceCost');
    DOM.discountValue = document.getElementById('discountValue');
    DOM.faqQuestions = document.querySelectorAll('.faq-question');
}

// ===== УПРАВЛЕНИЕ ТЕМОЙ =====
function initializeTheme() {
    // Загружаем сохранённую тему или определяем системную
    const savedTheme = localStorage.getItem(CONFIG.THEME_KEY);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    STATE.theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', STATE.theme);
    
    if (DOM.themeToggle) {
        DOM.themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    STATE.theme = STATE.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', STATE.theme);
    localStorage.setItem(CONFIG.THEME_KEY, STATE.theme);
    
    // Переинициализация частиц для новой темы
    if (DOM.particlesCanvas) {
        initializeParticles();
    }
    
    // Анимация переключения
    DOM.themeToggle.style.transform = 'rotate(180deg)';
    setTimeout(() => {
        DOM.themeToggle.style.transform = 'rotate(0)';
    }, 300);
}

// ===== НАВИГАЦИЯ =====
function initializeNavigation() {
    // Прокрутка навигации
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            DOM.navbar.classList.add('scrolled');
        } else {
            DOM.navbar.classList.remove('scrolled');
        }
        
        updateActiveNavLink();
        updateScrollTop();
        updatePageProgress();
    });
    
    // Мобильное меню
    if (DOM.menuToggle && DOM.navLinks) {
        DOM.menuToggle.addEventListener('click', toggleMobileMenu);
        
        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 992) {
                    closeMobileMenu();
                }
            });
        });
    }
    
    // Закрытие меню при клике вне его
    if (DOM.mobileMenuOverlay) {
        DOM.mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // Плавный скролл для всех якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = DOM.navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                if (window.innerWidth <= 992) {
                    closeMobileMenu();
                }
            }
        });
    });
}

function toggleMobileMenu() {
    const isExpanded = DOM.menuToggle.getAttribute('aria-expanded') === 'true';
    DOM.menuToggle.setAttribute('aria-expanded', !isExpanded);
    DOM.navLinks.classList.toggle('open');
    DOM.mobileMenuOverlay.classList.toggle('open');
    document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
}

function closeMobileMenu() {
    DOM.menuToggle.setAttribute('aria-expanded', 'false');
    DOM.navLinks.classList.remove('open');
    DOM.mobileMenuOverlay.classList.remove('open');
    document.body.style.overflow = 'auto';
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== ЧАСТИЦЫ НА ФОНЕ =====
function initializeParticles() {
    if (!DOM.particlesCanvas) return;
    
    const ctx = DOM.particlesCanvas.getContext('2d');
    let particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 10), 150);
    
    // Размеры canvas
    function resizeCanvas() {
        DOM.particlesCanvas.width = window.innerWidth;
        DOM.particlesCanvas.height = window.innerHeight;
        initParticles();
    }
    
    // Инициализация частиц
    function initParticles() {
        particles = [];
        const colors = STATE.theme === 'dark' 
            ? ['#00C9B1', '#2A5D8A', '#FF7A00']
            : ['#00C9B1', '#80F2D5', '#FF7A00'];
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * DOM.particlesCanvas.width,
                y: Math.random() * DOM.particlesCanvas.height,
                radius: Math.random() * 3 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                speedX: Math.random() * 1 - 0.5,
                speedY: Math.random() * 1 - 0.5,
                alpha: Math.random() * 0.5 + 0.1
            });
        }
    }
    
    // Анимация частиц
    function animateParticles() {
        ctx.clearRect(0, 0, DOM.particlesCanvas.width, DOM.particlesCanvas.height);
        
        particles.forEach(particle => {
            // Обновление позиции
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Отскок от границ
            if (particle.x < 0 || particle.x > DOM.particlesCanvas.width) {
                particle.speedX = -particle.speedX;
            }
            if (particle.y < 0 || particle.y > DOM.particlesCanvas.height) {
                particle.speedY = -particle.speedY;
            }
            
            // Отрисовка частицы
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color.replace(')', `, ${particle.alpha})`).replace('rgb', 'rgba');
            ctx.fill();
            
            // Линии между близкими частицами
            particles.forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = particle.color.replace(')', `, ${0.2 * (1 - distance / 100)})`).replace('rgb', 'rgba');
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animateParticles();
}

// ===== 3D МОДЕЛЬ БИОТУАЛЕТА =====
function initialize3DModel() {
    if (!DOM.toiletDoor) return;
    
    // Клик по двери
    DOM.toiletDoor.addEventListener('click', toggleDoor);
    
    // Drag & Rotate для 3D модели
    const toilet3DWrapper = document.querySelector('.toilet-3d-wrapper');
    if (toilet3DWrapper) {
        let isDragging = false;
        let startX, startY;
        let rotateY = 0, rotateX = 0;
        
        toilet3DWrapper.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            toilet3DWrapper.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            rotateY += deltaX * 0.5;
            rotateX -= deltaY * 0.5;
            
            toilet3DWrapper.style.transform = `translateY(-20px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
            
            startX = e.clientX;
            startY = e.clientY;
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
            toilet3DWrapper.style.cursor = 'grab';
        });
        
        // Сенсорные события
        toilet3DWrapper.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            e.preventDefault();
        });
        
        toilet3DWrapper.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            const deltaX = e.touches[0].clientX - startX;
            const deltaY = e.touches[0].clientY - startY;
            
            rotateY += deltaX * 0.5;
            rotateX -= deltaY * 0.5;
            
            toilet3DWrapper.style.transform = `translateY(-20px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
            
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            e.preventDefault();
        });
        
        toilet3DWrapper.addEventListener('touchend', () => {
            isDragging = false;
        });
    }
}

function toggleDoor() {
    STATE.doorOpen = !STATE.doorOpen;
    DOM.toiletDoor.classList.toggle('open', STATE.doorOpen);
    
    // Анимация ручки
    const doorHandle = DOM.toiletDoor.querySelector('.door-handle');
    if (doorHandle) {
        doorHandle.style.transform = `translateY(-50%) rotate(${STATE.doorOpen ? '90' : '0'}deg)`;
    }
}

// ===== КАЛЬКУЛЯТОР СТОИМОСТИ =====
function initializeCalculator() {
    if (!DOM.calcModel || !DOM.calcDays) return;
    
    // Загрузка сохранённых данных
    const savedCalc = localStorage.getItem('tualetbio_calculator');
    if (savedCalc) {
        try {
            const data = JSON.parse(savedCalc);
            STATE.calculator = { ...STATE.calculator, ...data };
            
            // Применяем сохранённые значения
            DOM.calcModel.value = STATE.calculator.model;
            DOM.calcDays.value = STATE.calculator.days;
            DOM.daysValue.textContent = `${STATE.calculator.days} дней`;
            DOM.calcQuantity.value = STATE.calculator.quantity;
            if (DOM.calcCity) DOM.calcCity.value = STATE.calculator.city;
        } catch (e) {
            console.error('Ошибка загрузки данных калькулятора:', e);
        }
    }
    
    // Обработчики событий
    DOM.calcModel.addEventListener('change', updateCalculator);
    DOM.calcDays.addEventListener('input', (e) => {
        const days = e.target.value;
        DOM.daysValue.textContent = `${days} дней`;
        STATE.calculator.days = parseInt(days);
        updateCalculator();
        saveCalculatorState();
    });
    
    // Кнопки количества
    document.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const action = e.target.closest('.qty-btn').dataset.action;
            let quantity = parseInt(DOM.calcQuantity.value);
            
            if (action === 'increase' && quantity < 10) {
                quantity++;
            } else if (action === 'decrease' && quantity > 1) {
                quantity--;
            }
            
            DOM.calcQuantity.value = quantity;
            STATE.calculator.quantity = quantity;
            updateCalculator();
            saveCalculatorState();
        });
    });
    
    // Город
    if (DOM.calcCity) {
        DOM.calcCity.addEventListener('input', (e) => {
            STATE.calculator.city = e.target.value;
            updateCalculator();
            saveCalculatorState();
        });
    }
    
    // Инициализация калькулятора
    updateCalculator();
}

function updateCalculator() {
    const modelPrice = parseInt(DOM.calcModel.value);
    const days = parseInt(DOM.calcDays.value);
    const quantity = parseInt(DOM.calcQuantity.value);
    const city = DOM.calcCity ? DOM.calcCity.value : 'Москва';
    
    // Базовые расчёты
    let baseRent = modelPrice * days * quantity;
    let delivery = 1500;
    let service = Math.ceil(days / 3.5) * 400 * quantity;
    
    // Модификаторы
    if (city === 'Москва' || city === 'Санкт-Петербург') {
        delivery = 2000;
    }
    
    if (quantity >= 3) {
        delivery *= 1.5;
    }
    
    // Скидки
    let discount = 0;
    if (days >= 30) discount = 0.15;
    else if (days >= 14) discount = 0.10;
    else if (days >= 7) discount = 0.05;
    
    const discountAmount = baseRent * discount;
    const total = baseRent + delivery + service - discountAmount;
    
    // Обновление UI
    updateCalculatorUI({
        baseRent,
        delivery,
        service,
        discountAmount,
        total,
        modelPrice,
        days,
        quantity,
        city
    });
}

function updateCalculatorUI(data) {
    const {
        baseRent,
        delivery,
        service,
        discountAmount,
        total,
        modelPrice,
        days,
        quantity
    } = data;
    
    // Форматирование чисел
    const formatCurrency = (amount) => {
        return Math.round(amount).toLocaleString('ru-RU') + ' ₽';
    };
    
    // Обновление элементов
    if (DOM.rentCost) {
        DOM.rentCost.textContent = formatCurrency(baseRent);
        DOM.rentCost.style.transform = 'scale(1.1)';
        setTimeout(() => {
            DOM.rentCost.style.transform = 'scale(1)';
        }, 300);
    }
    
    if (DOM.deliveryCost) DOM.deliveryCost.textContent = formatCurrency(delivery);
    if (DOM.serviceCost) DOM.serviceCost.textContent = formatCurrency(service);
    if (DOM.discountValue) DOM.discountValue.textContent = `- ${formatCurrency(discountAmount)}`;
    if (DOM.totalCost) {
        DOM.totalCost.textContent = formatCurrency(total);
        DOM.totalCost.style.color = '#00C9B1';
        setTimeout(() => {
            DOM.totalCost.style.color = '';
        }, 1000);
    }
    
    // Обновление точности расчёта
    const accuracyFill = document.querySelector('.accuracy-fill');
    if (accuracyFill) {
        const accuracy = 95 + Math.random() * 3; // 95-98%
        accuracyFill.style.width = `${accuracy}%`;
        document.querySelector('.accuracy-value').textContent = `${Math.round(accuracy)}%`;
    }
}

function saveCalculatorState() {
    localStorage.setItem('tualetbio_calculator', JSON.stringify(STATE.calculator));
}

// ===== ФОРМА ЗАКАЗА =====
function initializeForm() {
    if (!DOM.orderForm) return;
    
    // Загрузка сохранённых данных формы
    const savedFormData = localStorage.getItem(CONFIG.FORM_DATA_KEY);
    if (savedFormData) {
        try {
            STATE.formData = JSON.parse(savedFormData);
            Object.keys(STATE.formData).forEach(key => {
                const element = DOM.orderForm.querySelector(`[name="${key}"]`);
                if (element && STATE.formData[key]) {
                    element.value = STATE.formData[key];
                    
                    // Активируем плавающие label
                    if (element.value.trim() !== '') {
                        element.parentElement.classList.add('has-value');
                    }
                }
            });
        } catch (e) {
            console.error('Ошибка загрузки данных формы:', e);
        }
    }
    
    // Автосохранение формы
    DOM.orderForm.addEventListener('input', (e) => {
        const target = e.target;
        if (target.name) {
            STATE.formData[target.name] = target.value;
            localStorage.setItem(CONFIG.FORM_DATA_KEY, JSON.stringify(STATE.formData));
        }
    });
    
    // Маска телефона
    const phoneInput = document.getElementById('orderPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', formatPhone);
    }
    
    // Счётчик символов
    const messageTextarea = document.getElementById('orderMessage');
    const charCount = document.getElementById('charCount');
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', (e) => {
            const length = e.target.value.length;
            charCount.textContent = length;
            
            if (length > 500) {
                e.target.value = e.target.value.substring(0, 500);
                charCount.textContent = 500;
                charCount.style.color = '#D63031';
            } else if (length > 450) {
                charCount.style.color = '#FFC107';
            } else {
                charCount.style.color = '';
            }
        });
    }
    
    // Отправка формы
    DOM.orderForm.addEventListener('submit', handleFormSubmit);
    
    // Плавающие label
    document.querySelectorAll('.floating-label input, .floating-label select, .floating-label textarea').forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Инициализация состояния
        if (input.value.trim() !== '') {
            input.parentElement.classList.add('focused');
        }
    });
}

function formatPhone(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 0) {
        if (!value.startsWith('7') && !value.startsWith('8')) {
            value = '7' + value;
        }
        
        let formatted = '+7';
        if (value.length > 1) {
            formatted += ' (' + value.substring(1, 4);
        }
        if (value.length >= 5) {
            formatted += ') ' + value.substring(4, 7);
        }
        if (value.length >= 8) {
            formatted += '-' + value.substring(7, 9);
        }
        if (value.length >= 10) {
            formatted += '-' + value.substring(9, 11);
        }
        
        e.target.value = formatted.substring(0, 18);
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.btn-submit');
    const formData = new FormData(form);
    
    // Валидация
    if (!validateForm(formData)) {
        return;
    }
    
    // Показать индикатор загрузки
    submitBtn.classList.add('loading');
    
    try {
        // Имитация отправки на сервер
        await simulateApiRequest(formData);
        
        // Показать успешное сообщение
        showSuccessModal();
        
        // Очистка формы и localStorage
        form.reset();
        localStorage.removeItem(CONFIG.FORM_DATA_KEY);
        STATE.formData = {};
        
        // Сброс плавающих label
        document.querySelectorAll('.floating-label').forEach(label => {
            label.classList.remove('focused', 'has-value');
        });
        
        // Сброс счётчика символов
        const charCount = document.getElementById('charCount');
        if (charCount) charCount.textContent = '0';
        
        // Отправка в аналитику
        trackFormSubmission(formData);
        
    } catch (error) {
        console.error('Ошибка отправки формы:', error);
        showError('Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз или позвоните нам по телефону ' + CONFIG.PHONE);
    } finally {
        submitBtn.classList.remove('loading');
    }
}

function validateForm(formData) {
    const phone = formData.get('phone');
    const email = formData.get('email');
    const name = formData.get('name');
    const agreement = formData.get('agreement');
    
    // Проверка телефона
    const phoneRegex = /^\+7\s?[\(]?\d{3}[\)]?\s?\d{3}[\-]?\d{2}[\-]?\d{2}$/;
    if (!phoneRegex.test(phone)) {
        showError('Пожалуйста, введите корректный номер телефона в формате +7 (999) 123-45-67');
        return false;
    }
    
    // Проверка email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('Пожалуйста, введите корректный email адрес');
        return false;
    }
    
    // Проверка имени
    if (name.length < 2) {
        showError('Имя должно содержать минимум 2 символа');
        return false;
    }
    
    // Проверка согласия
    if (!agreement) {
        showError('Необходимо согласие с политикой конфиденциальности');
        return false;
    }
    
    return true;
}

function simulateApiRequest(formData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('📧 Форма отправлена:', Object.fromEntries(formData));
            resolve({ success: true, message: 'Заявка успешно отправлена' });
        }, 2000);
    });
}

function trackFormSubmission(formData) {
    const data = Object.fromEntries(formData);
    
    // Здесь можно добавить отправку в Google Analytics, Yandex.Metrika и т.д.
    console.log('📊 Аналитика: Форма отправлена', {
        event: 'form_submission',
        timestamp: new Date().toISOString(),
        data: {
            name_length: data.name?.length || 0,
            has_city: !!data.city,
            message_length: data.message?.length || 0
        }
    });
    
    // Пример отправки в Telegram (нужен бот токен и chat_id)
    // sendToTelegram(data);
}

function showError(message) {
    // Создаём уведомление об ошибке
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-notification';
    errorDiv.innerHTML = `
        <div class="error-content">
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        </div>
        <button class="error-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Стили для уведомления
    const style = document.createElement('style');
    style.textContent = `
        .error-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #FF5252, #D63031);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
            z-index: 9999;
            box-shadow: 0 4px 20px rgba(214, 48, 49, 0.3);
            animation: slideInRight 0.3s ease;
            max-width: 400px;
        }
        
        .error-content {
            display: flex;
            align-items: center;
            gap: 10px;
            flex: 1;
        }
        
        .error-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 5px;
            border-radius: 4px;
            transition: background 0.2s;
        }
        
        .error-close:hover {
            background: rgba(255, 255, 255, 0.1);
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(errorDiv);
    
    // Закрытие уведомления
    const closeBtn = errorDiv.querySelector('.error-close');
    closeBtn.addEventListener('click', () => {
        errorDiv.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            errorDiv.remove();
            style.remove();
        }, 300);
    });
    
    // Автоматическое закрытие через 5 секунд
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                errorDiv.remove();
                style.remove();
            }, 300);
        }
    }, 5000);
}

// ===== ЧАТ-БОТ =====
function initializeChatBot() {
    if (!DOM.chatWidget || !DOM.chatBody) return;
    
    // Переключение видимости чата
    const chatHeader = DOM.chatWidget.querySelector('.chat-header');
    const chatToggle = DOM.chatWidget.querySelector('.chat-toggle');
    
    if (chatHeader && chatToggle) {
        chatHeader.addEventListener('click', toggleChat);
        
        // Автооткрытие чата через 30 секунд
        setTimeout(() => {
            if (!STATE.chatOpen && document.visibilityState === 'visible') {
                openChat();
            }
        }, 30000);
    }
    
    // Быстрые ответы
    document.querySelectorAll('.quick-reply').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const reply = e.target.closest('.quick-reply').dataset.reply;
            sendUserMessage(reply);
            
            setTimeout(() => {
                sendBotResponse(reply);
            }, 800);
        });
    });
    
    // Отправка сообщения
    if (DOM.chatInput && DOM.chatSend) {
        DOM.chatSend.addEventListener('click', sendChatMessage);
        DOM.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
    
    // Инициализация чата
    initializeChatHistory();
}

function toggleChat() {
    STATE.chatOpen = !STATE.chatOpen;
    DOM.chatWidget.classList.toggle('closed', !STATE.chatOpen);
    
    const icon = DOM.chatWidget.querySelector('#chatToggleIcon');
    if (icon) {
        icon.className = STATE.chatOpen ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
    }
    
    if (STATE.chatOpen) {
        DOM.chatBody.scrollTop = DOM.chatBody.scrollHeight;
    }
}

function openChat() {
    STATE.chatOpen = true;
    DOM.chatWidget.classList.remove('closed');
    
    const icon = DOM.chatWidget.querySelector('#chatToggleIcon');
    if (icon) {
        icon.className = 'fas fa-chevron-down';
    }
    
    DOM.chatBody.scrollTop = DOM.chatBody.scrollHeight;
}

function closeChat() {
    STATE.chatOpen = false;
    DOM.chatWidget.classList.add('closed');
    
    const icon = DOM.chatWidget.querySelector('#chatToggleIcon');
    if (icon) {
        icon.className = 'fas fa-chevron-up';
    }
}

function initializeChatHistory() {
    const savedChat = localStorage.getItem('tualetbio_chat');
    if (savedChat) {
        try {
            const messages = JSON.parse(savedChat);
            messages.forEach(msg => {
                if (msg.type === 'user') {
                    addMessageToChat(msg.text, 'user');
                } else {
                    addMessageToChat(msg.text, 'bot');
                }
            });
        } catch (e) {
            console.error('Ошибка загрузки истории чата:', e);
        }
    }
}

function sendChatMessage() {
    const message = DOM.chatInput.value.trim();
    if (!message) return;
    
    sendUserMessage(message);
    DOM.chatInput.value = '';
    
    setTimeout(() => {
        sendBotResponse(message);
    }, 1000);
}

function sendUserMessage(text) {
    addMessageToChat(text, 'user');
    saveChatMessage(text, 'user');
    openChat();
}

function sendBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    let response = 'Я помогу вам с выбором биотуалета. Что именно вас интересует: расчет стоимости, подбор модели или условия доставки?';
    
    // Поиск подходящего ответа
    for (const [key, value] of Object.entries(CHAT_BOT_RESPONSES)) {
        if (lowerMessage.includes(key.toLowerCase())) {
            response = value;
            break;
        }
    }
    
    // Добавление контактной информации
    if (lowerMessage.includes('контакт') || lowerMessage.includes('связать') || lowerMessage.includes('менеджер')) {
        response += `\n\n📞 Телефон: ${CONFIG.PHONE}\n📧 Email: ${CONFIG.EMAIL}`;
    }
    
    // Имитация "печатания"
    setTimeout(() => {
        addMessageToChat(response, 'bot');
        saveChatMessage(response, 'bot');
    }, 500 + Math.random() * 1000);
}

function addMessageToChat(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    
    const time = new Date().toLocaleTimeString('ru-RU', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    // Форматирование текста с переносами строк
    const formattedText = text.replace(/\n/g, '<br>');
    
    messageDiv.innerHTML = `
        <div class="message-content">${formattedText}</div>
        <div class="message-time">${time}</div>
    `;
    
    DOM.chatBody.appendChild(messageDiv);
    DOM.chatBody.scrollTop = DOM.chatBody.scrollHeight;
}

function saveChatMessage(text, type) {
    const savedChat = localStorage.getItem('tualetbio_chat');
    let messages = savedChat ? JSON.parse(savedChat) : [];
    
    messages.push({
        text,
        type,
        timestamp: new Date().toISOString()
    });
    
    // Сохраняем только последние 50 сообщений
    if (messages.length > 50) {
        messages = messages.slice(-50);
    }
    
    localStorage.setItem('tualetbio_chat', JSON.stringify(messages));
}

// ===== FAQ (ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ) =====
function initializeFAQ() {
    if (!DOM.faqQuestions || DOM.faqQuestions.length === 0) return;
    
    DOM.faqQuestions.forEach(question => {
        question.addEventListener('click', toggleFAQ);
        
        // Открыть первый вопрос по умолчанию
        if (question === DOM.faqQuestions[0]) {
            toggleFAQ({ currentTarget: question });
        }
    });
}

function toggleFAQ(e) {
    const question = e.currentTarget;
    const isExpanded = question.getAttribute('aria-expanded') === 'true';
    const answer = question.nextElementSibling;
    
    // Закрыть все остальные вопросы
    DOM.faqQuestions.forEach(otherQuestion => {
        if (otherQuestion !== question) {
            otherQuestion.setAttribute('aria-expanded', 'false');
            otherQuestion.nextElementSibling.classList.remove('open');
        }
    });
    
    // Переключить текущий вопрос
    question.setAttribute('aria-expanded', !isExpanded);
    
    if (!isExpanded) {
        answer.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
        answer.classList.remove('open');
        answer.style.maxHeight = null;
    }
}

// ===== SCROLL УПРАВЛЕНИЕ =====
function initializeScroll() {
    // Кнопка "Наверх"
    if (DOM.scrollTop) {
        DOM.scrollTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Прогресс-бар страницы
    updatePageProgress();
}

function updateScrollTop() {
    if (!DOM.scrollTop) return;
    
    if (window.scrollY > 500) {
        DOM.scrollTop.classList.add('visible');
    } else {
        DOM.scrollTop.classList.remove('visible');
    }
}

function updatePageProgress() {
    if (!DOM.pageProgress) return;
    
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    DOM.pageProgress.style.width = scrolled + '%';
}

// ===== МОДАЛЬНЫЕ ОКНА =====
function initializeModals() {
    // Закрытие модальных окон при клике вне их
    document.addEventListener('click', (e) => {
        if (DOM.successModal && e.target === DOM.successModal) {
            closeSuccessModal();
        }
        if (DOM.privacyModal && e.target === DOM.privacyModal) {
            closePrivacyModal();
        }
        if (DOM.model3DModal && e.target === DOM.model3DModal) {
            closeModel3D();
        }
    });
    
    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSuccessModal();
            closePrivacyModal();
            closeModel3D();
        }
    });
}

function showSuccessModal() {
    if (!DOM.successModal) return;
    
    DOM.successModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Анимация обратного отсчёта
    const countdownElement = DOM.successModal.querySelector('.countdown-number');
    if (countdownElement) {
        let count = 15;
        const interval = setInterval(() => {
            count--;
            countdownElement.textContent = count;
            
            if (count <= 0) {
                clearInterval(interval);
                closeSuccessModal();
            }
        }, 1000);
    }
}

function closeSuccessModal() {
    if (!DOM.successModal) return;
    
    DOM.successModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openPrivacyModal() {
    if (!DOM.privacyModal) return;
    
    DOM.privacyModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closePrivacyModal() {
    if (!DOM.privacyModal) return;
    
    DOM.privacyModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openModel3D(modelType = 'standard') {
    if (!DOM.model3DModal) return;
    
    DOM.model3DModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Настройка 3D модели в зависимости от типа
    const modelViewer = document.getElementById('model3dViewer');
    if (modelViewer) {
        modelViewer.innerHTML = `
            <div class="toilet-3d-full ${modelType}" id="toilet3DFull">
                <div class="model-label">${getModelName(modelType)}</div>
            </div>
        `;
        
        // Анимация вращения
        const model = document.getElementById('toilet3DFull');
        if (model) {
            model.style.animation = 'rotate-3d 20s linear infinite';
        }
    }
}

function closeModel3D() {
    if (!DOM.model3DModal) return;
    
    DOM.model3DModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function getModelName(type) {
    const models = {
        'standard': 'Стандарт Эко',
        'comfort': 'Комфорт Плюс',
        'premium': 'Премиум Люкс',
        'mobile': 'Мобильный Комплекс'
    };
    
    return models[type] || 'Биотуалет';
}

// ===== АНИМАЦИИ СЧЁТЧИКОВ =====
function startCountAnimations() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    counters.forEach(counter => {
        animateCounter(counter);
    });
}

function animateCounter(counter) {
    const target = parseInt(counter.dataset.count);
    const duration = 2000;
    const startTime = Date.now();
    const startValue = 0;
    
    function updateCounter() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);
        
        counter.textContent = currentValue.toLocaleString('ru-RU');
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target.toLocaleString('ru-RU');
        }
    }
    
    // Запуск анимации при появлении в viewport
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            updateCounter();
            observer.unobserve(counter);
        }
    }, {
        threshold: 0.1
    });
    
    observer.observe(counter);
}

// ===== УТИЛИТНЫЕ ФУНКЦИИ =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = DOM.navbar.offsetHeight;
        const targetPosition = section.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

function selectModel(modelName) {
    STATE.currentModel = modelName;
    
    // Показываем уведомление
    const notification = document.createElement('div');
    notification.className = 'model-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>Модель "${modelName}" добавлена в заказ</span>
        </div>
    `;
    
    // Стили для уведомления
    const style = document.createElement('style');
    style.textContent = `
        .model-notification {
            position: fixed;
            bottom: 100px;
            right: 30px;
            background: linear-gradient(135deg, #00C9B1, #2A5D8A);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 9999;
            box-shadow: 0 4px 20px rgba(0, 201, 177, 0.3);
            animation: slideInUp 0.3s ease;
            max-width: 300px;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        @keyframes slideInUp {
            from {
                transform: translateY(100%);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Автоматическое закрытие
    setTimeout(() => {
        notification.style.animation = 'slideOutDown 0.3s ease';
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 300);
    }, 3000);
    
    // Прокрутка к форме заказа
    setTimeout(() => {
        scrollToSection('order');
    }, 500);
}

function printEstimate() {
    const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Смета - ${CONFIG.SITE_NAME}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; }
                h1 { color: #00C9B1; }
                .estimate { border: 2px solid #00C9B1; padding: 20px; margin: 20px 0; }
                .total { font-size: 1.2em; font-weight: bold; color: #00C9B1; }
            </style>
        </head>
        <body>
            <h1>Смета аренды биотуалета</h1>
            <div class="estimate">
                <p><strong>Компания:</strong> ${CONFIG.SITE_NAME}</p>
                <p><strong>Телефон:</strong> ${CONFIG.PHONE}</p>
                <p><strong>Email:</strong> ${CONFIG.EMAIL}</p>
                <hr>
                <p><strong>Модель:</strong> ${DOM.calcModel.options[DOM.calcModel.selectedIndex].text}</p>
                <p><strong>Срок аренды:</strong> ${DOM.calcDays.value} дней</p>
                <p><strong>Количество:</strong> ${DOM.calcQuantity.value} кабинок</p>
                <p><strong>Город:</strong> ${DOM.calcCity ? DOM.calcCity.value : 'Москва'}</p>
                <hr>
                <p>Аренда: ${DOM.rentCost ? DOM.rentCost.textContent : '0 ₽'}</p>
                <p>Доставка: ${DOM.deliveryCost ? DOM.deliveryCost.textContent : '0 ₽'}</p>
                <p>Обслуживание: ${DOM.serviceCost ? DOM.serviceCost.textContent : '0 ₽'}</p>
                <p>Скидка: ${DOM.discountValue ? DOM.discountValue.textContent : '0 ₽'}</p>
                <p class="total">Итого: ${DOM.totalCost ? DOM.totalCost.textContent : '0 ₽'}</p>
            </div>
            <p><small>Смета действительна 7 дней. Дата: ${new Date().toLocaleDateString('ru-RU')}</small></p>
        </body>
        </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
}

function downloadFile(filename) {
    // Имитация скачивания файла
    const content = `Это файл ${filename} для компании ${CONFIG.SITE_NAME}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function openInstruction() {
    const instructionWindow = window.open('', '_blank');
    instructionWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Инструкция по эксплуатации - ${CONFIG.SITE_NAME}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; max-width: 800px; }
                h1 { color: #00C9B1; }
                .step { margin: 20px 0; padding: 15px; border-left: 4px solid #00C9B1; }
            </style>
        </head>
        <body>
            <h1>Инструкция по эксплуатации биотуалета</h1>
            <div class="step">
                <h2>1. Подготовка к использованию</h2>
                <p>Установите биотуалет на ровную поверхность...</p>
            </div>
            <!-- Добавьте больше шагов -->
            <p>Техническая поддержка: ${CONFIG.PHONE}</p>
        </body>
        </html>
    `);
    instructionWindow.document.close();
}

// ===== ГЛОБАЛЬНЫЙ API =====
window.TualetBio = {
    toggleTheme,
    toggleDoor,
    openModel3D,
    closeModel3D,
    scrollToSection,
    selectModel,
    printEstimate,
    downloadFile,
    openInstruction,
    openPrivacyModal,
    closePrivacyModal
};

// ===== PWA ФУНКЦИОНАЛЬНОСТЬ =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker зарегистрирован:', registration);
        }).catch(error => {
            console.log('Ошибка регистрации ServiceWorker:', error);
        });
    });
}

// ===== OFFLINE ОБНАРУЖЕНИЕ =====
window.addEventListener('online', () => {
    document.body.classList.remove('offline');
    console.log('Соединение восстановлено');
});

window.addEventListener('offline', () => {
    document.body.classList.add('offline');
    console.log('Потеряно соединение с интернетом');
});

// ===== ПРЕДЗАГРУЗКА КРИТИЧНЫХ РЕСУРСОВ =====
if ('linkPrefetch' in document) {
    const criticalResources = [
        'assets/images/hero-bg.jpg',
        'assets/images/model-standard.jpg',
        'assets/images/model-comfort.jpg',
        'assets/images/model-premium.jpg',
        'assets/images/model-mobile.jpg'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = resource;
        document.head.appendChild(link);
    });
}
