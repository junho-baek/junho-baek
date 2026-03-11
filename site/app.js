const commandData = [
  {
    id: "boot",
    command: "/boot-codex",
    description: "Replay the real Codex session boot log and repo scan",
    lines: [
      { type: "system", marker: "boot", text: "OpenAI Codex v0.110.0 (research preview)" },
      {
        type: "output",
        marker: "cfg",
        text: "workdir: /Volumes/T7/.../junho-baek | model: gpt-5.4 | sandbox: read-only",
      },
      { type: "info", marker: "mcp", text: "mcp: playwright starting" },
      { type: "info", marker: "mcp", text: "mcp: notion starting" },
      { type: "info", marker: "mcp", text: "mcp startup: ready: playwright, notion" },
      {
        type: "warn",
        marker: "net",
        text: "warning: Falling back from WebSockets to HTTPS transport",
      },
      {
        type: "command",
        marker: "exec",
        text: "/bin/zsh -lc 'ls -la' in /Volumes/T7/.../junho-baek",
      },
      { type: "output", marker: "out", text: "README.md\nassets/\nsite/" },
      { type: "command", marker: "exec", text: "/bin/zsh -lc 'rg --files'" },
      { type: "output", marker: "out", text: "assets/capability-hero.svg\nREADME.md\nsite/index.html" },
      { type: "command", marker: "exec", text: "/bin/zsh -lc \"sed -n '1,220p' README.md\"" },
      {
        type: "summary",
        marker: "sum",
        text: "Builder summary generated from the live repo context.",
      },
    ],
  },
  {
    id: "builder",
    command: "/builder-profile",
    description: "Show the actual builder summary produced by Codex",
    lines: [
      {
        type: "summary",
        marker: "01",
        text: "Interactive product builder with a systems mindset.",
      },
      {
        type: "summary",
        marker: "02",
        text: "Works across Interface, Systems, Data, and Delivery.",
      },
      {
        type: "summary",
        marker: "03",
        text: "Builds by spotting friction, prototyping fast, wiring UI to APIs and data, then iterating.",
      },
    ],
  },
  {
    id: "stack",
    command: "/stack-map",
    description: "Open the working stack and the kind of problems each layer solves",
    lines: [
      { type: "info", marker: "ui", text: "Interface -> React, TypeScript, motion-aware product UI" },
      { type: "info", marker: "api", text: "Systems -> FastAPI, APIs, real-time flows, PostgreSQL-backed services" },
      { type: "info", marker: "data", text: "Data -> Python automation, crawling, analytics, recommendation logic" },
      { type: "info", marker: "ship", text: "Delivery -> clone, prototype, deploy, learn, refine" },
      {
        type: "output",
        marker: "note",
        text: "The point is not one specialty in isolation. The point is moving cleanly between them.",
      },
    ],
  },
  {
    id: "projects",
    command: "/selected-builds",
    description: "Jump through projects that represent the product surface",
    lines: [
      {
        type: "link",
        marker: "git",
        text: "AutoHRAnalytics -> Notion API, FastAPI, React",
        href: "https://github.com/junho-baek/AutoHRAnalytics",
      },
      {
        type: "link",
        marker: "git",
        text: "InsideOutDJ -> diary-based recommendation product",
        href: "https://github.com/junho-baek/Ybigta-25th-project-InsideOutDJ",
      },
      {
        type: "link",
        marker: "git",
        text: "zoom -> real-time interaction exploration",
        href: "https://github.com/junho-baek/zoom",
      },
      {
        type: "link",
        marker: "git",
        text: "remixstudy -> TypeScript, Supabase, PostgreSQL",
        href: "https://github.com/junho-baek/remixstudy",
      },
    ],
  },
  {
    id: "loop",
    command: "/shipping-loop",
    description: "Show the loop that repeats across product work",
    lines: [
      { type: "command", marker: "loop", text: "friction -> prototype -> interface -> api + data -> automation -> iterate" },
      { type: "output", marker: "why", text: "The loop matters more than any single stack choice." },
      { type: "output", marker: "ship", text: "The fastest path to signal is a working artifact, not a long explanation." },
    ],
  },
  {
    id: "links",
    command: "/open-links",
    description: "Open the public surfaces",
    lines: [
      {
        type: "link",
        marker: "web",
        text: "GitHub profile",
        href: "https://github.com/junho-baek",
      },
      {
        type: "link",
        marker: "web",
        text: "Repositories tab",
        href: "https://github.com/junho-baek?tab=repositories",
      },
      {
        type: "link",
        marker: "web",
        text: "Profile README repository",
        href: "https://github.com/junho-baek/junho-baek",
      },
    ],
  },
];

const terminalOutput = document.getElementById("terminal-output");
const commandBar = document.getElementById("command-bar");
const commandLabel = document.getElementById("command-label");
const metricMode = document.getElementById("metric-mode");
const palette = document.getElementById("palette");
const paletteList = document.getElementById("palette-list");
const paletteBackdrop = document.getElementById("palette-backdrop");
const params = new URLSearchParams(window.location.search);

let activeIndex = Math.max(
  0,
  commandData.findIndex((item) => item.id === params.get("cmd") || item.command === params.get("cmd"))
);
let typingToken = 0;

function makeLine(line, isTyping = false) {
  const row = document.createElement("div");
  row.className = `terminal-line type-${line.type}`;

  const marker = document.createElement("span");
  marker.className = "line-marker";
  marker.textContent = line.marker;

  const value = document.createElement("span");
  value.className = "line-value";

  if (line.href) {
    const anchor = document.createElement("a");
    anchor.href = line.href;
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
    anchor.textContent = line.text;
    value.appendChild(anchor);
  } else {
    value.textContent = line.text;
  }

  if (isTyping) {
    value.classList.add("typing");
  }

  row.appendChild(marker);
  row.appendChild(value);
  return row;
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function renderCommand(index) {
  typingToken += 1;
  const currentToken = typingToken;
  const command = commandData[index];

  activeIndex = index;
  commandLabel.textContent = `${command.command} ${command.description}`;
  metricMode.textContent = command.command;
  syncPalette();

  terminalOutput.innerHTML = "";

  const introLine = makeLine({
    type: "command",
    marker: "user",
    text: `junho@builder:~$ ${command.command}`,
  }, true);
  terminalOutput.appendChild(introLine);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
  await wait(520);

  if (currentToken !== typingToken) {
    return;
  }

  introLine.querySelector(".line-value")?.classList.remove("typing");

  for (const line of command.lines) {
    if (currentToken !== typingToken) {
      return;
    }

    const row = makeLine(line, true);
    terminalOutput.appendChild(row);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
    await wait(line.type === "summary" ? 420 : 240);
    row.querySelector(".line-value")?.classList.remove("typing");
  }
}

function openPalette() {
  palette.classList.remove("hidden");
  paletteBackdrop.classList.remove("hidden");
  commandBar.setAttribute("aria-expanded", "true");
  syncPalette();
}

function closePalette() {
  palette.classList.add("hidden");
  paletteBackdrop.classList.add("hidden");
  commandBar.setAttribute("aria-expanded", "false");
}

function syncPalette() {
  paletteList.innerHTML = "";
  commandData.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `palette-item${index === activeIndex ? " active" : ""}`;
    button.innerHTML = `
      <span class="palette-command">${item.command}</span>
      <span class="palette-description">${item.description}</span>
    `;
    button.addEventListener("click", () => {
      closePalette();
      renderCommand(index);
    });
    paletteList.appendChild(button);
  });
}

commandBar.addEventListener("click", openPalette);
paletteBackdrop.addEventListener("click", closePalette);

window.addEventListener("keydown", (event) => {
  const paletteOpen = !palette.classList.contains("hidden");
  if (event.key === "Escape" && paletteOpen) {
    closePalette();
    return;
  }

  if (!paletteOpen) {
    if (event.key === "Enter") {
      openPalette();
    }
    return;
  }

  if (event.key === "ArrowDown") {
    event.preventDefault();
    activeIndex = (activeIndex + 1) % commandData.length;
    syncPalette();
    return;
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();
    activeIndex = (activeIndex - 1 + commandData.length) % commandData.length;
    syncPalette();
    return;
  }

  if (event.key === "Enter") {
    event.preventDefault();
    closePalette();
    renderCommand(activeIndex);
  }
});

renderCommand(activeIndex);

if (params.get("palette") === "1") {
  openPalette();
}
