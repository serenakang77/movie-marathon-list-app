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
        movieMarathonApp.displayMovie(movieList)
    })
    .catch(err => {
        console.log(err.message);
        if(err.message === "movieList is undefined"){
            alert("There are no results available, please search different keywords!")
        }else {
            alert("API call is not working, please try to search different keywords!")
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
        .then(data => movieMarathonApp.popUpModal(data))
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
    const movieTitle = apiResponse.Title;
    const movieTitleShort = lengthCheck(movieTitle);
    liElement.innerHTML = `
    <div class="poster-container">
        <img class="movie-poster" src="${apiResponse.Poster}" alt="Poster Picture is not available">
        <div class="add-button" id="addButton${apiResponse.Title}">
            <p>Add to List</p>
            <i class="fa fa-plus-circle" id="add${apiResponse.Title}" aria-hidden="true"></i>
        </div>
    </div>
    <span class="desktop-only">
    <p class="${movieTitle}">${movieTitleShort}<br>(${apiResponse.Year})</p>
    </span>
    <span class="mobile-only">
    <p class="${movieTitle}">${movieTitle} (${apiResponse.Year})</p>
    </span>    
    <button class="read-more">Read More</button>
    `
    // <i class="fa fa-minus-circle" id="remove${apiResponse.Title}" aria-hidden="true"></i>
    movieMarathonApp.ulElement.append(liElement);
    movieMarathonApp.toggleList(apiResponse.Title);
    movieMarathonApp.readMore(liElement, apiResponse);
}

// Create displayMovies method that manipulates the DOM to add movie images and information
movieMarathonApp.displayMovie = (apiResponse) => {
    // !! (SERENA WILL WORK ON THIS) Handle any errors from searchMovie before displaying(NEED TO WORK)
    movieMarathonApp.ulElement = document.querySelector(".results ul")
    movieMarathonApp.ulElement.innerHTML = "";
    if(apiResponse.length <3){
        for(let i = 0; i<apiResponse.length; i++){
            if(apiResponse[i].Poster !== "N/A"){
                movieMarathonApp.appendMovieInformation(apiResponse[i])
            }else if(apiResponse[0].Poster === "N/A" && apiResponse.length === 1){
                alert("There are no results available, please search different keywords!")
            }else if(apiResponse[0].Poster === "N/A" && apiResponse[1].Poster === "N/A"){
                alert("There are no results available, please search different keywords!")
                return
            }
        }
    }else{
        for(let i = 0; i<3; i++){
            if(apiResponse[i].Poster !== "N/A"){
                movieMarathonApp.appendMovieInformation(apiResponse[i])
            }else if(apiResponse[0].Poster === "N/A" && apiResponse[1].Poster === "N/A" && apiResponse[2].Poster === "N/A"){
                alert("There are no results available, please search different keywords!")
                return
                // teas acs
            }
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
    plusButtonElement.addEventListener("click", function(){
        movieMarathonApp.movieListulElement = document.querySelector(".movie-list ul")
        const movieListliElement = document.createElement("li");
        movieListliElement.setAttribute("id", res)

        // Find everything thats already there
        const currentList = document.querySelectorAll(".movie-list li")
        let currentTextList = []
        currentList.forEach((item) => {
            currentTextList.push(item.innerText)
        })
        // See if res is in the list of all
        if(currentTextList.includes(res)){
            alert("Movie is already on the list!")
        }else {
            movieListliElement.innerHTML = `
            <span class="movie-list-item"><input type="checkbox" id="check${res}"><label for="check${res}">${res}</label></span>
            <div class="movie-list-icons">
            <i class="fa fa-minus-circle" aria-hidden="true" id="removeButton${res}"></i>
            <div class="heartAnimation" id="heart${res}"></div>
            </div>
            `
            // <input type="checkbox" id="heart"><label for="heart">&#9829</label>
            movieMarathonApp.movieListulElement.append(movieListliElement)
            movieMarathonApp.remove(res)
            movieMarathonApp.heartAnimation(res)
            
        }

        const addText = this.querySelector(`p`)
        const icon = this.querySelector(`i`);

        icon.classList.remove(`fa-plus-circle`);
        icon.classList.add(`fa-check-circle`);
        addText.innerText = `Added`

        setTimeout(() => {
            icon.classList.remove(`fa-check-circle`);
            icon.classList.add(`fa-plus-circle`);
            addText.innerText = `Add to List`
        }, `1000`)
    })
}

// show heart animation when they click
movieMarathonApp.heartAnimation = function(res){
    const heartElement = document.getElementById(`heart${res}`);
    heartElement.addEventListener("click", function(){
        this.classList.toggle("animate")
        if(this.id === `heart${res}`){
            for(let i = 0; i < this.classList.length; i++){
                if(this.classList[i] === "animate"){
                    movieMarathonApp.movieListulElement.prepend(this.parentElement.parentElement)
                }else{
                    movieMarathonApp.movieListulElement.append(this.parentElement.parentElement)
                }
            }
        }
    })
}

movieMarathonApp.remove = (res) => {
    const minusButtonElement = document.getElementById(`removeButton${res}`)
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

// movieMarathonApp.curtain = function(){
//     const curtainElement = document.querySelector(".curtain")
//     const curtainleft = document.querySelector(".curtainleft")
//     const curtainright = document.querySelector(".curtainright")
//     curtainElement.addEventListener("click", function(){
//         curtainleft.style.transform = "translateX(-100%)"
//         curtainright.style.transform = "translateX(100%)"
//         curtainleft.style.transition = "all 2s ease-out"
//         curtainright.style.transition = "all 2s ease-out"
//     })
// }

movieMarathonApp.popUpModal = (data) => {

    const popUpModal = document.querySelector(`.popup`);
        popUpModal.innerHTML = `<div class="popup-container">
                    <div class="popup-top">
                        <i class="fa fa-times-circle" aria-hidden="true"></i>
                        <h3>${data.Title} (${data.Year})</h3>
                    </div>
                    <div class="popup-info">
                        <img src="${data.Poster}" alt="Movie poster for ${data.Title})">
                        <ul>
                            <li><strong>Director(s):</strong> ${data.Director}</li>
                            <li><strong>Writer(s):</strong> ${data.Writer}</li>
                            <li><strong>Actors:</strong> ${data.Actors}</li>
                            <li><strong>Rated:</strong> ${data.Rated}</li>
                            <li><strong>Runtime:</strong> ${data.Runtime}</li>
                            <li><strong>Genre:</strong> ${data.Genre}</>
                            <li><strong>Plot:</strong> ${data.Plot}</li>
                        </ul>
                    </div>
                </div>`
        popUpModal.style.display = `block`;

        const popupX = document.querySelector(`.fa-times-circle`);
        popupX.addEventListener(`click`, function(){
            popUpModal.style.display = ``;
            popUpModal.innerHTML = ``;
        })
}

movieMarathonApp.finalListPopUp = () => {

    movieMarathonApp.finalList = document.querySelectorAll(`.list-container ul li label`);

    const listPopUp = document.querySelector(`.popup`);
    listPopUp.innerHTML = `<div class="popup-container">
                <div class="popup-top">
                    <i class="fa fa-times-circle" aria-hidden="true"></i>
                    <h3>Your Final List</h3>
                </div>
                <div class="final-list-info">
                    <ol>
                    </ol>
                </div>
            </div>`
    listPopUp.style.display = `block`;

    const finalListUl = document.querySelector(`.final-list-info ol`);

    movieMarathonApp.finalList.forEach((item) => {
        const finalListLi = document.createElement(`li`);
        finalListLi.innerHTML = item.innerHTML
        finalListUl.append(finalListLi);
    })

    const popupX = document.querySelector(`.fa-times-circle`);
    popupX.addEventListener(`click`, function(){
        listPopUp.style.display = ``;
        listPopUp.innerHTML = ``;
    })
}

movieMarathonApp.readMore = (listElement, movie) => {

    listElement.querySelector(`.read-more`).addEventListener(`click`, function(){
        movieMarathonApp.getMovie(movie);
    })
}

movieMarathonApp.random = (array) => {
    const index = Math.floor(Math.random() * array.length)
    return array[index]
}

movieMarathonApp.defaultMovies = [
    `Avengers`,
    `Fast and Furious`,
    `Batman`,
    `Godfather`,
    `Star Wars`,
    `Die Hard`,
    `Alien`,
    `Terminator`,
    `Jurassic Park`,
    `Back to the Future`,
    `Planet of the Apes`,
    `King Kong`,
    `X-Men`,
    `Matrix`,
    `Home Alone`,
    `Superman`,
    `Rocky`,
    `Spider-Man`,
    `Dirty Dancing`,
    `Clerks`,
    `Captain America`,
]

movieMarathonApp.events = () => {

    // Make an onSubmit event listener on searchBarElement
    movieMarathonApp.searchBarSubmitButton.addEventListener("click", (event) => {

        event.preventDefault();

        movieMarathonApp.searchBarElement = document.querySelector(".search-bar");
        // Set searchBarElement variable to get the userQuery
        movieMarathonApp.searchFieldElement = movieMarathonApp.searchBarElement.querySelector(".search");

        movieMarathonApp.userMovie = movieMarathonApp.searchFieldElement.value;
        document.querySelector(`.results h2`).innerHTML = `Results for '${movieMarathonApp.userMovie}'`;
        movieMarathonApp.searchMovie(movieMarathonApp.userMovie);
        movieMarathonApp.searchFieldElement.value="";
    })

    // close instructions box
    movieMarathonApp.instructionsBox = document.querySelector(`.instructions`)
    movieMarathonApp.instructionsX = movieMarathonApp.instructionsBox.querySelector(`i`)
    movieMarathonApp.instructionsX.addEventListener(`click`, function(){
        movieMarathonApp.instructionsBox.style.display = `none`;
    })

    // on export list button click
    movieMarathonApp.exportButton = document.querySelector(`.export`);
    movieMarathonApp.exportButton.addEventListener(`click`, movieMarathonApp.finalListPopUp)
    
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

// Create init method on movieMarathonApp
movieMarathonApp.init = () => {

    // movieMarathonApp.curtain();

    const defaultSearch = movieMarathonApp.random(movieMarathonApp.defaultMovies);
    document.querySelector(`.results h2`).innerHTML = `Start with a '${defaultSearch}' movie and go from there`;
    movieMarathonApp.searchMovie(defaultSearch);

    movieMarathonApp.events();
    
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