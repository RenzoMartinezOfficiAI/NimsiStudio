import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Contact: React.FC = () => {
    const { ref, animationClasses } = useScrollAnimation<HTMLDivElement>();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        window.location.href = `mailto:booking@NimsiStudio.com?subject=Message from ${name} (${email})&body=${message}`;
    };

    return (
        <section id="contact" className="py-24 bg-gray-50 dark:bg-brand-black">
            <div ref={ref} className={`container mx-auto px-6 transition-all duration-1000 ${animationClasses}`}>
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-playfair font-bold text-ink dark:text-gold">Get In Touch</h2>
                    <p className="mt-4 text-lg text-slate max-w-2xl mx-auto dark:text-text-light">Have questions? We're here to help.</p>
                </div>
                
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="lg:w-1/2">
                         <h3 className="font-poppins text-2xl font-bold text-ink dark:text-gold mb-6">Contact Information</h3>
                         <div className="space-y-4 text-slate dark:text-text-light">
                            <p><strong>Location:</strong> Woodburn, OR</p>
                            <p><strong>Email:</strong> <a href="mailto:booking@NimsiStudio.com" className="text-pink-blush hover:underline dark:text-gold dark:hover:text-gold-hover">booking@NimsiStudio.com</a></p>
                            <p><strong>Phone:</strong> <a href="tel:971-446-1626" className="text-pink-blush hover:underline dark:text-gold dark:hover:text-gold-hover">971-446-1626</a></p>
                            <p><strong>Instagram:</strong> <a href="https://www.instagram.com/lashesbynimsi" target="_blank" rel="noopener noreferrer" className="text-pink-blush hover:underline dark:text-gold dark:hover:text-gold-hover">@lashesbynimsi</a></p>
                         </div>
                         <div className="mt-8">
                           <iframe 
                             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d89859.5424687856!2d-122.9370129882202!3d45.14881669466851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54956614352136d3%3A0x4d37c95a28b2401d!2sWoodburn%2C%20OR!5e0!3m2!1sen!2sus!4v1672532422879!5m2!1sen!2sus" 
                             width="100%" 
                             height="250" 
                             style={{border:0}} 
                             allowFullScreen={true}
                             loading="lazy" 
                             referrerPolicy="no-referrer-when-downgrade"
                             className="rounded-lg shadow-md"
                           ></iframe>
                         </div>
                    </div>
                    <div className="lg:w-1/2 bg-white dark:bg-surface-black p-8 rounded-lg shadow-lg">
                        <h3 className="font-poppins text-2xl font-bold text-ink dark:text-gold mb-6">Send a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate dark:text-text-light">Name</label>
                                <input type="text" name="name" id="name" required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-brand-black border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-gold focus:border-gold" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate dark:text-text-light">Email</label>
                                <input type="email" name="email" id="email" required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-brand-black border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-gold focus:border-gold" />
                            </div>
                             <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate dark:text-text-light">Message</label>
                                <textarea name="message" id="message" rows={4} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-brand-black border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-gold focus:border-gold"></textarea>
                            </div>
                            <div>
                                <button type="submit" className="w-full bg-pink-blush text-ink font-poppins font-semibold py-3 px-4 rounded-lg hover:bg-pink-hover transition-colors duration-200">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;