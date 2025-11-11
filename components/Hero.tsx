import React from 'react';

const Hero: React.FC = () => {
    return (
        <section id="home" className="relative h-screen flex items-center justify-center text-center bg-cover bg-center">
             <div className="absolute inset-0 bg-white dark:bg-transparent" style={{backgroundImage: "url('https://picsum.photos/seed/nimsibg/1920/1080')", backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent dark:from-brand-black dark:via-brand-black/50 dark:to-transparent"></div>
            <div className="relative z-10 container mx-auto px-6">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-ink dark:text-gold mb-4">
                    Enhancing Natural Beauty, One Lash at a Time.
                </h1>
                <p className="max-w-2xl mx-auto text-lg text-slate dark:text-text-light mb-8">
                    Welcome to Nimsi's Studio, where we craft bespoke lash sets designed to elevate your confidence and simplify your beauty routine.
                </p>
                <div className="flex justify-center items-center gap-4">
                    <a href={process.env.BOOKING_PROVIDER_URL || '#'} target="_blank" rel="noopener noreferrer" className="bg-pink-blush text-ink font-poppins font-semibold py-3 px-8 rounded-lg hover:bg-pink-hover transition-all duration-300 transform hover:scale-105">
                        Book Now
                    </a>
                    <a href="#services" className="border-2 border-pink-blush text-ink dark:text-text-light dark:border-gold dark:hover:bg-gold dark:hover:text-brand-black font-poppins font-semibold py-3 px-8 rounded-lg hover:bg-pink-blush hover:text-ink transition-colors duration-300">
                        View Prices
                    </a>
                </div>
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                <div className="w-6 h-10 border-2 border-slate dark:border-text-medium rounded-full flex justify-center items-start p-1">
                    <div className="w-1 h-2 bg-slate dark:bg-text-medium rounded-full animate-bounce"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;