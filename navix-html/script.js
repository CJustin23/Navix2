// ==========================================
// SCRIPT.JS - FULL FEATURED CONTROLLER
// ==========================================

// State giả lập cho JS tĩnh
const state = {
  selectedJobMap: 'Brand Marketing',
  cvTab: 'builder',
  cvForm: {
    fullName: 'Nguyễn Văn Enzy',
    title: 'Brand Marketing Executive',
    email: 'enzy@navix.vn',
    phone: '0987654321',
    summary: 'Sinh viên năm cuối ngành Marketing với đam mê xây dựng thương hiệu và sáng tạo nội dung.',
    experience: 'Thực tập sinh Marketing tại NovaTech (6 tháng)\n- Lên kế hoạch chiến dịch Social Media\n- Quản lý kênh Fanpage 50k followers',
    projects: 'Dự án "NAVIX Career Launch"\n- Nghiên cứu insight Gen Z\n- Thiết kế kịch bản nội dung',
    skills: 'Tư tư duy chiến lược, Copywriting, Canva, Google Analytics'
  },
  atsJdInput: '',
  atsCvInput: '',
  atsResult: null,
  interviewStep: 'landing',
  selectedDomain: 'Nhân sự',
  selectedPosition: 'HR Generalist',
  selectedEnterprise: 'Manulife',
  currentInterviewQuestionIdx: 0,
  interviewAnswersList: {},
  chatMessages: [
    { sender: 'bot', text: 'Chào bạn! Tôi là Trợ lý AI NAVIX. Bạn muốn tối ưu lộ trình học hay đặt câu hỏi nào cho ngành Brand Marketing?' }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Handle Login Role Switcher
  const btnRoleStudent = document.getElementById('btn-role-student');
  const btnRoleBusiness = document.getElementById('btn-role-business');
  let selectedRole = 'student';

  if (btnRoleStudent && btnRoleBusiness) {
    btnRoleStudent.addEventListener('click', () => {
      selectedRole = 'student';
      btnRoleStudent.style.backgroundColor = '#fff';
      btnRoleStudent.style.color = 'var(--primary)';
      btnRoleBusiness.style.backgroundColor = 'transparent';
      btnRoleBusiness.style.color = 'var(--text-muted)';
    });

    btnRoleBusiness.addEventListener('click', () => {
      selectedRole = 'business';
      btnRoleBusiness.style.backgroundColor = '#fff';
      btnRoleBusiness.style.color = 'var(--primary)';
      btnRoleStudent.style.backgroundColor = 'transparent';
      btnRoleStudent.style.color = 'var(--text-muted)';
    });
  }

  // Handle Login Form Submit
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      localStorage.setItem('userRole', selectedRole);
      if (selectedRole === 'student') {
        window.location.href = 'student-dashboard.html';
      } else {
        window.location.href = 'enterprise-dashboard.html';
      }
    });
  }

  // Handle Sidebar Toggle
  const btnToggleSidebar = document.getElementById('btn-toggle-sidebar');
  const sidebar = document.getElementById('student-sidebar');
  if (btnToggleSidebar && sidebar) {
    let collapsed = false;
    btnToggleSidebar.addEventListener('click', () => {
      collapsed = !collapsed;
      sidebar.style.width = collapsed ? '80px' : '260px';
      document.querySelectorAll('.sidebar-text').forEach(el => {
        el.style.display = collapsed ? 'none' : 'inline';
      });
    });
  }

  // Handle Student Dashboard Tabs
  const studentNavBtns = document.querySelectorAll('.student-nav-btn');
  const studentTabContent = document.getElementById('student-tab-content');

  if (studentNavBtns.length > 0 && studentTabContent) {
    renderStudentTab('overview');

    studentNavBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        studentNavBtns.forEach(b => {
          b.classList.remove('active');
          b.style.backgroundColor = 'transparent';
          b.style.color = 'var(--text-muted)';
          b.style.borderLeft = '4px solid transparent';
          b.style.fontWeight = '500';
        });

        btn.classList.add('active');
        btn.style.backgroundColor = 'var(--primary-light)';
        btn.style.color = 'var(--primary)';
        btn.style.borderLeft = '4px solid var(--primary)';
        btn.style.fontWeight = '700';

        const tab = btn.getAttribute('data-tab');
        renderStudentTab(tab);
      });
    });
  }

  function renderStudentTab(tab) {
    if (!studentTabContent) return;

    // 1. TỔNG QUAN
    if (tab === 'overview') {
      studentTabContent.innerHTML = `
        <div class="animate-fade-in" style="display: flex; flex-direction: column; gap: 24px;">
          <div>
            <h1 style="font-size: 28px; font-weight: 800; color: var(--text-main); margin-bottom: 4px;">Xin chào, Enzy 👋</h1>
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
                  <button onclick="switchTab('simulation')" style="padding: 10px 20px; border-radius: var(--radius-full); background-color: var(--primary); color: #fff; font-weight: 700; font-size: 14px; display: inline-flex; align-items: center; gap: 8px;">
                    Bắt đầu mô phỏng <i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    } 

    // 2. KHÁM PHÁ NGHỀ NGHIỆP
    else if (tab === 'explore') {
      const currentData = (window.jobMapsDetails && window.jobMapsDetails[state.selectedJobMap]) || {
        title: 'Brand Marketing', categoryTag: 'Nhánh Thương hiệu', duties: ['Xây dựng định vị thương hiệu', 'Lên kế hoạch IMC'], tools: ['Canva', 'Figma'], skills: ['Tư duy chiến lược'], companies: 'Unilever, Vinamilk', salary: '12 - 25 triệu VNĐ/tháng', careerPath: 'Executive → Manager'
      };

      studentTabContent.innerHTML = `
        <div class="animate-fade-in">
          <div style="background-color: var(--cream); padding: 48px 40px; border-radius: var(--radius-xl); margin-bottom: 32px; position: relative; overflow: hidden; box-shadow: var(--shadow-sm);">
            <div style="position: relative; max-width: 640px;">
              <h2 style="font-size: 36px; font-weight: 800; color: var(--text-main); margin-bottom: 16px; line-height: 1.2;">
                Bạn vẫn chưa biết mình <span style="color: var(--primary-accent);">hợp nghề gì?</span>
              </h2>
              <p style="color: #555e5b; font-size: 16px; margin-bottom: 28px; line-height: 1.7;">
                NAVIX phân tích sở thích, kỹ năng và giá trị nghề nghiệp của bạn theo mô hình Holland (RIASEC), đối chiếu với dữ liệu thực tế từ mentor và doanh nghiệp.
              </p>
              <button onclick="alert('Đang mở Bài test Holland RIASEC...')" style="padding: 14px 28px; border-radius: var(--radius-full); background-color: var(--primary); color: #fff; font-weight: 700; font-size: 15px; display: inline-flex; align-items: center; gap: 8px;">
                Khám phá nghề nghiệp ngay <i data-lucide="arrow-right" style="width: 18px; height: 18px;"></i>
              </button>
            </div>
          </div>

          <div style="background-color: #fff; padding: 24px; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
              <div>
                <h4 style="font-size: 22px; font-weight: 800; color: var(--primary); margin-bottom: 4px;">${currentData.title}</h4>
                <div style="font-size: 13px; color: var(--text-muted);">${currentData.categoryTag}</div>
              </div>
              <span style="font-size: 12px; padding: 4px 12px; border-radius: var(--radius-full); background-color: var(--primary-light); color: var(--primary); font-weight: 700;">Nhánh nghề nghiệp</span>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 16px;">
              <div>
                <div style="font-weight: 700; font-size: 13px; margin-bottom: 8px; color: var(--text-muted);">CÔNG VIỆC CHÍNH</div>
                <ul style="font-size: 13px; color: var(--text-main); padding-left: 16px; line-height: 1.8;">
                  ${currentData.duties.map(d => `<li>${d}</li>`).join('')}
                </ul>
              </div>
              <div>
                <div style="font-weight: 700; font-size: 13px; margin-bottom: 8px; color: var(--text-muted);">DOANH NGHIỆP TUYỂN DỤNG</div>
                <p style="font-size: 13px; color: var(--text-main);">${currentData.companies}</p>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // 3. LỘ TRÌNH AI CÁ NHÂN HÓA
    else if (tab === 'ai-roadmap') {
      studentTabContent.innerHTML = `
        <div class="animate-fade-in">
          <div style="margin-bottom: 24px;">
            <h2 style="font-size: 26px; font-weight: 800; margin-bottom: 6px; color: var(--primary);">Lộ trình AI cá nhân hoá</h2>
            <p style="font-size: 14px; color: var(--text-muted);">Lộ trình học tập & phát triển kỹ năng được thiết kế riêng dựa trên mục tiêu nghề nghiệp của bạn.</p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px;">
            <div style="background-color: #fff; padding: 20px; border-radius: var(--radius-lg); border: 2px solid #16a34a;">
              <span style="font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 6px; background-color: #dcfce7; color: #16a34a;">GIAI ĐOẠN 1</span>
              <h4 style="font-size: 15px; font-weight: 800; margin: 10px 0 4px;">Nền tảng chuyên môn</h4>
              <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 12px;">Kiến thức cốt lõi & công cụ ngành</p>
              <div style="height: 6px; background-color: #e2e8f0; border-radius: 3px; overflow: hidden;"><div style="width: 100%; height: 100%; background-color: #16a34a;"></div></div>
              <div style="font-size: 11px; font-weight: 700; color: #16a34a; margin-top: 6px; text-align: right;">Hoàn thành 100%</div>
            </div>
            <div style="background-color: #fff; padding: 20px; border-radius: var(--radius-lg); border: 2px solid var(--primary);">
              <span style="font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 6px; background-color: var(--primary-light); color: var(--primary);">GIAI ĐOẠN 2</span>
              <h4 style="font-size: 15px; font-weight: 800; margin: 10px 0 4px;">Thực hành Dự án</h4>
              <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 12px;">Mô phỏng bài tập thực tế từ DN</p>
              <div style="height: 6px; background-color: #e2e8f0; border-radius: 3px; overflow: hidden;"><div style="width: 65%; height: 100%; background-color: var(--primary);"></div></div>
              <div style="font-size: 11px; font-weight: 700; color: var(--primary); margin-top: 6px; text-align: right;">Đang học (65%)</div>
            </div>
          </div>
        </div>
      `;
    }

    // 4. MÔ PHỎNG VIỆC LÀM
    else if (tab === 'simulation') {
      studentTabContent.innerHTML = `
        <div class="animate-fade-in">
          <h2 style="font-size: 26px; font-weight: 800; color: var(--primary); margin-bottom: 16px;">Mô phỏng việc làm (Job Simulation)</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px;">
            <div style="background-color: #fff; padding: 24px; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
              <span style="font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: var(--radius-full); background-color: var(--primary-light); color: var(--primary);">Mới</span>
              <h3 style="font-size: 18px; font-weight: 800; margin: 12px 0 8px;">Social Media Campaign - Summer 2026</h3>
              <p style="font-size: 13px; color: var(--primary); font-weight: 700; margin-bottom: 8px;">NovaTech · Marketing Intern</p>
              <button onclick="alert('Bắt đầu làm bài Mô phỏng Social Media Campaign!')" style="padding: 12px 20px; border-radius: var(--radius-full); background-color: var(--primary); color: #fff; font-weight: 700; font-size: 14px; width: 100%; margin-top: 12px;">
                Bắt đầu mô phỏng ngay →
              </button>
            </div>
          </div>
        </div>
      `;
    }

    // 5. XÂY DỰNG CV & ATS
    else if (tab === 'cv') {
      studentTabContent.innerHTML = `
        <div class="animate-fade-in">
          <div style="display: flex; gap: 12px; margin-bottom: 24px;">
            <button class="btn-primary">📄 Tạo & Chỉnh sửa CV</button>
            <button class="btn-outline" onclick="alert('Đang chuyển sang tab Phân tích ATS Matcher...')">✨ Phân tích độ phù hợp ATS</button>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
            <div style="background-color: #fff; padding: 24px; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
              <h3 style="font-size: 18px; font-weight: 800; margin-bottom: 16px; color: var(--primary);">Thông tin CV cá nhân</h3>
              <input type="text" value="${state.cvForm.fullName}" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid var(--border-color); margin-bottom: 12px;" />
              <input type="text" value="${state.cvForm.title}" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid var(--border-color); margin-bottom: 12px;" />
              <textarea rows="4" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid var(--border-color);">${state.cvForm.summary}</textarea>
            </div>
            <div style="background-color: #fff; padding: 28px; border-radius: var(--radius-lg); border: 2px solid var(--primary-border);">
              <h2 style="font-size: 24px; font-weight: 800; color: var(--primary); margin: 0;">${state.cvForm.fullName}</h2>
              <div style="font-size: 14px; font-weight: 700; color: var(--primary-accent); marginTop: 4px;">${state.cvForm.title}</div>
              <p style="font-size: 13px; color: var(--text-main); margin-top: 12px;">${state.cvForm.summary}</p>
              <button onclick="alert('Đã xuất file CV mẫu PDF thành công!')" class="btn-primary" style="width: 100%; margin-top: 20px;">📥 Tải CV xuống dạng PDF</button>
            </div>
          </div>
        </div>
      `;
    }

    // 6. LUYỆN TẬP PHỎNG VẤN
    else if (tab === 'interview') {
      studentTabContent.innerHTML = `
        <div class="animate-fade-in">
          <div style="background-color: var(--cream); padding: 48px 40px; border-radius: var(--radius-xl);">
            <h2 style="font-size: 36px; font-weight: 800; margin-bottom: 16px; color: var(--text-main);">
              Luyện phỏng vấn <span style="color: var(--primary-accent);">sát với thực tế</span>
            </h2>
            <p style="color: #555e5b; font-size: 15px; margin-bottom: 28px;">
              Chọn lĩnh vực, vị trí và doanh nghiệp mong muốn — hệ thống dựng đề bài phỏng vấn tương ứng, chấm điểm theo mô hình STAR.
            </p>
            <button onclick="alert('Bắt đầu quy trình phỏng vấn AI 4 vòng!')" class="btn-primary" style="padding: 14px 28px;">Bắt đầu luyện tập ngay →</button>
          </div>
        </div>
      `;
    }

    // 7. GIỚI THIỆU BẠN BÈ
    else if (tab === 'referral') {
      studentTabContent.innerHTML = `
        <div class="animate-fade-in" style="max-width: 860px; margin: 0 auto;">
          <h2 style="font-size: 32px; font-weight: 800; text-align: center; margin-bottom: 16px; color: var(--primary);">
            Mời bạn bè cùng khám phá nghề nghiệp
          </h2>
          <div style="background-color: #0d2a1f; color: #fff; padding: 32px; border-radius: var(--radius-xl); display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 11px; opacity: 0.7; margin-bottom: 6px;">LINK GIỚI THIỆU CỦA BẠN</div>
              <div style="font-size: 16px; font-weight: 700; font-family: monospace;">navix.vn/r/MTNHANH2826</div>
            </div>
            <button onclick="alert('Đã sao chép link giới thiệu!')" style="padding: 12px 20px; border-radius: var(--radius-full); background-color: #bef264; color: #0d2a1f; font-weight: 700;">Sao chép</button>
          </div>
        </div>
      `;
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  window.switchTab = function(tabName) {
    const targetBtn = document.querySelector(`.student-nav-btn[data-tab="${tabName}"]`);
    if (targetBtn) targetBtn.click();
  };
});
