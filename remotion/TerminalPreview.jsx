import React from 'react';
import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const fontStack = 'JetBrains Mono, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace';

const WHO_BANNER = [
  '██╗    ██╗██╗  ██╗ ██████╗     ██╗███████╗',
  '██║    ██║██║  ██║██╔═══██╗    ██║██╔════╝',
  '██║ █╗ ██║███████║██║   ██║    ██║███████╗',
  '██║███╗██║██╔══██║██║   ██║    ██║╚════██║',
  '╚███╔███╔╝██║  ██║╚██████╔╝    ██║███████║',
  ' ╚══╝╚══╝ ╚═╝  ╚═╝ ╚═════╝     ╚═╝╚══════╝',
];

const JUNHO_BANNER = [
  '     ██╗██╗   ██╗███╗   ██╗██╗  ██╗ ██████╗     ██████╗  █████╗ ███████╗██╗  ██╗',
  '     ██║██║   ██║████╗  ██║██║  ██║██╔═══██╗    ██╔══██╗██╔══██╗██╔════╝██║ ██╔╝',
  '     ██║██║   ██║██╔██╗ ██║███████║██║   ██║    ██████╔╝███████║█████╗  █████╔╝ ',
  '██   ██║██║   ██║██║╚██╗██║██╔══██║██║   ██║    ██╔══██╗██╔══██║██╔══╝  ██╔═██╗ ',
  '╚█████╔╝╚██████╔╝██║ ╚████║██║  ██║╚██████╔╝    ██████╔╝██║  ██║███████╗██║  ██╗',
  ' ╚════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝     ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝',
];

const baseLine = {
  display: 'grid',
  gridTemplateColumns: '88px minmax(0, 1fr)',
  gap: 12,
  alignItems: 'start',
  marginBottom: 10,
  fontSize: 15,
  lineHeight: 1.55,
};

const markerColor = {
  user: '#3ae58f',
  '*': '#7f8ba0',
  bio: '#f4a07a',
  skill: '#7ec7ff',
  proj: '#f4a07a',
  role: '#7ec7ff',
  git: '#9ceaff',
  next: '#7ec7ff',
};

const valueColor = {
  user: '#f2fffa',
  '*': '#d6e9ff',
  bio: '#ffe4d8',
  skill: '#d5ecff',
  proj: '#ffd9c8',
  role: '#d7ecff',
  git: '#a5edff',
  next: '#cfe7ff',
};

const clampChars = (frame, startFrame, text, speed = 1.05) => {
  const span = Math.max(8, Math.round(text.length / speed));
  const amount = Math.floor(interpolate(frame, [startFrame, startFrame + span], [0, text.length], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }));
  return text.slice(0, amount);
};

const TypedLine = ({frame, startFrame, marker, text, boxed = false}) => {
  const typed = clampChars(frame, startFrame, text, 1.08);
  const opacity = interpolate(frame, [startFrame - 2, startFrame + 4], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const typingEnd = startFrame + Math.max(8, Math.round(text.length / 1.08));
  const showCursor = frame >= startFrame && frame <= typingEnd;

  return (
    <div style={{...baseLine, opacity}}>
      <span style={{color: markerColor[marker] ?? '#7f8ba0', fontWeight: 700}}>{marker}</span>
      <span
        style={{
          color: valueColor[marker] ?? '#dce3f3',
          border: boxed ? '1px solid rgba(142, 203, 255, 0.55)' : 'none',
          background: boxed ? 'linear-gradient(90deg, rgba(94,169,255,0.16), rgba(94,169,255,0.06))' : 'transparent',
          padding: boxed ? '9px 12px' : 0,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {typed}
        {showCursor ? (
          <span
            style={{
              display: 'inline-block',
              width: 8,
              height: 18,
              marginLeft: 6,
              background: '#f09a6f',
              verticalAlign: 'text-bottom',
            }}
          />
        ) : null}
      </span>
    </div>
  );
};

const Banner = ({frame, startFrame}) => {
  const bannerLines = [...WHO_BANNER, '', ...JUNHO_BANNER];
  const hoverProgress = interpolate(frame, [startFrame + 30, startFrame + 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cursorX = 44 + Math.sin(frame / 13) * 12;
  const cursorY = 48 + Math.cos(frame / 17) * 9;
  const sparkScale = 0.65 + hoverProgress * (0.25 + Math.sin(frame / 4) * 0.16);
  const sparkOpacity = hoverProgress * (0.7 + Math.sin(frame / 5) * 0.2);

  return (
    <div style={{...baseLine, marginBottom: 12}}>
      <span style={{color: '#8ecbff', fontWeight: 700}}>fig</span>
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '4px 0',
          background: `radial-gradient(circle at ${cursorX}% ${cursorY}%, rgba(94,169,255,0.22), transparent 42%)`,
        }}
      >
        {bannerLines.map((line, index) => {
          const lineFrame = startFrame + index * 2;
          const lineOpacity = interpolate(frame, [lineFrame - 2, lineFrame + 4], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const lineText = clampChars(frame, lineFrame, line, 1.4);
          const shift = (cursorX - 50) * ((index % 6) + 1) * 0.005;
          return (
            <div
              key={`${line}-${index}`}
              style={{
                opacity: lineOpacity,
                color: '#8ecbff',
                fontSize: 20,
                lineHeight: 1.04,
                fontWeight: 700,
                letterSpacing: 0.26,
                whiteSpace: 'pre',
                transform: `translateX(${shift}px)`,
                textShadow:
                  '1px 0 0 rgba(94,169,255,0.75), 0 0 14px rgba(94,169,255,0.32), 0 0 24px rgba(94,169,255,0.16)',
              }}
            >
              {lineText}
            </div>
          );
        })}
        <div
          style={{
            position: 'absolute',
            left: `${cursorX}%`,
            top: `${cursorY}%`,
            width: 14,
            height: 14,
            borderRadius: 2,
            transform: `translate(-50%, -50%) rotate(45deg) scale(${sparkScale})`,
            opacity: sparkOpacity,
            background: 'linear-gradient(140deg, #ffe79a 0%, #ffcf64 56%, #ffbb3d 100%)',
            boxShadow:
              '0 0 0 1px rgba(255, 240, 190, 0.78), 0 0 14px rgba(255, 207, 100, 0.88), 0 0 28px rgba(255, 192, 77, 0.62)',
          }}
        />
      </div>
    </div>
  );
};

const WhoScreen = ({frame}) => {
  return (
    <div>
      <TypedLine frame={frame} startFrame={14} marker="user" text="junho@builder:~$ who is junho-baek" />
      <TypedLine frame={frame} startFrame={21} marker="user" text="cat who_is_junho_baek.md" />
      <TypedLine
        frame={frame}
        startFrame={30}
        marker="*"
        text="안녕하세요. AI Native 개발 문화를 기반으로 사회 문제 해결형 제품을 기획·개발하는 백준호입니다."
        boxed
      />
      <Banner frame={frame} startFrame={38} />
      <TypedLine
        frame={frame}
        startFrame={76}
        marker="bio"
        text="- FE, BE, DE, AI Agent 역량을 결합한 Full-Stack Background Product Builder"
      />
      <TypedLine
        frame={frame}
        startFrame={82}
        marker="skill"
        text="- n8n Workflow Automation · GTM · GA4 · Meta Pixel 기반 실행/측정 루프 설계"
      />
    </div>
  );
};

const ProjectScreen = ({frame}) => {
  return (
    <div>
      <TypedLine frame={frame} startFrame={94} marker="user" text="junho@builder:~$ projects" />
      <TypedLine frame={frame} startFrame={100} marker="user" text="cat selected_projects.md" />
      <TypedLine frame={frame} startFrame={106} marker="proj" text="[Glucofit] personalized glucose app | React · FastAPI · PostgreSQL" />
      <TypedLine frame={frame} startFrame={111} marker="proj" text="[AIDP] in-house data analysis AI Agent | LangGraph · LangChain · Redis" />
      <TypedLine frame={frame} startFrame={116} marker="proj" text="[DundunAI] short-form creation & monetization Agent SaaS | React · n8n · Supabase" />
      <TypedLine
        frame={frame}
        startFrame={121}
        marker="proj"
        text="[Parrot Kit] creator workflow toolkit | Codex · Next.js · shadcn/ui · GTM · GA4 · Meta Pixel"
      />
      <TypedLine frame={frame} startFrame={126} marker="git" text="github.com/junho-baek/Parrotkit-deploy/tree/dev" />
      <TypedLine frame={frame} startFrame={131} marker="next" text="project details -> /site/docs/projects.html" />
    </div>
  );
};

export const TerminalPreview = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const shellIn = spring({
    frame,
    fps,
    config: {
      damping: 200,
      stiffness: 120,
    },
    durationInFrames: 22,
  });

  const whoOpacity = interpolate(frame, [0, 88, 98], [1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const projectOpacity = interpolate(frame, [90, 106], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const switching = interpolate(frame, [88, 104], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const runPulse = 0.76 + 0.24 * Math.sin((frame / fps) * Math.PI * 2.1);

  const commandLabel = switching < 0.5 ? 'who is junho-baek | 자기소개' : 'projects | 프로젝트';

  return (
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(circle at 12% 0%, rgba(240,143,111,0.17), transparent 42%), radial-gradient(circle at 100% 20%, rgba(139,233,255,0.12), transparent 36%), linear-gradient(180deg, #111215 0%, #151820 100%)',
        color: '#d5d9e2',
        fontFamily: fontStack,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 10,
          border: '1px solid #313846',
          borderRadius: 16,
          background: 'rgba(16, 18, 23, 0.9)',
          boxShadow: '0 24px 84px rgba(0,0,0,0.56)',
          overflow: 'hidden',
          transform: `translateY(${(1 - shellIn) * 8}px) scale(${0.99 + shellIn * 0.01})`,
          opacity: 0.7 + shellIn * 0.3,
        }}
      >
        <div
          style={{
            minHeight: 48,
            padding: '0 14px',
            borderBottom: '1px solid #313846',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
            <div style={{display: 'flex', gap: 8}}>
              <span style={{width: 14, height: 14, borderRadius: '50%', background: '#ff5f57'}} />
              <span style={{width: 14, height: 14, borderRadius: '50%', background: '#ffbd2e'}} />
              <span style={{width: 14, height: 14, borderRadius: '50%', background: '#28c840'}} />
            </div>
            <span style={{fontSize: 14, color: '#8d93a1'}}>baekjunho.terminal.session</span>
          </div>
          <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
            <span
              style={{
                minHeight: 34,
                border: '1px solid #313846',
                borderRadius: 999,
                padding: '0 12px',
                display: 'grid',
                placeItems: 'center',
                fontWeight: 600,
                fontSize: 12,
                color: '#c6cedb',
              }}
            >
              EN
            </span>
            <span
              style={{
                minHeight: 34,
                border: '1px solid #313846',
                borderRadius: 999,
                padding: '0 12px',
                display: 'grid',
                placeItems: 'center',
                fontWeight: 600,
                fontSize: 12,
                color: '#c6cedb',
              }}
            >
              github
            </span>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            left: 16,
            right: 16,
            top: 58,
            bottom: 98,
            overflow: 'hidden',
          }}
        >
          <div style={{...baseLine, marginBottom: 12, fontSize: 16}}>
            <span style={{color: '#8f98aa', fontWeight: 700}}>user</span>
            <span style={{color: '#8f98aa', fontWeight: 700}}>user@junho:~$ cat who_is_junho_baek.md</span>
          </div>
          <div style={{...baseLine, marginBottom: 14, borderTop: '1px solid #2d3442', paddingTop: 12}}>
            <span style={{color: '#22e69f', fontWeight: 700}}>status</span>
            <span style={{color: '#3ae58f', fontWeight: 700}}>ready</span>
          </div>

          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 74,
              opacity: whoOpacity,
            }}
          >
            <WhoScreen frame={frame} />
          </div>

          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 74,
              opacity: projectOpacity,
            }}
          >
            <ProjectScreen frame={frame} />
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            left: 16,
            right: 16,
            bottom: 16,
            minHeight: 52,
            border: '1px solid rgba(240, 143, 111, 0.52)',
            borderRadius: 12,
            background: 'rgba(240, 143, 111, 0.09)',
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            alignItems: 'center',
            gap: 12,
            padding: '0 12px',
            fontSize: 17,
            color: '#e4eaf7',
            fontWeight: 600,
          }}
        >
          <span style={{color: '#f09a6f'}}>&gt;</span>
          <span>{commandLabel}</span>
          <span style={{color: '#f09a6f', opacity: runPulse}}>run</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
