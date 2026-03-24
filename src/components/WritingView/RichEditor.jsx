import { getTheme } from '../../globals/themes';

const cleanWord = (word) => word.toLowerCase().replace(/[^a-z]/g, '');

export default function RichEditor({
  content,
  selectedDemo,
  setSelectedDemo,
  highlightedWords,
  selectedReaderProfile,
  selectedWord,
  setSelectedWord,
  selectedInsight,
  theme,
}) {
  const themeObj = getTheme(theme);
  const contributorSet = new Set(selectedInsight?.contributors || []);
  const sentences = content.match(/[^.!?]+[.!?]?/g) || [];

  return (
    <div
      style={{
        background: themeObj.card,
        border: `1px solid ${themeObj.border}`,
        borderRadius: '12px',
        padding: '24px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: `0 4px 12px rgba(0, 0, 0, ${theme === 'dark' ? 0.3 : 0.08})`,
      }}
    >
      <label
        style={{
          fontSize: '11px',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          color: themeObj.textSecondary,
          marginBottom: '12px',
        }}
      >
        Compose Document
      </label>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
        {['A', 'B', 'C'].map((demo) => (
          <button
            key={demo}
            onClick={() => {
              setSelectedDemo(demo);
              setSelectedWord(null);
            }}
            style={{
              padding: '7px 12px',
              borderRadius: '6px',
              border: selectedDemo === demo ? `2px solid ${themeObj.accent}` : `1px solid ${themeObj.border}`,
              background: selectedDemo === demo ? themeObj.accentLight : themeObj.surface,
              color: themeObj.text,
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Demo {demo}
          </button>
        ))}
      </div>

      <div
        style={{
          flex: 1,
          overflow: 'auto',
          borderRadius: '10px',
          border: `1px solid ${themeObj.border}`,
          padding: '14px',
          lineHeight: '1.9',
          fontSize: '16px',
        }}
      >
        {sentences.map((sentence, sentenceIdx) => (
          <div key={`sentence-${sentenceIdx}`} style={{ marginBottom: '8px' }}>
            {sentence.trim().split(/\s+/).map((word, idx) => {
              const cleaned = cleanWord(word);
              const difficult = highlightedWords.includes(cleaned);
              const isContributor = contributorSet.has(cleaned);
              const isSelected = selectedWord === cleaned;

              return (
                <span
                  key={`${sentenceIdx}-${cleaned}-${idx}`}
                  onClick={() => difficult && setSelectedWord(cleaned)}
                  style={{
                    marginRight: '6px',
                    padding: '2px 4px',
                    borderRadius: '4px',
                    cursor: difficult ? 'pointer' : 'default',
                    background: isSelected
                      ? themeObj.accent
                      : difficult
                      ? selectedReaderProfile === 'beginner'
                        ? '#ffe59a'
                        : selectedReaderProfile === 'intermediate'
                        ? '#ffd166'
                        : '#ffc078'
                      : isContributor
                      ? themeObj.accentLight
                      : 'transparent',
                    color: isSelected ? '#fff' : themeObj.text,
                    textDecoration: isContributor ? 'underline' : 'none',
                    fontWeight: difficult ? 600 : 400,
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: '16px',
          paddingTop: '12px',
          borderTop: `1px solid ${themeObj.border}`,
          fontSize: '12px',
          color: themeObj.textSecondary,
        }}
      >
        {content.split(/\s+/).length} words • {content.length} characters
      </div>
    </div>
  );
}
