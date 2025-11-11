import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Checklist: React.FC = () => {
    const { ref, animationClasses } = useScrollAnimation<HTMLDivElement>();
    
    const items = [
        "Lashes clean & makeup-free ✅",
        "Avoid caffeine before appointment ☕",
        "Remove contact lenses 👁️",
        "No foreign fills without approval ❌",
        "$25 deposit via Zelle/Cash App",
        "7 min late = $10 fee; 12 min = cancellation",
        "Cancel or reschedule ≥ 24 hrs before",
        "One free reschedule per booking",
        "No guests unless confirmed",
        "Remainder payment in cash only"
    ];

    return (
        <section id="checklist" className="py-24 bg-white dark:bg-mage-surface">
            <div ref={ref} className={`container mx-auto px-6 transition-all duration-1000 ${animationClasses}`}>
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-playfair font-bold text-ink dark:text-mage-gold">Before You Book</h2>
                    <p className="mt-4 text-lg text-slate max-w-2xl mx-auto dark:text-mage-text-light">A quick checklist for your appointment.</p>
                </div>
                <div className="max-w-4xl mx-auto p-8 rounded-lg bg-cover bg-center" style={{backgroundImage: "url('https://picsum.photos/seed/image0/1200/800')"}}>
                    <div className="bg-white/80 dark:bg-mage-black/80 backdrop-blur-sm p-8 rounded-lg">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                            {items.map((item, index) => (
                                <p key={index} className="text-slate dark:text-mage-text-light flex items-center">
                                    <svg className="w-5 h-5 mr-3 text-pink-blush dark:text-mage-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                    {item}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Checklist;