/* ==========================================================================
   产品页面JavaScript功能
   实现产品筛选、搜索、排序等交互功能
   ========================================================================== */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    initProductFilters();
    initProductSearch();
    initProductSort();
    initProductModal();
    initLoadMore();
    initInquiryButtons();
});

// 产品数据（模拟数据，实际项目中应该从API获取）
const productData = {
    'tripod-carbon': {
        name: '碳纤维专业三脚架',
        image: 'images/products/tripod-carbon.jpg',
        description: '轻量化设计，承重能力强，适用于各种专业拍摄场景。采用高强度碳纤维材料制造，重量仅为1.2kg，最大承重可达15kg。',
        price: '¥2,999',
        specs: {
            '材质': '碳纤维',
            '重量': '1.2kg',
            '最大承重': '15kg',
            '收纳高度': '65cm',
            '最大高度': '180cm',
            '脚管节数': '4节',
            '脚管锁定': '旋转锁定',
            '云台接口': '3/8英寸螺纹'
        }
    },
    'monopod-pro': {
        name: '专业摄像独脚架',
        image: 'images/products/monopod-pro.jpg',
        description: '便携设计，快速展开，适合移动拍摄和体育赛事。铝合金材质，坚固耐用，支持快速高度调节。',
        price: '¥899',
        specs: {
            '材质': '铝合金',
            '重量': '0.8kg',
            '最大承重': '8kg',
            '收纳高度': '55cm',
            '最大高度': '165cm',
            '脚管节数': '5节',
            '脚管锁定': '快速锁定',
            '底部': '橡胶脚垫'
        }
    },
    'gimbal-handheld': {
        name: '手持稳定器',
        image: 'images/products/gimbal-handheld.jpg',
        description: '三轴稳定技术，让您的拍摄更加平稳流畅。支持多种拍摄模式，电池续航可达12小时。',
        price: '¥1,599',
        specs: {
            '稳定轴数': '3轴',
            '最大载重': '2.5kg',
            '电池续航': '12小时',
            '充电时间': '2.5小时',
            '工作温度': '-10°C到45°C',
            '控制精度': '±0.02°',
            '跟随模式': '锁定/跟随/FPV',
            '连接方式': '蓝牙/USB-C'
        }
    },
    'led-panel': {
        name: '高显色LED灯具',
        image: 'images/products/led-panel.jpg',
        description: '专业级显色指数，色温可调，为您的拍摄提供完美光源。CRI>95，支持2700K-6500K色温调节。',
        price: '¥1,299',
        specs: {
            '显色指数': 'CRI>95',
            '色温范围': '2700K-6500K',
            '功率': '50W',
            '光通量': '5000lm',
            '调光范围': '1%-100%',
            '电源': 'AC/DC双电源',
            '散热': '主动散热',
            '安装': '标准热靴/1/4螺纹'
        }
    },
    'softbox-kit': {
        name: '专业柔光箱套装',
        image: 'images/products/softbox-kit.jpg',
        description: '多尺寸柔光箱组合，打造柔和均匀的光线效果。包含60x60cm、80x80cm、120x80cm三种规格。',
        price: '¥599',
        specs: {
            '套装内容': '3个柔光箱',
            '规格1': '60x60cm',
            '规格2': '80x80cm',
            '规格3': '120x80cm',
            '材质': '高品质柔光布',
            '支架接口': 'Bowens卡口',
            '安装': '快速安装',
            '收纳': '便携收纳袋'
        }
    },
    'reflector-set': {
        name: '专业反光板系列',
        image: 'images/products/reflector-set.jpg',
        description: '五合一反光板，金银白黑透明，满足各种补光需求。直径110cm，便携折叠设计。',
        price: '¥299',
        specs: {
            '类型': '五合一反光板',
            '直径': '110cm',
            '颜色': '金/银/白/黑/透明',
            '材质': '高反射率材料',
            '折叠后': '直径38cm',
            '重量': '0.6kg',
            '配件': '便携收纳袋',
            '用途': '人像/产品摄影'
        }
    }
};

/* ==========================================================================
   产品筛选功能
   ========================================================================== */
function initProductFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const productItems = document.querySelectorAll('.product-item');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // 更新活动标签
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 筛选产品
            filterProducts(category, productItems);
        });
    });
}

function filterProducts(category, productItems) {
    productItems.forEach((item, index) => {
        const itemCategory = item.getAttribute('data-category');
        const shouldShow = category === 'all' || itemCategory === category;
        
        if (shouldShow) {
            item.classList.remove('hidden');
            // 添加动画延迟
            setTimeout(() => {
                item.style.animationDelay = (index * 0.1) + 's';
                item.classList.add('animate-on-scroll');
            }, 50);
        } else {
            item.classList.add('hidden');
        }
    });
    
    // 检查是否有可见的产品
    const visibleProducts = document.querySelectorAll('.product-item:not(.hidden)');
    updateNoProductsMessage(visibleProducts.length === 0);
}

/* ==========================================================================
   产品搜索功能
   ========================================================================== */
function initProductSearch() {
    const searchInput = document.getElementById('productSearch');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(performSearch, 300));
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
}

function performSearch() {
    const searchInput = document.getElementById('productSearch');
    const searchTerm = searchInput.value.toLowerCase().trim();
    const productItems = document.querySelectorAll('.product-item');
    
    productItems.forEach(item => {
        const productName = item.getAttribute('data-name').toLowerCase();
        const productDescription = item.querySelector('.product-description').textContent.toLowerCase();
        const productFeatures = Array.from(item.querySelectorAll('.feature-tag'))
            .map(tag => tag.textContent.toLowerCase()).join(' ');
        
        const searchContent = productName + ' ' + productDescription + ' ' + productFeatures;
        const shouldShow = searchTerm === '' || searchContent.includes(searchTerm);
        
        if (shouldShow) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
    
    // 检查搜索结果
    const visibleProducts = document.querySelectorAll('.product-item:not(.hidden)');
    updateNoProductsMessage(visibleProducts.length === 0, searchTerm);
}

/* ==========================================================================
   产品排序功能
   ========================================================================== */
function initProductSort() {
    const sortSelect = document.getElementById('sortSelect');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortType = this.value;
            sortProducts(sortType);
        });
    }
}

function sortProducts(sortType) {
    const productsGrid = document.getElementById('productsGrid');
    const productItems = Array.from(document.querySelectorAll('.product-item'));
    
    productItems.sort((a, b) => {
        switch (sortType) {
            case 'name':
                return a.getAttribute('data-name').localeCompare(b.getAttribute('data-name'));
            
            case 'price-low':
                return parseInt(a.getAttribute('data-price')) - parseInt(b.getAttribute('data-price'));
            
            case 'price-high':
                return parseInt(b.getAttribute('data-price')) - parseInt(a.getAttribute('data-price'));
            
            case 'newest':
                // 模拟按新品排序（实际项目中应该有时间戳）
                return b.querySelector('.product-badge.new') ? 1 : -1;
            
            default:
                return 0;
        }
    });
    
    // 重新排列DOM元素
    productItems.forEach(item => {
        productsGrid.appendChild(item);
    });
    
    // 重新应用动画
    productItems.forEach((item, index) => {
        item.style.animationDelay = (index * 0.05) + 's';
    });
}

/* ==========================================================================
   产品模态框功能
   ========================================================================== */
function initProductModal() {
    const modal = document.getElementById('productModal');
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    const detailBtns = document.querySelectorAll('.product-detail-btn');
    const closeBtn = modal.querySelector('.modal-close');
    
    // 快速查看按钮
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const productId = this.getAttribute('data-product');
            showProductModal(productId);
        });
    });
    
    // 查看详情按钮
    detailBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-product');
            showProductModal(productId);
        });
    });
    
    // 关闭模态框
    if (closeBtn) {
        closeBtn.addEventListener('click', closeProductModal);
    }
    
    // 点击外部关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeProductModal();
        }
    });
    
    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeProductModal();
        }
    });
}

function showProductModal(productId) {
    const modal = document.getElementById('productModal');
    const product = productData[productId];
    
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }
    
    // 更新模态框内容
    document.getElementById('modalProductImage').src = product.image;
    document.getElementById('modalProductImage').alt = product.name;
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductDescription').textContent = product.description;
    document.getElementById('modalProductPrice').textContent = product.price;
    
    // 更新规格信息
    const specsList = document.getElementById('modalProductSpecs');
    specsList.innerHTML = '';
    
    Object.entries(product.specs).forEach(([key, value]) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${key}</span><span>${value}</span>`;
        specsList.appendChild(li);
    });
    
    // 显示模态框
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

/* ==========================================================================
   加载更多功能
   ========================================================================== */
function initLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // 模拟加载更多产品
            this.textContent = '加载中...';
            this.disabled = true;
            
            setTimeout(() => {
                // 这里应该从API加载更多产品
                // 现在只是模拟
                this.textContent = '没有更多产品了';
                this.style.opacity = '0.6';
            }, 1500);
        });
    }
}

/* ==========================================================================
   询价功能
   ========================================================================== */
function initInquiryButtons() {
    const inquiryBtns = document.querySelectorAll('.inquiry-btn');
    
    inquiryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            
            // 跳转到联系页面并预填产品信息
            const contactUrl = 'contact.html?product=' + encodeURIComponent(productName);
            window.location.href = contactUrl;
        });
    });
}

/* ==========================================================================
   辅助函数
   ========================================================================== */

// 显示/隐藏无产品消息
function updateNoProductsMessage(show, searchTerm = '') {
    let noProductsDiv = document.querySelector('.no-products');
    
    if (show) {
        if (!noProductsDiv) {
            noProductsDiv = document.createElement('div');
            noProductsDiv.className = 'no-products';
            document.getElementById('productsGrid').appendChild(noProductsDiv);
        }
        
        const message = searchTerm 
            ? `没有找到包含"${searchTerm}"的产品` 
            : '该分类下暂无产品';
        
        noProductsDiv.innerHTML = `
            <h3>😔 ${message}</h3>
            <p>请尝试其他搜索条件或浏览其他产品分类</p>
            <button class="btn btn-primary" onclick="clearFilters()">查看全部产品</button>
        `;
    } else {
        if (noProductsDiv) {
            noProductsDiv.remove();
        }
    }
}

// 清除所有筛选条件
function clearFilters() {
    // 重置分类筛选
    const allTab = document.querySelector('.filter-tab[data-category="all"]');
    if (allTab) {
        allTab.click();
    }
    
    // 清除搜索
    const searchInput = document.getElementById('productSearch');
    if (searchInput) {
        searchInput.value = '';
        performSearch();
    }
    
    // 重置排序
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.value = 'default';
        sortProducts('default');
    }
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

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

/* ==========================================================================
   页面加载完成后的初始化
   ========================================================================== */

// 处理URL参数（如果从其他页面跳转过来）
window.addEventListener('load', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const search = urlParams.get('search');
    
    if (category) {
        const categoryTab = document.querySelector(`[data-category="${category}"]`);
        if (categoryTab) {
            categoryTab.click();
        }
    }
    
    if (search) {
        const searchInput = document.getElementById('productSearch');
        if (searchInput) {
            searchInput.value = search;
            performSearch();
        }
    }
});

// 导出函数供全局使用
window.clearFilters = clearFilters;
window.showProductModal = showProductModal;
window.closeProductModal = closeProductModal;