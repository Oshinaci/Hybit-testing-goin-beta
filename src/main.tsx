import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ToastProvider } from './context/ToastContext.tsx';
import { AppSettingsProvider } from './context/AppSettingsContext.tsx';
import { WalletProvider } from './context/WalletContext.tsx';

createRoot(document.getElementById('root')!).render(
  <AppSettingsProvider>
    <ToastProvider>
      <WalletProvider>
        <App />
      </WalletProvider>
    </ToastProvider>
  </AppSettingsProvider>
);
