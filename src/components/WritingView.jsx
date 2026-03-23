import { useState } from 'react';
import { getTheme } from '../globals/themes';
import RichEditor from './WritingView/RichEditor';
import AssistantPanel from './WritingView/AssistantPanel';

export default function WritingView({ theme, selectedReaderProfile, setSelectedReaderProfile }) {
  const themeObj = getTheme(theme);
  const [editorContent, setEditorContent] = useState(
    'Students investigate how moisture evaporates from the surface, condenses into clouds, and eventually returns to the reservoir below.'
  );

  return (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        padding: '20px',
        paddingTop: '80px',
        height: '100vh',
        background: themeObj.bg,
        color: themeObj.text,
      }}
    >
      {/* Left: Editor */}
      <div style={{ flex: '1 1 68%', display: 'flex', flexDirection: 'column' }}>
        <RichEditor
          content={editorContent}
          setContent={setEditorContent}
          theme={theme}
        />
      </div>

      {/* Right: Assistant Panel */}
      <div style={{ flex: '1 1 32%', display: 'flex', flexDirection: 'column' }}>
        <AssistantPanel
          content={editorContent}
          selectedReaderProfile={selectedReaderProfile}
          setSelectedReaderProfile={setSelectedReaderProfile}
          theme={theme}
        />
      </div>
    </div>
  );
}
