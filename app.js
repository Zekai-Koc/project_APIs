import { moviesFromTMDB } from "./utils_tmdb.js";
import { moviesFromRAPID } from "./utils_rapid.js";
import { renderModalForm } from "./modal_form.js";
import { getWeatherData } from "./utils_weather.js";

const submitButton = document.getElementById("submit-button");
const searchMovieInput = document.getElementById("search-movie-input");
const radioButtons = document.querySelectorAll('input[name="radio-api"]');
const formHeaderSearch = document.getElementById("form-header-search");
let tmdbSelected = true;

window.addEventListener("load", main());

async function main() {
   for (const radioButton of radioButtons)
      radioButton.addEventListener("change", changeAPI);

   renderMovies(await moviesFromTMDB("discover_mode"));

   getWeatherData();
}

async function getMovies(searchTerm) {
   return tmdbSelected
      ? await moviesFromTMDB(searchTerm)
      : await moviesFromRAPID(searchTerm);
}

submitButton.addEventListener("click", async (e) => {
   e.preventDefault();
   renderMovies(await getMovies(searchMovieInput.value));
   searchMovieInput.value = "";
});

// Why following form submit event does not triggered?
// console.log("formHeaderSearch: ", formHeaderSearch);
formHeaderSearch.addEventListener("submit", () => {
   console.log("form submit event triggered...");
});

async function renderMovies(movieList) {
   try {
      const mainSection = document.getElementById("main");
      if (movieList.length > 0) {
         mainSection.innerHTML = ``;
         movieList.forEach((element) => {
            const movieDiv = document.createElement("div");
            movieDiv.classList.add("movie");

            const moviePoster = document.createElement("img");
            moviePoster.src = element.moviePoster;
            moviePoster.alt = element.movieTitle;
            movieDiv.appendChild(moviePoster);

            const movieInfo = document.createElement("div");
            movieInfo.classList.add("movie-info");
            const movieInfoH2 = document.createElement("h2");
            movieInfoH2.textContent = element.movieTitle;
            movieInfo.appendChild(movieInfoH2);

            const movieInfoSpan = document.createElement("span");
            movieInfoSpan.textContent = element.movieRating;

            movieInfoSpan.style.position = "absolute";
            movieInfoSpan.style.right = "10px";
            movieInfoSpan.style.top = "10px";

            movieInfo.appendChild(movieInfoSpan);

            const movieDate = document.createElement("p");
            movieDate.textContent = element.movieDate;
            movieInfo.appendChild(movieDate);

            movieDiv.appendChild(movieInfo);

            const articleData = document.createElement("article");
            articleData.dataset.overview = element.movieOverview;
            articleData.dataset.movieDate = element.movieDate;
            movieDiv.appendChild(articleData);

            movieDiv.addEventListener("click", (e) => {
               if (e.target.tagName === "IMG")
                  renderModalForm(createInfoObject(e));
            });

            movieDiv.addEventListener("mouseenter", (e) => {
               e.target.children[1].style.display = "flex";
            });

            movieDiv.addEventListener("mouseleave", (e) => {
               e.target.children[1].style.display = "none";
            });

            mainSection.appendChild(movieDiv);
         });
      } else {
         throw new Error(
            `We couldn't find any movie matching " ${searchMovieInput.value} " !
            Please try with another search term in the Search Movie section.`
         );
      }
   } catch (error) {
      renderModalForm(createErrorObject(error.message));
   }
}

async function changeAPI(e) {
   tmdbSelected = this.value === "tmdb";
   renderMovies(await getMovies(searchMovieInput.value));
}

function createInfoObject(e) {
   return {
      form: {
         border: "5px solid white",
         borderRadius: "10px",
         padding: "20px",
      },
      header: "Movie Details",
      image: {
         display: "block",
         source: e.target.parentNode.children[0].src,
      },
      title: e.target.parentNode.children[1].firstElementChild.innerHTML,

      year: e.target.parentNode.children[2].getAttribute("data-movie-date"),

      rating: e.target.parentNode.children[1].children[1].innerHTML,
      genre: "",
      director: "",
      overviewHeader: "",
      overview: e.target.parentNode.children[2].getAttribute("data-overview"),
   };
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
      title: "",
      year: "",
      rating: "",
      genre: "",
      director: "",
      overviewHeader: "",
      overview: `${errorMessage}`,
   };
}
