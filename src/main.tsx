import '@xyflow/react/dist/style.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';  // 🔹 luego tu Tailwind/estilos
import App from './App';  // 🔹 por último tu App

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
