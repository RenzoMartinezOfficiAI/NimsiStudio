import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const allImages = [
    { src: 'https://i.imgur.com/d1Tlfih.jpeg', category: 'Classic' },
    { src: 'https://i.imgur.com/eqz5YqK.jpeg', category: 'Hybrid' },
    { src: 'https://i.imgur.com/JdFf2DM.jpeg', category: 'Hybrid' },
    { src: 'https://i.imgur.com/Y1Jg6YY.jpeg', category: 'Volume' },
    { src: 'https://i.imgur.com/ZSd6sqr.jpeg', category: 'Volume' },
    { src: 'https://i.imgur.com/0RuRdxb.jpeg', category: 'Wet' },
    { src: 'https://i.imgur.com/x2CPpdV.jpeg', category: 'Wet' },
    { src: 'https://i.imgur.com/xkCh5ju.jpeg', category: 'Mega' },
    { src: 'https://i.imgur.com/jaBLdFj.jpeg', category: 'Mega' },
];

const categories = ['All', 'Classic', 'Wet', 'Hybrid', 'Volume', 'Mega'];

const Gallery: React.FC = () => {
    const { ref, animationClasses } = useScrollAnimation<HTMLDivElement>();
    const [filter, setFilter] = useState('All');

    const filteredImages = filter === 'All' ? allImages : allImages.filter(img => img.category === filter);

    return (
        <section id="gallery" className="py-24 bg-gray-50 dark:bg-brand-black">
            <div ref={ref} className={`container mx-auto px-6 transition-all duration-1000 ${animationClasses}`}>
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-playfair font-bold text-ink dark:text-gold">Our Work</h2>
                    <p className="mt-4 text-lg text-slate max-w-2xl mx-auto dark:text-text-light">A showcase of our custom lash artistry.</p>
                </div>
                
                <div className="flex justify-center flex-wrap gap-2 mb-12">
                    {categories.map(cat => (
                        <button 
                            key={cat} 
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${filter === cat ? 'bg-pink-blush text-ink' : 'bg-white dark:bg-surface-black text-slate dark:text-text-light hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredImages.map((image, index) => (
                        <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg">
                            <img src={image.src} alt={`${image.category} lashes`} loading="lazy" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                             <div className="absolute bottom-4 left-4 bg-white/80 dark:bg-brand-black/80 text-ink dark:text-gold text-sm font-bold px-3 py-1 rounded-full">{image.category}</div>
                        </div>
                    ))}
                </div>
                 <div className="text-center mt-12">
                     <a href="https://www.instagram.com/lashesbynimsi" target="_blank" rel="noopener noreferrer" className="text-pink-blush hover:text-pink-hover dark:text-gold-hover dark:hover:text-gold font-semibold">
                         Follow on Instagram for more &rarr;
                     </a>
                 </div>
            </div>
        </section>
    );
};

export default Gallery;