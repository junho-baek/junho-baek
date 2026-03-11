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
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(18,22,32,0.96)',
  borderRadius: 22,
  boxShadow: '0 26px 70px rgba(0,0,0,0.45)',
};

const titleColor = '#eef3ff';
const muted = '#9aa6bf';
const accent = '#ff9d71';
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
  const shellVisibility = 0.78 + shellIn * 0.22;

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
          'radial-gradient(circle at top, rgba(255,157,113,0.16), transparent 28%), linear-gradient(180deg, #09101a 0%, #101827 100%)',
        color: titleColor,
        fontFamily: fontStack,
      }}
    >
      <div
        style={{
          ...panel,
          position: 'absolute',
          inset: 24,
          transform: `scale(${0.985 + shellIn * 0.015}) translateY(${(1 - shellIn) * 10}px)`,
          opacity: shellVisibility,
          overflow: 'hidden',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01) 14%), rgba(16,22,34,0.98)',
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
            <span style={{fontSize: 14, color: '#b8c2d8'}}>baekjunho.codex.session</span>
          </div>
          <span
            style={{
              fontSize: 12,
              color: '#c6d0e6',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 999,
              padding: '7px 12px',
              background: 'rgba(255,255,255,0.03)',
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
                'linear-gradient(180deg, rgba(255,157,113,0.14), rgba(255,255,255,0.01) 34%), rgba(24,27,38,0.96)',
            }}
          >
            <div style={{fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent}}>
              Interactive Builder Log
            </div>
            <div style={{fontSize: 64, lineHeight: 0.95, fontWeight: 700, marginTop: 18, whiteSpace: 'pre-line'}}>
              {'Codex-\nbacked\nterminal\nprofile for\nBaek Junho'}
            </div>
            <div style={{fontSize: 18, lineHeight: 1.75, color: '#b7c1d7', marginTop: 22}}>
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
                'linear-gradient(180deg, rgba(96,165,250,0.1), rgba(255,255,255,0.01) 24%), rgba(17,23,35,0.98)',
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
                color: '#aab6cf',
                fontSize: 14,
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
            background: 'rgba(22,26,37,0.98)',
            borderRadius: 22,
            overflow: 'hidden',
            boxShadow: '0 26px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '14px 18px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              color: '#b1bdd5',
              fontSize: 14,
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
                    background: active ? 'rgba(255,157,113,0.22)' : 'transparent',
                    marginBottom: 4,
                  }}
                >
                  <span style={{color: accent, fontSize: 18}}>{item.command}</span>
                  <span style={{color: '#e1e7f5', fontSize: 18, lineHeight: 1.35}}>{item.description}</span>
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
            color: '#99a6bf',
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
            border: '1px solid rgba(255,157,113,0.42)',
            background: 'rgba(255,157,113,0.12)',
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
