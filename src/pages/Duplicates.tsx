import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../context/I18nContext';
import { Share2, MessageCircle, Minus, Plus } from 'lucide-react';

export const Duplicates: React.FC = () => {
    const { t } = useTranslation();

    // Mock data
    const [duplicates, setDuplicates] = useState([
        { id: 'BRA-5', number: 'BRA 5', quantity: 3 },
        { id: 'ARG-10', number: 'ARG 10', quantity: 2 },
        { id: 'FRA-1', number: 'FRA 1', quantity: 4 },
        { id: '00', number: '00', quantity: 2 },
        { id: 'USA-12', number: 'USA 12', quantity: 5 },
    ]);

    const updateQuantity = (id: string, delta: number) => {
        setDuplicates(prev => prev.map(d => {
            if (d.id === id) {
                const newQ = d.quantity + delta;
                return { ...d, quantity: newQ > 0 ? newQ : 0 };
            }
            return d;
        }).filter(d => d.quantity > 0)); // remove if 0
    };

    const shareWhatsApp = () => {
        const text = `Oi! Tenho estas figurinhas repetidas da Copa 2026 para trocar:\n\n${duplicates.map(d => `• ${d.number} (x${d.quantity})`).join('\n')}\n\nVamos trocar?`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    };

    return (
        <div className="p-4 flex flex-col h-screen pb-24">
            <h1 className="text-2xl font-bold text-white mb-6 pt-safe">{t('title_duplicates')}</h1>

            <div className="flex gap-3 mb-6">
                <button
                    onClick={shareWhatsApp}
                    className="flex-1 bg-success text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-success/90 transition-colors"
                >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                </button>
                <button className="flex-1 bg-card border border-white/10 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
                    <Share2 className="w-5 h-5" />
                    {t('action_share_deck')}
                </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3">
                {duplicates.length === 0 ? (
                    <div className="text-center text-text-muted mt-10">Você não tem figurinhas repetidas.</div>
                ) : (
                    duplicates.map((dup) => (
                        <motion.div
                            key={dup.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-card border border-warning/30 p-4 rounded-xl flex items-center justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-16 bg-warning/20 border border-warning rounded-lg flex items-center justify-center text-warning font-black text-lg">
                                    {dup.number.split(' ')[1] || dup.number}
                                </div>
                                <div>
                                    <h3 className="text-white font-bold">{dup.number}</h3>
                                    <p className="text-text-muted text-sm">Repetida</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 bg-background rounded-lg p-1">
                                <button
                                    onClick={() => updateQuantity(dup.id, -1)}
                                    className="p-1 rounded bg-card text-white hover:bg-white/10"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="font-bold text-white w-6 text-center">{dup.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(dup.id, 1)}
                                    className="p-1 rounded bg-card text-white hover:bg-white/10"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};
