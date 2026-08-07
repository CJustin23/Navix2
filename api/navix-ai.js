function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s%.-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isLowSignalMessage(message) {
  const normalized = normalize(message);
  if (!normalized) return true;

  const words = normalized.split(' ').filter(Boolean);
  const hasCareerSignal = /\b(cv|resume|job|phong van|interview|mo phong|luyen|star|jd|ats|nghe|nganh|hoc|hoc viec|roadmap|lo trinh)\b/.test(normalized);
  const hasEnoughLength = normalized.length >= 8;

  return !hasCareerSignal && (!hasEnoughLength || words.length < 2);
}

function buildRoadmapChat(payload) {
  const message = normalize(payload.message);
  const position = payload?.context?.selectedPosition || 'vị trí bạn mong muốn';
  const domain = payload?.context?.selectedDomain || 'lĩnh vực phù hợp';
  if (isLowSignalMessage(message)) {
    return {
      text: 'Mình chưa hiểu rõ ý bạn. Hãy nhập cụ thể hơn, ví dụ: ngành bạn muốn vào, vị trí bạn muốn hướng tới, hoặc việc bạn muốn AI hỗ trợ như CV, mô phỏng hay phỏng vấn.',
      actionBtns: [
        { label: 'Xây dựng CV ngay', targetTab: 'cv' },
        { label: 'Luyện tập phỏng vấn', targetTab: 'interview' },
        { label: 'Trải nghiệm ngay (Mô phỏng)', targetTab: 'simulation' }
      ],
      source: 'local'
    };
  }

  const needsSimulation = /thuc hanh|mo phong|bai tap|luyen|test/.test(message);
  const needsCv = /cv|resume|ho so|jd|ats/.test(message);
  const needsInterview = /phong van|interview|tra loi|star/.test(message);

  const text = [
    `Mình đã đọc mục tiêu của bạn cho ${position} trong nhóm ${domain}.`,
    'Hướng đi hợp lý nhất lúc này là chia thành 3 bước: chốt năng lực cốt lõi, viết lại CV theo JD, và luyện 1 bài mô phỏng sát công việc thật.',
    'Nếu bạn muốn tăng tốc, hãy làm theo thứ tự: 1) mô phỏng, 2) CV, 3) phỏng vấn.'
  ].join(' ');

  const actionBtns = [
    ...(needsSimulation ? [{ label: 'Trải nghiệm ngay (Mô phỏng)', targetTab: 'simulation' }] : []),
    ...(needsCv ? [{ label: 'Xây dựng CV ngay', targetTab: 'cv' }] : []),
    ...(needsInterview ? [{ label: 'Luyện tập phỏng vấn', targetTab: 'interview' }] : []),
    { label: 'Khám phá nghề nghiệp', targetTab: 'explore' }
  ];

  return { text, actionBtns };
}

function buildStarHint(payload) {
  const question = String(payload.question || '');
  if (isLowSignalMessage(question)) {
    return {
      text: 'Bạn hãy nhập câu hỏi cụ thể hơn để mình gợi ý theo STAR, ví dụ: “Hãy giúp tôi trả lời câu hỏi về mâu thuẫn với đồng đội” hoặc “Cho tôi một ví dụ STAR về xử lý deadline gấp”.',
      sampleAnswer: 'Ví dụ câu hỏi tốt: Hãy giúp tôi trả lời câu hỏi “Bạn đã xử lý một deadline gấp như thế nào?” theo khung STAR.',
      source: 'local'
    };
  }

  const position = payload?.context?.selectedPosition || 'vị trí đang luyện';
  const domain = payload?.context?.selectedDomain || 'lĩnh vực đang chọn';

  return {
    text: [
      `Câu hỏi: ${question}`,
      `Gợi ý trả lời cho ${position} trong ${domain}:`,
      'S - nêu bối cảnh ngắn gọn, T - nêu nhiệm vụ, A - nêu hành động cụ thể, R - nêu kết quả hoặc bài học.',
      'Nhớ thêm 1 ví dụ thật và 1 con số nếu có.'
    ].join('\n\n'),
    sampleAnswer: 'Ví dụ: Trong dự án gần nhất, tôi được giao xử lý một đầu việc có deadline gấp. Tôi đã chia nhỏ nhiệm vụ, phối hợp với các bên liên quan và hoàn thành đúng hạn. Kết quả là đầu việc được bàn giao đúng tiến độ và nhận phản hồi tích cực từ team.',
    source: 'local'
  };
}

function buildInterviewFeedback(payload) {
  const answer = String(payload.answer || '');
  const length = answer.trim().length;
  if (isLowSignalMessage(answer) || length < 12) {
    return {
      score: 0,
      strengths: ['Bạn đã mở phần trả lời, nhưng chưa đủ thông tin để chấm.'],
      improvements: ['Hãy viết dài hơn và cụ thể hơn theo STAR.', 'Thêm bối cảnh, hành động và kết quả rõ ràng.'],
      overall: 'Mình chưa thể đánh giá vì câu trả lời quá ngắn hoặc chưa đủ ngữ cảnh. Hãy nhập một câu trả lời đầy đủ hơn để AI chấm chính xác.',
      referenceAnswer: 'Ví dụ: Trong dự án gần nhất, tôi được giao xử lý một đầu việc có deadline gấp. Tôi đã chia nhỏ nhiệm vụ, phối hợp với team và hoàn thành đúng hạn, giúp dự án bàn giao suôn sẻ.',
      source: 'local'
    };
  }

  const score = length > 180 ? 86 : length > 90 ? 76 : length > 30 ? 68 : 55;
  return {
    score,
    strengths: length > 120 ? ['Có liên hệ được câu trả lời với bối cảnh công việc.', 'Cấu trúc trả lời khá rõ ràng.'] : ['Bạn đã có hướng trả lời đúng câu hỏi.'],
    improvements: length > 120 ? ['Bổ sung số liệu, kết quả cụ thể hơn.', 'Nhấn mạnh vai trò cá nhân rõ hơn.'] : ['Nên mở rộng theo STAR và thêm ví dụ cụ thể.', 'Bổ sung kết quả đo lường để tăng độ thuyết phục.'],
    overall: length ? 'AI đánh giá câu trả lời của bạn có nền tảng tốt, nhưng vẫn cần sắc nét hơn ở phần dẫn chứng và kết quả.' : 'Bạn chưa nhập câu trả lời chi tiết. Hãy thử trả lời theo khung STAR để AI chấm chính xác hơn.',
    referenceAnswer: 'S - Bối cảnh: nêu tình huống thật ngắn gọn.\nT - Nhiệm vụ: nói rõ mục tiêu hoặc trách nhiệm.\nA - Hành động: trình bày bạn đã làm gì.\nR - Kết quả: chốt bằng kết quả đo lường hoặc bài học.',
    source: 'local'
  };
}

async function callOpenAI(mode, payload) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const model = process.env.OPENAI_MODEL || 'gpt-4.1-mini';
  const prompt = JSON.stringify({ mode, payload }, null, 2);
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: 'Bạn là trợ lý AI cho nền tảng hướng nghiệp NAVIX. Trả về JSON hợp lệ, ngắn gọn, hữu ích và bằng tiếng Việt.'
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.2
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI error ${response.status}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  return content ? JSON.parse(content) : null;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const mode = body.mode;

    const openAIResult = await callOpenAI(mode, body);
    if (openAIResult) {
      return res.status(200).json({ ...openAIResult, source: 'ai' });
    }

    if (mode === 'roadmap-chat') {
      return res.status(200).json(buildRoadmapChat(body));
    }

    if (mode === 'star-hint') {
      return res.status(200).json(buildStarHint(body));
    }

    if (mode === 'interview-feedback') {
      return res.status(200).json(buildInterviewFeedback(body));
    }

    return res.status(200).json({ text: 'Mình chưa nhận diện được yêu cầu, nhưng vẫn có thể hỗ trợ bạn theo ngữ cảnh hiện tại.', source: 'local' });
  } catch (error) {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    if (body.mode === 'roadmap-chat') return res.status(200).json(buildRoadmapChat(body));
    if (body.mode === 'star-hint') return res.status(200).json(buildStarHint(body));
    if (body.mode === 'interview-feedback') return res.status(200).json(buildInterviewFeedback(body));
    return res.status(200).json({ text: 'Đã chuyển sang chế độ dự phòng nội bộ.', source: 'local', note: error?.message || 'fallback' });
  }
};
