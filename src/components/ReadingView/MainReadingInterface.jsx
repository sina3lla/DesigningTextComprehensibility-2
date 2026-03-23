import { useState } from 'react';
import { getTheme } from '../../globals/themes';
import { definitions } from '../../globals/contentData';

export default function MainReadingInterface({ theme, selectedReaderProfile }) {
  const themeObj = getTheme(theme);
  
  const sampleText = 'Warm sunlight lifts water from rivers, lakes, and soil into the air. The water becomes vapor, and cooler air helps it condense into clouds. Moving winds carry the clouds until tiny droplets gather and grow heavy. Rain falls back to the surface, where plants absorb the water and streams carry it onward.';
  
  const words = sampleText.split(/\s+/);
  const [selectedWord, setSelectedWord] = useState(null);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  const lines = [
    'Warm sunlight lifts water from rivers, lakes, and soil into the air.',
    'The water becomes vapor, and cooler air helps it condense into clouds.',
    'Moving winds carry the clouds until tiny droplets gather and grow heavy.',
    'Rain falls back to the surface, where plants absorb the water and streams carry it onward.'
  ];

  const currentLine = lines[currentLineIndex];
  const currentWords = currentLine.split(/\s+/);
  
  const selectedDef = selectedWord && definitions[selectedWord.toLowerCase()];
  
  // Get related words based on definition
  const getRelatedWords = () => {
    if (!selectedDef) return [];
    const defWords = selectedDef.meaning.toLowerCase().split(/\s+/);
    return currentWords.filter(word => 
      defWords.some(defWord => word.toLowerCase().includes(defWord.slice(0, 4)))
    );
  };

  const relatedWords = getRelatedWords();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Context - Previous lines */}
      {currentLineIndex > 0 && (
        <div
          style={{
            background: themeObj.surface,
            border: `1px solid ${themeObj.border}`,
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '16px',
            fontSize: '13px',
            color: themeObj.textSecondary,
            lineHeight: '1.6',
          }}
        >
          <div style={{ fontSize: '10px', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase' }}>
            Full Passage Context
          </div>
          {lines.slice(0, currentLineIndex).map((line, idx) => (
            <div key={idx} style={{ marginBottom: idx < currentLineIndex - 1 ? '6px' : 0 }}>
              {line}
            </div>
          ))}
        </div>
      )}

      {/* Current Line - Active Focus */}
      <div
        style={{
          background: themeObj.card,
          border: `2px solid ${themeObj.accent}`,
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '16px',
          boxShadow: `0 8px 24px rgba(0, 0, 0, ${theme === 'dark' ? 0.4 : 0.12})`,
        }}
      >
        <label
          style={{
            fontSize: '10px',
            fontWeight: '600',
            textTransform: 'uppercase',
            color: themeObj.textSecondary,
            marginBottom: '12px',
            display: 'block',
          }}
        >
          Guided Focus
        </label>

        <div style={{ fontSize: '18px', lineHeight: '1.8', letterSpacing: '0px' }}>
          {currentWords.map((word, idx) => {
            const isRelated = relatedWords.includes(word);
            const isSelected = word === selectedWord;

            return (
              <span
                key={idx}
                onClick={() => setSelectedWord(word === selectedWord ? null : word)}
                style={{
                  marginRight: '4px',
                  padding: '2px 4px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  background: isSelected
                    ? themeObj.accent
                    : isRelated && selectedWord
                    ? themeObj.accentLight
                    : 'transparent',
                  color: isSelected ? '#fff' : themeObj.text,
                  textDecoration: isRelated && selectedWord ? 'underline' : 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.target.style.background = themeObj.accentLight;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.target.style.background = isRelated && selectedWord ? themeObj.accentLight : 'transparent';
                  }
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>

      {/* Definition Panel */}
      {selectedDef && (
        <div
          style={{
            background: themeObj.surface,
            border: `1px solid ${themeObj.border}`,
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '16px',
          }}
        >
          <label
            style={{
              fontSize: '10px',
              fontWeight: '600',
              textTransform: 'uppercase',
              color: themeObj.textSecondary,
              marginBottom: '8px',
              display: 'block',
            }}
          >
            Definition
          </label>

          <div style={{ marginBottom: '12px' }}>
            <div
              style={{
                fontSize: '16px',
                fontWeight: '600',
                color: themeObj.accent,
                marginBottom: '6px',
              }}
            >
              {selectedDef.word}
            </div>
            <div style={{ fontSize: '14px', color: themeObj.text, lineHeight: '1.6' }}>
              {selectedDef.meaning}
            </div>
          </div>

          {selectedDef.example && (
            <div
              style={{
                fontSize: '13px',
                color: themeObj.textSecondary,
                fontStyle: 'italic',
                paddingTop: '8px',
                borderTop: `1px solid ${themeObj.border}`,
              }}
            >
              <span style={{ fontWeight: '600' }}>Example: </span>
              {selectedDef.example}
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 0',
        }}
      >
        <button
          onClick={() => setCurrentLineIndex(Math.max(0, currentLineIndex - 1))}
          disabled={currentLineIndex === 0}
          style={{
            padding: '8px 12px',
            borderRadius: '4px',
            border: '1px solid ' + themeObj.border,
            background: currentLineIndex === 0 ? themeObj.surface : themeObj.card,
            color: themeObj.text,
            cursor: currentLineIndex === 0 ? 'not-allowed' : 'pointer',
            fontSize: '12px',
            fontWeight: '500',
            opacity: currentLineIndex === 0 ? 0.5 : 1,
            transition: 'all 0.3s ease',
          }}
        >
          ← Back
        </button>

        <div style={{ fontSize: '12px', color: themeObj.textSecondary }}>
          {currentLineIndex + 1} / {lines.length}
        </div>

        <button
          onClick={() => setCurrentLineIndex(Math.min(lines.length - 1, currentLineIndex + 1))}
          disabled={currentLineIndex === lines.length - 1}
          style={{
            padding: '8px 12px',
            borderRadius: '4px',
            border: '1px solid ' + themeObj.border,
            background: currentLineIndex === lines.length - 1 ? themeObj.surface : themeObj.card,
            color: themeObj.text,
            cursor: currentLineIndex === lines.length - 1 ? 'not-allowed' : 'pointer',
            fontSize: '12px',
            fontWeight: '500',
            opacity: currentLineIndex === lines.length - 1 ? 0.5 : 1,
            transition: 'all 0.3s ease',
          }}
        >
          Next →
        </button>
      </div>

      <p
        style={{
          fontSize: '11px',
          color: themeObj.textSecondary,
          textAlign: 'center',
          marginTop: '12px',
        }}
      >
        Click a word to see its definition. Press ← or → to navigate.
      </p>
    </div>
  );
}
