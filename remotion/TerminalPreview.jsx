import React from 'react';
import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const commands = [
  {command: '/boot-codex', description: 'Replay the real Codex session boot log'},
  {command: '/builder-profile', description: 'Show the actual builder summary'},
  {command: '/stack-map', description: 'Open the working stack'},
  {command: '/selected-builds', description: 'Jump through projects that represent the product surface'},
  {command: '/shipping-loop', description: 'Show the loop that repeats across product work'},
];

const lines = [
  {marker: 'user', text: 'junho@builder:~$ /selected-builds', color: '#ecfdf5'},
  {marker: 'git', text: 'AutoHRAnalytics -> Notion API, FastAPI, React', color: '#67e8f9'},
  {marker: 'git', text: 'InsideOutDJ -> diary-based recommendation product', color: '#67e8f9'},
  {marker: 'git', text: 'zoom -> real-time interaction exploration', color: '#67e8f9'},
  {marker: 'git', text: 'remixstudy -> TypeScript, Supabase, PostgreSQL', color: '#67e8f9'},
];

const fontStack = 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace';

const panel = {
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(14,16,22,0.9)',
  borderRadius: 22,
  boxShadow: '0 26px 70px rgba(0,0,0,0.45)',
};

const titleColor = '#c7cad7';
const muted = '#727b8e';
const accent = '#ff8f5a';
const green = '#4ade80';

const charReveal = (frame, startFrame, text) => {
  const length = Math.floor(interpolate(frame, [startFrame, startFrame + 14], [0, text.length], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }));

  return text.slice(0, length);
};

const Line = ({frame, line, index}) => {
  const startFrame = 18 + index * 8;
  const text = charReveal(frame, startFrame, line.text);
  const opacity = interpolate(frame, [startFrame - 2, startFrame + 2], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        display: 'flex',
        gap: 14,
        opacity,
        fontSize: 21,
        lineHeight: 1.6,
        marginBottom: 12,
      }}
    >
      <span style={{width: 74, color: index === 0 ? green : accent, flexShrink: 0}}>{line.marker}</span>
      <span style={{color: line.color, flex: 1, whiteSpace: 'pre-wrap'}}>
        {text}
        {frame >= startFrame && frame <= startFrame + 14 ? (
          <span style={{display: 'inline-block', width: 10, height: 24, marginLeft: 6, background: accent}} />
        ) : null}
      </span>
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
      damping: 16,
      stiffness: 120,
      mass: 0.9,
    },
  });

  const paletteProgress = interpolate(frame, [34, 54], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const paletteY = interpolate(paletteProgress, [0, 1], [80, 0]);
  const paletteOpacity = paletteProgress;
  const pulse = 0.8 + 0.2 * Math.sin((frame / fps) * Math.PI * 2);

  return (
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(circle at top, rgba(255,143,90,0.1), transparent 26%), linear-gradient(180deg, #05060a 0%, #0b0d12 100%)',
        color: titleColor,
        fontFamily: fontStack,
      }}
    >
      <div
        style={{
          ...panel,
          position: 'absolute',
          inset: 24,
          transform: `scale(${0.95 + shellIn * 0.05}) translateY(${(1 - shellIn) * 18}px)`,
          opacity: shellIn,
          overflow: 'hidden',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0) 12%), rgba(8,10,15,0.94)',
        }}
      >
        <div
          style={{
            height: 56,
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 18px',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
            <div style={{display: 'flex', gap: 8}}>
              <span style={{width: 12, height: 12, borderRadius: 999, background: '#ff5f57'}} />
              <span style={{width: 12, height: 12, borderRadius: 999, background: '#febc2e'}} />
              <span style={{width: 12, height: 12, borderRadius: 999, background: '#28c840'}} />
            </div>
            <span style={{fontSize: 13, color: muted}}>baekjunho.codex.session</span>
          </div>
          <span
            style={{
              fontSize: 12,
              color: '#8a92a7',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 999,
              padding: '7px 12px',
            }}
          >
            github
          </span>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '318px 1fr', gap: 22, padding: 22, height: 515}}>
          <div
            style={{
              ...panel,
              borderRadius: 24,
              padding: 22,
              background:
                'linear-gradient(180deg, rgba(255,143,90,0.08), transparent 34%), rgba(18,19,27,0.86)',
            }}
          >
            <div style={{fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent}}>
              Interactive Builder Log
            </div>
            <div style={{fontSize: 64, lineHeight: 0.95, fontWeight: 700, marginTop: 18, whiteSpace: 'pre-line'}}>
              {'Codex-\nbacked\nterminal\nprofile for\nBaek Junho'}
            </div>
            <div style={{fontSize: 18, lineHeight: 1.75, color: '#8a92a7', marginTop: 22}}>
              Click the command bar below. Each mode replays a different slice of the way I build:
              product UI, systems, data, and shipping loops.
            </div>
          </div>

          <div
            style={{
              ...panel,
              borderRadius: 24,
              overflow: 'hidden',
              background:
                'linear-gradient(180deg, rgba(96,165,250,0.04), rgba(0,0,0,0) 24%), rgba(12,14,20,0.92)',
            }}
          >
            <div
              style={{
                height: 52,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 18px',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                color: muted,
                fontSize: 13,
              }}
            >
              <span>ssh junho@builder-node</span>
              <span style={{color: green}}>connected</span>
            </div>

            <div style={{padding: '18px 20px 0', position: 'relative'}}>
              {lines.map((line, index) => (
                <Line key={line.text} frame={frame} line={line} index={index} />
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            left: '50%',
            bottom: 98,
            width: 720,
            transform: `translateX(-50%) translateY(${paletteY}px)`,
            opacity: paletteOpacity,
            ...panel,
            background: 'rgba(18,19,27,0.96)',
            borderRadius: 22,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '14px 18px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              color: '#8a92a7',
              fontSize: 13,
            }}
          >
            <span>Select command</span>
            <span>click or use arrow keys + enter</span>
          </div>
          <div style={{padding: 12}}>
            {commands.map((item, index) => {
              const active = index === 3;
              return (
                <div
                  key={item.command}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '200px 1fr',
                    gap: 16,
                    padding: '16px 18px',
                    borderRadius: 16,
                    background: active ? 'rgba(255,143,90,0.14)' : 'transparent',
                    marginBottom: 4,
                  }}
                >
                  <span style={{color: accent, fontSize: 18}}>{item.command}</span>
                  <span style={{color: '#c5cbda', fontSize: 18, lineHeight: 1.35}}>{item.description}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            left: 22,
            right: 22,
            bottom: 20,
            display: 'grid',
            gridTemplateColumns: 'auto auto auto 1fr',
            gap: 18,
            alignItems: 'center',
            color: muted,
            fontSize: 12,
          }}
        >
          <span>
            MODE: <strong style={{color: '#c8cfdf'}}>/selected-builds</strong>
          </span>
          <span>
            STACK: <strong style={{color: '#c8cfdf'}}>HTML · CSS · JS</strong>
          </span>
          <span>
            SOURCE: <strong style={{color: '#c8cfdf'}}>real codex exec log</strong>
          </span>
        </div>

        <div
          style={{
            position: 'absolute',
            left: 22,
            right: 22,
            bottom: 18,
            height: 56,
            borderRadius: 18,
            border: '1px solid rgba(255,143,90,0.3)',
            background: 'rgba(255,143,90,0.06)',
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            gap: 18,
            alignItems: 'center',
            padding: '0 18px',
          }}
        >
          <span style={{color: accent, fontWeight: 700}}>&gt;</span>
          <span style={{color: '#d4d8e4', fontSize: 16}}>/selected-builds Jump through projects that represent the product surface</span>
          <span style={{color: accent, fontWeight: 700, opacity: pulse}}>run</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
