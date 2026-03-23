export const themes = {
  light: {
    name: 'light',
    bg: '#f8f9fa',
    surface: '#f3f4f5',
    card: '#ffffff',
    text: '#2c3e50',
    textSecondary: '#7f8c8d',
    border: '#e0e0e0',
    accent: '#e8b4c8',
    accentLight: '#f5e6ed',
  },
  dark: {
    name: 'dark',
    bg: '#0f0f0f',
    surface: '#1a1a1a',
    card: '#252525',
    text: '#f0f0f0',
    textSecondary: '#a0a0a0',
    border: '#333333',
    accent: '#d97bb8',
    accentLight: '#3d2a3f',
  },
  funky: {
    name: 'funky',
    bg: '#0d1b2a',
    surface: '#1a2940',
    card: '#1f3a52',
    text: '#f0f4f8',
    textSecondary: '#b0c4de',
    border: '#2d5a7a',
    accent: '#ff6b9d',
    accentLight: '#ffa8d3',
    gradient: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 50%, #a15ba7 100%)',
  },
};

export const getTheme = (themeName) => themes[themeName] || themes.light;
