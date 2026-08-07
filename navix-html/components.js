// ==========================================
// REUSABLE COMPONENTS
// ==========================================

window.Header = function() {
  const { currentPage, currentUser } = window.appState;
  const isLoggedIn = currentUser !== null;
  const isDashboard = currentPage === 'student-dashboard' || currentPage === 'enterprise-dashboard';

  let navLinks = '';
  if (!isLoggedIn) {
    navLinks = `
      <div style="display: flex; gap: 24px; align-items: center; color: var(--text-main); font-weight: 600; font-size: 15px;">
        <span style="cursor: pointer;">Dành cho sinh viên</span>
        <span style="cursor: pointer;">Dành cho doanh nghiệp</span>
        <span style="cursor: pointer;">Về chúng tôi</span>
      </div>
    `;
  } else if (!isDashboard) {
    navLinks = `
      <div style="display: flex; gap: 24px; align-items: center; color: var(--text-main); font-weight: 600; font-size: 15px;">
        <span style="cursor: pointer;" onclick="setState({ currentPage: 'student-dashboard' })">Trang cá nhân</span>
      </div>
    `;
  }

  let rightContent = '';
  if (isLoggedIn) {
    rightContent = `
      <div style="display: flex; align-items: center; gap: 16px;">
        ${!isDashboard && currentPage === 'home' ? `
          <button onclick="setState({ currentPage: 'student-dashboard' })" style="padding: 8px 16px; border-radius: var(--radius-md); font-weight: 700; color: var(--primary); background-color: var(--primary-light);">
            Trang cá nhân
          </button>
        ` : ''}
        <button style="padding: 8px; border-radius: 50%; background-color: var(--bg-main); color: var(--text-muted); display: flex; align-items: center; justify-content: center; position: relative;">
          <i data-lucide="bell" style="width: 20px; height: 20px;"></i>
          <span style="position: absolute; top: 4px; right: 4px; width: 8px; height: 8px; background-color: #ef4444; border-radius: 50%; border: 2px solid #fff;"></span>
        </button>
        <div style="display: flex; align-items: center; gap: 10px; padding: 6px 12px; border-radius: var(--radius-full); background-color: var(--bg-main); cursor: pointer;" onclick="setState({ currentPage: 'student-dashboard' })">
          <div style="width: 32px; height: 32px; border-radius: 50%; background-color: var(--primary); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700;">
            ${currentUser.name.charAt(0).toUpperCase()}
          </div>
          <span style="font-weight: 600; font-size: 14px;">${escapeHtml(currentUser.name)}</span>
          <i data-lucide="chevron-down" style="width: 16px; height: 16px; color: var(--text-muted);"></i>
        </div>
      </div>
    `;
  } else {
    rightContent = `
      <div style="display: flex; gap: 12px;">
        <button onclick="setState({ currentPage: 'login' })" style="padding: 8px 18px; border-radius: var(--radius-md); font-weight: 600; color: var(--text-main); border: 1px solid var(--border-color); background-color: #fff;">Đăng nhập</button>
        <button onclick="setState({ currentPage: 'register' })" style="padding: 8px 18px; border-radius: var(--radius-md); background-color: var(--primary); color: #fff; font-weight: 600;">Đăng ký ngay</button>
      </div>
    `;
  }

  return `
    <header style="display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; background-color: #fff; border-bottom: 1px solid var(--border-color); position: sticky; top: 0; z-index: 50; box-shadow: var(--shadow-sm);">
      <div style="display: flex; align-items: center; gap: 40px;">
        <div style="display: flex; align-items: center; gap: 10px; cursor: pointer;" onclick="setState({ currentPage: '${isLoggedIn ? 'student-dashboard' : 'home'}' })">
          <div style="width: 36px; height: 36px; background-color: var(--primary); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
            <i data-lucide="compass" style="color: #fff; width: 20px; height: 20px;"></i>
          </div>
          <span style="font-size: 24px; font-weight: 800; color: var(--primary); letter-spacing: -0.5px;">NAVIX</span>
        </div>
        ${navLinks}
      </div>
      ${rightContent}
    </header>
  `;
};

window.StudentSidebar = function() {
  const { studentTab, sidebarCollapsed } = window.appState;
  
  const navItems = [
    { id: 'overview', label: 'Tổng quan', icon: 'layout-dashboard' },
    { id: 'explore', label: 'Khám phá nghề nghiệp', icon: 'compass' },
    { id: 'ai-roadmap', label: 'Lộ trình AI cá nhân hoá', icon: 'git-merge' },
    { id: 'simulation', label: 'Mô phỏng việc làm', icon: 'briefcase' },
    { id: 'cv', label: 'Xây dựng CV', icon: 'file-text' },
    { id: 'interview', label: 'Luyện tập phỏng vấn', icon: 'message-square' },
    { id: 'mentor', label: 'Cộng đồng Mentor', icon: 'users', badge: 'Sắp ra mắt' },
    { id: 'cert', label: 'Chứng chỉ', icon: 'award' },
    { id: 'referral', label: 'Giới thiệu bạn bè', icon: 'share-2' }
  ];

  const renderNavItems = () => navItems.map(item => {
    const isActive = studentTab === item.id;
    return `
      <button
        onclick="if('${item.id}' === 'mentor') alert('Dự án đang trong quá trình phát triển thêm'); else setState({ studentTab: '${item.id}' });"
        style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: var(--radius-md); font-size: 14px; font-weight: ${isActive ? '700' : '500'}; background-color: ${isActive ? 'var(--primary-light)' : 'transparent'}; color: ${isActive ? 'var(--primary)' : 'var(--text-muted)'}; border-left: 4px solid ${isActive ? 'var(--primary)' : 'transparent'};"
      >
        <i data-lucide="${item.icon}" style="width: 18px; height: 18px;"></i>
        ${!sidebarCollapsed ? `<span style="flex: 1; text-align: left;">${item.label}</span>` : ''}
        ${!sidebarCollapsed && item.badge ? `<span style="font-size: 10px; background-color: var(--primary-light); padding: 2px 8px; border-radius: 10px; color: var(--primary); font-weight: 700;">${item.badge}</span>` : ''}
      </button>
    `;
  }).join('');

  return `
    <aside style="width: ${sidebarCollapsed ? '80px' : '260px'}; background-color: #fff; border-right: 1px solid var(--border-color); padding: 20px 12px; display: flex; flex-direction: column; justify-content: space-between; transition: width 0.3s;">
      <div>
        <button onclick="setState({ sidebarCollapsed: !window.appState.sidebarCollapsed })" style="padding: 8px 12px; border-radius: var(--radius-sm); margin-bottom: 20px; display: flex; align-items: center; gap: 8px; color: var(--text-muted); font-size: 14px; font-weight: 600;">
          <i data-lucide="menu" style="width: 20px; height: 20px;"></i>
          ${!sidebarCollapsed ? '<span>Thu gọn</span>' : ''}
        </button>
        <nav style="display: flex; flex-direction: column; gap: 4px;">
          ${renderNavItems()}
        </nav>
      </div>
      <button onclick="setState({ currentUser: null, currentPage: 'home' })" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: var(--radius-md); color: #ef4444; font-size: 14px; font-weight: 600;">
        <i data-lucide="log-out" style="width: 18px; height: 18px;"></i>
        ${!sidebarCollapsed ? '<span>Đăng xuất</span>' : ''}
      </button>
    </aside>
  `;
};
