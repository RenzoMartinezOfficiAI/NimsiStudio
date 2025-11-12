import React from 'react';

/**
 * A visual separator component that displays a parallax background image.
 * This is used between main sections to create a dynamic scrolling effect.
 */
const SectionSeparator: React.FC = () => {
    return (
        <div 
            className="h-40 md:h-56 bg-cover bg-center bg-fixed" 
            style={{ backgroundImage: "url('https://i.postimg.cc/9MtWR3sp/Untitled-design-4.png')" }}
            role="presentation" // Decorative element
        >
            {/* Overlay to maintain theme consistency and text readability on adjacent sections */}
            <div className="h-full w-full bg-white/70 dark:bg-ink/70"></div>
        </div>
    );
};

export default SectionSeparator;