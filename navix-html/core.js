// ==========================================
// CORE STATE & RENDER ENGINE
// ==========================================

// Global state
window.appState = {
  currentPage: 'home', // 'home', 'register', 'login', 'student-dashboard', 'enterprise-dashboard'
  currentUser: null, // object User
  
  // Register flow
  registerType: 'student',
  studentPlan: 'free',
  emailVerified: false,

  // Login
  loginRole: 'student',

  // Dashboard state
  studentTab: 'overview', // 'overview', 'explore', 'ai-roadmap', 'simulation', 'cv', 'interview'
  enterpriseTab: 'overview',
  sidebarCollapsed: false,

  // RIASEC State
  careerTestModalOpen: false,
  careerStep: 'form', // 'form', 'questions', 'result'
  careerAnswers: {},
  currentQuestionIdx: 0,
  selectedJobMap: null,

  // Other components
  showActivitiesModal: false,
  showQuestionHint: false,
  activeSimModal: null, // null hoặc object chứa thông tin bài mô phỏng
  simAnswerText: '',
  simEvaluationResult: null,
  
  // AI Roadmap State
  chatMessages: [
    { sender: 'bot', text: 'Chào bạn, tôi có thể giúp gì cho lộ trình của bạn hôm nay?' }
  ],
  chatInput: '',
  
  // CV Builder
  cvForm: {
    fullName: '',
    phone: '',
    email: '',
    summary: '',
    education: '',
    experience: '',
    skills: ''
  },
  
  // Interview Module
  interviewStep: 'landing', // landing | select | mode | question | feedback | summary
  selectedDomain: 'Nhân sự',
  selectedPosition: 'HR Generalist',
  selectedEnterprise: 'Manulife',
  currentInterviewQuestionIdx: 0,
  interviewAnswersList: {},
  answerMode: 'text',
  
  cvPreviewOpen: false,
  atsAnalysis: null,

  // Interview Practice
  interviewDomain: 'Nhân sự',
  interviewIdx: 0,
  interviewHistory: [],
  interviewAnswerText: '',
  interviewDone: false,
  
  // Referral
  referralCount: 7
};

// Hàm setState
window.setState = function(newState) {
  // Tránh update thừa
  let hasChanged = false;
  for (let key in newState) {
    if (window.appState[key] !== newState[key]) {
      window.appState[key] = newState[key];
      hasChanged = true;
    }
  }

  // Nếu có thay đổi, render lại ứng dụng
  if (hasChanged) {
    window.renderApp();
  }
};

// Hàm giả lập lưu người dùng (Local Storage)
window.saveUser = function(email, password, role, data) {
  const users = JSON.parse(localStorage.getItem('navix_users') || '[]');
  if (users.find(u => u.email === email)) {
    return false;
  }
  users.push({ email, password, role, data, createdAt: new Date().toISOString() });
  localStorage.setItem('navix_users', JSON.stringify(users));
  return true;
};

// Hàm tiện ích Escape HTML
window.escapeHtml = function(unsafe) {
  if (typeof unsafe !== 'string') return unsafe;
  return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
};
