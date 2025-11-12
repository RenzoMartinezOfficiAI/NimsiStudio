import React, { useState, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Review } from '../types';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    return (
        <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-5 h-5 ${i < rating ? 'fill-current' : 'text-gray-300 dark:text-gray-600'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            ))}
        </div>
    );
};

const Reviews: React.FC = () => {
    const { ref, animationClasses } = useScrollAnimation<HTMLDivElement>();
    const TYPEFORM_URL = process.env.TYPEFORM_REVIEW_URL || 'https://your-typeform-url.com';
    const INSTAGRAM_URL = process.env.INSTAGRAM_DM_URL || 'https://www.instagram.com/direct/t/lashesbynimsi';
    
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('./data/reviews.json')
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then((data: Review[]) => {
                setReviews(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Could not fetch reviews:", error);
                setLoading(false);
            });
    }, []);
    
    const averageRating = reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : '0';

    return (
        <section id="reviews" className="py-24 bg-white dark:bg-gray-900">
            <div ref={ref} className={`container mx-auto px-6 transition-all duration-1000 ${animationClasses}`}>
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-playfair font-bold text-ink dark:text-white">What Our Clients Say</h2>
                    <div className="mt-4 flex justify-center items-center gap-2 h-6">
                        {loading ? (
                             <p className="text-slate dark:text-slate-400 font-semibold">Loading reviews...</p>
                        ) : (
                            <>
                                <StarRating rating={Math.round(parseFloat(averageRating))} />
                                <p className="text-slate dark:text-slate-400 font-semibold">{averageRating} average rating from {reviews.length} reviews.</p>
                            </>
                        )}
                    </div>
                </div>

                {loading ? (
                    <div className="text-center text-slate dark:text-slate-400">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {reviews.map((review, index) => (
                            <div key={index} className="bg-gray-50 dark:bg-ink p-8 rounded-lg shadow-sm">
                                <div className="flex items-center mb-4">
                                    <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full mr-4 object-cover" />
                                    <div>
                                        <h4 className="font-poppins font-semibold text-ink dark:text-slate-200">{review.name}</h4>
                                        <StarRating rating={review.rating} />
                                    </div>
                                </div>
                                <p className="text-slate dark:text-slate-400 italic">"{review.text}"</p>
                            </div>
                        ))}
                    </div>
                )}
                
                <div className="mt-16 text-center flex flex-col sm:flex-row justify-center items-center gap-4">
                    <a href={TYPEFORM_URL} target="_blank" rel="noopener noreferrer" className="bg-ink text-white dark:bg-white dark:text-ink font-poppins font-semibold py-3 px-8 rounded-lg hover:bg-slate-800 dark:hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">
                        Leave a Review
                    </a>
                    <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="border-2 border-ink text-ink dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-ink font-poppins font-semibold py-3 px-8 rounded-lg hover:bg-ink hover:text-white transition-colors duration-300">
                        DM on Instagram
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Reviews;