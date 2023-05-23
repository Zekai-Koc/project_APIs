# Project APIs

## Description

A Web App connecting to two separate movie databases (APIs) and displaying the query results in movie cards.

It starts with a default query for popular movies in the first end point - TMDB.

It has `Movie Search` capability from the both databases.

Movie databases can be selected with a radio group.

Users can get additional information by clicking the movie posters on the screen.

Errors will be shown in a modal form.

Header, body and footer sections will be designed responsively.

As a `Nice to Have` feature, a weather interface using OpenWeather API has been added.

IAW the location, the country flag is being shown on the weather interface.

Just for challenging purposes an external library -chart.js is used for displaying the weather info in graphical format.

Mainly 4 different APIs used in the project:
- TMDB (main movie database),
- Rapid API (for additional movie db),
- OpenWeather API for weather queries,
- Countriesnow API for fetching country info - flag images (at the beginning, restcountries api has been used, however the api will cease its service at the end of May 2023, and the api has changed accordingly).

## Design

- A **responsive** design created.
- **Flexbox** is used for the main alignment tool.
- A modal form is designed for both `movie details info` and `error messages`.

## Setup

For running the app api_keys.js file needed. Because of security reasons this file exluded from the GitHub repository. It should be acquired and saved in the project folder.


                                                    ...ENJOY...