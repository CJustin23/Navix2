import React, { useState } from 'react';
import Compare from './Compare';
import {
  LayoutDashboard,
  Compass,
  GitMerge,
  Briefcase,
  FileText,
  MessageSquare,
  Users,
  Award,
  Share2,
  LogOut,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Plus,
  MoreVertical,
  Bell,
  Home,
  Star,
  Building2,
  Megaphone,
  Laptop,
  Calculator,
  ClipboardList,
  Gift,
  Mic,
  Clock,
  Bot,
  Sprout,
  Heart
} from 'lucide-react';

// --- MOCK DATA FOR DEMO & FULL ACCURACY WITH ALL 19 IMAGES IN /ảnh ---

interface User {
  name: string;
  email: string;
  role: 'student' | 'business';
  companyName?: string;
  industry?: string;
}

export default function App() {
  // Navigation & Page State
  const [currentPage, setCurrentPage] = useState<string>('home'); // home, register, login, student-dashboard, enterprise-dashboard
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Register flow states
  const [registerType, setRegisterType] = useState<'student' | 'business'>('student');
  const [studentPlan, setStudentPlan] = useState<'free' | 'pro'>('free');
  const [emailVerified, setEmailVerified] = useState<boolean>(false);

  // OTP verification states
  const [showOTPModal, setShowOTPModal] = useState<boolean>(false);
  const [generatedOTP, setGeneratedOTP] = useState<string>('');
  const [otpInput, setOtpInput] = useState<string>('');
  const [otpError, setOtpError] = useState<string>('');

  // Local storage helpers for user management
  const saveUser = (email: string, password: string, role: 'student' | 'business', data: any) => {
    const users = JSON.parse(localStorage.getItem('navix_users') || '[]');
    if (users.find((u: any) => u.email === email)) {
      return false; // user already exists
    }
    users.push({ email, password, role, data, createdAt: new Date().toISOString() });
    localStorage.setItem('navix_users', JSON.stringify(users));
    return true;
  };

  const findUser = (email: string, password: string): any => {
    const users = JSON.parse(localStorage.getItem('navix_users') || '[]');
    return users.find((u: any) => u.email === email && u.password === password);
  };

  const sendOTP = (email: string) => {
    const otp = Math.random().toString().slice(2, 8).padStart(6, '0');
    setGeneratedOTP(otp);
    setShowOTPModal(true);
    setOtpInput('');
    setOtpError('');
    // In real app, would send via email API
    console.log(`[DEMO] OTP sent to ${email}: ${otp}`);
    alert(`[Demo] Mã OTP là: ${otp} (kiểm tra console)`);
  };

  const verifyOTP = () => {
    if (otpInput === generatedOTP) {
      setEmailVerified(true);
      setOtpError('');
      setShowOTPModal(false);
      setOtpInput('');
    } else {
      setOtpError('Mã OTP không chính xác. Vui lòng thử lại.');
    }
  };

  // Form Registration Student
  const [studentForm, setStudentForm] = useState({
    fullName: 'Nguyen Van Enzy',
    email: 'enzy.student@navix.vn',
    phone: '0987654321',
    dob: '2003-05-20',
    gender: 'Nam',
    password: 'password123'
  });

  // Form Registration Business
  const [businessForm, setBusinessForm] = useState({
    companyName: 'NovaTech',
    industry: 'CNTT',
    repName: 'Tran Minh Quan',
    email: 'hr@novatech.com.vn',
    phone: '0912345678',
    website: 'https://novatech.com.vn',
    taxCode: '0101234567',
    notes: 'Mong muốn kết nối sinh viên IT & Marketing tiềm năng'
  });

  // Login flow
  const [loginRole, setLoginRole] = useState<'student' | 'business'>('student');
  const [loginEmail, setLoginEmail] = useState<string>('enzy.student@navix.vn');
  const [loginPassword, setLoginPassword] = useState<string>('password123');
  const [loginError, setLoginError] = useState<string>('');

  // Dashboard Active Tabs
  const [studentTab, setStudentTab] = useState<string>('overview');
  const [enterpriseTab, setEnterpriseTab] = useState<string>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // Student Exploration RIASEC (Capture5 -> Capture8)
  const [careerTestModalOpen, setCareerTestModalOpen] = useState<boolean>(false);
  const [careerStep, setCareerStep] = useState<'info' | 'form' | 'questions' | 'result' | 'map'>('info');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedJobMap, setSelectedJobMap] = useState<string>('Brand Marketing');

  // AI Interview Practice Flow (Capture10 -> Capture15)
  const [interviewStep, setInterviewStep] = useState<'landing' | 'select' | 'mode' | 'question' | 'feedback' | 'summary'>('landing');
  const [selectedDomain, setSelectedDomain] = useState<string>('Nhân sự');
  const [selectedPosition, setSelectedPosition] = useState<string>('HR Generalist');
  const [selectedEnterprise, setSelectedEnterprise] = useState<string>('Techcombank');
  const [answerMode, setAnswerMode] = useState<'text' | 'voice'>('text');
  const [answerText, setAnswerText] = useState<string>('');
  const [showQuestionHint, setShowQuestionHint] = useState<boolean>(false);

  // Hint generation states (AI key optional). If user provides an OpenAI key in the modal,
  // the app will try to call OpenAI from the browser (CORS permitting). Otherwise it falls
  // back to a local heuristic generator.
  const [hintLoading, setHintLoading] = useState<boolean>(false);
  const [hintText, setHintText] = useState<string>('');
  const [sampleAnswer, setSampleAnswer] = useState<string>('');
  const [openAIKey, setOpenAIKey] = useState<string>('');
  const [hintQuestionOverride, setHintQuestionOverride] = useState<string>('');

  // local heuristic generator for hints (no external API)
  const localGenerateHint = (question: string, position: string, domain: string) => {
    const star = `S: Mô tả bối cảnh ngắn gọn; T: Nhiệm vụ bạn đảm nhận; A: Hành động cụ thể bạn đã làm; R: Kết quả đo lường.`;
    const keyPoints = [`Nêu vai trò & đóng góp cá nhân`, `Đưa số liệu (nếu có)`, `Nêu thách thức & cách giải quyết`, `Kết quả cụ thể hoặc bài học`];
    const sample = `Trong dự án X (S), tôi được giao nhiệm vụ ${position} (T). Tôi đã thực hiện bằng cách ... (A), kết quả là đạt được ... (R) — ví dụ: tăng 20% tương tác, hoàn thành trước kế hoạch 2 tuần.`;
    return { star, keyPoints, sample };
  };

  // generate hint (useAI = true will try OpenAI if openAIKey is provided; otherwise fallback to local)
  const generateHint = async (useAI: boolean) => {
    const question = hintQuestionOverride || '';
    setHintLoading(true);
    setHintText('');
    setSampleAnswer('');
    try {
      if (useAI && openAIKey) {
        // call OpenAI chat completion (browser fetch)
        const prompt = `Bạn là chuyên gia phỏng vấn. Căn cứ vào câu hỏi: "${question}", vị trí: ${selectedPosition} và lĩnh vực: ${selectedDomain},
Hãy trả về gợi ý trả lời ngắn theo phương pháp STAR, liệt kê 3 điểm cần nhấn mạnh, và một mẫu trả lời ngắn (2-3 câu). Trả về ở dạng văn bản.`;
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${openAIKey}` },
          body: JSON.stringify({ model: 'gpt-3.5-turbo', messages: [{ role: 'user', content: prompt }], max_tokens: 500 })
        });
        if (!res.ok) throw new Error(`OpenAI error ${res.status}`);
        const data = await res.json();
        const content = data.choices?.[0]?.message?.content || '';
        // naive split: assume sample answer is last paragraph
        setHintText(content);
        // attempt to extract last paragraph as sample
        const parts = content.split('\n\n');
        setSampleAnswer(parts[parts.length - 1] || '');
      } else {
        const out = localGenerateHint(question, selectedPosition, selectedDomain);
        setHintText(`STAR: ${out.star}\n\nNhững điểm cần nêu:\n- ${out.keyPoints.join('\n- ')}`);
        setSampleAnswer(out.sample);
      }
    } catch (e: any) {
      setHintText('Không thể tạo gợi ý tự động. Vui lòng thử lại hoặc cung cấp OpenAI API Key.\n' + (e?.message || ''));
    } finally {
      setHintLoading(false);
    }
  };

  // Enterprise Simulations State (Capture3.PNG)
  const [simulations, setSimulations] = useState([
    { id: 'sim-1', title: 'Social Media Campaign - Summer 2026', category: 'Marketing', position: 'Intern', status: 'Published', date: '05/06/2026', candidatesCount: 12 },
    { id: 'sim-2', title: 'Phân tích báo cáo tài chính', category: 'Tài chính - Ngân hàng', position: 'Fresher', status: 'Published', date: '03/06/2026', candidatesCount: 8 },
    { id: 'sim-3', title: 'Xây dựng chiến lược tuyển dụng', category: 'Nhân sự', position: 'Junior', status: 'Draft', date: '01/06/2026', candidatesCount: 0 },
    { id: 'sim-4', title: 'Phân tích dữ liệu khách hàng', category: 'CNTT', position: 'Fresher', status: 'Closed', date: '28/05/2026', candidatesCount: 15 }
  ]);
  const [isCreatingSim, setIsCreatingSim] = useState<boolean>(false);
  const [simForm, setSimForm] = useState({
    title: 'Social Media Campaign - Summer 2026',
    category: 'Marketing',
    position: 'Intern',
    mission: 'Xây dựng ý tưởng và kế hoạch triển khai một chiến dịch Social Media nhằm tăng mức độ nhận diện thương hiệu trong nhóm khách hàng Gen Z.',
    format: 'Trả lời văn bản',
    criterias: ['Khả năng giải quyết vấn đề', 'Tư duy logic', 'Tính sáng tạo', 'Kỹ năng trình bày'],
    solution: '',
    deadline: '2026-08-31'
  });

  // Enterprise Interview Setup Flow (4a65381f-7598-4fbf-b125-dbcd99c2c3f7.png)
  const [interviewCreateStep, setInterviewCreateStep] = useState<number>(0); // 0: none, 1: list, 2: info, 3: rounds, 4: questions, 5: review

  // Enterprise Candidates (Capture2.PNG & UK.md)
  const [candidates] = useState([
    { id: 'cand-1', name: 'Nguyễn Minh Anh', school: 'Đại học Kinh tế Quốc dân', major: 'Marketing', position: 'Marketing Intern', time: '10 phút trước', score: '8.7', status: 'Tiềm năng', source: 'Đề mô phỏng' },
    { id: 'cand-2', name: 'Trần Minh Đức', school: 'Đại học Ngoại thương', major: 'Marketing', position: 'Marketing Intern', time: '35 phút trước', score: '8.5', status: 'Tiềm năng', source: 'Đề phỏng vấn' },
    { id: 'cand-3', name: 'Lê Hoàng Nam', school: 'Đại học Quốc gia Hà Nội', major: 'Kinh doanh', position: 'Business Development Intern', time: '2 giờ trước', score: '8.2', status: 'Tiềm năng', source: 'Đề mô phỏng' }
  ]);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

  // Referral State (Capture17.PNG & Capture18.PNG)
  const [referralCount, setReferralCount] = useState<number>(8);

  // Chat Roadmap state
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; actionBtns?: any[] }>>([
    {
      sender: 'ai',
      text: 'Xin chào! Bạn đang quan tâm đến ngành Công nghệ thông tin? Để hệ thống AI cá nhân hóa lộ trình tốt nhất, hãy nhập vị trí mong muốn hoặc tải lên CV của bạn nhé!'
    }
  ]);
  const [chatInput, setChatInput] = useState<string>('Tôi học ngành CNTT, muốn ứng tuyển vị trí Front-end Developer, hãy thiết kế lộ trình cá nhân cho tôi');

  // Helper Login Handle
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.includes('@')) {
      setLoginError('Sai email.');
      return;
    }
    if (loginPassword.length < 6) {
      setLoginError('Sai mật khẩu.');
      return;
    }
    setLoginError('');
    const user = findUser(loginEmail, loginPassword);
    if (!user) {
      setLoginError('Email hoặc mật khẩu không chính xác.');
      return;
    }
    if (user.role !== loginRole) {
      setLoginError(`Tài khoản này không phải ${loginRole === 'student' ? 'cá nhân' : 'doanh nghiệp'}. Vui lòng chọn loại tài khoản đúng.`);
      return;
    }
    setLoginError('');
    if (loginRole === 'student') {
      setCurrentUser({ name: user.data.fullName || 'Student', email: loginEmail, role: 'student' });
      setCurrentPage('student-dashboard');
    } else {
      setCurrentUser({ name: user.data.companyName || 'Company', email: loginEmail, role: 'business', companyName: user.data.companyName });
      setCurrentPage('enterprise-dashboard');
    }
  };

  // Chat AI response trigger logic
  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: `Cảm ơn bạn! Dựa trên vị trí **Front-end Developer** bạn mong muốn, NAVIX đã đối chiếu với chuẩn JD doanh nghiệp:`,
          actionBtns: [
            { label: 'Trải nghiệm ngay (Mô phỏng)', targetTab: 'simulation' },
            { label: 'Xây dựng CV ngay', targetTab: 'cv' },
            { label: 'Luyện tập phỏng vấn', targetTab: 'interview' }
          ]
        }
      ]);
    }, 800);
  };

  // Allow external navigation via URL query params so an iframe (the Compare page)
  // can load the app already showing a specific section for visual comparison.
  // Examples:
  //  /?navigate=student-dashboard&studentTab=overview
  //  /?navigate=student-dashboard&studentTab=explore&careerOpen=info
  React.useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const nav = params.get('navigate');
      if (nav) setCurrentPage(nav);
      const st = params.get('studentTab');
      if (st) setStudentTab(st);
      const it = params.get('interviewStep');
      if (it) setInterviewStep(it as any);
      const ent = params.get('enterpriseTab');
      if (ent) setEnterpriseTab(ent);
      const careerOpen = params.get('careerOpen');
      if (careerOpen) {
        setCareerTestModalOpen(true);
        setCareerStep(careerOpen as any);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // Reset email verification when navigating to register page
  React.useEffect(() => {
    if (currentPage === 'register') {
      setEmailVerified(false);
      setOtpInput('');
      setOtpError('');
      setShowOTPModal(false);
    }
  }, [currentPage]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
      {(() => {
        const isDashboard = currentPage === 'student-dashboard' || currentPage === 'enterprise-dashboard';
        const displayName = currentUser?.role === 'business'
          ? (currentUser.companyName || currentUser.name)
          : (currentUser?.name?.split(' ').pop() || 'Enzy');

        return (
      <header style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid var(--border-color)',
        padding: isDashboard ? '0 20px' : '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            onClick={() => setCurrentPage(isDashboard ? (currentUser?.role === 'business' ? 'enterprise-dashboard' : 'student-dashboard') : 'home')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          >
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 800,
              fontSize: '18px'
            }}>
              N
            </div>
            <span style={{ fontWeight: 800, fontSize: '20px', color: 'var(--primary)', letterSpacing: '0.5px' }}>NAVIX</span>
          </div>

          {isDashboard && (
            <button
              onClick={() => setCurrentPage('home')}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '14px', fontWeight: 600, padding: '6px 10px', borderRadius: 'var(--radius-sm)' }}
            >
              <Home size={16} /> Trang chủ
            </button>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {isDashboard && currentUser ? (
            <>
              <button style={{ position: 'relative', padding: '8px', borderRadius: '50%', color: 'var(--text-muted)' }}>
                <Bell size={20} />
                <span style={{ position: 'absolute', top: '6px', right: '6px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444', border: '2px solid #fff' }} />
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 12px 4px 4px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)', cursor: 'pointer' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: currentUser.role === 'student'
                    ? 'linear-gradient(135deg, #86efac, #16a34a)'
                    : 'var(--primary)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: 700
                }}>
                  {displayName.charAt(0)}
                </div>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>{displayName}</span>
                <ChevronDown size={16} color="var(--text-muted)" />
              </div>
            </>
          ) : currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--primary-light)',
                border: '1px solid var(--primary-border)'
              }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700 }}>
                  {currentUser.name.charAt(0)}
                </div>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>{currentUser.name}</span>
              </div>
              <button
                onClick={() => { setCurrentUser(null); setCurrentPage('home'); }}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '14px', fontWeight: 500 }}
              >
                <LogOut size={16} /> Đăng xuất
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={() => setCurrentPage('compare')}
                title="So sánh với ảnh mẫu"
                style={{
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: '#fff',
                  color: 'var(--text-main)',
                  fontWeight: 700,
                  fontSize: '13px'
                }}
              >
                So sánh
              </button>

              <button
                onClick={() => { setLoginRole('student'); setCurrentPage('login'); }}
                style={{
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-main)',
                  fontWeight: 600,
                  fontSize: '14px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: '#fff'
                }}
              >
                Đăng nhập
              </button>
              <button
                onClick={() => setCurrentPage('register')}
                style={{
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--primary)',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '14px',
                  boxShadow: '0 2px 4px rgba(20, 83, 45, 0.2)'
                }}
              >
                Đăng ký ngay
              </button>
            </div>
          )}
        </div>
      </header>
        );
      })()}

      {/* BODY CONTENT CONTAINER */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* ========================================== */}
        {/* 1. TRANG CHỦ LANDING PAGE (UK.md Section 1) */}
        {/* ========================================== */}
        {currentPage === 'home' && (
          <div className="animate-fade-in" style={{ paddingBottom: '60px' }}>
            
            {/* 1.2.1 Hero Section */}
            <section style={{
              backgroundColor: '#fff',
              padding: '60px 24px',
              textAlign: 'center',
              borderBottom: '1px solid var(--border-color)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '-50px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '600px',
                height: '300px',
                backgroundColor: 'rgba(34, 197, 94, 0.08)',
                filter: 'blur(80px)',
                borderRadius: '50%',
                pointerEvents: 'none'
              }} />

              <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 16px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)',
                  fontWeight: 700,
                  fontSize: '13px',
                  marginBottom: '20px',
                  border: '1px solid var(--primary-border)'
                }}>
                  <Sparkles size={16} /> Nền tảng Hướng nghiệp AI Hàng đầu Sinh viên Việt Nam
                </span>

                <h1 style={{ fontSize: '48px', fontWeight: 800, color: '#0f172a', marginBottom: '20px', lineHeight: 1.2 }}>
                  Khám phá mình - Khai phá nghề
                </h1>

                <p style={{ fontSize: '18px', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: 1.6 }}>
                  NAVIX là nền tảng giúp sinh viên khám phá đúng nghề, trải nghiệm công việc thực tế và xây dựng lộ trình sự nghiệp cá nhân hóa cùng AI - trước khi bước vào thị trường lao động.
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                  <button
                    onClick={() => setCurrentPage('register')}
                    style={{
                      padding: '14px 32px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--primary)',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)'
                    }}
                  >
                    Bắt đầu trải nghiệm ngay <ArrowRight size={18} />
                  </button>
                </div>
              </div>

              {/* Dải số liệu di chuyển */}
              <div style={{
                marginTop: '50px',
                overflow: 'hidden',
                backgroundColor: 'var(--bg-main)',
                padding: '16px 0',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                maxWidth: '900px',
                margin: '50px auto 0 auto'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '20px', padding: '0 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '20px' }}>5+</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>Ngành nghề trọng điểm</div>
                  </div>
                  <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '20px' }}>20+</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>Bài mô phỏng thực tế</div>
                  </div>
                  <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '20px' }}>AI</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>Cá nhân hóa lộ trình</div>
                  </div>
                  <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '20px' }}>100%</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>Miễn phí trải nghiệm</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Câu chuyện thương hiệu */}
            <section style={{ maxWidth: '1000px', margin: '60px auto 0 auto', padding: '0 24px' }}>
              <h2 style={{ textAlign: 'center', fontSize: '32px', fontWeight: 800, marginBottom: '40px' }}>
                Câu chuyện thương hiệu NAVIX
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
                <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: '16px' }}>!</div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: '#991b1b' }}>Vấn đề thực tế</h3>
                  <ul style={{ listStyleType: 'disc', paddingLeft: '18px', color: 'var(--text-muted)', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>Gen Z thiếu định hướng nghề nghiệp và kỹ năng thực chiến.</li>
                    <li><strong>72% Gen Z Việt Nam mong muốn nâng cao kỹ năng số</strong>, nhưng vẫn gặp khoảng cách với nhu cầu doanh nghiệp.</li>
                    <li><strong>91% doanh nghiệp gặp khó khăn khi quản lý & phát triển nhân sự Gen Z</strong>.</li>
                  </ul>
                </div>

                <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: '16px' }}>✓</div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: 'var(--primary)' }}>Giải pháp từ NAVIX</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6 }}>
                    NAVIX đồng hành cùng người trẻ bằng AI và hệ sinh thái hướng nghiệp, giúp <strong>khám phá bản thân - trải nghiệm thực tế - kết nối cộng đồng</strong>, để tự tin bước vào thị trường lao động.
                  </p>
                </div>

                <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: '16px' }}>★</div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: '#0369a1' }}>Sứ mệnh NAVIX</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6 }}>
                    Để mọi người trẻ đều có thể <strong>đi đúng hướng</strong> trước khi <strong>chạy thật nhanh</strong> trong sự nghiệp.
                  </p>
                </div>
              </div>

              {/* Timeline hành trình */}
              <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 700, textAlign: 'center', marginBottom: '24px' }}>
                  Hành trình 6 bước phát triển sự nghiệp cùng NAVIX
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px', textAlign: 'center' }}>
                  {[
                    { step: '1', title: 'Khám phá bản thân' },
                    { step: '2', title: 'Lộ trình AI cá nhân hóa' },
                    { step: '3', title: 'Trải nghiệm mô phỏng' },
                    { step: '4', title: 'Hoàn thiện hồ sơ CV' },
                    { step: '5', title: 'Luyện tập phỏng vấn' },
                    { step: '6', title: 'Kết nối cộng đồng' }
                  ].map((item, idx) => (
                    <div key={idx} style={{ padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-color)' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700, margin: '0 auto 8px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {item.step}
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>{item.title}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <button
                  onClick={() => setCurrentPage('register')}
                  style={{ padding: '16px 40px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700, fontSize: '18px', boxShadow: '0 6px 20px rgba(22, 163, 74, 0.3)' }}
                >
                  Bắt đầu ngay
                </button>
              </div>
            </section>
          </div>
        )}

            {currentPage === 'compare' && (
              <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
                <Compare />
              </div>
            )}

        {/* ========================================== */}
        {/* 2. TRANG ĐĂNG KÝ (UK.md Section 2)          */}
        {/* ========================================== */}
        {currentPage === 'register' && (
          <div className="animate-fade-in" style={{ maxWidth: '700px', margin: '40px auto', padding: '0 24px', width: '100%' }}>
            
            <div style={{ display: 'flex', backgroundColor: '#e2e8f0', borderRadius: 'var(--radius-md)', padding: '4px', marginBottom: '32px' }}>
              <button
                onClick={() => setRegisterType('student')}
                style={{ flex: 1, padding: '12px', borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: '15px', backgroundColor: registerType === 'student' ? '#fff' : 'transparent', color: registerType === 'student' ? 'var(--primary)' : 'var(--text-muted)' }}
              >
                Tôi là Sinh viên
              </button>
              <button
                onClick={() => setRegisterType('business')}
                style={{ flex: 1, padding: '12px', borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: '15px', backgroundColor: registerType === 'business' ? '#fff' : 'transparent', color: registerType === 'business' ? 'var(--primary)' : 'var(--text-muted)' }}
              >
                Tôi là Doanh nghiệp
              </button>
            </div>

            {registerType === 'student' && (
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>Chọn gói dịch vụ dành cho cá nhân</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                  <div
                    onClick={() => setStudentPlan('free')}
                    style={{ backgroundColor: '#fff', padding: '20px', borderRadius: 'var(--radius-lg)', border: studentPlan === 'free' ? '2px solid var(--primary)' : '1px solid var(--border-color)', cursor: 'pointer' }}
                  >
                    <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>Gói Free</div>
                    <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>Miễn phí</div>
                    <ul style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '16px' }}>
                      <li>Test hướng nghiệp cơ bản</li>
                      <li>Lộ trình cơ bản</li>
                      <li>Tạo CV tiêu chuẩn</li>
                      <li>Job Simulation giới hạn</li>
                    </ul>
                  </div>

                  <div
                    onClick={() => setStudentPlan('pro')}
                    style={{ backgroundColor: '#fff', padding: '20px', borderRadius: 'var(--radius-lg)', border: studentPlan === 'pro' ? '2px solid var(--primary)' : '1px solid var(--border-color)', cursor: 'pointer', position: 'relative' }}
                  >
                    <span style={{ position: 'absolute', top: '12px', right: '12px', backgroundColor: '#fef3c7', color: '#b45309', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '10px' }}>
                      Tiết kiệm 17%
                    </span>
                    <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>Gói Pro</div>
                    <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--primary)', marginBottom: '4px' }}>50.000đ/tháng</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>hoặc 500.000đ/năm</div>
                    <ul style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '16px' }}>
                      <li>AI cá nhân hóa lộ trình chuẩn</li>
                      <li>Phân tích CV - JD độc quyền</li>
                      <li>AI Interview & Feedback</li>
                      <li>Job Simulation không giới hạn</li>
                    </ul>
                  </div>
                </div>

                <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>Thông tin đăng ký tài khoản ({studentPlan.toUpperCase()})</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Họ và tên</label>
                      <input type="text" value={studentForm.fullName} onChange={e => setStudentForm({ ...studentForm, fullName: e.target.value })} style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }} />
                    </div>

                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Email</label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input type="email" value={studentForm.email} onChange={e => setStudentForm({ ...studentForm, email: e.target.value })} style={{ flex: 1, padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }} />
                        <button onClick={() => { if (studentForm.email) sendOTP(studentForm.email); else alert('Vui lòng nhập email trước'); }} disabled={emailVerified} style={{ padding: '0 16px', borderRadius: 'var(--radius-sm)', backgroundColor: emailVerified ? '#dcfce7' : 'var(--primary-light)', color: emailVerified ? '#166534' : 'var(--primary)', fontWeight: 600, fontSize: '13px', border: '1px solid var(--primary-border)' }}>
                          {emailVerified ? '✓ Đã xác thực' : 'Xác thực Email'}
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Số điện thoại</label>
                        <input type="text" value={studentForm.phone} onChange={e => setStudentForm({ ...studentForm, phone: e.target.value })} style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Mật khẩu</label>
                        <input type="password" value={studentForm.password} onChange={e => setStudentForm({ ...studentForm, password: e.target.value })} style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }} />
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (!studentForm.fullName || !studentForm.email || !studentForm.password || !emailVerified) {
                          alert('Vui lòng điền đầy đủ thông tin và xác thực email');
                          return;
                        }
                        if (saveUser(studentForm.email, studentForm.password, 'student', studentForm)) {
                          alert('Đăng ký thành công! Vui lòng đăng nhập.');
                          setLoginRole('student');
                          setLoginEmail(studentForm.email);
                          setLoginPassword('');
                          setCurrentPage('login');
                        } else {
                          alert('Email này đã được đăng ký rồi.');
                        }
                      }}
                      style={{ marginTop: '12px', padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700, fontSize: '15px' }}
                    >
                      Đăng ký ngay
                    </button>
                  </div>
                </div>
              </div>
            )}

            {registerType === 'business' && (
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>Gói dịch vụ Business dành cho Doanh nghiệp</h3>
                <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: 'var(--radius-lg)', border: '2px solid var(--primary)', marginBottom: '32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div>
                      <div style={{ fontSize: '20px', fontWeight: 800 }}>Gói Business</div>
                      <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Dành riêng cho Doanh nghiệp tuyển dụng & đào tạo</div>
                    </div>
                    <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--primary)' }}>Liên hệ báo giá</div>
                  </div>
                </div>

                <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>Thông tin đăng ký doanh nghiệp</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Tên công ty *</label>
                      <input type="text" value={businessForm.companyName} onChange={e => setBusinessForm({ ...businessForm, companyName: e.target.value })} style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }} />
                    </div>
                    <button
                      onClick={() => {
                        if (!businessForm.companyName || !businessForm.email) {
                          alert('Vui lòng điền Tên công ty và Email');
                          return;
                        }
                        // Generate temp password for business account
                        const tempPassword = Math.random().toString(36).slice(2, 10);
                        if (saveUser(businessForm.email, tempPassword, 'business', businessForm)) {
                          alert('Yêu cầu tư vấn đã được gửi tới Admin NAVIX!\nMật khẩu tạm: ' + tempPassword);
                          setLoginRole('business');
                          setLoginEmail(businessForm.email);
                          setLoginPassword('');
                          setCurrentPage('login');
                        } else {
                          alert('Email này đã được đăng ký rồi.');
                        }
                      }}
                      style={{ marginTop: '12px', padding: '14px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700, fontSize: '15px' }}
                    >
                      Liên hệ tư vấn & Tạo tài khoản
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================== */}
        {/* 3. TRANG ĐĂNG NHẬP (UK.md Section 3.1)     */}
        {/* ========================================== */}
        {currentPage === 'login' && (
          <div className="animate-fade-in" style={{ maxWidth: '440px', margin: '60px auto', padding: '0 24px', width: '100%' }}>
            <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 800, textAlign: 'center', marginBottom: '8px' }}>
                Đăng nhập NAVIX
              </h2>
              <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px' }}>
                Chọn loại tài khoản để truy cập Dashboard
              </p>

              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', backgroundColor: 'var(--bg-main)', padding: '4px', borderRadius: 'var(--radius-md)' }}>
                <button
                  type="button"
                  onClick={() => { setLoginRole('student'); setLoginError(''); }}
                  style={{ flex: 1, padding: '10px', borderRadius: 'var(--radius-sm)', fontSize: '13px', fontWeight: 700, backgroundColor: loginRole === 'student' ? '#fff' : 'transparent', color: loginRole === 'student' ? 'var(--primary)' : 'var(--text-muted)' }}
                >
                  Tôi là cá nhân
                </button>
                <button
                  type="button"
                  onClick={() => { setLoginRole('business'); setLoginError(''); }}
                  style={{ flex: 1, padding: '10px', borderRadius: 'var(--radius-sm)', fontSize: '13px', fontWeight: 700, backgroundColor: loginRole === 'business' ? '#fff' : 'transparent', color: loginRole === 'business' ? 'var(--primary)' : 'var(--text-muted)' }}
                >
                  Tôi là doanh nghiệp
                </button>
              </div>

              {loginError && (
                <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '10px 14px', borderRadius: '6px', fontSize: '13px', marginBottom: '16px', fontWeight: 600 }}>
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                    {loginRole === 'student' ? 'Email cá nhân' : 'Email công ty'}
                  </label>
                  <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} placeholder="name@example.com" style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }} />
                </div>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Mật khẩu</label>
                  <input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} placeholder="••••••••" style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }} />
                </div>

                <button type="submit" style={{ marginTop: '8px', padding: '12px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700, fontSize: '15px' }}>
                  Đăng nhập
                </button>

                <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '13px', color: 'var(--text-muted)' }}>
                  Chưa có tài khoản?{' '}
                  <span onClick={() => setCurrentPage('register')} style={{ color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}>
                    Đăng ký ngay
                  </span>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. DASHBOARD CÁ NHÂN (STUDENT DASHBOARD - Capture.PNG & UK.md)             */}
        {/* ========================================================================= */}
        {currentPage === 'student-dashboard' && (
          <div style={{ display: 'flex', flex: 1 }}>
            <aside style={{
              width: sidebarCollapsed ? '80px' : '260px',
              backgroundColor: '#fff',
              borderRight: '1px solid var(--border-color)',
              padding: '20px 12px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '14px', fontWeight: 600 }}>
                  <Menu size={20} />
                  {!sidebarCollapsed && <span>Thu gọn</span>}
                </button>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {[
                    { id: 'overview', label: 'Tổng quan', icon: LayoutDashboard },
                    { id: 'explore', label: 'Khám phá nghề nghiệp', icon: Compass },
                    { id: 'ai-roadmap', label: 'Lộ trình AI cá nhân hoá', icon: GitMerge },
                    { id: 'simulation', label: 'Mô phỏng việc làm', icon: Briefcase },
                    { id: 'cv', label: 'Xây dựng CV', icon: FileText },
                    { id: 'interview', label: 'Luyện tập phỏng vấn', icon: MessageSquare },
                    { id: 'mentor', label: 'Cộng đồng Mentor', icon: Users, badge: 'Sắp ra mắt' },
                    { id: 'cert', label: 'Chứng chỉ', icon: Award },
                    { id: 'referral', label: 'Giới thiệu bạn bè', icon: Share2 }
                  ].map((item) => {
                    const IconComp = item.icon;
                    const isActive = studentTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          if (item.id === 'mentor') {
                            alert('Dự án đang trong quá trình phát triển thêm');
                            return;
                          }
                          setStudentTab(item.id);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '12px 16px',
                          borderRadius: 'var(--radius-md)',
                          fontSize: '14px',
                          fontWeight: isActive ? 700 : 500,
                          backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                          color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                          borderLeft: isActive ? '4px solid var(--primary)' : '4px solid transparent'
                        }}
                      >
                        <IconComp size={18} />
                        {!sidebarCollapsed && <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>}
                        {!sidebarCollapsed && item.badge && (
                          <span style={{ fontSize: '10px', backgroundColor: 'var(--primary-light)', padding: '2px 8px', borderRadius: '10px', color: 'var(--primary)', fontWeight: 700 }}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <button onClick={() => { setCurrentUser(null); setCurrentPage('home'); }} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: 'var(--radius-md)', color: '#ef4444', fontSize: '14px', fontWeight: 600 }}>
                <LogOut size={18} />
                {!sidebarCollapsed && <span>Đăng xuất</span>}
              </button>
            </aside>

            <div style={{ flex: 1, padding: '32px', overflowY: 'auto', backgroundColor: 'var(--bg-main)' }}>
              
              {/* OVERVIEW TAB (GIỐNG HỆT 100% Capture.PNG) */}
              {studentTab === 'overview' && (
                <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>
                      Xin chào, Enzy 👋
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
                      Cùng NAVIX tiến gần hơn đến công việc phù hợp.
                    </p>
                  </div>

                  <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <div>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                          Tiến độ hành trình
                        </h3>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                          Theo dõi hành trình phát triển nghề nghiệp của bạn tại NAVIX.
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '28px', fontWeight: 800, color: 'var(--primary)' }}>68%</span>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>hoàn thành</div>
                      </div>
                    </div>

                    <div style={{ height: '10px', backgroundColor: '#e2e8f0', borderRadius: '10px', overflow: 'hidden', marginBottom: '16px' }}>
                      <div style={{ width: '68%', height: '100%', backgroundColor: 'var(--primary)', borderRadius: '10px' }} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>
                        4/6 bước đã hoàn thành
                      </span>
                      <span style={{ fontSize: '12px', padding: '4px 12px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 700, border: '1px solid var(--primary-border)' }}>
                        • Đang trên đà phát triển
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                    <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '0.5px', marginBottom: '4px' }}>
                        TIẾP THEO DÀNH CHO BẠN
                      </h3>
                      <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                        Đề xuất cá nhân hóa dựa trên tiến độ và mục tiêu của bạn.
                      </p>

                      <div style={{ backgroundColor: 'var(--primary-light)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-border)', display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '12px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '36px' }}>
                          💼
                        </div>
                        <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
                          Mô phỏng việc làm
                        </h4>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.5 }}>
                          Thực hành một tình huống công việc thực tế để áp dụng những năng lực bạn đã phát triển trong lộ trình.
                        </p>
                        <button onClick={() => setStudentTab('simulation')} style={{ padding: '10px 20px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700, fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                          Bắt đầu mô phỏng <ArrowRight size={16} />
                        </button>
                        </div>
                      </div>

                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '12px' }}>
                        ⓘ Đây là đề xuất dành riêng cho bạn. Nội dung có thể thay đổi theo tiến độ.
                      </div>
                    </div>

                    <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '0.5px', marginBottom: '16px' }}>
                        HOẠT ĐỘNG GẦN ĐÂY
                      </h3>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#dcfce7', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <CheckCircle2 size={18} />
                            </div>
                            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>Hoàn thành bài đánh giá nghề nghiệp</span>
                          </div>
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Hôm nay</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#dcfce7', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Briefcase size={18} />
                            </div>
                            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>Hoàn thành bài mô phỏng việc làm</span>
                          </div>
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>2 ngày trước</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#dcfce7', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <GitMerge size={18} />
                            </div>
                            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>Hoàn thành lộ trình AI cá nhân hóa</span>
                          </div>
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>5 ngày trước</span>
                        </div>
                      </div>

                      <button style={{ marginTop: '16px', fontSize: '13px', fontWeight: 700, color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        Xem tất cả hoạt động <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>

                  <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '0.5px', marginBottom: '16px' }}>
                      CHỨNG CHỈ
                    </h3>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ padding: '16px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '8px', backgroundColor: 'var(--primary-light)', border: '1px solid var(--primary-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                          <Award size={24} />
                        </div>
                        <div>
                          <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)' }}>Career Exploration - NAVIX</div>
                          <div style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600 }}>✓ Đã hoàn thành</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Ngày cấp: 20/05/2025</div>
                        </div>
                      </div>

                      <button onClick={() => setStudentTab('cert')} style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        Xem tất cả chứng chỉ <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>

                </div>
              )}

              {/* KHÁM PHÁ NGHỀ NGHIỆP TAB (Capture5 -> Capture9) */}
              {studentTab === 'explore' && (
                <div className="animate-fade-in">
                  <div style={{
                    backgroundColor: 'var(--cream)',
                    padding: '48px 40px',
                    borderRadius: 'var(--radius-xl)',
                    marginBottom: '32px',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <div style={{ position: 'absolute', inset: 0, opacity: 0.4, background: 'radial-gradient(ellipse at 80% 20%, rgba(20,83,45,0.06) 0%, transparent 60%)' }} />
                    <div style={{ position: 'relative', maxWidth: '640px' }}>
                      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                        {['• Miễn phí', '8–10 phút', 'AI phân tích'].map((tag, i) => (
                          <span key={i} style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)', padding: '6px 14px', borderRadius: 'var(--radius-full)', backgroundColor: '#fff', border: '1px solid var(--primary-border)' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 style={{ fontSize: '36px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '16px', lineHeight: 1.2 }}>
                        Bạn vẫn chưa biết mình <span style={{ color: 'var(--primary-accent)' }}>hợp nghề gì?</span>
                      </h2>
                      <p style={{ color: '#555e5b', fontSize: '16px', marginBottom: '28px', lineHeight: 1.7, maxWidth: '560px' }}>
                        NAVIX phân tích sở thích, kỹ năng và giá trị nghề nghiệp của bạn theo mô hình Holland (RIASEC), đối chiếu với dữ liệu thực tế từ mentor và doanh nghiệp — để chỉ ra 3 hướng nghề phù hợp nhất với bạn.
                      </p>
                      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <button
                          onClick={() => { setCareerTestModalOpen(true); setCareerStep('info'); }}
                          style={{ padding: '14px 28px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700, fontSize: '15px', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(20,83,45,0.25)' }}
                        >
                          Khám phá nghề nghiệp ngay <ArrowRight size={18} />
                        </button>
                        <button
                          onClick={() => { setCareerTestModalOpen(true); setCareerStep('result'); }}
                          style={{ padding: '14px 28px', borderRadius: 'var(--radius-full)', backgroundColor: '#fff', color: 'var(--text-main)', fontWeight: 700, fontSize: '15px', border: '1px solid var(--border-color)' }}
                        >
                          Xem ví dụ kết quả
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* BẢN ĐỒ NGHỀ NGHIỆP MARKETING (Capture9.PNG) */}
                  <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '8px' }}>Bản đồ nghề nghiệp: Marketing</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                    Chọn một nhánh nghề để xem chi tiết công việc, kỹ năng, công cụ và mức lương tham khảo.
                  </p>
                  <div style={{ backgroundColor: 'var(--primary-light)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--primary-border)', marginBottom: '24px' }}>
                    <div style={{ backgroundColor: '#fff', padding: '32px 24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', marginBottom: '20px', boxShadow: 'var(--shadow-sm)' }}>
                      <svg viewBox="0 0 500 220" style={{ width: '100%', maxWidth: '500px', margin: '0 auto', display: 'block' }}>
                        <circle cx="250" cy="40" r="32" fill="var(--primary)" />
                        <text x="250" y="45" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">MARKETING</text>
                        {[
                          { x: 70, label: 'Brand Marketing' },
                          { x: 150, label: 'Digital Marketing' },
                          { x: 250, label: 'Content Marketing' },
                          { x: 350, label: 'Trade Marketing' },
                          { x: 430, label: 'Performance' }
                        ].map((node, i) => (
                          <g key={i}>
                            <line x1="250" y1="72" x2={node.x} y2="130" stroke="#cbd5e1" strokeWidth="1.5" />
                            <circle
                              cx={node.x} cy="150" r="22"
                              fill={selectedJobMap === node.label ? 'var(--primary-light)' : '#f0fdf4'}
                              stroke={selectedJobMap === node.label ? 'var(--primary)' : '#86efac'}
                              strokeWidth={selectedJobMap === node.label ? 3 : 1.5}
                              style={{ cursor: 'pointer' }}
                              onClick={() => setSelectedJobMap(node.label)}
                            />
                            <text x={node.x} y={185} textAnchor="middle" fill="var(--text-main)" fontSize="10" fontWeight="600">{node.label.split(' ')[0]}</text>
                          </g>
                        ))}
                      </svg>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                        {['Brand Marketing', 'Digital Marketing', 'Content Marketing', 'Trade Marketing', 'Performance Marketing', 'Research Marketing', 'CRM'].map((job) => (
                          <button
                            key={job}
                            onClick={() => setSelectedJobMap(job)}
                            style={{
                              padding: '6px 14px',
                              borderRadius: 'var(--radius-full)',
                              border: selectedJobMap === job ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                              backgroundColor: selectedJobMap === job ? 'var(--primary-light)' : '#fff',
                              color: selectedJobMap === job ? 'var(--primary)' : 'var(--text-muted)',
                              fontWeight: 600,
                              fontSize: '12px'
                            }}
                          >
                            {job}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                        <h4 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--primary)' }}>{selectedJobMap}</h4>
                        <span style={{ fontSize: '12px', padding: '4px 12px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 700 }}>Nhánh trong Marketing</span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '16px' }}>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '13px', marginBottom: '8px', color: 'var(--text-muted)' }}>CÔNG VIỆC CHÍNH</div>
                          <ul style={{ fontSize: '13px', color: 'var(--text-main)', paddingLeft: '16px', lineHeight: 1.8 }}>
                            <li>Xây dựng định vị và câu chuyện thương hiệu</li>
                            <li>Lên kế hoạch chiến dịch truyền thông (IMC)</li>
                            <li>Làm việc với agency và đối tác sáng tạo</li>
                          </ul>
                          <div style={{ fontWeight: 700, fontSize: '13px', margin: '16px 0 8px', color: 'var(--text-muted)' }}>CÔNG CỤ THƯỜNG DÙNG</div>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {['Canva', 'Figma', 'Meta Business Suite', 'PowerPoint'].map(t => (
                              <span key={t} style={{ fontSize: '12px', padding: '4px 12px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 600 }}>{t}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '13px', marginBottom: '8px', color: 'var(--text-muted)' }}>KỸ NĂNG CẦN</div>
                          <ul style={{ fontSize: '13px', color: 'var(--text-main)', paddingLeft: '16px', lineHeight: 1.8 }}>
                            <li>Tư duy chiến lược</li>
                            <li>Sáng tạo nội dung</li>
                            <li>Nghiên cứu hành vi người dùng (Insight)</li>
                          </ul>
                          <div style={{ fontWeight: 700, fontSize: '13px', margin: '16px 0 8px', color: 'var(--text-muted)' }}>DOANH NGHIỆP TUYỂN DỤNG PHỔ BIẾN</div>
                          <p style={{ fontSize: '13px', color: 'var(--text-main)' }}>Unilever, P&G, Vinamilk, Masan</p>
                        </div>
                      </div>
                      <div style={{ backgroundColor: 'var(--primary-light)', padding: '16px 24px', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                        <div>
                          <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary)' }}>10 - 18 triệu</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Mức lương tham khảo</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)' }}>Brand Executive → Brand Manager → Marketing Director</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Lộ trình phát triển</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LUYỆN TẬP PHỎNG VẤN TAB (Capture10 -> Capture15) */}
              {studentTab === 'interview' && (
                <div className="animate-fade-in">
                  
                  {/* Step 1: Landing (Capture10.PNG) */}
                  {interviewStep === 'landing' && (
                    <div style={{
                      backgroundColor: 'var(--cream)',
                      padding: '48px 40px',
                      borderRadius: 'var(--radius-xl)',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: 'var(--shadow-sm)'
                    }}>
                      <div style={{ position: 'relative', maxWidth: '600px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary)', backgroundColor: '#fff', padding: '6px 14px', borderRadius: 'var(--radius-full)', border: '1px solid var(--primary-border)', display: 'inline-block', marginBottom: '20px' }}>• AI phản hồi tức thì</span>
                        <h2 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '16px', color: 'var(--text-main)', lineHeight: 1.25 }}>
                          Luyện phỏng vấn <span style={{ color: 'var(--primary-accent)' }}>sát với thực tế,</span><br />theo đúng ngành bạn chọn
                        </h2>
                        <p style={{ color: '#555e5b', fontSize: '15px', marginBottom: '28px', lineHeight: 1.7 }}>
                          Chọn lĩnh vực, vị trí và doanh nghiệp mong muốn — hệ thống dựng đề bài phỏng vấn tương ứng, chấm điểm và góp ý ngay sau mỗi câu trả lời để bạn sẵn sàng hơn trước vòng tuyển dụng thật.
                        </p>
                        <button onClick={() => setInterviewStep('select')} style={{ padding: '14px 28px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700, fontSize: '15px', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(20,83,45,0.25)' }}>
                          Bắt đầu luyện tập <ArrowRight size={18} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Select Domain & Enterprise (Capture11.PNG) */}
                  {interviewStep === 'select' && (
                    <div style={{ backgroundColor: 'var(--cream)', padding: '40px', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-sm)' }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px' }}>BƯỚC 2 / 3</div>
                      <h3 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '8px', color: 'var(--primary)' }}>Chọn lĩnh vực, vị trí và doanh nghiệp</h3>
                      <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '28px' }}>Để bài phỏng vấn sẽ được dựng riêng theo lựa chọn của bạn.</p>
                      
                      <div style={{ marginBottom: '28px' }}>
                        <label style={{ fontSize: '12px', fontWeight: 700, display: 'block', marginBottom: '12px', color: 'var(--primary-accent)', letterSpacing: '0.5px' }}>LĨNH VỰC</label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
                          {[
                            { label: 'Tài chính - Ngân hàng', icon: Building2 },
                            { label: 'Nhân sự', icon: Users },
                            { label: 'Marketing', icon: Megaphone },
                            { label: 'CNTT', icon: Laptop },
                            { label: 'Kế toán - Kiểm toán', icon: Calculator }
                          ].map((d, i) => {
                            const DomainIcon = d.icon;
                            const isActive = selectedDomain === d.label;
                            return (
                              <button key={i} onClick={() => setSelectedDomain(d.label)} style={{ padding: '16px 12px', borderRadius: 'var(--radius-md)', border: isActive ? '2px solid var(--primary)' : '1px solid var(--border-color)', backgroundColor: isActive ? 'var(--primary-light)' : '#fff', fontWeight: 600, fontSize: '12px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                <DomainIcon size={22} color={isActive ? 'var(--primary)' : 'var(--text-muted)'} />
                                {d.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div style={{ marginBottom: '28px' }}>
                        <label style={{ fontSize: '12px', fontWeight: 700, display: 'block', marginBottom: '12px', color: 'var(--primary-accent)', letterSpacing: '0.5px' }}>VỊ TRÍ ỨNG TUYỂN</label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                          {[
                            { title: 'Talent Acquisition', sub: 'Chuyên viên Tuyển dụng' },
                            { title: 'HR Generalist', sub: 'Chuyên viên Nhân sự tổng hợp' },
                            { title: 'C&B Executive', sub: 'Lương thưởng & Phúc lợi' }
                          ].map((p, i) => {
                            const isActive = selectedPosition === p.title;
                            return (
                              <button key={i} onClick={() => setSelectedPosition(p.title)} style={{ padding: '16px', borderRadius: 'var(--radius-md)', border: isActive ? '2px solid var(--primary)' : '1px solid var(--border-color)', backgroundColor: isActive ? 'var(--primary-light)' : '#fff', textAlign: 'left' }}>
                                <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>{p.title}</div>
                                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{p.sub}</div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div style={{ marginBottom: '32px' }}>
                        <label style={{ fontSize: '12px', fontWeight: 700, display: 'block', marginBottom: '12px', color: 'var(--primary-accent)', letterSpacing: '0.5px' }}>DOANH NGHIỆP (ĐÃ TÍCH HỢP TRÊN HỆ THỐNG)</label>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                          {['Vingroup', 'Manulife', 'FPT', 'Techcombank', 'MB Bank'].map((e, i) => (
                            <button key={i} onClick={() => setSelectedEnterprise(e)} style={{ padding: '10px 20px', borderRadius: 'var(--radius-full)', border: selectedEnterprise === e ? 'none' : '1px solid var(--border-color)', backgroundColor: selectedEnterprise === e ? 'var(--primary)' : '#fff', color: selectedEnterprise === e ? '#fff' : 'var(--text-main)', fontWeight: 700, fontSize: '14px' }}>
                              {e}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary-accent)' }}>{selectedDomain} · {selectedPosition} · {selectedEnterprise}</span>
                        <button onClick={() => setInterviewStep('mode')} style={{ padding: '12px 28px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          Tiếp tục <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Choose Mode (Capture12.PNG) */}
                  {interviewStep === 'mode' && (
                    <div style={{ backgroundColor: 'var(--cream)', padding: '40px', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-sm)' }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px' }}>BƯỚC 3 / 3</div>
                      <h3 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '8px', color: 'var(--primary)' }}>{selectedPosition} tại {selectedEnterprise}</h3>
                      <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '28px' }}>Lĩnh vực {selectedDomain} · Chọn hình thức luyện tập phù hợp với bạn.</p>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                        <div style={{ padding: '28px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', backgroundColor: '#fff', boxShadow: 'var(--shadow-sm)' }}>
                          <ClipboardList size={24} color="var(--primary)" style={{ marginBottom: '12px' }} />
                          <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '10px' }}>Bộ câu hỏi chung</h4>
                          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.6 }}>Bộ câu hỏi phỏng vấn phổ biến theo vị trí đã chọn, xây dựng từ đề tuyển dụng công khai và cố vấn bởi mentor/HR trong ngành.</p>
                          <ul style={{ fontSize: '13px', color: 'var(--text-main)', marginBottom: '20px', paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {['Phần 1: Giới thiệu bản thân', 'Phần 2: Kiến thức chuyên môn', 'Phần 3: Tình huống thực tế'].map(item => (
                              <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--primary-accent)' }} />{item}</li>
                            ))}
                          </ul>
                          <button onClick={() => setInterviewStep('question')} style={{ padding: '12px 24px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700, width: '100%' }}>
                            Chọn bộ câu hỏi chung
                          </button>
                        </div>
                        <div style={{ padding: '28px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', backgroundColor: '#fff', boxShadow: 'var(--shadow-sm)' }}>
                          <Building2 size={24} color="var(--primary)" style={{ marginBottom: '12px' }} />
                          <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '10px' }}>Luyện tập theo doanh nghiệp</h4>
                          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.6 }}>Mô phỏng quy trình tuyển dụng tham khảo dạng Manulife, gồm 4 vòng nối tiếp nhau.</p>
                          <ul style={{ fontSize: '13px', color: 'var(--text-main)', marginBottom: '20px', paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {['Vòng 1: Logic & Aptitude test', 'Vòng 2: Phỏng vấn với HR', 'Vòng 3: Phỏng vấn với Quản lý trực tiếp', 'Vòng 4: Phỏng vấn với cấp lãnh đạo (C-level)'].map(item => (
                              <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--primary-accent)' }} />{item}</li>
                            ))}
                          </ul>
                          <button onClick={() => setInterviewStep('question')} style={{ padding: '12px 24px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700, width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                            Xem quy trình <ArrowRight size={16} />
                          </button>
                        </div>
                      </div>

                      <button onClick={() => setInterviewStep('select')} style={{ padding: '10px 20px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)', backgroundColor: '#fff', fontWeight: 600, color: 'var(--text-muted)' }}>
                        ← Quay lại chọn vị trí
                      </button>
                    </div>
                  )}

                  {/* Step 4: Answer Question (Capture13.PNG) */}
                  {interviewStep === 'question' && (
                    <div style={{ backgroundColor: 'var(--cream)', padding: '40px', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-sm)' }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary-accent)', marginBottom: '8px', letterSpacing: '0.5px' }}>CÂU HỎI 1</div>
                      <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '24px', color: 'var(--primary)' }}>Quy trình tính lương hàng tháng của bạn gồm những bước nào?</h3>

                      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                        <button onClick={() => setAnswerMode('text')} style={{ padding: '10px 20px', borderRadius: 'var(--radius-full)', backgroundColor: answerMode === 'text' ? 'var(--primary)' : '#fff', color: answerMode === 'text' ? '#fff' : 'var(--text-main)', fontWeight: 700, border: answerMode === 'text' ? 'none' : '1px solid var(--border-color)' }}>
                          ✍️ Trả lời văn bản
                        </button>
                        <button onClick={() => setAnswerMode('voice')} style={{ padding: '10px 20px', borderRadius: 'var(--radius-full)', backgroundColor: answerMode === 'voice' ? 'var(--primary)' : '#fff', color: answerMode === 'voice' ? '#fff' : 'var(--text-main)', fontWeight: 700, border: answerMode === 'voice' ? 'none' : '1px solid var(--border-color)' }}>
                          🎙️ Trả lời giọng nói
                        </button>
                        <button onClick={() => setShowQuestionHint(true)} style={{ marginLeft: 'auto', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: '#fff', fontWeight: 700 }}>Gợi ý</button>
                      </div>

                      <textarea
                        rows={6}
                        value={answerText}
                        onChange={e => setAnswerText(e.target.value)}
                        placeholder="Nhập câu trả lời của bạn..."
                        style={{ width: '100%', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '24px', backgroundColor: '#fff', fontSize: '14px', resize: 'vertical' }}
                      />

                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button onClick={() => setInterviewStep('mode')} style={{ padding: '10px 20px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)', backgroundColor: '#fff', fontWeight: 600, color: 'var(--primary)' }}>← Câu trước</button>
                        <button onClick={() => setInterviewStep('feedback')} style={{ padding: '12px 28px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700, boxShadow: '0 4px 12px rgba(20,83,45,0.2)' }}>
                          Gửi câu trả lời
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 5: AI Instant Feedback (Capture14.PNG) */}
                  {interviewStep === 'feedback' && (
                    <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
                        <div style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: '22px', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>6.9</span>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>/ 10</span>
                        </div>
                        <div>
                          <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary)' }}>AI đánh giá câu trả lời</h3>
                          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Dựa trên nội dung, cấu trúc và mức độ thuyết phục</p>
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '28px' }}>
                        {[
                          { title: 'NHẬN XÉT NỘI DUNG', text: 'Câu trả lời bám sát yêu cầu của câu hỏi và có chiều sâu. Tuy nhiên câu trả lời khá ngắn gọn so với kỳ vọng.' },
                          { title: 'KỸ NĂNG DIỄN ĐẠT', text: 'Giọng điệu rõ ràng, nên nhấn nhá ở phần kết luận để tăng thuyết phục.' },
                          { title: 'GỢI Ý CẢI THIỆN', text: 'Nên bổ sung ví dụ thực tế để tăng tính thuyết phục.' }
                        ].map((section, i) => (
                          <div key={i}>
                            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.5px', marginBottom: '6px' }}>{section.title}</div>
                            <p style={{ fontSize: '14px', color: 'var(--text-main)', lineHeight: 1.6 }}>{section.text}</p>
                          </div>
                        ))}
                        <div>
                          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.5px', marginBottom: '6px' }}>CÂU TRẢ LỜI THAM KHẢO</div>
                          <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary-light)', fontSize: '14px', color: 'var(--text-main)', lineHeight: 1.6, fontStyle: 'italic' }}>
                            Một câu trả lời mạnh cho câu hỏi này thường nêu rõ bối cảnh cụ thể, hành động bạn đã thực hiện và kết quả đo lường được — giúp nhà tuyển dụng hình dung năng lực thực tế của bạn thay vì chỉ nói lý thuyết chung chung.
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button onClick={() => setInterviewStep('summary')} style={{ padding: '12px 28px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700, boxShadow: '0 4px 12px rgba(20,83,45,0.2)' }}>
                          Câu tiếp theo →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 6: Summary Result (Capture15.PNG) */}
                  {interviewStep === 'summary' && (
                    <div style={{ backgroundColor: 'var(--cream)', padding: '48px 40px', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
                      <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 12px' }}>
                        <svg viewBox="0 0 120 120" style={{ width: '120px', height: '120px', transform: 'rotate(-90deg)' }}>
                          <circle cx="60" cy="60" r="52" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                          <circle cx="60" cy="60" r="52" fill="none" stroke="var(--primary)" strokeWidth="10" strokeDasharray={`${2 * Math.PI * 52 * 0.72} ${2 * Math.PI * 52}`} strokeLinecap="round" />
                        </svg>
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: '32px', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>7.2</span>
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>/ 10 điểm</span>
                        </div>
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary-accent)', backgroundColor: 'var(--primary-light)', padding: '4px 12px', borderRadius: 'var(--radius-full)' }}>• Kết quả buổi luyện tập</span>
                      <h3 style={{ fontSize: '26px', fontWeight: 800, margin: '12px 0 8px', color: 'var(--primary)' }}>Điểm trung bình toàn buổi</h3>
                      <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '28px' }}>Vị trí: C&B Executive · Doanh nghiệp: Manulife · Theo doanh nghiệp</p>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px', textAlign: 'left' }}>
                        {[
                          { round: 'VÒNG 2: PHỎNG VẤN VỚI HR', score: 6.7 },
                          { round: 'VÒNG 3: PHỎNG VẤN VỚI QUẢN LÝ TRỰC TIẾP', score: 7.7 },
                          { round: 'VÒNG 4: PHỎNG VẤN VỚI CẤP LÃNH ĐẠO (C-LEVEL)', score: 7.4 }
                        ].map((r, i) => (
                          <div key={i} style={{ padding: '20px', borderRadius: 'var(--radius-md)', backgroundColor: '#fff', border: '1px solid var(--border-color)' }}>
                            <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.3px' }}>{r.round}</div>
                            <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--primary)', marginBottom: '8px' }}>{r.score}</div>
                            <div style={{ height: '4px', backgroundColor: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
                              <div style={{ width: `${r.score * 10}%`, height: '100%', backgroundColor: 'var(--primary)' }} />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px', textAlign: 'left' }}>
                        <div style={{ padding: '20px', borderRadius: 'var(--radius-md)', backgroundColor: '#fff', border: '1px solid var(--border-color)' }}>
                          <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)', marginBottom: '12px' }}>💪 Điểm mạnh</h4>
                          <ul style={{ fontSize: '13px', color: 'var(--text-main)', paddingLeft: '16px', lineHeight: 1.8 }}>
                            <li>Trả lời đúng trọng tâm ở phần kiến thức chuyên môn.</li>
                            <li>Diễn đạt mạch lạc, có cấu trúc rõ ràng.</li>
                            <li>Thể hiện tư duy logic khi xử lý câu hỏi tình huống.</li>
                          </ul>
                        </div>
                        <div style={{ padding: '20px', borderRadius: 'var(--radius-md)', backgroundColor: '#fff', border: '1px solid var(--border-color)' }}>
                          <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)', marginBottom: '12px' }}>🌱 Cần cải thiện</h4>
                          <ul style={{ fontSize: '13px', color: 'var(--text-main)', paddingLeft: '16px', lineHeight: 1.8 }}>
                            <li>Bổ sung thêm ví dụ và số liệu thực tế trong câu trả lời.</li>
                            <li>Rút gọn phần mở đầu để đi thẳng vào trọng tâm.</li>
                            <li>Luyện thêm phần trả lời bằng giọng nói để tăng sự tự tin.</li>
                          </ul>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                        <button onClick={() => setInterviewStep('landing')} style={{ padding: '12px 28px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)', backgroundColor: '#fff', fontWeight: 700, color: 'var(--primary)' }}>
                          Luyện tập lại
                        </button>
                        <button onClick={() => setInterviewStep('select')} style={{ padding: '12px 28px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          Chọn doanh nghiệp khác <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* MÔ PHỎNG VIỆC LÀM TAB */}
              {studentTab === 'simulation' && (
                <div className="animate-fade-in">
                  <h2 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '8px', color: 'var(--primary)' }}>Mô phỏng việc làm</h2>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px' }}>Thực hành tình huống công việc thực tế từ doanh nghiệp đối tác.</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                    {[
                      { title: 'Social Media Campaign - Summer 2026', company: 'NovaTech', field: 'Marketing', position: 'Intern', deadline: '31/08/2026', status: 'Mới' },
                      { title: 'Phân tích báo cáo tài chính Q2', company: 'Techcombank', field: 'Tài chính', position: 'Fresher', deadline: '15/09/2026', status: 'Đang mở' },
                      { title: 'Xây dựng chiến lược tuyển dụng Gen Z', company: 'Manulife', field: 'Nhân sự', position: 'Junior', deadline: '20/09/2026', status: 'Đang mở' }
                    ].map((sim, i) => (
                      <div key={i} style={{ backgroundColor: '#fff', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>{sim.status}</span>
                        <h3 style={{ fontSize: '17px', fontWeight: 800, margin: '12px 0 8px', color: 'var(--text-main)' }}>{sim.title}</h3>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px' }}>{sim.company} · {sim.field}</p>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>Vị trí: {sim.position} · Hạn: {sim.deadline}</p>
                        <button style={{ padding: '10px 20px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700, fontSize: '14px', width: '100%' }}>
                          Bắt đầu mô phỏng <ArrowRight size={16} style={{ display: 'inline', verticalAlign: 'middle' }} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* XÂY DỰNG CV TAB */}
              {studentTab === 'cv' && (
                <div className="animate-fade-in">
                  <h2 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '8px', color: 'var(--primary)' }}>Xây dựng CV</h2>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px' }}>Tạo CV chuẩn ATS và phân tích khớp với JD doanh nghiệp.</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ backgroundColor: '#fff', padding: '28px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                      <FileText size={28} color="var(--primary)" style={{ marginBottom: '12px' }} />
                      <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>Tạo CV mới</h3>
                      <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>Chọn mẫu CV chuẩn ngành, điền thông tin và xuất PDF.</p>
                      <button style={{ padding: '10px 20px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700 }}>Tạo CV ngay</button>
                    </div>
                    <div style={{ backgroundColor: '#fff', padding: '28px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                      <Sparkles size={28} color="var(--primary)" style={{ marginBottom: '12px' }} />
                      <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>Phân tích CV – JD</h3>
                      <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>Upload CV và JD để AI đánh giá mức độ phù hợp.</p>
                      <button style={{ padding: '10px 20px', borderRadius: 'var(--radius-full)', border: '1px solid var(--primary)', color: 'var(--primary)', fontWeight: 700, backgroundColor: '#fff' }}>Phân tích ngay</button>
                    </div>
                  </div>
                </div>
              )}

              {/* LỘ TRÌNH AI TAB */}
              {studentTab === 'ai-roadmap' && (
                <div className="animate-fade-in">
                  <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '16px' }}>Lộ trình AI cá nhân hoá</h2>
                  <div style={{ backgroundColor: '#fff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', height: '600px' }}>
                    <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {chatMessages.map((msg, idx) => (
                        <div key={idx} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                          <div style={{ padding: '14px 18px', borderRadius: '16px', backgroundColor: msg.sender === 'user' ? 'var(--primary)' : 'var(--bg-main)', color: msg.sender === 'user' ? '#fff' : 'var(--text-main)', fontSize: '14px', lineHeight: 1.6 }}>
                            {msg.text}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '12px' }}>
                      <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="Tôi học ngành..." style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                      <button onClick={handleSendChat} style={{ padding: '12px 20px', borderRadius: '8px', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700 }}>Gửi</button>
                    </div>
                  </div>
                </div>
              )}

              {/* CHỨNG CHỈ TAB */}
              {studentTab === 'cert' && (
                <div className="animate-fade-in">
                  <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '20px' }}>Chứng chỉ của tôi</h2>
                  <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Career Exploration - NAVIX</h3>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Cấp ngày: 20/05/2025</p>
                  </div>
                </div>
              )}

              {/* GIỚI THIỆU BẠN BÈ TAB (Capture17.PNG & Capture18.PNG) */}
              {studentTab === 'referral' && (
                <div className="animate-fade-in" style={{ maxWidth: '860px', margin: '0 auto' }}>
                  <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary-accent)', backgroundColor: 'var(--primary-light)', padding: '6px 14px', borderRadius: 'var(--radius-full)' }}>• Chương trình giới thiệu bạn bè</span>
                    <h2 style={{ fontSize: '32px', fontWeight: 800, margin: '16px 0 12px', color: 'var(--primary)' }}>
                      Mời bạn bè cùng khám phá nghề nghiệp,<br /><span style={{ color: 'var(--primary-accent)' }}>nhận ưu đãi cho cả hai</span>
                    </h2>
                    <p style={{ fontSize: '15px', color: 'var(--text-muted)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
                      Chia sẻ link hoặc mã QR của bạn — khi bạn bè đăng ký thành công, mỗi lượt giới thiệu đều được ghi nhận. Đủ 10 lượt, bạn nhận ngay ưu đãi giảm 10% gói Pro.
                    </p>
                  </div>

                  {/* Green Box Capture17.PNG */}
                  <div style={{ backgroundColor: '#0d2a1f', color: '#fff', padding: '32px', borderRadius: 'var(--radius-xl)', display: 'grid', gridTemplateColumns: '1fr auto', gap: '24px', alignItems: 'center', marginBottom: '24px' }}>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 700, opacity: 0.7, marginBottom: '10px', letterSpacing: '0.5px' }}>LINK GIỚI THIỆU CỦA BẠN</div>
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                        <div style={{ flex: 1, padding: '12px 16px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(255,255,255,0.1)', fontWeight: 700, fontFamily: 'monospace', fontSize: '14px' }}>navix.vn/r/MTNHANH2826</div>
                        <button onClick={() => alert('Đã sao chép link!')} style={{ padding: '12px 20px', borderRadius: 'var(--radius-full)', backgroundColor: '#bef264', color: '#0d2a1f', fontWeight: 700, whiteSpace: 'nowrap' }}>Sao chép</button>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {['Facebook', 'Zalo', 'Email', 'Sao chép link'].map(s => (
                          <button key={s} style={{ padding: '8px 14px', borderRadius: 'var(--radius-full)', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: '13px', fontWeight: 600 }}>{s}</button>
                        ))}
                      </div>
                    </div>
                    <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: 'var(--radius-lg)', textAlign: 'center', width: '120px' }}>
                      <div style={{ width: '88px', height: '88px', background: 'repeating-conic-gradient(var(--primary) 0% 25%, #fff 0% 50%) 0 0 / 12px 12px', borderRadius: '8px', margin: '0 auto 8px' }} />
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Quét để tham gia</div>
                    </div>
                  </div>

                  {/* Tiến trình giới thiệu Capture18.PNG */}
                  <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)', display: 'grid', gridTemplateColumns: '200px 1fr', gap: '32px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ position: 'relative', width: '140px', height: '140px', margin: '0 auto 12px' }}>
                        <svg viewBox="0 0 140 140" style={{ width: '140px', height: '140px', transform: 'rotate(-90deg)' }}>
                          <circle cx="70" cy="70" r="58" fill="none" stroke="#e2e8f0" strokeWidth="12" />
                          <circle cx="70" cy="70" r="58" fill="none" stroke="var(--primary)" strokeWidth="12" strokeDasharray={`${2 * Math.PI * 58 * (referralCount / 10)} ${2 * Math.PI * 58}`} strokeLinecap="round" />
                        </svg>
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: '36px', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>{referralCount}</span>
                          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>/ 10 lượt</span>
                        </div>
                      </div>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Số bạn bè đã đăng ký thành công</p>
                    </div>

                    <div>
                      <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '8px', color: 'var(--primary)' }}>Còn {10 - referralCount} lượt nữa để nhận ưu đãi</h3>
                      <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.6 }}>Khi đủ 10 lượt giới thiệu có bạn bè đăng ký Free thành công, bạn sẽ nhận mã giảm 10% cho gói Pro — tự động áp dụng khi thanh toán.</p>

                      <div style={{ position: 'relative', marginBottom: '24px', padding: '0 8px' }}>
                        <div style={{ position: 'absolute', top: '10px', left: '8px', right: '8px', height: '2px', backgroundColor: '#e2e8f0' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                          {Array.from({ length: 10 }, (_, i) => (
                            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                              <div style={{
                                width: '20px', height: '20px', borderRadius: '50%',
                                backgroundColor: i < referralCount ? 'var(--primary)' : i === referralCount ? '#fff' : '#e2e8f0',
                                border: i === referralCount ? '2px solid var(--primary-accent)' : i >= referralCount ? 'none' : 'none',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '10px', fontWeight: 700, color: i < referralCount ? '#fff' : 'var(--text-muted)'
                              }}>
                                {i === 9 ? '10' : ''}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '11px', color: 'var(--text-muted)' }}>
                          <span>0</span><span>5</span><span>10 — Nhận thưởng</span>
                        </div>
                      </div>

                      <div style={{ padding: '16px 20px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                        <Gift size={28} color="var(--primary)" />
                        <div>
                          <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)' }}>Giảm 10% gói Pro</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Tự động áp dụng khi bạn đạt mốc 10 lượt giới thiệu thành công</div>
                        </div>
                      </div>

                      <button onClick={() => setReferralCount(prev => Math.min(10, prev + 1))} style={{ padding: '10px 20px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)', fontWeight: 700, backgroundColor: '#fff' }}>
                        + Mô phỏng 1 lượt giới thiệu mới
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 5. DASHBOARD DOANH NGHIỆP (ENTERPRISE DASHBOARD - Capture2.PNG)            */}
        {/* ========================================================================= */}
        {currentPage === 'enterprise-dashboard' && (
          <div style={{ display: 'flex', flex: 1 }}>
            
            <aside style={{
              width: sidebarCollapsed ? '80px' : '260px',
              backgroundColor: '#fff',
              borderRight: '1px solid var(--border-color)',
              padding: '20px 12px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '14px', fontWeight: 600 }}>
                  <Menu size={20} />
                  {!sidebarCollapsed && <span>Thu gọn</span>}
                </button>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {[
                    { id: 'overview', label: 'Tổng quan', icon: LayoutDashboard },
                    { id: 'manage-sim', label: 'Quản lý đề mô phỏng', icon: Briefcase },
                    { id: 'manage-interview', label: 'Quản lý đề phỏng vấn', icon: MessageSquare },
                    { id: 'candidates', label: 'Ứng viên tiềm năng', icon: Users }
                  ].map((item) => {
                    const IconComp = item.icon;
                    const isActive = enterpriseTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setEnterpriseTab(item.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '12px 16px',
                          borderRadius: 'var(--radius-md)',
                          fontSize: '14px',
                          fontWeight: isActive ? 700 : 500,
                          backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                          color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                          borderLeft: isActive ? '4px solid var(--primary)' : '4px solid transparent'
                        }}
                      >
                        <IconComp size={18} />
                        {!sidebarCollapsed && <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <button onClick={() => { setCurrentUser(null); setCurrentPage('home'); }} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: 'var(--radius-md)', color: '#ef4444', fontSize: '14px', fontWeight: 600 }}>
                <LogOut size={18} />
                {!sidebarCollapsed && <span>Đăng xuất</span>}
              </button>
            </aside>

            {/* Enterprise Main Content (Capture2.PNG) */}
            <div style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
              
              {/* OVERVIEW DOANH NGHIỆP */}
              {enterpriseTab === 'overview' && (
                <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>
                      Xin chào, NovaTech 👋
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
                      Quản lý đề tuyển dụng và tìm kiếm ứng viên tiềm năng cùng NAVIX.
                    </p>
                  </div>

                  {/* 4 Cards Capture2.PNG */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                    {[
                      { label: 'Tổng số đề mô phỏng', value: '12', icon: ClipboardList },
                      { label: 'Tổng số đề phỏng vấn', value: '5', icon: Mic },
                      { label: 'Tổng số ứng viên', value: '86', icon: Users },
                      { label: 'Ứng viên tiềm năng', value: '14', icon: Star }
                    ].map((stat, i) => {
                      const StatIcon = stat.icon;
                      return (
                        <div key={i} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <StatIcon size={20} />
                          </div>
                          <div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '2px' }}>{stat.label}</div>
                            <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--primary)' }}>{stat.value}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px' }}>
                    {/* Hoạt động gần đây */}
                    <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '16px' }}>HOẠT ĐỘNG GẦN ĐÂY</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[
                          { name: 'Nguyễn Minh Anh', action: 'vừa nộp bài mô phỏng', detail: 'Marketing Intern – Social Media Campaign', time: '10 phút trước' },
                          { name: 'Trần Minh Đức', action: 'hoàn thành phỏng vấn AI', detail: 'HR Generalist – Manulife', time: '35 phút trước' },
                          { name: 'Lê Hoàng Nam', action: 'vừa nộp bài mô phỏng', detail: 'Business Development Intern', time: '2 giờ trước' }
                        ].map((act, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: i < 2 ? '1px solid var(--border-color)' : 'none' }}>
                            <div style={{ display: 'flex', gap: '12px' }}>
                              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <Briefcase size={16} />
                              </div>
                              <div>
                                <div style={{ fontSize: '14px', fontWeight: 600 }}><strong>{act.name}</strong> {act.action}</div>
                                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{act.detail}</div>
                              </div>
                            </div>
                            <span style={{ fontSize: '12px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{act.time}</span>
                          </div>
                        ))}
                      </div>
                      <button style={{ marginTop: '8px', fontSize: '13px', fontWeight: 700, color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        Xem tất cả hoạt động <ChevronRight size={16} />
                      </button>
                    </div>

                  {/* Candidates Shortlist Capture2.PNG */}
                  <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 700 }}>ỨNG VIÊN TIỀM NĂNG</h3>
                      <button onClick={() => setEnterpriseTab('candidates')} style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 700 }}>Xem tất cả →</button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {candidates.map(c => (
                        <div key={c.id} style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <div style={{ display: 'flex', gap: '12px' }}>
                              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #86efac, #16a34a)', flexShrink: 0 }} />
                              <div>
                                <div style={{ fontSize: '15px', fontWeight: 700 }}>{c.name}</div>
                                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{c.position}</div>
                                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{c.school}</div>
                              </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary)' }}>{c.score}/10</div>
                              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Điểm đánh giá</div>
                            </div>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>Nguồn: {c.source}</span>
                            <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <Star size={12} fill="var(--primary)" /> Tiềm năng
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  </div>
                </div>
              )}

              {/* QUẢN LÝ ĐỀ MÔ PHỎNG & FORM TẠO ĐỀ (Capture3.PNG) */}
              {enterpriseTab === 'manage-sim' && (
                <div className="animate-fade-in">
                  {!isCreatingSim ? (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <div>
                          <h2 style={{ fontSize: '22px', fontWeight: 800 }}>Quản lý đề mô phỏng</h2>
                          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Theo dõi và quản lý các bài mô phỏng tuyển dụng của doanh nghiệp.</p>
                        </div>
                        <button
                          onClick={() => setIsCreatingSim(true)}
                          style={{ padding: '10px 20px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}
                        >
                          <Plus size={16} /> Tạo đề mô phỏng
                        </button>
                      </div>

                      <div style={{ backgroundColor: '#fff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                          <thead style={{ backgroundColor: 'var(--bg-main)' }}>
                            <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                              <th style={{ padding: '14px' }}>Tên đề</th>
                              <th style={{ padding: '14px' }}>Lĩnh vực</th>
                              <th style={{ padding: '14px' }}>Vị trí</th>
                              <th style={{ padding: '14px' }}>Trạng thái</th>
                              <th style={{ padding: '14px' }}>Ngày tạo</th>
                              <th style={{ padding: '14px' }}>Thao tác</th>
                            </tr>
                          </thead>
                          <tbody>
                            {simulations.map(sim => (
                              <tr key={sim.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '14px', fontWeight: 700, color: 'var(--primary)' }}>{sim.title}</td>
                                <td style={{ padding: '14px' }}>{sim.category}</td>
                                <td style={{ padding: '14px' }}>{sim.position}</td>
                                <td style={{ padding: '14px' }}>
                                  <span style={{ fontSize: '12px', padding: '2px 8px', borderRadius: '10px', backgroundColor: sim.status === 'Published' ? '#dcfce7' : '#f1f5f9', color: sim.status === 'Published' ? '#15803d' : '#64748b', fontWeight: 700 }}>
                                    ● {sim.status}
                                  </span>
                                </td>
                                <td style={{ padding: '14px', color: 'var(--text-muted)' }}>{sim.date}</td>
                                <td style={{ padding: '14px' }}><button><MoreVertical size={18} /></button></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    /* FORM TẠO ĐỀ MÔ PHỎNG GIỐNG 100% Capture3.PNG */
                    <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                      <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '4px' }}>Tạo đề mô phỏng</h2>
                      <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' }}>Thiết lập nội dung và tiêu chí đánh giá cho bài mô phỏng tuyển dụng</p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                          <label style={{ fontSize: '13px', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Tên đề bài *</label>
                          <input type="text" value={simForm.title} onChange={e => setSimForm({ ...simForm, title: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                          <div>
                            <label style={{ fontSize: '13px', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Lĩnh vực *</label>
                            <select value={simForm.category} onChange={e => setSimForm({ ...simForm, category: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: '#fff' }}>
                              <option value="Marketing">Marketing</option>
                              <option value="CNTT">CNTT</option>
                              <option value="Tài chính - Ngân hàng">Tài chính - Ngân hàng</option>
                            </select>
                          </div>
                          <div>
                            <label style={{ fontSize: '13px', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Vị trí tuyển dụng *</label>
                            <select value={simForm.position} onChange={e => setSimForm({ ...simForm, position: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: '#fff' }}>
                              <option value="Intern">Intern</option>
                              <option value="Fresher">Fresher</option>
                              <option value="Junior">Junior</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label style={{ fontSize: '13px', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Mô tả nhiệm vụ *</label>
                          <textarea rows={4} value={simForm.mission} onChange={e => setSimForm({ ...simForm, mission: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }} />
                        </div>

                        <div>
                          <label style={{ fontSize: '13px', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Hình thức bài làm *</label>
                          <select value={simForm.format} onChange={e => setSimForm({ ...simForm, format: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: '#fff' }}>
                            <option value="Trả lời văn bản">Trả lời văn bản</option>
                            <option value="Upload File">Upload File</option>
                            <option value="Trắc nghiệm">Trắc nghiệm</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ fontSize: '13px', fontWeight: 700, display: 'block', marginBottom: '8px' }}>Tiêu chí đánh giá (AI sẽ sử dụng tiêu chí này để đánh giá)</label>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '13px' }}>
                            {['Khả năng giải quyết vấn đề', 'Tư duy logic', 'Tính sáng tạo', 'Kỹ năng trình bày', 'Độ chính xác'].map((crit, cIdx) => (
                              <label key={cIdx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <input type="checkbox" defaultChecked /> {crit}
                              </label>
                            ))}
                          </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
                          <button onClick={() => setIsCreatingSim(false)} style={{ padding: '10px 20px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>Hủy</button>
                          <button onClick={() => { setIsCreatingSim(false); alert('Đã lưu nháp!'); }} style={{ padding: '10px 20px', borderRadius: '6px', border: '1px solid var(--primary)', color: 'var(--primary)', fontWeight: 700 }}>Lưu nháp</button>
                          <button onClick={() => {
                            setSimulations([ ...simulations, { id: `sim-${Date.now()}`, title: simForm.title, category: simForm.category, position: simForm.position, status: 'Published', date: 'Hôm nay', candidatesCount: 0 } ]);
                            setIsCreatingSim(false);
                            alert('Đã đăng đề thành công!');
                          }} style={{ padding: '10px 24px', borderRadius: '6px', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700 }}>
                            Đăng đề
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* QUẢN LÝ ĐỀ PHỎNG VẤN (4a65381f-7598-4fbf-b125-dbcd99c2c3f7.png) */}
              {enterpriseTab === 'manage-interview' && (
                <div className="animate-fade-in">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div>
                      <h2 style={{ fontSize: '22px', fontWeight: 800 }}>Quản lý đề phỏng vấn</h2>
                      <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Thiết lập quy trình và câu hỏi phỏng vấn cho ứng viên.</p>
                    </div>
                    <button onClick={() => setInterviewCreateStep(2)} style={{ padding: '10px 20px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Plus size={16} /> Tạo đề phỏng vấn
                    </button>
                  </div>

                  {interviewCreateStep === 0 || interviewCreateStep === 1 ? (
                    <div style={{ backgroundColor: '#fff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                        <thead style={{ backgroundColor: 'var(--bg-main)' }}>
                          <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                            <th style={{ padding: '14px' }}>Tên bộ phỏng vấn</th>
                            <th style={{ padding: '14px' }}>Lĩnh vực</th>
                            <th style={{ padding: '14px' }}>Vị trí</th>
                            <th style={{ padding: '14px' }}>Số vòng</th>
                            <th style={{ padding: '14px' }}>Trạng thái</th>
                            <th style={{ padding: '14px' }}>Ngày tạo</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ padding: '14px', fontWeight: 700, color: 'var(--primary)' }}>Manulife - Talent Acquisition Interview</td>
                            <td style={{ padding: '14px' }}>Nhân sự</td>
                            <td style={{ padding: '14px' }}>Talent Acquisition</td>
                            <td style={{ padding: '14px' }}>4 vòng</td>
                            <td style={{ padding: '14px' }}><span style={{ fontSize: '12px', padding: '2px 8px', borderRadius: '10px', backgroundColor: '#dcfce7', color: '#15803d', fontWeight: 700 }}>Published</span></td>
                            <td style={{ padding: '14px', color: 'var(--text-muted)' }}>05/08/2026</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    /* FORM TẠO ĐỀ PHỎNG VẤN 5 BƯỚC */
                    <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)', marginBottom: '8px' }}>BƯỚC {interviewCreateStep} / 5</div>
                      <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '20px' }}>
                        {interviewCreateStep === 2 && 'Tạo đề phỏng vấn - Thông tin chung'}
                        {interviewCreateStep === 3 && 'Thiết lập quy trình phỏng vấn (4 vòng)'}
                        {interviewCreateStep === 4 && 'Thêm câu hỏi chi tiết'}
                        {interviewCreateStep === 5 && 'Xem lại & Đăng đề phỏng vấn'}
                      </h3>

                      {interviewCreateStep === 2 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          <div>
                            <label style={{ fontSize: '13px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Tên bộ phỏng vấn *</label>
                            <input type="text" defaultValue="Manulife - Talent Acquisition Interview" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }} />
                          </div>
                          <button onClick={() => setInterviewCreateStep(3)} style={{ padding: '12px', borderRadius: '6px', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700 }}>Tiếp tục →</button>
                        </div>
                      )}

                      {interviewCreateStep === 3 && (
                        <div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                            {['1. Logic & Aptitude Test', '2. Phỏng vấn với HR', '3. Phỏng vấn với Quản lý trực tiếp', '4. Phỏng vấn với C-level'].map((round, rIdx) => (
                              <div key={rIdx} style={{ padding: '14px', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontWeight: 700 }}>{round}</span>
                                <button style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 700 }}>Chỉnh sửa</button>
                              </div>
                            ))}
                          </div>
                          <button onClick={() => setInterviewCreateStep(4)} style={{ padding: '12px 28px', borderRadius: '6px', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700 }}>Tiếp tục →</button>
                        </div>
                      )}

                      {interviewCreateStep === 4 && (
                        <div>
                          <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: 'var(--bg-main)', marginBottom: '16px' }}>
                            <div style={{ fontWeight: 700, marginBottom: '8px' }}>Phần 1. Giới thiệu bản thân</div>
                            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Câu hỏi 1: Giới thiệu bản thân và kinh nghiệm tuyển dụng.</div>
                          </div>
                          <button onClick={() => setInterviewCreateStep(5)} style={{ padding: '12px 28px', borderRadius: '6px', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700 }}>Xem lại bộ phỏng vấn →</button>
                        </div>
                      )}

                      {interviewCreateStep === 5 && (
                        <div>
                          <div style={{ padding: '20px', borderRadius: '8px', backgroundColor: 'var(--primary-light)', marginBottom: '20px' }}>
                            <h4 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>Bộ phỏng vấn: Manulife - Talent Acquisition Interview</h4>
                            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Tổng số vòng: 4 vòng • Lĩnh vực: Nhân sự</p>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                            <button onClick={() => setInterviewCreateStep(0)} style={{ padding: '10px 20px' }}>Hủy</button>
                            <button onClick={() => { setInterviewCreateStep(0); alert('Đã đăng bộ phỏng vấn thành công!'); }} style={{ padding: '12px 28px', borderRadius: '6px', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700 }}>Đăng đề</button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* QUẢN LÝ ỨNG VIÊN TAB */}
              {enterpriseTab === 'candidates' && (
                <div className="animate-fade-in">
                  <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '20px' }}>Quản lý ứng viên</h2>
                  <div style={{ backgroundColor: '#fff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                      <thead style={{ backgroundColor: 'var(--bg-main)' }}>
                        <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                          <th style={{ padding: '14px' }}>Họ và tên</th>
                          <th style={{ padding: '14px' }}>Trường học</th>
                          <th style={{ padding: '14px' }}>Vị trí</th>
                          <th style={{ padding: '14px' }}>Điểm AI</th>
                          <th style={{ padding: '14px' }}>Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {candidates.map(c => (
                          <tr key={c.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ padding: '14px', fontWeight: 700 }}>{c.name}</td>
                            <td style={{ padding: '14px' }}>{c.school}</td>
                            <td style={{ padding: '14px' }}>{c.position}</td>
                            <td style={{ padding: '14px', fontWeight: 700, color: 'var(--primary)' }}>{c.score}/10</td>
                            <td style={{ padding: '14px' }}>
                              <button onClick={() => setSelectedCandidate(c)} style={{ padding: '6px 12px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 700, fontSize: '12px' }}>
                                Xem chi tiết
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </main>

      {/* MODAL CHI TIẾT ỨNG VIÊN */}
      {selectedCandidate && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '24px' }}>
          <div className="animate-fade-in" style={{ backgroundColor: '#fff', borderRadius: 'var(--radius-lg)', maxWidth: '600px', width: '100%', padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800 }}>Hồ sơ & Đánh giá: {selectedCandidate.name}</h3>
              <button onClick={() => setSelectedCandidate(null)}><X size={20} /></button>
            </div>
            <div style={{ fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <div>Trường: <strong>{selectedCandidate.school}</strong></div>
              <div>Vị trí ứng tuyển: <strong>{selectedCandidate.position}</strong></div>
              <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 700 }}>
                Điểm AI Chấm: {selectedCandidate.score}/10
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => { alert('Đã đánh dấu Tiềm năng'); setSelectedCandidate(null); }} style={{ flex: 1, padding: '10px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700 }}>Đánh dấu Tiềm năng</button>
              <button onClick={() => { alert('Đã gửi thư mời phỏng vấn'); setSelectedCandidate(null); }} style={{ flex: 1, padding: '10px', borderRadius: 'var(--radius-md)', backgroundColor: '#3b82f6', color: '#fff', fontWeight: 700 }}>Mời phỏng vấn</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL KHÁM PHÁ NGHỀ NGHIỆP RIASEC (Capture5 -> Capture8) */}
      {careerTestModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '24px' }}>
          <div className="animate-fade-in" style={{ backgroundColor: '#fff', borderRadius: 'var(--radius-xl)', maxWidth: '640px', width: '100%', padding: '32px', position: 'relative' }}>
            
            {/* Step 0: Before start modal (Capture5.PNG) */}
            {careerStep === 'info' && (
              <div>
                <button onClick={() => setCareerTestModalOpen(false)} style={{ position: 'absolute', top: '16px', right: '16px', width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                  <X size={16} />
                </button>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary-accent)', letterSpacing: '1px', marginBottom: '4px' }}>KHÁM PHÁ NGHỀ NGHIỆP</div>
                <h3 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '24px', color: 'var(--primary)' }}>Trước khi bắt đầu</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
                  {[
                    { icon: Clock, color: '#e9d5ff', iconColor: '#7c3aed', text: 'Khoảng 8–10 phút, 45 câu hỏi' },
                    { icon: Bot, color: '#e9d5ff', iconColor: '#7c3aed', text: 'AI phân tích và xếp hạng kết quả' },
                    { icon: Sprout, color: '#dcfce7', iconColor: 'var(--primary)', text: 'Dựa trên mô hình Holland (RIASEC)' },
                    { icon: Heart, color: '#dcfce7', iconColor: 'var(--primary)', text: 'Hoàn toàn miễn phí' }
                  ].map((item, i) => {
                    const ItemIcon = item.icon;
                    return (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '14px', color: 'var(--text-main)' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: item.color, color: item.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <ItemIcon size={18} />
                        </div>
                        {item.text}
                      </div>
                    );
                  })}
                </div>

                <button onClick={() => setCareerStep('form')} style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700, fontSize: '16px' }}>Bắt đầu</button>
              </div>
            )}

            {/* Step 0.5: Basic info form (Capture6.PNG) */}
            {careerStep === 'form' && (
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary-accent)', marginBottom: '8px' }}>BƯỚC 1 / 3</div>
                <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px', color: 'var(--primary)' }}>Vài thông tin về bạn</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px' }}>Giúp AI hiểu bối cảnh của bạn trước khi bắt đầu bài khám phá.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Trường đại học</label>
                    <input type="text" placeholder="VD: Đại học Kinh tế Quốc dân" style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--cream)' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Ngành học</label>
                    <input type="text" placeholder="VD: Marketing" style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--cream)' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Năm học</label>
                    <select style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--cream)' }}>
                      <option>Năm ba</option>
                      <option>Năm nhất</option>
                      <option>Năm hai</option>
                      <option>Năm tư</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 700, display: 'block', marginBottom: '10px' }}>Nghề bạn đang quan tâm (chọn nhiều)</label>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {['Marketing', 'Content', 'Nhân sự', 'Tài chính', 'Kinh doanh', 'Công nghệ', 'Chưa rõ'].map(tag => (
                        <span key={tag} style={{ padding: '8px 16px', borderRadius: 'var(--radius-full)', fontSize: '13px', fontWeight: 600, backgroundColor: tag === 'Marketing' ? 'var(--primary)' : '#fff', color: tag === 'Marketing' ? '#fff' : 'var(--text-main)', border: '1px solid var(--border-color)' }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 700, display: 'block', marginBottom: '10px' }}>Mục tiêu hiện tại</label>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {['Muốn tìm thực tập', 'Muốn tìm việc full-time', 'Muốn định hướng lại ngành', 'Chỉ đang tìm hiểu'].map(tag => (
                        <span key={tag} style={{ padding: '8px 16px', borderRadius: 'var(--radius-full)', fontSize: '13px', fontWeight: 600, backgroundColor: tag === 'Muốn tìm việc full-time' ? 'var(--primary)' : '#fff', color: tag === 'Muốn tìm việc full-time' ? '#fff' : 'var(--text-main)', border: '1px solid var(--border-color)' }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button onClick={() => setCareerStep('info')} style={{ padding: '10px 20px', color: 'var(--text-muted)', fontWeight: 600 }}>← Quay lại</button>
                  <button onClick={() => { setCareerStep('questions'); setCurrentQuestionIdx(0); }} style={{ padding: '12px 28px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700 }}>Bắt đầu làm bài →</button>
                </div>
              </div>
            )}

            {/* Step 1: Questions (Capture7.PNG) */}
            {careerStep === 'questions' && (
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary-accent)', marginBottom: '8px' }}>SỞ THÍCH & RIASEC</div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '24px', color: 'var(--primary)' }}>
                  {currentQuestionIdx === 0 && "Bạn thích công việc nào hơn?"}
                  {currentQuestionIdx === 1 && "Trong một dự án nhóm, bạn thường đảm nhận vai trò gì?"}
                  {currentQuestionIdx > 1 && "Môi trường làm việc lý tưởng của bạn là gì?"}
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                  {["Phân tích dữ liệu, con số", "Sáng tạo ý tưởng, thiết kế", "Giao tiếp, kết nối với khách hàng", "Tổ chức, sắp xếp quy trình"].map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => {
                        if (currentQuestionIdx < 2) setCurrentQuestionIdx(currentQuestionIdx + 1);
                        else setCareerStep('result');
                      }}
                      style={{ padding: '16px 18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--cream)', textAlign: 'left', fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}
                    >
                      <span style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid var(--border-color)', flexShrink: 0 }} />
                      {opt}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button onClick={() => currentQuestionIdx > 0 ? setCurrentQuestionIdx(currentQuestionIdx - 1) : setCareerStep('form')} style={{ padding: '10px 20px', color: 'var(--text-muted)', fontWeight: 600 }}>← Quay lại</button>
                  <button onClick={() => { if (currentQuestionIdx < 2) setCurrentQuestionIdx(currentQuestionIdx + 1); else setCareerStep('result'); }} style={{ padding: '12px 28px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700 }}>Tiếp tục →</button>
                </div>
              </div>
            )}

            {/* Step 2: Results & RIASEC Bar Chart (Capture8.PNG) */}
            {careerStep === 'result' && (
              <div>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)', backgroundColor: 'var(--primary-light)', padding: '2px 10px', borderRadius: '10px' }}>• Kết quả của bạn</span>
                  <h3 style={{ fontSize: '24px', fontWeight: 800, marginTop: '8px' }}>Top 3 hướng nghề phù hợp nhất</h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
                  {[
                    { name: 'Content Marketing', score: 84, medal: '🥈', highlight: false, desc: 'Phù hợp với khả năng sáng tạo nội dung và storytelling.' },
                    { name: 'Brand Marketing', score: 89, medal: '🥇', highlight: true, desc: 'Phù hợp nhất với tư duy chiến lược và định vị thương hiệu.' },
                    { name: 'Trade Marketing', score: 76, medal: '🥉', highlight: false, desc: 'Phù hợp với kỹ năng phân tích thị trường và triển khai tại điểm bán.' }
                  ].map((career, i) => (
                    <div key={i} style={{ padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: career.highlight ? 'var(--primary)' : '#fff', border: career.highlight ? 'none' : '1px solid var(--border-color)', textAlign: 'center' }}>
                      <div style={{ fontSize: '20px', marginBottom: '4px', textAlign: 'left' }}>{career.medal}</div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: career.highlight ? '#fff' : 'var(--text-main)', marginBottom: '4px' }}>{career.name}</div>
                      <div style={{ fontSize: '24px', fontWeight: 800, color: career.highlight ? '#86efac' : 'var(--primary)', marginBottom: '8px' }}>{career.score}%</div>
                      <div style={{ height: '3px', backgroundColor: career.highlight ? 'rgba(255,255,255,0.3)' : '#e2e8f0', borderRadius: '2px', marginBottom: '8px', overflow: 'hidden' }}>
                        <div style={{ width: `${career.score}%`, height: '100%', backgroundColor: career.highlight ? '#86efac' : 'var(--primary)' }} />
                      </div>
                      <p style={{ fontSize: '11px', color: career.highlight ? 'rgba(255,255,255,0.85)' : 'var(--text-muted)', lineHeight: 1.4 }}>{career.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Biểu đồ thanh ngang RIASEC Capture8.PNG */}
                <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: 'var(--bg-main)', marginBottom: '24px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '12px' }}>Phân bố điểm RIASEC</div>
                  {[
                    { code: 'A — Nghệ thuật', score: 88 },
                    { code: 'S — Xã hội', score: 74 },
                    { code: 'E — Quản lý', score: 68 },
                    { code: 'I — Nghiên cứu', score: 57 },
                    { code: 'C — Nguyên tắc', score: 41 },
                    { code: 'R — Kỹ thuật', score: 22 }
                  ].map((r, rIdx) => (
                    <div key={rIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', fontSize: '12px' }}>
                      <span style={{ width: '120px', fontWeight: 600 }}>{r.code}</span>
                      <div style={{ flex: 1, height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${r.score}%`, height: '100%', backgroundColor: 'var(--primary)' }} />
                      </div>
                      <span style={{ fontWeight: 700, color: 'var(--text-muted)' }}>{r.score}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                  <button onClick={() => setCareerStep('questions')} style={{ padding: '10px 20px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)', fontWeight: 700 }}>Làm lại bài test</button>
                  <button onClick={() => { setCareerTestModalOpen(false); setStudentTab('explore'); }} style={{ padding: '10px 24px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700 }}>Xem bản đồ nghề nghiệp →</button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* MODAL GỢI Ý CÂU HỎI (dynamic via AI or local heuristic) */}
      {showQuestionHint && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 120, padding: '24px' }}>
          <div className="animate-fade-in" style={{ backgroundColor: '#fff', borderRadius: 'var(--radius-xl)', maxWidth: '760px', width: '100%', padding: '20px', position: 'relative' }}>
            <button onClick={() => setShowQuestionHint(false)} style={{ position: 'absolute', top: '12px', right: '12px', width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              <X size={16} />
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--primary)' }}>GỢI Ý TRẢ LỜI</div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, margin: 0 }}>Cách trả lời hiệu quả (STAR) & gợi ý động</h3>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, color: '#6b7280' }}>Vị trí: <strong>{selectedPosition}</strong> · Lĩnh vực: <strong>{selectedDomain}</strong></div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 12, marginTop: 12 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 700 }}>Câu hỏi (chỉnh nếu cần)</label>
                <textarea value={hintQuestionOverride} onChange={e => setHintQuestionOverride(e.target.value)} placeholder="Câu hỏi sẽ dùng để sinh gợi ý" style={{ width: '100%', minHeight: 80, padding: 10, borderRadius: 8, border: '1px solid var(--border-color)' }} />

                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                  <input type="password" value={openAIKey} onChange={e => setOpenAIKey(e.target.value)} placeholder="(tùy chọn) Nhập OpenAI API Key để dùng AI" style={{ flex: 1, padding: '8px 10px', borderRadius: 8, border: '1px solid var(--border-color)' }} />
                  <button onClick={() => generateHint(false)} disabled={hintLoading} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border-color)' }}>{hintLoading ? 'Sinh...' : 'Sinh gợi ý (Local)'}</button>
                  <button onClick={() => generateHint(true)} disabled={hintLoading || !openAIKey} style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: openAIKey ? 'var(--primary)' : '#9ca3af', color: '#fff', border: 'none' }}>{hintLoading ? 'Sinh AI...' : 'Sinh gợi ý (AI)'}</button>
                </div>

                <div style={{ marginTop: 12, padding: 12, borderRadius: 8, backgroundColor: 'var(--bg-main)', minHeight: 80 }}>
                  {hintLoading ? (
                    <div style={{ color: 'var(--text-muted)' }}>Đang sinh gợi ý...</div>
                  ) : hintText ? (
                    <pre style={{ whiteSpace: 'pre-wrap', fontSize: 14, lineHeight: 1.5 }}>{hintText}</pre>
                  ) : (
                    <div style={{ color: 'var(--text-muted)' }}>Nhấn "Sinh gợi ý" để nhận lời khuyên chi tiết.</div>
                  )}
                </div>

                {sampleAnswer && (
                  <div style={{ marginTop: 12 }}>
                    <div style={{ fontWeight: 700, marginBottom: 6 }}>Mẫu trả lời gợi ý</div>
                    <div style={{ padding: 12, borderRadius: 8, backgroundColor: '#fff', border: '1px solid var(--border-color)', fontSize: 14, lineHeight: 1.6 }}>{sampleAnswer}</div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                      <button onClick={() => { setAnswerText(sampleAnswer); setShowQuestionHint(false); }} style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700 }}>Áp dụng vào ô trả lời</button>
                      <button onClick={() => { navigator.clipboard?.writeText(sampleAnswer); alert('Đã sao chép mẫu trả lời'); }} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border-color)' }}>Sao chép</button>
                    </div>
                  </div>
                )}
              </div>

              <aside style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: 8, padding: 12, height: '100%' }}>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>STAR (nhắc nhanh)</div>
                <ol style={{ paddingLeft: 18, margin: 0 }}>
                  <li><strong>S</strong> — Mô tả bối cảnh ngắn gọn</li>
                  <li><strong>T</strong> — Nhiệm vụ/ mục tiêu bạn đảm nhận</li>
                  <li><strong>A</strong> — Hành động cụ thể bạn làm</li>
                  <li><strong>R</strong> — Kết quả đo lường/ học được</li>
                </ol>

                <div style={{ fontWeight: 700, marginTop: 12 }}>Từ khóa</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
                  {['Phân tích','Kết quả','Triển khai','Tối ưu','Hợp tác'].map(k => <span key={k} style={{ padding: '6px 8px', background: 'var(--bg-main)', borderRadius: 6, fontWeight: 700 }}>{k}</span>)}
                </div>

                <div style={{ marginTop: 12 }}>
                  <div style={{ fontWeight: 700 }}>Gợi ý nhanh</div>
                  <ul style={{ paddingLeft: 18 }}>
                    <li>Đưa con số cụ thể</li>
                    <li>Nêu rõ vai trò cá nhân</li>
                    <li>Kết luận bằng kết quả/ học được</li>
                  </ul>
                </div>
              </aside>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
              <button onClick={() => setShowQuestionHint(false)} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border-color)', marginRight: 8 }}>Đóng</button>
            </div>
          </div>
        </div>
      )}

      {/* OTP VERIFICATION MODAL */}
      {showOTPModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 130, padding: '24px' }}>
          <div className="animate-fade-in" style={{ backgroundColor: '#fff', borderRadius: 'var(--radius-xl)', maxWidth: '400px', width: '100%', padding: '32px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '12px' }}>Xác thực Email</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px' }}>Mã OTP đã được gửi đến email của bạn. Vui lòng nhập mã để xác thực.</p>
            
            <input
              type="text"
              value={otpInput}
              onChange={e => { setOtpInput(e.target.value); setOtpError(''); }}
              placeholder="Nhập mã OTP (6 chữ số)"
              maxLength={6}
              style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: otpError ? '2px solid #dc2626' : '1px solid var(--border-color)', fontSize: '16px', fontWeight: 700, textAlign: 'center', letterSpacing: '2px', marginBottom: '12px' }}
            />
            
            {otpError && (
              <div style={{ fontSize: '13px', color: '#dc2626', marginBottom: '16px', fontWeight: 600 }}>
                {otpError}
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => { setShowOTPModal(false); setOtpInput(''); setOtpError(''); }} style={{ flex: 1, padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: '#fff', fontWeight: 600 }}>Hủy</button>
              <button onClick={verifyOTP} style={{ flex: 1, padding: '12px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700 }}>Xác thực</button>
            </div>

            <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--text-muted)' }}>
              Mã OTP có hiệu lực trong 10 phút
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
