/* ==========================================================================
   Dearkol影视器材网站 - 主要JavaScript功能
   实现网站的交互功能和用户体验优化
   ========================================================================== */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initNavigation();
    initScrollEffects();
    initAnimations();
    initForms();
    initLazyLoading();
    initBackToTop();
    initScrollProgress();
    initMobileMenu();
    
    // 页面加载完成后移除加载动画
    window.addEventListener('load', function() {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    });
});

/* ==========================================================================
   导航栏功能
   ========================================================================== */
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 滚动时改变导航栏样式
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // 平滑滚动到锚点
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 检查是否是锚点链接
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // 考虑导航栏高度
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // 更新活动状态
                    updateActiveNavLink(this);
                    
                    // 关闭移动端菜单
                    closeMobileMenu();
                }
            }
        });
    });
    
    // 根据滚动位置更新导航栏活动状态
    window.addEventListener('scroll', updateNavOnScroll);
}

// 更新活动导航链接
function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// 根据滚动位置更新导航栏
function updateNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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

/* ==========================================================================
   移动端菜单功能
   ========================================================================== */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // 防止背景滚动
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // 点击菜单项时关闭菜单
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // 点击菜单外部时关闭菜单
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }
}

// 关闭移动端菜单
function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/* ==========================================================================
   滚动效果
   ========================================================================== */
function initScrollEffects() {
    // 创建Intersection Observer来监听元素进入视口
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // 如果是计数器元素，启动计数动画
                if (entry.target.classList.contains('counter')) {
                    animateCounter(entry.target);
                }
                
                // 如果是进度条，启动进度动画
                if (entry.target.classList.contains('progress-fill')) {
                    entry.target.classList.add('animate');
                }
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));
    
    // 观察计数器元素
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => observer.observe(counter));
    
    // 观察进度条元素
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => observer.observe(bar));
}

/* ==========================================================================
   动画功能
   ========================================================================== */
function initAnimations() {
    // 为按钮添加动画类
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.classList.add('btn-animated');
    });
    
    // 为卡片添加悬浮效果
    const cards = document.querySelectorAll('.product-card, .news-item, .feature-item');
    cards.forEach(card => {
        card.classList.add('hover-lift');
    });
    
    // 文字打字效果
    const typingElements = document.querySelectorAll('.typing-effect');
    typingElements.forEach(element => {
        startTypingEffect(element);
    });
}

// 计数器动画
function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target')) || 0;
    const duration = 2000; // 2秒
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    counter.classList.add('counting');
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        counter.textContent = Math.floor(current);
    }, 16);
}

// 打字效果
function startTypingEffect(element) {
    const text = element.textContent;
    element.textContent = '';
    element.style.borderRight = '2px solid';
    
    let i = 0;
    const timer = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(timer);
            // 保持光标闪烁一段时间后移除
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 2000);
        }
    }, 100);
}

/* ==========================================================================
   表单功能
   ========================================================================== */
function initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // 表单提交处理
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                submitForm(this);
            }
        });
        
        // 实时验证
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    });
}

// 表单验证
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// 字段验证
function validateField(field) {
    const value = field.value.trim();
    const fieldGroup = field.closest('.form-group');
    let isValid = true;
    let errorMessage = '';
    
    // 必填验证
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = '此字段为必填项';
    }
    
    // 邮箱验证
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = '请输入有效的邮箱地址';
        }
    }
    
    // 电话验证
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = '请输入有效的电话号码';
        }
    }
    
    // 更新UI
    if (isValid) {
        fieldGroup.classList.remove('error');
        fieldGroup.classList.add('success');
        removeErrorMessage(fieldGroup);
    } else {
        fieldGroup.classList.remove('success');
        fieldGroup.classList.add('error');
        showErrorMessage(fieldGroup, errorMessage);
    }
    
    return isValid;
}

// 清除字段错误
function clearFieldError(field) {
    const fieldGroup = field.closest('.form-group');
    fieldGroup.classList.remove('error');
    removeErrorMessage(fieldGroup);
}

// 显示错误消息
function showErrorMessage(fieldGroup, message) {
    removeErrorMessage(fieldGroup);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    fieldGroup.appendChild(errorDiv);
    
    // 触发动画
    setTimeout(() => {
        errorDiv.classList.add('show');
    }, 10);
}

// 移除错误消息
function removeErrorMessage(fieldGroup) {
    const existingError = fieldGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

// 提交表单
function submitForm(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // 显示加载状态
    submitBtn.textContent = '发送中...';
    submitBtn.disabled = true;
    
    // 模拟表单提交
    setTimeout(() => {
        // 显示成功消息
        showSuccessMessage('感谢您的咨询！我们会尽快与您联系。');
        
        // 重置表单
        form.reset();
        
        // 恢复按钮状态
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // 清除验证状态
        const formGroups = form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('success', 'error');
        });
    }, 2000);
}

// 显示成功消息
function showSuccessMessage(message) {
    const modal = createModal(message, 'success');
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // 3秒后自动关闭
    setTimeout(() => {
        closeModal(modal);
    }, 3000);
}

// 创建模态框
function createModal(message, type = 'info') {
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const content = document.createElement('div');
    content.className = 'modal-content';
    
    if (type === 'success') {
        content.innerHTML = `
            <div class="success-checkmark"></div>
            <p style="text-align: center; margin: 0; font-size: 16px;">${message}</p>
        `;
    } else {
        content.innerHTML = `<p style="text-align: center; margin: 0;">${message}</p>`;
    }
    
    modal.appendChild(content);
    
    // 点击外部关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    return modal;
}

// 关闭模态框
function closeModal(modal) {
    modal.classList.remove('active');
    setTimeout(() => {
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    }, 300);
}

/* ==========================================================================
   懒加载功能
   ========================================================================== */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('.lazy-image');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loading');
                    
                    // 模拟图片加载
                    setTimeout(() => {
                        img.classList.remove('loading');
                        img.classList.add('loaded');
                    }, 500);
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // 降级处理
        lazyImages.forEach(img => {
            img.classList.add('loaded');
        });
    }
}

/* ==========================================================================
   返回顶部功能
   ========================================================================== */
function initBackToTop() {
    // 创建返回顶部按钮
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.setAttribute('aria-label', '返回顶部');
    document.body.appendChild(backToTopBtn);
    
    // 滚动时显示/隐藏按钮
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // 点击返回顶部
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ==========================================================================
   滚动进度条
   ========================================================================== */
function initScrollProgress() {
    // 创建滚动进度条
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    // 更新进度条
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

/* ==========================================================================
   工具函数
   ========================================================================== */

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 防抖函数
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// 获取元素相对于文档的位置
function getElementOffset(element) {
    let offsetTop = 0;
    let offsetLeft = 0;
    
    while (element) {
        offsetTop += element.offsetTop;
        offsetLeft += element.offsetLeft;
        element = element.offsetParent;
    }
    
    return {
        top: offsetTop,
        left: offsetLeft
    };
}

// 检查元素是否在视口中
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/* ==========================================================================
   错误处理
   ========================================================================== */
window.addEventListener('error', function(e) {
    console.error('JavaScript错误:', e.error);
    // 在生产环境中，这里可以发送错误报告到服务器
});

// 处理未捕获的Promise拒绝
window.addEventListener('unhandledrejection', function(e) {
    console.error('未处理的Promise拒绝:', e.reason);
    e.preventDefault();
});