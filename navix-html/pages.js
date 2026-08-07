// ==========================================
// PAGES & ROUTING LOGIC
// ==========================================

window.Home = function() {
  return `
    <div class="animate-fade-in" style="padding-bottom: 60px;">
      <!-- Hero Section -->
      <section style="background-color: #fff; padding: 60px 24px; text-align: center; border-bottom: 1px solid var(--border-color); position: relative; overflow: hidden;">
        <div style="position: absolute; top: -50px; left: 50%; transform: translateX(-50%); width: 600px; height: 300px; background-color: rgba(34, 197, 94, 0.08); filter: blur(80px); border-radius: 50%; pointer-events: none;"></div>
        <div style="max-width: 800px; margin: 0 auto; position: relative; z-index: 1;">
          <span style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 16px; border-radius: var(--radius-full); background-color: var(--primary-light); color: var(--primary); font-weight: 700; font-size: 13px; margin-bottom: 20px; border: 1px solid var(--primary-border);">
            <i data-lucide="sparkles" style="width: 16px; height: 16px;"></i> Nền tảng Hướng nghiệp AI Hàng đầu Sinh viên Việt Nam
          </span>
          <h1 style="font-size: 48px; font-weight: 800; color: #0f172a; margin-bottom: 20px; line-height: 1.2;">Khám phá mình - Khai phá nghề</h1>
          <p style="font-size: 18px; color: var(--text-muted); margin-bottom: 32px; line-height: 1.6;">
            NAVIX là nền tảng giúp sinh viên khám phá đúng nghề, trải nghiệm công việc thực tế và xây dựng lộ trình sự nghiệp cá nhân hóa cùng AI - trước khi bước vào thị trường lao động.
          </p>
          <div style="display: flex; justify-content: center; gap: 16px;">
            <button onclick="setState({ currentPage: 'register' })" style="padding: 14px 32px; border-radius: var(--radius-md); background-color: var(--primary); color: #fff; font-weight: 700; font-size: 16px; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);">
              Bắt đầu trải nghiệm ngay <i data-lucide="arrow-right" style="width: 18px; height: 18px;"></i>
            </button>
          </div>
        </div>
      </section>
    </div>
  `;
};

window.Login = function() {
  const { loginRole } = window.appState;
  
  // Note: Handle submit in app.js via event delegation or inline
  return `
    <div class="animate-fade-in" style="max-width: 440px; margin: 60px auto; padding: 0 24px; width: 100%;">
      <div style="background-color: #fff; padding: 32px; border-radius: var(--radius-lg); border: 1px solid var(--border-color); box-shadow: var(--shadow-md);">
        <h2 style="font-size: 24px; font-weight: 800; text-align: center; margin-bottom: 8px;">Đăng nhập NAVIX</h2>
        <p style="text-align: center; font-size: 14px; color: var(--text-muted); margin-bottom: 24px;">Chọn loại tài khoản để truy cập Dashboard</p>

        <div style="display: flex; gap: 8px; margin-bottom: 20px; background-color: var(--bg-main); padding: 4px; border-radius: var(--radius-md);">
          <button onclick="setState({ loginRole: 'student' })" style="flex: 1; padding: 10px; border-radius: var(--radius-sm); font-size: 13px; font-weight: 700; background-color: ${loginRole === 'student' ? '#fff' : 'transparent'}; color: ${loginRole === 'student' ? 'var(--primary)' : 'var(--text-muted)'}; box-shadow: ${loginRole === 'student' ? 'var(--shadow-sm)' : 'none'};">Tôi là cá nhân</button>
          <button onclick="setState({ loginRole: 'business' })" style="flex: 1; padding: 10px; border-radius: var(--radius-sm); font-size: 13px; font-weight: 700; background-color: ${loginRole === 'business' ? '#fff' : 'transparent'}; color: ${loginRole === 'business' ? 'var(--primary)' : 'var(--text-muted)'}; box-shadow: ${loginRole === 'business' ? 'var(--shadow-sm)' : 'none'};">Tôi là doanh nghiệp</button>
        </div>

        <form onsubmit="event.preventDefault(); window.handleLogin(event);" style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <label style="font-size: 13px; font-weight: 600; display: block; margin-bottom: 6px;">Email</label>
            <input type="email" name="email" required placeholder="name@example.com" style="width: 100%; padding: 10px 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);" />
          </div>
          <div>
            <label style="font-size: 13px; font-weight: 600; display: block; margin-bottom: 6px;">Mật khẩu</label>
            <input type="password" name="password" required placeholder="••••••••" style="width: 100%; padding: 10px 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);" />
          </div>
          <button type="submit" style="margin-top: 8px; padding: 12px; border-radius: var(--radius-md); background-color: var(--primary); color: #fff; font-weight: 700; font-size: 15px;">Đăng nhập</button>
        </form>
        
        <p style="text-align: center; margin-top: 24px; font-size: 14px; color: var(--text-muted);">
          Chưa có tài khoản? <a href="#" onclick="event.preventDefault(); setState({ currentPage: 'register' })" style="color: var(--primary); font-weight: 600; text-decoration: none;">Đăng ký ngay</a>
        </p>
      </div>
    </div>
  `;
};

window.StudentDashboard = function() {
  const { studentTab, currentUser } = window.appState;
  
  let tabContent = '';
  if (studentTab === 'overview') {
    tabContent = `
      <div class="animate-fade-in" style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h1 style="font-size: 28px; font-weight: 800; color: var(--text-main); margin-bottom: 4px;">Xin chào, ${escapeHtml(currentUser.name)} 👋</h1>
          <p style="color: var(--text-muted); font-size: 15px;">Cùng NAVIX tiến gần hơn đến công việc phù hợp.</p>
        </div>
        
        <div style="background-color: #fff; padding: 24px; border-radius: var(--radius-lg); border: 1px solid var(--border-color); box-shadow: var(--shadow-sm);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
            <div>
              <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">Tiến độ hành trình</h3>
              <p style="font-size: 13px; color: var(--text-muted);">Theo dõi hành trình phát triển nghề nghiệp của bạn tại NAVIX.</p>
            </div>
            <div style="text-align: right;">
              <span style="font-size: 28px; font-weight: 800; color: var(--primary);">68%</span>
              <div style="font-size: 12px; color: var(--text-muted);">hoàn thành</div>
            </div>
          </div>
          <div style="height: 10px; background-color: #e2e8f0; border-radius: 10px; overflow: hidden; margin-bottom: 16px;">
            <div style="width: 68%; height: 100%; background-color: var(--primary); border-radius: 10px;"></div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 13px; font-weight: 600; color: var(--primary);">4/6 bước đã hoàn thành</span>
            <span style="font-size: 12px; padding: 4px 12px; border-radius: var(--radius-full); background-color: var(--primary-light); color: var(--primary); font-weight: 700; border: 1px solid var(--primary-border);">• Đang trên đà phát triển</span>
          </div>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
          <div style="background-color: #fff; padding: 24px; border-radius: var(--radius-lg); border: 1px solid var(--border-color); box-shadow: var(--shadow-sm);">
            <h3 style="font-size: 14px; font-weight: 800; color: var(--text-main); letter-spacing: 0.5px; margin-bottom: 4px;">TIẾP THEO DÀNH CHO BẠN</h3>
            <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">Đề xuất cá nhân hóa dựa trên tiến độ và mục tiêu của bạn.</p>
            <div style="background-color: var(--primary-light); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--primary-border); display: flex; gap: 16px; align-items: center;">
              <div style="width: 80px; height: 80px; border-radius: 12px; background-color: #fff; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 36px;">💼</div>
              <div style="flex: 1;">
                <h4 style="font-size: 18px; font-weight: 800; color: var(--text-main); margin-bottom: 8px;">Mô phỏng việc làm</h4>
                <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px; line-height: 1.5;">Thực hành một tình huống công việc thực tế để áp dụng những năng lực bạn đã phát triển.</p>
                <button onclick="setState({ studentTab: 'simulation' })" style="padding: 10px 20px; border-radius: var(--radius-full); background-color: var(--primary); color: #fff; font-weight: 700; font-size: 14px; display: inline-flex; align-items: center; gap: 8px;">
                  Bắt đầu mô phỏng <i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (studentTab === 'explore') {
    const selectedMap = window.appState.selectedJobMap || 'Brand Marketing';
    const currentJobData = window.jobMapsDetails[selectedMap];
    
    // Tạo danh sách công việc chính
    const dutiesHtml = currentJobData.duties.map(duty => `<li>${escapeHtml(duty)}</li>`).join('');
    
    // Tạo danh sách công cụ
    const toolsHtml = currentJobData.tools.map(t => `<span style="font-size: 12px; padding: 4px 12px; border-radius: var(--radius-full); background-color: var(--primary-light); color: var(--primary); font-weight: 600;">${escapeHtml(t)}</span>`).join('');
    
    // Tạo danh sách kỹ năng
    const skillsHtml = currentJobData.skills.map(skill => `<li>${escapeHtml(skill)}</li>`).join('');

    tabContent = `
      <div class="animate-fade-in">
        <div style="background-color: var(--cream); padding: 48px 40px; border-radius: var(--radius-xl); margin-bottom: 32px; position: relative; overflow: hidden; box-shadow: var(--shadow-sm);">
          <div style="position: absolute; inset: 0; opacity: 0.4; background: radial-gradient(ellipse at 80% 20%, rgba(20,83,45,0.06) 0%, transparent 60%);"></div>
          <div style="position: relative; max-width: 640px;">
            <div style="display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap;">
              <span style="font-size: 13px; font-weight: 600; color: var(--primary); padding: 6px 14px; border-radius: var(--radius-full); background-color: #fff; border: 1px solid var(--primary-border);">• Miễn phí</span>
              <span style="font-size: 13px; font-weight: 600; color: var(--primary); padding: 6px 14px; border-radius: var(--radius-full); background-color: #fff; border: 1px solid var(--primary-border);">8–10 phút</span>
              <span style="font-size: 13px; font-weight: 600; color: var(--primary); padding: 6px 14px; border-radius: var(--radius-full); background-color: #fff; border: 1px solid var(--primary-border);">AI phân tích</span>
            </div>
            <h2 style="font-size: 36px; font-weight: 800; color: var(--text-main); margin-bottom: 16px; line-height: 1.2;">
              Bạn vẫn chưa biết mình <span style="color: var(--primary-accent);">hợp nghề gì?</span>
            </h2>
            <p style="color: #555e5b; font-size: 16px; margin-bottom: 28px; line-height: 1.7; max-width: 560px;">
              NAVIX phân tích sở thích, kỹ năng và giá trị nghề nghiệp của bạn theo mô hình Holland (RIASEC), đối chiếu với dữ liệu thực tế từ mentor và doanh nghiệp — để chỉ ra 3 hướng nghề phù hợp nhất với bạn.
            </p>
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
              <button onclick="setState({ careerTestModalOpen: true, careerStep: 'form' })" style="padding: 14px 28px; border-radius: var(--radius-full); background-color: var(--primary); color: #fff; font-weight: 700; font-size: 15px; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(20,83,45,0.25);">
                Khám phá nghề nghiệp ngay <i data-lucide="arrow-right" style="width: 18px; height: 18px;"></i>
              </button>
            </div>
          </div>
        </div>

        <div style="background-color: #fff; padding: 24px; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
            <div>
              <h4 style="font-size: 22px; font-weight: 800; color: var(--primary); margin-bottom: 4px;">${escapeHtml(currentJobData.title)}</h4>
              <div style="font-size: 13px; color: var(--text-muted);">${escapeHtml(currentJobData.categoryTag)}</div>
            </div>
            <span style="font-size: 12px; padding: 4px 12px; border-radius: var(--radius-full); background-color: var(--primary-light); color: var(--primary); font-weight: 700;">Nhánh nghề nghiệp</span>
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 16px;">
            <div>
              <div style="font-weight: 700; font-size: 13px; margin-bottom: 8px; color: var(--text-muted);">CÔNG VIỆC CHÍNH</div>
              <ul style="font-size: 13px; color: var(--text-main); padding-left: 16px; line-height: 1.8;">
                ${dutiesHtml}
              </ul>
              <div style="font-weight: 700; font-size: 13px; margin: 16px 0 8px; color: var(--text-muted);">CÔNG CỤ THƯỜNG DÙNG</div>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                ${toolsHtml}
              </div>
            </div>
            <div>
              <div style="font-weight: 700; font-size: 13px; margin-bottom: 8px; color: var(--text-muted);">KỸ NĂNG CẦN</div>
              <ul style="font-size: 13px; color: var(--text-main); padding-left: 16px; line-height: 1.8;">
                ${skillsHtml}
              </ul>
              <div style="font-weight: 700; font-size: 13px; margin: 16px 0 8px; color: var(--text-muted);">DOANH NGHIỆP TUYỂN DỤNG PHỔ BIẾN</div>
              <p style="font-size: 13px; color: var(--text-main);">${escapeHtml(currentJobData.companies)}</p>
            </div>
          </div>
          
          <div style="background-color: var(--primary-light); padding: 16px 24px; border-radius: var(--radius-md); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
            <div>
              <div style="font-size: 20px; font-weight: 800; color: var(--primary);">${escapeHtml(currentJobData.salary)}</div>
              <div style="font-size: 12px; color: var(--text-muted);">Mức lương tham khảo</div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 14px; font-weight: 700; color: var(--text-main);">${escapeHtml(currentJobData.careerPath)}</div>
              <div style="font-size: 12px; color: var(--text-muted);">Lộ trình phát triển</div>
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (studentTab === 'ai-roadmap') {
    const { chatMessages, chatInput } = window.appState;
    const stagesHtml = [
      { stage: 'GIAI ĐOẠN 1', title: 'Nền tảng chuyên môn', status: 'Hoàn thành 100%', progress: 100, color: '#16a34a', bg: '#dcfce7', desc: 'Kiến thức cốt lõi & công cụ ngành' },
      { stage: 'GIAI ĐOẠN 2', title: 'Thực hành Dự án', status: 'Đang học (65%)', progress: 65, color: 'var(--primary)', bg: 'var(--primary-light)', desc: 'Mô phỏng bài tập thực tế từ DN' },
      { stage: 'GIAI ĐOẠN 3', title: 'CV & Phỏng vấn AI', status: 'Tiếp theo (30%)', progress: 30, color: '#d97706', bg: '#fef3c7', desc: 'Tối ưu CV ATS & Luyện phỏng vấn' },
      { stage: 'GIAI ĐOẠN 4', title: 'Ứng tuyển Doanh nghiệp', status: 'Mục tiêu', progress: 0, color: '#6b7280', bg: '#f3f4f6', desc: 'Kết nối mạng lưới Mentor & HR' }
    ].map(st => `
      <div style="background-color: #fff; padding: 20px; border-radius: var(--radius-lg); border: 2px solid ${st.progress > 0 ? st.color : 'var(--border-color)'}; box-shadow: var(--shadow-sm);">
        <span style="font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 6px; background-color: ${st.bg}; color: ${st.color}; letter-spacing: 0.5px;">${st.stage}</span>
        <h4 style="font-size: 15px; font-weight: 800; margin: 10px 0 4px; color: var(--text-main);">${st.title}</h4>
        <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 12px;">${st.desc}</p>
        <div style="height: 6px; background-color: #e2e8f0; border-radius: 3px; overflow: hidden;">
          <div style="width: ${st.progress}%; height: 100%; background-color: ${st.color};"></div>
        </div>
        <div style="font-size: 11px; font-weight: 700; color: ${st.color}; margin-top: 6px; text-align: right;">${st.status}</div>
      </div>
    `).join('');

    const chatHtml = chatMessages.map(msg => `
      <div style="align-self: ${msg.sender === 'user' ? 'flex-end' : 'flex-start'}; max-width: 80%;">
        <div style="padding: 12px 18px; border-radius: 16px; background-color: ${msg.sender === 'user' ? 'var(--primary)' : 'var(--bg-main)'}; color: ${msg.sender === 'user' ? '#fff' : 'var(--text-main)'}; font-size: 14px; line-height: 1.6;">
          ${escapeHtml(msg.text)}
        </div>
      </div>
    `).join('');

    tabContent = `
      <div class="animate-fade-in">
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 26px; font-weight: 800; margin-bottom: 6px; color: var(--primary);">Lộ trình AI cá nhân hoá</h2>
          <p style="font-size: 14px; color: var(--text-muted);">Lộ trình học tập & phát triển kỹ năng được thiết kế riêng dựa trên mục tiêu nghề nghiệp của bạn.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px;">
          ${stagesHtml}
        </div>

        <div style="background-color: #fff; border-radius: var(--radius-lg); border: 1px solid var(--border-color); display: flex; flex-direction: column; height: 480px;">
          <div style="padding: 16px 24px; border-bottom: 1px solid var(--border-color); background-color: var(--cream); display: flex; align-items: center; gap: 10px;">
            <i data-lucide="bot" style="width: 22px; height: 22px; color: var(--primary);"></i>
            <div>
              <div style="font-size: 15px; font-weight: 800; color: var(--primary);">Trợ lý Lộ trình AI NAVIX</div>
              <div style="font-size: 12px; color: var(--text-muted);">Hỏi đáp & tự động cập nhật lộ trình cá nhân</div>
            </div>
          </div>
          <div style="flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 14px;" id="ai-chat-container">
            ${chatHtml}
          </div>
          <div style="padding: 16px; border-top: 1px solid var(--border-color); display: flex; gap: 12px;">
            <input type="text" id="aiChatInput" value="${escapeHtml(chatInput)}" oninput="setState({ chatInput: this.value })" onkeypress="if(event.key === 'Enter') window.handleSendChat()" placeholder="Nhập câu hỏi hoặc ngành nghề bạn muốn tối ưu lộ trình..." style="flex: 1; padding: 12px; border-radius: 8px; border: 1px solid var(--border-color); font-size: 14px;" />
            <button onclick="window.handleSendChat()" style="padding: 12px 24px; border-radius: 8px; background-color: var(--primary); color: #fff; font-weight: 700;">Gửi</button>
          </div>
        </div>
      </div>
    `;
    
    // Auto scroll chat to bottom when rendered
    setTimeout(() => {
      const container = document.getElementById('ai-chat-container');
      if (container) container.scrollTop = container.scrollHeight;
    }, 0);

  } else if (studentTab === 'cert') {
    tabContent = `
      <div class="animate-fade-in">
        <h2 style="font-size: 22px; font-weight: 800; margin-bottom: 20px;">Chứng chỉ của tôi</h2>
        <div style="background-color: #fff; padding: 24px; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
          <h3 style="font-size: 18px; font-weight: 700;">Career Exploration - NAVIX</h3>
          <p style="font-size: 13px; color: var(--text-muted);">Cấp ngày: 20/05/2025</p>
        </div>
      </div>
    `;

  } else if (studentTab === 'referral') {
    const { referralCount } = window.appState;
    tabContent = `
      <div class="animate-fade-in" style="max-width: 860px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 32px;">
          <span style="font-size: 12px; font-weight: 700; color: var(--primary-accent); background-color: var(--primary-light); padding: 6px 14px; border-radius: var(--radius-full);">• Chương trình giới thiệu bạn bè</span>
          <h2 style="font-size: 32px; font-weight: 800; margin: 16px 0 12px; color: var(--primary);">
            Mời bạn bè cùng khám phá nghề nghiệp,<br /><span style="color: var(--primary-accent);">nhận ưu đãi cho cả hai</span>
          </h2>
          <p style="font-size: 15px; color: var(--text-muted); max-width: 560px; margin: 0 auto; line-height: 1.7;">
            Chia sẻ link hoặc mã QR của bạn — khi bạn bè đăng ký thành công, mỗi lượt giới thiệu đều được ghi nhận. Đủ 10 lượt, bạn nhận ngay ưu đãi giảm 10% gói Pro.
          </p>
        </div>

        <div style="background-color: #0d2a1f; color: #fff; padding: 32px; border-radius: var(--radius-xl); display: grid; grid-template-columns: 1fr auto; gap: 24px; align-items: center; margin-bottom: 24px;">
          <div>
            <div style="font-size: 11px; font-weight: 700; opacity: 0.7; margin-bottom: 10px; letter-spacing: 0.5px;">LINK GIỚI THIỆU CỦA BẠN</div>
            <div style="display: flex; gap: 10px; margin-bottom: 16px;">
              <div style="flex: 1; padding: 12px 16px; border-radius: var(--radius-md); background-color: rgba(255,255,255,0.1); font-weight: 700; font-family: monospace; font-size: 14px;">navix.vn/r/MTNHANH2826</div>
              <button onclick="alert('Đã sao chép link!')" style="padding: 12px 20px; border-radius: var(--radius-full); background-color: #bef264; color: #0d2a1f; font-weight: 700; white-space: nowrap;">Sao chép</button>
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              ${['Facebook', 'Zalo', 'Email', 'Sao chép link'].map(s => `<button style="padding: 8px 14px; border-radius: var(--radius-full); background-color: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #fff; font-size: 13px; font-weight: 600;">${s}</button>`).join('')}
            </div>
          </div>
          <div style="background-color: #fff; padding: 16px; border-radius: var(--radius-lg); text-align: center; width: 120px;">
            <div style="width: 88px; height: 88px; background: repeating-conic-gradient(var(--primary) 0% 25%, #fff 0% 50%) 0 0 / 12px 12px; border-radius: 8px; margin: 0 auto 8px;"></div>
            <div style="font-size: 11px; color: var(--text-muted);">Quét để tham gia</div>
          </div>
        </div>

        <div style="background-color: #fff; padding: 32px; border-radius: var(--radius-xl); border: 1px solid var(--border-color); display: grid; grid-template-columns: 200px 1fr; gap: 32px;">
          <div style="text-align: center;">
            <div style="position: relative; width: 140px; height: 140px; margin: 0 auto 12px;">
              <svg viewBox="0 0 140 140" style="width: 140px; height: 140px; transform: rotate(-90deg);">
                <circle cx="70" cy="70" r="58" fill="none" stroke="#e2e8f0" stroke-width="12"></circle>
                <circle cx="70" cy="70" r="58" fill="none" stroke="var(--primary)" stroke-width="12" stroke-dasharray="${2 * Math.PI * 58 * (referralCount / 10)} ${2 * Math.PI * 58}" stroke-linecap="round"></circle>
              </svg>
              <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <span style="font-size: 36px; font-weight: 800; color: var(--primary); line-height: 1;">${referralCount}</span>
                <span style="font-size: 13px; color: var(--text-muted);">/ 10 lượt</span>
              </div>
            </div>
            <p style="font-size: 12px; color: var(--text-muted);">Số bạn bè đã đăng ký thành công</p>
          </div>
          <div>
            <h3 style="font-size: 18px; font-weight: 800; margin-bottom: 16px; color: var(--text-main);">Lịch sử giới thiệu</h3>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              ${Array(referralCount).fill(0).map((_, i) => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--border-color);">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 32px; height: 32px; border-radius: 50%; background-color: var(--primary-light); color: var(--primary); display: flex; align-items: center; justify-content: center; font-weight: 700;">U${i+1}</div>
                    <div>
                      <div style="font-size: 14px; font-weight: 700; color: var(--text-main);">User ${Math.random().toString(36).substring(2, 6)}</div>
                      <div style="font-size: 12px; color: var(--text-muted);">Đã tạo tài khoản và hoàn thành 1 khóa học</div>
                    </div>
                  </div>
                  <span style="font-size: 12px; font-weight: 600; color: #16a34a; padding: 4px 10px; border-radius: 12px; background-color: #dcfce7;">Thành công</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

  } else if (studentTab === 'simulation') {
    const sims = [
      { title: 'Social Media Campaign - Summer 2026', company: 'NovaTech', field: 'Marketing', position: 'Intern', deadline: '31/08/2026', status: 'Mới', desc: 'Xây dựng ý tưởng và kế hoạch truyền thông cho chiến dịch mùa hè nhắm tới nhóm Gen Z.', tasks: ['Nghiên cứu insight Gen Z', 'Lập kế hoạch nội dung 4 tuần', 'Dự trù ngân sách và chỉ số KPI'] },
      { title: 'Phân tích báo cáo tài chính Q2', company: 'Techcombank', field: 'Tài chính - Ngân hàng', position: 'Fresher', deadline: '15/09/2026', status: 'Đang mở', desc: 'Đánh giá các chỉ số khả năng thanh toán, hiệu quả hoạt động và đề xuất phương án tối ưu vốn.', tasks: ['Đánh giá bảng cân đối kế toán', 'Tính toán chỉ số ROE, ROA', 'Lập bản tóm tắt rủi ro'] },
      { title: 'Xây dựng chiến lược tuyển dụng Gen Z', company: 'Manulife', field: 'Nhân sự', position: 'Junior', deadline: '20/09/2026', status: 'Đang mở', desc: 'Thiết kế quy trình tuyển dụng và trải nghiệm ứng viên thu hút tài năng trẻ.', tasks: ['Thiết kế Employer Branding', 'Xây dựng khung câu hỏi phỏng vấn', 'Đề xuất kênh Sourcing'] }
    ];

    const simsHtml = sims.map(sim => `
      <div style="background-color: #fff; padding: 24px; border-radius: var(--radius-lg); border: 1px solid var(--border-color); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: var(--radius-full); background-color: var(--primary-light); color: var(--primary);">${sim.status}</span>
            <span style="font-size: 12px; color: var(--text-muted);">Hạn: ${sim.deadline}</span>
          </div>
          <h3 style="font-size: 18px; font-weight: 800; margin-bottom: 8px; color: var(--text-main);">${escapeHtml(sim.title)}</h3>
          <p style="font-size: 13px; color: var(--primary); font-weight: 700; margin-bottom: 8px;">${escapeHtml(sim.company)} · ${escapeHtml(sim.field)} (Vị trí: ${escapeHtml(sim.position)})</p>
          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px; line-height: 1.5;">${escapeHtml(sim.desc)}</p>
          
          <div style="background-color: var(--bg-main); padding: 12px; border-radius: 8px; margin-bottom: 16px;">
            <div style="font-size: 12px; font-weight: 700; color: var(--text-main); margin-bottom: 6px;">Nhiệm vụ chính:</div>
            <ul style="font-size: 12px; color: var(--text-muted); padding-left: 16px; margin: 0; line-height: 1.6;">
              ${sim.tasks.map(t => `<li>${escapeHtml(t)}</li>`).join('')}
            </ul>
          </div>
        </div>

        <button onclick="window.openSimulation(${escapeHtml(JSON.stringify(sim))})" style="padding: 12px 20px; border-radius: var(--radius-full); background-color: var(--primary); color: #fff; font-weight: 700; font-size: 14px; width: 100%; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
          Bắt đầu mô phỏng ngay <i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i>
        </button>
      </div>
    `).join('');

    tabContent = `
      <div class="animate-fade-in">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div>
            <h2 style="font-size: 26px; font-weight: 800; color: var(--primary); margin-bottom: 4px;">Mô phỏng việc làm (Job Simulation)</h2>
            <p style="font-size: 14px; color: var(--text-muted);">Thực hành tình huống công việc thực tế từ doanh nghiệp đối tác, nhận điểm & phản hồi AI.</p>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px;">
          ${simsHtml}
        </div>
      </div>
    `;

  } else if (studentTab === 'cv') {
    const { cvTab = 'builder', cvForm, atsJdInput = '', atsCvInput = '', atsResult = null } = window.appState;
    const skillsList = (cvForm.skills || 'React, UI/UX, TypeScript').split(',').map(s => s.trim()).filter(Boolean);
    
    let subTabContent = '';
    if (cvTab === 'builder') {
      subTabContent = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
          <!-- Form Editor -->
          <div style="background-color: #fff; padding: 24px; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
            <h3 style="font-size: 18px; font-weight: 800; margin-bottom: 16px; color: var(--primary);">Thông tin CV cá nhân</h3>
            <div style="display: flex; flex-direction: column; gap: 14px;">
              <div>
                <label style="font-size: 12px; font-weight: 700; display: block; margin-bottom: 4px;">Họ và tên</label>
                <input type="text" value="${escapeHtml(cvForm.fullName || 'Nguyễn Văn Enzy')}" oninput="setState({ cvForm: { ...window.appState.cvForm, fullName: this.value } })" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid var(--border-color);" />
              </div>
              <div>
                <label style="font-size: 12px; font-weight: 700; display: block; margin-bottom: 4px;">Vị trí ứng tuyển</label>
                <input type="text" value="${escapeHtml(cvForm.title || '')}" oninput="setState({ cvForm: { ...window.appState.cvForm, title: this.value } })" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid var(--border-color);" />
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <div>
                  <label style="font-size: 12px; font-weight: 700; display: block; margin-bottom: 4px;">Email</label>
                  <input type="text" value="${escapeHtml(cvForm.email || '')}" oninput="setState({ cvForm: { ...window.appState.cvForm, email: this.value } })" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid var(--border-color);" />
                </div>
                <div>
                  <label style="font-size: 12px; font-weight: 700; display: block; margin-bottom: 4px;">Số điện thoại</label>
                  <input type="text" value="${escapeHtml(cvForm.phone || '')}" oninput="setState({ cvForm: { ...window.appState.cvForm, phone: this.value } })" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid var(--border-color);" />
                </div>
              </div>
              <div>
                <label style="font-size: 12px; font-weight: 700; display: block; margin-bottom: 4px;">Tóm tắt bản thân</label>
                <textarea rows="3" oninput="setState({ cvForm: { ...window.appState.cvForm, summary: this.value } })" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid var(--border-color);">${escapeHtml(cvForm.summary || '')}</textarea>
              </div>
              <div>
                <label style="font-size: 12px; font-weight: 700; display: block; margin-bottom: 4px;">Kinh nghiệm làm việc</label>
                <textarea rows="3" oninput="setState({ cvForm: { ...window.appState.cvForm, experience: this.value } })" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid var(--border-color);">${escapeHtml(cvForm.experience || '')}</textarea>
              </div>
              <div>
                <label style="font-size: 12px; font-weight: 700; display: block; margin-bottom: 4px;">Dự án nổi bật</label>
                <textarea rows="3" oninput="setState({ cvForm: { ...window.appState.cvForm, projects: this.value } })" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid var(--border-color);">${escapeHtml(cvForm.projects || '')}</textarea>
              </div>
              <div>
                <label style="font-size: 12px; font-weight: 700; display: block; margin-bottom: 4px;">Kỹ năng cốt lõi (cách nhau dấu phẩy)</label>
                <input type="text" value="${escapeHtml(cvForm.skills || '')}" oninput="setState({ cvForm: { ...window.appState.cvForm, skills: this.value } })" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid var(--border-color);" />
              </div>
            </div>
          </div>

          <!-- Live Preview -->
          <div style="background-color: #fff; padding: 28px; border-radius: var(--radius-lg); border: 2px solid var(--primary-border); box-shadow: var(--shadow-md); position: sticky; top: 90px; height: fit-content;">
            <div style="border-bottom: 2px solid var(--primary); padding-bottom: 16px; margin-bottom: 16px;">
              <h2 style="font-size: 24px; font-weight: 800; color: var(--primary); margin: 0;">${escapeHtml(cvForm.fullName || 'Nguyễn Văn Enzy')}</h2>
              <div style="font-size: 14px; font-weight: 700; color: var(--primary-accent); margin-top: 4px;">${escapeHtml(cvForm.title || 'Vị trí ứng tuyển')}</div>
              <div style="font-size: 12px; color: var(--text-muted); margin-top: 6px;">📧 ${escapeHtml(cvForm.email || 'email@example.com')} | 📞 ${escapeHtml(cvForm.phone || '0123456789')} | 🏫 ${escapeHtml(cvForm.university || 'Đại học ABCD')}</div>
            </div>

            <div style="margin-bottom: 16px;">
              <h4 style="font-size: 13px; font-weight: 800; color: var(--primary); letter-spacing: 0.5px; margin-bottom: 6px;">TÓM TẮT</h4>
              <p style="font-size: 13px; color: var(--text-main); line-height: 1.6; white-space: pre-wrap;">${escapeHtml(cvForm.summary || '')}</p>
            </div>

            <div style="margin-bottom: 16px;">
              <h4 style="font-size: 13px; font-weight: 800; color: var(--primary); letter-spacing: 0.5px; margin-bottom: 6px;">KINH NGHIỆM LÀM VIỆC</h4>
              <p style="font-size: 13px; color: var(--text-main); line-height: 1.6; white-space: pre-wrap;">${escapeHtml(cvForm.experience || '')}</p>
            </div>

            <div style="margin-bottom: 16px;">
              <h4 style="font-size: 13px; font-weight: 800; color: var(--primary); letter-spacing: 0.5px; margin-bottom: 6px;">DỰ ÁN & SẢN PHẨM</h4>
              <p style="font-size: 13px; color: var(--text-main); line-height: 1.6; white-space: pre-wrap;">${escapeHtml(cvForm.projects || '')}</p>
            </div>

            <div style="margin-bottom: 20px;">
              <h4 style="font-size: 13px; font-weight: 800; color: var(--primary); letter-spacing: 0.5px; margin-bottom: 6px;">KỸ NĂNG CỐT LÕI</h4>
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                ${skillsList.map(s => `<span style="font-size: 11px; padding: 3px 10px; border-radius: var(--radius-full); background-color: var(--primary-light); color: var(--primary); font-weight: 700;">${escapeHtml(s)}</span>`).join('')}
              </div>
            </div>

            <button onclick="alert('Đã xuất PDF mẫu thành công!')" style="width: 100%; padding: 12px; border-radius: var(--radius-full); background-color: var(--primary); color: #fff; font-weight: 700; font-size: 14px; cursor: pointer;">
              📥 Tải CV xuống dạng PDF
            </button>
          </div>
        </div>
      `;
    } else {
      subTabContent = `
        <div style="background-color: #fff; padding: 32px; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
          <h3 style="font-size: 20px; font-weight: 800; margin-bottom: 8px; color: var(--primary);">Phân tích độ tương thích CV & JD (ATS Matcher)</h3>
          <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 24px;">Dán nội dung JD tuyển dụng của doanh nghiệp và CV của bạn để AI đánh giá tỉ lệ khớp.</p>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
            <div>
              <label style="font-size: 13px; font-weight: 700; display: block; margin-bottom: 6px;">Nội dung Mô tả công việc (JD)</label>
              <textarea rows="8" oninput="setState({ atsJdInput: this.value })" placeholder="Dán nội dung JD tại đây..." style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border-color); font-size: 13px;">${escapeHtml(atsJdInput)}</textarea>
            </div>
            <div>
              <label style="font-size: 13px; font-weight: 700; display: block; margin-bottom: 6px;">Nội dung CV của bạn</label>
              <textarea rows="8" oninput="setState({ atsCvInput: this.value })" placeholder="Dán nội dung CV tại đây..." style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border-color); font-size: 13px;">${escapeHtml(atsCvInput)}</textarea>
            </div>
          </div>

          <button
            onclick="window.handleAtsAnalyze()"
            style="padding: 14px 28px; border-radius: var(--radius-full); background-color: var(--primary); color: #fff; font-weight: 700; font-size: 15px; cursor: pointer; margin-bottom: 24px;"
          >
            ✨ Chạy Phân tích ATS ngay
          </button>

          ${atsResult ? `
            <div style="padding: 24px; border-radius: 12px; background-color: var(--cream); border: 1px solid var(--primary-border);">
              <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
                <div style="width: 64px; height: 64px; border-radius: 50%; background-color: var(--primary); color: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; font-weight: 800; font-size: 22px;">
                  ${atsResult.score}%
                </div>
                <div>
                  <h4 style="font-size: 18px; font-weight: 800; color: var(--primary); margin: 0;">Đánh giá tỉ lệ khớp ATS: ${atsResult.score >= 80 ? 'Rất cao' : 'Trung bình'}</h4>
                  <div style="font-size: 13px; color: var(--text-muted);">CV của bạn phù hợp tốt với yêu cầu từ nhà tuyển dụng</div>
                </div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                <div style="background-color: #fff; padding: 16px; border-radius: 8px; border: 1px solid var(--border-color);">
                  <div style="font-size: 13px; font-weight: 700; color: #16a34a; margin-bottom: 8px;">✓ Từ khóa trùng khớp (${atsResult.matchedKeywords.length})</div>
                  <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                    ${atsResult.matchedKeywords.map(k => `<span style="font-size: 11px; padding: 3px 8px; border-radius: 6px; background-color: #dcfce7; color: #15803d; font-weight: 700;">${escapeHtml(k)}</span>`).join('')}
                  </div>
                </div>
                <div style="background-color: #fff; padding: 16px; border-radius: 8px; border: 1px solid var(--border-color);">
                  <div style="font-size: 13px; font-weight: 700; color: #dc2626; margin-bottom: 8px;">⚠ Từ khóa cần bổ sung (${atsResult.missingKeywords.length})</div>
                  <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                    ${atsResult.missingKeywords.map(k => `<span style="font-size: 11px; padding: 3px 8px; border-radius: 6px; background-color: #fee2e2; color: #b91c1c; font-weight: 700;">${escapeHtml(k)}</span>`).join('')}
                  </div>
                </div>
              </div>

              <div style="font-size: 13px; color: var(--text-main); line-height: 1.6;">
                <strong>Gợi ý tối ưu:</strong> ${escapeHtml(atsResult.recommendations)}
              </div>
            </div>
          ` : ''}
        </div>
      `;
    }

    tabContent = `
      <div class="animate-fade-in">
        <div style="display: flex; gap: 12px; margin-bottom: 24px;">
          <button
            onclick="setState({ cvTab: 'builder' })"
            style="padding: 12px 24px; border-radius: var(--radius-full); font-weight: 700; font-size: 15px; background-color: ${cvTab === 'builder' ? 'var(--primary)' : '#fff'}; color: ${cvTab === 'builder' ? '#fff' : 'var(--text-main)'}; border: ${cvTab === 'builder' ? 'none' : '1px solid var(--border-color)'};"
          >
            📄 Tạo & Chỉnh sửa CV
          </button>
          <button
            onclick="setState({ cvTab: 'ats' })"
            style="padding: 12px 24px; border-radius: var(--radius-full); font-weight: 700; font-size: 15px; background-color: ${cvTab === 'ats' ? 'var(--primary)' : '#fff'}; color: ${cvTab === 'ats' ? '#fff' : 'var(--text-main)'}; border: ${cvTab === 'ats' ? 'none' : '1px solid var(--border-color)'};"
          >
            ✨ Phân tích độ phù hợp ATS (CV vs JD)
          </button>
        </div>
        ${subTabContent}
      </div>
    `;

  } else if (studentTab === 'interview') {
    const {
      interviewStep, selectedDomain, selectedPosition, selectedEnterprise,
      currentInterviewQuestionIdx, interviewAnswersList, answerMode
    } = window.appState;

    const domains = [
      { label: 'Tài chính - Ngân hàng', icon: 'building-2' },
      { label: 'Nhân sự', icon: 'users' },
      { label: 'Marketing', icon: 'megaphone' },
      { label: 'CNTT', icon: 'laptop' },
      { label: 'Kế toán - Kiểm toán', icon: 'calculator' }
    ];
    const positions = [
      { title: 'Talent Acquisition', sub: 'Chuyên viên Tuyển dụng' },
      { title: 'HR Generalist', sub: 'Chuyên viên Nhân sự tổng hợp' },
      { title: 'C&B Executive', sub: 'Lương thưởng & Phúc lợi' }
    ];
    const enterprises = ['Vingroup', 'Manulife', 'FPT', 'Techcombank', 'MB Bank'];

    let stepHtml = '';

    if (interviewStep === 'landing') {
      stepHtml = `
        <div style="background-color: var(--cream); padding: 48px 40px; border-radius: var(--radius-xl); position: relative; overflow: hidden; box-shadow: var(--shadow-sm);">
          <div style="position: relative; max-width: 600px;">
            <span style="font-size: 13px; font-weight: 700; color: var(--primary); background-color: #fff; padding: 6px 14px; border-radius: var(--radius-full); border: 1px solid var(--primary-border); display: inline-block; margin-bottom: 20px;">• AI phản hồi tức thì</span>
            <h2 style="font-size: 36px; font-weight: 800; margin-bottom: 16px; color: var(--text-main); line-height: 1.25;">
              Luyện phỏng vấn <span style="color: var(--primary-accent);">sát với thực tế,</span><br />theo đúng ngành bạn chọn
            </h2>
            <p style="color: #555e5b; font-size: 15px; margin-bottom: 28px; line-height: 1.7;">
              Chọn lĩnh vực, vị trí và doanh nghiệp mong muốn — hệ thống dựng đề bài phỏng vấn tương ứng, chấm điểm và góp ý ngay sau mỗi câu trả lời để bạn sẵn sàng hơn trước vòng tuyển dụng thật.
            </p>
            <button onclick="setState({ interviewStep: 'select' })" style="padding: 14px 28px; border-radius: var(--radius-full); background-color: var(--primary); color: #fff; font-weight: 700; font-size: 15px; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(20,83,45,0.25);">
              Bắt đầu luyện tập <i data-lucide="arrow-right" style="width: 18px; height: 18px;"></i>
            </button>
          </div>
        </div>
      `;
    } else if (interviewStep === 'select') {
      const domainsHtml = domains.map(d => {
        const isActive = selectedDomain === d.label;
        return `
          <button onclick="setState({ selectedDomain: '${d.label}' })" style="padding: 16px 12px; border-radius: var(--radius-md); border: ${isActive ? '2px solid var(--primary)' : '1px solid var(--border-color)'}; background-color: ${isActive ? 'var(--primary-light)' : '#fff'}; font-weight: 600; font-size: 12px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 8px; cursor: pointer;">
            <i data-lucide="${d.icon}" style="width: 22px; height: 22px; color: ${isActive ? 'var(--primary)' : 'var(--text-muted)'};"></i>
            ${escapeHtml(d.label)}
          </button>
        `;
      }).join('');

      const positionsHtml = positions.map(p => {
        const isActive = selectedPosition === p.title;
        return `
          <button onclick="setState({ selectedPosition: '${escapeHtml(p.title)}' })" style="padding: 16px; border-radius: var(--radius-md); border: ${isActive ? '2px solid var(--primary)' : '1px solid var(--border-color)'}; background-color: ${isActive ? 'var(--primary-light)' : '#fff'}; text-align: left; cursor: pointer;">
            <div style="font-weight: 700; font-size: 14px; margin-bottom: 4px;">${escapeHtml(p.title)}</div>
            <div style="font-size: 12px; color: var(--text-muted);">${escapeHtml(p.sub)}</div>
          </button>
        `;
      }).join('');

      const enterprisesHtml = enterprises.map(e => {
        const isActive = selectedEnterprise === e;
        return `<button onclick="setState({ selectedEnterprise: '${e}' })" style="padding: 10px 20px; border-radius: var(--radius-full); border: ${isActive ? 'none' : '1px solid var(--border-color)'}; background-color: ${isActive ? 'var(--primary)' : '#fff'}; color: ${isActive ? '#fff' : 'var(--text-main)'}; font-weight: 700; font-size: 14px; cursor: pointer;">${e}</button>`;
      }).join('');

      stepHtml = `
        <div style="background-color: var(--cream); padding: 40px; border-radius: var(--radius-xl); box-shadow: var(--shadow-sm);">
          <div style="font-size: 12px; font-weight: 700; color: var(--text-muted); margin-bottom: 8px;">BƯỚC 2 / 3</div>
          <h3 style="font-size: 26px; font-weight: 800; margin-bottom: 8px; color: var(--primary);">Chọn lĩnh vực, vị trí và doanh nghiệp</h3>
          <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 28px;">Để bài phỏng vấn sẽ được dựng riêng theo lựa chọn của bạn.</p>

          <div style="margin-bottom: 28px;">
            <label style="font-size: 12px; font-weight: 700; display: block; margin-bottom: 12px; color: var(--primary-accent); letter-spacing: 0.5px;">LĨNH VỰC</label>
            <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px;">
              ${domainsHtml}
            </div>
          </div>

          <div style="margin-bottom: 28px;">
            <label style="font-size: 12px; font-weight: 700; display: block; margin-bottom: 12px; color: var(--primary-accent); letter-spacing: 0.5px;">VỊ TRÍ ỨNG TUYỂN</label>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
              ${positionsHtml}
            </div>
          </div>

          <div style="margin-bottom: 32px;">
            <label style="font-size: 12px; font-weight: 700; display: block; margin-bottom: 12px; color: var(--primary-accent); letter-spacing: 0.5px;">DOANH NGHIỆP (ĐÃ TÍCH HỢP TRÊN HỆ THỐNG)</label>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              ${enterprisesHtml}
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 13px; font-weight: 600; color: var(--primary-accent);">${escapeHtml(selectedDomain)} · ${escapeHtml(selectedPosition)} · ${escapeHtml(selectedEnterprise)}</span>
            <button onclick="setState({ interviewStep: 'mode' })" style="padding: 12px 28px; border-radius: var(--radius-full); background-color: var(--primary); color: #fff; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; cursor: pointer;">
              Tiếp tục <i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i>
            </button>
          </div>
        </div>
      `;
    } else if (interviewStep === 'mode') {
      const modeItems = [
        {
          icon: 'clipboard-list',
          title: 'Bộ câu hỏi chung',
          desc: 'Bộ câu hỏi phỏng vấn phổ biến theo vị trí đã chọn, xây dựng từ đề tuyển dụng công khai và cố vấn bởi mentor/HR trong ngành.',
          parts: ['Phần 1: Giới thiệu bản thân', 'Phần 2: Kiến thức chuyên môn', 'Phần 3: Tình huống thực tế'],
          btnText: 'Chọn bộ câu hỏi chung'
        },
        {
          icon: 'building-2',
          title: 'Luyện tập theo doanh nghiệp',
          desc: 'Mô phỏng quy trình tuyển dụng tham khảo dạng Manulife, gồm 4 vòng nối tiếp nhau.',
          parts: ['Vòng 1: Logic & Aptitude test', 'Vòng 2: Phỏng vấn với HR', 'Vòng 3: Phỏng vấn với Quản lý trực tiếp', 'Vòng 4: Phỏng vấn với cấp lãnh đạo (C-level)'],
          btnText: 'Xem quy trình'
        }
      ];

      stepHtml = `
        <div style="background-color: var(--cream); padding: 40px; border-radius: var(--radius-xl); box-shadow: var(--shadow-sm);">
          <div style="font-size: 12px; font-weight: 700; color: var(--text-muted); margin-bottom: 8px;">BƯỚC 3 / 3</div>
          <h3 style="font-size: 26px; font-weight: 800; margin-bottom: 8px; color: var(--primary);">${escapeHtml(selectedPosition)} tại ${escapeHtml(selectedEnterprise)}</h3>
          <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 28px;">Lĩnh vực ${escapeHtml(selectedDomain)} · Chọn hình thức luyện tập phù hợp với bạn.</p>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
            ${modeItems.map(m => `
              <div style="padding: 28px; border-radius: var(--radius-lg); border: 1px solid var(--border-color); background-color: #fff; box-shadow: var(--shadow-sm);">
                <i data-lucide="${m.icon}" style="width: 24px; height: 24px; color: var(--primary); margin-bottom: 12px; display: block;"></i>
                <h4 style="font-size: 18px; font-weight: 800; margin-bottom: 10px;">${m.title}</h4>
                <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px; line-height: 1.6;">${m.desc}</p>
                <ul style="font-size: 13px; color: var(--text-main); margin-bottom: 20px; padding-left: 0; list-style: none; display: flex; flex-direction: column; gap: 6px;">
                  ${m.parts.map(p => `<li style="display: flex; align-items: center; gap: 8px;"><span style="width: 6px; height: 6px; border-radius: 50%; background-color: var(--primary-accent); flex-shrink: 0;"></span>${escapeHtml(p)}</li>`).join('')}
                </ul>
                <button onclick="setState({ interviewStep: 'question', currentInterviewQuestionIdx: 0, interviewAnswersList: {} })" style="padding: 12px 24px; border-radius: var(--radius-full); background-color: var(--primary); color: #fff; font-weight: 700; width: 100%; display: inline-flex; align-items: center; justify-content: center; gap: 6px; cursor: pointer;">
                  ${m.btnText} <i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i>
                </button>
              </div>
            `).join('')}
          </div>

          <button onclick="setState({ interviewStep: 'select' })" style="padding: 10px 20px; border-radius: var(--radius-full); border: 1px solid var(--border-color); background-color: #fff; font-weight: 600; color: var(--text-muted); cursor: pointer;">
            ← Quay lại chọn vị trí
          </button>
        </div>
      `;
    } else if (interviewStep === 'question') {
      const currentQuestions = (window.interviewQuestionsMap && window.interviewQuestionsMap[selectedDomain]) || window.interviewQuestionsMap['Nhân sự'];
      const currentQText = currentQuestions[currentInterviewQuestionIdx] || currentQuestions[0];
      const currentAnswer = interviewAnswersList[currentInterviewQuestionIdx] || '';

      stepHtml = `
        <div style="background-color: var(--cream); padding: 40px; border-radius: var(--radius-xl); box-shadow: var(--shadow-sm);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <div style="font-size: 12px; font-weight: 700; color: var(--primary-accent); letter-spacing: 0.5px;">
              CÂU HỎI ${currentInterviewQuestionIdx + 1} / ${currentQuestions.length}
            </div>
            <span style="font-size: 12px; padding: 2px 10px; border-radius: 10px; background-color: #dcfce7; color: var(--primary); font-weight: 700;">
              ${escapeHtml(selectedDomain)} · ${escapeHtml(selectedPosition)}
            </span>
          </div>
          <h3 style="font-size: 22px; font-weight: 800; margin-bottom: 24px; color: var(--primary); line-height: 1.4;">${escapeHtml(currentQText)}</h3>

          <div style="display: flex; gap: 12px; margin-bottom: 16px;">
            <button onclick="setState({ answerMode: 'text' })" style="padding: 10px 20px; border-radius: var(--radius-full); background-color: ${answerMode === 'text' ? 'var(--primary)' : '#fff'}; color: ${answerMode === 'text' ? '#fff' : 'var(--text-main)'}; font-weight: 700; border: ${answerMode === 'text' ? 'none' : '1px solid var(--border-color)'}; cursor: pointer;">
              ✍️ Trả lời văn bản
            </button>
            <button onclick="setState({ answerMode: 'voice' })" style="padding: 10px 20px; border-radius: var(--radius-full); background-color: ${answerMode === 'voice' ? 'var(--primary)' : '#fff'}; color: ${answerMode === 'voice' ? '#fff' : 'var(--text-main)'}; font-weight: 700; border: ${answerMode === 'voice' ? 'none' : '1px solid var(--border-color)'}; cursor: pointer;">
              🎙️ Trả lời giọng nói
            </button>
            <button onclick="alert('Gợi ý STAR cho: ${escapeHtml(currentQText).replace(/'/g,"\\'")}\\n\\nS - Situation: Mô tả tình huống cụ thể\\nT - Task: Nhiệm vụ bạn cần làm\\nA - Action: Hành động bạn đã thực hiện\\nR - Result: Kết quả đạt được')" style="margin-left: auto; padding: 8px 14px; border-radius: 8px; border: 1px solid var(--border-color); background-color: #fff; font-weight: 700; color: var(--primary); cursor: pointer;">💡 Gợi ý STAR</button>
          </div>

          <textarea
            id="interviewAnswerInput"
            rows="6"
            oninput="window.saveInterviewAnswer(${currentInterviewQuestionIdx}, this.value)"
            placeholder="Nhập câu trả lời chi tiết của bạn tại đây (áp dụng mô hình STAR)..."
            style="width: 100%; padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border-color); margin-bottom: 24px; background-color: #fff; font-size: 14px; resize: vertical; font-family: inherit;"
          >${escapeHtml(currentAnswer)}</textarea>

          <div style="display: flex; justify-content: space-between;">
            <button
              onclick="${currentInterviewQuestionIdx > 0 ? `setState({ interviewStep: 'question', currentInterviewQuestionIdx: ${currentInterviewQuestionIdx - 1} })` : `setState({ interviewStep: 'mode' })`}"
              style="padding: 10px 20px; border-radius: var(--radius-full); border: 1px solid var(--border-color); background-color: #fff; font-weight: 600; color: var(--primary); cursor: pointer;"
            >
              ← ${currentInterviewQuestionIdx > 0 ? 'Câu trước' : 'Quay lại'}
            </button>
            <button onclick="setState({ interviewStep: 'feedback' })" style="padding: 12px 28px; border-radius: var(--radius-full); background-color: var(--primary); color: #fff; font-weight: 700; box-shadow: 0 4px 12px rgba(20,83,45,0.2); cursor: pointer;">
              Gửi câu trả lời câu ${currentInterviewQuestionIdx + 1}
            </button>
          </div>
        </div>
      `;
    } else if (interviewStep === 'feedback') {
      const currentQuestions = (window.interviewQuestionsMap && window.interviewQuestionsMap[selectedDomain]) || window.interviewQuestionsMap['Nhân sự'];
      const isLastQ = currentInterviewQuestionIdx >= currentQuestions.length - 1;
      const userAns = interviewAnswersList[currentInterviewQuestionIdx] || '';
      const score = userAns.length > 50 ? '8.5' : '7.0';

      stepHtml = `
        <div style="background-color: #fff; padding: 40px; border-radius: var(--radius-xl); border: 1px solid var(--border-color); box-shadow: var(--shadow-sm);">
          <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 28px;">
            <div style="width: 72px; height: 72px; border-radius: 50%; background-color: var(--primary-light); display: flex; flex-direction: column; align-items: center; justify-content: center; flex-shrink: 0;">
              <span style="font-size: 22px; font-weight: 800; color: var(--primary); line-height: 1;">${score}</span>
              <span style="font-size: 11px; color: var(--text-muted);">/ 10</span>
            </div>
            <div>
              <h3 style="font-size: 20px; font-weight: 800; color: var(--primary);">AI đánh giá câu trả lời (Câu ${currentInterviewQuestionIdx + 1}/${currentQuestions.length})</h3>
              <p style="font-size: 13px; color: var(--text-muted);">${escapeHtml(currentQuestions[currentInterviewQuestionIdx])}</p>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 20px; margin-bottom: 28px;">
            <div>
              <div style="font-size: 11px; font-weight: 700; color: var(--primary); letter-spacing: 0.5px; margin-bottom: 6px;">NHẬN XÉT NỘI DUNG</div>
              <p style="font-size: 14px; color: var(--text-main); line-height: 1.6;">${userAns ? 'Câu trả lời của bạn có liên hệ tốt tới công việc. Bạn đã nêu được thông tin chính nhưng cần bổ sung số liệu minh chứng.' : 'Bạn chưa nhập câu trả lời chi tiết. Khuyến nghị trả lời theo phương pháp STAR.'}</p>
            </div>
            <div>
              <div style="font-size: 11px; font-weight: 700; color: var(--primary); letter-spacing: 0.5px; margin-bottom: 6px;">KỸ NĂNG DIỄN ĐẠT</div>
              <p style="font-size: 14px; color: var(--text-main); line-height: 1.6;">Cấu trúc rõ ràng, tư duy tốt. Nên bổ sung thêm kết quả bài học đo lường được.</p>
            </div>
            <div>
              <div style="font-size: 11px; font-weight: 700; color: var(--primary); letter-spacing: 0.5px; margin-bottom: 6px;">GỢI Ý CẢI THIỆN</div>
              <p style="font-size: 14px; color: var(--text-main); line-height: 1.6;">Nên nhấn mạnh vai trò cá nhân và cách bạn vượt qua thử thách.</p>
            </div>
            <div>
              <div style="font-size: 11px; font-weight: 700; color: var(--primary); letter-spacing: 0.5px; margin-bottom: 6px;">CÂU TRẢ LỜI THAM KHẢO SCHEME STAR</div>
              <div style="padding: 16px; border-radius: var(--radius-md); background-color: var(--primary-light); font-size: 14px; color: var(--text-main); line-height: 1.6; font-style: italic;">
                "Khi đối mặt với yêu cầu này (Situation), nhiệm vụ chính của tôi là... (Task). Tôi đã chủ động làm việc với các bên liên quan và áp dụng giải pháp X (Action), kết quả đạt được tăng 25% hiệu quả (Result)."
              </div>
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 12px;">
            <button
              onclick="${isLastQ ? `setState({ interviewStep: 'summary' })` : `setState({ interviewStep: 'question', currentInterviewQuestionIdx: ${currentInterviewQuestionIdx + 1} })`}"
              style="padding: 12px 28px; border-radius: var(--radius-full); background-color: var(--primary); color: #fff; font-weight: 700; box-shadow: 0 4px 12px rgba(20,83,45,0.2); cursor: pointer;"
            >
              ${isLastQ ? 'Xem tổng kết toàn bộ ' + currentQuestions.length + ' câu →' : `Chuyển sang Câu ${currentInterviewQuestionIdx + 2} →`}
            </button>
          </div>
        </div>
      `;
    } else if (interviewStep === 'summary') {
      const rounds = [
        { round: 'VÒNG 2: PHỎNG VẤN VỚI HR', score: 6.7 },
        { round: 'VÒNG 3: PHỎNG VẤN VỚI QUẢN LÝ TRỰC TIẾP', score: 7.7 },
        { round: 'VÒNG 4: PHỎNG VẤN VỚI CẤP LÃNH ĐẠO (C-LEVEL)', score: 7.4 }
      ];
      const circumference = 2 * Math.PI * 52;

      stepHtml = `
        <div style="background-color: var(--cream); padding: 48px 40px; border-radius: var(--radius-xl); text-align: center;">
          <div style="position: relative; width: 120px; height: 120px; margin: 0 auto 12px;">
            <svg viewBox="0 0 120 120" style="width: 120px; height: 120px; transform: rotate(-90deg);">
              <circle cx="60" cy="60" r="52" fill="none" stroke="#e2e8f0" stroke-width="10"></circle>
              <circle cx="60" cy="60" r="52" fill="none" stroke="var(--primary)" stroke-width="10" stroke-dasharray="${circumference * 0.72} ${circumference}" stroke-linecap="round"></circle>
            </svg>
            <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;">
              <span style="font-size: 32px; font-weight: 800; color: var(--primary); line-height: 1;">7.2</span>
              <span style="font-size: 12px; color: var(--text-muted);">/ 10 điểm</span>
            </div>
          </div>
          <span style="font-size: 12px; font-weight: 700; color: var(--primary-accent); background-color: var(--primary-light); padding: 4px 12px; border-radius: var(--radius-full);">• Kết quả buổi luyện tập</span>
          <h3 style="font-size: 26px; font-weight: 800; margin: 12px 0 8px; color: var(--primary);">Điểm trung bình toàn buổi</h3>
          <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 28px;">Vị trí: ${escapeHtml(selectedPosition)} · Doanh nghiệp: ${escapeHtml(selectedEnterprise)}</p>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px; text-align: left;">
            ${rounds.map(r => `
              <div style="padding: 20px; border-radius: var(--radius-md); background-color: #fff; border: 1px solid var(--border-color);">
                <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); margin-bottom: 8px; letter-spacing: 0.3px;">${r.round}</div>
                <div style="font-size: 28px; font-weight: 800; color: var(--primary); margin-bottom: 8px;">${r.score}</div>
                <div style="height: 4px; background-color: #e2e8f0; border-radius: 2px; overflow: hidden;">
                  <div style="width: ${r.score * 10}%; height: 100%; background-color: var(--primary);"></div>
                </div>
              </div>
            `).join('')}
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 28px; text-align: left;">
            <div style="padding: 20px; border-radius: var(--radius-md); background-color: #fff; border: 1px solid var(--border-color);">
              <h4 style="font-size: 15px; font-weight: 700; color: var(--primary); margin-bottom: 12px;">💪 Điểm mạnh</h4>
              <ul style="font-size: 13px; color: var(--text-main); padding-left: 16px; line-height: 1.8;">
                <li>Trả lời đúng trọng tâm ở phần kiến thức chuyên môn.</li>
                <li>Diễn đạt mạch lạc, có cấu trúc rõ ràng.</li>
                <li>Thể hiện tư duy logic khi xử lý câu hỏi tình huống.</li>
              </ul>
            </div>
            <div style="padding: 20px; border-radius: var(--radius-md); background-color: #fff; border: 1px solid var(--border-color);">
              <h4 style="font-size: 15px; font-weight: 700; color: var(--primary); margin-bottom: 12px;">🌱 Cần cải thiện</h4>
              <ul style="font-size: 13px; color: var(--text-main); padding-left: 16px; line-height: 1.8;">
                <li>Bổ sung thêm ví dụ và số liệu thực tế trong câu trả lời.</li>
                <li>Rút gọn phần mở đầu để đi thẳng vào trọng tâm.</li>
                <li>Luyện thêm phần trả lời bằng giọng nói để tăng sự tự tin.</li>
              </ul>
            </div>
          </div>

          <div style="display: flex; justify-content: center; gap: 12px;">
            <button onclick="setState({ interviewStep: 'landing', currentInterviewQuestionIdx: 0, interviewAnswersList: {} })" style="padding: 12px 28px; border-radius: var(--radius-full); border: 1px solid var(--border-color); background-color: #fff; font-weight: 700; color: var(--primary); cursor: pointer;">
              Luyện tập lại
            </button>
            <button onclick="setState({ interviewStep: 'select' })" style="padding: 12px 28px; border-radius: var(--radius-full); background-color: var(--primary); color: #fff; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; cursor: pointer;">
              Chọn doanh nghiệp khác <i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i>
            </button>
          </div>
        </div>
      `;
    }

    tabContent = `<div class="animate-fade-in">${stepHtml}</div>`;

  } else {
    tabContent = `<div style="padding: 40px; text-align: center; color: var(--text-muted);">
      <h3>Nội dung tab "${studentTab}" đang được xây dựng bằng Vanilla JS...</h3>
    </div>`;
  }

  return `
    <div style="display: flex; flex: 1; height: calc(100vh - 73px);">
      ${window.StudentSidebar()}
      <div style="flex: 1; padding: 32px; overflow-y: auto; background-color: var(--bg-main);">
        ${tabContent}
      </div>
    </div>
  `;
};

window.EnterpriseDashboard = function() {
  const { enterpriseTab = 'overview', sidebarCollapsed } = window.appState;

  const candidates = [
    { id: 1, name: 'Nguyễn Minh Anh', position: 'Marketing Intern', school: 'Đại học Ngoại Thương', score: 9.2, source: 'Bài mô phỏng NovaTech' },
    { id: 2, name: 'Trần Minh Đức', position: 'HR Generalist', school: 'Đại học Kinh tế Quốc dân', score: 8.8, source: 'Phỏng vấn AI Manulife' },
    { id: 3, name: 'Lê Hoàng Nam', position: 'Business Development', school: 'Đại học RMIT', score: 8.5, source: 'Bài mô phỏng FPT' }
  ];

  const simulations = [
    { id: 1, title: 'Social Media Campaign - Summer 2026', category: 'Marketing', position: 'Intern', status: 'Published', date: '10/05/2026' },
    { id: 2, title: 'Xây dựng kế hoạch tuyển dụng Gen Z', category: 'Nhân sự', position: 'Fresher', status: 'Published', date: '02/05/2026' },
    { id: 3, title: 'Phân tích trải nghiệm khách hàng App', category: 'Product', position: 'Junior', status: 'Draft', date: '28/04/2026' }
  ];

  let tabContent = '';
  if (enterpriseTab === 'overview') {
    tabContent = `
      <div class="animate-fade-in" style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h1 style="font-size: 28px; font-weight: 800; color: var(--text-main); margin-bottom: 4px;">Xin chào, NovaTech 👋</h1>
          <p style="color: var(--text-muted); font-size: 15px;">Quản lý đề tuyển dụng và tìm kiếm ứng viên tiềm năng cùng NAVIX.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
          ${[
            { label: 'Tổng số đề mô phỏng', value: '12', icon: 'clipboard-list' },
            { label: 'Tổng số đề phỏng vấn', value: '5', icon: 'mic' },
            { label: 'Tổng số ứng viên', value: '86', icon: 'users' },
            { label: 'Ứng viên tiềm năng', value: '14', icon: 'star' }
          ].map(stat => `
            <div style="background-color: #fff; padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-color); display: flex; align-items: center; gap: 14px;">
              <div style="width: 44px; height: 44px; border-radius: 50%; background-color: var(--primary-light); color: var(--primary); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <i data-lucide="${stat.icon}" style="width: 20px; height: 20px;"></i>
              </div>
              <div>
                <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 2px;">${stat.label}</div>
                <div style="font-size: 26px; font-weight: 800; color: var(--primary);">${stat.value}</div>
              </div>
            </div>
          `).join('')}
        </div>

        <div style="display: grid; grid-template-columns: 1.4fr 1fr; gap: 24px;">
          <div style="background-color: #fff; padding: 24px; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
            <h3 style="font-size: 14px; font-weight: 800; letter-spacing: 0.5px; margin-bottom: 16px;">HOẠT ĐỘNG GẦN ĐÂY</h3>
            <div style="display: flex; flex-direction: column; gap: 16px;">
              ${[
                { name: 'Nguyễn Minh Anh', action: 'vừa nộp bài mô phỏng', detail: 'Marketing Intern – Social Media Campaign', time: '10 phút trước' },
                { name: 'Trần Minh Đức', action: 'hoàn thành phỏng vấn AI', detail: 'HR Generalist – Manulife', time: '35 phút trước' },
                { name: 'Lê Hoàng Nam', action: 'vừa nộp bài mô phỏng', detail: 'Business Development Intern', time: '2 giờ trước' }
              ].map((act, i) => `
                <div style="display: flex; align-items: flex-start; justify-content: space-between; padding-bottom: 16px; border-bottom: ${i < 2 ? '1px solid var(--border-color)' : 'none'};">
                  <div style="display: flex; gap: 12px;">
                    <div style="width: 36px; height: 36px; border-radius: 50%; background-color: var(--primary-light); color: var(--primary); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                      <i data-lucide="briefcase" style="width: 16px; height: 16px;"></i>
                    </div>
                    <div>
                      <div style="font-size: 14px; font-weight: 600;"><strong>${act.name}</strong> ${act.action}</div>
                      <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">${act.detail}</div>
                    </div>
                  </div>
                  <span style="font-size: 12px; color: var(--text-muted); white-space: nowrap;">${act.time}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div style="background-color: #fff; padding: 24px; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <h3 style="font-size: 16px; font-weight: 700;">ỨNG VIÊN TIỀM NĂNG</h3>
              <button onclick="setState({ enterpriseTab: 'candidates' })" style="font-size: 13px; color: var(--primary); font-weight: 700; background: none; border: none; cursor: pointer;">Xem tất cả →</button>
            </div>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              ${candidates.map(c => `
                <div style="padding: 14px; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                  <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 8px;">
                    <div>
                      <div style="font-size: 14px; font-weight: 700;">${c.name}</div>
                      <div style="font-size: 12px; color: var(--text-muted);">${c.position} · ${c.school}</div>
                    </div>
                    <div style="font-size: 18px; font-weight: 800; color: var(--primary);">${c.score}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (enterpriseTab === 'manage-sim') {
    tabContent = `
      <div class="animate-fade-in">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <div>
            <h2 style="font-size: 22px; font-weight: 800;">Quản lý đề mô phỏng</h2>
            <p style="font-size: 13px; color: var(--text-muted);">Theo dõi và quản lý các bài mô phỏng tuyển dụng của doanh nghiệp.</p>
          </div>
          <button onclick="alert('Tính năng Tạo đề mới dành cho Doanh nghiệp Partner!')" style="padding: 10px 20px; border-radius: var(--radius-md); background-color: var(--primary); color: #fff; font-weight: 700; font-size: 14px; cursor: pointer;">
            + Tạo đề mô phỏng
          </button>
        </div>

        <div style="background-color: #fff; border-radius: var(--radius-lg); border: 1px solid var(--border-color); overflow: hidden;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <thead style="background-color: var(--bg-main);">
              <tr style="border-bottom: 1px solid var(--border-color); text-align: left; color: var(--text-muted);">
                <th style="padding: 14px;">Tên đề</th>
                <th style="padding: 14px;">Lĩnh vực</th>
                <th style="padding: 14px;">Vị trí</th>
                <th style="padding: 14px;">Trạng thái</th>
                <th style="padding: 14px;">Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              ${simulations.map(sim => `
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 14px; font-weight: 700; color: var(--primary);">${sim.title}</td>
                  <td style="padding: 14px;">${sim.category}</td>
                  <td style="padding: 14px;">${sim.position}</td>
                  <td style="padding: 14px;">
                    <span style="font-size: 12px; padding: 2px 8px; border-radius: 10px; background-color: ${sim.status === 'Published' ? '#dcfce7' : '#f1f5f9'}; color: ${sim.status === 'Published' ? '#15803d' : '#64748b'}; font-weight: 700;">
                      ${sim.status}
                    </span>
                  </td>
                  <td style="padding: 14px; color: var(--text-muted);">${sim.date}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else {
    tabContent = `
      <div class="animate-fade-in" style="background-color: #fff; padding: 32px; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
        <h3 style="font-size: 20px; font-weight: 800; color: var(--primary); margin-bottom: 12px;">Quản lý Ứng viên & Đề thi</h3>
        <p style="font-size: 14px; color: var(--text-muted);">Nội dung quản lý cho tab ${enterpriseTab} đang được tích hợp bộ lọc AI tự động.</p>
      </div>
    `;
  }

  return `
    <div style="display: flex; flex: 1; height: calc(100vh - 73px);">
      <aside style="width: ${sidebarCollapsed ? '80px' : '260px'}; background-color: #fff; border-right: 1px solid var(--border-color); padding: 20px 12px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <button onclick="setState({ sidebarCollapsed: !window.appState.sidebarCollapsed })" style="padding: 8px 12px; border-radius: var(--radius-sm); margin-bottom: 20px; display: flex; align-items: center; gap: 8px; color: var(--text-muted); font-size: 14px; font-weight: 600; border: none; background: transparent; cursor: pointer;">
            <i data-lucide="menu" style="width: 20px; height: 20px;"></i>
            ${!sidebarCollapsed ? '<span>Thu gọn</span>' : ''}
          </button>
          <nav style="display: flex; flex-direction: column; gap: 4px;">
            ${[
              { id: 'overview', label: 'Tổng quan', icon: 'layout-dashboard' },
              { id: 'manage-sim', label: 'Quản lý đề mô phỏng', icon: 'briefcase' },
              { id: 'manage-interview', label: 'Quản lý đề phỏng vấn', icon: 'message-square' },
              { id: 'candidates', label: 'Ứng viên tiềm năng', icon: 'users' }
            ].map(item => {
              const isActive = enterpriseTab === item.id;
              return `
                <button onclick="setState({ enterpriseTab: '${item.id}' })" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: var(--radius-md); font-size: 14px; font-weight: ${isActive ? 700 : 500}; background-color: ${isActive ? 'var(--primary-light)' : 'transparent'}; color: ${isActive ? 'var(--primary)' : 'var(--text-muted)'}; border: none; border-left: ${isActive ? '4px solid var(--primary)' : '4px solid transparent'}; cursor: pointer;">
                  <i data-lucide="${item.icon}" style="width: 18px; height: 18px;"></i>
                  ${!sidebarCollapsed ? `<span style="flex: 1; text-align: left;">${item.label}</span>` : ''}
                </button>
              `;
            }).join('')}
          </nav>
        </div>
        <button onclick="setState({ currentUser: null, currentPage: 'home' })" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: var(--radius-md); color: #ef4444; font-size: 14px; font-weight: 600; border: none; background: transparent; cursor: pointer;">
          <i data-lucide="log-out" style="width: 18px; height: 18px;"></i>
          ${!sidebarCollapsed ? '<span>Đăng xuất</span>' : ''}
        </button>
      </aside>

      <div style="flex: 1; padding: 32px; overflow-y: auto; background-color: var(--bg-main);">
        ${tabContent}
      </div>
    </div>
  `;
};
