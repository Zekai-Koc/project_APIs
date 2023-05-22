/* -------------------------------------------------------- */
/*                         Modal Section                    */
/* -------------------------------------------------------- */
const modalFormMovieDetails = document.getElementById(
   "modal-form-movie-details"
);

document
   .getElementById("span-close-modal-form")
   .addEventListener(
      "click",
      () => (modalFormMovieDetails.style.display = "none")
   );

document
   .getElementById("button-close-modal-form")
   .addEventListener(
      "click",
      () => (modalFormMovieDetails.style.display = "none")
   );

export function renderModalForm(input) {
   modalFormMovieDetails.style.display = "block";
   modalFormMovieDetails.style.border = input.form.border;
   modalFormMovieDetails.style.borderRadius = input.form.borderRadius;
   modalFormMovieDetails.style.padding = input.form.padding;

   document.getElementById("details-header-h2").textContent = input.header;
   document.getElementById("details-movie-image").style.display =
      input.image.display;
   document.getElementById("details-movie-image").src = input.image.source;
   document.getElementById("details-title").textContent = input.title;
   document.getElementById("details-year").textContent = input.year;
   document.getElementById("details-rating").textContent = input.rating;
   document.getElementById("details-genre").textContent = input.genre;
   document.getElementById("details-director").textContent = input.director;
   document.getElementById("details-overview-h2").textContent =
      input.overviewHeader;
   document.getElementById("details-overview-p").textContent = input.overview;
}
