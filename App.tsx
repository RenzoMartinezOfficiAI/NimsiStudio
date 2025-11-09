
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Policies from './components/Policies';
import Checklist from './components/Checklist';
import Aftercare from './components/Aftercare';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIFeatures from './components/AIFeatures';

const App: React.FC = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const BOOKING_URL = process.env.BOOKING_PROVIDER_URL || 'https://app.acuityscheduling.com/schedule/b1c76505';

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleThemeSwitch = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className="relative overflow-x-hidden">
            <Header onThemeSwitch={handleThemeSwitch} currentTheme={theme} />
            <main>
                <Hero />
                <About />
                <Services />
                <Policies />
                <Checklist />
                <Aftercare />
                <AIFeatures />
                <Gallery />
                <Reviews />
                <Contact />
            </main>
            <Footer />
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 z-50 bg-pink-blush text-ink font-poppins font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-pink-hover transition-transform duration-200 hover:scale-105">
                Book Now
            </a>
        </div>
    );
};

export default App;
