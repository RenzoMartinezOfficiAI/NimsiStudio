import React, { useRef, useEffect } from 'react';
import SimplexNoise from '../utils/simplex-noise';

interface FlowingBackgroundProps {
    theme: string;
}

const FlowingBackground: React.FC<FlowingBackgroundProps> = ({ theme }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (theme !== 'light') {
            const canvas = canvasRef.current;
            if (canvas) {
                const context = canvas.getContext('2d');
                context?.clearRect(0, 0, canvas.width, canvas.height);
            }
            return;
        }

        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const context = canvas.getContext('2d');
        if (!context) return;
        
        const simplex = new SimplexNoise();
        let animationFrameId: number;
        let time = 0;

        const resize = () => {
            canvas.width = window.innerWidth * window.devicePixelRatio;
            canvas.height = window.innerHeight * window.devicePixelRatio;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            context.scale(window.devicePixelRatio, window.devicePixelRatio);
        };

        const render = () => {
            time += 0.0015;
            context.clearRect(0, 0, canvas.width, canvas.height);
            
            const lines = 25;
            const segments = 80;
            const amplitude = window.innerHeight * 0.15;

            for (let i = 0; i < lines; i++) {
                context.beginPath();
                context.moveTo(-50, window.innerHeight / 2);

                for (let j = 0; j <= segments; j++) {
                    const x = (j / segments) * (window.innerWidth + 100) - 50;
                    const y = (window.innerHeight / 2) + simplex.noise3D(x * 0.001, i * 0.04, time) * amplitude;
                    context.lineTo(x, y);
                }

                // Layer 1: Soft broad stroke
                context.lineWidth = 80;
                context.strokeStyle = 'rgba(245, 245, 250, 0.03)';
                context.stroke();

                // Layer 2: Core line
                context.lineWidth = 40;
                context.strokeStyle = 'rgba(250, 250, 255, 0.04)';
                context.stroke();

                // Layer 3: Highlight
                context.lineWidth = 1;
                context.strokeStyle = 'rgba(255, 255, 255, 0.1)';
                context.stroke();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        window.addEventListener('resize', resize);
        resize();
        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
        };
    }, [theme]);

    if (theme !== 'light') return null;

    return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, width: '100vw', height: '100vh', pointerEvents: 'none' }} />;
};

export default FlowingBackground;
