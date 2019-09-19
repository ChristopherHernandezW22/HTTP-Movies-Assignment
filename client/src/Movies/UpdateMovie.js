import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateMovie = (props) => {
    console.log(props);
    const [movie, setMovie] = useState(null);

    const fetchMovie = id => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => setMovie(res.data))
            .catch(err => console.log(err.response));
    };

    useEffect(() => {
        fetchMovie(props.match.params.id)
    }, [props.match.params.id]);

    const handleChange = event => setMovie({...movie, 
                                            [event.target.name]:
                                            event.target.value});

    const handleStars = index => event => {
        setMovie({...movie, stars: movie.stars.map((star, starIndex) => {
            return starIndex === index ? event.target.value: star;
        })});
    };

    const handleSubmit = event => {
        event.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => {
            console.log(res);
            props.history.push('/');
        })
        .catch(err => console.log(err.response));
    };

    if (!movie) {
        return <div>Loading...</div>
    }

    return (
        <form onSubmit={handleSubmit}>
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
                                key={index}
                                onChange={handleStars(index)} />
            })}
            <button type="submit">Update</button>
        </form>
    );
}

export default UpdateMovie;