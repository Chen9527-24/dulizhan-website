/* ==========================================================================
   后台管理系统JavaScript功能
   实现登录、导航、内容管理等功能
   ========================================================================== */

// 全局变量
let currentUser = null;
let currentSection = 'dashboard';
let isSidebarCollapsed = false;

// 模拟数据
const mockData = {
    // 网站内容数据
    content: {
        hero: {
            title: '专业影视设备解决方案',
            subtitle: '为您的创作提供最优质的设备支持',
            description: '我们致力于为影视制作行业提供最先进、最可靠的专业设备。从摄影器材到灯光设备，从稳定器到音频设备，我们拥有完整的产品线来满足您的各种拍摄需求。'
        },
        about: {
            title: '关于我们',
            description: '作为影视设备行业的领导者，我们拥有超过15年的专业经验。我们的团队由资深的技术专家和行业顾问组成，致力于为客户提供最优质的产品和服务。',
            features: [
                '15年行业经验',
                '专业技术团队',
                '全球服务网络',
                '7x24小时支持'
            ]
        },
        contact: {
            phone: '+86 400-123-4567',
            email: 'info@filmequipment.com',
            address: '北京市朝阳区影视产业园区A座15层',
            workingHours: '周一至周五 9:00-18:00'
        }
    },
    
    // 产品数据
    products: [
        {
            id: 'tripod-carbon',
            name: '碳纤维专业三脚架',
            category: 'tripod',
            price: 2999,
            description: '轻量化设计，承重能力强，适用于各种专业拍摄场景。',
            image: 'images/products/tripod-carbon.jpg',
            status: 'active',
            featured: true,
            specs: {
                '材质': '碳纤维',
                '重量': '1.2kg',
                '最大承重': '15kg',
                '收纳高度': '65cm',
                '最大高度': '180cm'
            }
        },
        {
            id: 'gimbal-handheld',
            name: '手持稳定器',
            category: 'stabilizer',
            price: 1599,
            description: '三轴稳定技术，让您的拍摄更加平稳流畅。',
            image: 'images/products/gimbal-handheld.jpg',
            status: 'active',
            featured: true,
            specs: {
                '稳定轴数': '3轴',
                '最大载重': '2.5kg',
                '电池续航': '12小时',
                '充电时间': '2.5小时'
            }
        }
    ],
    
    // 新闻数据
    news: [
        {
            id: 1,
            title: '新品发布：专业级4K摄像机',
            summary: '我们很高兴宣布推出最新的4K专业摄像机，具备更高的画质和更强的性能。',
            content: '详细的新闻内容...',
            image: 'images/news/news-1.jpg',
            author: '产品团队',
            publishDate: '2024-01-15',
            status: 'published',
            category: 'product'
        },
        {
            id: 2,
            title: '参展NAB 2024展会',
            summary: '我们将参加今年的NAB展会，展示最新的影视设备产品线。',
            content: '详细的新闻内容...',
            image: 'images/news/news-2.jpg',
            author: '市场部',
            publishDate: '2024-01-10',
            status: 'published',
            category: 'event'
        }
    ],
    
    // 媒体文件数据
    media: {
        images: [
            {
                id: 1,
                name: 'hero-bg-1.jpg',
                url: 'images/hero-bg-1.jpg',
                size: '2.5MB',
                dimensions: '1920x1080',
                uploadDate: '2024-01-15',
                category: 'hero'
            },
            {
                id: 2,
                name: 'product-demo.jpg',
                url: 'images/product-demo.jpg',
                size: '1.8MB',
                dimensions: '1200x800',
                uploadDate: '2024-01-14',
                category: 'product'
            }
        ],
        videos: [
            {
                id: 1,
                name: 'hero-video.mp4',
                url: 'videos/hero-video.mp4',
                size: '15.2MB',
                duration: '00:30',
                resolution: '1920x1080',
                uploadDate: '2024-01-15',
                category: 'hero'
            },
            {
                id: 2,
                name: 'product-demo.mp4',
                url: 'videos/product-demo.mp4',
                size: '25.8MB',
                duration: '01:45',
                resolution: '1920x1080',
                uploadDate: '2024-01-12',
                category: 'product'
            }
        ]
    }
};

/* ==========================================================================
   页面初始化
   ========================================================================== */
document.addEventListener('DOMContentLoaded', function() {
    initializeAdmin();
});

function initializeAdmin() {
    // 检查登录状态
    checkLoginStatus();
    
    // 初始化事件监听器
    initializeEventListeners();
    
    // 初始化导航
    initializeNavigation();
    
    // 加载默认内容
    if (currentUser) {
        loadSection('dashboard');
    }
}

/* ==========================================================================
   登录功能
   ========================================================================== */
function checkLoginStatus() {
    // 检查本地存储中的登录信息
    const savedUser = localStorage.getItem('adminUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showAdminPanel();
    } else {
        showLoginModal();
    }
}

function showLoginModal() {
    const loginModal = document.getElementById('loginModal');
    const adminPanel = document.getElementById('adminPanel');
    
    loginModal.classList.add('active');
    adminPanel.classList.add('hidden');
}

function showAdminPanel() {
    const loginModal = document.getElementById('loginModal');
    const adminPanel = document.getElementById('adminPanel');
    
    loginModal.classList.remove('active');
    adminPanel.classList.remove('hidden');
    
    // 更新用户信息显示
    updateUserInfo();
}

function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // 简单的演示登录验证
    if (username === 'admin' && password === '123456') {
        currentUser = {
            username: username,
            name: '管理员',
            role: '超级管理员',
            loginTime: new Date().toISOString()
        };
        
        // 保存登录信息
        if (rememberMe) {
            localStorage.setItem('adminUser', JSON.stringify(currentUser));
        } else {
            sessionStorage.setItem('adminUser', JSON.stringify(currentUser));
        }
        
        showAdminPanel();
        showNotification('登录成功！', 'success');
    } else {
        showNotification('用户名或密码错误！', 'error');
    }
}

function logout() {
    if (confirm('确定要退出登录吗？')) {
        currentUser = null;
        localStorage.removeItem('adminUser');
        sessionStorage.removeItem('adminUser');
        showLoginModal();
        showNotification('已安全退出', 'info');
    }
}

function updateUserInfo() {
    if (currentUser) {
        const userNameElement = document.querySelector('.user-name');
        const userRoleElement = document.querySelector('.user-role');
        
        if (userNameElement) userNameElement.textContent = currentUser.name;
        if (userRoleElement) userRoleElement.textContent = currentUser.role;
    }
}

/* ==========================================================================
   事件监听器初始化
   ========================================================================== */
function initializeEventListeners() {
    // 登录表单
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // 侧边栏切换
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // 移动端菜单按钮
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileSidebar);
    }
    
    // 导航链接
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    // 键盘快捷键
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // 窗口大小变化
    window.addEventListener('resize', handleWindowResize);
}

/* ==========================================================================
   导航功能
   ========================================================================== */
function initializeNavigation() {
    // 设置默认活动导航项
    updateActiveNavigation('dashboard');
}

function handleNavigation(event) {
    event.preventDefault();
    
    const section = event.currentTarget.getAttribute('data-section');
    if (section) {
        loadSection(section);
        updateActiveNavigation(section);
        updatePageTitle(section);
        
        // 在移动端关闭侧边栏
        if (window.innerWidth <= 768) {
            closeMobileSidebar();
        }
    }
}

function loadSection(sectionName) {
    currentSection = sectionName;
    
    // 隐藏所有内容区域
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // 显示目标区域
    const targetSection = document.getElementById(`${sectionName}-section`);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // 根据不同区域加载相应内容
        switch (sectionName) {
            case 'dashboard':
                loadDashboard();
                break;
            case 'content':
                loadContentManagement();
                break;
            case 'images':
                loadImageManagement();
                break;
            case 'videos':
                loadVideoManagement();
                break;
            case 'products':
                loadProductManagement();
                break;
            case 'news':
                loadNewsManagement();
                break;
            case 'settings':
                loadSettings();
                break;
        }
    }
}

function updateActiveNavigation(sectionName) {
    // 移除所有活动状态
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // 添加当前活动状态
    const activeLink = document.querySelector(`[data-section="${sectionName}"]`);
    if (activeLink) {
        activeLink.closest('.nav-item').classList.add('active');
    }
}

function updatePageTitle(sectionName) {
    const titles = {
        'dashboard': '仪表盘',
        'content': '文案管理',
        'images': '图片管理',
        'videos': '视频管理',
        'products': '产品管理',
        'news': '新闻管理',
        'settings': '系统设置'
    };
    
    const pageTitle = document.querySelector('.page-title');
    if (pageTitle && titles[sectionName]) {
        pageTitle.textContent = titles[sectionName];
    }
}

/* ==========================================================================
   侧边栏功能
   ========================================================================== */
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    isSidebarCollapsed = !isSidebarCollapsed;
    
    if (isSidebarCollapsed) {
        sidebar.classList.add('collapsed');
    } else {
        sidebar.classList.remove('collapsed');
    }
    
    // 保存状态
    localStorage.setItem('sidebarCollapsed', isSidebarCollapsed);
}

function toggleMobileSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

function closeMobileSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.remove('active');
}

/* ==========================================================================
   内容加载功能
   ========================================================================== */
function loadDashboard() {
    // 仪表盘内容已经在HTML中定义，这里可以更新动态数据
    updateDashboardStats();
}

function updateDashboardStats() {
    // 更新统计数据（这里使用模拟数据）
    const stats = {
        products: mockData.products.length,
        images: mockData.media.images.length,
        videos: mockData.media.videos.length,
        news: mockData.news.length
    };
    
    // 更新DOM中的数字
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length >= 4) {
        statNumbers[0].textContent = stats.products;
        statNumbers[1].textContent = stats.images;
        statNumbers[2].textContent = stats.videos;
        statNumbers[3].textContent = stats.news;
    }
}

function loadContentManagement() {
    const section = document.getElementById('content-section');
    section.innerHTML = `
        <div class="content-management">
            <div class="section-header">
                <h2>文案管理</h2>
                <p>管理网站各个页面的文案内容</p>
            </div>
            
            <div class="content-tabs">
                <button class="tab-btn active" data-tab="hero">首页横幅</button>
                <button class="tab-btn" data-tab="about">关于我们</button>
                <button class="tab-btn" data-tab="contact">联系信息</button>
            </div>
            
            <div class="tab-content">
                <div id="hero-tab" class="tab-pane active">
                    <div class="content-preview">
                        <h3>首页横幅内容</h3>
                        <div class="content-item">
                            <strong>主标题：</strong>${mockData.content.hero.title}
                        </div>
                        <div class="content-item">
                            <strong>副标题：</strong>${mockData.content.hero.subtitle}
                        </div>
                        <div class="content-item">
                            <strong>描述：</strong>${mockData.content.hero.description}
                        </div>
                        <button class="btn btn-primary" onclick="editContent('hero')">编辑内容</button>
                    </div>
                </div>
                
                <div id="about-tab" class="tab-pane">
                    <div class="content-preview">
                        <h3>关于我们内容</h3>
                        <div class="content-item">
                            <strong>标题：</strong>${mockData.content.about.title}
                        </div>
                        <div class="content-item">
                            <strong>描述：</strong>${mockData.content.about.description}
                        </div>
                        <div class="content-item">
                            <strong>特色功能：</strong>
                            <ul>
                                ${mockData.content.about.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>
                        <button class="btn btn-primary" onclick="editContent('about')">编辑内容</button>
                    </div>
                </div>
                
                <div id="contact-tab" class="tab-pane">
                    <div class="content-preview">
                        <h3>联系信息</h3>
                        <div class="content-item">
                            <strong>联系电话：</strong>${mockData.content.contact.phone}
                        </div>
                        <div class="content-item">
                            <strong>邮箱地址：</strong>${mockData.content.contact.email}
                        </div>
                        <div class="content-item">
                            <strong>公司地址：</strong>${mockData.content.contact.address}
                        </div>
                        <div class="content-item">
                            <strong>工作时间：</strong>${mockData.content.contact.workingHours}
                        </div>
                        <button class="btn btn-primary" onclick="editContent('contact')">编辑内容</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 初始化标签页功能
    initContentTabs();
}

function loadImageManagement() {
    const section = document.getElementById('images-section');
    section.innerHTML = `
        <div class="media-management">
            <div class="section-header">
                <h2>图片管理</h2>
                <div class="header-actions">
                    <button class="btn btn-primary" onclick="uploadImage()">
                        <i class="fas fa-upload"></i> 上传图片
                    </button>
                </div>
            </div>
            
            <div class="file-limits">
                <h4>图片上传规范</h4>
                <ul>
                    <li>最大文件大小：5MB</li>
                    <li>支持格式：JPG, PNG, GIF, WebP</li>
                    <li>建议尺寸：1920x1080 或更高</li>
                    <li>可同时上传多张图片</li>
                </ul>
            </div>
            
            <div class="media-filters">
                <select class="form-control" onchange="filterImages(this.value)">
                    <option value="all">全部分类</option>
                    <option value="hero">首页轮播</option>
                    <option value="product">产品图片</option>
                    <option value="news">新闻图片</option>
                </select>
                
                <div class="search-box">
                    <input type="text" placeholder="搜索图片..." class="form-control" oninput="searchImages(this.value)">
                    <i class="fas fa-search"></i>
                </div>
            </div>
            
            <div class="media-grid">
                ${generateImageGrid(mockData.media.images)}
            </div>
        </div>
    `;
}

function loadVideoManagement() {
    const section = document.getElementById('videos-section');
    section.innerHTML = `
        <div class="media-management">
            <div class="section-header">
                <h2>视频管理</h2>
                <div class="header-actions">
                    <button class="btn btn-primary" onclick="uploadVideo()">
                        <i class="fas fa-upload"></i> 上传视频
                    </button>
                </div>
            </div>
            
            <div class="file-limits">
                <h4>视频上传规范</h4>
                <ul>
                    <li>最大文件大小：50MB</li>
                    <li>支持格式：MP4, WebM, AVI, MOV</li>
                    <li>建议分辨率：1920x1080 (Full HD)</li>
                    <li>建议时长：不超过5分钟</li>
                    <li>建议码率：2-8 Mbps</li>
                </ul>
            </div>
            
            <div class="media-filters">
                <select class="form-control" onchange="filterVideos(this.value)">
                    <option value="all">全部分类</option>
                    <option value="hero">首页视频</option>
                    <option value="product">产品演示</option>
                    <option value="tutorial">教程视频</option>
                </select>
            </div>
            
            <div class="media-list">
                ${generateVideoList(mockData.media.videos)}
            </div>
        </div>
    `;
}

function loadProductManagement() {
    const section = document.getElementById('products-section');
    section.innerHTML = `
        <div class="product-management">
            <div class="section-header">
                <h2>产品管理</h2>
                <div class="header-actions">
                    <button class="btn btn-primary" onclick="addProduct()">
                        <i class="fas fa-plus"></i> 添加产品
                    </button>
                </div>
            </div>
            
            <div class="product-filters">
                <select class="form-control" onchange="filterProducts(this.value)">
                    <option value="all">全部分类</option>
                    <option value="tripod">三脚架</option>
                    <option value="stabilizer">稳定器</option>
                    <option value="lighting">灯光设备</option>
                    <option value="audio">音频设备</option>
                </select>
                
                <select class="form-control" onchange="filterProductStatus(this.value)">
                    <option value="all">全部状态</option>
                    <option value="active">已发布</option>
                    <option value="draft">草稿</option>
                    <option value="inactive">已下架</option>
                </select>
            </div>
            
            <div class="product-table">
                ${generateProductTable(mockData.products)}
            </div>
        </div>
    `;
}

function loadNewsManagement() {
    const section = document.getElementById('news-section');
    section.innerHTML = `
        <div class="news-management">
            <div class="section-header">
                <h2>新闻管理</h2>
                <div class="header-actions">
                    <button class="btn btn-primary" onclick="addNews()">
                        <i class="fas fa-plus"></i> 添加新闻
                    </button>
                </div>
            </div>
            
            <div class="news-filters">
                <select class="form-control" onchange="filterNews(this.value)">
                    <option value="all">全部分类</option>
                    <option value="product">产品新闻</option>
                    <option value="event">活动新闻</option>
                    <option value="company">公司新闻</option>
                </select>
                
                <select class="form-control" onchange="filterNewsStatus(this.value)">
                    <option value="all">全部状态</option>
                    <option value="published">已发布</option>
                    <option value="draft">草稿</option>
                    <option value="scheduled">定时发布</option>
                </select>
            </div>
            
            <div class="news-list">
                ${generateNewsList(mockData.news)}
            </div>
        </div>
    `;
}

function loadSettings() {
    const section = document.getElementById('settings-section');
    section.innerHTML = `
        <div class="settings-management">
            <div class="section-header">
                <h2>系统设置</h2>
                <p>管理网站的基本设置和配置</p>
            </div>
            
            <div class="settings-tabs">
                <button class="tab-btn active" data-tab="general">基本设置</button>
                <button class="tab-btn" data-tab="seo">SEO设置</button>
                <button class="tab-btn" data-tab="backup">备份管理</button>
            </div>
            
            <div class="tab-content">
                <div id="general-tab" class="tab-pane active">
                    <form class="settings-form">
                        <div class="form-group">
                            <label>网站名称</label>
                            <input type="text" value="影视设备展示网站" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>网站描述</label>
                            <textarea class="form-control" rows="3">专业的影视设备展示和销售平台</textarea>
                        </div>
                        <div class="form-group">
                            <label>联系邮箱</label>
                            <input type="email" value="admin@filmequipment.com" class="form-control">
                        </div>
                        <button type="submit" class="btn btn-primary">保存设置</button>
                    </form>
                </div>
                
                <div id="seo-tab" class="tab-pane">
                    <form class="settings-form">
                        <div class="form-group">
                            <label>SEO标题</label>
                            <input type="text" value="专业影视设备 - 影视制作解决方案" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>SEO描述</label>
                            <textarea class="form-control" rows="3">提供专业的影视设备，包括摄影器材、灯光设备、稳定器等，为您的创作提供最优质的设备支持。</textarea>
                        </div>
                        <div class="form-group">
                            <label>关键词</label>
                            <input type="text" value="影视设备,摄影器材,专业摄像,灯光设备" class="form-control">
                        </div>
                        <button type="submit" class="btn btn-primary">保存设置</button>
                    </form>
                </div>
                
                <div id="backup-tab" class="tab-pane">
                    <div class="backup-section">
                        <h3>数据备份</h3>
                        <p>定期备份网站数据以确保数据安全</p>
                        
                        <div class="backup-actions">
                            <button class="btn btn-primary" onclick="createBackup()">
                                <i class="fas fa-download"></i> 创建备份
                            </button>
                            <button class="btn btn-secondary" onclick="restoreBackup()">
                                <i class="fas fa-upload"></i> 恢复备份
                            </button>
                        </div>
                        
                        <div class="backup-history">
                            <h4>备份历史</h4>
                            <div class="backup-item">
                                <span>2024-01-15 14:30:00</span>
                                <span>完整备份</span>
                                <span>25.6MB</span>
                                <button class="btn btn-sm btn-secondary">下载</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 初始化设置标签页
    initSettingsTabs();
}

/* ==========================================================================
   辅助函数
   ========================================================================== */

// 生成图片网格
function generateImageGrid(images) {
    return images.map(image => `
        <div class="media-item" data-category="${image.category}">
            <div class="media-thumbnail">
                <img src="${image.url}" alt="${image.name}" onerror="this.src='https://via.placeholder.com/300x200?text=Image'">
                <div class="media-overlay">
                    <button class="btn btn-sm btn-primary" onclick="editImage(${image.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteImage(${image.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="media-info">
                <h4>${image.name}</h4>
                <p>${image.dimensions} • ${image.size}</p>
                <span class="media-date">${image.uploadDate}</span>
            </div>
        </div>
    `).join('');
}

// 生成视频列表
function generateVideoList(videos) {
    return videos.map(video => `
        <div class="video-item" data-category="${video.category}">
            <div class="video-thumbnail">
                <i class="fas fa-play-circle"></i>
                <span class="video-duration">${video.duration}</span>
            </div>
            <div class="video-info">
                <h4>${video.name}</h4>
                <p>${video.resolution} • ${video.size}</p>
                <span class="video-date">${video.uploadDate}</span>
            </div>
            <div class="video-actions">
                <button class="btn btn-sm btn-primary" onclick="editVideo(${video.id})">
                    <i class="fas fa-edit"></i> 编辑
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteVideo(${video.id})">
                    <i class="fas fa-trash"></i> 删除
                </button>
            </div>
        </div>
    `).join('');
}

// 生成产品表格
function generateProductTable(products) {
    const tableHeader = `
        <table class="table">
            <thead>
                <tr>
                    <th>产品图片</th>
                    <th>产品名称</th>
                    <th>分类</th>
                    <th>价格</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    const tableRows = products.map(product => `
        <tr>
            <td>
                <img src="${product.image}" alt="${product.name}" class="product-thumb" onerror="this.src='https://via.placeholder.com/60x60?text=Product'">
            </td>
            <td>
                <strong>${product.name}</strong>
                <br><small>${product.description}</small>
            </td>
            <td><span class="category-badge">${product.category}</span></td>
            <td><strong>¥${product.price}</strong></td>
            <td><span class="status-badge status-${product.status}">${product.status === 'active' ? '已发布' : '草稿'}</span></td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editProduct('${product.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteProduct('${product.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    return tableHeader + tableRows + '</tbody></table>';
}

// 生成新闻列表
function generateNewsList(news) {
    return news.map(item => `
        <div class="news-item" data-category="${item.category}" data-status="${item.status}">
            <div class="news-thumbnail">
                <img src="${item.image}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/150x100?text=News'">
            </div>
            <div class="news-content">
                <h4>${item.title}</h4>
                <p>${item.summary}</p>
                <div class="news-meta">
                    <span><i class="fas fa-user"></i> ${item.author}</span>
                    <span><i class="fas fa-calendar"></i> ${item.publishDate}</span>
                    <span class="status-badge status-${item.status}">${item.status === 'published' ? '已发布' : '草稿'}</span>
                </div>
            </div>
            <div class="news-actions">
                <button class="btn btn-sm btn-primary" onclick="editNews(${item.id})">
                    <i class="fas fa-edit"></i> 编辑
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteNews(${item.id})">
                    <i class="fas fa-trash"></i> 删除
                </button>
            </div>
        </div>
    `).join('');
}

// 初始化内容标签页
function initContentTabs() {
    const tabBtns = document.querySelectorAll('.content-tabs .tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // 更新按钮状态
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 更新内容显示
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
}

// 初始化设置标签页
function initSettingsTabs() {
    const tabBtns = document.querySelectorAll('.settings-tabs .tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // 更新按钮状态
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 更新内容显示
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
}

/* ==========================================================================
   功能函数（占位符）
   ========================================================================== */

// 密码显示切换
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.querySelector('.password-toggle i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleIcon.className = 'fas fa-eye';
    }
}

// 预览网站
function previewWebsite() {
    window.open('index.html', '_blank');
}

// 刷新数据
function refreshData() {
    showNotification('数据已刷新', 'success');
    loadSection(currentSection);
}

// 通知系统
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 12px 16px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 8px;
        min-width: 300px;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // 自动移除
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        'success': '#10b981',
        'error': '#ef4444',
        'warning': '#f59e0b',
        'info': '#06b6d4'
    };
    return colors[type] || '#06b6d4';
}

// 键盘快捷键
function handleKeyboardShortcuts(event) {
    // Ctrl/Cmd + S 保存
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        showNotification('快捷键保存功能', 'info');
    }
    
    // ESC 关闭模态框
    if (event.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal && activeModal.id !== 'loginModal') {
            closeModal(activeModal.id);
        }
    }
}

// 窗口大小变化处理
function handleWindowResize() {
    // 在移动端自动关闭侧边栏
    if (window.innerWidth <= 768) {
        closeMobileSidebar();
    }
}

// 模态框控制
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

function confirmAction() {
    showNotification('操作已确认', 'success');
    closeModal('commonModal');
}

// 文件上传配置
const FILE_UPLOAD_CONFIG = {
    image: {
        maxSize: 5 * 1024 * 1024, // 5MB
        allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        allowedExtensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp']
    },
    video: {
        maxSize: 100 * 1024 * 1024, // 100MB
        allowedTypes: ['video/mp4', 'video/webm', 'video/ogg'],
        allowedExtensions: ['.mp4', '.webm', '.ogg']
    }
};

// 文件上传功能
function uploadImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = FILE_UPLOAD_CONFIG.image.allowedExtensions.join(',');
    input.multiple = true;
    
    input.onchange = function(e) {
        const files = Array.from(e.target.files);
        
        for (const file of files) {
            if (!validateFile(file, 'image')) {
                continue;
            }
            
            uploadFileWithProgress(file, 'image');
        }
    };
    
    input.click();
}

function uploadVideo() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = FILE_UPLOAD_CONFIG.video.allowedExtensions.join(',');
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        
        if (!validateFile(file, 'video')) {
            return;
        }
        
        uploadFileWithProgress(file, 'video');
    };
    
    input.click();
}

// 文件验证
function validateFile(file, type) {
    const config = FILE_UPLOAD_CONFIG[type];
    
    // 检查文件大小
    if (file.size > config.maxSize) {
        const maxSizeMB = config.maxSize / (1024 * 1024);
        showNotification(`文件大小超过限制！最大允许 ${maxSizeMB}MB`, 'error');
        return false;
    }
    
    // 检查文件类型
    if (!config.allowedTypes.includes(file.type)) {
        showNotification(`不支持的文件类型！允许的类型: ${config.allowedExtensions.join(', ')}`, 'error');
        return false;
    }
    
    return true;
}

// 文件上传进度
function uploadFileWithProgress(file, type) {
    const progressId = 'upload-' + Date.now();
    
    // 显示上传进度
    showUploadProgress(progressId, file.name);
    
    // 模拟文件上传过程
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // 上传完成
            setTimeout(() => {
                hideUploadProgress(progressId);
                
                // 添加到模拟数据
                const newFile = {
                    id: Date.now(),
                    name: file.name,
                    size: formatFileSize(file.size),
                    uploadDate: new Date().toLocaleDateString(),
                    category: 'general',
                    url: URL.createObjectURL(file)
                };
                
                if (type === 'image') {
                    newFile.dimensions = '待检测';
                    mockData.images.unshift(newFile);
                    if (currentSection === 'images') {
                        loadImageManagement();
                    }
                } else {
                    newFile.duration = '待检测';
                    newFile.resolution = '待检测';
                    mockData.videos.unshift(newFile);
                    if (currentSection === 'videos') {
                        loadVideoManagement();
                    }
                }
                
                showNotification(`${file.name} 上传成功！`, 'success');
            }, 500);
        }
        
        updateUploadProgress(progressId, progress);
    }, 200);
}

// 显示上传进度
function showUploadProgress(id, filename) {
    const progressHtml = `
        <div id="${id}" class="upload-progress">
            <div class="upload-info">
                <span class="upload-filename">${filename}</span>
                <span class="upload-percent">0%</span>
            </div>
            <div class="upload-bar">
                <div class="upload-fill" style="width: 0%"></div>
            </div>
        </div>
    `;
    
    let container = document.getElementById('upload-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'upload-container';
        container.className = 'upload-container';
        document.body.appendChild(container);
    }
    
    container.insertAdjacentHTML('beforeend', progressHtml);
}

// 更新上传进度
function updateUploadProgress(id, progress) {
    const progressElement = document.getElementById(id);
    if (progressElement) {
        const fill = progressElement.querySelector('.upload-fill');
        const percent = progressElement.querySelector('.upload-percent');
        
        fill.style.width = progress + '%';
        percent.textContent = Math.round(progress) + '%';
    }
}

// 隐藏上传进度
function hideUploadProgress(id) {
    const progressElement = document.getElementById(id);
    if (progressElement) {
        progressElement.remove();
    }
}

// 格式化文件大小
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 内容编辑功能
function editContent(section) {
    const content = mockData.content[section];
    if (!content) {
        showNotification('内容不存在', 'error');
        return;
    }
    
    const modal = document.getElementById('commonModal');
    const modalBody = modal.querySelector('.modal-body');
    
    let formHtml = '';
    
    if (section === 'hero') {
        formHtml = `
            <form id="editContentForm">
                <div class="form-group">
                    <label>主标题</label>
                    <input type="text" name="title" value="${content.title}" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>副标题</label>
                    <input type="text" name="subtitle" value="${content.subtitle}" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>描述</label>
                    <textarea name="description" class="form-control" rows="4" required>${content.description}</textarea>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">保存更改</button>
                    <button type="button" class="btn btn-secondary" onclick="closeModal('commonModal')">取消</button>
                </div>
            </form>
        `;
    } else if (section === 'about') {
        formHtml = `
            <form id="editContentForm">
                <div class="form-group">
                    <label>标题</label>
                    <input type="text" name="title" value="${content.title}" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>描述</label>
                    <textarea name="description" class="form-control" rows="4" required>${content.description}</textarea>
                </div>
                <div class="form-group">
                    <label>特色功能（每行一个）</label>
                    <textarea name="features" class="form-control" rows="4" required>${content.features.join('\n')}</textarea>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">保存更改</button>
                    <button type="button" class="btn btn-secondary" onclick="closeModal('commonModal')">取消</button>
                </div>
            </form>
        `;
    } else if (section === 'contact') {
        formHtml = `
            <form id="editContentForm">
                <div class="form-group">
                    <label>电话</label>
                    <input type="text" name="phone" value="${content.phone}" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>邮箱</label>
                    <input type="email" name="email" value="${content.email}" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>地址</label>
                    <input type="text" name="address" value="${content.address}" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>工作时间</label>
                    <input type="text" name="workingHours" value="${content.workingHours}" class="form-control" required>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">保存更改</button>
                    <button type="button" class="btn btn-secondary" onclick="closeModal('commonModal')">取消</button>
                </div>
            </form>
        `;
    }
    
    modalBody.innerHTML = `
        <h3>编辑${section === 'hero' ? '首页' : section === 'about' ? '关于我们' : '联系我们'}内容</h3>
        ${formHtml}
    `;
    
    modal.classList.add('active');
    
    // 绑定表单提交事件
    document.getElementById('editContentForm').onsubmit = function(e) {
        e.preventDefault();
        saveContentChanges(section, new FormData(this));
    };
}

// 保存内容更改
function saveContentChanges(section, formData) {
    const content = mockData.content[section];
    
    if (section === 'hero') {
        content.title = formData.get('title');
        content.subtitle = formData.get('subtitle');
        content.description = formData.get('description');
    } else if (section === 'about') {
        content.title = formData.get('title');
        content.description = formData.get('description');
        content.features = formData.get('features').split('\n').filter(f => f.trim());
    } else if (section === 'contact') {
        content.phone = formData.get('phone');
        content.email = formData.get('email');
        content.address = formData.get('address');
        content.workingHours = formData.get('workingHours');
    }
    
    closeModal('commonModal');
    showNotification('内容已保存！', 'success');
    
    // 刷新内容管理页面
    if (currentSection === 'content') {
        loadContentManagement();
    }
}

// 产品和新闻管理功能
function addProduct() {
    const modal = document.getElementById('commonModal');
    const modalBody = modal.querySelector('.modal-body');
    
    modalBody.innerHTML = `
        <h3>添加新产品</h3>
        <form id="addProductForm">
            <div class="form-group">
                <label>产品名称</label>
                <input type="text" name="name" class="form-control" required>
            </div>
            <div class="form-group">
                <label>产品分类</label>
                <select name="category" class="form-control" required>
                    <option value="tripod">三脚架</option>
                    <option value="stabilizer">稳定器</option>
                    <option value="lighting">灯光设备</option>
                    <option value="audio">音频设备</option>
                </select>
            </div>
            <div class="form-group">
                <label>价格</label>
                <input type="number" name="price" class="form-control" required>
            </div>
            <div class="form-group">
                <label>描述</label>
                <textarea name="description" class="form-control" rows="3" required></textarea>
            </div>
            <div class="form-group">
                <label>状态</label>
                <select name="status" class="form-control">
                    <option value="active">已发布</option>
                    <option value="draft">草稿</option>
                    <option value="inactive">已下架</option>
                </select>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">添加产品</button>
                <button type="button" class="btn btn-secondary" onclick="closeModal('commonModal')">取消</button>
            </div>
        </form>
    `;
    
    modal.classList.add('active');
    
    document.getElementById('addProductForm').onsubmit = function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        
        const newProduct = {
            id: 'product-' + Date.now(),
            name: formData.get('name'),
            category: formData.get('category'),
            price: parseInt(formData.get('price')),
            description: formData.get('description'),
            image: 'images/products/placeholder.jpg',
            status: formData.get('status'),
            featured: false,
            specs: {}
        };
        
        mockData.products.unshift(newProduct);
        closeModal('commonModal');
        showNotification('产品添加成功！', 'success');
        
        if (currentSection === 'products') {
            loadProductManagement();
        }
    };
}

function addNews() {
    const modal = document.getElementById('commonModal');
    const modalBody = modal.querySelector('.modal-body');
    
    modalBody.innerHTML = `
        <h3>添加新闻</h3>
        <form id="addNewsForm">
            <div class="form-group">
                <label>新闻标题</label>
                <input type="text" name="title" class="form-control" required>
            </div>
            <div class="form-group">
                <label>新闻分类</label>
                <select name="category" class="form-control" required>
                    <option value="product">产品新闻</option>
                    <option value="event">活动新闻</option>
                    <option value="company">公司新闻</option>
                </select>
            </div>
            <div class="form-group">
                <label>摘要</label>
                <textarea name="summary" class="form-control" rows="2" required></textarea>
            </div>
            <div class="form-group">
                <label>内容</label>
                <textarea name="content" class="form-control" rows="5" required></textarea>
            </div>
            <div class="form-group">
                <label>作者</label>
                <input type="text" name="author" class="form-control" required>
            </div>
            <div class="form-group">
                <label>状态</label>
                <select name="status" class="form-control">
                    <option value="published">已发布</option>
                    <option value="draft">草稿</option>
                    <option value="scheduled">定时发布</option>
                </select>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">添加新闻</button>
                <button type="button" class="btn btn-secondary" onclick="closeModal('commonModal')">取消</button>
            </div>
        </form>
    `;
    
    modal.classList.add('active');
    
    document.getElementById('addNewsForm').onsubmit = function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        
        const newNews = {
            id: Date.now(),
            title: formData.get('title'),
            summary: formData.get('summary'),
            content: formData.get('content'),
            image: 'images/news/placeholder.jpg',
            author: formData.get('author'),
            publishDate: new Date().toLocaleDateString(),
            status: formData.get('status'),
            category: formData.get('category')
        };
        
        mockData.news.unshift(newNews);
        closeModal('commonModal');
        showNotification('新闻添加成功！', 'success');
        
        if (currentSection === 'news') {
            loadNewsManagement();
        }
    };
}

// 编辑和删除功能
function editImage(id) { 
    showNotification(`编辑图片功能：图片ID ${id}`, 'info'); 
}

function deleteImage(id) { 
    if (confirm('确定要删除这张图片吗？')) {
        mockData.images = mockData.images.filter(img => img.id !== id);
        showNotification('图片已删除', 'success');
        if (currentSection === 'images') {
            loadImageManagement();
        }
    }
}

function editVideo(id) { 
    showNotification(`编辑视频功能：视频ID ${id}`, 'info'); 
}

function deleteVideo(id) { 
    if (confirm('确定要删除这个视频吗？')) {
        mockData.videos = mockData.videos.filter(video => video.id !== id);
        showNotification('视频已删除', 'success');
        if (currentSection === 'videos') {
            loadVideoManagement();
        }
    }
}

function editProduct(id) { 
    showNotification(`编辑产品功能：产品ID ${id}`, 'info'); 
}

function deleteProduct(id) { 
    if (confirm('确定要删除这个产品吗？')) {
        mockData.products = mockData.products.filter(product => product.id !== id);
        showNotification('产品已删除', 'success');
        if (currentSection === 'products') {
            loadProductManagement();
        }
    }
}

function editNews(id) { 
    showNotification(`编辑新闻功能：新闻ID ${id}`, 'info'); 
}

function deleteNews(id) { 
    if (confirm('确定要删除这条新闻吗？')) {
        mockData.news = mockData.news.filter(news => news.id !== id);
        showNotification('新闻已删除', 'success');
        if (currentSection === 'news') {
            loadNewsManagement();
        }
    }
}

// 备份功能
function createBackup() { 
    showNotification('正在创建备份...', 'info');
    
    setTimeout(() => {
        const backupData = {
            timestamp: new Date().toISOString(),
            content: mockData.content,
            products: mockData.products,
            news: mockData.news,
            images: mockData.images.map(img => ({...img, url: 'backup-placeholder'})),
            videos: mockData.videos
        };
        
        const dataStr = JSON.stringify(backupData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        showNotification('备份创建成功！', 'success');
    }, 2000);
}

function restoreBackup() { 
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const backupData = JSON.parse(e.target.result);
                
                if (confirm('确定要恢复备份吗？这将覆盖当前所有数据！')) {
                    if (backupData.content) mockData.content = backupData.content;
                    if (backupData.products) mockData.products = backupData.products;
                    if (backupData.news) mockData.news = backupData.news;
                    
                    showNotification('备份恢复成功！', 'success');
                    
                    // 刷新当前页面
                    if (currentSection === 'content') loadContentManagement();
                    else if (currentSection === 'products') loadProductManagement();
                    else if (currentSection === 'news') loadNewsManagement();
                }
            } catch (error) {
                showNotification('备份文件格式错误！', 'error');
            }
        };
        reader.readAsText(file);
    };
    
    input.click();
}

// 筛选功能
function filterImages(category) { 
    showNotification(`筛选图片: ${category}`, 'info'); 
    // 这里可以添加实际的筛选逻辑
}

function searchImages(query) { 
    console.log('搜索图片:', query); 
    // 这里可以添加实际的搜索逻辑
}

function filterVideos(category) { 
    showNotification(`筛选视频: ${category}`, 'info'); 
    // 这里可以添加实际的筛选逻辑
}

function filterProducts(category) { 
    showNotification(`筛选产品: ${category}`, 'info'); 
    // 这里可以添加实际的筛选逻辑
}

function filterProductStatus(status) { 
    showNotification(`筛选状态: ${status}`, 'info'); 
    // 这里可以添加实际的筛选逻辑
}

function filterNews(category) { 
    showNotification(`筛选新闻: ${category}`, 'info'); 
    // 这里可以添加实际的筛选逻辑
}

function filterNewsStatus(status) { 
    showNotification(`筛选状态: ${status}`, 'info'); 
    // 这里可以添加实际的筛选逻辑
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 4px;
        border-radius: 2px;
    }
    
    .notification-close:hover {
        background: rgba(255,255,255,0.2);
    }
    
    .form-control {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        font-size: 14px;
    }
    
    .form-control:focus {
        outline: none;
        border-color: #2563eb;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }
    
    .content-form,
    .settings-form {
        max-width: 600px;
    }
    
    .content-tabs,
    .settings-tabs {
        display: flex;
        gap: 8px;
        margin-bottom: 24px;
        border-bottom: 1px solid #e2e8f0;
    }
    
    .tab-btn {
        background: none;
        border: none;
        padding: 12px 16px;
        cursor: pointer;
        border-bottom: 2px solid transparent;
        transition: all 0.2s;
    }
    
    .tab-btn.active {
        color: #2563eb;
        border-bottom-color: #2563eb;
    }
    
    .tab-pane {
        display: none;
    }
    
    .tab-pane.active {
        display: block;
    }
    
    .section-header {
        margin-bottom: 24px;
    }
    
    .section-header h2 {
        margin-bottom: 8px;
    }
    
    .header-actions {
        display: flex;
        gap: 8px;
    }
    
    .media-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 16px;
    }
    
    .media-item {
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        overflow: hidden;
    }
    
    .media-thumbnail {
        position: relative;
        aspect-ratio: 4/3;
        overflow: hidden;
    }
    
    .media-thumbnail img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .media-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        opacity: 0;
        transition: opacity 0.2s;
    }
    
    .media-item:hover .media-overlay {
        opacity: 1;
    }
    
    .media-info {
        padding: 12px;
    }
    
    .media-info h4 {
        margin-bottom: 4px;
        font-size: 14px;
    }
    
    .media-info p {
        font-size: 12px;
        color: #64748b;
        margin-bottom: 4px;
    }
    
    .media-date {
        font-size: 11px;
        color: #94a3b8;
    }
    
    .table {
        width: 100%;
        border-collapse: collapse;
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    
    .table th,
    .table td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #e2e8f0;
    }
    
    .table th {
        background: #f8fafc;
        font-weight: 600;
    }
    
    .product-thumb {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 4px;
    }
    
    .category-badge,
    .status-badge {
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 500;
    }
    
    .status-active {
        background: #dcfce7;
        color: #166534;
    }
    
    .status-draft {
        background: #fef3c7;
        color: #92400e;
    }
    
    .status-published {
        background: #dcfce7;
        color: #166534;
    }
`;
document.head.appendChild(style);