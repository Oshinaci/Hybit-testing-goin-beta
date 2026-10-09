import React, { createContext, useContext } from 'react';

export interface PullToRefreshContextType {
  isRefreshing: boolean;
  cancelRefresh: () => void;
}

export const PullToRefreshContext = createContext<PullToRefreshContextType>({
  isRefreshing: false,
  cancelRefresh: () => {},
});

export const usePullToRefresh = () => useContext(PullToRefreshContext);
