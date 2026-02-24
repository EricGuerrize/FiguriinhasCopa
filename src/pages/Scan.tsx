import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../context/I18nContext';
import { Camera, Check } from 'lucide-react';

export const Scan: React.FC = () => {
    const { t } = useTranslation();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            const base64 = event.target?.result as string;
            setImagePreview(base64);
            analyzeSticker(base64.split(',')[1]); // remove data:image/jpeg;base64,
        };
        reader.readAsDataURL(file);
    };

    const analyzeSticker = async (base64Image: string) => {
        setIsScanning(true);
        setResult(null);
        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
            if (!apiKey || apiKey === 'your_gemini_api_key_here') {
                // Mock result if no API key
                setTimeout(() => {
                    setResult('BRA 10');
                    setIsScanning(false);
                }, 2000);
                return;
            }

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [
                                { text: 'Analise esta figurinha da Copa do Mundo e retorne APENAS o número da figurinha em JSON: {"number": "123"}. Se houver sigla do país, inclua (ex: BRA 10).' },
                                { inline_data: { mime_type: 'image/jpeg', data: base64Image } }
                            ]
                        }]
                    })
                }
            );

            const data = await response.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
            const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsed = JSON.parse(cleanJson);

            setResult(parsed.number || 'Desconhecido');
        } catch (err) {
            console.error('Error scanning sticker:', err);
            setResult('Erro ao escanear');
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <div className="p-4 flex flex-col h-screen">
            <h1 className="text-2xl font-bold text-white mb-6 pt-safe">{t('action_scan')}</h1>

            <div className="flex-1 flex flex-col items-center justify-center pb-24">

                <AnimatePresence mode="wait">
                    {!imagePreview ? (
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="w-full max-w-sm aspect-[3/4] border-2 border-dashed border-primary/50 rounded-2xl flex flex-col items-center justify-center bg-primary/5 cursor-pointer hover:bg-primary/10 transition-colors"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <div className="bg-primary p-4 rounded-full text-white mb-4">
                                <Camera className="w-8 h-8" />
                            </div>
                            <p className="font-semibold text-white">Toque para escanear</p>
                            <p className="text-text-muted text-sm mt-1">ou escolha da galeria</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="preview"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden relative shadow-2xl shadow-primary/20"
                        >
                            <img src={imagePreview} alt="Scanned sticker" className="w-full h-full object-cover" />

                            {isScanning && (
                                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center">
                                    <div className="w-16 h-16 border-4 border-primary border-t-accent rounded-full animate-spin mb-4" />
                                    <p className="text-white font-medium animate-pulse">Analisando figurinha com IA...</p>
                                </div>
                            )}

                            {result && !isScanning && (
                                <motion.div
                                    initial={{ y: 100 }}
                                    animate={{ y: 0 }}
                                    className="absolute bottom-0 w-full bg-card/95 backdrop-blur-md p-6 border-t border-white/10 rounded-t-3xl"
                                >
                                    <p className="text-text-muted text-sm mb-1 text-center">Figurinha Identificada</p>
                                    <p className="text-4xl font-black text-white text-center mb-6">{result}</p>

                                    <div className="flex flex-col gap-3">
                                        <button className="w-full bg-success text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
                                            <Check className="w-5 h-5" />
                                            {t('action_add_collection')}
                                        </button>
                                        <button className="w-full bg-card border border-warning text-warning py-3 rounded-xl font-semibold hover:bg-warning/10 transition-colors">
                                            {t('action_mark_duplicate')}
                                        </button>
                                        <button
                                            onClick={() => { setImagePreview(null); setResult(null); }}
                                            className="w-full mt-2 text-text-muted text-sm hover:text-white transition-colors"
                                        >
                                            Escanear outra
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleImageUpload}
                />

            </div>
        </div>
    );
};
