import { useEffect, useMemo, useState } from 'react';
import { getTheme } from '../../globals/themes';
import { readingKaraokePassage } from '../../globals/contentData';

const cleanWord = (word) => word.toLowerCase().replace(/[^a-z]/g, '');

export default function MainReadingInterface({ theme }) {
  const themeObj = getTheme(theme);

  const lines = readingKaraokePassage.lines;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  const tokens = useMemo(() => {
    const built = [];
    lines.forEach((line, lineIndex) => {
      line.split(/\s+/).forEach((word, indexInLine) => {
        const clean = cleanWord(word);
        const entry = readingKaraokePassage.wordData[clean];
        built.push({
          id: `${lineIndex}-${indexInLine}`,
          word,
          clean,
          line: lineIndex,
          indexInLine,
          meaning: entry?.meaning || `${clean} is a context word in this passage.`,
          related: entry?.related || [],
          referential: entry?.referential || null,
        });
      });
    });
    return built;
  }, [lines]);

  const currentToken = tokens[currentIndex];

  const relatedSet = useMemo(() => new Set(currentToken?.related || []), [currentToken]);

  const handleWordClick = (tokenIndex) => {
    setCurrentIndex(tokenIndex);
    setShowInfo(true);
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrentIndex((idx) => Math.min(idx + 1, tokens.length - 1));
        setShowInfo(false);
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentIndex((idx) => Math.max(idx - 1, 0));
        setShowInfo(false);
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setShowInfo(true);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [tokens.length]);

  const currentLine = currentToken?.line || 0;
  const startLine = Math.max(0, currentLine - 2);
  const endLine = Math.min(lines.length, startLine + 5);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div
        style={{
          background: themeObj.surface,
          border: `1px solid ${themeObj.border}`,
          borderRadius: '8px',
          padding: '12px',
          marginBottom: '14px',
          fontSize: '12px',
          color: themeObj.textSecondary,
        }}
      >
        Karaoke mode: use <strong>→</strong>/<strong>←</strong> to move word-by-word. Press <strong>↓</strong> (or click a word) for definition + referential info.
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
        {Array.from({ length: endLine - startLine }, (_, i) => startLine + i).map((lineIdx) => {
          const words = lines[lineIdx].split(/\s+/);
          return (
            <div
              key={lineIdx}
              style={{
                lineHeight: '1.9',
                fontSize: '22px',
                opacity: lineIdx === currentLine ? 1 : 0.55,
                transition: 'all 0.2s ease',
              }}
            >
              {words.map((word, idx) => {
                const tokenIndex = tokens.findIndex((t) => t.line === lineIdx && t.indexInLine === idx);
                const token = tokens[tokenIndex];
                const isFocus = tokenIndex === currentIndex;
                const isRelated = relatedSet.has(token?.clean);

                return (
                  <span
                    key={`${lineIdx}-${idx}`}
                    onClick={() => handleWordClick(tokenIndex)}
                    style={{
                      marginRight: '6px',
                      borderRadius: '6px',
                      padding: '2px 5px',
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
      </div>

      {showInfo && currentToken && (
        <div
          style={{
            background: themeObj.card,
            border: `1px solid ${themeObj.border}`,
            borderRadius: '8px',
            padding: '14px',
            fontSize: '14px',
            lineHeight: '1.7',
          }}
        >
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: themeObj.textSecondary, marginBottom: '6px' }}>Focus Word</div>
          <div style={{ fontWeight: 700, color: themeObj.accent, marginBottom: '8px' }}>{currentToken.clean}</div>
          <div><strong>Definition:</strong> {currentToken.meaning}</div>
          {currentToken.referential && (
            <div style={{ marginTop: '8px' }}>
              <strong>Referential relationship:</strong> {currentToken.referential}
            </div>
          )}
          {currentToken.related.length > 0 && (
            <div style={{ marginTop: '8px' }}>
              <strong>Related words:</strong> {currentToken.related.join(', ')}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
