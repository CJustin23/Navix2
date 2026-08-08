const { normalizeVietnameseText, applyCors, readJsonBody, clampText, callOpenAIChatJSON } = require('./_lib/shared');

const MAX_INPUT_LENGTH = 4000;

function isLowSignalMessage(message) {
  const normalized = normalizeVietnameseText(message);
  if (!normalized) return true;

  const words = normalized.split(' ').filter(Boolean);
  const hasCareerSignal = /\b(cv|resume|job|phong van|interview|mo phong|luyen|star|jd|ats|nghe|nganh|hoc|hoc viec|roadmap|lo trinh)\b/.test(normalized);
  const hasEnoughLength = normalized.length >= 8;

  return !hasCareerSignal && (!hasEnoughLength || words.length < 2);
}

function buildRoadmapChat(payload) {
  const message = normalizeVietnameseText(payload.message);
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

  return { text, actionBtns, source: 'local' };
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

function buildFallback(mode, body) {
  if (mode === 'roadmap-chat') return buildRoadmapChat(body);
  if (mode === 'star-hint') return buildStarHint(body);
  if (mode === 'interview-feedback') return buildInterviewFeedback(body);
  return { text: 'Mình chưa nhận diện được yêu cầu, nhưng vẫn có thể hỗ trợ bạn theo ngữ cảnh hiện tại.', source: 'local' };
}

async function requestAI(mode, payload) {
  return callOpenAIChatJSON({
    systemPrompt: 'Bạn là trợ lý AI cho nền tảng hướng nghiệp NAVIX. Trả về JSON hợp lệ, ngắn gọn, hữu ích và bằng tiếng Việt.',
    userContent: JSON.stringify({ mode, payload }, null, 2)
  });
}

module.exports = async function handler(req, res) {
  applyCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = readJsonBody(req);
  const mode = body.mode;
  if (typeof body.message === 'string') body.message = clampText(body.message, MAX_INPUT_LENGTH);
  if (typeof body.question === 'string') body.question = clampText(body.question, MAX_INPUT_LENGTH);
  if (typeof body.answer === 'string') body.answer = clampText(body.answer, MAX_INPUT_LENGTH);

  try {
    const aiResult = await requestAI(mode, body);
    if (aiResult) {
      return res.status(200).json({ ...aiResult, source: 'ai' });
    }
    return res.status(200).json(buildFallback(mode, body));
  } catch (error) {
    return res.status(200).json({ ...buildFallback(mode, body), note: error?.message || 'fallback' });
  }
};
