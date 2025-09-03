// src/App.tsx
import React, { Suspense, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { ThemeProvider, CssBaseline, Box, CircularProgress } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import { store } from './store';
import theme from './styles/theme';
import I18nProvider from './i18n/intl';
import AppRoutes from './routes';
import { fetchCurrentUser } from './store/authSlice';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any, info: any) {
  }
  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <h2>Something went wrong.</h2>
          <p>Try refreshing the page — if this persists, check the console.</p>
        </Box>
      );
    }
    return this.props.children;
  }
}

function AppInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchCurrentUser() as any);
    }
  }, []);

  return <>{children}</>;
}

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <I18nProvider>
          <ErrorBoundary>
            <BrowserRouter>
              <AppInitializer>
                <Suspense
                  fallback={
                    <Box sx={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
                      <CircularProgress />
                    </Box>
                  }
                >
                  <AppRoutes />
                </Suspense>
              </AppInitializer>
            </BrowserRouter>
          </ErrorBoundary>
        </I18nProvider>
      </ThemeProvider>
    </Provider>
  );
}
