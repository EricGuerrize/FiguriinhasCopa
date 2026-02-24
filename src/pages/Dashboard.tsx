import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../context/I18nContext';
import { useAuth } from '../context/AuthContext';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Grid, LogOut, Camera, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
    const { t } = useTranslation();
    const { user, signOut } = useAuth();

    // Mock data for Dashboard until hooked up to Supabase
    const stats = {
        collected: 234,
        total: 700,
        missing: 466,
        duplicates: 45
    };

    const percentage = (stats.collected / stats.total) * 100;

    return (
        <div className="p-6">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">Olá, {user?.email?.split('@')[0] || 'Colecionador'}!</h1>
                    <p className="text-text-muted text-sm mt-1">Bem-vindo de volta à sua coleção.</p>
                </div>
                <button onClick={signOut} className="p-2 bg-card rounded-full text-text-muted hover:text-white transition-colors">
                    <LogOut className="w-5 h-5" />
                </button>
            </header>

            <motion.section
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-2xl p-6 mb-6 shadow-lg border border-white/5"
            >
                <h2 className="text-lg font-semibold text-white mb-4">Progresso do Álbum</h2>
                <div className="flex items-end justify-between mb-2">
                    <span className="text-3xl font-black text-accent">{stats.collected}</span>
                    <span className="text-text-muted">/ {stats.total} figurinhas</span>
                </div>
                <ProgressBar progress={percentage} size="lg" />
            </motion.section>

            <div className="grid grid-cols-2 gap-4 mb-8">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-card rounded-2xl p-4 border border-white/5"
                >
                    <p className="text-text-muted text-sm mb-1">{t('title_missing')}</p>
                    <p className="text-2xl font-bold text-white">{stats.missing}</p>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-card rounded-2xl p-4 border border-white/5"
                >
                    <p className="text-text-muted text-sm mb-1">{t('title_duplicates')}</p>
                    <p className="text-2xl font-bold text-warning">{stats.duplicates}</p>
                </motion.div>
            </div>

            <h3 className="text-white font-semibold mb-4 text-lg">Ações Rápidas</h3>

            <div className="space-y-3">
                <Link to="/scan">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-primary/20 border border-primary/30 p-4 rounded-xl flex items-center gap-4 cursor-pointer"
                    >
                        <div className="bg-primary p-3 rounded-full text-white">
                            <Camera className="w-6 h-6" />
                        </div>
                        <div className="text-left flex-1">
                            <h4 className="text-white font-medium">Escanear Nova</h4>
                            <p className="text-primary-light text-sm text-text-muted">Adicione figurinhas via foto</p>
                        </div>
                    </motion.div>
                </Link>

                <Link to="/collection">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-card p-4 rounded-xl flex items-center gap-4 cursor-pointer border border-white/5"
                    >
                        <div className="bg-secondary/20 p-3 rounded-full text-secondary">
                            <Grid className="w-6 h-6" />
                        </div>
                        <div className="text-left flex-1">
                            <h4 className="text-white font-medium">Ver Coleção</h4>
                            <p className="text-text-muted text-sm">Gerencie suas figurinhas</p>
                        </div>
                    </motion.div>
                </Link>

                <Link to="/matches">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-accent/20 to-card border border-accent/20 p-4 rounded-xl flex items-center gap-4 cursor-pointer"
                    >
                        <div className="bg-accent p-3 rounded-full text-background">
                            <Users className="w-6 h-6" />
                        </div>
                        <div className="text-left flex-1">
                            <h4 className="text-accent font-medium">Encontrar Trocas</h4>
                            <p className="text-text-muted text-sm">Recurso Premium 🌟</p>
                        </div>
                    </motion.div>
                </Link>
            </div>

        </div>
    );
};
