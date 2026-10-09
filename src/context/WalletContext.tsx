import React, { createContext, useContext, useState, useCallback } from 'react';
import { useToast } from './ToastContext';

interface WalletContextType {
  isWalletConnected: boolean;
  walletAddress: string;
  email: string;
  walletProvider: string;
  isConnectModalOpen: boolean;
  openConnectModal: () => void;
  closeConnectModal: () => void;
  connectWallet: (providerName?: string) => void;
  disconnectWallet: () => void;
}

export const WALLET_STORAGE_KEY = 'hybit_wallet_connected';
export const WALLET_PROVIDER_KEY = 'hybit_wallet_provider';
export const DEFAULT_WALLET_ADDRESS = '0x7F2a45B083C29E41c7F3bDa208B49a37e89e8b1e';
export const DEFAULT_EMAIL = 'kaitosogen@gmail.com';

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(() => {
    try {
      return localStorage.getItem(WALLET_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [walletProvider, setWalletProvider] = useState<string>(() => {
    try {
      return localStorage.getItem(WALLET_PROVIDER_KEY) || 'Privy Embedded Wallet';
    } catch {
      return 'Privy Embedded Wallet';
    }
  });

  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  const openConnectModal = useCallback(() => {
    setIsConnectModalOpen(true);
  }, []);

  const closeConnectModal = useCallback(() => {
    setIsConnectModalOpen(false);
  }, []);

  const connectWallet = useCallback(
    (providerName: string = 'Privy Embedded Wallet') => {
      try {
        localStorage.setItem(WALLET_STORAGE_KEY, 'true');
        localStorage.setItem(WALLET_PROVIDER_KEY, providerName);
      } catch {
        // ignore
      }
      setIsWalletConnected(true);
      setWalletProvider(providerName);
      setIsConnectModalOpen(false);
      showToast(
        'Wallet Connected',
        `${providerName} connected (0x7F2...8b1e)`,
        'success'
      );
    },
    [showToast]
  );

  const disconnectWallet = useCallback(() => {
    try {
      localStorage.removeItem(WALLET_STORAGE_KEY);
      localStorage.removeItem(WALLET_PROVIDER_KEY);
    } catch {
      // ignore
    }
    setIsWalletConnected(false);
    showToast(
      'Wallet Disconnected',
      'Wallet has been disconnected. Browser refresh will return to Landing page.',
      'info'
    );
  }, [showToast]);

  return (
    <WalletContext.Provider
      value={{
        isWalletConnected,
        walletAddress: DEFAULT_WALLET_ADDRESS,
        email: DEFAULT_EMAIL,
        walletProvider,
        isConnectModalOpen,
        openConnectModal,
        closeConnectModal,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
