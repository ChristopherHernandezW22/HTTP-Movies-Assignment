import React, { useState, useEffect } from 'react';

const UpdateMovie = (props) => {
    const [movie, setMovie] = useState({title: "",
                                        director: "",
                                        metascore: "",
                                        stars: []
                                        });
    const handleChange = event => setMovie({...movie, 
                                            [event.target.name]:
                                            event.target.value});

    const handleStars = index => event => {
        setMovie({...movie, stars: movie.stars.map((star, starIndex) => {
            return starIndex === index ? event.target.value: star;
        })});
    };

    return (
        <form>
            <input type="text"
                    name="title"
                    placeholder="title"
                    value={movie.title}
                    onChange={handleChange} />
            <input type="text"
                    name="director"
                    placeholder="director"
                    value={movie.director}
                    onChange={handleChange} />
            <input type="text"
                    name="metascore"
                    placeholder="metascore"
                    value={movie.metascore}
                    onChange={handleChange} />
            {movie.stars.map((actor, index) => {
                return <input type="text"
                                name="stars"
                                placeholder="stars"
                                value={actor}
                                onChange={handleStars(index)} />
            })}
        </form>
    );
}

export default UpdateMovie;