const WHO_IS_BANNER = [
  " __          ___    _  ____    _____  _____ ",
  " \\ \\        / / |  | |/ __ \\  |_   _|/ ____|",
  "  \\ \\  /\\  / /| |__| | |  | |   | | | (___  ",
  "   \\ \\/  \\/ / |  __  | |  | |   | |  \\___ \\ ",
  "    \\  /\\  /  | |  | | |__| |  _| |_ ____) |",
  "     \\/  \\/   |_|  |_|\\____/  |_____|_____/ ",
];

const JUNHO_BAEK_BANNER = [
  "       _ _    _ _   _ _    _  ____    ____          ______ _  __",
  "      | | |  | | \\ | | |  | |/ __ \\  |  _ \\   /\\   |  ____| |/ /",
  "      | | |  | |  \\| | |__| | |  | | | |_) | /  \\  | |__  | ' / ",
  "  _   | | |  | | . ` |  __  | |  | | |  _ < / /\\ \\ |  __| |  <  ",
  " | |__| | |__| | |\\  | |  | | |__| | | |_) / ____ \\| |____| . \\ ",
  "  \\____/ \\____/|_| \\_|_|  |_|\\____/  |____/_/    \\_\\______|_|\\_\\",
];

const translations = {
  en: {
    htmlLang: "en",
    skipToMain: "Skip to main content",
    terminalPath: "user@junho:~$ cat who_is_junho_baek.md",
    statusReady: "ready",
    metricModeLabel: "MODE",
    metricLangLabel: "LANG",
    metricSourceLabel: "SOURCE",
    commandOpen: "Open command modes",
    commandRun: "Run",
    paletteTitle: "Select command",
    paletteHint: "click or use arrow keys + enter",
    nextPrompt: "pick next mode from the dock",
  },
  ko: {
    htmlLang: "ko",
    skipToMain: "메인 콘텐츠로 건너뛰기",
    terminalPath: "user@junho:~$ cat who_is_junho_baek.md",
    statusReady: "준비됨",
    metricModeLabel: "모드",
    metricLangLabel: "언어",
    metricSourceLabel: "소스",
    commandOpen: "명령 모드 열기",
    commandRun: "실행",
    paletteTitle: "명령 선택",
    paletteHint: "클릭 또는 방향키 + 엔터",
    nextPrompt: "도크에서 다음 모드를 선택하세요",
  },
};

const commandData = [
  {
    id: "who",
    command: "/who-is-junho-baek",
    description: {
      en: "Render profile headline in FIGlet-style terminal art",
      ko: "FIGlet 스타일 터미널 헤드라인 출력",
    },
    lines: [
      {
        type: "info",
        marker: "[0]",
        text: {
          en: "/home",
          ko: "/home",
        },
      },
      {
        type: "command",
        marker: "user",
        text: {
          en: "cat who_is_junho_baek.md",
          ko: "cat who_is_junho_baek.md",
        },
      },
      {
        type: "highlight",
        marker: "*",
        text: {
          en: "where interface, systems, and data ship together.",
          ko: "인터페이스, 시스템, 데이터가 한 루프로 배송되는 곳.",
        },
      },
      {
        type: "banner",
        marker: "fig",
        text: {
          en: [...WHO_IS_BANNER, "", ...JUNHO_BAEK_BANNER],
          ko: [...WHO_IS_BANNER, "", ...JUNHO_BAEK_BANNER],
        },
      },
      {
        type: "summary",
        marker: "bio",
        text: {
          en: "- Interactive product builder from Seoul, Yonsei University",
          ko: "- 서울, 연세대학교 기반 인터랙티브 프로덕트 빌더",
        },
      },
      {
        type: "summary",
        marker: "bio",
        text: {
          en: "- Focus: frontend experience + backend reliability + automation",
          ko: "- 집중 영역: 프론트 UX + 백엔드 안정성 + 자동화",
        },
      },
      {
        type: "summary",
        marker: "bio",
        text: {
          en: "- Bias: ship fast, measure signal, tighten loop",
          ko: "- 작업 성향: 빠르게 배포하고 신호를 측정해 루프를 개선",
        },
      },
    ],
  },
  {
    id: "projects",
    command: "/selected-builds",
    description: {
      en: "Open representative projects",
      ko: "대표 프로젝트 열기",
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
          en: "InsideOutDJ -> diary-driven recommendation",
          ko: "InsideOutDJ -> 일기 기반 추천 제품",
        },
        href: "https://github.com/junho-baek/Ybigta-25th-project-InsideOutDJ",
      },
      {
        type: "link",
        marker: "git",
        text: {
          en: "zoom -> realtime interaction exploration",
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
      en: "Show repeatable build loop",
      ko: "반복 가능한 빌드 루프 보기",
    },
    lines: [
      {
        type: "command",
        marker: "loop",
        text: {
          en: "friction -> prototype -> ship -> observe -> iterate",
          ko: "friction -> prototype -> ship -> observe -> iterate",
        },
      },
      {
        type: "summary",
        marker: "why",
        text: {
          en: "speed is not chaos when feedback closes quickly.",
          ko: "피드백 루프가 짧으면 속도는 혼란이 아니라 경쟁력입니다.",
        },
      },
      {
        type: "summary",
        marker: "ops",
        text: {
          en: "clean handoff from UI to API to data automation.",
          ko: "UI -> API -> 데이터 자동화까지 끊김 없는 핸드오프.",
        },
      },
    ],
  },
];

const terminalOutput = document.getElementById("terminal-output");
const commandBar = document.getElementById("command-bar");
const commandLabel = document.getElementById("command-label");
const metricMode = document.getElementById("metric-mode");
const metricLang = document.getElementById("metric-lang");
const palette = document.getElementById("palette");
const paletteList = document.getElementById("palette-list");
const paletteBackdrop = document.getElementById("palette-backdrop");
const langToggle = document.getElementById("lang-toggle");
const params = new URLSearchParams(window.location.search);

const browserLanguages = navigator.languages && navigator.languages.length > 0 ? navigator.languages : [navigator.language];
const browserDefault = browserLanguages.some((entry) => String(entry).toLowerCase().startsWith("ko")) ? "ko" : "en";
const defaultLanguage = params.get("lang") || localStorage.getItem("terminal-language") || browserDefault;

let language = defaultLanguage === "ko" ? "ko" : "en";
let activeIndex = commandData.findIndex((item) => item.id === params.get("cmd") || item.command === params.get("cmd"));
if (activeIndex < 0) {
  activeIndex = 0;
}
let highlightedIndex = activeIndex;
let typingToken = 0;

function pick(value) {
  if (typeof value === "string" || Array.isArray(value)) {
    return value;
  }
  return value[language] ?? value.en;
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function updateQueryState(paletteOpen) {
  const query = new URLSearchParams(window.location.search);
  query.set("lang", language);
  query.set("cmd", commandData[activeIndex].id);
  if (paletteOpen) {
    query.set("palette", "1");
  } else {
    query.delete("palette");
  }
  window.history.replaceState(null, "", `${window.location.pathname}?${query.toString()}`);
}

function applyTranslations() {
  document.documentElement.lang = translations[language].htmlLang;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (translations[language][key]) {
      node.textContent = translations[language][key];
    }
  });
  langToggle.textContent = language === "en" ? "KO" : "EN";
  metricLang.textContent = language.toUpperCase();
}

function makeLineRow(lineType, marker) {
  const row = document.createElement("div");
  row.className = `terminal-line type-${lineType} line-enter`;

  const markerNode = document.createElement("span");
  markerNode.className = "line-marker";
  markerNode.textContent = marker;

  const valueNode = document.createElement("span");
  valueNode.className = "line-value";

  row.appendChild(markerNode);
  row.appendChild(valueNode);
  return {row, valueNode};
}

async function typeText(node, text, token) {
  let output = "";
  for (let i = 0; i < text.length; i += 1) {
    if (typingToken !== token) {
      return false;
    }
    output += text[i];
    node.textContent = output;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
    const char = text[i];
    let delay = 14;
    if (char === " ") {
      delay = 8;
    }
    if (/[,.!?]/.test(char)) {
      delay = 24;
    }
    if (char === "\n") {
      delay = 36;
    }
    await wait(delay);
  }
  return true;
}

async function appendBanner(lines, token) {
  const row = makeLineRow("banner", "fig");
  const block = document.createElement("div");
  block.className = "banner-block";
  row.valueNode.appendChild(block);
  terminalOutput.appendChild(row.row);

  for (const bannerLine of lines) {
    if (typingToken !== token) {
      return;
    }
    const line = document.createElement("div");
    line.className = "banner-line line-enter";
    line.textContent = bannerLine;
    block.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
    await wait(52);
  }
}

async function appendRegularLine(line, token) {
  const row = makeLineRow(line.type, line.marker);
  terminalOutput.appendChild(row.row);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;

  if (line.href) {
    const anchor = document.createElement("a");
    anchor.href = line.href;
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
    anchor.textContent = pick(line.text);
    row.valueNode.appendChild(anchor);
    await wait(90);
    return;
  }

  row.valueNode.classList.add("typing");
  await typeText(row.valueNode, pick(line.text), token);
  row.valueNode.classList.remove("typing");
  await wait(120);
}

function syncCommandSummary(command) {
  commandLabel.textContent = `${command.command} ${pick(command.description)}`;
  metricMode.textContent = command.command;
}

async function renderCommand(index) {
  typingToken += 1;
  const token = typingToken;

  activeIndex = index;
  highlightedIndex = index;
  const command = commandData[index];
  syncCommandSummary(command);
  syncPalette();
  updateQueryState(!palette.classList.contains("hidden"));
  terminalOutput.innerHTML = "";

  const prompt = makeLineRow("command", "user");
  prompt.valueNode.classList.add("typing");
  terminalOutput.appendChild(prompt.row);
  await typeText(prompt.valueNode, `junho@builder:~$ ${command.command}`, token);
  prompt.valueNode.classList.remove("typing");
  await wait(120);

  for (const line of command.lines) {
    if (typingToken !== token) {
      return;
    }
    if (line.type === "banner") {
      await appendBanner(pick(line.text), token);
      continue;
    }
    await appendRegularLine(line, token);
  }

  if (typingToken !== token) {
    return;
  }

  const hint = makeLineRow("info", "next");
  hint.valueNode.textContent = translations[language].nextPrompt;
  terminalOutput.appendChild(hint.row);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function syncPalette() {
  paletteList.innerHTML = "";
  commandData.forEach((command, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `palette-item${index === highlightedIndex ? " active" : ""}`;
    button.innerHTML = `
      <span class="palette-command">${command.command}</span>
      <span class="palette-description">${pick(command.description)}</span>
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
}

function bindCursorLight() {
  const root = document.documentElement;
  const update = (x, y, alpha = "1") => {
    root.style.setProperty("--cursor-x", `${x}px`);
    root.style.setProperty("--cursor-y", `${y}px`);
    root.style.setProperty("--cursor-alpha", alpha);
  };

  window.addEventListener("pointermove", (event) => {
    update(event.clientX, event.clientY, "1");
  });
  window.addEventListener("pointerleave", () => {
    root.style.setProperty("--cursor-alpha", "0");
  });
  window.addEventListener("pointerenter", () => {
    root.style.setProperty("--cursor-alpha", "1");
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
    const selected = highlightedIndex;
    closePalette();
    renderCommand(selected);
  }
});

applyTranslations();
bindCursorLight();
renderCommand(activeIndex);
if (params.get("palette") === "1") {
  openPalette();
}
