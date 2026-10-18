import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/inter';
import { App } from './App';
import './styles/tokens.css';
import './styles/global.css';
import './styles/studio.css';

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
