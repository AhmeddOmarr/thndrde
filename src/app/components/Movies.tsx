"use client";
import React, { useState, useRef, useCallback } from "react";
import { Card } from "antd";
import "antd/dist/reset.css";
import SearchBar from "./Search";
import { useInfiniteQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";

const { Meta } = Card;
const queryClient = new QueryClient();

type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

type FetchMoviesResponse = {
  Search: Movie[];
  totalResults: string;
  Error?: string; // Optional error field
};

const fetchMovies = async ({ queryKey, pageParam = 1 }: { queryKey: [string, string]; pageParam?: number }): Promise<Movie[]> => {
  const [, searchQuery] = queryKey;
  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=8bdf708a&s=${searchQuery}&page=${pageParam}`);
    const data: FetchMoviesResponse = await response.json();
    if (data.Error) {
      throw new Error(data.Error);
    }
    return data.Search || []; // Ensure that the returned value is always an array
  } catch (error) {
    console.error("Error fetching movies:", error);
    return []; // Return an empty array on error
  }
};

const Movieslist: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    data,
    fetchNextPage,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["movies", searchQuery],
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) => fetchMovies({ queryKey: ["movies", searchQuery], pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      if (Array.isArray(lastPage) && lastPage.length === 10) {
        return allPages.length + 1; // Return the next page number
      }
      return undefined; // No more pages
    },
    initialPageParam: 1,
    enabled: !!searchQuery,
    staleTime: 15000, // Cache data for 15 seconds
  });

  const movies = data?.pages.flat() || []; // Default to an empty array if data is undefined

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const observer = useRef<IntersectionObserver | null>(null);

  const lastMovieElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

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
        {movies.map((movie, index) => (
          <div
            key={movie.imdbID}
            ref={index === movies.length - 1 ? lastMovieElementRef : undefined}
          >
            <Card
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
          </div>
        ))}
        {isFetchingNextPage && <div>Loading more...</div>}
      </div>
    </div>
  );
};

// Set displayName for Movieslist
Movieslist.displayName = "Movieslist";

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <Movieslist />
  </QueryClientProvider>
);

// Set displayName for App
App.displayName = "App";

export default App;
