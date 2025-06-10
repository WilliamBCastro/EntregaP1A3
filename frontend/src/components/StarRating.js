import React, { useState } from 'react';

const StarRating = ({ rating, setRating }) => {
    const [hover, setHover] = useState(0);

    return (
        <div className="star-rating">
            {/* A única alteração é aqui: mudamos de 5 para 10 estrelas */}
            {[...Array(10)].map((star, index) => {
                const ratingValue = index + 1;

                return (
                    <button
                        type="button"
                        key={ratingValue}
                        className={ratingValue <= (hover || rating) ? "star on" : "star off"}
                        onClick={() => setRating(ratingValue)}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                    >
                        &#9733; {/* Caractere de estrela (★) */}
                    </button>
                );
            })}
        </div>
    );
};

export default StarRating;
