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

// 7 Distinct Job Maps Data
const jobMapsDetails: Record<string, {
  title: string;
  categoryTag: string;
  duties: string[];
  tools: string[];
  skills: string[];
  companies: string;
  salary: string;
  careerPath: string;
}> = {
  'Brand Marketing': {
    title: 'Brand Marketing',
    categoryTag: 'Nhánh Thương hiệu',
    duties: [
      'Xây dựng định vị, tầm nhìn và câu chuyện thương hiệu (Brand Story)',
      'Lên kế hoạch chiến dịch truyền thông tích hợp (IMC Campaign)',
      'Quản lý thương hiệu và hợp tác với Creative Agencies & KOLs'
    ],
    tools: ['Canva', 'Figma', 'Meta Business Suite', 'Brandwatch', 'PowerPoint'],
    skills: ['Tư duy chiến lược', 'Sáng tạo nội dung', 'Nghiên cứu hành vi người dùng (Insight)'],
    companies: 'Unilever, P&G, Vinamilk, Masan Group, Suntory PepsiCo',
    salary: '12 - 25 triệu VNĐ/tháng',
    careerPath: 'Brand Executive → Brand Manager → Marketing Director'
  },
  'Digital Marketing': {
    title: 'Digital Marketing',
    categoryTag: 'Nhánh Tiếp thị Kỹ thuật số',
    duties: [
      'Tối ưu các kênh digital (SEO, SEM, Social Media, Email Marketing)',
      'Quản lý ngân sách chạy quảng cáo và theo dõi chỉ số ROI/ROAS',
      'Xây dựng kênh tăng trưởng lượng truy cập & tỉ lệ chuyển đổi web/app'
    ],
    tools: ['Google Analytics 4', 'Google Ads', 'Facebook Ads Manager', 'Ahrefs', 'Semrush'],
    skills: ['Phân tích số liệu Digital', 'Chạy quảng cáo Đa kênh', 'Tối ưu Conversion Rate'],
    companies: 'Shopee, Grab, Tiki, VNG Corporation, Momo',
    salary: '10 - 22 triệu VNĐ/tháng',
    careerPath: 'Digital Specialist → Digital Lead → Head of Digital Marketing'
  },
  'Content Marketing': {
    title: 'Content Marketing',
    categoryTag: 'Nhánh Sáng tạo Nội dung',
    duties: [
      'Lập chiến lược nội dung đa nền tảng (Blog, Social, Video Tiktok, Youtube)',
      'Viết kịch bản video, bài PR, Email Marketing và Copywriting sản phẩm',
      'Đo lường độ tương tác (Engagement) và mức độ viral của chiến dịch'
    ],
    tools: ['CapCut', 'Notion', 'ChatGPT / AI Tools', 'WordPress', 'Photoshop'],
    skills: ['Kỹ năng Viết & Copywriting', 'Tư duy Thẩm mỹ & Video Short-form', 'Storytelling'],
    companies: 'Admicro, Dentsu, Chotot, Coolmate, Sunhouse',
    salary: '9 - 18 triệu VNĐ/tháng',
    careerPath: 'Content Executive → Content Lead → Chief Content Officer'
  },
  'Trade Marketing': {
    title: 'Trade Marketing',
    categoryTag: 'Nhánh Tiếp thị Điểm bán',
    duties: [
      'Tối ưu hóa hình ảnh thương hiệu và vật phẩm trưng bày tại điểm bán (POSM)',
      'Triển khai chương trình khuyến mãi cho kênh GT (Truyền thống) và MT (Hiện đại)',
      'Nghiên cứu đối thủ tại kênh bán lẻ và quản lý ngân sách trưng bày'
    ],
    tools: ['Excel Advanced', 'Power BI', 'Salesforce', 'Trade Audit Apps'],
    skills: ['Phân tích Kênh Phân phối', 'Thương lượng với Siêu thị/Đại lý', 'Nghiên cứu Shopper'],
    companies: 'Nestlé, Coca-Cola, FrieslandCampina, CP Vietnam',
    salary: '11 - 24 triệu VNĐ/tháng',
    careerPath: 'Trade Executive → Trade Marketing Manager → Commercial Director'
  },
  'Performance Marketing': {
    title: 'Performance Marketing',
    categoryTag: 'Nhánh Tối ưu Tăng trưởng',
    duties: [
      'Thiết lập, thử nghiệm A/B và tối ưu chiến dịch chạy Ads quy mô lớn',
      'Theo dõi sát các chỉ số CAC, LTV, CPA, CTR, CVR hàng ngày',
      'Phối hợp với Media team để liên tục đổi mới kho nội dung quảng cáo'
    ],
    tools: ['Tiktok Ads Manager', 'Meta Ads', 'Google Tag Manager', 'Mixpanel', 'Looker Studio'],
    skills: ['Tư duy Số liệu sắc bén', 'Quản lý Ngân sách lớn', 'A/B Testing & Attribution'],
    companies: 'Tiki, Shopee, Lazada, Be Group, VPBank',
    salary: '14 - 30 triệu VNĐ/tháng',
    careerPath: 'Performance Media Specialist → Performance Manager → Growth Director'
  },
  'Research Marketing': {
    title: 'Research Marketing (Market Research)',
    categoryTag: 'Nhánh Nghiên cứu Thị trường',
    duties: [
      'Thiết kế bảng khảo sát định lượng và phỏng vấn định tính với khách hàng',
      'Phân tích quy mô thị trường, xu hướng tiêu dùng và rào cản hành vi',
      'Cung cấp báo cáo thị trường giúp Ban Giám Đốc ra quyết định sản phẩm mới'
    ],
    tools: ['SPSS', 'Qualtrics', 'Google Forms / SurveyMonkey', 'Tableau', 'R/Python'],
    skills: ['Thống kê & Phân tích Dữ liệu', 'Kỹ năng Phỏng vấn Chuyên sâu', 'Tư duy Khách quan'],
    companies: 'NielsenIQ, Kantar Vietnam, Intage, Cimigo, Ipsos',
    salary: '12 - 25 triệu VNĐ/tháng',
    careerPath: 'Market Research Executive → Consumer Insight Manager → Head of Insights'
  },
  'CRM': {
    title: 'CRM & Customer Loyalty',
    categoryTag: 'Nhánh Quản trị Quan hệ Khách hàng',
    duties: [
      'Xây dựng chiến lược giữ chân khách hàng (Retention Strategy) & chương trình Loyalty',
      'Phân nhóm khách hàng (RFM Segmentation) để gửi thông điệp cá nhân hóa',
      'Tối ưu hóa vòng đời khách hàng (Customer Lifetime Value)'
    ],
    tools: ['HubSpot CRM', 'Salesforce Marketing Cloud', 'Braze', 'Klaviyo', 'Zalo ZNS'],
    skills: ['Phân tích Hành vi Khách hàng', 'Automation Marketing', 'Tư duy Chăm sóc Khách hàng'],
    companies: 'Garena, Highlands Coffee, Grab, ShopeeFood, VinID',
    salary: '11 - 22 triệu VNĐ/tháng',
    careerPath: 'CRM Specialist → CRM Manager → Head of CRM & Customer Experience'
  }
};

// 10 Distinct Interview Questions Per Domain
const interviewQuestionsMap: Record<string, string[]> = {
  'Nhân sự': [
    '1. Bạn hãy giới thiệu bản thân và lý do bạn muốn phát triển sự nghiệp trong ngành Nhân sự (HR)?',
    '2. Theo bạn, vai trò quan trọng nhất của HR trong một doanh nghiệp hiện đại là gì?',
    '3. Quy trình tuyển dụng một vị trí từ lúc phát sinh nhu cầu đến khi ứng viên onboard gồm những bước nào?',
    '4. Hãy kể lại một trường hợp ứng viên từ chối Offer và cách bạn xử lý tình huống đó?',
    '5. Bạn sử dụng những công cụ hoặc kênh tuyển dụng nào để tìm kiếm ứng viên tiềm năng?',
    '6. Làm thế nào để đánh giá một ứng viên có phù hợp với Văn hóa doanh nghiệp (Culture Fit) hay không?',
    '7. Khi có xung đột nội bộ giữa người lao động và quản lý, bạn sẽ đóng vai trò hòa giải như thế nào?',
    '8. Bạn làm thế nào để xây dựng chính sách Lương thưởng & Phúc lợi (C&B) cạnh tranh trên thị trường?',
    '9. Hãy kể về một dự án hoặc cải tiến nhân sự mà bạn tự hào nhất?',
    '10. Định hướng phát triển sự nghiệp trong ngành HR của bạn trong 3 năm tới là gì?'
  ],
  'Marketing': [
    '1. Hãy giới thiệu bản thân và phong cách làm việc/sáng tạo của bạn trong ngành Marketing?',
    '2. Khi bắt đầu xây dựng kế hoạch Marketing cho một sản phẩm mới, bạn xuất phát từ đâu?',
    '3. Hãy phân biệt sự khác nhau giữa Brand Marketing, Digital Marketing và Performance Marketing?',
    '4. Kể lại một chiến dịch Marketing bạn từng ấn tượng hoặc trực tiếp tham gia? Kết quả đạt được là gì?',
    '5. Bạn xử lý thế nào khi một chiến dịch truyền thông gặp khủng hoảng (PR Crisis) trên Social Media?',
    '6. Làm thế nào để xác định và nghiên cứu chân dung khách hàng mục tiêu (Target Persona) hiệu quả?',
    '7. Bạn sử dụng những chỉ số (KPIs/Metrics) nào để đo lường thành công của một chiến dịch Content?',
    '8. Ngân sách bị cắt giảm 30%, bạn sẽ tối ưu hóa các kênh Marketing như thế nào mà vẫn đạt mục tiêu?',
    '9. Theo bạn, xu hướng Marketing nào (ví dụ: AI, Short-form video) sẽ bùng nổ nhất trong 2 năm tới?',
    '10. Mục tiêu nghề nghiệp ngắn hạn và dài hạn của bạn trong ngành Marketing là gì?'
  ],
  'CNTT': [
    '1. Bạn hãy giới thiệu bản thân, các ngôn ngữ lập trình và công nghệ bạn thành thạo nhất?',
    '2. Hãy giải thích kiến trúc phần mềm mà bạn ưa thích (VD: Microservices vs Monolith) và lý do lựa chọn?',
    '3. Bạn xử lý và truy vết (debug) như thế nào khi phát hiện một lỗi nghiêm trọng (Critical Bug) trên Production?',
    '4. Kể lại một dự án kỹ thuật phức tạp nhất bạn từng tham gia và vai trò của bạn trong đó?',
    '5. Làm thế nào để bạn đảm bảo chất lượng mã nguồn (Clean Code, Unit Test, Code Review) trong team?',
    '6. Bạn tối ưu hiệu năng (Performance Optimization) của ứng dụng / truy vấn cơ sở dữ liệu như thế nào?',
    '7. Khi có sự bất đồng ý kiến về giải pháp kỹ thuật với Team Lead/Senior, bạn tranh luận thế nào?',
    '8. Bạn cập nhật các công nghệ mới và học hỏi kiến thức chuyên môn hàng ngày bằng cách nào?',
    '9. Bạn hiểu thế nào về quy trình Agile/Scrum và cách bạn phối hợp trong các buổi Sprint?',
    '10. Định hướng phát triển của bạn là trở thành Tech Lead, Solution Architect hay Senior Specialist?'
  ],
  'Tài chính - Ngân hàng': [
    '1. Bạn hãy giới thiệu bản thân và lý do bạn lựa chọn lĩnh vực Tài chính - Ngân hàng?',
    '2. Hãy trình bày các chỉ số tài chính quan trọng nhất khi phân tích sức khỏe một doanh nghiệp?',
    '3. Quy trình thẩm định tín dụng hoặc phân tích rủi ro đầu tư gồm những bước cơ bản nào?',
    '4. Khi bảng cân đối kế toán không cân hoặc có sai sót số liệu, bạn kiểm tra từ đâu?',
    '5. Bạn cập nhật và phân tích tác động của sự biến động lãi suất/tỷ giá đến doanh nghiệp như thế nào?',
    '6. Kể lại một bài toán phân tích tài chính/mô hình dự báo khó khăn nhất bạn từng thực hiện?',
    '7. Bạn làm thế nào để đảm bảo tính tuân thủ pháp lý và tính chính xác tuyệt đối trong báo cáo?',
    '8. Theo bạn, những kỹ năng mềm nào là quan trọng nhất đối với một chuyên viên Tài chính?',
    '9. Ứng dụng của Công nghệ tài chính (Fintech) và AI đang thay đổi ngành Ngân hàng ra sao?',
    '10. Mục tiêu vị trí và cấp bậc bạn hướng tới trong 3 năm tới tại ngân hàng/công ty là gì?'
  ],
  'Kế toán - Kiểm toán': [
    '1. Giới thiệu bản thân và kinh nghiệm thực hành với các chuẩn mực Kế toán (VAS/IFRS)?',
    '2. Quy trình khóa sổ kế toán cuối tháng/cuối năm gồm những kiểm tra quan trọng nào?',
    '3. Bạn xử lý và hạch toán như thế nào khi phát hiện chứng từ hóa đơn không hợp lệ?',
    '4. Phân biệt sự khác nhau giữa Kiểm toán Nội bộ (Internal Audit) và Kiểm toán Độc lập?',
    '5. Bạn sử dụng những công cụ/phần mềm kế toán nào (MISA, SAP, Fast, Excel)?',
    '6. Làm thế nào để đảm bảo việc lập tờ khai Thuế GTGT, TNDN, TNCN đúng hạn và chính xác?',
    '7. Hãy kể lại một lần bạn tham gia giải trình số liệu với Cơ quan Thuế hoặc Đoàn Kiểm toán?',
    '8. Cách bạn lưu trữ và quản lý hệ thống chứng từ kế toán khoa học, bảo mật?',
    '9. Theo bạn, phẩm chất quan trọng nhất của một người làm Kế toán - Kiểm toán là gì?',
    '10. Định hướng sự nghiệp của bạn (Kế toán trưởng, Giám đốc tài chính CFO, ACCA/CPA)?'
  ]
};

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

  // Activities modal state
  const [showActivitiesModal, setShowActivitiesModal] = useState<boolean>(false);

  // Student Exploration RIASEC (Capture5 -> Capture8)
  const [careerTestModalOpen, setCareerTestModalOpen] = useState<boolean>(false);
  const [careerStep, setCareerStep] = useState<'info' | 'form' | 'questions' | 'result' | 'map'>('info');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [careerAnswers, setCareerAnswers] = useState<Record<number, number>>({});

  // AI Interview Practice Flow (Capture10 -> Capture15)
  const [interviewStep, setInterviewStep] = useState<'landing' | 'select' | 'mode' | 'question' | 'feedback' | 'summary'>('landing');
  const [selectedDomain, setSelectedDomain] = useState<string>('Nhân sự');
  const [selectedPosition, setSelectedPosition] = useState<string>('HR Generalist');
  const [selectedEnterprise, setSelectedEnterprise] = useState<string>('Techcombank');
  const [answerMode, setAnswerMode] = useState<'text' | 'voice'>('text');
  const [, setAnswerText] = useState<string>('');
  const [showQuestionHint, setShowQuestionHint] = useState<boolean>(false);
  const [currentInterviewQuestionIdx, setCurrentInterviewQuestionIdx] = useState<number>(0);
  const [interviewAnswersList, setInterviewAnswersList] = useState<Record<number, string>>({});

  // Job Simulation Workspace state
  const [activeSimModal, setActiveSimModal] = useState<any | null>(null);
  const [simAnswerText, setSimAnswerText] = useState<string>('');
  const [simEvaluationResult, setSimEvaluationResult] = useState<any | null>(null);

  // CV Builder & ATS state
  const [cvTab, setCvTab] = useState<'builder' | 'ats'>('builder');
  const [cvData, setCvData] = useState({
    fullName: 'Nguyễn Văn Enzy',
    title: 'Front-end Developer Intern / Marketing Specialist',
    email: 'enzy.student@navix.vn',
    phone: '0987654321',
    university: 'Đại học Kinh tế Quốc dân',
    major: 'Công nghệ thông tin / Marketing',
    gpa: '3.6/4.0',
    summary: 'Sinh viên năm 3 năng động với tư duy logic tốt, đam mê phát triển sản phẩm và ứng dụng AI vào tối ưu hóa công việc.',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Social Media', 'Content Creation', 'Data Analysis'],
    experience: 'Thực tập sinh Marketing tại NovaTech (03/2026 - 06/2026): Hỗ trợ lập kế hoạch nội dung và chạy quảng cáo.',
    projects: 'Xây dựng Web App NAVIX: Ứng dụng AI định hướng nghề nghiệp và mô phỏng tuyển dụng cho sinh viên.'
  });
  const [atsJdInput, setAtsJdInput] = useState<string>('Yêu cầu vị trí: Có khả năng lập trình React / Web Frontend, sử dụng tốt TypeScript, hiểu biết về UX/UI và có tư duy giải quyết vấn đề tốt. Ưu tiên có sản phẩm demo.');
  const [atsCvInput, setAtsCvInput] = useState<string>('Hồ sơ ứng viên: Thành thạo ReactJS, HTML/CSS, JavaScript, TypeScript, đã thực hiện dự án Web App fullstack và có sản phẩm mô phỏng việc làm.');
  const [atsResult, setAtsResult] = useState<any | null>(null);

  // Hint generation states (AI key optional). If user provides an OpenAI key in the modal,
  // the app will try to call OpenAI from the browser (CORS permitting). Otherwise it falls
  // back to a local heuristic generator.
  const [hintLoading, setHintLoading] = useState<boolean>(false);
  const [hintText, setHintText] = useState<string>('');
  const [sampleAnswer, setSampleAnswer] = useState<string>('');
  const [openAIKey, setOpenAIKey] = useState<string>('');
  const [hintQuestionOverride, setHintQuestionOverride] = useState<string>('');

  // local heuristic generator for hints (no external API)
  const localGenerateHint = () => {
    const star = `S: Mô tả bối cảnh ngắn gọn; T: Nhiệm vụ bạn đảm nhận; A: Hành động cụ thể bạn đã làm; R: Kết quả đo lường.`;
    const keyPoints = [`Nêu vai trò & đóng góp cá nhân`, `Đưa số liệu (nếu có)`, `Nêu thách thức & cách giải quyết`, `Kết quả cụ thể hoặc bài học`];
    const sample = `Trong dự án X (S), tôi được giao nhiệm vụ ${selectedPosition} (T). Tôi đã thực hiện bằng cách ... (A), kết quả là đạt được ... (R) — ví dụ: tăng 20% tương tác, hoàn thành trước kế hoạch 2 tuần.`;
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
        const out = localGenerateHint();
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
            onClick={() => setCurrentPage(currentUser ? (currentUser.role === 'business' ? 'enterprise-dashboard' : 'student-dashboard') : 'home')}
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
              <div 
                onClick={() => setCurrentPage(currentUser.role === 'business' ? 'enterprise-dashboard' : 'student-dashboard')}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 12px 4px 4px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)', cursor: 'pointer' }}
              >
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
              <button
                onClick={() => setCurrentPage(currentUser.role === 'business' ? 'enterprise-dashboard' : 'student-dashboard')}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--primary)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(20,83,45,0.2)'
                }}
              >
                <LayoutDashboard size={16} /> Trang cá nhân
              </button>
              <div 
                onClick={() => setCurrentPage(currentUser.role === 'business' ? 'enterprise-dashboard' : 'student-dashboard')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--primary-light)',
                  border: '1px solid var(--primary-border)',
                  cursor: 'pointer'
                }}
              >
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

                      <button onClick={() => setShowActivitiesModal(true)} style={{ marginTop: '16px', fontSize: '13px', fontWeight: 700, color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
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
                                      {(() => {
                                      const currentJobData = jobMapsDetails['Brand Marketing'];
                      return (
                        <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                            <div>
                              <h4 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--primary)', marginBottom: '4px' }}>{currentJobData.title}</h4>
                              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{currentJobData.categoryTag}</div>
                            </div>
                            <span style={{ fontSize: '12px', padding: '4px 12px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 700 }}>Nhánh trong Marketing</span>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '16px' }}>
                            <div>
                              <div style={{ fontWeight: 700, fontSize: '13px', marginBottom: '8px', color: 'var(--text-muted)' }}>CÔNG VIỆC CHÍNH</div>
                              <ul style={{ fontSize: '13px', color: 'var(--text-main)', paddingLeft: '16px', lineHeight: 1.8 }}>
                                {currentJobData.duties.map((duty, idx) => (
                                  <li key={idx}>{duty}</li>
                                ))}
                              </ul>
                              <div style={{ fontWeight: 700, fontSize: '13px', margin: '16px 0 8px', color: 'var(--text-muted)' }}>CÔNG CỤ THƯỜNG DÙNG</div>
                              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {currentJobData.tools.map(t => (
                                  <span key={t} style={{ fontSize: '12px', padding: '4px 12px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 600 }}>{t}</span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div style={{ fontWeight: 700, fontSize: '13px', marginBottom: '8px', color: 'var(--text-muted)' }}>KỸ NĂNG CẦN</div>
                              <ul style={{ fontSize: '13px', color: 'var(--text-main)', paddingLeft: '16px', lineHeight: 1.8 }}>
                                {currentJobData.skills.map((skill, idx) => (
                                  <li key={idx}>{skill}</li>
                                ))}
                              </ul>
                              <div style={{ fontWeight: 700, fontSize: '13px', margin: '16px 0 8px', color: 'var(--text-muted)' }}>DOANH NGHIỆP TUYỂN DỤNG PHỔ BIẾN</div>
                              <p style={{ fontSize: '13px', color: 'var(--text-main)' }}>{currentJobData.companies}</p>
                            </div>
                          </div>
                          <div style={{ backgroundColor: 'var(--primary-light)', padding: '16px 24px', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                            <div>
                              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary)' }}>{currentJobData.salary}</div>
                              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Mức lương tham khảo</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)' }}>{currentJobData.careerPath}</div>
                              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Lộ trình phát triển</div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
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

                  {/* Step 4: Answer Question (Supports 10 distinct questions) */}
                  {interviewStep === 'question' && (() => {
                    const currentQuestions = interviewQuestionsMap[selectedDomain] || interviewQuestionsMap['Nhân sự'];
                    const currentQText = currentQuestions[currentInterviewQuestionIdx] || currentQuestions[0];
                    return (
                      <div style={{ backgroundColor: 'var(--cream)', padding: '40px', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary-accent)', letterSpacing: '0.5px' }}>
                            CÂU HỎI {currentInterviewQuestionIdx + 1} / {currentQuestions.length}
                          </div>
                          <span style={{ fontSize: '12px', padding: '2px 10px', borderRadius: '10px', backgroundColor: '#dcfce7', color: 'var(--primary)', fontWeight: 700 }}>
                            {selectedDomain} · {selectedPosition}
                          </span>
                        </div>
                        <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '24px', color: 'var(--primary)', lineHeight: 1.4 }}>
                          {currentQText}
                        </h3>

                        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                          <button onClick={() => setAnswerMode('text')} style={{ padding: '10px 20px', borderRadius: 'var(--radius-full)', backgroundColor: answerMode === 'text' ? 'var(--primary)' : '#fff', color: answerMode === 'text' ? '#fff' : 'var(--text-main)', fontWeight: 700, border: answerMode === 'text' ? 'none' : '1px solid var(--border-color)' }}>
                            ✍️ Trả lời văn bản
                          </button>
                          <button onClick={() => setAnswerMode('voice')} style={{ padding: '10px 20px', borderRadius: 'var(--radius-full)', backgroundColor: answerMode === 'voice' ? 'var(--primary)' : '#fff', color: answerMode === 'voice' ? '#fff' : 'var(--text-main)', fontWeight: 700, border: answerMode === 'voice' ? 'none' : '1px solid var(--border-color)' }}>
                            🎙️ Trả lời giọng nói
                          </button>
                          <button onClick={() => { setHintQuestionOverride(currentQText); setShowQuestionHint(true); }} style={{ marginLeft: 'auto', padding: '8px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: '#fff', fontWeight: 700, color: 'var(--primary)' }}>💡 Gợi ý STAR</button>
                        </div>

                        <textarea
                          rows={6}
                          value={interviewAnswersList[currentInterviewQuestionIdx] || ''}
                          onChange={e => setInterviewAnswersList({ ...interviewAnswersList, [currentInterviewQuestionIdx]: e.target.value })}
                          placeholder="Nhập câu trả lời chi tiết của bạn tại đây (áp dụng mô hình STAR)..."
                          style={{ width: '100%', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '24px', backgroundColor: '#fff', fontSize: '14px', resize: 'vertical' }}
                        />

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <button
                            onClick={() => {
                              if (currentInterviewQuestionIdx > 0) setCurrentInterviewQuestionIdx(currentInterviewQuestionIdx - 1);
                              else setInterviewStep('mode');
                            }}
                            style={{ padding: '10px 20px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)', backgroundColor: '#fff', fontWeight: 600, color: 'var(--primary)' }}
                          >
                            ← {currentInterviewQuestionIdx > 0 ? 'Câu trước' : 'Quay lại'}
                          </button>
                          <button onClick={() => setInterviewStep('feedback')} style={{ padding: '12px 28px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700, boxShadow: '0 4px 12px rgba(20,83,45,0.2)' }}>
                            Gửi câu trả lời câu {currentInterviewQuestionIdx + 1}
                          </button>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Step 5: AI Instant Feedback */}
                  {interviewStep === 'feedback' && (() => {
                    const currentQuestions = interviewQuestionsMap[selectedDomain] || interviewQuestionsMap['Nhân sự'];
                    const isLastQ = currentInterviewQuestionIdx >= currentQuestions.length - 1;
                    const userAns = interviewAnswersList[currentInterviewQuestionIdx] || '';
                    return (
                      <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
                          <div style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '22px', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>{userAns.length > 50 ? '8.5' : '7.0'}</span>
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>/ 10</span>
                          </div>
                          <div>
                            <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary)' }}>AI đánh giá câu trả lời (Câu {currentInterviewQuestionIdx + 1}/{currentQuestions.length})</h3>
                            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{currentQuestions[currentInterviewQuestionIdx]}</p>
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '28px' }}>
                          {[
                            { title: 'NHẬN XÉT NỘI DUNG', text: userAns ? `Câu trả lời của bạn có liên hệ tốt tới công việc. Bạn đã nêu được thông tin chính nhưng cần bổ sung số liệu minh chứng.` : `Bạn chưa nhập câu trả lời chi tiết. Khuyến nghị trả lời theo phương pháp STAR.` },
                            { title: 'KỸ NĂNG DIỄN ĐẠT', text: 'Cấu trúc rõ ràng, tư duy tốt. Nên bổ sung thêm kết quả bài học đo lường được.' },
                            { title: 'GỢI Ý CẢI THIỆN', text: 'Nên nhấn mạnh vai trò cá nhân và cách bạn vượt qua thử thách.' }
                          ].map((section, i) => (
                            <div key={i}>
                              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.5px', marginBottom: '6px' }}>{section.title}</div>
                              <p style={{ fontSize: '14px', color: 'var(--text-main)', lineHeight: 1.6 }}>{section.text}</p>
                            </div>
                          ))}
                          <div>
                            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.5px', marginBottom: '6px' }}>CÂU TRẢ LỜI THAM KHẢO SCHEME STAR</div>
                            <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary-light)', fontSize: '14px', color: 'var(--text-main)', lineHeight: 1.6, fontStyle: 'italic' }}>
                              "Khi đối mặt với yêu cầu này (Situation), nhiệm vụ chính của tôi là... (Task). Tôi đã chủ động làm việc với các bên liên quan và áp dụng giải pháp X (Action), kết quả đạt được tăng 25% hiệu quả (Result)."
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                          <button
                            onClick={() => {
                              if (isLastQ) {
                                setInterviewStep('summary');
                              } else {
                                setCurrentInterviewQuestionIdx(currentInterviewQuestionIdx + 1);
                                setInterviewStep('question');
                              }
                            }}
                            style={{ padding: '12px 28px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700, boxShadow: '0 4px 12px rgba(20,83,45,0.2)' }}
                          >
                            {isLastQ ? 'Xem tổng kết toàn bộ 10 câu →' : `Chuyển sang Câu ${currentInterviewQuestionIdx + 2} →`}
                          </button>
                        </div>
                      </div>
                    );
                  })()}

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
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                      <h2 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--primary)', marginBottom: '4px' }}>Mô phỏng việc làm (Job Simulation)</h2>
                      <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Thực hành tình huống công việc thực tế từ doanh nghiệp đối tác, nhận điểm & phản hồi AI.</p>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
                    {[
                      {
                        title: 'Social Media Campaign - Summer 2026',
                        company: 'NovaTech',
                        field: 'Marketing',
                        position: 'Intern',
                        deadline: '31/08/2026',
                        status: 'Mới',
                        desc: 'Xây dựng ý tưởng và kế hoạch truyền thông cho chiến dịch mùa hè nhắm tới nhóm Gen Z.',
                        tasks: ['Nghiên cứu insight Gen Z', 'Lập kế hoạch nội dung 4 tuần', 'Dự trù ngân sách và chỉ số KPI']
                      },
                      {
                        title: 'Phân tích báo cáo tài chính Q2',
                        company: 'Techcombank',
                        field: 'Tài chính - Ngân hàng',
                        position: 'Fresher',
                        deadline: '15/09/2026',
                        status: 'Đang mở',
                        desc: 'Đánh giá các chỉ số khả năng thanh toán, hiệu quả hoạt động và đề xuất phương án tối ưu vốn.',
                        tasks: ['Đánh giá bảng cân đối kế toán', 'Tính toán chỉ số ROE, ROA', 'Lập bản tóm tắt rủi ro']
                      },
                      {
                        title: 'Xây dựng chiến lược tuyển dụng Gen Z',
                        company: 'Manulife',
                        field: 'Nhân sự',
                        position: 'Junior',
                        deadline: '20/09/2026',
                        status: 'Đang mở',
                        desc: 'Thiết kế quy trình tuyển dụng và trải nghiệm ứng viên thu hút tài năng trẻ.',
                        tasks: ['Thiết kế Employer Branding', 'Xây dựng khung câu hỏi phỏng vấn', 'Đề xuất kênh Sourcing']
                      }
                    ].map((sim, i) => (
                      <div key={i} style={{ backgroundColor: '#fff', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>{sim.status}</span>
                            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Hạn: {sim.deadline}</span>
                          </div>
                          <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-main)' }}>{sim.title}</h3>
                          <p style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 700, marginBottom: '8px' }}>{sim.company} · {sim.field} (Vị trí: {sim.position})</p>
                          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.5 }}>{sim.desc}</p>
                          
                          <div style={{ backgroundColor: 'var(--bg-main)', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
                            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>Nhiệm vụ chính:</div>
                            <ul style={{ fontSize: '12px', color: 'var(--text-muted)', paddingLeft: '16px', margin: 0, lineHeight: 1.6 }}>
                              {sim.tasks.map((t, tIdx) => <li key={tIdx}>{t}</li>)}
                            </ul>
                          </div>
                        </div>

                        <button
                          onClick={() => { setActiveSimModal(sim); setSimAnswerText(''); setSimEvaluationResult(null); }}
                          style={{ padding: '12px 20px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700, fontSize: '14px', width: '100%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                        >
                          Bắt đầu mô phỏng ngay <ArrowRight size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* XÂY DỰNG CV & PHÂN TÍCH ATS TAB */}
              {studentTab === 'cv' && (
                <div className="animate-fade-in">
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                    <button
                      onClick={() => setCvTab('builder')}
                      style={{ padding: '12px 24px', borderRadius: 'var(--radius-full)', fontWeight: 700, fontSize: '15px', backgroundColor: cvTab === 'builder' ? 'var(--primary)' : '#fff', color: cvTab === 'builder' ? '#fff' : 'var(--text-main)', border: cvTab === 'builder' ? 'none' : '1px solid var(--border-color)' }}
                    >
                      📄 Tạo & Chỉnh sửa CV
                    </button>
                    <button
                      onClick={() => setCvTab('ats')}
                      style={{ padding: '12px 24px', borderRadius: 'var(--radius-full)', fontWeight: 700, fontSize: '15px', backgroundColor: cvTab === 'ats' ? 'var(--primary)' : '#fff', color: cvTab === 'ats' ? '#fff' : 'var(--text-main)', border: cvTab === 'ats' ? 'none' : '1px solid var(--border-color)' }}
                    >
                      ✨ Phân tích độ phù hợp ATS (CV vs JD)
                    </button>
                  </div>

                  {cvTab === 'builder' ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                      {/* Form Editor */}
                      <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px', color: 'var(--primary)' }}>Thông tin CV cá nhân</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                          <div>
                            <label style={{ fontSize: '12px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Họ và tên</label>
                            <input type="text" value={cvData.fullName} onChange={e => setCvData({ ...cvData, fullName: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }} />
                          </div>
                          <div>
                            <label style={{ fontSize: '12px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Vị trí ứng tuyển</label>
                            <input type="text" value={cvData.title} onChange={e => setCvData({ ...cvData, title: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }} />
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div>
                              <label style={{ fontSize: '12px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Email</label>
                              <input type="text" value={cvData.email} onChange={e => setCvData({ ...cvData, email: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }} />
                            </div>
                            <div>
                              <label style={{ fontSize: '12px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Số điện thoại</label>
                              <input type="text" value={cvData.phone} onChange={e => setCvData({ ...cvData, phone: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }} />
                            </div>
                          </div>
                          <div>
                            <label style={{ fontSize: '12px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Tóm tắt bản thân</label>
                            <textarea rows={3} value={cvData.summary} onChange={e => setCvData({ ...cvData, summary: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }} />
                          </div>
                          <div>
                            <label style={{ fontSize: '12px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Kinh nghiệm làm việc</label>
                            <textarea rows={3} value={cvData.experience} onChange={e => setCvData({ ...cvData, experience: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }} />
                          </div>
                          <div>
                            <label style={{ fontSize: '12px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Dự án nổi bật</label>
                            <textarea rows={3} value={cvData.projects} onChange={e => setCvData({ ...cvData, projects: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }} />
                          </div>
                        </div>
                      </div>

                      {/* Live Preview */}
                      <div style={{ backgroundColor: '#fff', padding: '28px', borderRadius: 'var(--radius-lg)', border: '2px solid var(--primary-border)', boxShadow: 'var(--shadow-md)', position: 'sticky', top: '90px' }}>
                        <div style={{ borderBottom: '2px solid var(--primary)', paddingBottom: '16px', marginBottom: '16px' }}>
                          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>{cvData.fullName || 'Nguyễn Văn Enzy'}</h2>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary-accent)', marginTop: '4px' }}>{cvData.title}</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>📧 {cvData.email} | 📞 {cvData.phone} | 🏫 {cvData.university}</div>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                          <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.5px', marginBottom: '6px' }}>TÓM TẮT</h4>
                          <p style={{ fontSize: '13px', color: 'var(--text-main)', lineHeight: 1.6 }}>{cvData.summary}</p>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                          <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.5px', marginBottom: '6px' }}>KINH NGHIỆM LÀM VIỆC</h4>
                          <p style={{ fontSize: '13px', color: 'var(--text-main)', lineHeight: 1.6 }}>{cvData.experience}</p>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                          <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.5px', marginBottom: '6px' }}>DỰ ÁN & SẢN PHẨM</h4>
                          <p style={{ fontSize: '13px', color: 'var(--text-main)', lineHeight: 1.6 }}>{cvData.projects}</p>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                          <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.5px', marginBottom: '6px' }}>KỸ NĂNG CỐT LÕI</h4>
                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                            {cvData.skills.map(s => (
                              <span key={s} style={{ fontSize: '11px', padding: '3px 10px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 700 }}>{s}</span>
                            ))}
                          </div>
                        </div>

                        <button onClick={() => alert('Đã xuất PDF mẫu thành công!')} style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
                          📥 Tải CV xuống dạng PDF
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* ATS Analyzer */
                    <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                      <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px', color: 'var(--primary)' }}>Phân tích độ tương thích CV & JD (ATS Matcher)</h3>
                      <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px' }}>Dán nội dung JD tuyển dụng của doanh nghiệp và CV của bạn để AI đánh giá tỉ lệ khớp.</p>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                        <div>
                          <label style={{ fontSize: '13px', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Nội dung Mô tả công việc (JD)</label>
                          <textarea rows={8} value={atsJdInput} onChange={e => setAtsJdInput(e.target.value)} placeholder="Dán nội dung JD tại đây..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '13px' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '13px', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Nội dung CV của bạn</label>
                          <textarea rows={8} value={atsCvInput} onChange={e => setAtsCvInput(e.target.value)} placeholder="Dán nội dung CV tại đây..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '13px' }} />
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setAtsResult({
                            score: 86,
                            matchedKeywords: ['React', 'TypeScript', 'UX/UI', 'Tư duy giải quyết vấn đề', 'Web App'],
                            missingKeywords: ['CI/CD Pipeline', 'Docker / Container', 'Automated Testing'],
                            strengths: 'CV thể hiện rõ năng lực frontend vững vàng và kinh nghiệm làm dự án thực tế.',
                            recommendations: 'Bổ sung thêm một số từ khóa kỹ thuật CI/CD và đo lường kết quả dự án bằng con số cụ thể.'
                          });
                        }}
                        style={{ padding: '14px 28px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700, fontSize: '15px', cursor: 'pointer', marginBottom: '24px' }}
                      >
                        ✨ Chạy Phân tích ATS ngay
                      </button>

                      {atsResult && (
                        <div style={{ padding: '24px', borderRadius: '12px', backgroundColor: 'var(--cream)', border: '1px solid var(--primary-border)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '22px' }}>
                              {atsResult.score}%
                            </div>
                            <div>
                              <h4 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>Đánh giá tỉ lệ khớp ATS: Rất cao</h4>
                              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>CV của bạn phù hợp tốt với yêu cầu từ nhà tuyển dụng</div>
                            </div>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                            <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                              <div style={{ fontSize: '13px', fontWeight: 700, color: '#16a34a', marginBottom: '8px' }}>✓ Từ khóa trùng khớp ({atsResult.matchedKeywords.length})</div>
                              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                {atsResult.matchedKeywords.map((k: string) => <span key={k} style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '6px', backgroundColor: '#dcfce7', color: '#15803d', fontWeight: 700 }}>{k}</span>)}
                              </div>
                            </div>
                            <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                              <div style={{ fontSize: '13px', fontWeight: 700, color: '#dc2626', marginBottom: '8px' }}>⚠ Từ khóa cần bổ sung ({atsResult.missingKeywords.length})</div>
                              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                {atsResult.missingKeywords.map((k: string) => <span key={k} style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '6px', backgroundColor: '#fee2e2', color: '#b91c1c', fontWeight: 700 }}>{k}</span>)}
                              </div>
                            </div>
                          </div>

                          <div style={{ fontSize: '13px', color: 'var(--text-main)', lineHeight: 1.6 }}>
                            <strong>Gợi ý tối ưu:</strong> {atsResult.recommendations}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* LỘ TRÌNH AI CÁ NHÂN HOÁ TAB */}
              {studentTab === 'ai-roadmap' && (
                <div className="animate-fade-in">
                  <div style={{ marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '6px', color: 'var(--primary)' }}>Lộ trình AI cá nhân hoá</h2>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Lộ trình học tập & phát triển kỹ năng được thiết kế riêng dựa trên mục tiêu nghề nghiệp của bạn.</p>
                  </div>

                  {/* Visual Roadmap Stages */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
                    {[
                      { stage: 'GIAI ĐOẠN 1', title: 'Nền tảng chuyên môn', status: 'Hoàn thành 100%', progress: 100, color: '#16a34a', bg: '#dcfce7', desc: 'Kiến thức cốt lõi & công cụ ngành' },
                      { stage: 'GIAI ĐOẠN 2', title: 'Thực hành Dự án', status: 'Đang học (65%)', progress: 65, color: 'var(--primary)', bg: 'var(--primary-light)', desc: 'Mô phỏng bài tập thực tế từ DN' },
                      { stage: 'GIAI ĐOẠN 3', title: 'CV & Phỏng vấn AI', status: 'Tiếp theo (30%)', progress: 30, color: '#d97706', bg: '#fef3c7', desc: 'Tối ưu CV ATS & Luyện phỏng vấn' },
                      { stage: 'GIAI ĐOẠN 4', title: 'Ứng tuyển Doanh nghiệp', status: 'Mục tiêu', progress: 0, color: '#6b7280', bg: '#f3f4f6', desc: 'Kết nối mạng lưới Mentor & HR' }
                    ].map((st, i) => (
                      <div key={i} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: 'var(--radius-lg)', border: `2px solid ${st.progress > 0 ? st.color : 'var(--border-color)'}`, boxShadow: 'var(--shadow-sm)' }}>
                        <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '6px', backgroundColor: st.bg, color: st.color, letterSpacing: '0.5px' }}>{st.stage}</span>
                        <h4 style={{ fontSize: '15px', fontWeight: 800, margin: '10px 0 4px', color: 'var(--text-main)' }}>{st.title}</h4>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>{st.desc}</p>
                        <div style={{ height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${st.progress}%`, height: '100%', backgroundColor: st.color }} />
                        </div>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: st.color, marginTop: '6px', textAlign: 'right' }}>{st.status}</div>
                      </div>
                    ))}
                  </div>

                  {/* AI Assistant Chatbox */}
                  <div style={{ backgroundColor: '#fff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', height: '480px' }}>
                    <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--cream)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Bot size={22} color="var(--primary)" />
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)' }}>Trợ lý Lộ trình AI NAVIX</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Hỏi đáp & tự động cập nhật lộ trình cá nhân</div>
                      </div>
                    </div>
                    <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {chatMessages.map((msg, idx) => (
                        <div key={idx} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                          <div style={{ padding: '12px 18px', borderRadius: '16px', backgroundColor: msg.sender === 'user' ? 'var(--primary)' : 'var(--bg-main)', color: msg.sender === 'user' ? '#fff' : 'var(--text-main)', fontSize: '14px', lineHeight: 1.6 }}>
                            {msg.text}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '12px' }}>
                      <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="Nhập câu hỏi hoặc ngành nghề bạn muốn tối ưu lộ trình..." style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '14px' }} />
                      <button onClick={handleSendChat} style={{ padding: '12px 24px', borderRadius: '8px', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700 }}>Gửi</button>
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
            {careerStep === 'questions' && (() => {
              const riasecQuestions = [
                { q: 'Bạn thích công việc nào hơn?', opts: ['Phân tích dữ liệu, con số & báo cáo', 'Sáng tạo ý tưởng, thiết kế visual', 'Giao tiếp, thuyết phục & kết nối khách hàng', 'Tổ chức, lên kế hoạch & quản lý quy trình'] },
                { q: 'Trong dự án nhóm, bạn thường đảm nhận vai trò gì?', opts: ['Người phân tích số liệu và đưa ra giải pháp', 'Người sáng tạo nội dung và hình ảnh', 'Người thuyết trình và kết nối thành viên', 'Người điều phối tiến độ và đảm bảo chất lượng'] },
                { q: 'Môi trường làm việc lý tưởng của bạn là gì?', opts: ['Làm với dữ liệu và báo cáo chuyên sâu', 'Làm sáng tạo trong môi trường năng động', 'Làm việc trực tiếp với khách hàng & đối tác', 'Làm theo quy trình có hệ thống và rõ ràng'] },
              ];
              const totalQ = riasecQuestions.length;
              const currentQ = riasecQuestions[currentQuestionIdx];
              const selectedAnswer = careerAnswers[currentQuestionIdx];
              const canContinue = selectedAnswer !== undefined;
              return (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary-accent)' }}>SỞ THÍCH & RIASEC</div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)' }}>Câu {currentQuestionIdx + 1}/{totalQ}</div>
                  </div>
                  
                  {/* Progress bar */}
                  <div style={{ height: '4px', backgroundColor: '#e2e8f0', borderRadius: '2px', marginBottom: '20px', overflow: 'hidden' }}>
                    <div style={{ width: `${((currentQuestionIdx) / totalQ) * 100}%`, height: '100%', backgroundColor: 'var(--primary)', transition: 'width 0.3s' }} />
                  </div>

                  <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '20px', color: 'var(--primary)' }}>{currentQ.q}</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                    {currentQ.opts.map((opt, oIdx) => {
                      const isSelected = selectedAnswer === oIdx;
                      return (
                        <button
                          key={oIdx}
                          onClick={() => setCareerAnswers({ ...careerAnswers, [currentQuestionIdx]: oIdx })}
                          style={{
                            padding: '16px 18px',
                            borderRadius: 'var(--radius-md)',
                            border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                            backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--cream)',
                            textAlign: 'left',
                            fontWeight: 600,
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.15s'
                          }}
                        >
                          <span style={{
                            width: '22px',
                            height: '22px',
                            borderRadius: '50%',
                            border: isSelected ? '2px solid var(--primary)' : '2px solid var(--border-color)',
                            backgroundColor: isSelected ? 'var(--primary)' : 'transparent',
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            {isSelected && <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#fff' }} />}
                          </span>
                          <span style={{ color: isSelected ? 'var(--primary)' : 'var(--text-main)' }}>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {!canContinue && (
                    <div style={{ fontSize: '13px', color: '#d97706', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      ⚠ Vui lòng chọn một đáp án để tiếp tục.
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button
                      onClick={() => {
                        if (currentQuestionIdx > 0) setCurrentQuestionIdx(currentQuestionIdx - 1);
                        else setCareerStep('form');
                      }}
                      style={{ padding: '10px 20px', color: 'var(--text-muted)', fontWeight: 600 }}
                    >← Quay lại</button>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={() => { setCareerAnswers({}); setCurrentQuestionIdx(0); }}
                        style={{ padding: '10px 16px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)', fontWeight: 600, fontSize: '13px' }}
                      >Làm lại</button>
                      <button
                        onClick={() => {
                          if (!canContinue) return;
                          if (currentQuestionIdx < totalQ - 1) setCurrentQuestionIdx(currentQuestionIdx + 1);
                          else setCareerStep('result');
                        }}
                        disabled={!canContinue}
                        style={{
                          padding: '12px 28px',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: canContinue ? 'var(--primary)' : '#9ca3af',
                          color: '#fff',
                          fontWeight: 700,
                          cursor: canContinue ? 'pointer' : 'not-allowed'
                        }}
                      >Tiếp tục →</button>
                    </div>
                  </div>
                </div>
              );
            })()}

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
                  <button
                    onClick={() => { setCareerAnswers({}); setCurrentQuestionIdx(0); setCareerStep('questions'); }}
                    style={{ padding: '10px 20px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)', fontWeight: 700 }}
                  >Làm lại bài test</button>
                  <button onClick={() => { setCareerTestModalOpen(false); setStudentTab('explore'); }} style={{ padding: '10px 24px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700 }}>Xem bản đồ nghề nghiệp →</button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* MODAL XEM TẤT CẢ HOẠT ĐỘNG */}
      {showActivitiesModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 120, padding: '24px' }}>
          <div className="animate-fade-in" style={{ backgroundColor: '#fff', borderRadius: 'var(--radius-xl)', maxWidth: '600px', width: '100%', padding: '32px', position: 'relative', maxHeight: '80vh', overflowY: 'auto' }}>
            <button onClick={() => setShowActivitiesModal(false)} style={{ position: 'absolute', top: '16px', right: '16px', width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={16} /></button>
            <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '4px', color: 'var(--primary)' }}>Tất cả hoạt động</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' }}>Lịch sử hành trình học tập & thực hành của bạn tại NAVIX.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { icon: '✅', label: 'Hoàn thành bài đánh giá nghề nghiệp RIASEC', time: 'Hôm nay, 09:12', score: '89%', color: '#dcfce7', iconColor: 'var(--primary)' },
                { icon: '💼', label: 'Hoàn thành bài mô phỏng – Social Media Campaign (NovaTech)', time: '2 ngày trước, 14:30', score: '8.4/10', color: '#dcfce7', iconColor: 'var(--primary)' },
                { icon: '🗺️', label: 'Hoàn thành lộ trình AI cá nhân hóa – Giai đoạn 1', time: '5 ngày trước, 10:00', score: '100%', color: '#dcfce7', iconColor: 'var(--primary)' },
                { icon: '🎤', label: 'Luyện tập phỏng vấn – Nhân sự / HR Generalist', time: '6 ngày trước, 16:45', score: '8.1/10', color: '#fef3c7', iconColor: '#d97706' },
                { icon: '📄', label: 'Tạo CV và phân tích ATS – Đạt 86% phù hợp', time: '1 tuần trước, 11:20', score: '86%', color: '#dbeafe', iconColor: '#2563eb' },
                { icon: '🎯', label: 'Khám phá bản đồ nghề nghiệp – Brand Marketing', time: '1 tuần trước, 09:00', score: 'Hoàn thành', color: '#f3e8ff', iconColor: '#7c3aed' },
                { icon: '🏆', label: 'Nhận chứng chỉ Career Exploration – NAVIX', time: '10 ngày trước', score: 'Cấp chứng chỉ', color: '#dcfce7', iconColor: 'var(--primary)' }
              ].map((act, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', backgroundColor: 'var(--bg-main)', borderRadius: '10px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: act.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{act.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '2px' }}>{act.label}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{act.time}</div>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 700, padding: '3px 10px', borderRadius: 'var(--radius-full)', backgroundColor: act.color, color: act.iconColor, whiteSpace: 'nowrap' }}>{act.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL MÔ PHỎNG VIỆC LÀM – WORKSPACE */}
      {activeSimModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 120, padding: '24px' }}>
          <div className="animate-fade-in" style={{ backgroundColor: '#fff', borderRadius: 'var(--radius-xl)', maxWidth: '780px', width: '100%', padding: '32px', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            <button onClick={() => { setActiveSimModal(null); setSimEvaluationResult(null); setSimAnswerText(''); }} style={{ position: 'absolute', top: '16px', right: '16px', width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={16} /></button>

            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', marginBottom: '8px', display: 'inline-block' }}>{activeSimModal.status}</span>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--primary)', marginBottom: '4px' }}>{activeSimModal.title}</h2>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{activeSimModal.company} · {activeSimModal.field} · Vị trí: <strong>{activeSimModal.position}</strong> · Hạn nộp: {activeSimModal.deadline}</p>
            </div>

            <div style={{ backgroundColor: 'var(--bg-main)', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary)', marginBottom: '10px' }}>📋 Mô tả nhiệm vụ</h4>
              <p style={{ fontSize: '14px', color: 'var(--text-main)', lineHeight: 1.7, marginBottom: '12px' }}>{activeSimModal.desc}</p>
              <h4 style={{ fontSize: '13px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-main)' }}>Yêu cầu cụ thể:</h4>
              <ul style={{ paddingLeft: '20px', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.8, margin: 0 }}>
                {activeSimModal.tasks?.map((t: string, i: number) => <li key={i}>{t}</li>)}
              </ul>
            </div>

            {!simEvaluationResult ? (
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '10px', color: 'var(--text-main)' }}>✏️ Bài làm của bạn</h4>
                <textarea
                  value={simAnswerText}
                  onChange={e => setSimAnswerText(e.target.value)}
                  placeholder={`Nhập bài làm của bạn cho đề mô phỏng "${activeSimModal.title}" tại đây...`}
                  rows={8}
                  style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '14px', lineHeight: 1.7, resize: 'vertical', marginBottom: '16px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button onClick={() => { setActiveSimModal(null); setSimAnswerText(''); }} style={{ padding: '10px 20px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)', fontWeight: 600 }}>Hủy</button>
                  <button
                    onClick={() => {
                      if (!simAnswerText.trim()) { alert('Vui lòng nhập bài làm trước khi nộp.'); return; }
                      setSimEvaluationResult({
                        score: 8.6,
                        criteria: [
                          { name: 'Tư duy phân tích & logic', score: 9, feedback: 'Bài làm có cấu trúc rõ ràng, phân tích insight đúng hướng.' },
                          { name: 'Tính sáng tạo & đột phá', score: 8, feedback: 'Ý tưởng tốt, có thể bổ sung thêm các kênh đa nền tảng (TikTok, YouTube).' },
                          { name: 'Tính khả thi & thực tiễn', score: 9, feedback: 'Kế hoạch rõ ràng, có thể triển khai thực tế.' },
                          { name: 'Kỹ năng trình bày & thuyết phục', score: 8, feedback: 'Trình bày mạch lạc, cần bổ sung dữ liệu cụ thể hơn.' }
                        ],
                        overall: 'Bài làm xuất sắc! Bạn thể hiện tốt tư duy Marketing chiến lược và khả năng triển khai thực tế. Nhà tuyển dụng NovaTech đánh giá cao khả năng phân tích Gen Z Insight của bạn.'
                      });
                    }}
                    style={{ padding: '12px 28px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700, fontSize: '15px', cursor: 'pointer' }}
                  >📤 Nộp bài & Chấm điểm AI</button>
                </div>
              </div>
            ) : (
              <div className="animate-fade-in">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', padding: '20px', backgroundColor: 'var(--primary-light)', borderRadius: '12px' }}>
                  <div style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '22px', flexShrink: 0 }}>
                    {simEvaluationResult.score}
                  </div>
                  <div>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary)' }}>Kết quả chấm điểm AI</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Điểm tổng: {simEvaluationResult.score}/10 — Xuất sắc</div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                  {simEvaluationResult.criteria.map((c: any, i: number) => (
                    <div key={i} style={{ padding: '14px 16px', backgroundColor: 'var(--bg-main)', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)' }}>{c.name}</span>
                        <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary)' }}>{c.score}/10</span>
                      </div>
                      <div style={{ height: '4px', backgroundColor: '#e2e8f0', borderRadius: '2px', overflow: 'hidden', marginBottom: '6px' }}>
                        <div style={{ width: `${c.score * 10}%`, height: '100%', backgroundColor: 'var(--primary)' }} />
                      </div>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>{c.feedback}</p>
                    </div>
                  ))}
                </div>

                <div style={{ padding: '16px 20px', backgroundColor: '#fff', border: '1px solid var(--primary-border)', borderRadius: '10px', marginBottom: '16px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--primary)', marginBottom: '6px' }}>💬 Nhận xét tổng thể từ AI Mentor</div>
                  <p style={{ fontSize: '13px', color: 'var(--text-main)', lineHeight: 1.7, margin: 0 }}>{simEvaluationResult.overall}</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button onClick={() => { setSimEvaluationResult(null); setSimAnswerText(''); }} style={{ padding: '10px 20px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)', fontWeight: 600 }}>Làm lại</button>
                  <button onClick={() => { setActiveSimModal(null); setSimEvaluationResult(null); setSimAnswerText(''); }} style={{ padding: '12px 24px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary)', color: '#fff', fontWeight: 700 }}>Hoàn thành ✓</button>
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
