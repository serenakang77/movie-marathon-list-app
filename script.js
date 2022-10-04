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
movieMarathonApp.searchMovie = (userInput) => {
    const movieMarathonAppUrl = new URL(movieMarathonApp.url);
    movieMarathonAppUrl.search = new URLSearchParams({
        s:userInput
    })
    
    fetch(movieMarathonAppUrl, movieMarathonApp.options)
    .then(response => {
        if(response.ok){
            return response.json()
        }else{
            throw new Error(response.statusText)
        }
    })
    .then(response => {
        const movieList = response.Search
        movieList.forEach((movie) => {
            movieMarathonApp.getMovie(movie)
        })
        movieMarathonApp.displayMovie(response.Search)
    })
    .catch(err => {
        console.log(err.message);
        if(err.message === "movieList is undefined"){
            alert("There are no results available, please search different keywords!")
        }else {
            alert("API call is not working, please try it again later")
        }
    })
} 

// Create getMovie method that takes the id of the movies that user searched and makes an API call for that movie's information (by feeding in the ID), and creates an object with that information
movieMarathonApp.getMovie = (movie) => {
    if(movie){
        const movieMarathonAppUrlById = new URL(movieMarathonApp.url);
        
        movieMarathonAppUrlById.search = new URLSearchParams({
            r: "json",
            i: movie.imdbID
        })
        fetch(movieMarathonAppUrlById, movieMarathonApp.options1)
        .then(response => response.json())
        .then(response => {
            response
            // console.log(response)
        })
        .catch(err => console.error(err));
    }
}
movieMarathonApp.options1 = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'd68a0da33dmshec23235f282deeap141e2bjsn8069a44d4671',
        'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
    }
};

movieMarathonApp.searchBarSubmitButton = document.querySelector(".search-button");

// Create appendMovieInformation method that adds the li element and append it to ul element
movieMarathonApp.appendMovieInformation = (apiResponse) => {
    const liElement = document.createElement("li");
    const movieTitle = lengthCheck(apiResponse.Title);
    liElement.innerHTML = `
    <div class="poster-container">
        <img class="movie-poster" src="${apiResponse.Poster}" alt="Poster Picture is not available">
        <div class="add-button" id="addButton${apiResponse.Title}">
            <p>Add to List</p>
            <i class="fa fa-plus-circle" id="add${apiResponse.Title}" aria-hidden="true"></i>
        </div>
    </div>
    <p class="${movieTitle}">${movieTitle}<br>(${apiResponse.Year})</p>
    <button class="read-more">Read More</button>
    `
    // <i class="fa fa-minus-circle" id="remove${apiResponse.Title}" aria-hidden="true"></i>
    movieMarathonApp.ulElement.append(liElement);
    movieMarathonApp.toggleList(apiResponse.Title);
}

// Create displayMovies method that manipulates the DOM to add movie images and information
movieMarathonApp.displayMovie = (apiResponse) => {
    // !! (SERENA WILL WORK ON THIS) Handle any errors from searchMovie before displaying(NEED TO WORK)
    console.log(apiResponse);
    movieMarathonApp.ulElement = document.querySelector(".results ul")
    movieMarathonApp.ulElement.innerHTML = "";
    if(apiResponse.length <3){
        for(let i = 0; i<apiResponse.length; i++){
            movieMarathonApp.appendMovieInformation(apiResponse[i])
        }
    }else{
        for(let i = 0; i<3; i++){
            movieMarathonApp.appendMovieInformation(apiResponse[i])
            // !! (DANA WILL WORK ON THIS) *STRETCH GOAL* - Create an event listener on the arrow buttons that carousels through more movies when the user clicks it(NEED TO WORK)
        }
    }
}
//SERENA WILL WORK ON TOGGLE

// *STRETCH GOAL* - filter movie list titles by alphabetical order, year, etc.

// *STRETCH GOAL* - click on movie for more information

// call getMovie method (forEach item in searchMovie array)

// Create toggleList method that adds and removes movie titles to the list when the user clicks + or -
movieMarathonApp.toggleList = (res) => {
    const plusButtonElement = document.getElementById(`addButton${res}`)
    plusButtonElement.addEventListener("click", () => {
        movieMarathonApp.movieListulElement = document.querySelector(".movie-list ul")
        movieMarathonApp.movieListliElement = document.createElement("li");
        movieMarathonApp.movieListliElement.setAttribute("id", res)
        // if()
        movieMarathonApp.movieListliElement.innerHTML = `
        <span class="movie-list-item"><input type="checkbox" id="check${res}"><label for="check${res}">${res}</label></span>
        <i class="fa fa-minus-circle" aria-hidden="true" id="removeButton${res}"></i>
        `
        movieMarathonApp.movieListulElement.append(movieMarathonApp.movieListliElement)
        movieMarathonApp.remove(res)
    })
}

movieMarathonApp.remove = (res) => {
    const minusButtonElement = document.getElementById(`removeButton${res}`)
    // const minusButtonElement = document.querySelectorAll(".fa-minus-circle")
    console.log(minusButtonElement);
    minusButtonElement.addEventListener("click", () => {
        const selectedMovieToRemove = document.getElementById(res)
        movieMarathonApp.movieListulElement.removeChild(selectedMovieToRemove)
    })
}

// list and results section variables
const list = document.querySelector(`.movie-list`)
const results = document.querySelector(`.results`)

// list and results button variables
const resultsBtn = document.querySelector(`.results-btn`)
const listBtn = document.querySelector(`.list-btn`)

// show results and hide lists function
function showResults() {
    results.style.display = `block`;
    list.style.display = `none`;
}

// show list and hide results function
function showList() {
    list.style.display = `block`;
    results.style.display = `none`;
}

// show both list and results function
function showListAndResults() {
    results.style.display = `block`;
    list.style.display = `block`;
}

// string length check function
function lengthCheck(string) {
    if (string.length > 16) {
        return string.substring(0, 15) + "...";
    } else {
        return string;
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
    // on results button click, show results
    resultsBtn.addEventListener(`click`, showResults);

    // on list button click, show list
    listBtn.addEventListener(`click`, showList);

    // when window is bigger than mobile, show both list and results
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 595){
            showListAndResults();
        } else {
            showResults();
        }
    });
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