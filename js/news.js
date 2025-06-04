// 新闻页面功能
document.addEventListener('DOMContentLoaded', function() {
    initNewsFilter();
    initPagination();
    initNewsletterForm();
    initContactForm();
});

// 初始化新闻筛选功能
function initNewsFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const newsCards = document.querySelectorAll('.news-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有按钮的active类
            filterBtns.forEach(b => b.classList.remove('active'));
            // 添加当前按钮的active类
            this.classList.add('active');

            const category = this.getAttribute('data-category');
            
            // 筛选新闻卡片
            newsCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    // 添加动画效果
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 100);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// 初始化分页功能
function initPagination() {
    const pageButtons = document.querySelectorAll('.page-btn');
    const prevBtn = document.querySelector('.page-btn.prev');
    const nextBtn = document.querySelector('.page-btn.next');
    
    pageButtons.forEach(btn => {
        if (!btn.classList.contains('prev') && !btn.classList.contains('next')) {
            btn.addEventListener('click', function() {
                // 移除所有页码按钮的active类
                pageButtons.forEach(b => {
                    if (!b.classList.contains('prev') && !b.classList.contains('next')) {
                        b.classList.remove('active');
                    }
                });
                // 添加当前按钮的active类
                this.classList.add('active');
                
                // 更新上一页/下一页按钮状态
                updatePaginationButtons();
                
                // 滚动到页面顶部
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    });
    
    // 上一页按钮
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            const currentActive = document.querySelector('.page-btn.active');
            const currentPage = parseInt(currentActive.textContent);
            if (currentPage > 1) {
                currentActive.classList.remove('active');
                const prevPage = currentPage - 1;
                const prevPageBtn = Array.from(pageButtons).find(btn => 
                    btn.textContent == prevPage && !btn.classList.contains('prev') && !btn.classList.contains('next')
                );
                if (prevPageBtn) {
                    prevPageBtn.classList.add('active');
                }
                updatePaginationButtons();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
    
    // 下一页按钮
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const currentActive = document.querySelector('.page-btn.active');
            const currentPage = parseInt(currentActive.textContent);
            const maxPage = 8; // 假设最大页数为8
            if (currentPage < maxPage) {
                currentActive.classList.remove('active');
                const nextPage = currentPage + 1;
                const nextPageBtn = Array.from(pageButtons).find(btn => 
                    btn.textContent == nextPage && !btn.classList.contains('prev') && !btn.classList.contains('next')
                );
                if (nextPageBtn) {
                    nextPageBtn.classList.add('active');
                }
                updatePaginationButtons();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
}

// 更新分页按钮状态
function updatePaginationButtons() {
    const currentActive = document.querySelector('.page-btn.active');
    const currentPage = parseInt(currentActive.textContent);
    const prevBtn = document.querySelector('.page-btn.prev');
    const nextBtn = document.querySelector('.page-btn.next');
    const maxPage = 8;
    
    // 更新上一页按钮状态
    if (prevBtn) {
        if (currentPage <= 1) {
            prevBtn.disabled = true;
            prevBtn.classList.add('disabled');
        } else {
            prevBtn.disabled = false;
            prevBtn.classList.remove('disabled');
        }
    }
    
    // 更新下一页按钮状态
    if (nextBtn) {
        if (currentPage >= maxPage) {
            nextBtn.disabled = true;
            nextBtn.classList.add('disabled');
        } else {
            nextBtn.disabled = false;
            nextBtn.classList.remove('disabled');
        }
    }
}

// 初始化新闻订阅表单
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // 模拟提交过程
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = '订阅中...';
                
                setTimeout(() => {
                    alert('订阅成功！感谢您的关注。');
                    emailInput.value = '';
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }, 1500);
            }
        });
    }
}

// 初始化联系表单
function initContactForm() {
    const contactForm = document.querySelector('.inquiry-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            const message = this.querySelector('textarea').value.trim();
            
            if (name && email && message) {
                // 模拟提交过程
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = '发送中...';
                
                setTimeout(() => {
                    alert('询价信息已发送！我们会尽快与您联系。');
                    this.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }, 2000);
            }
        });
    }
}

// 新闻卡片悬停效果
document.addEventListener('DOMContentLoaded', function() {
    const newsCards = document.querySelectorAll('.news-card');
    
    newsCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
});

// 平滑滚动到锚点
function smoothScrollToAnchor() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// 初始化平滑滚动
document.addEventListener('DOMContentLoaded', smoothScrollToAnchor);