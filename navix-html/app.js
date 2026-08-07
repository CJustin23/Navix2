// ==========================================
// MAIN ENTRY POINT & APP LOGIC
// ==========================================

window.handleLogin = function(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const email = formData.get('email');
  
  // Fake login
  window.setState({
    currentUser: {
      name: email.split('@')[0],
      email: email,
      role: window.appState.loginRole
    },
    currentPage: window.appState.loginRole === 'student' ? 'student-dashboard' : 'enterprise-dashboard'
  });
};

window.handleSendChat = function() {
  const { chatInput, chatMessages } = window.appState;
  if (!chatInput.trim()) return;

  const newMessages = [...chatMessages, { sender: 'user', text: chatInput }];
  
  // Optimistic update
  window.setState({
    chatMessages: newMessages,
    chatInput: ''
  });

  // Fake AI response
  setTimeout(() => {
    window.setState({
      chatMessages: [
        ...newMessages,
        { sender: 'bot', text: 'Cảm ơn bạn. AI của NAVIX đang xử lý yêu cầu và sẽ cập nhật lộ trình của bạn sớm nhất.' }
      ]
    });
  }, 1000);
};

window.handleAtsAnalyze = function() {
  window.setState({
    atsResult: {
      score: 86,
      matchedKeywords: ['React', 'TypeScript', 'UX/UI', 'Tư duy giải quyết vấn đề', 'Web App'],
      missingKeywords: ['CI/CD Pipeline', 'Docker / Container', 'Automated Testing'],
      strengths: 'CV thể hiện rõ năng lực frontend vững vàng và kinh nghiệm làm dự án thực tế.',
      recommendations: 'Bổ sung thêm một số từ khóa kỹ thuật CI/CD và đo lường kết quả dự án bằng con số cụ thể.'
    }
  });
};

window.openSimulation = function(sim) {
  window.setState({
    activeSimModal: sim,
    simAnswerText: '',
    simEvaluationResult: null
  });
};

window.saveInterviewAnswer = function(idx, value) {
  const currentAnswers = window.appState.interviewAnswersList || {};
  window.setState({
    interviewAnswersList: {
      ...currentAnswers,
      [idx]: value
    }
  });
};

window.renderApp = function() {
  const root = document.getElementById('root');
  const { currentPage } = window.appState;
  
  let mainContent = '';
  if (currentPage === 'home') {
    mainContent = window.Home();
  } else if (currentPage === 'login') {
    mainContent = window.Login();
  } else if (currentPage === 'register') {
    mainContent = '<div style="padding: 40px; text-align: center;"><h2>Đăng ký (Đang xây dựng)</h2><button onclick="setState({ currentPage: \'home\' })">Quay lại</button></div>';
  } else if (currentPage === 'student-dashboard') {
    mainContent = window.StudentDashboard();
  } else if (currentPage === 'enterprise-dashboard') {
    mainContent = window.EnterpriseDashboard();
  }

  // Render Root
  root.innerHTML = `
    ${window.Header()}
    <main style="flex: 1; display: flex; flex-direction: column;">
      ${mainContent}
    </main>
  `;

  // Render Modals
  renderModals();

  // Re-initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
};

window.renderModals = function() {
  const modalRoot = document.getElementById('modal-root');
  const { activeSimModal, simAnswerText, simEvaluationResult, careerTestModalOpen, careerStep } = window.appState;
  
  let html = '';

  // 1. Simulation Modal
  if (activeSimModal) {
    html += `
      <div style="position: fixed; inset: 0; background-color: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 24px;">
        <div style="background-color: #fff; border-radius: var(--radius-xl); max-width: 700px; width: 100%; max-height: 90vh; overflow-y: auto; padding: 32px; position: relative; box-shadow: var(--shadow-md);">
          <button onclick="setState({ activeSimModal: null })" style="position: absolute; top: 20px; right: 20px; border: none; background: transparent; font-size: 20px; font-weight: 700; cursor: pointer; color: var(--text-muted);">✕</button>

          <span style="font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: var(--radius-full); background-color: var(--primary-light); color: var(--primary); display: inline-block; margin-bottom: 12px;">MÔ PHỎNG THỰC TẾ</span>
          <h3 style="font-size: 22px; font-weight: 800; margin-bottom: 6px; color: var(--primary);">${escapeHtml(activeSimModal.title)}</h3>
          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 20px;">Doanh nghiệp: <strong>${escapeHtml(activeSimModal.company)}</strong> · Vị trí: <strong>${escapeHtml(activeSimModal.position)}</strong></p>

          <div style="background-color: var(--cream); padding: 16px; border-radius: 8px; margin-bottom: 20px;">
            <div style="font-size: 13px; font-weight: 700; margin-bottom: 6px; color: var(--text-main);">Đề bài chi tiết:</div>
            <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 12px; line-height: 1.6;">${escapeHtml(activeSimModal.desc)}</p>
            <div style="font-size: 12px; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">Yêu cầu nộp bài:</div>
            <ul style="font-size: 12px; color: var(--text-muted); padding-left: 16px; margin: 0; line-height: 1.6;">
              ${activeSimModal.tasks.map(t => `<li>${escapeHtml(t)}</li>`).join('')}
            </ul>
          </div>

          ${!simEvaluationResult ? `
            <div style="margin-bottom: 20px;">
              <label style="font-size: 13px; font-weight: 700; display: block; margin-bottom: 8px;">Nội dung bài làm / Giải pháp của bạn:</label>
              <textarea
                rows="6"
                oninput="setState({ simAnswerText: this.value })"
                placeholder="Trình bày giải pháp chi tiết của bạn tại đây (có thể kèm link file Google Drive/Figma)..."
                style="width: 100%; padding: 14px; border-radius: 8px; border: 1px solid var(--border-color); font-size: 14px; font-family: inherit;"
              >${escapeHtml(simAnswerText)}</textarea>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 12px;">
              <button onclick="setState({ activeSimModal: null })" style="padding: 10px 20px; border-radius: var(--radius-full); border: 1px solid var(--border-color); background: #fff; font-weight: 600;">Hủy</button>
              <button
                onclick="setState({ simEvaluationResult: { score: 88, feedback: 'Bài làm rất tốt, phân tích sắc bén và đưa ra KPI khả thi. Nên lưu ý thêm về tối ưu ngân sách.', kpis: 'Đạt 4/4 tiêu chí tuyển dụng.' } })"
                style="padding: 10px 24px; border-radius: var(--radius-full); background: var(--primary); color: #fff; font-weight: 700;"
              >
                ✨ Nộp bài & Nhận chấm điểm AI
              </button>
            </div>
          ` : `
            <div style="padding: 20px; border-radius: 12px; background-color: var(--primary-light); border: 1px solid var(--primary-border); margin-bottom: 20px;">
              <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 12px;">
                <div style="width: 54px; height: 54px; border-radius: 50%; background-color: var(--primary); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 800;">
                  ${simEvaluationResult.score}
                </div>
                <div>
                  <h4 style="font-size: 16px; font-weight: 800; color: var(--primary); margin: 0;">Đánh giá AI: Xuất sắc (${simEvaluationResult.score}/100)</h4>
                  <div style="font-size: 12px; color: var(--text-muted);">${simEvaluationResult.kpis}</div>
                </div>
              </div>
              <p style="font-size: 13px; color: var(--text-main); line-height: 1.6; margin: 0;"><strong>Góp ý chi tiết:</strong> ${escapeHtml(simEvaluationResult.feedback)}</p>
            </div>

            <div style="display: flex; justify-content: flex-end;">
              <button onclick="setState({ activeSimModal: null })" style="padding: 10px 24px; border-radius: var(--radius-full); background: var(--primary); color: #fff; font-weight: 700;">Đóng</button>
            </div>
          `}
        </div>
      </div>
    `;
  }

  // 2. RIASEC Career Test Modal
  if (careerTestModalOpen) {
    html += `
      <div style="position: fixed; inset: 0; background-color: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 24px;">
        <div style="background-color: #fff; border-radius: var(--radius-xl); max-width: 650px; width: 100%; max-height: 90vh; overflow-y: auto; padding: 32px; position: relative; box-shadow: var(--shadow-md);">
          <button onclick="setState({ careerTestModalOpen: false })" style="position: absolute; top: 20px; right: 20px; border: none; background: transparent; font-size: 20px; font-weight: 700; cursor: pointer; color: var(--text-muted);">✕</button>

          <span style="font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: var(--radius-full); background-color: var(--primary-light); color: var(--primary); display: inline-block; margin-bottom: 12px;">MÔ HÌNH HOLLAND (RIASEC)</span>
          <h3 style="font-size: 22px; font-weight: 800; margin-bottom: 6px; color: var(--primary);">Đánh giá Định hướng Nghề nghiệp AI</h3>

          ${careerStep === 'form' ? `
            <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 20px;">Vui lòng đánh giá mức độ phù hợp của bạn với các câu hỏi sau (từ 1: Không thích đến 5: Rất thích):</p>

            <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px;">
              ${[
                '1. Thích làm việc với máy móc, công cụ hoặc hoạt động ngoài trời',
                '2. Thích nghiên cứu, phân tích và giải quyết các bài toán phức tạp',
                '3. Thích sáng tạo, thiết kế, vẽ hoặc viết lách tự do',
                '4. Thích giúp đỡ, huấn luyện, chăm sóc hoặc truyền cảm hứng cho người khác',
                '5. Thích thuyết phục, quản lý, lãnh đạo hoặc kinh doanh thương mại',
                '6. Thích công việc rõ ràng, sắp xếp dữ liệu, quản lý hồ sơ sổ sách'
              ].map((q, i) => `
                <div style="background-color: var(--cream); padding: 14px 16px; border-radius: 8px;">
                  <div style="font-size: 13px; font-weight: 600; margin-bottom: 8px; color: var(--text-main);">${q}</div>
                  <div style="display: flex; justify-content: space-between; gap: 8px;">
                    ${[1, 2, 3, 4, 5].map(val => `
                      <label style="flex: 1; text-align: center; background-color: #fff; padding: 6px; border-radius: 6px; border: 1px solid var(--border-color); font-size: 12px; cursor: pointer; font-weight: 600;">
                        <input type="radio" name="riasec_q${i}" value="${val}" ${val === 4 ? 'checked' : ''} style="margin-right: 4px;" /> ${val}
                      </label>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 12px;">
              <button onclick="setState({ careerTestModalOpen: false })" style="padding: 10px 20px; border-radius: var(--radius-full); border: 1px solid var(--border-color); background: #fff; font-weight: 600;">Hủy</button>
              <button onclick="setState({ careerStep: 'result' })" style="padding: 10px 24px; border-radius: var(--radius-full); background: var(--primary); color: #fff; font-weight: 700;">Xem kết quả phân tích AI →</button>
            </div>
          ` : `
            <div style="text-align: center; margin-bottom: 24px;">
              <div style="font-size: 48px; margin-bottom: 8px;">🎯</div>
              <h4 style="font-size: 20px; font-weight: 800; color: var(--primary); margin-bottom: 4px;">Nhóm tính cách nổi trội: E - S - A</h4>
              <p style="font-size: 13px; color: var(--text-muted);">Enterprising (Thuyết phục) · Social (Xã hội) · Artistic (Nghệ thuật)</p>
            </div>

            <div style="background-color: var(--primary-light); padding: 20px; border-radius: 12px; border: 1px solid var(--primary-border); margin-bottom: 24px;">
              <div style="font-size: 13px; font-weight: 800; color: var(--primary); margin-bottom: 8px;">TOP 3 NGÀNH NGHỀ PHÙ HỢP NHẤT DÀNH CHO BẠN:</div>
              <ol style="font-size: 14px; color: var(--text-main); font-weight: 700; padding-left: 20px; margin: 0; line-height: 1.8;">
                <li>Brand Marketing Specialist (Độ khớp 95%)</li>
                <li>Talent Acquisition / HR Generalist (Độ khớp 88%)</li>
                <li>Social Media Content Manager (Độ khớp 84%)</li>
              </ol>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 12px;">
              <button onclick="setState({ careerTestModalOpen: false, selectedJobMap: 'Brand Marketing', studentTab: 'explore' })" style="padding: 12px 24px; border-radius: var(--radius-full); background: var(--primary); color: #fff; font-weight: 700; width: 100%;">
                Khám phá chi tiết lộ trình Brand Marketing →
              </button>
            </div>
          `}
        </div>
      </div>
    `;
  }

  modalRoot.innerHTML = html;
};

// Khởi chạy ứng dụng lần đầu
document.addEventListener('DOMContentLoaded', () => {
  window.renderApp();
});
