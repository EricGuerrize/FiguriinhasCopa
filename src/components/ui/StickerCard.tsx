import React from 'react';
import { motion } from 'framer-motion';

export interface StickerCardProps {
    number: string;
    quantity?: number;
    status: 'missing' | 'owned' | 'duplicate';
    onClick?: () => void;
}

export const StickerCard: React.FC<StickerCardProps> = ({ number, quantity = 0, status, onClick }) => {
    const getColors = () => {
        switch (status) {
            case 'owned':
                return 'bg-success/20 border-success text-success shadow-success/10';
            case 'duplicate':
                return 'bg-warning/20 border-warning text-warning shadow-warning/10';
            case 'missing':
            default:
                return 'bg-card border-white/10 text-text-muted shadow-black/20';
        }
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`relative w-full aspect-[3/4] flex items-center justify-center rounded-xl border-2 transition-colors overflow-hidden ${getColors()}`}
        >
            <span className="font-black text-lg sm:text-xl tracking-tighter">
                {number}
            </span>
            {status === 'duplicate' && quantity > 1 && (
                <span className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-warning text-card text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    x{quantity}
                </span>
            )}
        </motion.button>
    );
};
