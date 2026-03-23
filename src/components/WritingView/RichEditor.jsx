import { getTheme } from '../../globals/themes';

export default function RichEditor({ content, setContent, theme }) {
  const themeObj = getTheme(theme);

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

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start writing..."
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          padding: '12px',
          fontSize: '15px',
          lineHeight: '1.7',
          color: themeObj.text,
          background: 'transparent',
          fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
          resize: 'none',
        }}
      />

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
