import React from 'react';

const Hero: React.FC = () => {
    return (
        <section id="home" className="relative h-screen flex items-center justify-center text-center bg-gray-100 dark:bg-gray-900">
            {/* This section now has its own background, overriding the body's background image */}
            
            <div className="relative z-10 container mx-auto px-6">
                <h1 className="mb-6">
                    <img
                        src="https://i.postimg.cc/9MzhM5ms/Untitled-design-3.png"
                        alt="Nimsi's Studio"
                        className="mx-auto h-24 md:h-32 lg:h-40 w-auto dark:invert"
                    />
                </h1>
                <p className="max-w-2xl mx-auto text-lg text-slate dark:text-white mb-8">
                    Welcome to Nimsi's Studio, where we craft bespoke lash sets designed to elevate your confidence and simplify your beauty routine.
                </p>
                <div className="flex justify-center items-center gap-4">
                    <a href={process.env.BOOKING_PROVIDER_URL || '#'} target="_blank" rel="noopener noreferrer" className="bg-ink text-white dark:bg-white dark:text-ink font-poppins font-semibold py-3 px-8 rounded-lg hover:bg-slate-800 dark:hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">
                        Book Now
                    </a>
                    <a href="#services" className="border-2 border-gray-300 text-slate dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-ink font-poppins font-semibold py-3 px-8 rounded-lg hover:bg-ink hover:text-white transition-colors duration-300">
                        View Prices
                    </a>
                </div>
            </div>
            {/* Scroll indicator removed as per user request */}
        </section>
    );
};

export default Hero;