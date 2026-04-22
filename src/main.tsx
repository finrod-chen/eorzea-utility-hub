import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Remove loading screen once React takes over
const loadingScreen = document.getElementById('loading-screen');
if (loadingScreen) {
  loadingScreen.classList.add('fade-out');
  loadingScreen.addEventListener('transitionend', () => loadingScreen.remove());
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
