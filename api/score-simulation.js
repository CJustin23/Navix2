const { normalizeVietnameseText, applyCors, readJsonBody, clampText, callOpenAIChatJSON } = require('./_lib/shared');

const MAX_ANSWER_LENGTH = 6000;

const SIMULATION_STOP_WORDS = new Set([
  'va', 'hoac', 'nhung', 'cua', 'cho', 'voi', 'the', 'mot', 'cac', 'trong', 'de', 'duoc', 'co', 'la', 'thi', 'o', 'tai', 'tu', 'den', 'nay', 'do', 'ban', 'minh', 'nguoi', 'viec', 'dua', 'theo'
]);

const SIMULATION_RUBRIC = [
  { name: 'Đúng yêu cầu đề bài', maxScore: 40 },
  { name: 'Lập luận & tổ chức', maxScore: 30 },
  { name: 'Sáng tạo & khả thi', maxScore: 20 },
  { name: 'Trình bày & chính tả', maxScore: 10 }
];

function clampScore(value, min, max) {
  return Math.min(max, Math.max(min, Math.round(Number(value) || 0)));
}

function uniqueValues(values) {
  return Array.from(new Set(values.filter(Boolean)));
}

function extractKeywordsFromText() {
  const parts = Array.from(arguments).filter(Boolean);
  const words = parts
    .flatMap(part => normalizeVietnameseText(part).split(' '))
    .filter(word => word.length > 3 && !SIMULATION_STOP_WORDS.has(word) && !/^\d+$/.test(word));
  return uniqueValues(words).slice(0, 24);
}

function getSimulationScoreLabel(score) {
  if (score >= 90) return 'Xuất sắc';
  if (score >= 80) return 'Rất tốt';
  if (score >= 70) return 'Tốt';
  if (score >= 60) return 'Khá';
  if (score >= 50) return 'Đạt';
  return 'Cần cải thiện';
}

function buildSimulationReferenceAnswer(payload) {
  const taskLines = (payload.tasks || []).map((task, index) => `${index + 1}. ${task}`).join('\n');
  return [
    `Bài làm nên bám sát mô tả nhiệm vụ của ${payload.title || 'đề bài'}.`,
    taskLines ? `Các ý bắt buộc cần có:\n${taskLines}` : '',
    'Phần kết luận cần chốt rõ phương án xử lý, nêu cơ sở từ dữ liệu đề và trình bày mạch lạc theo từng ý lớn.',
    'Nếu đề yêu cầu số liệu, hãy nêu con số cụ thể; nếu đề yêu cầu giải pháp, hãy tách rõ nguyên nhân, phương án và tác động kỳ vọng.'
  ].filter(Boolean).join('\n\n');
}

function buildLocalSimulationEvaluation(payload) {
  const answerText = String(payload.answer || '');
  const normalizedAnswer = normalizeVietnameseText(answerText);
  const keywords = extractKeywordsFromText(payload.title, payload.company, payload.field, payload.position, payload.desc, ...(payload.tasks || []));
  const matchedKeywords = keywords.filter(keyword => normalizedAnswer.includes(keyword));
  const coverage = keywords.length ? matchedKeywords.length / keywords.length : 0;

  const paragraphs = answerText.split(/\n\s*\n/).map(part => part.trim()).filter(Boolean);
  const bulletLines = answerText.split('\n').filter(line => /^\s*[-•*]/.test(line));
  const numberMentions = (answerText.match(/\d+/g) || []).length;
  const creativeSignals = ['ý tưởng', 'giải pháp', 'kế hoạch', 'insight', 'phương án', 'cta', 'kpi', 'ngân sách', 'triển khai', 'khả thi', 'thông điệp'].filter(word => normalizedAnswer.includes(word)).length;

  const requirementScore = clampScore(12 + coverage * 28 + Math.min(numberMentions, 4) * 0.5, 0, 40);
  const logicScore = clampScore(10 + Math.min(paragraphs.length, 4) * 4 + Math.min(bulletLines.length, 4) * 3 + coverage * 6, 0, 30);
  const creativityScore = clampScore(6 + creativeSignals * 2.2 + (normalizedAnswer.includes('ví dụ') ? 2 : 0), 0, 20);
  const presentationScore = clampScore(4 + Math.min(answerText.length / 140, 4) + (paragraphs.length >= 2 ? 2 : 0) + (answerText.includes('.') ? 1 : 0), 0, 10);
  const totalScore = requirementScore + logicScore + creativityScore + presentationScore;

  const criteria = [
    {
      name: SIMULATION_RUBRIC[0].name,
      score: requirementScore,
      maxScore: SIMULATION_RUBRIC[0].maxScore,
      feedback: matchedKeywords.length
        ? `Bài làm đã chạm ${matchedKeywords.length}/${keywords.length || 1} ý quan trọng của đề.`
        : 'Bài làm chưa bám đủ các ý bắt buộc trong mô tả đề.'
    },
    {
      name: SIMULATION_RUBRIC[1].name,
      score: logicScore,
      maxScore: SIMULATION_RUBRIC[1].maxScore,
      feedback: paragraphs.length >= 2
        ? 'Bố cục có nhiều ý tách đoạn, luồng lập luận tương đối dễ theo dõi.'
        : 'Nên chia nhỏ ý hơn để AI dễ kiểm tra lập luận và trình bày.'
    },
    {
      name: SIMULATION_RUBRIC[2].name,
      score: creativityScore,
      maxScore: SIMULATION_RUBRIC[2].maxScore,
      feedback: creativeSignals >= 3
        ? 'Có nhiều dấu hiệu cho thấy bài làm đã chủ động đề xuất giải pháp riêng.'
        : 'Có thể thêm ý tưởng hoặc phương án cụ thể để bài làm thuyết phục hơn.'
    },
    {
      name: SIMULATION_RUBRIC[3].name,
      score: presentationScore,
      maxScore: SIMULATION_RUBRIC[3].maxScore,
      feedback: answerText.length > 400
        ? 'Độ dài và cách triển khai nhìn chung phù hợp với một bài mô phỏng hoàn chỉnh.'
        : 'Nên bổ sung chi tiết và ví dụ để bài làm đầy đủ hơn.'
    }
  ];

  const strengths = [
    requirementScore >= 24 ? 'Bám được một phần các ý cốt lõi của đề bài.' : 'Thể hiện được hướng xử lý cơ bản của đề.',
    logicScore >= 18 ? 'Cách trình bày có cấu trúc và dễ đọc.' : 'Có cố gắng tổ chức ý theo từng đoạn.'
  ];

  const improvements = [
    requirementScore < 24 ? 'Bổ sung thêm các ý bắt buộc còn thiếu trong đề.' : 'Đào sâu hơn vào các ý quan trọng để tăng độ thuyết phục.',
    creativityScore < 12 ? 'Thêm giải pháp hoặc góc nhìn mới thay vì chỉ diễn giải lại đề.' : 'Làm rõ hơn cơ sở của từng giải pháp bằng dữ liệu hoặc ví dụ.',
    presentationScore < 7 ? 'Rút gọn những phần lan man và chia đoạn rõ hơn.' : 'Kiểm tra lại chính tả, số liệu và tính nhất quán.'
  ];

  return {
    score: totalScore,
    criteria,
    strengths,
    improvements,
    overall: `${getSimulationScoreLabel(totalScore)}. Bài làm cho thấy bạn đã nắm được một phần yêu cầu của đề, nhưng vẫn cần cải thiện để làm rõ lập luận, tăng độ cụ thể và bám sát tiêu chí chấm hơn.`,
    referenceAnswer: buildSimulationReferenceAnswer(payload),
    source: 'local'
  };
}

function normalizeOpenAIResponse(responseJson, fallback) {
  const payload = responseJson && typeof responseJson === 'object' ? responseJson : {};
  const criteria = Array.isArray(payload.criteria)
    ? payload.criteria.map((criterion, index) => ({
        name: criterion?.name || SIMULATION_RUBRIC[index]?.name || `Tiêu chí ${index + 1}`,
        score: clampScore(criterion?.score, 0, Number(criterion?.maxScore ?? SIMULATION_RUBRIC[index]?.maxScore ?? 10)),
        maxScore: Number(criterion?.maxScore ?? SIMULATION_RUBRIC[index]?.maxScore ?? 10),
        feedback: String(criterion?.feedback || '')
      }))
    : fallback.criteria;

  return {
    score: clampScore(payload.score ?? payload.totalScore ?? fallback.score, 0, 100),
    criteria,
    strengths: Array.isArray(payload.strengths) && payload.strengths.length ? payload.strengths : fallback.strengths,
    improvements: Array.isArray(payload.improvements) && payload.improvements.length ? payload.improvements : fallback.improvements,
    overall: String(payload.overall || fallback.overall),
    referenceAnswer: String(payload.referenceAnswer || fallback.referenceAnswer),
    source: 'ai'
  };
}

async function evaluateWithOpenAI(payload) {
  const fallback = buildLocalSimulationEvaluation(payload);

  const systemPrompt = [
    'Bạn là một AI chấm bài mô phỏng nghề nghiệp bằng tiếng Việt.',
    'Chấm rất sát đề bài và chỉ dựa vào nội dung người dùng đã nộp.',
    'Bắt buộc trả về JSON hợp lệ với các khóa: score, criteria, strengths, improvements, overall, referenceAnswer, source.',
    'score là tổng điểm trên thang 100.',
    'criteria là mảng gồm 4 mục tương ứng: Đúng yêu cầu đề bài (40), Lập luận & tổ chức (30), Sáng tạo & khả thi (20), Trình bày & chính tả (10).',
    'Mỗi criterion phải có name, score, maxScore, feedback.',
    'strengths và improvements là mảng chuỗi ngắn gọn.',
    'referenceAnswer là đáp án / phương án tham khảo ngắn, rõ ràng.'
  ].join(' ');

  const userPrompt = JSON.stringify({
    title: payload.title,
    company: payload.company,
    field: payload.field,
    position: payload.position,
    desc: payload.desc,
    tasks: payload.tasks || [],
    answer: payload.answer,
    rubric: SIMULATION_RUBRIC
  }, null, 2);

  const parsed = await callOpenAIChatJSON({ systemPrompt, userContent: userPrompt });
  // No OPENAI_API_KEY configured: silently use the local rubric-based score.
  if (!parsed) return fallback;

  return normalizeOpenAIResponse(parsed, fallback);
}

module.exports = async function handler(req, res) {
  applyCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const payload = readJsonBody(req);
  if (typeof payload.answer === 'string') payload.answer = clampText(payload.answer, MAX_ANSWER_LENGTH);

  try {
    const evaluation = await evaluateWithOpenAI(payload);
    return res.status(200).json(evaluation);
  } catch (error) {
    const fallback = buildLocalSimulationEvaluation(payload);
    return res.status(200).json({
      ...fallback,
      source: 'local',
      note: error?.message || 'Fallback to local scoring'
    });
  }
};
