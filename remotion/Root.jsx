import React from 'react';
import {Composition} from 'remotion';
import {TerminalPreview} from './TerminalPreview.jsx';

export const RemotionRoot = () => {
  return (
    <Composition
      id="TerminalPreview"
      component={TerminalPreview}
      durationInFrames={156}
      fps={24}
      width={1200}
      height={675}
    />
  );
};
