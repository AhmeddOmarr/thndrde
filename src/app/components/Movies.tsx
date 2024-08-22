"use client";
import React, { useState } from "react";
import { Card } from "antd";
import "antd/dist/reset.css";
import SearchBar from "./Search";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";

const { Meta } = Card;
const queryClient = new QueryClient();

type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

const fetchMovies = async (searchQuery: string): Promise<Movie[]> => {
  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=8bdf708a&s=${searchQuery}`);
    const data = await response.json();
    if (data.Error) {
      throw new Error(data.Error);
    }
    return data.Search || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

const Movieslist: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data = [], isLoading, isError } = useQuery<Movie[]>({
    queryKey: ["movies", searchQuery],
    queryFn: () => fetchMovies(searchQuery),
    enabled: !!searchQuery,
  });

  const movies = data as Movie[];

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || (movies.length === 0 && searchQuery)) {
    return <div style={{ textAlign: 'center', marginTop: '20px' }}>No movies found.</div>;
  }

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
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/240x360?text=No+Image'}
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

Movieslist.displayName = "Movieslist";

export default () => {
  const Films: React.FC = () => (
    <QueryClientProvider client={queryClient}>
      <Movieslist />
    </QueryClientProvider>
  );

  Films.displayName = "Films";

  return <Films />;
};
