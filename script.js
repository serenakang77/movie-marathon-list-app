// movieMarathonApp object
const movieMarathonApp = {}
movieMarathonApp.options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "d68a0da33dmshec23235f282deeap141e2bjsn8069a44d4671",
    "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
  },
}

// api base url
movieMarathonApp.url = "https://movie-database-alternative.p.rapidapi.com/"

// searchMovie method that makes an API call to the Movie Database for 3 movies from the results
movieMarathonApp.searchMovie = (userInput) => {
  const movieMarathonAppUrl = new URL(movieMarathonApp.url)
  movieMarathonAppUrl.search = new URLSearchParams({
    s: userInput,
    type: "movie",
  })

  fetch(movieMarathonAppUrl, movieMarathonApp.options)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(response.statusText)
      }
    })
    .then((response) => {
      const movieList = response.Search
      movieMarathonApp.displayMovie(movieList)
    })
    .catch((err) => {
      if (err.message === "apiResponse is undefined") {
        alert(
          "There are no results available, please search different keywords!"
        )
      } else {
        alert(
          "API call is not working, please try to search different keywords!"
        )
      }
    })
}

// getMovie method that takes the ID of the movies that user searched and makes an API call for that movie's information (by feeding in the ID), creating an object with that information
movieMarathonApp.getMovie = (movie) => {
  if (movie) {
    const movieMarathonAppUrlById = new URL(movieMarathonApp.url)

    movieMarathonAppUrlById.search = new URLSearchParams({
      r: "json",
      i: movie.imdbID,
    })
    fetch(movieMarathonAppUrlById, movieMarathonApp.options1)
      .then((response) => response.json())
      .then((data) => movieMarathonApp.popUpModal(data))
      .catch((err) => console.error(err))
  }
}
movieMarathonApp.options1 = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "d68a0da33dmshec23235f282deeap141e2bjsn8069a44d4671",
    "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
  },
}

movieMarathonApp.searchBarSubmitButton =
  document.querySelector(".search-button")

// appendMovieInformation method that adds the li element and appends it to ul element
movieMarathonApp.appendMovieInformation = (apiResponse) => {
  const liElement = document.createElement("li")
  const movieTitle = apiResponse.Title
  const movieTitleShort = movieMarathonApp.lengthCheck(movieTitle)
  liElement.innerHTML = `
    <div class="poster-container">
        <img class="movie-poster" src="${apiResponse.Poster}" alt="Poster Picture is not available">
        <div class="add-button" id="addButton${apiResponse.imdbID}">
            <p>Add to List</p>
            <i class="fa fa-plus-circle" id="add${apiResponse.imdbID}" aria-hidden="true"></i>
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
  movieMarathonApp.ulElement.append(liElement)
  movieMarathonApp.toggleList(
    apiResponse.Title,
    apiResponse.Year,
    apiResponse.imdbID
  )
  liElement.querySelector(`.read-more`).addEventListener(`click`, function () {
    movieMarathonApp.getMovie(apiResponse)
  })
}

// displayMovies method that manipulates the DOM to add movie images and information
movieMarathonApp.displayMovie = (apiResponse) => {
  movieMarathonApp.ulElement = document.querySelector(".results ul")
  movieMarathonApp.ulElement.innerHTML = ""
  if (apiResponse.length < 3) {
    for (let i = 0; i < apiResponse.length; i++) {
      if (apiResponse[i].Poster !== "N/A") {
        movieMarathonApp.appendMovieInformation(apiResponse[i])
      } else if (apiResponse[0].Poster === "N/A" && apiResponse.length === 1) {
        alert(
          "There are no results available, please search different keywords!"
        )
      } else if (
        apiResponse[0].Poster === "N/A" &&
        apiResponse[1].Poster === "N/A"
      ) {
        alert(
          "There are no results available, please search different keywords!"
        )
        return
      }
    }
  } else {
    for (let i = 0; i < 3; i++) {
      if (apiResponse[i].Poster !== "N/A") {
        movieMarathonApp.appendMovieInformation(apiResponse[i])
      } else if (
        apiResponse[0].Poster === "N/A" &&
        apiResponse[1].Poster === "N/A" &&
        apiResponse[2].Poster === "N/A"
      ) {
        alert(
          "There are no results available, please search different keywords!"
        )
        return
      }
    }
  }
}

// toggleList method that adds and removes movie titles to the list when the user clicks + or -
movieMarathonApp.toggleList = (res, year, id) => {
  const plusButtonElement = document.getElementById(`addButton${id}`)
  plusButtonElement.addEventListener("click", function () {
    const movieExportButton = document.querySelector(".export")
    const listPlaceholderText = document.querySelector(".list-placeholder")
    if (!movieExportButton.style.display) {
      movieExportButton.style.display = "initial"
      listPlaceholderText.style.display = "none"
    }

    movieMarathonApp.movieListulElement =
      document.querySelector(".movie-list ul")
    const movieListliElement = document.createElement("li")
    movieListliElement.setAttribute("id", id)
    const currentList = document.querySelectorAll(".movie-list li")
    let currentTextList = []
    // Gives the error if user already added the list
    currentList.forEach((item) => {
      currentTextList.push(item.id)
    })
    if (currentTextList.includes(id)) {
      alert("Movie is already on the list!")
    } else {
      movieListliElement.innerHTML = `
            <span class="movie-list-item"><input type="checkbox" id="check${id}"><label for="check${res}">${res} (${year})</label></span>
            <div class="movie-list-icons">
            <i class="fa fa-minus-circle" aria-hidden="true" id="removeButton${id}"></i>
            <div class="heart-animation" id="heart${id}"></div>
            </div>
            `
      movieMarathonApp.movieListulElement.append(movieListliElement)
      // Remove the list when user clicks minusButton
      const minusButtonElement = document.getElementById(`removeButton${id}`)
      minusButtonElement.addEventListener("click", () => {
        const selectedMovieToRemove = document.getElementById(id)
        movieMarathonApp.movieListulElement.removeChild(selectedMovieToRemove)
      })
      movieMarathonApp.heartAnimation(id)
      // Moved it to up here for preventing error
      const addText = this.querySelector(`p`)
      const icon = this.querySelector(`i`)

      icon.classList.remove(`fa-plus-circle`)
      icon.classList.add(`fa-check-circle`)
      addText.innerText = `Added`

      setTimeout(() => {
        icon.classList.remove(`fa-check-circle`)
        icon.classList.add(`fa-plus-circle`)
        addText.innerText = `Add to List`
      }, `1000`)
    }
  })
}

// show heart animation when user clicks, and move item to top of list
movieMarathonApp.heartAnimation = function (id) {
  const heartElement = document.getElementById(`heart${id}`)
  heartElement.addEventListener("click", function () {
    this.classList.toggle("animate")
    if (this.id === `heart${id}`) {
      for (let i = 0; i < this.classList.length; i++) {
        if (this.classList[i] === "animate") {
          movieMarathonApp.movieListulElement.prepend(
            this.parentElement.parentElement
          )
        } else {
          movieMarathonApp.movieListulElement.append(
            this.parentElement.parentElement
          )
        }
      }
    }
  })
}

// list and results section properties
movieMarathonApp.list = document.querySelector(`.movie-list`)
movieMarathonApp.results = document.querySelector(`.results`)

// list and results mobile nav button properties
movieMarathonApp.resultsBtn = document.querySelector(`.results-btn`)
movieMarathonApp.listBtn = document.querySelector(`.list-btn`)

// method to show results and hide lists
movieMarathonApp.showResults = () => {
  movieMarathonApp.results.style.display = `block`
  movieMarathonApp.list.style.display = `none`
}

// method to show list and hide results
movieMarathonApp.showList = () => {
  movieMarathonApp.list.style.display = `block`
  movieMarathonApp.results.style.display = `none`
}

// method to show both list and results
movieMarathonApp.showListAndResults = () => {
  movieMarathonApp.results.style.display = `block`
  movieMarathonApp.list.style.display = `block`
}

// string length check method
movieMarathonApp.lengthCheck = (string) => {
  if (string.length > 14) {
    return string.substring(0, 13) + "..."
  } else {
    return string
  }
}

// click curtain to hide effect
movieMarathonApp.curtain = function () {
  const curtainElement = document.getElementById("curtain")
  const curtainLeft = document.querySelector(".curtain-left")
  const curtainRight = document.querySelector(".curtain-right")
  curtainElement.addEventListener("click", function () {
    curtainLeft.style.transform = "translateX(-100%)"
    curtainRight.style.transform = "translateX(100%)"
    curtainLeft.style.transition = "all 2s ease-out"
    curtainRight.style.transition = "all 2s ease-out"
  })
}

// read more popup effect
movieMarathonApp.popUpModal = (data) => {
  const popUpModal = document.querySelector(`.popup`)
  popUpModal.innerHTML = `
            <div class="popup-container">
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
                </div>
            </div>`
  popUpModal.style.display = `block`

  const popupX = document.querySelector(`.fa-times-circle`)
  popupX.addEventListener(`click`, function () {
    popUpModal.style.display = ``
    popUpModal.innerHTML = ``
  })
}

// final list pop up effect
movieMarathonApp.finalListPopUp = () => {
  movieMarathonApp.finalList = document.querySelectorAll(
    `.list-container ul li label`
  )

  const listPopUp = document.querySelector(`.popup`)
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
  listPopUp.style.display = `block`

  const finalListUl = document.querySelector(`.final-list-info ol`)

  movieMarathonApp.finalList.forEach((item) => {
    const finalListLi = document.createElement(`li`)
    finalListLi.innerHTML = item.innerHTML
    finalListUl.append(finalListLi)
  })

  const popupX = document.querySelector(`.fa-times-circle`)
  popupX.addEventListener(`click`, function () {
    listPopUp.style.display = ``
    listPopUp.innerHTML = ``
  })
}

// default movie array
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

// method for randomizing default movie
movieMarathonApp.random = (array) => {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

movieMarathonApp.events = () => {

  // search bar submit value event listener
  movieMarathonApp.searchBarSubmitButton.addEventListener("click", (event) => {
    event.preventDefault()

    movieMarathonApp.searchBarElement = document.querySelector(".search-bar")
    movieMarathonApp.searchFieldElement =
      movieMarathonApp.searchBarElement.querySelector(".search")

    movieMarathonApp.userMovie = movieMarathonApp.searchFieldElement.value
    document.querySelector(
      `.results h2`
    ).innerHTML = `Movie results for '${movieMarathonApp.userMovie}'`
    movieMarathonApp.searchMovie(movieMarathonApp.userMovie)
    movieMarathonApp.searchFieldElement.value = ""
  })

  // instructions box variables
  movieMarathonApp.instructionsBox = document.querySelector(`.instructions`)
  movieMarathonApp.instructionsX = movieMarathonApp.instructionsBox.querySelector(`i`)

  // close instructions box event listener
  movieMarathonApp.instructionsX.addEventListener(`click`, function () {
    movieMarathonApp.instructionsBox.style.display = `none`
  })

  // export list variable
  movieMarathonApp.exportButton = document.querySelector(`.export`)

  // export list button to list pop up event listener
  movieMarathonApp.exportButton.addEventListener(`click`, movieMarathonApp.finalListPopUp)

  // on results button click, show results
  movieMarathonApp.resultsBtn.addEventListener(`click`, movieMarathonApp.showResults)

  // on list button click, show list
  movieMarathonApp.listBtn.addEventListener(`click`, movieMarathonApp.showList)

  // when window is bigger than mobile, show both list and results
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      movieMarathonApp.showListAndResults()
    } else {
      movieMarathonApp.showResults()
    }
  })
}

// initialization method
movieMarathonApp.init = () => {
  movieMarathonApp.curtain()

  const defaultSearch = movieMarathonApp.random(movieMarathonApp.defaultMovies)
  document.querySelector(
    `.results h2`
  ).innerHTML = `Start with a '${defaultSearch}' movie`
  movieMarathonApp.searchMovie(defaultSearch)

  movieMarathonApp.events()
}

// initialize app
movieMarathonApp.init()
