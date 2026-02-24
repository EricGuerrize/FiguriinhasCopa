import React from 'react';
import { useTranslation } from '../context/I18nContext';
import { useAuth } from '../context/AuthContext';
import { LogOut, Globe, User, Shield, Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Settings: React.FC = () => {
    const { t, language, setLanguage } = useTranslation();
    const { user, signOut } = useAuth();

    return (
        <div className="p-4 flex flex-col h-screen pb-24 bg-background pt-safe">
            <h1 className="text-2xl font-bold text-white mb-6 pt-4">{t('settings')}</h1>

            <div className="space-y-6 flex-1 overflow-y-auto">

                {/* Profile Section */}
                <section className="bg-card rounded-2xl p-4 border border-white/5 flex items-center gap-4">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-white font-bold text-lg">{user?.email?.split('@')[0] || 'User'}</h2>
                        <p className="text-text-muted text-sm">{user?.email}</p>
                    </div>
                </section>

                {/* Premium Banner */}
                <Link to="/premium">
                    <section className="bg-gradient-to-r from-accent/20 to-card rounded-2xl p-4 border border-accent/20 flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-3">
                            <Star className="w-6 h-6 text-accent fill-accent/20" />
                            <div>
                                <h3 className="text-white font-medium">Conta Premium</h3>
                                <p className="text-text-muted text-xs">Desbloqueie trocas automáticas e mais.</p>
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-text-muted" />
                    </section>
                </Link>

                {/* Preferences */}
                <div className="space-y-2">
                    <h3 className="text-text-muted text-xs font-semibold uppercase tracking-wider pl-2">Preferências</h3>

                    <div className="bg-card rounded-2xl border border-white/5 overflow-hidden">
                        <div className="p-4 flex items-center justify-between border-b border-white/5">
                            <div className="flex items-center gap-3">
                                <Globe className="w-5 h-5 text-text-muted" />
                                <span className="text-white font-medium">{t('language')}</span>
                            </div>
                            <select
                                value={language}
                                onChange={(e) => {
                                    const nextLanguage = e.target.value;
                                    if (nextLanguage === 'pt' || nextLanguage === 'en') {
                                        setLanguage(nextLanguage);
                                    }
                                }}
                                className="bg-background text-white border border-white/10 rounded-lg px-3 py-1 text-sm outline-none"
                            >
                                <option value="pt">Português</option>
                                <option value="en">English</option>
                            </select>
                        </div>

                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Shield className="w-5 h-5 text-text-muted" />
                                <span className="text-white font-medium">Privacidade</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-text-muted" />
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <button
                    onClick={signOut}
                    className="w-full bg-error/10 text-error py-4 rounded-xl font-bold flex items-center justify-center gap-2 mt-8 hover:bg-error/20 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    {t('logout')}
                </button>

            </div>
        </div>
    );
};
