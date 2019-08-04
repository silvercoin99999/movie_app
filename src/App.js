import React, {Component} from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component {

  state = {}

  componentDidMount(){
    this._getMocies();
  }

  _renderMovies = () => {
    const movies = this.state.movies.map((movie) => {
      console.log( movie )
      return <Movie
        key={movie.id}
        title={movie.title_english}
        poster={movie.medium_cover_image}
        genres={movie.genres}
        synopsis={movie.synopsis}
      />
    })
    return movies
  }

  _getMocies = async() => {
    const movies = await this._callApi()
    this.setState({
      movies
    })
  }

  _callApi = () => {
    return fetch('https://yts.lt/api/v2/list_movies.json?sort_by=download_count')
    .then(potato => potato.json() )
    .then(json => json.data.movies )
    .catch( err => console.log(err) )
  }

  render () {
    const {movies} = this.state;
    return (
      <div className={movies ? "App" : "app--loading"}>
        {this.state.movies ? this._renderMovies() : 'Loading'}
      </div>
    );
  }
}

export default App;
