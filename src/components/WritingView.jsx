import { useMemo, useState } from 'react';
import { getTheme } from '../globals/themes';
import RichEditor from './WritingView/RichEditor';
import AssistantPanel from './WritingView/AssistantPanel';
import { writingDemos } from '../globals/contentData';

export default function WritingView({ theme, selectedReaderProfile, setSelectedReaderProfile }) {
  const themeObj = getTheme(theme);
  const [selectedDemo, setSelectedDemo] = useState('A');
  const [selectedWord, setSelectedWord] = useState(null);

  const activeDemo = writingDemos[selectedDemo];
  const editorContent = activeDemo.essay;

  const profileDifficultyCutoff = {
    beginner: 1,
    intermediate: 2,
    advanced: 3,
  };

  const highlightedWords = useMemo(() => {
    const cutoff = profileDifficultyCutoff[selectedReaderProfile];
    return Object.entries(activeDemo.wordInsights)
      .filter(([, value]) => value.difficulty >= cutoff)
      .map(([key]) => key);
  }, [activeDemo, selectedReaderProfile]);

  const selectedInsight = selectedWord ? activeDemo.wordInsights[selectedWord] : null;

  return (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        padding: '20px',
        paddingTop: '80px',
        height: '100vh',
        width: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
        background: themeObj.bg,
        color: themeObj.text,
      }}
    >
      <div style={{ flex: '1 1 auto', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <RichEditor
          content={editorContent}
          selectedDemo={selectedDemo}
          setSelectedDemo={setSelectedDemo}
          highlightedWords={highlightedWords}
          selectedReaderProfile={selectedReaderProfile}
          selectedWord={selectedWord}
          setSelectedWord={setSelectedWord}
          selectedInsight={selectedInsight}
          theme={theme}
        />
      </div>

      <div style={{ width: 'min(360px, 32vw)', minWidth: '280px', display: 'flex', flexDirection: 'column' }}>
        <AssistantPanel
          content={editorContent}
          selectedReaderProfile={selectedReaderProfile}
          setSelectedReaderProfile={setSelectedReaderProfile}
          selectedDemo={selectedDemo}
          selectedWord={selectedWord}
          selectedInsight={selectedInsight}
          theme={theme}
        />
      </div>
    </div>
  );
}
