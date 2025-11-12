import React, { useState, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Service } from '../types';

const ServiceCard: React.FC<{ service: { name: string; price: number; popular?: boolean } }> = ({ service }) => {
    return (
        <div className="relative bg-white dark:bg-ink p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            {service.popular && <div className="absolute top-0 right-4 -mt-3 bg-ink text-white dark:bg-white/20 dark:text-white text-xs font-bold px-3 py-1 rounded-full">Most Popular</div>}
            <div className="flex justify-between items-baseline">
                <h4 className="font-poppins text-lg font-semibold text-ink dark:text-white">{service.name}</h4>
                <p className="text-xl font-bold text-ink dark:text-white">${service.price}</p>
            </div>
             <a href={process.env.BOOKING_PROVIDER_URL || '#'} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-semibold text-ink hover:text-slate-700 dark:text-white dark:hover:text-gray-300 transition-colors">
                Book This Service &rarr;
            </a>
        </div>
    );
};

const Services: React.FC = () => {
    const { ref, animationClasses } = useScrollAnimation<HTMLDivElement>();
    const [services, setServices] = useState<Service[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('./data/services.json')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data: Service[]) => {
                setServices(data);
                if (data.length > 0) {
                    setActiveCategory(data[0].category);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Could not fetch services:", error);
                setLoading(false);
            });
    }, []);

    const activeServiceData = services.find(s => s.category === activeCategory);

    return (
        <section id="services" className="py-24 bg-white dark:bg-gray-900">
            <div ref={ref} className={`container mx-auto px-6 transition-all duration-1000 ${animationClasses}`}>
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-playfair font-bold text-ink dark:text-white">Services & Pricing</h2>
                    <p className="mt-4 text-lg text-slate max-w-2xl mx-auto dark:text-gray-200">Find the perfect lash set to match your style and preference.</p>
                </div>
                
                {loading ? (
                    <div className="text-center text-slate dark:text-slate-400">Loading services...</div>
                ) : (
                    <>
                        <div className="flex justify-center flex-wrap gap-2 mb-12">
                            {services.map(cat => (
                                <button 
                                    key={cat.category} 
                                    onClick={() => setActiveCategory(cat.category)}
                                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${activeCategory === cat.category ? 'bg-ink text-white' : 'bg-white dark:bg-gray-800 text-slate dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                >
                                    {cat.category}
                                </button>
                            ))}
                        </div>

                        {activeServiceData && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {activeServiceData.items.map(item => (
                                    <ServiceCard key={item.name} service={item} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default Services;