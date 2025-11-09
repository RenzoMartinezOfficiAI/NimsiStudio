
import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const allImages = [
    { src: 'https://picsum.photos/seed/lash1/500/700', category: 'Classic' },
    { src: 'https://picsum.photos/seed/lash2/500/700', category: 'Hybrid' },
    { src: 'https://picsum.photos/seed/lash3/500/700', category: 'Volume' },
    { src: 'https://picsum.photos/seed/lash4/500/700', category: 'Wet' },
    { src: 'https://picsum.photos/seed/lash5/500/700', category: 'Mega' },
    { src: 'https://picsum.photos/seed/lash6/500/700', category: 'Hybrid' },
    { src: 'https://picsum.photos/seed/lash7/500/700', category: 'Classic' },
    { src: 'https://picsum.photos/seed/lash8/500/700', category: 'Volume' },
    { src: 'https://picsum.photos/seed/lash9/500/700', category: 'Mega' },
];

const categories = ['All', 'Classic', 'Wet', 'Hybrid', 'Volume', 'Mega'];

const Gallery: React.FC = () => {
    const { ref, animationClasses } = useScrollAnimation<HTMLDivElement>();
    const [filter, setFilter] = useState('All');

    const filteredImages = filter === 'All' ? allImages : allImages.filter(img => img.category === filter);

    return (
        <section id="gallery" className="py-24 bg-gray-50 dark:bg-gray-900">
            <div ref={ref} className={`container mx-auto px-6 transition-all duration-1000 ${animationClasses}`}>
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-playfair font-bold text-ink dark:text-white">Our Work</h2>
                    <p className="mt-4 text-lg text-slate max-w-2xl mx-auto">A showcase of our custom lash artistry.</p>
                </div>
                
                <div className="flex justify-center flex-wrap gap-2 mb-12">
                    {categories.map(cat => (
                        <button 
                            key={cat} 
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${filter === cat ? 'bg-pink-blush text-ink' : 'bg-white dark:bg-gray-800 text-slate dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
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
                             <div className="absolute bottom-4 left-4 bg-white/80 dark:bg-ink/80 text-ink dark:text-white text-sm font-bold px-3 py-1 rounded-full">{image.category}</div>
                        </div>
                    ))}
                </div>
                 <div className="text-center mt-12">
                     <a href="https://www.instagram.com/lashesbynimsi" target="_blank" rel="noopener noreferrer" className="text-pink-blush hover:text-pink-hover font-semibold">
                         Follow on Instagram for more &rarr;
                     </a>
                 </div>
            </div>
        </section>
    );
};

export default Gallery;
