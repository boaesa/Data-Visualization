import { useState } from "react";

// ─────────────────────────────────────────────
// 16문항 데이터
// 각 질문은 두 선택지 중 하나를 고르며 axis(축)와 value(값)을 가짐
// ─────────────────────────────────────────────
const QUESTIONS = [
  // W / A — 의사소통능력·수리능력 (4문항)
  {
    id: 1, axis: "WA", step: 1,
    text: "팀 회의에서 새로운 아이디어를 던질 때, 어떤 방식이 더 편하신가요?",
    a: { label: "사람들이 고개를 끄덕일 수 있게 생생한 사례를 든다", value: "W" },
    b: { label: "반박할 수 없도록 정확한 수치와 데이터를 띄운다", value: "A" },
  },
  {
    id: 2, axis: "WA", step: 1,
    text: "다른 사람의 동의를 구해야 해요. 당신의 필살기는?",
    a: { label: "감정을 건드리는 스토리로 마음을 연다", value: "W" },
    b: { label: "군더더기 없는 논리와 데이터로 설득한다", value: "A" },
  },
  {
    id: 3, axis: "WA", step: 1,
    text: "중요한 보고서의 마감 직전, 마지막으로 다듬는 부분은?",
    a: { label: "읽는 이가 쉽게 이해할 수 있는 자연스러운 흐름", value: "W" },
    b: { label: "숫자 하나라도 틀리지 않았는지 데이터 교차 검증", value: "A" },
  },
  {
    id: 4, axis: "WA", step: 1,
    text: "내 의견이 통했다!하고 짜릿했던 기억은 언제인가요?",
    a: { label: "내 이야기에 사람들이 깊이 공감해 줬을 때", value: "W" },
    b: { label: "내가 준비한 근거가 완벽하게 들어맞았을 때", value: "A" },
  },

  // F / G — 적응학습능력·경력개발능력 (4문항)
  {
    id: 5, axis: "FG", step: 2,
    text: "새로운 툴이나 생성형 AI가 유행하기 시작했어요. 가장 먼저 드는 생각은?",
    a: { label: "재밌겠다! 일단 깔아서 이것저것 눌러본다", value: "F" },
    b: { label: "진짜 업무에 도움이 되는지 다른 사람들의 후기를 본다", value: "G" },
  },
  {
    id: 6, axis: "FG", step: 2,
    text: "속해 있는 업계에 큰 변화의 바람이 불고 있습니다.",
    a: { label: "변화는 기회지, 가장 먼저 움직여서 선점한다", value: "F" },
    b: { label: "상황을 예의주시하며 리스크를 줄일 방법을 찾는다", value: "G" },
  },
  {
    id: 7, axis: "FG", step: 2,
    text: "이직이나 새로운 커리어를 고민할 때, 나의 선택 기준은?",
    a: { label: "마음이 끌리고 성장 가능성이 보이면 과감하게 GO", value: "F" },
    b: { label: "안정적이고 확실한 커리어 패스가 보일 때 신중하게 GO", value: "G" },
  },
  {
    id: 8, axis: "FG", step: 2,
    text: "야심 차게 준비한 프로젝트가 예상과 다르게 엎어졌을 때,",
    a: { label: "아쉽지만 어쩔 수 없네, 빠른 인정 후 다음 스텝으로", value: "F" },
    b: { label: "왜 실패했지? 원인을 끝까지 파헤치고 오답 노트를 적는다", value: "G" },
  },

  // L / R — 문제해결능력·대인관계능력 (4문항)
  {
    id: 9, axis: "LR", step: 3,
    text: "갑자기 골치 아픈 문제가 터졌습니다. 가장 먼저 하는 행동은?",
    a: { label: "왜 이런 일이 생겼는지 머릿속으로 프로세스를 분해한다", value: "L" },
    b: { label: "이 문제를 풀 수 있는 담당자에게 메신저부터 켠다", value: "R" },
  },
  {
    id: 10, axis: "LR", step: 3,
    text: "나 없이 팀 프로젝트가 돌아갈 수 있을까? 만약 그렇다면 내가 빠졌을 때 아쉬울 부분은?",
    a: { label: "흔들림 없는 프로젝트의 뼈대와 규칙", value: "L" },
    b: { label: "팀원들을 하나로 묶어주던 단단한 유대감", value: "R" },
  },
  {
    id: 11, axis: "LR", step: 3,
    text: "팀원과 의견 충돌이 발생했습니다. 나는 어떻게 상황을 풀어나갈까요?",
    a: { label: "감정을 배제하고 상황을 객관적으로 분석해 더 나은 대안을 찾는다", value: "L" },
    b: { label: "저 사람이 왜 저렇게 생각했을까? 입장과 감정을 먼저 헤아린다", value: "R" },
  },
  {
    id: 12, axis: "LR", step: 3,
    text: "지금까지 커리어에서 의미 있는 성과를 냈을 때, 제일 컸던 나의 무기는?",
    a: { label: "빈틈없이 짜인 전략과 실행력", value: "L" },
    b: { label: "나를 믿고 움직여준 사람들의 힘", value: "R" },
  },

  // D / N — 자기관리능력·협업능력·디지털능력 (4문항)
  {
    id: 13, axis: "DN", step: 4,
    text: "내가 일할 때 가장 몰입이 잘 되고 에너지가 솟는 순간은?",
    a: { label: "방해 없이 혼자서 한 가지 문제에 깊게 빠져들 때", value: "D" },
    b: { label: "티키타카가 잘 맞는 사람들과 아이디어를 주고받을 때", value: "N" },
  },
  {
    id: 14, axis: "DN", step: 4,
    text: "앞으로 나의 가치를 가장 높여줄 자산은 무엇일까요?",
    a: { label: "누구도 쉽게 따라 할 수 없는 나만의 압도적 전문성", value: "D" },
    b: { label: "언제든 필요한 도움을 주고받을 수 있는 탄탄한 인적 네트워크", value: "N" },
  },
  {
    id: 15, axis: "DN", step: 4,
    text: "맨 땅에 헤딩하듯 새로운 프로젝트를 맡았습니다.",
    a: { label: "혼자 구글링하고 관련 책을 쌓아두며 지식을 흡수한다", value: "D" },
    b: { label: "그 분야를 잘 아는 사람을 수소문해 만나서 배운다", value: "N" },
  },
  {
    id: 16, axis: "DN", step: 4,
    text: "AI가 내 일의 절반을 해내는 시대가 온다면,",
    a: { label: "AI가 절대 대체할 수 없는 더 고차원적인 나만의 기술을 연마한다", value: "D" },
    b: { label: "내가 가진 인맥과 AI를 융합해서 새로운 비즈니스를 기획한다", value: "N" },
  },
];

// ─────────────────────────────────────────────
// 16가지 CAVE 유형 정의
// ─────────────────────────────────────────────
const TYPES = {
  WFLD: {
    name: "독립적 개척자", eng: "Fire Architect",
    emoji: "🔥",
    color: "from-orange-500 to-red-600",
    badge: "coral",
    tagline: "스토리로 사람을 이끌고, 홀로 나의 길을 개척한다",
    desc: "남들이 가지 않은 길을 가장 먼저 걷는 사람이에요. 감정을 움직이는 이야기로 주변을 설득하고, 혼자만의 깊이 있는 몰입으로 새로운 영역을 뚫어냅니다. AI 시대에는 자신만의 독특한 세계관을 구축하는 선구자가 될 거예요.",
    survival: "생성형 AI로 아이디어를 기획하고, 나만의 오리지널 콘텐츠나 철학을 만들어보세요.",
    risk: "혼자 너무 멀리 나가면 외로워질 수 있어요. 가끔은 사람들과 주파수를 맞춰보세요.",
    keyword: ["몰입", "스토리텔링", "개척자", "독창적"],
  },
  WFLN: {
    name: "변화의 중심", eng: "Spark Connector",
    emoji: "✨",
    color: "from-pink-500 to-orange-400",
    badge: "coral",
    tagline: "스토리로 사람을 모으고, 빠르게 판을 키운다",
    desc: "어디서든 이야기의 중심이 되고 판을 벌이는 사람이에요. 머리보단 행동이 앞서며, 매력적인 내러티브로 사람들을 끌어모아 순식간에 분위기를 주도합니다. AI 시대에는 새로운 트렌드를 가장 먼저 퍼뜨리는 메신저가 될 거예요.",
    survival: "SNS나 커뮤니티 등 사람들이 모이는 플랫폼에서 나의 영향력을 테스트해보세요.",
    risk: "판을 너무 많이 벌리면 수습하기 힘들 수 있어요. 무엇이 진짜 중요한지 코어 하나는 남겨두세요.",
    keyword: ["커뮤니티", "실행력", "메신저", "인플루언서"],
  },
  WFRD: {
    name: "깊은 공감자", eng: "Empathy Pioneer",
    emoji: "💫",
    color: "from-rose-400 to-pink-600",
    badge: "coral",
    tagline: "마음으로 이해하고, 단단한 신뢰를 구축한다",
    desc: "타인의 숨겨진 감정까지 헤아릴 줄 아는 사람이에요. 차가운 논리보다는 따뜻한 공감을 우선시하며, 조급해하지 않고 사람들과 깊은 관계를 쌓아갑니다. AI가 아무리 발달해도 도달할 수 없는 섬세한 인간 영역의 전문가예요.",
    survival: "상담, 코칭, 교육 등 사람의 마음을 치유하고 이끌어주는 일에서 대체 불가능해질 수 있어요.",
    risk: "경계선 없이 공감하다 내가 지칠 수 있어요. 나를 먼저 지키는 단단함도 필요해요.",
    keyword: ["공감", "치유", "진정성", "멘토"],
  },
  WFRN: {
    name: "유대의 설계자", eng: "Culture Igniter",
    emoji: "🌟",
    color: "from-fuchsia-500 to-rose-400",
    badge: "coral",
    tagline: "공감으로 사람을 잇고, 조직의 온도를 만든다",
    desc: "모두가 소외되지 않도록 끈끈한 유대감을 빚어내는 사람이에요. 사람들의 마음에 불을 지피는 스토리로 흩어진 개개인을 하나의 공동체로 묶어냅니다. 삭막한 AI 시대에 조직 문화를 따뜻하게 유지하는 핵심 역할을 할 거예요.",
    survival: "조직 내 소통을 원활하게 돕는 징검다리 역할이나, 문화를 기획하는 일을 눈여겨보세요.",
    risk: "모두를 만족시키는 완벽한 조직은 없어요. 때로는 미움받을 용기가 필요할 때도 있어요.",
    keyword: ["조직문화", "연결", "따뜻함", "분위기메이커"],
  },
  WGLD: {
    name: "은밀한 기획자", eng: "Precision Narrator",
    emoji: "🎯",
    color: "from-teal-500 to-cyan-600",
    badge: "teal",
    tagline: "돌다리도 두들긴 후, 나만의 정교한 서사를 짠다",
    desc: "감성과 이성이 완벽하게 균형을 이루는 사람이에요. 겉으로는 감성적이지만 속으로는 철저하게 실패 확률을 계산하며 홀로 깊이 몰두합니다. 검증된 사실만을 바탕으로 누구도 반박할 수 없는 단단한 스토리를 만들어내죠.",
    survival: "수많은 정보 중에서 진짜를 골라내 의미 있는 인사이트로 가공하는 기획자가 되어보세요.",
    risk: "준비가 길어지면 타이밍을 놓쳐요. 100%가 아니어도 세상에 꺼내놓고 수정해보세요.",
    keyword: ["기획가", "신중함", "완벽주의", "인사이트"],
  },
  WGLN: {
    name: "조용한 연결자", eng: "Trust Networker",
    emoji: "🤝",
    color: "from-cyan-500 to-teal-400",
    badge: "teal",
    tagline: "가벼운 인연 대신, 좁고 깊게 검증된 신뢰망을 짠다",
    desc: "아무하고나 손잡지 않지만, 한번 잡은 손은 절대 놓지 않는 사람이에요. 화려한 달변가는 아니더라도 진정성 있는 태도로 천천히 두터운 신뢰를 쌓아나갑니다. 위기 상황일수록 당신의 진가가 가장 빛을 발할 거예요.",
    survival: "단기적인 실적보다는 장기적인 파트너십을 관리하고 유지하는 역할에서 당신은 최고입니다.",
    risk: "너무 조심스럽게 접근하다 좋은 인연을 놓칠지도 몰라요. 조금은 가벼운 만남도 허용해보세요.",
    keyword: ["신뢰", "파트너십", "진정성", "의리"],
  },
  WGRD: {
    name: "따뜻한 지킴이", eng: "Human Guardian",
    emoji: "🛡️",
    color: "from-emerald-500 to-teal-600",
    badge: "teal",
    tagline: "익숙함을 무기로 내 사람과 내 영역을 단단히 지킨다",
    desc: "급변하는 세상 속에서도 변하지 않는 가치를 수호하는 사람이에요. 화려한 변화나 혁신보다는 지금 내 곁에 있는 사람들의 안녕과 일상의 평화를 지키는 데 집중합니다. 모두가 불안한 AI 시대에 든든한 쉼터가 되어줍니다.",
    survival: "사회복지, 돌봄, 안전 등 인간의 가장 기본적인 삶을 보살피고 유지하는 일에 큰 강점이 있어요.",
    risk: "변화를 무조건 거부하면 시대에 뒤처질 수 있어요. 일상을 지키기 위한 최소한의 도구는 익혀보세요.",
    keyword: ["안정", "수호자", "변함없는", "보살핌"],
  },
  WGRN: {
    name: "튼튼한 뿌리", eng: "Community Architect",
    emoji: "🏛️",
    color: "from-green-500 to-emerald-600",
    badge: "teal",
    tagline: "서두르지 않고 차근차근, 무너지지 않는 공동체를 세운다",
    desc: "모레 위에 성을 쌓지 않는 사람이에요. 당장의 눈부신 성과보다 시간이 걸려도 단단하고 안정적인 시스템을 선호합니다. 당신을 중심으로 끈끈하게 연결된 사람들은 어떤 위기가 와도 쉽게 무너지지 않는 강한 공동체가 됩니다.",
    survival: "NGO, 협동조합, 로컬 비즈니스처럼 가치를 공유하는 지속 가능한 커뮤니티를 설계해보세요.",
    risk: "합의를 이끄는 데 너무 많은 에너지가 들 수 있어요. 때로는 리더로서 결단력을 보여주세요.",
    keyword: ["공동체", "지속가능성", "안정감", "원칙"],
  },
  AFLD: {
    name: "시스템 마스터", eng: "AI Orchestrator",
    emoji: "🤖",
    color: "from-violet-600 to-purple-700",
    badge: "purple",
    tagline: "감정보다 데이터, 완벽한 프로세스를 설계한다",
    desc: "AI를 지휘하기에 가장 특화된 사람이에요. 직감이나 감정보다는 데이터와 논리를 믿으며, 남들보다 빠르게 신기술의 본질을 꿰뚫어 보고 혼자서도 거대한 시스템을 설계해 냅니다. 이미 AI 시대의 문법을 가장 잘 이해하고 있는 개척자입니다.",
    survival: "AI 툴을 자유자재로 조합해 나만의 자동화 시스템이나 업무 프로세스를 구축해보세요.",
    risk: "데이터만 쫓다 사람의 감정을 놓칠 수 있어요. 내 시스템을 쓸 '사람'을 항상 고려하세요.",
    keyword: ["데이터", "자동화", "시스템설계", "효율극대화"],
  },
  AFLN: {
    name: "기술 전도사", eng: "Tech Evangelist",
    emoji: "📡",
    color: "from-blue-500 to-violet-600",
    badge: "purple",
    tagline: "가장 먼저 기술을 수용하고, 데이터로 세상에 알린다",
    desc: "새로운 기술이 나왔을 때 가장 먼저 써보고 사람들에게 알리는 스피커예요. 화려한 말솜씨뿐만 아니라 객관적인 데이터로 사람들을 설득하기 때문에 높은 신뢰를 얻습니다. 복잡한 기술과 대중을 연결하는 훌륭한 다리가 될 거예요.",
    survival: "새로운 툴이나 트렌드를 빠르게 분석하고 사람들에게 쉬운 언어로 전달해보세요.",
    risk: "트렌드만 좇다 보면 나만의 깊이가 사라질 수 있어요. 한 우물 정도는 깊이 파두는 게 좋아요.",
    keyword: ["트렌드", "얼리어답터", "기술공유", "네트워커"],
  },
  AFRD: {
    name: "스마트 해결사", eng: "Tech Empath",
    emoji: "💡",
    color: "from-indigo-500 to-blue-600",
    badge: "purple",
    tagline: "차갑고 정확한 데이터로 사람들의 따뜻한 문제를 푼다",
    desc: "숫자 이면에 숨겨진 사람들의 진짜 니즈를 발굴하는 사람이에요. 데이터를 통해 문제를 객관적으로 진단하면서도, 해결책을 내놓을 때는 사람을 향한 따뜻한 공감이 깔려있습니다. 기계가 결코 흉내 낼 수 없는 인간 중심의 분석가예요.",
    survival: "UX 리서치나 서비스 기획처럼 데이터를 통해 사용자의 경험을 개선하는 일에 탁월합니다.",
    risk: "완벽한 분석과 상대방의 감정 사이에서 결정을 내리기 힘들 수 있어요. 때로는 과감함이 필요해요.",
    keyword: ["UX", "인사이트", "인간중심", "문제해결"],
  },
  AFRN: {
    name: "스마트 링커", eng: "Research Connector",
    emoji: "🔗",
    color: "from-sky-500 to-indigo-500",
    badge: "purple",
    tagline: "정보의 바다에서 가치를 찾아내 사람과 연결한다",
    desc: "흩어져 있는 데이터와 사람을 연결해 새로운 시너지를 폭발시키는 사람이에요. 트렌드 변화에 민감하며, 객관적인 지표를 바탕으로 네트워크를 넓혀갑니다. AI와 인간 사이의 윤활유 역할을 제대로 해낼 수 있는 인재예요.",
    survival: "데이터를 기반으로 커뮤니티를 분석하거나 핏이 맞는 프로젝트와 사람을 매칭해 보세요.",
    risk: "너무 많은 얕은 정보에 휩쓸려 결정을 못 내릴 수 있어요. 핵심 지표 3가지만 보고 판단하세요.",
    keyword: ["데이터기반", "네트워킹", "시너지추구", "정보수집"],
  },
  AGLD: {
    name: "철벽 분석가", eng: "Data Architect",
    emoji: "🏗️",
    color: "from-amber-500 to-orange-600",
    badge: "gold",
    tagline: "빈틈없는 논리와 검증된 데이터로 무결점을 추구한다",
    desc: "모래성 대신 튼튼한 철골을 세우는 사람이에요. 유행에 휩쓸리지 않고 확실히 검증된 데이터만 믿으며, 오류 없이 완벽하게 작동하는 시스템을 기획하고 구축합니다. AI가 쏟아내는 정보의 바다에서 진짜와 가짜를 구별해 내는 최후의 보루예요.",
    survival: "데이터를 정제하고 시스템의 규칙이나 기준을 설계하는 관리형 업무에서 대체 불가능해집니다.",
    risk: "완벽주의 때문에 시작조차 못 할 때가 있어요. 80%만 확신해도 움직이는 연습을 해보세요.",
    keyword: ["무결점", "팩트체크", "규칙설계", "객관적"],
  },
  AGLN: {
    name: "룰 브레이커의 룰", eng: "Standard Setter",
    emoji: "📐",
    color: "from-yellow-500 to-amber-600",
    badge: "gold",
    tagline: "모두가 인정할 수밖에 없는 객관적인 기준을 세운다",
    desc: "조직 내셔날 지오그래픽 같은 사람이에요. 주관적인 감정 대신 검증된 기준과 룰을 통해 커뮤니티를 올바른 방향으로 이끕니다. AI 시대의 혼란 속에서도 당신이 세운 원칙은 사람들에게 믿고 따를 수 있는 나침반이 됩니다.",
    survival: "혼란스러운 상황에서 명확한 가이드라인이나 매뉴얼, 정책을 세우는 리더 역할을 맡아보세요.",
    risk: "원칙이 너무 굳어지면 숨 막힐 수 있어요. 상황에 따라 유연하게 예외를 두는 것도 필요해요.",
    keyword: ["기준제시", "냉철함", "가이드라인", "원칙주의"],
  },
  AGRD: {
    name: "AI 감수자", eng: "AI Verifier",
    emoji: "🔍",
    color: "from-lime-500 to-yellow-500",
    badge: "gold",
    tagline: "결과물을 100배 더 가치 있게 만드는 인간의 마지막 터치",
    desc: "AI가 내놓은 정답에 의심의 눈초리를 거두지 않는 사람이에요. 기계의 속도보다는 결과의 품질과 안전성을 우선하며, 나만의 깊이 있는 지식으로 오류를 잡아냅니다. AI의 환각(Hallucination)을 걸러내는 가장 중요한 품질 관리자예요.",
    survival: "초안은 AI에게 넘기고, 최종 결과물에 생명력을 불어넣는 감수와 편집 역할에 집중하세요.",
    risk: "지나치게 의심하다 툴 자체를 멀리하게 될 수 있어요. AI는 완벽하지 않다는 걸 인정하고 시작하세요.",
    keyword: ["품질관리", "편집자", "마지막터치", "신중함"],
  },
  AGRN: {
    name: "균형의 중재자", eng: "H-AI Translator",
    emoji: "🌐",
    color: "from-green-400 to-lime-500",
    badge: "gold",
    tagline: "차가운 기술과 따뜻한 인간 사이의 최적의 타협점을 찾는다",
    desc: "기술의 발전과 사람의 속도 사이에서 아슬아슬한 줄타기를 완벽하게 해내는 사람이에요. 신기술의 효용성을 정확히 분석하면서도, 그것이 사람과 조직에 미칠 영향을 세심하게 조율합니다. 인간과 기계가 공존하는 미래에 가장 필수적인 외교관이에요.",
    survival: "사람과 기술 시스템 사이에서 발생하는 갈등을 중재하고 최적의 도입 방안을 기획해보세요.",
    risk: "양쪽 모두를 이해하려다 보니 내 입장이 모호해질 수 있어요. 최종 결정권자는 항상 '인간'임을 기억하세요.",
    keyword: ["중재자", "인간-AI공존", "조율", "외교관"],
  },
};

// 색상 뱃지
const BADGE_COLORS: Record<string, string> = {
  coral: "bg-orange-100 text-orange-700 border-orange-200",
  teal: "bg-teal-100 text-teal-700 border-teal-200",
  purple: "bg-violet-100 text-violet-700 border-violet-200",
  gold: "bg-amber-100 text-amber-700 border-amber-200",
};

const STEP_INFO = [
  { step: 1, axis: "W / A", label: "말하기 방식", sub: "스토리 vs 데이터", color: "text-[#2259FB]" },
  { step: 2, axis: "F / G", label: "변화 태도", sub: "선도 vs 검증", color: "text-teal-600" },
  { step: 3, axis: "L / R", label: "문제 해결", sub: "논리 vs 관계", color: "text-violet-600" },
  { step: 4, axis: "D / N", label: "가치 창출", sub: "깊이 vs 연결", color: "text-amber-600" },
];

// ─────────────────────────────────────────────
// 메인 컴포넌트
// ─────────────────────────────────────────────
export default function CAVETest() {
  const [screen, setScreen] = useState("intro"); // intro | test | result
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  const handleStart = () => {
    setCurrentQ(0);
    setAnswers({});
    setScreen("test");
  };

  const handleAnswer = (value: string) => {
    const q = QUESTIONS[currentQ];
    const newAnswers = { ...answers, [q.axis]: (answers[q.axis] || []).concat(value) };
    setAnswers(newAnswers);
    if (currentQ + 1 < QUESTIONS.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setScreen("result");
    }
  };

  const calcResult = () => {
    const pick = (axis: string, a: string, b: string) => {
      const votes = answers[axis] || [];
      const aCount = votes.filter((v) => v === a).length;
      const bCount = votes.filter((v) => v === b).length;
      return aCount >= bCount ? a : b;
    };
    const w = pick("WA", "W", "A");
    const f = pick("FG", "F", "G");
    const l = pick("LR", "L", "R");
    const d = pick("DN", "D", "N");
    return w + f + l + d;
  };

  const handleRetry = () => {
    setCurrentQ(0);
    setAnswers({});
    setScreen("intro");
  };

  if (screen === "intro") return <IntroScreen onStart={handleStart} />;
  if (screen === "test") {
    const q = QUESTIONS[currentQ];
    const stepIdx = q.step - 1;
    const progress = ((currentQ) / QUESTIONS.length) * 100;
    const stepProgress = STEP_INFO.map((s) => ({
      ...s,
      done: q.step > s.step,
      active: q.step === s.step,
    }));
    return (
      <TestScreen
        q={q}
        qNum={currentQ + 1}
        total={QUESTIONS.length}
        progress={progress}
        stepInfo={STEP_INFO[stepIdx]}
        stepProgress={stepProgress}
        onAnswer={handleAnswer}
      />
    );
  }
  if (screen === "result") {
    const code = calcResult();
    const type = Object.entries(TYPES).find(([c]) => c === code)?.[1];
    if (!type) return null;
    return <ResultScreen code={code} type={type} answers={answers} onRetry={handleRetry} />;
  }
  return null;
}

// ─────────────────────────────────────────────
// 인트로 화면
// ─────────────────────────────────────────────
function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="bg-[#F8FAFC] text-slate-900 flex flex-col items-center justify-center px-4 py-24 min-h-screen">
      <div className="max-w-lg w-full mt-auto mb-auto">
        {/* 배지 */}
        <div className="flex justify-center mb-6">
          <span className="text-[10px] sm:text-xs tracking-[0.3em] font-bold text-[#2259FB] uppercase border border-[#2259FB]/20 bg-[#2259FB]/5 px-4 py-1.5 rounded-full">
            NCS 직업공통능력 기반 · AI 시대 적합도 진단
          </span>
        </div>

        {/* 로고 */}
        <div className="text-center mb-2">
          <h1 className="text-7xl font-black tracking-tight text-slate-900 leading-none">CAVE</h1>
          <p className="text-slate-500 font-medium text-sm mt-2 tracking-widest uppercase">
            Career AI Viability Evaluation
          </p>
        </div>

        {/* 카피 */}
        <div className="text-center mt-8 mb-10">
          <p className="text-2xl font-bold text-slate-900 leading-snug">
            나는<br />
            <span className="text-[#2259FB]">AI 시대에서 살아남을 수 있을까?</span>
          </p>
          <p className="text-slate-500 font-medium text-sm mt-3">
            16문항 · 4글자 코드 · 16가지 생존 유형
          </p>
        </div>

        {/* 4축 미리보기 */}
        <div className="grid grid-cols-2 gap-3 mb-10">
          {[
            { code: "W / A", title: "말하기 방식", desc: "스토리 vs 데이터", color: "border-blue-500/20 bg-white shadow-sm" },
            { code: "F / G", title: "변화 태도", desc: "선도 vs 검증", color: "border-teal-500/20 bg-white shadow-sm" },
            { code: "L / R", title: "문제 해결", desc: "논리 vs 관계", color: "border-violet-500/20 bg-white shadow-sm" },
            { code: "D / N", title: "가치 창출", desc: "깊이 vs 연결", color: "border-amber-500/20 bg-white shadow-sm" },
          ].map((ax) => (
            <div key={ax.code} className={`rounded-xl border p-4 ${ax.color}`}>
              <div className="text-lg font-black text-slate-800 mb-1">{ax.code}</div>
              <div className="text-xs font-semibold text-slate-500">{ax.title}</div>
              <div className="text-xs text-slate-400 mt-0.5 font-medium">{ax.desc}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={onStart}
          className="w-full bg-[#2259FB] text-white font-black text-lg py-4 rounded-2xl hover:bg-[#1A4BCC] transition-all duration-200 tracking-tight shadow-md shadow-[#2259FB]/20 mt-4"
        >
          CAVE 검사 시작 →
        </button>
        <p className="text-center text-slate-400 text-xs mt-4 font-medium">약 3분 소요 · 16문항</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 테스트 화면
// ─────────────────────────────────────────────
function TestScreen({ q, qNum, total, progress, stepInfo, stepProgress, onAnswer }: any) {
  return (
    <div className="bg-[#F8FAFC] text-slate-900 flex flex-col py-24 min-h-screen">
      {/* 상단 스텝 인디케이터 */}
      <div className="px-4 pb-4 max-w-lg mx-auto w-full">
        <div className="flex gap-2 mb-4">
          {stepProgress.map((s: any) => (
            <div key={s.step} className="flex-1">
              <div className={`h-1.5 rounded-full transition-all ${
                s.done ? "bg-[#2259FB]/30" : s.active ? "bg-[#2259FB]" : "bg-slate-200"
              }`} />
              <div className={`text-[10px] mt-1.5 font-bold uppercase tracking-wider ${
                s.active ? "text-[#2259FB]" : s.done ? "text-[#2259FB]/60" : "text-slate-400"
              }`}>
                {s.axis}
              </div>
            </div>
          ))}
        </div>

        {/* 진행 상태 */}
        <div className="flex items-center justify-between mb-1 mt-6">
          <span className={`text-xs font-black tracking-widest uppercase ${stepInfo.color}`}>
            Step {stepInfo.step} — {stepInfo.label}
          </span>
          <span className="text-xs font-bold text-slate-400 tracking-wider">Q{qNum} <span className="text-slate-300 font-normal">/ {total}</span></span>
        </div>
        <div className="h-1 bg-slate-200 rounded-full overflow-hidden mt-2">
          <div
            className="h-full bg-[#2259FB] rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 질문 영역 */}
      <div className="flex-1 flex flex-col justify-center px-4 max-w-lg mx-auto w-full mt-4">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-[1.4] mb-10">
          <span className="text-[#2259FB] font-black mr-2">Q{qNum}.</span>
          {q.text}
        </h2>

        {/* 선택지 */}
        <div className="flex flex-col gap-4">
          <ChoiceButton
            label="A"
            text={q.a.label}
            onClick={() => onAnswer(q.a.value)}
            colorClass="hover:border-[#2259FB] hover:bg-[#2259FB]/5"
          />
          <ChoiceButton
            label="B"
            text={q.b.label}
            onClick={() => onAnswer(q.b.value)}
            colorClass="hover:border-teal-500 hover:bg-teal-500/5"
          />
        </div>

        {/* 축 설명 */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 text-xs font-medium">
            NCS 직업기초능력 · {
              q.step === 1 ? "의사소통능력 / 수리능력" :
              q.step === 2 ? "적응학습능력 / 경력개발능력" :
              q.step === 3 ? "문제해결능력 / 대인관계능력" :
              "자기관리능력 / 협업능력 / 디지털능력"
            }
          </p>
        </div>
      </div>
    </div>
  );
}

function ChoiceButton({ label, text, onClick, colorClass }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left border border-slate-200 bg-white rounded-2xl p-5 md:p-6 flex items-start gap-4 transition-all duration-200 group shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md hover:-translate-y-0.5 ${colorClass}`}
    >
      <span className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center text-xs md:text-sm font-bold text-slate-400 group-hover:border-current group-hover:text-current group-hover:bg-white shrink-0 mt-0.5 md:mt-0 transition-colors">
        {label}
      </span>
      <span className="text-slate-700 text-[15px] md:text-[16px] leading-relaxed font-semibold group-hover:text-[#2259FB] transition-colors pt-0.5">
        {text}
      </span>
    </button>
  );
}

// ─────────────────────────────────────────────
// 결과 화면
// ─────────────────────────────────────────────
function ResultScreen({ code, type, answers, onRetry }: any) {
  const letters = code.split("");
  const letterMeta = [
    { val: "W", label: "Word", desc: "스토리형" },
    { val: "A", label: "Analytics", desc: "데이터형" },
    { val: "F", label: "Fast", desc: "선도형" },
    { val: "G", label: "Grounded", desc: "검증형" },
    { val: "L", label: "Logic", desc: "논리형" },
    { val: "R", label: "Relation", desc: "관계형" },
    { val: "D", label: "Deep", desc: "심층형" },
    { val: "N", label: "Network", desc: "연결형" },
  ];

  const axisScores = [
    { axis: "WA", a: "W", b: "A", labelA: "스토리", labelB: "데이터" },
    { axis: "FG", a: "F", b: "G", labelA: "선도", labelB: "검증" },
    { axis: "LR", a: "L", b: "R", labelA: "논리", labelB: "관계" },
    { axis: "DN", a: "D", b: "N", labelA: "깊이", labelB: "연결" },
  ].map(({ axis, a, b, labelA, labelB }) => {
    const votes = answers[axis] || [];
    const aCount = votes.filter((v: string) => v === a).length;
    const bCount = votes.filter((v: string) => v === b).length;
    const total = aCount + bCount;
    return { axis, labelA, labelB, aCount, bCount, total, aRatio: total ? aCount / total : 0.5 };
  });

  return (
    <div className="bg-[#F8FAFC] text-slate-900 py-16 min-h-screen">
      <div className="max-w-lg mx-auto px-4 mt-8">
        {/* 상단 헤더 */}
        <div className="pt-10 pb-8 text-center">
          <p className="text-[#2259FB] font-black text-xs tracking-[0.2em] uppercase mb-6 px-4 py-1.5 bg-[#2259FB]/5 border border-[#2259FB]/10 rounded-full inline-block">CAVE 검사 결과</p>
          <div className="text-6xl md:text-7xl mb-4 drop-shadow-sm">{type.emoji}</div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2 tracking-tight">{type.name}</h1>
          <p className="text-slate-500 font-semibold">{type.eng}</p>
        </div>

        {/* 코드 카드 */}
        <div className={`rounded-3xl bg-gradient-to-br ${type.color} p-8 mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)]`}>
          <div className="flex justify-center gap-3 md:gap-4 mb-6">
            {letters.map((l: string, i: number) => {
              const meta = letterMeta.find((m) => m.val === l);
              return (
                <div key={i} className="text-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/25 backdrop-blur-sm border border-white/30 flex items-center justify-center text-2xl md:text-3xl font-black text-white mb-2 shadow-sm">
                    {l}
                  </div>
                  <div className="text-white/90 text-[11px] md:text-xs font-semibold tracking-wide">{meta?.desc}</div>
                </div>
              );
            })}
          </div>
          <p className="text-center text-white text-[15px] md:text-[17px] font-bold leading-relaxed opacity-95">
            "{type.tagline}"
          </p>
        </div>

        {/* 유형 설명 */}
        <div className="bg-white rounded-3xl p-6 md:p-8 mb-4 shadow-sm border border-slate-100">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">유형 설명</h3>
          <p className="text-slate-700 text-[15px] leading-[1.6]">{type.desc}</p>
        </div>

        {/* 4개 축 점수 */}
        <div className="bg-white rounded-3xl p-6 md:p-8 mb-4 shadow-sm border border-slate-100">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">나의 생존 DNA 분석</h3>
          {axisScores.map((s) => (
            <div key={s.axis} className="mb-5 last:mb-0">
              <div className="flex justify-between text-xs text-slate-500 mb-2 font-bold">
                <span className={s.aCount >= s.bCount ? "text-slate-900" : ""}>{s.labelA}</span>
                <span className={s.bCount >= s.aCount ? "text-slate-900" : ""}>{s.labelB}</span>
              </div>
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#2259FB] rounded-full"
                  style={{ width: `${s.aRatio * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] font-semibold text-slate-400 mt-1.5">
                <span className={s.aCount >= s.bCount ? "text-[#2259FB]" : ""}>{s.aCount}점</span>
                <span className={s.bCount >= s.aCount ? "text-[#2259FB]" : ""}>{s.bCount}점</span>
              </div>
            </div>
          ))}
        </div>

        {/* 생존 전략 */}
        <div className="bg-white rounded-3xl p-6 md:p-8 mb-4 shadow-sm border border-[#2259FB]/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#2259FB]"></div>
          <h3 className="text-xs font-black text-[#2259FB] uppercase tracking-widest mb-3 flex items-center">
             생존 전략
          </h3>
          <p className="text-slate-800 text-[15px] font-medium leading-[1.6]">{type.survival}</p>
        </div>

        {/* 주의 사항 */}
        <div className="bg-white rounded-3xl p-6 md:p-8 mb-6 shadow-sm border border-slate-100 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-1 h-full bg-orange-400"></div>
          <h3 className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-3">
             주의점
          </h3>
          <p className="text-slate-600 text-[14px] leading-relaxed">{type.risk}</p>
        </div>

        {/* 키워드 */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 mx-[-1rem]">
          {type.keyword.map((kw: string) => (
            <span
              key={kw}
              className="text-sm font-bold bg-white text-slate-600 px-4 py-2 rounded-full border border-slate-200 shadow-sm"
            >
              #{kw}
            </span>
          ))}
        </div>

        {/* 16유형 미니맵 */}
        <div className="bg-white rounded-3xl p-6 md:p-8 mb-10 shadow-sm border border-slate-100">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 text-center">
            CAVE 16유형 지도
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {Object.entries(TYPES).map(([c, t]) => (
              <div
                key={c}
                className={`rounded-2xl p-2.5 text-center border transition-all ${
                  c === code
                    ? `bg-gradient-to-br ${t.color} text-white border-transparent shadow-md scale-105 z-10`
                    : "bg-slate-50 text-slate-400 border-slate-100 opacity-70"
                }`}
              >
                <div className={`text-sm tracking-wide ${c === code ? 'font-black' : 'font-bold'}`}>{c}</div>
                <div className={`text-[9px] md:text-[10px] mt-1 leading-tight font-semibold ${c === code ? "text-white/95" : "text-slate-400"} break-keep`}>
                  {t.name.split(" ").slice(-1)[0]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onRetry}
            className="flex-[1] bg-white border border-slate-200 text-slate-600 font-bold py-4.5 rounded-2xl hover:bg-slate-50 transition-all shadow-sm"
          >
            다시 하기
          </button>
          <button
            className="flex-[2] bg-[#2259FB] text-white font-black py-4.5 rounded-2xl hover:bg-[#1A4BCC] transition-all shadow-md shadow-[#2259FB]/20 flex items-center justify-center gap-2"
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: `나는 ${type.name} (${code})`, text: type.tagline });
              } else {
                navigator.clipboard.writeText(`CAVE 결과: ${code} ${type.name}\n${type.tagline}`);
                alert("결과가 클립보드에 복사됐습니다!");
              }
            }}
          >
            결과 공유하기 ↗
          </button>
        </div>

        <p className="text-center text-slate-400 text-xs mt-10 mb-8 font-medium">
          CAVE — Career AI Viability Evaluation<br/>NCS 직업기초능력 기반 미래 적합도 진단
        </p>
      </div>
    </div>
  );
}
