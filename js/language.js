// 语言切换功能
let currentLanguage = 'zh'; // 默认中文

// 初始化语言切换功能
document.addEventListener('DOMContentLoaded', function() {
    initLanguageToggle();
    // 从本地存储加载语言设置
    loadLanguagePreference();
});

// 初始化语言切换按钮
function initLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            toggleLanguage();
        });
    }
}

// 切换语言
function toggleLanguage() {
    currentLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
    updatePageLanguage();
    updateLanguageButton();
    saveLanguagePreference();
}

// 更新页面语言
function updatePageLanguage() {
    // 更新所有带有data-zh和data-en属性的元素
    const elements = document.querySelectorAll('[data-zh][data-en]');
    
    elements.forEach(element => {
        const zhText = element.getAttribute('data-zh');
        const enText = element.getAttribute('data-en');
        
        if (currentLanguage === 'zh') {
            element.textContent = zhText;
        } else {
            element.textContent = enText;
        }
    });
    
    // 更新输入框placeholder
    updatePlaceholders();
    
    // 更新页面标题
    updatePageTitle();
    
    // 更新HTML lang属性
    document.documentElement.lang = currentLanguage === 'zh' ? 'zh-CN' : 'en';
}

// 更新输入框placeholder
function updatePlaceholders() {
    const inputs = document.querySelectorAll('input[data-placeholder-zh][data-placeholder-en], textarea[data-placeholder-zh][data-placeholder-en]');
    
    inputs.forEach(input => {
        const zhPlaceholder = input.getAttribute('data-placeholder-zh');
        const enPlaceholder = input.getAttribute('data-placeholder-en');
        
        if (currentLanguage === 'zh') {
            input.placeholder = zhPlaceholder;
        } else {
            input.placeholder = enPlaceholder;
        }
    });
}

// 更新页面标题
function updatePageTitle() {
    const titleMap = {
        'zh': {
            'index.html': 'Dearkol影视器材 - 专业影视设备制造商',
            'about.html': '关于我们 - Dearkol影视器材',
            'products.html': '产品中心 - Dearkol影视器材',
            'news.html': '新闻资讯 - Dearkol影视器材'
        },
        'en': {
            'index.html': 'Dearkol Film Equipment - Professional Film Equipment Manufacturer',
            'about.html': 'About Us - Dearkol Film Equipment',
            'products.html': 'Products - Dearkol Film Equipment',
            'news.html': 'News & Media - Dearkol Film Equipment'
        }
    };
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const newTitle = titleMap[currentLanguage][currentPage];
    
    if (newTitle) {
        document.title = newTitle;
    }
}

// 更新语言切换按钮
function updateLanguageButton() {
    const langToggle = document.getElementById('langToggle');
    const langText = langToggle?.querySelector('.lang-text');
    
    if (langText) {
        langText.textContent = currentLanguage === 'zh' ? 'EN' : '中';
    }
    
    // 更新按钮标题
    if (langToggle) {
        langToggle.title = currentLanguage === 'zh' ? 'Switch to English' : '切换到中文';
    }
}

// 保存语言偏好到本地存储
function saveLanguagePreference() {
    localStorage.setItem('dearkol_language', currentLanguage);
}

// 从本地存储加载语言偏好
function loadLanguagePreference() {
    const savedLanguage = localStorage.getItem('dearkol_language');
    
    if (savedLanguage && (savedLanguage === 'zh' || savedLanguage === 'en')) {
        currentLanguage = savedLanguage;
        updatePageLanguage();
        updateLanguageButton();
    }
}

// 设置特定语言
function setLanguage(lang) {
    if (lang === 'zh' || lang === 'en') {
        currentLanguage = lang;
        updatePageLanguage();
        updateLanguageButton();
        saveLanguagePreference();
    }
}

// 获取当前语言
function getCurrentLanguage() {
    return currentLanguage;
}

// 获取文本（根据当前语言）
function getText(zhText, enText) {
    return currentLanguage === 'zh' ? zhText : enText;
}

// 动态添加多语言支持的元素
function addMultiLanguageElement(element, zhText, enText) {
    element.setAttribute('data-zh', zhText);
    element.setAttribute('data-en', enText);
    element.textContent = currentLanguage === 'zh' ? zhText : enText;
}

// 动态添加多语言支持的输入框
function addMultiLanguageInput(input, zhPlaceholder, enPlaceholder) {
    input.setAttribute('data-placeholder-zh', zhPlaceholder);
    input.setAttribute('data-placeholder-en', enPlaceholder);
    input.placeholder = currentLanguage === 'zh' ? zhPlaceholder : enPlaceholder;
}

// 语言切换动画效果
function animateLanguageSwitch() {
    const elements = document.querySelectorAll('[data-zh][data-en]');
    
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '0.5';
            setTimeout(() => {
                element.style.opacity = '1';
            }, 100);
        }, index * 20);
    });
}

// 导出函数供其他脚本使用
window.LanguageManager = {
    toggle: toggleLanguage,
    set: setLanguage,
    get: getCurrentLanguage,
    getText: getText,
    addElement: addMultiLanguageElement,
    addInput: addMultiLanguageInput
};