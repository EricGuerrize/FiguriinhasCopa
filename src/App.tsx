import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { I18nProvider } from './context/I18nContext';
import { supabase } from './lib/supabase';
import { Login } from './pages/Login';
import { AppLayout } from './components/layout/AppLayout';
import { SplashFallback } from './components/layout/SplashFallback';
import { SplashScreen } from './components/layout/SplashScreen';
import { Dashboard } from './pages/Dashboard';
import { Collection } from './pages/Collection';
import { Duplicates } from './pages/Duplicates';
import { Scan } from './pages/Scan';
import { Matches } from './pages/Matches';
import { Premium } from './pages/Premium';
import { Settings } from './pages/Settings';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (!supabase) return <>{children}</>;
  if (loading) return <SplashFallback />;
  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

function AppInner() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={supabase ? <Login /> : <Navigate to="/" replace />} />

        {/* Routes outside bottom navigation layout */}
        <Route path="/premium" element={<ProtectedRoute><Premium /></ProtectedRoute>} />

        {/* Main layout with Bottom Navigation */}
        <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="collection" element={<Collection />} />
          <Route path="scan" element={<Scan />} />
          <Route path="duplicates" element={<Duplicates />} />
          <Route path="matches" element={<Matches />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <I18nProvider>
        <AppInner />
      </I18nProvider>
    </AuthProvider>
  );
}

export default App;
