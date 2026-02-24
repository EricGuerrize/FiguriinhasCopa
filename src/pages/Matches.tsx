import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../context/I18nContext';
import { ShieldAlert, Star, ArrowRightLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Matches: React.FC = () => {
    const { t } = useTranslation();

    // Mock Premium status check (should come from user context in real implementation)
    const isPremium = false; // Set to false to show the paywall

    const mockMatches = [
        { id: 1, name: 'João S.', needs: 8, has: 5, time: '2h atrás' },
        { id: 2, name: 'Pedro M.', needs: 3, has: 3, time: '5h atrás' },
        { id: 3, name: 'Carlos T.', needs: 12, has: 2, time: '1d atrás' },
    ];

    if (!isPremium) {
        return (
            <div className="p-4 flex flex-col h-screen pt-12 items-center text-center">
                <div className="bg-accent/20 p-6 rounded-full mb-6">
                    <Star className="w-16 h-16 text-accent" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-4">Recurso Premium</h1>
                <p className="text-text-muted mb-8 text-sm">
                    Descubra usuários que têm as figurinhas que você precisa e precisam das suas figurinhas repetidas automaticamente!
                </p>

                <div className="bg-card w-full rounded-2xl p-6 border border-white/10 mb-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10 flex flex-col justify-end items-center pb-6">
                        <LockOverlay />
                    </div>

                    <div className="space-y-4 opacity-50 blur-[2px] pointer-events-none">
                        {[1, 2].map(i => (
                            <div key={i} className="flex justify-between items-center p-3 border border-white/5 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary/20 rounded-full"></div>
                                    <div className="h-4 w-24 bg-white/10 rounded"></div>
                                </div>
                                <div className="h-4 w-12 bg-white/10 rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>

                <Link to="/premium" className="w-full">
                    <button className="w-full bg-accent text-background py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-accent/90 transition-transform active:scale-95 shadow-lg shadow-accent/20">
                        <Star className="w-5 h-5" />
                        Assinar Premium
                    </button>
                </Link>
            </div>
        );
    }

    // Premium View (if isPremium = true)
    return (
        <div className="p-4 flex flex-col h-screen pb-24">
            <h1 className="text-2xl font-bold text-white mb-2 pt-safe">{t('nav_matches')}</h1>
            <p className="text-text-muted text-sm mb-6">Jogadores com figurinhas compatíveis com sua lista.</p>

            <div className="flex-1 overflow-y-auto space-y-4">
                {mockMatches.map((match) => (
                    <motion.div
                        key={match.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card border border-white/10 p-4 rounded-2xl flex flex-col gap-4"
                    >
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-full text-white font-bold">
                                    {match.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-white font-bold">{match.name}</h3>
                                    <p className="text-text-muted text-xs">{match.time}</p>
                                </div>
                            </div>
                            <button className="text-accent text-sm font-semibold px-3 py-1.5 bg-accent/10 rounded-lg">
                                Propor Troca
                            </button>
                        </div>

                        <div className="flex items-center justify-between bg-background p-3 rounded-xl">
                            <div className="text-center">
                                <span className="block text-success font-black text-xl">{match.has}</span>
                                <span className="text-[10px] text-text-muted uppercase tracking-wider">Você precisa</span>
                            </div>
                            <ArrowRightLeft className="text-white/20" />
                            <div className="text-center">
                                <span className="block text-warning font-black text-xl">{match.needs}</span>
                                <span className="text-[10px] text-text-muted uppercase tracking-wider">Ele precisa</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const LockOverlay = () => (
    <div className="flex flex-col items-center">
        <ShieldAlert className="w-8 h-8 text-white/50 mb-2" />
        <span className="text-white/50 font-medium text-sm">Bloqueado</span>
    </div>
);
