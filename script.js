// PSEUDO - CODE

// Create movieMarathonApp object
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

// Create searchMovie method that makes an API call to the Movie Database for the three (or more) most popular movies(using filter function) from the results
movieMarathonApp.searchMovie = (parameter) => {
    const movieMarathonAppUrl = new URL(movieMarathonApp.url);
    movieMarathonAppUrl.search = new URLSearchParams({
        s:parameter
    })
    
    fetch(movieMarathonAppUrl, movieMarathonApp.options)
    .then(response => response.json())
    .then(response => movieMarathonApp.displayMovie(response))
    .catch(err => console.error(err));
} 

// Create getMovie method that takes the id of the movies that user searched and makes an API call for that movie's information (by feeding in the ID), and creates an object with that information
movieMarathonApp.getMovie = () => {

    const movieMarathonAppUrlById = new URL(movieMarathonApp.url);
    const userInputById = "tt4154664"
    
    movieMarathonAppUrlById.search = new URLSearchParams({
        r: "json",
        i: userInputById
    })
    fetch(movieMarathonAppUrlById, movieMarathonApp.options1)
    .then(response => response.json())
    .then(response => movieMarathonApp.api2 = response)
    .catch(err => console.error(err));
}
movieMarathonApp.options1 = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'd68a0da33dmshec23235f282deeap141e2bjsn8069a44d4671',
        'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
    }
};

movieMarathonApp.searchBarSubmitButton = document.querySelector(".search-button");

// Create displayMovies method that manipulates the DOM to add movie images and information
movieMarathonApp.displayMovie = (apiResponse) => {
    // !! (SERENA WILL WORK ON THIS) Handle any errors from searchMovie before displaying(NEED TO WORK)
    const ulElement = document.querySelector(".results ul")
    ulElement.innerHTML = "";
    for(let i = 0; i<3; i++){
        const liElement = document.createElement("li");
        liElement.innerHTML = `
        <img class="movie-poster" src="${apiResponse.Search[i].Poster}" alt="${apiResponse.Search[i].Title}">
        <p class="movie-title">${apiResponse.Search[i].Title}</p>
        <i class="fa fa-plus-circle" aria-hidden="true"></i>
        <i class="fa fa-minus-circle" aria-hidden="true"></i>
        `
        ulElement.append(liElement);
        // !! (DANA WILL WORK ON THIS) *STRETCH GOAL* - Create an event listener on the arrow buttons that carousels through more movies when the user clicks it(NEED TO WORK)
    }
}



// Create init method on movieMarathonApp
movieMarathonApp.init = () => {
    // Make an onSubmit event listener on searchBarElement
    movieMarathonApp.searchBarSubmitButton.addEventListener("click", () => {
        // Set searchBarElement variable to get the userQuery
        movieMarathonApp.searchBarElement = document.querySelector(".search");

        movieMarathonApp.userMovie = movieMarathonApp.searchBarElement.value;
        movieMarathonApp.searchMovie(movieMarathonApp.userMovie);
        movieMarathonApp.searchBarElement.value="";
    })
}

// Call movieMarathonApp.init
movieMarathonApp.init();


// UNFINISHED PSEUDO CODE


    //SERENA WILL WORK ON TOGGLE
    // Create toggleList method that adds and removes movie titles to the list when the user clicks + or -

        // *STRETCH GOAL* - filter movie list titles by alphabetical order, year, etc.

        // *STRETCH GOAL* - click on movie for more information

        // call getMovie method (forEach item in searchMovie array)
        // call toggleList method to allow for adding and removing movies from the list
    
    // DANA WILL WORK ON MOBILE FUNCTION(Menu Bar to go to movie list...)
