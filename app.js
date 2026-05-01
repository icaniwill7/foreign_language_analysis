const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

const levelDescriptions = {
  A1: "익숙한 표현과 아주 기본적인 정보를 다룰 수 있는 시작 단계",
  A2: "예측 가능한 일상 상황에서 필요한 정보를 주고받을 수 있는 단계",
  B1: "학업과 생활 맥락에서 핵심 내용을 처리할 수 있는 독립 사용 단계",
  B2: "복잡한 주제도 비교적 자연스럽게 이해하고 표현할 수 있는 상위 독립 단계",
  C1: "학술적, 전문적 상황에서 정확하고 효과적으로 수행할 수 있는 고급 단계",
  C2: "거의 모든 상황에서 자연스럽고 정교하게 사용할 수 있는 숙련 단계",
};

const assessmentData = [
  {
    domain: "듣기",
    slug: "listening",
    prompts: [
      {
        title: "일상 안내 이해",
        prompt: "캠퍼스 안내 방송, 약속 시간, 장소 설명처럼 짧고 실용적인 말을 들을 때의 수준을 고르세요.",
      },
      {
        title: "수업과 발표 이해",
        prompt: "전공 수업, 발표, 설명을 들을 때 핵심 내용을 얼마나 따라갈 수 있나요?",
      },
      {
        title: "다양한 억양과 맥락",
        prompt: "빠른 말, 다른 억양, 토론 상황처럼 변수가 있는 듣기 상황을 기준으로 고르세요.",
      },
    ],
  },
  {
    domain: "읽기",
    slug: "reading",
    prompts: [
      {
        title: "생활 정보 읽기",
        prompt: "공지, 이메일, 신청 안내처럼 실용적인 텍스트를 읽을 때의 수준을 고르세요.",
      },
      {
        title: "학술 텍스트 읽기",
        prompt: "교재, 기사, 리딩 자료처럼 정보가 많은 글을 읽을 때의 수준을 고르세요.",
      },
      {
        title: "함축과 어조 파악",
        prompt: "글쓴이의 의도, 예시, 문체 차이를 읽어내는 능력을 기준으로 고르세요.",
      },
    ],
  },
  {
    domain: "상호작용",
    slug: "interaction",
    prompts: [
      {
        title: "일상 대화 참여",
        prompt: "자기소개, 일정 조율, 간단한 질문과 답변이 오가는 상황을 떠올리세요.",
      },
      {
        title: "학업 토론 참여",
        prompt: "팀 프로젝트나 수업 토론에서 의견을 말하고 조율하는 장면을 기준으로 고르세요.",
      },
      {
        title: "예상 밖 질문 대응",
        prompt: "준비하지 않은 질문, 오해, 추가 설명 요청이 들어왔을 때의 수준을 고르세요.",
      },
    ],
  },
  {
    domain: "발표",
    slug: "production",
    prompts: [
      {
        title: "자기 표현과 설명",
        prompt: "자신의 경험, 계획, 관심사를 일정한 길이로 말할 때의 수준을 고르세요.",
      },
      {
        title: "전공 내용 발표",
        prompt: "수업 발표, 프로젝트 브리핑, 연구 주제 설명 상황을 기준으로 고르세요.",
      },
      {
        title: "유창성과 조절",
        prompt: "말하는 속도, 연결, 수정 능력을 기준으로 현재 수준을 고르세요.",
      },
    ],
  },
  {
    domain: "쓰기",
    slug: "writing",
    prompts: [
      {
        title: "기본 메시지 작성",
        prompt: "메일, 공지 회신, 간단한 요청문을 쓸 때의 수준을 고르세요.",
      },
      {
        title: "학업 글쓰기",
        prompt: "리포트, 요약, 반응문처럼 학업 목적의 글쓰기를 떠올리세요.",
      },
      {
        title: "정확성과 다듬기",
        prompt: "문법, 어휘 선택, 스스로 수정하는 능력을 기준으로 고르세요.",
      },
    ],
  },
];

const optionTexts = [
  "매우 익숙한 단어와 짧은 표현만 조금 이해하거나 사용할 수 있다.",
  "천천히 제시되면 기본 정보를 이해하고 간단히 답할 수 있다.",
  "익숙한 주제에서는 핵심 흐름을 따라가고 의도를 대체로 전달할 수 있다.",
  "복잡하지 않은 학업·생활 맥락에서 비교적 자연스럽게 처리할 수 있다.",
  "복잡한 내용도 구조와 뉘앙스를 파악하며 정확하게 표현할 수 있다.",
  "높은 수준의 정확성과 유창성으로 거의 모든 상황을 안정적으로 처리할 수 있다.",
];

const state = { answers: {} };

const questionRoot = document.getElementById("question-root");
const questionTemplate = document.getElementById("question-template");
const progressCount = document.getElementById("progress-count");
const progressBar = document.getElementById("progress-bar");
const resultButton = document.getElementById("result-button");
const resetButton = document.getElementById("reset-button");
const resultSection = document.getElementById("result-section");
const domainRoot = document.getElementById("domain-root");

function totalQuestions() {
  return assessmentData.reduce((sum, section) => sum + section.prompts.length, 0);
}

function renderQuestions() {
  questionRoot.innerHTML = "";

  assessmentData.forEach((section) => {
    section.prompts.forEach((item, promptIndex) => {
      const node = questionTemplate.content.firstElementChild.cloneNode(true);
      const key = `${section.slug}-${promptIndex}`;

      node.dataset.key = key;
      node.querySelector(".domain-name").textContent = section.domain;
      node.querySelector("h3").textContent = item.title;
      node.querySelector(".question-prompt").textContent = item.prompt;

      const group = node.querySelector(".level-options");
      group.setAttribute("aria-label", `${section.domain} ${item.title}`);

      optionTexts.forEach((optionText, levelIndex) => {
        const option = document.createElement("label");
        option.className = "level-option";

        const input = document.createElement("input");
        input.type = "radio";
        input.name = key;
        input.value = String(levelIndex + 1);
        input.checked = state.answers[key] === levelIndex + 1;
        input.addEventListener("change", () => {
          state.answers[key] = levelIndex + 1;
          node.classList.remove("missing");
          syncProgress();
          persistState();
        });

        const pill = document.createElement("div");
        pill.className = "level-pill";
        pill.innerHTML = `<strong>${LEVELS[levelIndex]}</strong><span>${optionText}</span>`;

        option.append(input, pill);
        group.appendChild(option);
      });

      questionRoot.appendChild(node);
    });
  });
}

function syncProgress() {
  const total = totalQuestions();
  const answered = Object.keys(state.answers).filter((key) => state.answers[key]).length;
  progressCount.textContent = `${answered} / ${total}`;
  progressBar.style.width = `${(answered / total) * 100}%`;
}

function profileValues() {
  return {
    language: document.getElementById("language-select").value,
    goal: document.getElementById("goal-select").value,
    note: document.getElementById("user-note").value.trim(),
  };
}

function validateAnswers() {
  const missing = [];

  assessmentData.forEach((section) => {
    section.prompts.forEach((_, promptIndex) => {
      const key = `${section.slug}-${promptIndex}`;
      if (!state.answers[key]) missing.push(key);
    });
  });

  document.querySelectorAll(".question-card").forEach((card) => {
    card.classList.toggle("missing", missing.includes(card.dataset.key));
  });

  return missing.length === 0;
}

function average(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function numericToLevel(score) {
  const rounded = Math.max(1, Math.min(6, Math.round(score)));
  return LEVELS[rounded - 1];
}

function confidenceText(score) {
  if (score < 2.5) return "기초 다지기 구간";
  if (score < 4.5) return "독립 사용 성장 구간";
  return "고급 활용 구간";
}

function buildSummary(level, profile) {
  return `${profile.language}를 ${profile.goal} 목적으로 사용할 때 현재 자가진단 결과는 ${level}에 가깝습니다. ${levelDescriptions[level]}로 볼 수 있습니다.`;
}

function recommendationFor(level, weakestDomain, profile) {
  const nextActionMap = {
    A1: `${profile.language} 노출 시간을 늘리고 캠퍼스 생활에 바로 쓰이는 표현을 짧게 반복해 보세요.`,
    A2: `짧은 공지, 이메일, 대화문을 읽고 들으며 기본 패턴을 자동화하는 연습이 좋습니다.`,
    B1: `읽은 내용을 말로 요약하고 다시 글로 정리하면서 입력과 출력을 연결해 보세요.`,
    B2: `복잡한 주제를 구조화하고 근거를 붙이는 발표와 글쓰기 연습을 늘려 보세요.`,
    C1: `정확성과 문체 조절을 높이기 위해 피드백 기반 수정과 장르별 연습을 병행해 보세요.`,
    C2: `전문 분야별 표현과 상황별 레지스터 조절을 목표로 섬세하게 확장해 보세요.`,
  };

  return `${weakestDomain.domain} 영역이 현재 가장 보완할 여지가 큽니다. ${nextActionMap[level]}`;
}

function studyTip(profile, weakestDomain) {
  const contextMap = {
    "전공 수업과 학업": `수업 자료를 ${profile.language}로 짧게 요약하고 1분 발표 스크립트로 바꿔 보세요.`,
    "교환학생 및 해외연수": `기숙사, 행정, 팀플 상황을 role-play로 반복하며 ${weakestDomain.domain} 영역을 보완해 보세요.`,
    "취업 및 면접 준비": `지원 동기, 경험 설명, 예상 질문 답변을 ${profile.language}로 녹음하고 다시 수정해 보세요.`,
    "일상 의사소통": `일정 잡기, 부탁하기, 의견 말하기처럼 실제 생활 장면을 중심으로 반복해 보세요.`,
  };

  return contextMap[profile.goal];
}

function renderResults() {
  const profile = profileValues();
  const domainScores = assessmentData.map((section) => {
    const scores = section.prompts.map((_, promptIndex) => state.answers[`${section.slug}-${promptIndex}`]);
    const score = average(scores);
    return { domain: section.domain, score, level: numericToLevel(score) };
  });

  const overallScore = average(domainScores.map((item) => item.score));
  const overallLevel = numericToLevel(overallScore);
  const strongest = [...domainScores].sort((a, b) => b.score - a.score)[0];
  const weakest = [...domainScores].sort((a, b) => a.score - b.score)[0];

  document.getElementById("result-language").textContent = `${profile.language} self-check`;
  document.getElementById("overall-level").textContent = overallLevel;
  document.getElementById("overall-summary").textContent = buildSummary(overallLevel, profile);
  document.getElementById("goal-chip").textContent = `목적: ${profile.goal}`;
  document.getElementById("confidence-chip").textContent = confidenceText(overallScore);
  document.getElementById("strength-text").textContent = `가장 안정적인 영역은 ${strongest.domain} (${strongest.level})입니다. 이 영역의 학습 방식을 다른 영역에도 연결해 보세요.`;
  document.getElementById("focus-text").textContent = recommendationFor(overallLevel, weakest, profile);
  document.getElementById("tip-text").textContent = `${studyTip(profile, weakest)}${profile.note ? ` 메모한 고민(${profile.note})도 학습 계획에 반영해 보세요.` : ""}`;

  domainRoot.innerHTML = "";
  domainScores.forEach((item) => {
    const card = document.createElement("article");
    card.className = "domain-card";
    card.innerHTML = `
      <p class="domain-name">Domain</p>
      <h4>${item.domain}</h4>
      <div class="domain-bar"><div class="domain-fill" style="width:${(item.score / 6) * 100}%"></div></div>
      <div class="domain-meta"><span>${item.level}</span><span>${item.score.toFixed(1)} / 6.0</span></div>
    `;
    domainRoot.appendChild(card);
  });

  resultSection.classList.remove("hidden");
  resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetAssessment() {
  state.answers = {};
  persistState();
  renderQuestions();
  syncProgress();
  resultSection.classList.add("hidden");
}

function persistState() {
  localStorage.setItem("yonsei-language-mirror-state", JSON.stringify(state.answers));
}

function hydrateState() {
  const saved = localStorage.getItem("yonsei-language-mirror-state");
  if (!saved) return;
  try {
    state.answers = JSON.parse(saved) || {};
  } catch {
    state.answers = {};
  }
}

resultButton.addEventListener("click", () => {
  if (!validateAnswers()) {
    window.scrollTo({ top: questionRoot.offsetTop - 24, behavior: "smooth" });
    return;
  }
  renderResults();
});

resetButton.addEventListener("click", resetAssessment);

hydrateState();
renderQuestions();
syncProgress();
