// // "use client";
// // import React, { useEffect, useState } from "react";
// // import { Card } from "antd";
// // import "antd/dist/reset.css";
// // import SearchBar from "./Search";
// // import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// // const { Meta } = Card;
// // const queryClient = new QueryClient();

// // type Movie = {
// //   Title: string;
// //   Year: string;
// //   imdbID: string;
// //   Type: string;
// //   Poster: string;
// // };

// // const Movieslist: React.FC = () => {
// //   const [movies, setMovies] = useState<Movie[]>([]);
// //   const [searchQuery, setSearchQuery] = useState<string>("");
// //   const [noMoviesFound, setNoMoviesFound] = useState<boolean>(false);

  

// //   useEffect(() => {
// //     if (searchQuery) {
// //       fetch(`https://www.omdbapi.com/?apikey=8bdf708a&s=${searchQuery}`)
// //         .then((response) => response.json())
// //         .then((data) => {
// //           if (data.Search) {
// //             setMovies(data.Search);
// //             setNoMoviesFound(false);
// //           } else {
// //             setMovies([]);
// //             setNoMoviesFound(true);
// //           }
// //         })
// //         .catch((error) => {
// //           console.error("Error fetching movies:", error);
// //           setMovies([]);
// //           setNoMoviesFound(true);
// //         });
// //     }
// //   }, [searchQuery]);

// //   const handleSearch = (value: string) => {
// //     setSearchQuery(value);
// //   };

// //   return (
// //     <div>
// //       <SearchBar onSearch={handleSearch} />
// //       {noMoviesFound ? (
// //         <div style={{ textAlign: "center", marginTop: "20px" }}>
// //           No movies found.
// //         </div>
// //       ) : (
// //         <div style={{ display: "flex", flexWrap: "wrap" }}>
// //           {movies.map((movie) => (
// //             <Card
// //               key={movie.imdbID}
// //               hoverable
// //               style={{ width: 240, margin: "10px" }}
// //               cover={
// //                 <img
// //                   alt={`${movie.Title} Poster`}
// //                   src={
// //                     movie.Poster !== "N/A"
// //                       ? movie.Poster
// //                       : "default-image-url.jpg"
// //                   }
// //                   style={{ width: "100%", height: "auto" }}
// //                 />
// //               }
// //             >
// //               <Meta title={movie.Title} description={movie.Year} />
// //             </Card>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Movieslist;
// import { useEffect, useState } from "react";
// import { Spin, Carousel, Card } from "antd";
// import { waitForDebugger } from "inspector";
// import { AudioOutlined } from "@ant-design/icons";
// import { Input, Space, Empty } from "antd";
// import type { GetProps } from "antd";
// import { useQuery } from "@tanstack/react-query";

// type SearchProps = GetProps<typeof Input.Search>;

// const { Search } = Input;
// const { Meta } = Card;
// const contentStyle: React.CSSProperties = {
//   margin: 0,
//   height: "160px",
//   color: "#fff",
//   lineHeight: "160px",
//   textAlign: "center",
//   background: "#364d79",
// };

// const DEFAULT_STATE = {
//   Search: [],
//   totalResults: 0,
//   Response: "",
// };

// type movieType = "movie" | "series" | "episode";
// type info = {
//   Search: Array<movie>;
//   totalResults: number;
//   Response: String;
// };
// type movie = {
//   Title: string;
//   Year: number;
//   imdbId: string;
//   Type: movieType;
//   Poster: string;
// };

// // function to fetch data
// function fetchMovies(searchTerm: string) {
//   return fetch(https://www.omdbapi.com/?apikey=8bdf708a&s=${searchTerm}).then(
//     (res) => {
//       return res.json();
//     }
//   );
// }

// export default function Movies() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const { isLoading, data } = useQuery({
//     queryKey: [movies-data-${searchTerm}],
//     staleTime: 1000 * 60,
//     queryFn: () => fetchMovies(searchTerm),
//   });

//   function renderMovies(empty?: boolean) {
//     if (data?.Response === "False" || empty) {
//       return <Empty />;
//     } else {
//       return data?.Search.map((movie: movie, index: number) => {
//         return (
//           <>
//             <Card
//               hoverable
//               style={{ width: 240 }}
//               cover={<img alt="example" src={movie.Poster} />}
//             >
//               <Meta title={movie.Title} description={movie.Year} />
//             </Card>
//             <br />
//           </>
//         );
//       });
//     }
//   }

//   return (
//     <>
//       <Search
//         placeholder="input search text"
//         allowClear
//         enterButton
//         size="large"
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <br />
//       {isLoading ? <Spin /> : renderMovies()}
//     </>
//   );
// }