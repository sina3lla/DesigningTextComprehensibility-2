import { useState } from 'react';
import { getTheme } from './globals/themes';
import TopBar from './components/TopBar';
import WritingView from './components/WritingView';
import ReadingView from './components/ReadingView';
import './App.css';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [currentScreen, setCurrentScreen] = useState('writing');
  const [selectedReaderProfile, setSelectedReaderProfile] = useState('beginner');

  const themeObj = getTheme(theme);

  return (
    <div
      style={{
        background: themeObj.bg,
        color: themeObj.text,
        minHeight: '100vh',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
    >
      <TopBar
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        theme={theme}
        setTheme={setTheme}
      />

      {currentScreen === 'writing' ? (
        <WritingView
          theme={theme}
          selectedReaderProfile={selectedReaderProfile}
          setSelectedReaderProfile={setSelectedReaderProfile}
        />
      ) : (
        <ReadingView theme={theme} selectedReaderProfile={selectedReaderProfile} />
      )}
    </div>
  );
}
