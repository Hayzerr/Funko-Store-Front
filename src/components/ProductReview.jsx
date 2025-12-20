import React, { useState } from 'react';

// ⚠️ VULNERABILITY: Cross-Site Scripting (XSS) - FOR EDUCATIONAL PURPOSES ONLY
// This component is intentionally vulnerable for security testing demonstration

const ProductReview = ({ productId }) => {
    const [reviews, setReviews] = useState([
        {
            id: 1,
            username: 'John Doe',
            text: 'Great product! Highly recommend.',
            date: '2024-12-15',
            rating: 5
        },
        {
            id: 2,
            username: 'Jane Smith',
            text: 'Good quality, fast shipping.',
            date: '2024-12-18',
            rating: 4
        }
    ]);
    const [reviewText, setReviewText] = useState('');
    const [username, setUsername] = useState('');
    const [rating, setRating] = useState(5);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newReview = {
            id: Date.now(),
            username: username,
            text: reviewText,
            date: new Date().toLocaleDateString(),
            rating: rating
        };

        setReviews([newReview, ...reviews]);
        setReviewText('');
        setUsername('');
        setRating(5);
    };

    return (
        <div className="product-reviews max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">Customer Reviews</h2>

            {/* Submit Review Form */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Name
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Rating
                        </label>
                        <select
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                        >
                            <option value={5}>5 Stars - Excellent</option>
                            <option value={4}>4 Stars - Good</option>
                            <option value={3}>3 Stars - Average</option>
                            <option value={2}>2 Stars - Poor</option>
                            <option value={1}>1 Star - Terrible</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Review
                        </label>
                        <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Write your review here... (HTML is supported)"
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                            rows="4"
                            required
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            ⚠️ Note: This form accepts HTML for demonstration purposes
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
                    >
                        Submit Review
                    </button>
                </form>
            </div>

            {/* Display Reviews - VULNERABLE TO XSS */}
            <div className="reviews-list space-y-4">
                <h3 className="text-2xl font-semibold mb-4">All Reviews ({reviews.length})</h3>

                {reviews.length === 0 ? (
                    <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                ) : (
                    reviews.map(review => (
                        <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    {/* VULNERABILITY: Rendering username without sanitization */}
                                    <div
                                        className="font-bold text-lg"
                                        dangerouslySetInnerHTML={{ __html: review.username }}
                                    />
                                    <div className="text-sm text-gray-500">{review.date}</div>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-yellow-500 mr-1">★</span>
                                    <span className="font-semibold">{review.rating}/5</span>
                                </div>
                            </div>

                            {/* VULNERABILITY: Rendering review text without sanitization */}
                            {/* This allows XSS attacks through script injection */}
                            <div
                                className="mt-3 text-gray-700"
                                dangerouslySetInnerHTML={{ __html: review.text }}
                            />

                            <div className="mt-4 text-xs text-gray-400">
                                Review ID: {review.id}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Warning Banner */}
            <div className="mt-8 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                            <strong>⚠️ Security Warning:</strong> This component contains an intentional XSS vulnerability for educational purposes.
                            User input is rendered without sanitization using <code>dangerouslySetInnerHTML</code>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductReview;
