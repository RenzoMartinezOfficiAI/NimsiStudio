
import React, { useState, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Policy } from '../types';

const AccordionItem: React.FC<{ policy: Policy; isOpen: boolean; onClick: () => void }> = ({ policy, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-200 dark:border-gray-700">
            <button onClick={onClick} className="w-full flex justify-between items-center py-5 text-left">
                <h4 className="font-poppins text-lg font-semibold text-ink dark:text-white">{policy.title}</h4>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    <svg className="w-5 h-5 text-slate" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </span>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <p className="pb-5 text-slate dark:text-gray-300">{policy.content}</p>
            </div>
        </div>
    );
};

const Policies: React.FC = () => {
    const { ref, animationClasses } = useScrollAnimation<HTMLDivElement>();
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [acknowledged, setAcknowledged] = useState(false);
    const [policies, setPolicies] = useState<Policy[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('./data/policies.json')
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then((data: Policy[]) => {
                setPolicies(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Could not fetch policies:", error);
                setLoading(false);
            });
    }, []);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="policies" className="py-24 bg-gray-50 dark:bg-gray-900">
            <div ref={ref} className={`container mx-auto px-6 transition-all duration-1000 ${animationClasses}`}>
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-playfair font-bold text-ink dark:text-white">Studio Policies</h2>
                    <p className="mt-4 text-lg text-slate max-w-2xl mx-auto">Please read carefully to ensure a smooth and pleasant experience.</p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {loading ? (
                        <div className="text-center text-slate dark:text-gray-400">Loading policies...</div>
                    ) : (
                        <>
                            {policies.map((policy, index) => (
                                <AccordionItem
                                    key={index}
                                    policy={policy}
                                    isOpen={openIndex === index}
                                    onClick={() => handleToggle(index)}
                                />
                            ))}
                            
                            <div className="mt-12 text-center">
                                <label className="flex items-center justify-center cursor-pointer">
                                    <input type="checkbox" checked={acknowledged} onChange={() => setAcknowledged(!acknowledged)} className="h-5 w-5 rounded border-gray-300 text-pink-blush focus:ring-pink-hover" />
                                    <span className="ml-3 text-slate dark:text-gray-300">I have read and agree to the studio policies.</span>
                                </label>
                                <a 
                                    href={process.env.BOOKING_PROVIDER_URL || '#'} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className={`mt-6 inline-block font-poppins font-semibold py-3 px-8 rounded-lg transition-all duration-300 ${acknowledged ? 'bg-pink-blush text-ink hover:bg-pink-hover' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                                    onClick={(e) => !acknowledged && e.preventDefault()}
                                >
                                    Book Appointment
                                </a>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Policies;
