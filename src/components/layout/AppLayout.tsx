import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Home, Grid, Camera, Layers, Users } from 'lucide-react';
import { useTranslation } from '../../context/I18nContext';

export const AppLayout: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation();

    const navItems = [
        { name: t('nav_home'), path: '/', icon: Home },
        { name: t('nav_collection'), path: '/collection', icon: Grid },
        { name: t('nav_scan'), path: '/scan', icon: Camera, isPrimary: true },
        { name: t('nav_duplicates'), path: '/duplicates', icon: Layers },
        { name: t('nav_matches'), path: '/matches', icon: Users },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background text-text pb-20">

            {/* Main Content Area */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto">
                <Outlet />
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 w-full max-w-[480px] bg-card/90 backdrop-blur-md border-t border-white/5 pb-safe z-50">
                <div className="flex justify-around items-center px-2 py-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        if (item.isPrimary) {
                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className="relative -top-6 flex flex-col items-center justify-center"
                                >
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${isActive ? 'bg-accent text-background shadow-accent/20' : 'bg-primary text-white shadow-primary/30'
                                        }`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <span className={`text-[10px] mt-1 font-medium ${isActive ? 'text-accent' : 'text-text-muted'}`}>
                                        {item.name}
                                    </span>
                                </NavLink>
                            );
                        }

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={`flex flex-col items-center justify-center w-16 h-12 transition-colors ${isActive ? 'text-accent' : 'text-text-muted hover:text-white/80'
                                    }`}
                            >
                                <Icon className={`w-6 h-6 mb-1 ${isActive ? 'fill-accent/20' : ''}`} />
                                <span className="text-[10px] font-medium leading-none">
                                    {item.name}
                                </span>
                            </NavLink>
                        );
                    })}
                </div>
            </nav>

        </div>
    );
};
