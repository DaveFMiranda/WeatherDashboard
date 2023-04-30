//Sets the search term to the ID of whichever button is clicked
function setSearchCity(savedSearch) {
    return function (){
        searchCity.value = savedSearch.getAttribute('id');
    }
}

//Loads buttons from local storage on page load, sets button text and ID to the saved local storage value
function loadButtons(){
    for (i=0; i<localStorage.length; i++){
        var savedSearch = document.createElement('button');
        savedSearch.type = 'button';
        savedSearch.innerHTML = localStorage.getItem(i+1);
        savedSearch.className = "btn btn-secondary";
        savedSearch.setAttribute('id', localStorage.getItem(i+1))
        //Adds event listeners to loaded buttons to set the search term to button's ID and launch the weather search function on click
        savedSearch.addEventListener("click", setSearchCity(savedSearch));
        savedSearch.addEventListener("click", weatherSearch)
        //Adds each button to the end of the button list
        var searchButton = document.querySelector(".btn-primary");
        searchButton.parentNode.appendChild(savedSearch);
        var lineBreak = document.createElement('br');
        searchButton.parentNode.insertBefore(lineBreak, savedSearch);
    }
}

//Loads saved buttons if there are any to load
if (localStorage.length > 0) {
        loadButtons();
    }

//Creates the weatherSearch function, which...
function weatherSearch() {  
    //Builds the initial API request URL and inserts the API key and the user-created search term
    var APIKey = '67c9eb2313ffa6deee9294ece7e56ce5';
    var latLonQueryURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchCity.value + '&limit=1&appid=' + APIKey;
    
    // Translates user input city into latitude and longitude for the weather query URL
    fetch (latLonQueryURL)
        .then(response => response.json())
        .then(data => {
            var lat = data[0].lat;
            var lon = data[0].lon;
            //Creates the weather query URL and inputs the lat and lon we just got for the user-entered city
            var weatherQueryURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey + '&units=imperial'
            // Queries the weather forecast API
            fetch (weatherQueryURL)
                .then(response => response.json())
                .then(data => {
                    // Converts UNIX datestamp to (MM/DD/YYYY) for current forecast
                    var dateStamp = data.list[0].dt;
                    var dateObject = new Date(dateStamp * 1000);
                    var year = dateObject.getFullYear();
                    var month = dateObject.getMonth() + 1;
                    var day = dateObject.getDate();
                    var displayDate1 = '(' + month + '/' + day + '/' + year +')';

                    // Converts UNIX datestamp to MM/DD/YYYY for five-day forecast
                    var dateStamp2 = data.list[7].dt;
                    var dateObject2 = new Date(dateStamp2 * 1000);
                    var year2 = dateObject2.getFullYear();
                    var month2 = dateObject2.getMonth() + 1;
                    var day2 = dateObject2.getDate();
                    var displayDate2 = month2 + '/' + day2 + '/' + year2

                    var dateStamp3 = data.list[15].dt;
                    var dateObject3 = new Date(dateStamp3 * 1000);
                    var year3 = dateObject3.getFullYear();
                    var month3 = dateObject3.getMonth() + 1;
                    var day3 = dateObject3.getDate();
                    var displayDate3 = month3 + '/' + day3 + '/' + year3

                    var dateStamp4 = data.list[23].dt;
                    var dateObject4 = new Date(dateStamp4 * 1000);
                    var year4 = dateObject4.getFullYear();
                    var month4 = dateObject4.getMonth() + 1;
                    var day4 = dateObject4.getDate();
                    var displayDate4 = month4 + '/' + day4 + '/' + year4

                    var dateStamp5 = data.list[31].dt;
                    var dateObject5 = new Date(dateStamp5 * 1000);
                    var year5 = dateObject5.getFullYear();
                    var month5 = dateObject5.getMonth() + 1;
                    var day5 = dateObject5.getDate();
                    var displayDate5 = month5 + '/' + day5 + '/' + year5

                    var dateStamp6 = data.list[39].dt;
                    var dateObject6 = new Date(dateStamp6 * 1000);
                    var year6 = dateObject6.getFullYear();
                    var month6 = dateObject6.getMonth() + 1;
                    var day6 = dateObject6.getDate();
                    var displayDate6 = month6 + '/' + day6 + '/' + year6

                    
            // TODAY'S FORECAST
            city = document.querySelector('.city');
            city.textContent = data.city.name;
            
            date = document.querySelector('.date');
            date.textContent = displayDate1;
            
            // Translates the icon data into a corresponding icon and displays it on the page
            iconFetchURL = 'https://openweathermap.org/img/wn/' + data.list[0].weather[0].icon + '@2x.png';
            fetch(iconFetchURL)
                    .then(response => response.blob()) 
                    .then(blob => {
                        var iconURL = URL.createObjectURL(blob);
                        var existingIcon = document.querySelector('#icon');
                        if (existingIcon){
                            existingIcon.remove();
                        }
                        var displayIcon = document.createElement('img');
                        displayIcon.id = 'icon';
                        displayIcon.src = iconURL;
                        date.insertAdjacentElement('afterend', displayIcon);
                    })
                    .catch(error => console.error(error))

            temp = document.querySelector('.temp');
            temp.textContent = 'Temp: ' + data.list[0].main.temp + '\u00B0F';

            wind = document.querySelector('.wind');
            wind.textContent = 'Wind: ' + data.list[0].wind.speed + ' MPH';

            humidity = document.querySelector('.humidity');
            humidity.textContent = 'Humidity: ' + data.list[0].main.humidity + '%';
           
            // TOMORROW'S FORECAST
            date2 = document.querySelector('#date2');
            date2.textContent = displayDate2;
            
            iconFetchURL = 'https://openweathermap.org/img/wn/' + data.list[7].weather[0].icon + '@2x.png';
            fetch(iconFetchURL)
                    .then(response => response.blob()) 
                    .then(blob => {
                        var iconURL = URL.createObjectURL(blob);
                        var existingIcon = document.querySelector('#icon2');
                        if (existingIcon){
                            existingIcon.remove();
                        }
                        var displayIcon = document.createElement('img');
                        displayIcon.id = 'icon2';
                        displayIcon.src = iconURL;
                        date2.insertAdjacentElement('afterend', displayIcon);
                    })
                    .catch(error => console.error(error))

            temp2 = document.querySelector('#temp2');
            temp2.textContent = 'Temp: ' + data.list[7].main.temp + '\u00B0F';

            wind2 = document.querySelector('#wind2');
            wind2.textContent = 'Wind: ' + data.list[7].wind.speed + ' MPH';

            humidity2 = document.querySelector('#humidity2');
            humidity2.textContent = 'Humidity: ' + data.list[7].main.humidity + '%';

            // DAY 3 FORECAST
            date3 = document.querySelector('#date3');
            date3.textContent = displayDate3;

            iconFetchURL = 'https://openweathermap.org/img/wn/' + data.list[15].weather[0].icon + '@2x.png';
            fetch(iconFetchURL)
                    .then(response => response.blob()) 
                    .then(blob => {
                        var iconURL = URL.createObjectURL(blob);
                        var existingIcon = document.querySelector('#icon3');
                        if (existingIcon){
                            existingIcon.remove();
                        }
                        var displayIcon = document.createElement('img');
                        displayIcon.id = 'icon3';
                        displayIcon.src = iconURL;
                        date3.insertAdjacentElement('afterend', displayIcon);
                    })
                    .catch(error => console.error(error))

            temp3 = document.querySelector('#temp3');
            temp3.textContent = 'Temp: ' + data.list[15].main.temp + '\u00B0F';

            wind3 = document.querySelector('#wind3');
            wind3.textContent = 'Wind: ' + data.list[15].wind.speed + ' MPH';

            humidity3 = document.querySelector('#humidity3');
            humidity3.textContent = 'Humidity: ' + data.list[15].main.humidity + '%';

            // DAY 4 FORECAST
            date4 = document.querySelector('#date4');
            date4.textContent = displayDate4;

            iconFetchURL = 'https://openweathermap.org/img/wn/' + data.list[23].weather[0].icon + '@2x.png';
            fetch(iconFetchURL)
                    .then(response => response.blob()) 
                    .then(blob => {
                        var iconURL = URL.createObjectURL(blob);
                        var existingIcon = document.querySelector('#icon4');
                        if (existingIcon){
                            existingIcon.remove();
                        }
                        var displayIcon = document.createElement('img');
                        displayIcon.id = 'icon4';
                        displayIcon.src = iconURL;
                        date4.insertAdjacentElement('afterend', displayIcon);
                    })
                    .catch(error => console.error(error))

            temp4 = document.querySelector('#temp4');
            temp4.textContent = 'Temp: ' + data.list[23].main.temp + '\u00B0F';

            wind4 = document.querySelector('#wind4');
            wind4.textContent = 'Wind: ' + data.list[23].wind.speed + ' MPH';

            humidity4 = document.querySelector('#humidity4');
            humidity4.textContent = 'Humidity: ' + data.list[23].main.humidity + '%';

            // DAY 5 FORECAST
            date5 = document.querySelector('#date5');
            date5.textContent = displayDate5;

            iconFetchURL = 'https://openweathermap.org/img/wn/' + data.list[31].weather[0].icon + '@2x.png';
            fetch(iconFetchURL)
                    .then(response => response.blob()) 
                    .then(blob => {
                        var iconURL = URL.createObjectURL(blob);
                        var existingIcon = document.querySelector('#icon5');
                        if (existingIcon){
                            existingIcon.remove();
                        }
                        var displayIcon = document.createElement('img');
                        displayIcon.id = 'icon5';
                        displayIcon.src = iconURL;
                        date5.insertAdjacentElement('afterend', displayIcon);
                    })
                    .catch(error => console.error(error))

            temp5 = document.querySelector('#temp5');
            temp5.textContent = 'Temp: ' + data.list[31].main.temp + '\u00B0F';

            wind5 = document.querySelector('#wind5');
            wind5.textContent = 'Wind: ' + data.list[31].wind.speed + ' MPH';

            humidity5 = document.querySelector('#humidity5');
            humidity5.textContent = 'Humidity: ' + data.list[31].main.humidity + '%';

            // DAY 6 FORECAST
            date6 = document.querySelector('#date6');
            date6.textContent = displayDate6;

            iconFetchURL = 'https://openweathermap.org/img/wn/' + data.list[39].weather[0].icon + '@2x.png';
            fetch(iconFetchURL)
                    .then(response => response.blob()) 
                    .then(blob => {
                        var iconURL = URL.createObjectURL(blob);
                        var existingIcon = document.querySelector('#icon6');
                        if (existingIcon){
                            existingIcon.remove();
                        }
                        var displayIcon = document.createElement('img');
                        displayIcon.id = 'icon6';
                        displayIcon.src = iconURL;
                        date6.insertAdjacentElement('afterend', displayIcon);
                    })
                    .catch(error => console.error(error))

            temp6 = document.querySelector('#temp6');
            temp6.textContent = 'Temp: ' + data.list[39].main.temp + '\u00B0F';

            wind6 = document.querySelector('#wind6');
            wind6.textContent = 'Wind: ' + data.list[39].wind.speed + ' MPH';

            humidity6 = document.querySelector('#humidity6');
            humidity6.textContent = 'Humidity: ' + data.list[39].main.humidity + '%';
            
            // Adds new search to local storage if local storage is empty...
            if (localStorage.length === 0) {
                localStorage.setItem(1, data.city.name);
                var foundMatch = true;
                // ... and creates a new button to search for that stored city search again
                newButton();
            // If local storage isn't empty, checks to see if the user-entered search matches any items currently in local storage...
            } else {
                var foundMatch = false;
                for (var j = 1; j <= localStorage.length; j++) {
                    // And if the search matches a previously stored search, the new identical search isn't stored in local storage and a new button isn't created
                    if (data.city.name === localStorage.getItem(j)) {
                        foundMatch = true;
                        break;
                    }
                }
            }
            console.log(foundMatch);
            // But if the user search is new, the new data is stored to local storage and a new button is created
            if (!foundMatch) {
                // Saves the name of the city search in the next available local storage slot
                var nextIndex = localStorage.length + 1;
                localStorage.setItem(nextIndex, data.city.name);
                newButton();
            }

            // Creates a new button with text that matches the user search and which, when clicked, searches for that search again
            function newButton(){
                var savedSearch = document.createElement('button');
                    savedSearch.type = 'button';
                    savedSearch.innerHTML = localStorage.getItem(localStorage.length);
                    savedSearch.className = "btn btn-secondary";
                    savedSearch.setAttribute('id', localStorage.getItem(localStorage.length));
                    savedSearch.addEventListener("click", setSearchCity(savedSearch));
                    savedSearch.addEventListener("click", weatherSearch)
                    var searchButton = document.querySelector(".btn-primary");
                    searchButton.parentNode.appendChild(savedSearch);
                    var lineBreak = document.createElement('br');
                    searchButton.parentNode.insertBefore(lineBreak, savedSearch);
            }
                })
                .catch(error => console.error(error))
            })
            .catch(error => console.error(error))
    }
  