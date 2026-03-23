import { getTheme } from '../globals/themes';

export default function TopBar({ currentScreen, setCurrentScreen, theme, setTheme }) {
  const themeObj = getTheme(theme);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '24px',
        paddingRight: '24px',
        background: theme === 'funky'
          ? `linear-gradient(90deg, ${themeObj.card}cc, ${themeObj.surface}cc)`
          : `${themeObj.card}cc`,
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${themeObj.border}`,
        zIndex: 100,
      }}
    >
      <ThemeSwitcher theme={theme} setTheme={setTheme} />
      <ModeSwitcher currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
    </div>
  );
}

function ThemeSwitcher({ theme, setTheme }) {
  const themes = ['light', 'dark', 'funky'];
  const labels = ['Light', 'Dark', 'Funky'];

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {themes.map((t, idx) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          style={{
            padding: '6px 12px',
            border: 'none',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '500',
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            transition: 'all 0.3s ease',
            background: theme === t 
              ? (t === 'funky' ? 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)' : '#2c3e50')
              : 'transparent',
            color: theme === t ? '#fff' : '#7f8c8d',
          }}
          onMouseEnter={(e) => {
            if (theme !== t) {
              e.target.style.background = 'rgba(0, 0, 0, 0.05)';
            }
          }}
          onMouseLeave={(e) => {
            if (theme !== t) {
              e.target.style.background = 'transparent';
            }
          }}
        >
          {labels[idx]}
        </button>
      ))}
    </div>
  );
}

function ModeSwitcher({ currentScreen, setCurrentScreen }) {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {['writing', 'reading'].map((mode) => {
        const isActive = currentScreen === mode;
        const bgColor = isActive ? '#2c3e50' : 'transparent';
        const textColor = isActive ? '#fff' : '#7f8c8d';

        return (
          <button
            key={mode}
            onClick={() => setCurrentScreen(mode)}
            style={{
              padding: '6px 12px',
              border: 'none',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '500',
              cursor: 'pointer',
              textTransform: 'capitalize',
              transition: 'all 0.3s ease',
              background: bgColor,
              color: textColor,
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.target.style.background = 'rgba(0, 0, 0, 0.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.target.style.background = 'transparent';
              }
            }}
          >
            {mode === 'writing' ? '✍️ Write' : '📖 Read'}
          </button>
        );
      })}
    </div>
  );
}
