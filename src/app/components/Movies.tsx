"use client";
import React, { useEffect, useState } from "react";
import { Card, Carousel } from "antd";
import 'antd/dist/reset.css';

const { Meta } = Card;

type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

const Movieslist: React.FC = () => {
    const [movies, setMovies] = React.useState<Movie[]>([]);
  
    React.useEffect(() => {
      fetch('https://www.omdbapi.com/?apikey=8bdf708a&s=hangover')
        .then((response) => response.json())
        .then((data) => {
          if (data.Search) {
            setMovies(data.Search);
          }
        });
    }, []);
    return (
        <div>
          {movies.map((movie) => (
            <Card
              key={movie.imdbID} // Ensure each Card has a unique key
              hoverable
              style={{ width: 240, margin: '10px' }} // Add margin to space out the cards
              cover={
                <img
                  alt={`${movie.Title} Poster`}
                  src={movie.Poster !== 'N/A' ? movie.Poster : 'default-image-url.jpg'}
                  style={{ width: '100%', height: 'auto' }} // Adjust the image to fill the Card's width
                />
              }
            >
              <Meta title={movie.Title} description={movie.Year} />
            </Card>
          ))}
        </div>
      );
    };

export default Movieslist;
