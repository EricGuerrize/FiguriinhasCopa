import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
    progress: number;
    label?: string;
    colorClass?: string;
    size?: 'sm' | 'md' | 'lg';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    progress,
    label,
    colorClass = 'bg-accent',
    size = 'md'
}) => {
    const heightClass = {
        sm: 'h-1.5',
        md: 'h-2.5',
        lg: 'h-4'
    }[size];

    return (
        <div className="w-full">
            {label && (
                <div className="flex justify-between text-sm font-medium mb-1">
                    <span className="text-white">{label}</span>
                    <span className="text-text-muted">{Math.round(progress)}%</span>
                </div>
            )}
            <div className={`w-full bg-card rounded-full ${heightClass} overflow-hidden shadow-inner`}>
                <motion.div
                    className={`${heightClass} rounded-full ${colorClass}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                />
            </div>
        </div>
    );
};
