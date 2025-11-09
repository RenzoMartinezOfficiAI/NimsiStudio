
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white dark:bg-transparent border-t border-gray-200 dark:border-gold-dark/20">
            <div className="container mx-auto px-6 py-8 text-center text-slate dark:text-gray-400">
                <p className="text-sm">&copy; {new Date().getFullYear()} Nimsi’s Studio • Woodburn OR • Designed with care.</p>
                <div className="mt-4 space-x-4 text-sm">
                    <a href="#policies" className="hover:text-pink-blush dark:hover:text-gold transition-colors">Policies</a>
                    <span>•</span>
                    <a href={process.env.BOOKING_PROVIDER_URL || '#'} target="_blank" rel="noopener noreferrer" className="hover:text-pink-blush dark:hover:text-gold transition-colors">Book Now</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;