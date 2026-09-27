const portfolioResponse = await fetch(new URL('./portfolio.json', import.meta.url));
if (!portfolioResponse.ok) throw new Error('Portfolio data could not be loaded');
const portfolio = await portfolioResponse.json();

const WHO_IS_BANNER = [
  "██╗    ██╗██╗  ██╗ ██████╗     ██╗███████╗",
  "██║    ██║██║  ██║██╔═══██╗    ██║██╔════╝",
  "██║ █╗ ██║███████║██║   ██║    ██║███████╗",
  "██║███╗██║██╔══██║██║   ██║    ██║╚════██║",
  "╚███╔███╔╝██║  ██║╚██████╔╝    ██║███████║",
  " ╚══╝╚══╝ ╚═╝  ╚═╝ ╚═════╝     ╚═╝╚══════╝",
];

const JUNHO_BAEK_BANNER = [
  "     ██╗██╗   ██╗███╗   ██╗██╗  ██╗ ██████╗     ██████╗  █████╗ ███████╗██╗  ██╗",
  "     ██║██║   ██║████╗  ██║██║  ██║██╔═══██╗    ██╔══██╗██╔══██╗██╔════╝██║ ██╔╝",
  "     ██║██║   ██║██╔██╗ ██║███████║██║   ██║    ██████╔╝███████║█████╗  █████╔╝ ",
  "██   ██║██║   ██║██║╚██╗██║██╔══██║██║   ██║    ██╔══██╗██╔══██║██╔══╝  ██╔═██╗ ",
  "╚█████╔╝╚██████╔╝██║ ╚████║██║  ██║╚██████╔╝    ██████╔╝██║  ██║███████╗██║  ██╗",
  " ╚════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝     ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝",
];

const WHO_IS_BANNER_COMPACT = [
  " __      ___  _  ___    ___ ___ ",
  " \\ \\    / / || |/ _ \\  |_ _/ __|",
  "  \\ \\/\\/ /| __ | (_) |  | |\\__ \\",
  "   \\_/\\_/ |_||_|\\___/  |___|___/",
];

const JUNHO_BAEK_BANNER_COMPACT = [
  " _ _  _ _  _ _  _ ____    ___  ____ ____ _  _ __.",
  " | |  | |\\ | |__| |  | __ |__] |__| |___ |_/   _]",
  "_| |__| | \\| |  | |__|    |__] |  | |___ | \\_  . ",
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
    command: "who is junho-baek",
    description: {
      en: "introduction",
      ko: "자기소개",
    },
    lines: [
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
          en: "I turn ambiguous business problems into testable agent workflows and products.",
          ko: "모호한 비즈니스 문제를 검증 가능한 Agent Workflow와 제품으로 바꾸는 백준호입니다.",
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
        type: "section",
        marker: "▸",
        text: {
          en: "Identity",
          ko: "정체성",
        },
      },
      {
        type: "point",
        marker: "·",
        text: {
          en: "AI-Native Product Builder across frontend, backend, data, and agent systems",
          ko: "Frontend·Backend·Data·AI Agent를 연결하는 AI-Native Product Builder",
        },
      },
      {
        type: "point",
        marker: "·",
        text: {
          en: "Fast delegation to AI; ownership recovered through architecture, policy, and evidence",
          ko: "AI에 빠르게 위임하되 구조·정책·검증으로 결과의 책임을 회수",
        },
      },
      {
        type: "section",
        marker: "▸",
        text: {
          en: "How I Work",
          ko: "문제 해결 방식",
        },
      },
      {
        type: "point",
        marker: "·",
        text: {
          en: "Define the problem, constraints, and acceptance criteria before implementation",
          ko: "구현 전에 문제·제약·완료 조건을 먼저 고정합니다.",
        },
      },
      {
        type: "point",
        marker: "·",
        text: {
          en: "Separate probabilistic model proposals from deterministic safety and publish gates",
          ko: "확률적 모델 제안과 결정론적 안전·발행 gate를 분리합니다.",
        },
      },
      {
        type: "point",
        marker: "·",
        text: {
          en: "Close the loop with tests, evidence, and a closed-book explanation of the system",
          ko: "테스트·증거·closed-book 설명으로 검증 루프를 닫습니다.",
        },
      },
      {
        type: "section",
        marker: "▸",
        text: {
          en: "Core Skills",
          ko: "핵심 스킬",
        },
      },
      {
        type: "skill",
        marker: "skill",
        text: {
          en: "Agent Systems: OpenAI/Cloudflare Agents SDK · LangGraph · MCP · runtime skills",
          ko: "Agent Systems: OpenAI/Cloudflare Agents SDK · LangGraph · MCP · runtime skills",
        },
      },
      {
        type: "skill",
        marker: "skill",
        text: {
          en: "Product Engineering: TypeScript · React Router/Next.js · Python · FastAPI",
          ko: "Product Engineering: TypeScript · React Router/Next.js · Python · FastAPI",
        },
      },
      {
        type: "skill",
        marker: "skill",
        text: {
          en: "Data/Automation: PostgreSQL · Supabase · Redis · pgvector · n8n · queues",
          ko: "Data/Automation: PostgreSQL · Supabase · Redis · pgvector · n8n · queues",
        },
      },
      {
        type: "skill",
        marker: "skill",
        text: {
          en: "Quality: deterministic gates · type safety · unit/E2E tests · secret hygiene",
          ko: "Quality: deterministic gates · type safety · unit/E2E tests · secret hygiene",
        },
      },
      {
        type: "skill",
        marker: "skill",
        text: {
          en: "Delivery: Docker · AWS · Cloudflare · user validation and feedback loops",
          ko: "Delivery: Docker · AWS · Cloudflare · 사용자 검증과 feedback loop",
        },
      },
      {
        type: "section",
        marker: "▸",
        text: {
          en: "Activity & Awards",
          ko: "활동 및 수상",
        },
      },
      {
        type: "point",
        marker: "award",
        text: {
          en: "COFATHON Olive Young Track (2026.07) — TOP 3, final 2nd",
          ko: "COFATHON Olive Young Track (2026.07) — TOP 3, 최종 2위",
        },
      },
      {
        type: "point",
        marker: "award",
        text: {
          en: "Y-Startup³ Entrepreneurship Competition (2026.02) — Excellence Award",
          ko: "Y-Startup³ 창업 경진대회 (2026.02) — 우수상",
        },
      },
      {
        type: "point",
        marker: "award",
        text: {
          en: "Yonsei GenAI Contest (2025.12) — Gold Prize",
          ko: "연세 GenAI 활용 경진대회 (2025.12) — 금상",
        },
      },
      {
        type: "point",
        marker: "award",
        text: {
          en: "Sogang x Upstage AI Workflow Hackathon (2025.11) — Top Excellence Award",
          ko: "서강대 x Upstage AI Workflow Hackathon (2025.11) — 최우수상",
        },
      },
      {
        type: "point",
        marker: "award",
        text: {
          en: "Yonsei x Upstage LLM Query Hackathon (2025.11) — Grand Prize",
          ko: "연세대 x Upstage LLM Query Hackathon (2025.11) — 대상",
        },
      },
      {
        type: "point",
        marker: "activity",
        text: {
          en: "YBIGTA Data Engineering (2024.09 - 2025.06), SKT AI Fellowship 7th (2025.06 - 2025.11)",
          ko: "YBIGTA Data Engineering(2024.09-2025.06), SKT AI Fellowship 7기(2025.06-2025.11)",
        },
      },
      {
        type: "link",
        marker: "link",
        text: {
          en: "🐙 GitHub Profile",
          ko: "🐙 GitHub 프로필",
        },
        href: "https://github.com/junho-baek",
      },
      {
        type: "link",
        marker: "doc",
        text: {
          en: "open detailed profile document -> /site/docs/profile.html",
          ko: "자기소개 상세 문서 열기 -> /site/docs/profile.html",
        },
        href: "./docs/profile.html",
      },
    ],
  },
  {id: "projects", command: "projects", description: {en: "selected projects", ko: "대표 프로젝트"}, lines: []},
];

// Product experience is separate from the public repository list.
const line = (type, marker, text, href) => ({type, marker, text, ...(href ? {href} : {})});
commandData[1].lines = [
  line('highlight', '04', {ko: '든든AI · ParrotKit · COFATHON · SKT AI Fellowship', en: 'DundunAI · ParrotKit · COFATHON · SKT AI Fellowship'}),
  ...portfolio.projects.flatMap(project => [
    line('section', project.id, project.name),
    line('point', 'why', project.tagline),
    line('skill', 'built', project.built),
    line('link', 'open', {ko: `${project.name} 설계와 구현 보기`, en: `Explore ${project.name}`}, `?cmd=${project.id}`),
  ]),
  line('link', 'cases', {ko: '네 프로젝트 상세 보기', en: 'Read all four case studies'}, './docs/projects.html'),
];
for (const project of portfolio.projects) {
  commandData.push({
    id: project.id, command: project.id,
    description: {ko: project.name, en: project.name},
    lines: [
      line('section', project.id, project.name),
      line('highlight', 'why', project.tagline),
      line('point', 'problem', project.problem),
      line('point', 'decision', project.decision),
      line('skill', 'flow', project.flow.join(' → ')),
      line('point', 'built', project.built),
      line('point', 'result', project.outcome),
      line('info', 'scope', project.boundary),
      line('skill', 'stack', project.stack.join(' · ')),
      line('link', 'case', {ko: '설계 판단 자세히 읽기', en: 'Read design decisions'}, `./docs/projects.html#${project.id}`),
    ],
  });
}

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
let activeBannerState = null;
let instantOutput = window.matchMedia('(prefers-reduced-motion: reduce)').matches || params.get('motion') === 'off';

function pick(value) {
  if (typeof value === "string" || Array.isArray(value)) {
    return value;
  }
  return value[language] ?? value.en;
}

function wait(ms) {
  if (instantOutput) return Promise.resolve();
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
  if (instantOutput) { node.textContent = text; return typingToken === token; }
  let output = "";
  for (let i = 0; i < text.length; i += 1) {
    if (typingToken !== token) {
      return false;
    }
    if (instantOutput) { node.textContent = text; return true; }
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
  const responsiveLines =
    window.innerWidth <= 640
      ? [...WHO_IS_BANNER_COMPACT, "", ...JUNHO_BAEK_BANNER_COMPACT]
      : lines;
  const row = makeLineRow("banner", "fig");
  const block = document.createElement("div");
  block.className = "banner-block";
  row.valueNode.appendChild(block);
  terminalOutput.appendChild(row.row);
  wireBannerEffects(block, responsiveLines);

  for (const [index, bannerLine] of responsiveLines.entries()) {
    if (typingToken !== token) {
      return;
    }
    const line = document.createElement("div");
    line.className = "banner-line";
    line.style.setProperty("--line-depth", String((index % 5) + 1));
    line.textContent = bannerLine;
    block.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
    await wait(52);
  }
}

function fitBannerBlock(block, lines) {
  const maxChars = lines.reduce((max, line) => Math.max(max, line.length), 0) || 1;
  const availableWidth = Math.max(260, block.clientWidth - 8);
  const unit = availableWidth / (maxChars * 0.62);
  const minSize = window.innerWidth <= 640 ? 7 : 12;
  const maxSize = window.innerWidth <= 640 ? 12 : 23;
  const fitted = Math.min(maxSize, Math.max(minSize, unit));
  block.style.setProperty("--banner-font-size", `${fitted}px`);
}

function wireBannerEffects(block, lines) {
  fitBannerBlock(block, lines);
  activeBannerState = {block, lines};

  const sparkle = document.createElement("span");
  sparkle.className = "banner-spark";
  sparkle.setAttribute("aria-hidden", "true");
  block.appendChild(sparkle);

  const setSparkPoint = (x, y) => {
    block.style.setProperty("--spark-x", `${x}%`);
    block.style.setProperty("--spark-y", `${y}%`);
  };

  block.addEventListener("pointermove", (event) => {
    const rect = block.getBoundingClientRect();
    if (!rect.width || !rect.height) {
      return;
    }
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const shift = ((x - 50) / 50) * 2.8;
    block.style.setProperty("--banner-x", `${x}%`);
    block.style.setProperty("--banner-y", `${y}%`);
    block.style.setProperty("--banner-shift", `${shift.toFixed(2)}px`);
    setSparkPoint(x, y);
    block.classList.add("banner-hover");
  });

  block.addEventListener("pointerleave", () => {
    block.style.setProperty("--banner-x", "50%");
    block.style.setProperty("--banner-y", "50%");
    block.style.setProperty("--banner-shift", "0px");
    setSparkPoint(50, 50);
    block.classList.remove("banner-hover");
  });
}

async function appendRegularLine(line, token) {
  const row = makeLineRow(line.type, line.marker);
  terminalOutput.appendChild(row.row);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;

  if (line.href) {
    const anchor = document.createElement("a");
    anchor.href = line.href;
    if (line.href.startsWith('https:')) {
      anchor.target = "_blank";
      anchor.rel = "noreferrer";
    }
    if (line.href.startsWith('?cmd=')) {
      anchor.href = `${line.href}&lang=${language}`;
      anchor.addEventListener('click', event => {
        event.preventDefault();
        const id = new URL(anchor.href).searchParams.get('cmd');
        renderCommand(commandData.findIndex(command => command.id === id));
      });
    }
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
  commandLabel.textContent = `${command.command} | ${pick(command.description)}`;
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
  terminalOutput.dataset.ready = 'false';
  activeBannerState = null;

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

  if (window.innerWidth > 640) {
    const hint = makeLineRow("info", "next");
    hint.valueNode.textContent = translations[language].nextPrompt;
    terminalOutput.appendChild(hint.row);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }
  terminalOutput.dataset.ready = 'true';
  terminalOutput.scrollTop = 0;
}

function syncPalette() {
  paletteList.innerHTML = "";
  commandData.forEach((command, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `palette-item${index === highlightedIndex ? " active" : ""}`;
    button.innerHTML = `
      <span class="palette-command">${command.command}</span>
      <span class="palette-description">| ${pick(command.description)}</span>
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

  window.addEventListener("resize", () => {
    if (!activeBannerState) {
      return;
    }
    fitBannerBlock(activeBannerState.block, activeBannerState.lines);
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
document.getElementById('skip-animation').addEventListener('click', () => {
  instantOutput = true;
  renderCommand(activeIndex);
});

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
