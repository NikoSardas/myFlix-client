import React from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        {
          _id: 1,
          Title: "Inception",
          Description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
          ImagePath: "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/9c592dee1ac813fcaf8c93557a487557_675ff711-4f45-4a98-95a5-0f97302b2126_480x.progressive.jpg?v=1573618688",
        },
        {
          _id: 2,
          Title: "The Shawshank Redemption",
          Description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
          ImagePath: "https://m.media-amazon.com/images/I/71AzwgLT2WL._AC_SY679_.jpg",
        },
        {
          _id: 3,
          Title: "Gladiator",
          Description: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
          ImagePath: "https://m.media-amazon.com/images/I/71sj8Yt20qL._AC_SY679_.jpg",
        },
      ],
      selectedMovie: null,
    };
  }
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }
  render() {
    const { movies, selectedMovie } = this.state;
    if (movies.length === 0)
      return <div className="main-view">The list is empty!</div>;
    return (
      <div className="main-view">
        {selectedMovie ? (
          <MovieView
            movie={selectedMovie}
            onBackClick={(newSelectedMovie) => {
              this.setSelectedMovie(newSelectedMovie);
            }}
          />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(movie) => {
                this.setSelectedMovie(movie);
              }}
            />
          ))
        )}
      </div>
    );
  }
}

export default MainView;
