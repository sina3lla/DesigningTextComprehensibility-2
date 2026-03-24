import { useState } from 'react';
import { getTheme } from '../globals/themes';
import MainReadingInterface from './ReadingView/MainReadingInterface';
import DemoModePanel from './ReadingView/DemoModePanel';

export default function ReadingView({ theme, selectedReaderProfile }) {
  const themeObj = getTheme(theme);
  const [demoModeActive, setDemoModeActive] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState('beginner');
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '60px',
        height: '100vh',
        background: themeObj.bg,
        color: themeObj.text,
        overflow: 'hidden',
      }}
    >
      {/* Main Reading Area */}
      <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
        {demoModeActive ? (
          <DemoModePanel
            selectedDemo={selectedDemo}
            currentSentenceIndex={currentSentenceIndex}
            setCurrentSentenceIndex={setCurrentSentenceIndex}
            theme={theme}
          />
        ) : (
          <MainReadingInterface theme={theme} selectedReaderProfile={selectedReaderProfile} />
        )}
      </div>

      {/* Demo Mode Controls - Floating at Bottom */}
      <div
        style={{
          padding: '16px 20px',
          background: themeObj.surface,
          borderTop: `1px solid ${themeObj.border}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
          }}
        >
          <button
            onClick={() => setDemoModeActive(!demoModeActive)}
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              border: demoModeActive ? `2px solid ${themeObj.accent}` : `1px solid ${themeObj.border}`,
              background: demoModeActive ? themeObj.accentLight : themeObj.card,
              color: themeObj.text,
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '500',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = themeObj.accent;
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = demoModeActive ? themeObj.accent : themeObj.border;
            }}
          >
            {demoModeActive ? '✓ Demo Active' : 'Demo Mode (Beta)'}
          </button>

          {demoModeActive && (
            <div style={{ display: 'flex', gap: '6px' }}>
              {['beginner', 'intermediate', 'advanced', 'demo_d'].map((level) => (
                <button
                  key={level}
                  onClick={() => {
                    setSelectedDemo(level);
                    setCurrentSentenceIndex(0);
                  }}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '4px',
                    border: selectedDemo === level ? `2px solid ${themeObj.accent}` : `1px solid ${themeObj.border}`,
                    background: selectedDemo === level ? themeObj.accentLight : 'transparent',
                    color: themeObj.text,
                    cursor: 'pointer',
                    fontSize: '11px',
                    fontWeight: selectedDemo === level ? '600' : '400',
                    textTransform: 'capitalize',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {level === 'beginner' ? 'A' : level === 'intermediate' ? 'B' : level === 'advanced' ? 'C' : 'D'}
                </button>
              ))}
            </div>
          )}
        </div>

        {demoModeActive && (
          <div style={{ fontSize: '11px', color: themeObj.textSecondary }}>
            {selectedDemo === 'demo_d' ? 'Word mode' : `${currentSentenceIndex + 1} / 6`}
          </div>
        )}
      </div>
    </div>
  );
}
