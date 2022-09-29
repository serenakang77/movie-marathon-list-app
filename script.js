// PSEUDO - CODE

// Create app object (movieMarathonApp)
const movieMarathonApp = {};
movieMarathonApp.options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd68a0da33dmshec23235f282deeap141e2bjsn8069a44d4671',
		'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
	}
};
// scope our data and methods to movieMarathon app object
movieMarathonApp.url = "https://movie-database-alternative.p.rapidapi.com/"

movieMarathonApp.searchMovie = () => {
    const movieMarathonAppUrl = new URL(movieMarathonApp.url);
    const userInput = "Marvel"
    
    movieMarathonAppUrl.search = new URLSearchParams({
        s: userInput
    })
    fetch(movieMarathonAppUrl, movieMarathonApp.options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
} 

movieMarathonApp.searchMovieById = () => {

    const movieMarathonAppUrlById = new URL(movieMarathonApp.url);
    const userInputById = "tt4154664"

    movieMarathonAppUrlById.search = new URLSearchParams({
        r: "json",
        i: userInputById
    })
    fetch(movieMarathonAppUrlById, movieMarathonApp.options1)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}
movieMarathonApp.options1 = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'd68a0da33dmshec23235f282deeap141e2bjsn8069a44d4671',
        'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
    }
};

    // Set searchBar variable to get the userQuery

    // Make an onSubmit event listener on searchBar

        // Create searchMovie method that makes an API call to the Movie Database for the three (or more) most popular movies(using filter function) from the results

        // Create getMovie method that takes the id of the movies that user searched and makes an API call for that movie's information (by feeding in the ID), and creates an object with that information

    // Create displayMovies method that manipulates the DOM to add movie images and information

        // Handle any errors from searchMovie before displaying

        // *STRETCH GOAL* - Create an event listener on the arrow buttons that carousels through more movies when the user clicks it

    // Create toggleList method that adds and removes movie titles to the list when the user clicks + or -

        // *STRETCH GOAL* - filter movie list titles by alphabetical order, year, etc.

        // *STRETCH GOAL* - click on movie for more information

    // Create init method on movieMarathonApp
    movieMarathonApp.init = () => {
        movieMarathonApp.searchMovie();
        movieMarathonApp.searchMovieById();
    }
        // call searchMovie method
        // call getMovie method (forEach item in searchMovie array)
        // call displayMovies method (for each object getMovie creates)
        // call toggleList method to allow for adding and removing movies from the list

    // Call movieMarathonApp.init
    movieMarathonApp.init();