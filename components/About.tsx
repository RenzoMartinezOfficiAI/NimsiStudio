import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const About: React.FC = () => {
    const { ref, animationClasses } = useScrollAnimation<HTMLDivElement>();

    const highlights = [
        { icon: '✨', title: 'Expert Experience', text: 'Over 3 years dedicated to the art of lash extensions.' },
        { icon: '🎨', title: 'Custom Designs', text: 'Every lash set is tailored to your unique eye shape and style.' },
        { icon: '🧼', title: 'Impeccable Cleanliness', text: 'Your health and safety are our top priority, always.' },
        { icon: '💖', title: 'Confidence Boost', text: 'Leave our studio feeling beautiful and empowered.' },
    ];

    return (
        <section id="about" className="py-24 bg-white dark:bg-ink">
            <div ref={ref} className={`container mx-auto px-6 transition-all duration-1000 ${animationClasses}`}>
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-playfair font-bold text-ink dark:text-white">Meet Your Lash Artist</h2>
                    <p className="mt-4 text-lg text-slate max-w-2xl mx-auto dark:text-gray-300">Passion, precision, and a personal touch.</p>
                </div>
                
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    <div className="lg:w-1/3">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                           <img src="https://i.postimg.cc/cHDPpkRS/image2.png" alt="Nimsi Martinez" className="w-full h-auto rounded-lg object-cover" />
                        </div>
                    </div>
                    <div className="lg:w-2/3">
                        <h3 className="text-3xl font-poppins font-bold text-ink dark:text-white">Nimsi Martinez</h3>
                        <p className="mt-4 text-slate leading-relaxed dark:text-gray-300">
                            My name is Nimsi Martinez, and I’m a professional lash artist with over three years of experience in the beauty industry. Lashing is more than just my career—it’s my passion. I truly love creating beautiful lash sets that enhance my clients’ natural beauty and boost their confidence. Every set I do is customized with care and attention to detail, ensuring each client leaves feeling their absolute best.
                        </p>
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {highlights.map(item => (
                                <div key={item.title} className="flex items-start gap-4">
                                    <div className="text-2xl">{item.icon}</div>
                                    <div>
                                        <h4 className="font-poppins font-semibold text-ink dark:text-gray-200">{item.title}</h4>
                                        <p className="text-sm text-slate dark:text-gray-400">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;