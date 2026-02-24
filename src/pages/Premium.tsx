import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowLeft, Star, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Premium: React.FC = () => {
    const navigate = useNavigate();

    const benefits = [
        "Experiência 100% sem anúncios",
        "Ver decks de figurinhas de outros usuários",
        "Match automático e instantâneo de trocas",
        "Selo de Colecionador Premium no perfil",
        "Prioridade no suporte técnico"
    ];

    return (
        <div className="bg-background min-h-screen text-white flex flex-col p-6">
            <button
                onClick={() => navigate(-1)}
                className="self-start p-2 bg-card rounded-full mb-6 hover:bg-white/10"
            >
                <ArrowLeft className="w-6 h-6" />
            </button>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center mb-8"
            >
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-orange-500 rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg shadow-accent/20">
                    <Star className="w-10 h-10 text-white fill-white" />
                </div>
                <h1 className="text-3xl font-black mb-2">Desbloqueie tudo</h1>
                <p className="text-text-muted">Complete seu álbum mais rápido com o poder do Premium.</p>
            </motion.div>

            <div className="bg-card rounded-3xl p-6 border border-white/10 mb-8 space-y-4">
                {benefits.map((b, i) => (
                    <div key={i} className="flex flex-row items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                            <Check className="w-4 h-4 text-success" />
                        </div>
                        <span className="text-sm font-medium">{b}</span>
                    </div>
                ))}
            </div>

            <div className="space-y-4 mb-8">
                <label className="relative flex flex-col bg-card p-5 rounded-2xl border-2 border-accent cursor-pointer overflow-hidden">
                    <div className="absolute top-0 right-0 bg-accent text-background text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                        MAIS POPULAR
                    </div>
                    <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-lg">Vitalício</span>
                        <span className="font-black text-2xl text-accent">R$ 25</span>
                    </div>
                    <span className="text-text-muted text-sm">Pagamento único. Acesso para sempre.</span>
                    <input type="radio" name="plan" className="hidden" defaultChecked />
                </label>

                <label className="relative flex flex-col bg-background p-5 rounded-2xl border-2 border-white/10 cursor-pointer">
                    <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-lg">Mensal</span>
                        <span className="font-black text-2xl">R$ 15<span className="text-sm font-normal text-text-muted">/mês</span></span>
                    </div>
                    <span className="text-text-muted text-sm">Cancele quando quiser.</span>
                    <input type="radio" name="plan" className="hidden" />
                </label>
            </div>

            <button className="w-full bg-accent text-background py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-accent/90 transition-transform active:scale-95 shadow-lg shadow-accent/20 mt-auto">
                <Heart className="w-5 h-5" />
                Assinar Agora (Stripe)
            </button>
            <p className="text-center text-[10px] text-text-muted mt-4">
                Pagamento seguro processado via Stripe. Você pode cancelar a qualquer momento nas configurações.
            </p>
        </div>
    );
};
