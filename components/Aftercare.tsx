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
        <section id="tips" className="py-24 bg-gray-50 dark:bg-ink">
            <div ref={ref} className={`container mx-auto px-6 transition-all duration-1000 ${animationClasses}`}>
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-playfair font-bold text-ink dark:text-white">Tips & Aftercare</h2>
                    <p className="mt-4 text-lg text-slate max-w-2xl mx-auto dark:text-slate-200">Keep your lashes looking flawless for longer.</p>
                </div>
                {loading ? (
                    <div className="text-center text-slate dark:text-slate-400">Loading tips...</div>
                ) : (
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tips.map((tipCategory, index) => (
                            <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
                                <h3 className="font-poppins text-xl font-bold text-ink dark:text-white mb-4">{tipCategory.title}</h3>
                                <ul className="space-y-3">
                                    {tipCategory.items.map((item, itemIndex) => (
                                         <li key={itemIndex} className="flex items-start">
                                            <svg className="w-5 h-5 text-ink dark:text-white mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                            <span className="text-slate dark:text-slate-200">{item}</span>
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