
import React, { useState, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Service } from '../types';

const ServiceCard: React.FC<{ service: { name: string; price: number; popular?: boolean } }> = ({ service }) => {
    return (
        <div className="relative bg-white dark:bg-ink-light p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            {service.popular && <div className="absolute top-0 right-4 -mt-3 bg-pink-blush text-ink text-xs font-bold px-3 py-1 rounded-full dark:bg-gold dark:text-ink">Most Popular</div>}
            <div className="flex justify-between items-baseline">
                <h4 className="font-poppins text-lg font-semibold text-ink dark:text-gold">{service.name}</h4>
                <p className="text-xl font-bold text-pink-blush dark:text-gold-light">${service.price}</p>
            </div>
             <a href={process.env.BOOKING_PROVIDER_URL || '#'} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-semibold text-pink-blush hover:text-pink-hover transition-colors dark:text-gold dark:hover:text-gold-light">
                Book This Service &rarr;
            </a>
        </div>
    );
};

const Services: React.FC = () => {
    const { ref, animationClasses } = useScrollAnimation<HTMLDivElement>();
    const [services, setServices] = useState<Service[]>([]);
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
                setLoading(false);
            })
            .catch(error => {
                console.error("Could not fetch services:", error);
                setLoading(false);
            });
    }, []);

    return (
        <section id="services" className="py-24 bg-white dark:bg-transparent">
            <div ref={ref} className={`container mx-auto px-6 transition-all duration-1000 ${animationClasses}`}>
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-playfair font-bold text-ink dark:text-gold-light">Services & Pricing</h2>
                    <p className="mt-4 text-lg text-slate max-w-2xl mx-auto">Find the perfect lash set to match your style and preference.</p>
                </div>
                
                {loading ? (
                    <div className="text-center text-slate dark:text-gray-400">Loading services...</div>
                ) : (
                    <div className="space-y-16">
                        {services.map(category => (
                            <div key={category.category}>
                                <h3 className="text-2xl font-poppins font-bold text-ink dark:text-gold mb-8 text-center md:text-left">{category.category}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {category.items.map(item => (
                                        <ServiceCard key={item.name} service={item} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Services;