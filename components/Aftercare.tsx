
import React, { useState, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Tip } from '../types';

const Aftercare: React.FC = () => {
    const { ref, animationClasses } = useScrollAnimation<HTMLDivElement>();
    const [tips, setTips] = useState<Tip[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('./data/tips.json')
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then((data: Tip[]) => {
                setTips(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Could not fetch tips:", error);
                setLoading(false);
            });
    }, []);

    return (
        <section id="tips" className="py-24 bg-gray-50 dark:bg-ink-light/90 dark:backdrop-blur-sm">
            <div ref={ref} className={`container mx-auto px-6 transition-all duration-1000 ${animationClasses}`}>
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-playfair font-bold text-ink dark:text-gold-light">Tips & Aftercare</h2>
                    <p className="mt-4 text-lg text-slate max-w-2xl mx-auto">Keep your lashes looking flawless for longer.</p>
                </div>
                {loading ? (
                    <div className="text-center text-slate dark:text-gray-400">Loading tips...</div>
                ) : (
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tips.map((tipCategory, index) => (
                            <div key={index} className="bg-white dark:bg-ink p-8 rounded-lg shadow-md">
                                <h3 className="font-poppins text-xl font-bold text-ink dark:text-gold mb-4">{tipCategory.title}</h3>
                                <ul className="space-y-3">
                                    {tipCategory.items.map((item, itemIndex) => (
                                         <li key={itemIndex} className="flex items-start">
                                            <span className="text-pink-blush dark:text-gold mr-3 mt-1">&#10003;</span>
                                            <span className="text-slate dark:text-gray-300">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Aftercare;