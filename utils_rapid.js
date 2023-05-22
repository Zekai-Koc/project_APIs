import { API_KEYS } from "./api_keys.js";

const API_Key_RAPID = API_KEYS.Rapid;
const optionsRAPID = {
   method: "GET",
   headers: {
      "X-RapidAPI-Key": API_Key_RAPID,
      "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
   },
};
const baseUrlRAPID = `https://online-movie-database.p.rapidapi.com/auto-complete?q=`;

export async function moviesFromRAPID(searchTerm) {
   if (!searchTerm) return [];
   const url = baseUrlRAPID + searchTerm;
   try {
      const response = await fetch(url, optionsRAPID);
      const { d } = await response.json();
      const finalResults = d.map((item) => {
         const tempItem = {};
         tempItem.movieTitle = item.l;
         tempItem.moviePoster = item.i.imageUrl;
         tempItem.movieOverview = item.s;
         tempItem.movieRating = item.rank;
         tempItem.movieDate = item.y;
         return tempItem;
      });
      return finalResults;
   } catch (error) {
      throw new Error(
         `Something went wrong while fetching popular movies from RAPID! (Search Term: ${searchTerm})  \n ${error}`
      );
   }
}
