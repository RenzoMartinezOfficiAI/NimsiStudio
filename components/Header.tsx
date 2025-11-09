
import React, { useState, useEffect } from 'react';

interface HeaderProps {
    onThemeSwitch: () => void;
    currentTheme: string;
}

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} className="text-sm font-medium text-slate hover:text-ink dark:text-gray-300 dark:hover:text-white transition-colors duration-200">
        {children}
    </a>
);

const Header: React.FC<HeaderProps> = ({ onThemeSwitch, currentTheme }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const BOOKING_URL = process.env.BOOKING_PROVIDER_URL || 'https://app.acuityscheduling.com/schedule/b1c76505';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '#home', label: 'Home' },
        { href: '#services', label: 'Services' },
        { href: '#policies', label: 'Policies' },
        { href: '#tips', label: 'Tips' },
        { href: '#ai-tools', label: 'AI Studio' },
        { href: '#gallery', label: 'Gallery' },
        { href: '#reviews', label: 'Reviews' },
        { href: '#contact', label: 'Contact' },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-ink/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'}`}>
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#home" className="font-playfair text-xl font-bold text-ink dark:text-white">Nimsi’s Studio</a>
                
                <nav className="hidden lg:flex items-center space-x-8">
                    {navLinks.map(link => <NavLink key={link.href} href={link.href}>{link.label}</NavLink>)}
                </nav>

                <div className="hidden lg:flex items-center space-x-4">
                    <button onClick={onThemeSwitch} className="p-2 rounded-full text-slate hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate/20">
                        {currentTheme === 'light' ? '🌙' : '☀️'}
                    </button>
                    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="bg-pink-blush text-ink font-poppins font-semibold text-sm py-2 px-5 rounded-lg hover:bg-pink-hover transition-colors duration-200">
                        Book Now
                    </a>
                </div>

                <div className="lg:hidden flex items-center space-x-2">
                    <button onClick={onThemeSwitch} className="p-2 rounded-full text-slate hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate/20">
                        {currentTheme === 'light' ? '🌙' : '☀️'}
                    </button>
                     <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="z-50 text-ink dark:text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                        </svg>
                    </button>
                </div>
            </div>
            
            {/* Mobile Menu */}
            <div className={`lg:hidden fixed inset-0 bg-white/90 dark:bg-ink/90 backdrop-blur-xl pt-20 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                 <nav className="flex flex-col items-center justify-center h-full space-y-8">
                    {navLinks.map(link => 
                        <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-2xl font-poppins text-ink dark:text-white">{link.label}</a>
                    )}
                     <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="mt-8 bg-pink-blush text-ink font-poppins font-semibold py-3 px-8 rounded-lg hover:bg-pink-hover transition-colors duration-200">
                        Book Now
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
