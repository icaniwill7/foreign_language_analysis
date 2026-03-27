import streamlit as st
from dataclasses import dataclass
from typing import Dict, List

st.set_page_config(page_title="외국어평가 방법론", layout="wide")

# -----------------------------
# 1) 데이터 구조
# -----------------------------
# 실제 수업/과제용으로는 이 부분을 JSON 파일로 분리하는 것을 추천합니다.
# 예: data/cefr_ko.json

CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"]
SKILLS = ["듣기", "읽기", "대화", "혼자 말하기", "쓰기"]

CEFR_DESCRIPTORS: Dict[str, Dict[str, str]] = {
    "A1": {
        "듣기": "천천히 또렷하게 말하면 자신, 가족, 주변의 익숙한 정보와 아주 간단한 문장을 이해할 수 있다.",
        "읽기": "표지판, 포스터, 카탈로그의 익숙한 이름, 단어, 아주 간단한 문장을 이해할 수 있다.",
        "대화": "상대가 천천히 반복하거나 바꾸어 말해주면 아주 익숙한 주제에 대해 간단한 질문과 대답을 할 수 있다.",
        "혼자 말하기": "간단한 표현으로 자신이 아는 사람과 사는 곳을 말할 수 있다.",
        "쓰기": "짧고 간단한 엽서나 기본 서류 양식을 작성할 수 있다."
    },
    "A2": {
        "듣기": "자기에게 중요한 일상적 정보가 중심이면 자주 쓰이는 단어와 간단한 전달사항의 핵심을 이해할 수 있다.",
        "읽기": "짧고 간단한 텍스트에서 구체적이고 예측 가능한 정보를 찾아낼 수 있다.",
        "대화": "익숙한 주제와 직접적 정보교환이 중심인 단순한 일상 상황에서 의사소통할 수 있다.",
        "혼자 말하기": "가족, 교육, 현재·과거의 활동 등을 몇 개의 문장으로 설명할 수 있다.",
        "쓰기": "짧고 간단한 메모, 전달사항, 아주 간단한 개인 편지를 쓸 수 있다."
    },
    "B1": {
        "듣기": "직장·학교·여가 등 익숙한 상황에서 표준어로 말하면 요점을 이해할 수 있다.",
        "읽기": "일상어·직업어가 주로 나오는 텍스트와 사건·감정·소망을 다룬 개인 편지를 이해할 수 있다.",
        "대화": "여행 중 대부분의 상황을 해결할 수 있고, 익숙한 주제에 대해 준비 없이 대화할 수 있다.",
        "혼자 말하기": "경험, 사건, 꿈, 희망, 계획을 이어진 문장으로 설명하고 짧게 이유를 제시할 수 있다.",
        "쓰기": "익숙하거나 관심 있는 주제에 대해 간단하고 조리 있게 텍스트를 쓸 수 있다."
    },
    "B2": {
        "듣기": "비교적 긴 발언과 강연을 이해하고, 익숙한 주제라면 다소 복잡한 논증도 따라갈 수 있다.",
        "읽기": "기사·보도에서 저자의 입장이나 관점을 파악하고 현대 문학작품도 이해할 수 있다.",
        "대화": "원어민과 비교적 자연스럽고 유창하게 대화하고 토론에 적극 참여할 수 있다.",
        "혼자 말하기": "관심 분야의 다양한 주제에 대해 분명하고 상세하게 설명하고 장단점을 제시할 수 있다.",
        "쓰기": "다양한 주제에 대해 분명하고 상세한 글을 쓰고, 찬반 논거를 제시할 수 있다."
    },
    "C1": {
        "듣기": "구성이 명확하지 않거나 문맥 신호가 약한 비교적 긴 발언도 이해할 수 있다.",
        "읽기": "복합적이고 긴 실용문·문학 텍스트를 이해하고 문체 차이도 느낄 수 있다.",
        "대화": "어구를 찾느라 멈추는 일이 거의 없이 유창하게 표현하고 사회·직장생활에서 유연하게 언어를 사용할 수 있다.",
        "혼자 말하기": "복합적인 사안을 상세하게 설명하며 논점을 연결하고 적절히 마무리할 수 있다.",
        "쓰기": "입장을 분명하고 잘 구성된 글로 표현하고 복합적 사안을 적절한 문체로 쓸 수 있다."
    },
    "C2": {
        "듣기": "빠른 구어도 거의 어려움 없이 이해하고, 특별한 어투에도 약간의 적응만 있으면 이해할 수 있다.",
        "읽기": "추상적이거나 언어적으로 복잡한 전문 글과 문학작품도 거의 어려움 없이 읽을 수 있다.",
        "대화": "모든 대화와 토론에 어려움 없이 참여하고, 섬세한 의미 차이도 정확히 표현할 수 있다.",
        "혼자 말하기": "상황에 맞는 문체로 사안을 분명하고 유창하게 설명하고 논의할 수 있다.",
        "쓰기": "목적에 맞는 문체로 유창하게 쓰고, 고급 수준의 편지·보고서·기사·요약문을 작성할 수 있다."
    },
}

LANGUAGE_RECOMMENDATIONS: Dict[str, Dict[str, List[str]]] = {
    "영어": {
        "A1": ["기초 단어 20개씩 암기", "자기소개 문장 5개 쓰기", "쉬운 리스닝 5분 듣기"],
        "A2": ["일상 표현 묶음 학습", "짧은 글 읽고 핵심문장 표시", "하루 3문장 일기 쓰기"],
        "B1": ["주제별 말하기 연습", "뉴스 쉬운 기사 요약", "짧은 에세이 쓰기"],
        "B2": ["토론형 질문 답변 연습", "기사 찬반 구조 분석", "문단 연결어 확장"],
        "C1": ["심화 칼럼 읽기", "고급 표현 패러프레이징", "발표 스크립트 작성"],
        "C2": ["미세한 의미 차이 비교", "전문 텍스트 요약/비평", "실전 토론·발표 훈련"]
    },
    "독일어": {
        "A1": ["기초 어휘와 인사 표현 학습", "관사·기본 동사 변화 연습", "짧은 자기소개 말하기"],
        "A2": ["일상 상황 대화문 반복", "기초 문장 구조 확장", "짧은 메모 쓰기"],
        "B1": ["여행·학교·일상 주제 말하기", "독일어 기사 쉬운 버전 읽기", "경험 서술 쓰기"],
        "B2": ["논리적 의견 제시 훈련", "복문·접속법 정리", "토론형 답변 연습"],
        "C1": ["학술적·시사적 주제 발표", "긴 텍스트 구조 분석", "고급 쓰기 첨삭"],
        "C2": ["미세한 문체 차이 학습", "전문 텍스트 비평", "고난도 청해·요약 훈련"]
    },
    "프랑스어": {
        "A1": ["기초 발음과 필수 표현 익히기", "가족·취미 소개 연습", "짧은 문장 읽기"],
        "A2": ["일상 상황 듣기", "기초 시제 정리", "짧은 개인 편지 쓰기"],
        "B1": ["주제별 회화 연습", "기사 핵심 파악", "감정·경험 표현 확장"],
        "B2": ["논증 구조 말하기", "중급 텍스트 정독", "찬반 에세이 쓰기"],
        "C1": ["시사 이슈 발표", "고급 연결어·표현 사용", "구조화된 장문 쓰기"],
        "C2": ["문체·어조 차이 분석", "고급 토론", "전문적 요약·비평 쓰기"]
    }
}

QUESTIONS = [
    {
        "skill": "듣기",
        "text": "일상적인 주제에 관한 짧고 분명한 안내 방송의 핵심을 이해할 수 있다.",
        "level": "A2"
    },
    {
        "skill": "읽기",
        "text": "기사나 보도에서 저자의 관점과 입장을 파악할 수 있다.",
        "level": "B2"
    },
    {
        "skill": "대화",
        "text": "익숙한 주제에 대해 준비 없이 대화에 참여할 수 있다.",
        "level": "B1"
    },
    {
        "skill": "혼자 말하기",
        "text": "시사 문제에 대한 나의 입장을 밝히고 여러 가능성의 장단점을 설명할 수 있다.",
        "level": "B2"
    },
    {
        "skill": "쓰기",
        "text": "복합적인 사안에 대해 잘 구성된 글을 쓰고 내 관점을 상세하게 설명할 수 있다.",
        "level": "C1"
    },
]

LEVEL_SCORE = {"A1": 1, "A2": 2, "B1": 3, "B2": 4, "C1": 5, "C2": 6}
SCORE_LEVEL = {v: k for k, v in LEVEL_SCORE.items()}


# -----------------------------
# 2) 유틸 함수
# -----------------------------
def estimate_level_from_answers(answers: List[int], questions: List[dict]) -> str:
    """
    answers: 각 문항에 대해 0~4점
    - 0 전혀 아니다
    - 1 거의 아니다
    - 2 보통이다
    - 3 대체로 그렇다
    - 4 매우 그렇다
    """
    weighted_scores = []
    for answer, q in zip(answers, questions):
        base = LEVEL_SCORE[q["level"]]
        adjusted = max(1, min(6, base + (answer - 2)))
        weighted_scores.append(adjusted)

    avg_score = round(sum(weighted_scores) / len(weighted_scores))
    return SCORE_LEVEL[avg_score]


def level_index(level: str) -> int:
    return CEFR_LEVELS.index(level)


def get_next_steps(language: str, selected_level: str, diagnosed_level: str) -> List[str]:
    # 사용자가 직접 고른 수준과 간단 진단 수준을 함께 고려
    chosen_idx = level_index(selected_level)
    diagnosed_idx = level_index(diagnosed_level)
    final_idx = min(chosen_idx, diagnosed_idx + 1) if diagnosed_idx < chosen_idx else diagnosed_idx
    final_level = CEFR_LEVELS[final_idx]

    if language in LANGUAGE_RECOMMENDATIONS:
        return LANGUAGE_RECOMMENDATIONS[language].get(final_level, ["학습 추천 데이터가 없습니다."])
    return ["해당 언어 추천 데이터가 아직 없습니다."]


# -----------------------------
# 3) UI
# -----------------------------
st.markdown(
    """
    <style>
    .main {
        background-color: white;
    }
    .block-container {
        padding-top: 2rem;
        padding-bottom: 2rem;
        max-width: 1000px;
    }
    h1, h2, h3 {
        color: #111111;
    }
    .small-note {
        color: #666666;
        font-size: 0.95rem;
    }
    </style>
    """,
    unsafe_allow_html=True,
)

st.title("외국어평가 방법론")
st.caption("CEFR 자가진단 기반 맞춤 학습 추천 데모")

st.write(
    "이 사이트는 사용자가 스스로 선택한 CEFR 수준과 간단한 자기진단 문항을 바탕으로, "
    "현재 실력을 대략적으로 점검하고 언어별 맞춤 학습 방향을 제안합니다."
)

with st.sidebar:
    st.header("설정")
    language = st.selectbox("언어 선택", ["영어", "독일어", "프랑스어"])
    user_selected_level = st.selectbox("내가 생각하는 현재 수준", CEFR_LEVELS, index=2)
    st.markdown("---")
    st.markdown("**활용 흐름**")
    st.markdown("1. 언어 선택")
    st.markdown("2. 자가 수준 선택")
    st.markdown("3. 간단 테스트 응답")
    st.markdown("4. 맞춤 학습 추천 확인")


tab1, tab2, tab3 = st.tabs(["CEFR 기준 보기", "간단 테스트", "맞춤 학습 추천"])

with tab1:
    st.subheader("CEFR 자가진단표")
    selected_view_level = st.selectbox("기준표에서 볼 수준 선택", CEFR_LEVELS, key="level_view")

    for skill in SKILLS:
        st.markdown(f"**{skill}**")
        st.write(CEFR_DESCRIPTORS[selected_view_level][skill])

    st.info(
        "이 기준은 CEFR 자가진단표를 단순화한 데모 버전입니다. "
        "수업 과제용으로는 원문 디스크립터를 더 촘촘하게 반영하는 것이 좋습니다."
    )

with tab2:
    st.subheader("간단 자기진단 테스트")
    st.write("각 문항에 대해 현재 자신의 수행 가능 정도를 선택하세요.")

    answer_labels = ["0 전혀 아니다", "1 거의 아니다", "2 보통이다", "3 대체로 그렇다", "4 매우 그렇다"]
    numeric_answers = []

    for i, q in enumerate(QUESTIONS):
        st.markdown(f"**문항 {i+1}. [{q['skill']}]** {q['text']}")
        answer = st.radio(
            label=f"응답 {i+1}",
            options=list(range(5)),
            format_func=lambda x: answer_labels[x],
            horizontal=True,
            key=f"q_{i}"
        )
        numeric_answers.append(answer)

    if st.button("진단 결과 확인"):
        diagnosed_level = estimate_level_from_answers(numeric_answers, QUESTIONS)
        st.session_state["diagnosed_level"] = diagnosed_level
        st.success(f"간단 진단 결과: **{diagnosed_level}**")
        st.write(
            f"당신이 직접 선택한 수준은 **{user_selected_level}**, 간단 테스트 추정 수준은 **{diagnosed_level}** 입니다."
        )

with tab3:
    st.subheader("맞춤 학습 추천")
    diagnosed_level = st.session_state.get("diagnosed_level", None)

    if diagnosed_level is None:
        st.warning("먼저 '간단 테스트' 탭에서 진단 결과를 확인해 주세요.")
    else:
        st.markdown(f"- 선택 언어: **{language}**")
        st.markdown(f"- 자가 선택 수준: **{user_selected_level}**")
        st.markdown(f"- 간단 진단 수준: **{diagnosed_level}**")

        next_steps = get_next_steps(language, user_selected_level, diagnosed_level)

        st.markdown("### 추천 학습 방향")
        for step in next_steps:
            st.markdown(f"- {step}")

        st.markdown("### 추천 설명")
        st.write(
            "사용자가 스스로 선택한 수준과 간단 테스트 결과가 다를 수 있기 때문에, "
            "두 값을 함께 반영해 학습 난도를 조정했습니다."
        )

st.markdown("---")
st.markdown(
    "<p class='small-note'>개발 팁: 실제 론칭 시에는 문항/디스크립터/추천학습을 JSON 파일로 분리하고, 이후 CSV 저장 또는 로그인 기능을 추가하세요.</p>",
    unsafe_allow_html=True,
)
