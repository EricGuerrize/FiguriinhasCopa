import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TIPS = [
    "Scaneie suas figurinhas para adicioná-margin automaticamente!",
    "Marque figurinhas como repetidas e encontre trocas com o Premium.",
    "Mantenha sua coleção organizada e acompanhe seu progresso.",
    "Compartilhe seu deck com amigos no WhatsApp!"
];

interface SplashScreenProps {
    onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
    const [currentTip, setCurrentTip] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Rotate tips every 1.5 seconds
        const tipInterval = setInterval(() => {
            setCurrentTip(prev => (prev + 1) % TIPS.length);
        }, 1500);

        // Progress bar animation
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    setTimeout(onComplete, 200); // give a tiny delay at 100%
                    return 100;
                }
                return prev + 2;
            });
        }, 40);

        return () => {
            clearInterval(tipInterval);
            clearInterval(progressInterval);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center p-6 text-white text-center"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="w-24 h-24 bg-primary/20 rounded-3xl flex items-center justify-center mx-auto mb-6 relative">
                    <div className="absolute inset-0 border-2 border-primary border-t-accent rounded-3xl animate-spin" style={{ animationDuration: '3s' }}></div>
                    <span className="text-4xl">🏆</span>
                </div>

                <h1 className="text-3xl font-extrabold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-accent to-white">
                    Copa 2026
                </h1>
                <p className="text-primary font-medium tracking-wide mb-12 uppercase text-sm">
                    Stickers Tracker
                </p>

                <div className="w-64 max-w-full bg-card rounded-full h-2 mb-8 overflow-hidden">
                    <motion.div
                        className="h-full bg-accent rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "linear", duration: 0.1 }}
                    />
                </div>

                <div className="h-12 relative flex items-center justify-center overflow-hidden w-full max-w-xs">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={currentTip}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-text-muted text-sm font-medium absolute w-full"
                        >
                            {TIPS[currentTip]}
                        </motion.p>
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
};
