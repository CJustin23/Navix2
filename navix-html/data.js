// Dữ liệu Mock
const jobMapsDetails = {
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

const interviewQuestionsMap = {
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
