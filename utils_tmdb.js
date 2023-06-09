import { API_KEYS } from "./api_keys.js";
import { renderModalForm } from "./modal_form.js";

const API_Key_TMDB = "api_key=" + API_KEYS.TMDB;

const baseUrlTMDB = `https://api.themoviedb.org/3/`;
const discoverTMDB = `discover/movie?`;
const discoverUrlTMDB = baseUrlTMDB + discoverTMDB + API_Key_TMDB;

const baseImgUrlTMDB = "https://image.tmdb.org/t/p/w500";
const searchUrlTMDB = `${baseUrlTMDB}search/movie?${API_Key_TMDB}&query=`;

export async function moviesFromTMDB(searchTerm = "alone") {
   const url =
      searchTerm === "discover_mode"
         ? discoverUrlTMDB
         : searchUrlTMDB + searchTerm;

   try {
      const response = await fetch(url);
      const { results } = await response.json();
      const finalResults = results.map((item) => {
         const tempItem = {};
         tempItem.movieTitle = item.title;
         tempItem.moviePoster = item.poster_path
            ? baseImgUrlTMDB + item.poster_path
            : "./images/default_movie_poster.jpg";
         tempItem.movieOverview = item.overview;
         tempItem.movieRating = item.vote_average;
         tempItem.movieDate = item.release_date;
         return tempItem;
      });
      return finalResults;
   } catch (error) {
      const msg = `Something went wrong while fetching popular movies from ${url.slice(
         0,
         35
      )}... The server may be busy or there would be a connection problem. Please check your Internet connection and try again.`;
      renderModalForm(createErrorObject(msg));
      throw new Error(
         `Something went wrong while fetching popular movies from TMDB! Please check your Internet connection. ${error}`
      );
   }
}

function createErrorObject(errorMessage) {
   return {
      form: {
         border: "10px solid orange",
         borderRadius: "100px",
         padding: "50px",
      },
      header: "!!! ERROR !!!",
      image: {
         display: "none",
         source: "",
      },
      title: "Empty Movie List",
      year: "",
      rating: "",
      genre: "",
      director: "",
      overviewHeader: "",
      overview: `${errorMessage}`,
   };
}
