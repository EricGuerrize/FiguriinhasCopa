import React from 'react';

export const SplashFallback: React.FC = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-white text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-accent rounded-full animate-spin mb-8"></div>
            <h1 className="text-2xl font-bold mb-2">Copa 2026</h1>
            <p className="text-text-muted text-sm animate-pulse">Carregando seus dados...</p>
        </div>
    );
};
