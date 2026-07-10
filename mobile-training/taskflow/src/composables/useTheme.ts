// =============================================================
//  useTheme — shared dark/light mode state with persistence
//  Ionic activates its dark palette when <html> has the
//  `.ion-palette-dark` class (see dark.class.css in main.ts).
// =============================================================
import { ref } from 'vue';

const STORAGE_KEY = 'taskflow-theme';

// Module-level ref => a single shared source of truth across pages
const isDark = ref(false);

function apply(dark: boolean) {
  isDark.value = dark;
  document.documentElement.classList.toggle('ion-palette-dark', dark);
}

export function useTheme() {
  // Read a saved choice, otherwise follow the OS preference on first launch
  function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') {
      apply(saved === 'dark');
    } else {
      apply(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }

  function setDark(dark: boolean) {
    apply(dark);
    localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
  }

  function toggleTheme() {
    setDark(!isDark.value);
  }

  return { isDark, initTheme, setDark, toggleTheme };
}
