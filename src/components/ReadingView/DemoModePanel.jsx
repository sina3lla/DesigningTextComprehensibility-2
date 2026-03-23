import { useEffect } from 'react';
import { getTheme } from '../../globals/themes';
import { demoPassage } from '../../globals/contentData';

export default function DemoModePanel({
  selectedDemo,
  currentSentenceIndex,
  setCurrentSentenceIndex,
  theme,
}) {
  const themeObj = getTheme(theme);

  const demoMap = {
    beginner: 'beginner',
    intermediate: 'intermediate',
    advanced: 'advanced',
  };

  const variant = demoMap[selectedDemo];
  const currentUnit = demoPassage.semanticUnits[currentSentenceIndex];

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ' || e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrentSentenceIndex((idx) =>
          Math.min(idx + 1, demoPassage.semanticUnits.length - 1)
        );
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSentenceIndex((idx) => Math.max(idx - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setCurrentSentenceIndex]);

  const demoLevelNames = {
    beginner: 'Beginner Reader (A)',
    intermediate: 'Intermediate Reader (B)',
    advanced: 'Advanced Reader (C)',
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Demo Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${themeObj.accentLight}40, ${themeObj.accent}20)`,
          border: `1px solid ${themeObj.accent}`,
          borderRadius: '8px',
          padding: '12px',
          marginBottom: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div
            style={{
              fontSize: '10px',
              fontWeight: '600',
              textTransform: 'uppercase',
              color: themeObj.textSecondary,
              marginBottom: '4px',
            }}
          >
            Demonstration Mode (Beta)
          </div>
          <div style={{ fontSize: '14px', fontWeight: '600', color: themeObj.accent }}>
            {demoLevelNames[selectedDemo]}
          </div>
        </div>
        <div
          style={{
            fontSize: '12px',
            fontWeight: '500',
            color: themeObj.textSecondary,
            background: themeObj.card,
            padding: '6px 10px',
            borderRadius: '4px',
          }}
        >
          {currentSentenceIndex + 1} / {demoPassage.semanticUnits.length}
        </div>
      </div>

      {/* All Sentences - Vertical Stack */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
        {demoPassage.semanticUnits.map((unit, idx) => {
          const isActive = idx === currentSentenceIndex;
          const displayText = unit.variants[variant];

          return (
            <div
              key={unit.id}
              onClick={() => setCurrentSentenceIndex(idx)}
              style={{
                background: isActive ? themeObj.card : themeObj.surface,
                border: isActive
                  ? `2px solid ${themeObj.accent}`
                  : `1px solid ${themeObj.border}`,
                borderRadius: '8px',
                padding: isActive ? '16px' : '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: isActive ? 'scale(1.02)' : 'scale(1)',
                boxShadow: isActive
                  ? `0 8px 24px rgba(0, 0, 0, ${theme === 'dark' ? 0.4 : 0.12})`
                  : 'none',
              }}
            >
              <div
                style={{
                  fontSize: isActive ? '16px' : '13px',
                  lineHeight: '1.7',
                  color: isActive ? themeObj.text : themeObj.textSecondary,
                  fontWeight: isActive ? '500' : '400',
                  opacity: isActive ? 1 : 0.7,
                  transition: 'all 0.3s ease',
                }}
              >
                {displayText}
              </div>

              {isActive && (
                <div
                  style={{
                    marginTop: '12px',
                    paddingTop: '8px',
                    borderTop: `1px solid ${themeObj.border}`,
                    fontSize: '11px',
                    color: themeObj.textSecondary,
                  }}
                >
                  {selectedDemo === 'beginner' && '👶 Short, simple language for newer readers'}
                  {selectedDemo === 'intermediate' && '📚 Balanced complexity with contextual support'}
                  {selectedDemo === 'advanced' && '🎓 Technical precision with minimal scaffolding'}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation & Help */}
      <div
        style={{
          background: themeObj.surface,
          border: `1px solid ${themeObj.border}`,
          borderRadius: '8px',
          padding: '12px',
          textAlign: 'center',
          fontSize: '12px',
          color: themeObj.textSecondary,
        }}
      >
        Press <strong>Space</strong> or <strong>→</strong> to move forward. Press <strong>←</strong> to go back.
      </div>

      {/* Explanation */}
      <div
        style={{
          marginTop: '16px',
          padding: '12px',
          background: themeObj.surface,
          borderRadius: '8px',
          fontSize: '12px',
          color: themeObj.text,
          lineHeight: '1.6',
        }}
      >
        <div style={{ fontWeight: '600', marginBottom: '8px', color: themeObj.accent }}>
          What you're seeing:
        </div>
        <p style={{ margin: '6px 0' }}>
          The <strong>same underlying meaning</strong> is rendered differently based on reader knowledge level.
        </p>
        <p style={{ margin: '6px 0' }}>
          Notice how word choice, sentence length, and complexity change—but the core concept stays constant.
        </p>
      </div>
    </div>
  );
}
