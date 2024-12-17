import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './theme/variables.css';  // ou le chemin vers votre fichier CSS principal

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);