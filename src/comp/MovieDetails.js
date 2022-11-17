import React from "react";
import Hero from "./Hero";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import imageNotFound from "./imageNotFound.jpg";

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const posterPath = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;
  const backdropURL = `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`;

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=4385874cb88ca729fd9807e46ee98179&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          setMovieDetails(data);
          setIsLoading(false);
        }, 200);
      });
  }, [id]);

  function posterLoaded() {
    if (movieDetails.poster_path === null) {
      return (
        <img
          src={imageNotFound}
          className="img-fluid shadow rounded"
          alt={movieDetails.original_title}
        />
      );
    } else {
      return (
        <img
          src={posterPath}
          className="img-fluid shadow rounded"
          alt={movieDetails.original_title}
        />
      );
    }
  }

  function renderMovieDetails() {
    if (isLoading) {
      return <Hero text="Loading Info..." />;
    }
    if (MovieDetails) {
      return (
        <>
          <Hero text={movieDetails.original_title} backdrop={backdropURL} />
          <div className="container my-5">
            <div className="row">
              <div className="col-md-3">
                <img
                  src={posterLoaded()} // Change this to posterPath if posterLoaded() is not running.
                  alt={movieDetails.original_title}
                  className="img-fluid shadow rounded"
                />
              </div>
              <div className="col-md-9">
                <h2>{movieDetails.original_title}</h2>
                <p className="lead">{movieDetails.overview}</p>
                <hr />
                <p>
                  Release Date: <strong>{movieDetails.release_date}</strong>{" "}
                  <br />
                  IMDB Popularity: <strong>
                    {movieDetails.popularity}
                  </strong>{" "}
                  <br />
                  Length: <strong>{movieDetails.runtime} mins</strong> <br />
                  Audience Rating: <strong>
                    {movieDetails.vote_average}
                  </strong>{" "}
                  <br />
                  Votes: <strong>{movieDetails.vote_count}</strong>
                </p>
              </div>
            </div>
          </div>
        </>
      );
    }
  }
  return renderMovieDetails();
};

export default MovieDetails;
