const translations = {
  en: {
    htmlLang: "en",
    sessionLabel: "baekjunho.codex.session",
    heroEyebrow: "Interactive builder log",
    heroTitle: "Codex-Backed Terminal Profile for Baek Junho",
    heroLede:
      "Use the dock at the bottom. Each mode replays one slice of product work: interface, systems, data, and shipping loop.",
    badgeA: "Interface + Systems",
    badgeB: "Automation + Data",
    badgeC: "Build and Ship",
    statusConnected: "connected",
    metricModeLabel: "MODE",
    metricStackLabel: "STACK",
    metricStackValue: "HTML · CSS · JS",
    metricSourceLabel: "SOURCE",
    metricSourceValue: "real codex exec log",
    commandOpen: "Click to open command modes",
    commandRun: "Run",
    paletteTitle: "Select command",
    paletteHint: "click or use arrow keys + enter",
    skipToMain: "Skip to main content",
    nextPrompt: "select next mode from dock",
  },
  ko: {
    htmlLang: "ko",
    sessionLabel: "baekjunho.codex.session",
    heroEyebrow: "인터랙티브 빌더 로그",
    heroTitle: "백준호를 위한 코덱스 기반 터미널 프로필",
    heroLede:
      "하단 도크를 열어 모드를 선택하세요. 인터페이스, 시스템, 데이터, 그리고 배송 루프를 실제 작업 흐름처럼 재생합니다.",
    badgeA: "인터페이스 + 시스템",
    badgeB: "자동화 + 데이터",
    badgeC: "빌드 + 배포",
    statusConnected: "연결됨",
    metricModeLabel: "모드",
    metricStackLabel: "스택",
    metricStackValue: "HTML · CSS · JS",
    metricSourceLabel: "소스",
    metricSourceValue: "실제 codex exec 로그",
    commandOpen: "클릭해서 명령 모드 열기",
    commandRun: "실행",
    paletteTitle: "명령 선택",
    paletteHint: "클릭 또는 방향키 + 엔터",
    skipToMain: "메인 콘텐츠로 건너뛰기",
    nextPrompt: "도크에서 다음 모드를 선택하세요",
  },
};

const commandData = [
  {
    id: "boot",
    command: "/boot-codex",
    description: {
      en: "Replay the real Codex session boot log and repo scan",
      ko: "실제 Codex 세션 부팅 로그와 레포 스캔 재생",
    },
    lines: [
      {
        type: "system",
        marker: "boot",
        text: {
          en: "OpenAI Codex v0.110.0 (research preview)",
          ko: "OpenAI Codex v0.110.0 (연구 프리뷰)",
        },
      },
      {
        type: "output",
        marker: "cfg",
        text: {
          en: "workdir: /Volumes/T7/…/junho-baek | model: gpt-5.4 | sandbox: read-only",
          ko: "workdir: /Volumes/T7/…/junho-baek | model: gpt-5.4 | sandbox: read-only",
        },
      },
      {
        type: "info",
        marker: "mcp",
        text: { en: "mcp startup: ready: playwright, notion", ko: "mcp startup: ready: playwright, notion" },
      },
      {
        type: "command",
        marker: "exec",
        text: {
          en: "/bin/zsh -lc 'rg --files'",
          ko: "/bin/zsh -lc 'rg --files'",
        },
      },
      {
        type: "output",
        marker: "out",
        text: {
          en: "assets/\nREADME.md\nsite/",
          ko: "assets/\nREADME.md\nsite/",
        },
      },
      {
        type: "summary",
        marker: "sum",
        text: {
          en: "Builder summary generated from live repo context.",
          ko: "실시간 레포 컨텍스트 기반 빌더 요약 생성 완료.",
        },
      },
    ],
  },
  {
    id: "builder",
    command: "/builder-profile",
    description: {
      en: "Show the practical builder profile",
      ko: "실무형 빌더 프로필 요약 보기",
    },
    lines: [
      {
        type: "summary",
        marker: "01",
        text: {
          en: "Interactive product builder with a systems mindset.",
          ko: "시스템 마인드셋으로 인터랙티브 제품을 만드는 빌더.",
        },
      },
      {
        type: "summary",
        marker: "02",
        text: {
          en: "Moves between Interface, API, Data, and Delivery without handoff loss.",
          ko: "Interface, API, Data, Delivery를 핸드오프 손실 없이 넘나듭니다.",
        },
      },
      {
        type: "summary",
        marker: "03",
        text: {
          en: "Bias: ship artifacts early, then iterate from feedback.",
          ko: "기준점: 설명보다 작동하는 결과물을 먼저 만들고 피드백으로 반복 개선.",
        },
      },
    ],
  },
  {
    id: "stack",
    command: "/stack-map",
    description: {
      en: "Open the stack map by layer",
      ko: "레이어별 작업 스택 보기",
    },
    lines: [
      {
        type: "info",
        marker: "ui",
        text: {
          en: "Interface -> React, TypeScript, motion-aware product UI",
          ko: "Interface -> React, TypeScript, 모션 중심 제품 UI",
        },
      },
      {
        type: "info",
        marker: "api",
        text: {
          en: "Systems -> FastAPI, APIs, real-time flows, PostgreSQL",
          ko: "Systems -> FastAPI, API 설계, 실시간 플로우, PostgreSQL",
        },
      },
      {
        type: "info",
        marker: "data",
        text: {
          en: "Data -> Python automation, crawling, analytics, recommendation",
          ko: "Data -> Python 자동화, 크롤링, 분석, 추천 로직",
        },
      },
      {
        type: "output",
        marker: "note",
        text: {
          en: "Strength: connecting layers into one product loop.",
          ko: "강점: 개별 기술보다 레이어 연결을 통한 제품 루프 구축.",
        },
      },
    ],
  },
  {
    id: "projects",
    command: "/selected-builds",
    description: {
      en: "Jump through representative projects",
      ko: "대표 프로젝트 바로가기",
    },
    lines: [
      {
        type: "link",
        marker: "git",
        text: {
          en: "AutoHRAnalytics -> Notion API, FastAPI, React",
          ko: "AutoHRAnalytics -> Notion API, FastAPI, React",
        },
        href: "https://github.com/junho-baek/AutoHRAnalytics",
      },
      {
        type: "link",
        marker: "git",
        text: {
          en: "InsideOutDJ -> diary-based recommendation product",
          ko: "InsideOutDJ -> 일기 기반 추천 서비스",
        },
        href: "https://github.com/junho-baek/Ybigta-25th-project-InsideOutDJ",
      },
      {
        type: "link",
        marker: "git",
        text: {
          en: "zoom -> real-time interaction exploration",
          ko: "zoom -> 실시간 인터랙션 실험",
        },
        href: "https://github.com/junho-baek/zoom",
      },
      {
        type: "link",
        marker: "git",
        text: {
          en: "remixstudy -> TypeScript, Supabase, PostgreSQL",
          ko: "remixstudy -> TypeScript, Supabase, PostgreSQL",
        },
        href: "https://github.com/junho-baek/remixstudy",
      },
    ],
  },
  {
    id: "loop",
    command: "/shipping-loop",
    description: {
      en: "Show the repeatable shipping loop",
      ko: "반복 가능한 배송 루프 보기",
    },
    lines: [
      {
        type: "command",
        marker: "loop",
        text: {
          en: "friction -> prototype -> interface -> api + data -> automation -> iterate",
          ko: "friction -> prototype -> interface -> api + data -> automation -> iterate",
        },
      },
      {
        type: "output",
        marker: "why",
        text: {
          en: "Loop quality dominates stack preference.",
          ko: "스택 선호보다 루프 품질이 결과를 좌우합니다.",
        },
      },
      {
        type: "summary",
        marker: "ship",
        text: {
          en: "Fastest path to signal: run, observe, refine.",
          ko: "신호를 가장 빨리 얻는 방법: 실행하고 관찰하고 고치기.",
        },
      },
    ],
  },
  {
    id: "links",
    command: "/open-links",
    description: {
      en: "Open public surfaces",
      ko: "공개 채널 열기",
    },
    lines: [
      {
        type: "link",
        marker: "web",
        text: {
          en: "GitHub profile",
          ko: "GitHub 프로필",
        },
        href: "https://github.com/junho-baek",
      },
      {
        type: "link",
        marker: "web",
        text: {
          en: "Repositories tab",
          ko: "Repositories 탭",
        },
        href: "https://github.com/junho-baek?tab=repositories",
      },
      {
        type: "link",
        marker: "web",
        text: {
          en: "Interactive terminal source",
          ko: "인터랙티브 터미널 소스",
        },
        href: "https://github.com/junho-baek/junho-baek/tree/main/site",
      },
    ],
  },
];

const glyphFrames = ["(◕‿◕)", "(•ᴗ•)", "(≧◡≦)", "(^‿^)"];

const terminalOutput = document.getElementById("terminal-output");
const commandBar = document.getElementById("command-bar");
const commandLabel = document.getElementById("command-label");
const metricMode = document.getElementById("metric-mode");
const palette = document.getElementById("palette");
const paletteList = document.getElementById("palette-list");
const paletteBackdrop = document.getElementById("palette-backdrop");
const langToggle = document.getElementById("lang-toggle");
const glyphFace = document.getElementById("glyph-face");
const params = new URLSearchParams(window.location.search);

const browserLanguages = navigator.languages && navigator.languages.length > 0 ? navigator.languages : [navigator.language];
const browserDefault = browserLanguages.some((entry) => String(entry).toLowerCase().startsWith("ko")) ? "ko" : "en";
const defaultLanguage = params.get("lang") || localStorage.getItem("terminal-language") || browserDefault;

let language = defaultLanguage === "ko" ? "ko" : "en";
let activeIndex = Math.max(
  0,
  commandData.findIndex((item) => item.id === params.get("cmd") || item.command === params.get("cmd"))
);
let highlightedIndex = activeIndex;
let typingToken = 0;

function pick(value) {
  if (typeof value === "string") {
    return value;
  }
  return value[language] ?? value.en;
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function updateQueryState(paletteOpen) {
  const next = new URLSearchParams(window.location.search);
  next.set("lang", language);
  next.set("cmd", commandData[activeIndex].id);
  if (paletteOpen) {
    next.set("palette", "1");
  } else {
    next.delete("palette");
  }
  window.history.replaceState(null, "", `${window.location.pathname}?${next.toString()}`);
}

function applyTranslations() {
  document.documentElement.lang = translations[language].htmlLang;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (translations[language][key]) {
      element.textContent = translations[language][key];
    }
  });

  langToggle.textContent = language === "en" ? "KO" : "EN";
}

function buildLine(line, typing = false) {
  const row = document.createElement("div");
  row.className = `terminal-line line-enter type-${line.type}`;

  const marker = document.createElement("span");
  marker.className = "line-marker";
  marker.textContent = line.marker;

  const value = document.createElement("span");
  value.className = "line-value";

  let target = value;
  if (line.href) {
    const anchor = document.createElement("a");
    anchor.href = line.href;
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
    value.appendChild(anchor);
    target = anchor;
  }

  if (typing) {
    target.classList.add("typing");
  }

  row.appendChild(marker);
  row.appendChild(value);
  return { row, target };
}

async function typeText(target, text, token) {
  let output = "";
  for (let i = 0; i < text.length; i += 1) {
    if (typingToken !== token) {
      return false;
    }

    output += text[i];
    target.textContent = output;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;

    const char = text[i];
    let delay = 18;
    if (char === " ") {
      delay = 8;
    } else if (/[,.!?]/.test(char)) {
      delay = 30;
    } else if (char === "\n") {
      delay = 48;
    }
    await wait(delay);
  }

  return true;
}

function updateCommandSummary(command) {
  commandLabel.textContent = `${command.command} ${pick(command.description)}`;
  metricMode.textContent = command.command;
}

async function renderCommand(index) {
  typingToken += 1;
  const token = typingToken;
  const command = commandData[index];

  activeIndex = index;
  updateCommandSummary(command);
  syncPalette();
  updateQueryState(!palette.classList.contains("hidden"));

  terminalOutput.innerHTML = "";

  const intro = buildLine(
    {
      type: "command",
      marker: "user",
      text: `junho@builder:~$ ${command.command}`,
    },
    true
  );
  terminalOutput.appendChild(intro.row);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;

  await typeText(intro.target, `junho@builder:~$ ${command.command}`, token);
  intro.target.classList.remove("typing");
  await wait(130);

  if (typingToken !== token) {
    return;
  }

  for (const line of command.lines) {
    if (typingToken !== token) {
      return;
    }

    const item = buildLine(line, true);
    terminalOutput.appendChild(item.row);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
    await typeText(item.target, pick(line.text), token);
    item.target.classList.remove("typing");
    await wait(line.type === "summary" ? 220 : 140);
  }

  if (typingToken !== token) {
    return;
  }

  const next = buildLine(
    {
      type: "system",
      marker: "hint",
      text: translations[language].nextPrompt,
    },
    false
  );
  next.target.textContent = translations[language].nextPrompt;
  terminalOutput.appendChild(next.row);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function syncPalette() {
  paletteList.innerHTML = "";

  commandData.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `palette-item${index === highlightedIndex ? " active" : ""}`;
    button.innerHTML = `
      <span class="palette-command">${item.command}</span>
      <span class="palette-description">${pick(item.description)}</span>
    `;
    button.addEventListener("click", () => {
      closePalette();
      renderCommand(index);
    });
    paletteList.appendChild(button);
  });
}

function openPalette() {
  highlightedIndex = activeIndex;
  palette.classList.remove("hidden");
  paletteBackdrop.classList.remove("hidden");
  commandBar.setAttribute("aria-expanded", "true");
  syncPalette();
  updateQueryState(true);
}

function closePalette() {
  palette.classList.add("hidden");
  paletteBackdrop.classList.add("hidden");
  commandBar.setAttribute("aria-expanded", "false");
  updateQueryState(false);
}

function toggleLanguage() {
  language = language === "en" ? "ko" : "en";
  localStorage.setItem("terminal-language", language);
  applyTranslations();
  syncPalette();
  renderCommand(activeIndex);
  updateQueryState(!palette.classList.contains("hidden"));
}

function startGlyphAnimation() {
  let frame = 0;
  window.setInterval(() => {
    frame = (frame + 1) % glyphFrames.length;
    glyphFace.textContent = glyphFrames[frame];
  }, 620);
}

function bindCursorLight() {
  const root = document.documentElement;
  const setPosition = (x, y, visible = "1") => {
    root.style.setProperty("--cursor-x", `${x}px`);
    root.style.setProperty("--cursor-y", `${y}px`);
    root.style.setProperty("--cursor-visible", visible);
  };

  window.addEventListener("pointermove", (event) => {
    setPosition(event.clientX, event.clientY, "1");
  });

  window.addEventListener("pointerleave", () => {
    root.style.setProperty("--cursor-visible", "0");
  });

  window.addEventListener("pointerenter", () => {
    root.style.setProperty("--cursor-visible", "1");
  });
}

commandBar.addEventListener("click", () => {
  if (palette.classList.contains("hidden")) {
    openPalette();
  } else {
    closePalette();
  }
});
paletteBackdrop.addEventListener("click", closePalette);
langToggle.addEventListener("click", toggleLanguage);

window.addEventListener("keydown", (event) => {
  const paletteOpen = !palette.classList.contains("hidden");

  if (event.key === "Escape" && paletteOpen) {
    closePalette();
    return;
  }

  if (!paletteOpen) {
    if (event.key === "Enter" && document.activeElement === commandBar) {
      openPalette();
    }
    return;
  }

  if (event.key === "ArrowDown") {
    event.preventDefault();
    highlightedIndex = (highlightedIndex + 1) % commandData.length;
    syncPalette();
    return;
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();
    highlightedIndex = (highlightedIndex - 1 + commandData.length) % commandData.length;
    syncPalette();
    return;
  }

  if (event.key === "Enter") {
    event.preventDefault();
    const picked = highlightedIndex;
    closePalette();
    renderCommand(picked);
  }
});

applyTranslations();
bindCursorLight();
startGlyphAnimation();
renderCommand(activeIndex);

if (params.get("palette") === "1") {
  openPalette();
}
