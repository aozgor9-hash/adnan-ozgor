import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

/**
 * index.html'deki açılış ekranını kaldır: sayfa ve yazı tipleri hazır olunca
 * (en geç 2,5 sn sonra) yumuşakça kaybolur.
 */
function hideSplash() {
  const el = document.getElementById('splash');
  if (!el || el.dataset.hidden) return;
  el.dataset.hidden = '1';
  el.style.opacity = '0';
  window.setTimeout(() => el.remove(), 600);
}
const fontsReady = document.fonts?.ready ?? Promise.resolve();
Promise.race([fontsReady, new Promise((r) => window.setTimeout(r, 2500))]).then(() =>
  requestAnimationFrame(() => requestAnimationFrame(hideSplash)),
);
