import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../context/I18nContext';
import type { TranslationKeys } from '../locales/pt';
import { StickerCard } from '../components/ui/StickerCard';
import { ALBUM_STRUCTURE } from '../utils/data';

type FilterType = 'all' | 'owned' | 'missing';

const FILTERS: FilterType[] = ['all', 'owned', 'missing'];
const FILTER_LABEL_KEYS: Record<FilterType, TranslationKeys> = {
    all: 'title_all',
    owned: 'title_owned',
    missing: 'title_missing',
};

export const Collection: React.FC = () => {
    const { t } = useTranslation();
    const [filter, setFilter] = useState<FilterType>('all');
    const [activeSection, setActiveSection] = useState(ALBUM_STRUCTURE.sections[0].id);

    // Stable mock logic while backend sync is not wired yet.
    const getMockStatus = (index: number): 'owned' | 'missing' | 'duplicate' => {
        const mod = index % 10;
        if (mod >= 8) return 'duplicate';
        if (mod >= 4) return 'owned';
        return 'missing';
    };

    const getMockQuantity = (status: 'owned' | 'missing' | 'duplicate', index: number) => {
        if (status === 'duplicate') return 2 + (index % 4);
        return 1;
    };

    const currentSection = ALBUM_STRUCTURE.sections.find(s => s.id === activeSection);
    if (!currentSection) return null;

    // Create an array of sticker mock data for the current section
    const sectionStickers = Array.from({ length: currentSection.count }, (_, i) => {
        const prefix = currentSection.id.startsWith('group')
            ? (currentSection.name.split(' ')[1] ?? 'G')
            : currentSection.id === 'cover'
                ? '0'
                : currentSection.name.substring(0, 3).toUpperCase();

        const status = getMockStatus(i);

        return {
            id: `${prefix}-${i + 1}`,
            number: prefix === '0' ? `${i + 1}` : `${prefix} ${i + 1}`,
            status,
            quantity: getMockQuantity(status, i),
        };
    });

    const filteredStickers = sectionStickers.filter(s => {
        if (filter === 'all') return true;
        if (filter === 'owned') return s.status === 'owned' || s.status === 'duplicate';
        if (filter === 'missing') return s.status === 'missing';
        return true;
    });

    return (
        <div className="flex flex-col h-screen">
            <div className="bg-card pt-safe">
                <div className="p-4 border-b border-white/5">
                    <h1 className="text-2xl font-bold text-white mb-4">{t('title_collection')}</h1>

                    <div className="flex p-1 bg-background rounded-lg mb-4">
                        {FILTERS.map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${filter === f ? 'bg-card text-white shadow' : 'text-text-muted'
                                    }`}
                            >
                                {t(FILTER_LABEL_KEYS[f])}
                            </button>
                        ))}
                    </div>

                    <div className="flex overflow-x-auto pb-2 scrollbar-hide gap-2">
                        {ALBUM_STRUCTURE.sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeSection === section.id
                                        ? 'bg-primary text-white'
                                        : 'bg-background text-text-muted hover:text-white'
                                    }`}
                            >
                                {section.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 pb-24">
                <motion.div
                    key={activeSection + filter}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-4 sm:grid-cols-5 gap-3"
                >
                    {filteredStickers.map((sticker) => (
                        <StickerCard
                            key={sticker.id}
                            number={sticker.number}
                            status={sticker.status}
                            quantity={sticker.quantity}
                            onClick={() => {
                                // Future: toggle owned status or open modal
                            }}
                        />
                    ))}
                </motion.div>

                {filteredStickers.length === 0 && (
                    <div className="text-center text-text-muted mt-12">
                        Nenhuma figurinha encontrada para este filtro.
                    </div>
                )}
            </div>
        </div>
    );
};
