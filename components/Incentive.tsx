import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Incentive: React.FC = () => {
    const { ref, animationClasses } = useScrollAnimation<HTMLDivElement>();
    const INSTAGRAM_URL = process.env.INSTAGRAM_DM_URL || 'https://www.instagram.com/lashesbynimsi';

    return (
        <section id="incentive" className="py-24 bg-white dark:bg-mage-surface">
            <div ref={ref} className={`container mx-auto px-6 transition-all duration-1000 ${animationClasses}`}>
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 bg-gray-50 dark:bg-mage-black p-8 md:p-12 rounded-lg shadow-lg text-center md:text-left">
                    <div className="md:w-1/3 max-w-xs">
                        <img 
                            src="https://i.postimg.cc/J0jXvvXb/image0.png" 
                            alt="Client selfie with beautiful lashes" 
                            className="w-full h-auto rounded-lg object-cover shadow-md aspect-[4/5]" 
                        />
                    </div>
                    <div className="md:w-2/3">
                        <h3 className="text-3xl lg:text-4xl font-playfair font-bold text-ink dark:text-mage-gold">Share the Love!</h3>
                        <p className="mt-4 text-lg text-slate dark:text-mage-text-light leading-relaxed">
                            Receive <strong className="text-pink-blush dark:text-mage-gold-hover">$5 off your next service</strong> anytime you tag me in a selfie or leave a review.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
                             <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="bg-pink-blush text-ink font-poppins font-semibold py-3 px-6 rounded-lg hover:bg-pink-hover transition-all duration-300 transform hover:scale-105">
                                Tag a Selfie
                            </a>
                             <a href="#reviews" className="border-2 border-pink-blush text-ink dark:text-mage-text-light dark:border-mage-gold dark:hover:bg-mage-gold dark:hover:text-mage-black font-poppins font-semibold py-3 px-6 rounded-lg hover:bg-pink-blush hover:text-ink transition-colors duration-300">
                                Leave a Review
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Incentive;
