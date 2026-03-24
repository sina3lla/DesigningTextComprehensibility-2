import { useEffect, useMemo, useState } from 'react';
import { getTheme } from '../../globals/themes';
import { demoPassage, karaokeDemoD } from '../../globals/contentData';

const cleanWord = (word) => word.toLowerCase().replace(/[^a-z]/g, '');

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

  const isDemoD = selectedDemo === 'demo_d';
  const variant = demoMap[selectedDemo];
  const currentUnit = !isDemoD ? demoPassage.semanticUnits[currentSentenceIndex] : null;

  const demoDTokens = useMemo(() => {
    if (!isDemoD) return [];
    const built = [];
    karaokeDemoD.lines.forEach((line, lineIndex) => {
      line.split(/\s+/).forEach((word, indexInLine) => {
        const clean = cleanWord(word);
        const data = karaokeDemoD.wordData[clean];
        built.push({
          id: `${lineIndex}-${indexInLine}`,
          word,
          clean,
          line: lineIndex,
          indexInLine,
          meaning: data?.meaning || `${clean} is a context word in this passage.`,
          related: data?.related || [],
          referential: data?.referential || null,
        });
      });
    });
    return built;
  }, [isDemoD]);

  const [demoDWordIndex, setDemoDWordIndex] = useState(0);
  const [showWordInfo, setShowWordInfo] = useState(false);
  const activeDemoDToken = demoDTokens[demoDWordIndex];
  const relatedSet = useMemo(() => new Set(activeDemoDToken?.related || []), [activeDemoDToken]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isDemoD) {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          setDemoDWordIndex((idx) => Math.min(idx + 1, demoDTokens.length - 1));
          setShowWordInfo(false);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setDemoDWordIndex((idx) => Math.max(idx - 1, 0));
          setShowWordInfo(false);
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          setShowWordInfo(true);
        }
        return;
      }

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
  }, [isDemoD, demoDTokens.length, setCurrentSentenceIndex]);

  const demoLevelNames = {
    beginner: 'Beginner Reader (A)',
    intermediate: 'Intermediate Reader (B)',
    advanced: 'Advanced Reader (C)',
    demo_d: 'Demo D — Biology Karaoke',
  };

  if (isDemoD) {
    const currentLine = activeDemoDToken?.line || 0;
    const startLine = Math.max(0, currentLine - 2);
    const endLine = Math.min(karaokeDemoD.lines.length, startLine + 5);

    return (
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
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
          <div style={{ fontSize: '14px', fontWeight: '600', color: themeObj.accent }}>{demoLevelNames[selectedDemo]}</div>
          <div style={{ fontSize: '12px', color: themeObj.textSecondary }}>{demoDWordIndex + 1} / {demoDTokens.length}</div>
        </div>

        {Array.from({ length: endLine - startLine }, (_, i) => startLine + i).map((lineIdx) => {
          const words = karaokeDemoD.lines[lineIdx].split(/\s+/);
          return (
            <div key={lineIdx} style={{ fontSize: '22px', lineHeight: '1.9', opacity: lineIdx === currentLine ? 1 : 0.55 }}>
              {words.map((word, wordIdx) => {
                const tokenIndex = demoDTokens.findIndex((t) => t.line === lineIdx && t.indexInLine === wordIdx);
                const token = demoDTokens[tokenIndex];
                const isFocus = tokenIndex === demoDWordIndex;
                const isRelated = relatedSet.has(token?.clean);
                return (
                  <span
                    key={`${lineIdx}-${wordIdx}`}
                    onClick={() => {
                      setDemoDWordIndex(tokenIndex);
                      setShowWordInfo(true);
                    }}
                    style={{
                      marginRight: '6px',
                      padding: '2px 5px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: isFocus ? 700 : 500,
                      fontSize: isFocus ? '34px' : '22px',
                      color: isFocus ? '#fff' : themeObj.text,
                      background: isFocus ? themeObj.accent : isRelated ? themeObj.accentLight : 'transparent',
                      textDecoration: isRelated ? 'underline' : 'none',
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </div>
          );
        })}

        {showWordInfo && activeDemoDToken && (
          <div
            style={{
              marginTop: '14px',
              background: themeObj.surface,
              border: `1px solid ${themeObj.border}`,
              borderRadius: '8px',
              padding: '12px',
              fontSize: '14px',
              lineHeight: '1.7',
            }}
          >
            <div><strong>Word:</strong> {activeDemoDToken.clean}</div>
            <div><strong>Definition:</strong> {activeDemoDToken.meaning}</div>
            {activeDemoDToken.referential && (
              <div><strong>Referential relationship:</strong> {activeDemoDToken.referential}</div>
            )}
            {activeDemoDToken.related.length > 0 && (
              <div><strong>Related words:</strong> {activeDemoDToken.related.join(', ')}</div>
            )}
          </div>
        )}

        <div
          style={{
            marginTop: '12px',
            background: themeObj.surface,
            border: `1px solid ${themeObj.border}`,
            borderRadius: '8px',
            padding: '12px',
            textAlign: 'center',
            fontSize: '12px',
            color: themeObj.textSecondary,
          }}
        >
          Use <strong>→</strong>/<strong>←</strong> to move focus one word at a time. Press <strong>↓</strong> for definition/referential info.
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
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
    </div>
  );
}
