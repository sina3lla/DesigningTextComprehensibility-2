import { getTheme } from '../../globals/themes';
import { writingDemos } from '../../globals/contentData';

export default function AssistantPanel({
  content,
  selectedReaderProfile,
  setSelectedReaderProfile,
  selectedDemo,
  selectedWord,
  selectedInsight,
  theme,
}) {
  const themeObj = getTheme(theme);

  const profiles = [
    {
      id: 'beginner',
      name: 'Beginner',
      description: 'Simple words, short sentences',
      guidance: [
        '✓ Prefer shorter sentences',
        '✓ Replace abstract words',
        '✓ Flag domain-specific terms',
        '✓ Provide concrete examples',
      ],
    },
    {
      id: 'intermediate',
      name: 'Intermediate',
      description: 'Balanced complexity',
      guidance: [
        '✓ Balanced sentence length',
        '✓ Support key terms with context',
        '✓ Use transitional phrases',
        '✓ Connect ideas clearly',
      ],
    },
    {
      id: 'advanced',
      name: 'Advanced',
      description: 'Concepts, precision',
      guidance: [
        '✓ Maintain conceptual depth',
        '✓ Technical precision is valued',
        '✓ Minimize scaffolding',
        '✓ Assume background knowledge',
      ],
    },
  ];

  const wordCount = content.split(/\s+/).filter((w) => w.length > 0).length;
  const sentenceCount = content.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
  const avgWordsPerSent = sentenceCount ? (wordCount / sentenceCount).toFixed(1) : 0;

  const currentProfile = profiles.find((p) => p.id === selectedReaderProfile);
  const advancedSuggestions = writingDemos[selectedDemo].advancedSuggestions;

  return (
    <div
      style={{
        background: themeObj.surface,
        border: `1px solid ${themeObj.border}`,
        borderRadius: '12px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        height: '100%',
        boxShadow: `0 4px 12px rgba(0, 0, 0, ${theme === 'dark' ? 0.3 : 0.08})`,
      }}
    >
      <div>
        <label style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: themeObj.textSecondary, marginBottom: '12px', display: 'block' }}>
          Reader Profile
        </label>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {profiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => setSelectedReaderProfile(profile.id)}
              style={{
                padding: '10px 12px',
                border: selectedReaderProfile === profile.id ? `2px solid ${themeObj.accent}` : `1px solid ${themeObj.border}`,
                borderRadius: '8px',
                background: selectedReaderProfile === profile.id ? themeObj.accentLight : themeObj.card,
                color: themeObj.text,
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '13px',
                fontWeight: '500',
              }}
            >
              <div>{profile.name}</div>
              <div style={{ fontSize: '11px', color: themeObj.textSecondary, marginTop: '2px' }}>{profile.description}</div>
            </button>
          ))}
        </div>
      </div>

      {currentProfile && (
        <div>
          <label style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: themeObj.textSecondary, marginBottom: '8px', display: 'block' }}>
            Guidance for {currentProfile.name}
          </label>
          <div style={{ background: themeObj.card, padding: '12px', borderRadius: '8px', fontSize: '12px', lineHeight: '1.6', color: themeObj.text }}>
            {currentProfile.guidance.map((tip, idx) => (
              <div key={idx} style={{ marginBottom: idx < currentProfile.guidance.length - 1 ? '6px' : 0 }}>{tip}</div>
            ))}
          </div>
        </div>
      )}

      <div>
        <label style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: themeObj.textSecondary, marginBottom: '8px', display: 'block' }}>
          Word Insight
        </label>
        <div style={{ background: themeObj.card, padding: '12px', borderRadius: '8px', fontSize: '12px', lineHeight: '1.6', color: themeObj.text }}>
          {selectedWord && selectedInsight ? (
            <>
              <div style={{ fontWeight: 700, color: themeObj.accent, marginBottom: '6px' }}>{selectedWord}</div>
              <div><strong>Students struggled:</strong> {selectedInsight.struggledCount}</div>
              <div><strong>Definition:</strong> {selectedInsight.definition}</div>
              <div><strong>Definition-support words:</strong> {selectedInsight.contributors.join(', ')}</div>
            </>
          ) : (
            <div>Click a highlighted word in the compose document to view struggle count and definition details.</div>
          )}
        </div>
      </div>

      {selectedReaderProfile === 'advanced' && (
        <div>
          <label style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: themeObj.textSecondary, marginBottom: '8px', display: 'block' }}>
            Suggestions for engaging advanced readers
          </label>
          <div style={{ background: themeObj.card, padding: '12px', borderRadius: '8px', fontSize: '12px', lineHeight: '1.6', color: themeObj.text }}>
            {advancedSuggestions.map((suggestion, idx) => (
              <div key={idx} style={{ marginBottom: idx < advancedSuggestions.length - 1 ? '6px' : 0 }}>
                • {suggestion}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: `1px solid ${themeObj.border}` }}>
        <label style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: themeObj.textSecondary, marginBottom: '8px', display: 'block' }}>
          Text Metrics
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px' }}>
          <div style={{ background: themeObj.accentLight, padding: '8px', borderRadius: '6px', color: themeObj.text }}><div style={{ fontWeight: '600' }}>{wordCount}</div><div style={{ fontSize: '10px', color: themeObj.textSecondary }}>words</div></div>
          <div style={{ background: themeObj.accentLight, padding: '8px', borderRadius: '6px', color: themeObj.text }}><div style={{ fontWeight: '600' }}>{sentenceCount}</div><div style={{ fontSize: '10px', color: themeObj.textSecondary }}>sentences</div></div>
          <div style={{ background: themeObj.accentLight, padding: '8px', borderRadius: '6px', color: themeObj.text }}><div style={{ fontWeight: '600' }}>{avgWordsPerSent}</div><div style={{ fontSize: '10px', color: themeObj.textSecondary }}>avg words/sent</div></div>
          <div style={{ background: themeObj.accentLight, padding: '8px', borderRadius: '6px', color: themeObj.text }}><div style={{ fontWeight: '600' }}>{content.length}</div><div style={{ fontSize: '10px', color: themeObj.textSecondary }}>characters</div></div>
        </div>
      </div>
    </div>
  );
}
