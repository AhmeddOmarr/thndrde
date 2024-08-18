"use client";
import React, { useEffect, useState } from "react";
import { Card } from "antd";
import 'antd/dist/reset.css';
import SearchBar from "./Search";

const { Meta } = Card;

type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

const Movieslist: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (searchQuery) {
      fetch(`https://www.omdbapi.com/?apikey=8bdf708a&s=${searchQuery}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.Search) {
            setMovies(data.Search);
          }
        })
        .catch((error) => console.error("Error fetching movies:", error));
    }
  }, [searchQuery]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {movies.map((movie) => (
          <Card
            key={movie.imdbID}
            hoverable
            style={{ width: 240, margin: '10px' }}
            cover={
              <img
                alt={`${movie.Title} Poster`}
                src={movie.Poster !== 'N/A' ? movie.Poster : 'default-image-url.jpg'}
                style={{ width: '100%', height: 'auto' }}
              />
            }
          >
            <Meta title={movie.Title} description={movie.Year} />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Movieslist;
