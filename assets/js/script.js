// Calls the function when the search button is clicked
function weatherSearch() {
    // Establishes variables for the initial API request, including user input search city
    var searchCity = document.getElementById("searchCity");
    var APIKey = '67c9eb2313ffa6deee9294ece7e56ce5';
    var latLonQueryURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchCity.value + '&limit=1&appid=' + APIKey;
    // Translates user input city into latitude and longitude for the weather query
    fetch (latLonQueryURL)
        .then(response => response.json())
        .then(data => {
            var lat = data[0].lat;
            var lon = data[0].lon;
            var weatherQueryURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey + '&units=imperial'
            // Queries the weather forecast API
            fetch (weatherQueryURL)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    console.log(data.city.name); // (do we need to add an array number somewhere? and convert the name value from a string for some reason?)
                    console.log(data.list[0].dt); // convert YYYY-MM-DD 

                    // Converts UNIX datestamp to (DD/MM/YYYY)
                    var dateStamp = data.list[0].dt;
                    var dateObject = new Date(dateStamp * 1000);
                    var year = dateObject.getFullYear();
                    var month = dateObject.getMonth() + 1;
                    var day = dateObject.getDate();
                    var displayDate1 = '(' + month + '/' + day + '/' + year +')';

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

                    // Translates the icon data into a corresponding icon and displays it on the page
                    console.log(data.list[0].weather[0].icon);
                    iconFetchURL = 'https://openweathermap.org/img/wn/' + data.list[0].weather[0].icon + '@2x.png';
                    console.log(iconFetchURL);
                    fetch(iconFetchURL)
                            .then(response => response.blob()) 
                            .then(blob => {
                            // MOVE THIS ICON WHERE IT SHOULD BE (next to the date)
                                var iconURL = URL.createObjectURL(blob);
                                console.log(iconURL)
                                var displayIcon = document.createElement('img');
                                displayIcon.src = iconURL;
                                date.insertAdjacentElement('afterend', displayIcon);

                            })
                            .catch(error => console.error(error))
                    console.log(data.list[0].main.temp);
                    console.log(data.list[8].main.temp);

                    console.log(data.list[0].wind.speed);
                    console.log(data.list[0].main.humidity);
            
            // TODAY'S FORECAST
            city = document.querySelector('.city');
            city.textContent = data.city.name;
            
            date = document.querySelector('.date');
            date.textContent = displayDate1;

            temp = document.querySelector('.temp');
            temp.textContent = 'Temp: ' + data.list[0].main.temp + '\u00B0F';

            wind = document.querySelector('.wind');
            wind.textContent = 'Wind: ' + data.list[0].wind.speed + ' MPH';

            humidity = document.querySelector('.humidity');
            humidity.textContent = 'Humidity: ' + data.list[0].main.humidity + '%';
           
            // TOMORROW'S FORECAST
            date2 = document.querySelector('#date2');
            date2.textContent = displayDate2;

            temp2 = document.querySelector('#temp2');
            temp2.textContent = 'Temp: ' + data.list[7].main.temp + '\u00B0F';

            wind2 = document.querySelector('#wind2');
            wind2.textContent = 'Wind: ' + data.list[7].wind.speed + ' MPH';

            humidity2 = document.querySelector('#humidity2');
            humidity2.textContent = 'Humidity: ' + data.list[7].main.humidity + '%';

            // DAY 3 FORECAST
            date3 = document.querySelector('#date3');
            date3.textContent = displayDate3;

            temp3 = document.querySelector('#temp3');
            temp3.textContent = 'Temp: ' + data.list[15].main.temp + '\u00B0F';

            wind3 = document.querySelector('#wind3');
            wind3.textContent = 'Wind: ' + data.list[15].wind.speed + ' MPH';

            humidity3 = document.querySelector('#humidity3');
            humidity3.textContent = 'Humidity: ' + data.list[15].main.humidity + '%';

            // DAY 4 FORECAST
            date4 = document.querySelector('#date4');
            date4.textContent = displayDate4;

            temp4 = document.querySelector('#temp4');
            temp4.textContent = 'Temp: ' + data.list[23].main.temp + '\u00B0F';

            wind4 = document.querySelector('#wind4');
            wind4.textContent = 'Wind: ' + data.list[23].wind.speed + ' MPH';

            humidity4 = document.querySelector('#humidity4');
            humidity4.textContent = 'Humidity: ' + data.list[23].main.humidity + '%';

            // DAY 5 FORECAST
            date5 = document.querySelector('#date5');
            date5.textContent = displayDate5;

            temp5 = document.querySelector('#temp5');
            temp5.textContent = 'Temp: ' + data.list[31].main.temp + '\u00B0F';

            wind5 = document.querySelector('#wind5');
            wind5.textContent = 'Wind: ' + data.list[31].wind.speed + ' MPH';

            humidity5 = document.querySelector('#humidity5');
            humidity5.textContent = 'Humidity: ' + data.list[31].main.humidity + '%';

            // DAY 6 FORECAST
            date6 = document.querySelector('#date6');
            date6.textContent = displayDate6;

            temp6 = document.querySelector('#temp6');
            temp6.textContent = 'Temp: ' + data.list[39].main.temp + '\u00B0F';

            wind6 = document.querySelector('#wind6');
            wind6.textContent = 'Wind: ' + data.list[39].wind.speed + ' MPH';

            humidity6 = document.querySelector('#humidity6');
            humidity6.textContent = 'Humidity: ' + data.list[39].main.humidity + '%';
                })
                .catch(error => console.error(error))
            })
            .catch(error => console.error(error))
    }

    
/*

{
  "cod": "200",
  "message": 0,
  "cnt": 40,
  "list": [
    
    THIS IS CURRENT: 
    then every three hours after
    {
      "dt": 1661871600,
      "main": {
        "temp": 296.76,
        "feels_like": 296.98,
        "temp_min": 296.76,
        "temp_max": 297.87,
        "pressure": 1015,
        "sea_level": 1015,
        "grnd_level": 933,
        "humidity": 69,
        "temp_kf": -1.11
      },
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "clouds": {
        "all": 100
      },
      "wind": {
        "speed": 0.62,
        "deg": 349,
        "gust": 1.18
      },
      "visibility": 10000,
      "pop": 0.32,
      "rain": {
        "3h": 0.26
      },
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2022-08-30 15:00:00"
    },
    {
      "dt": 1661882400,
      "main": {
        "temp": 295.45,
        "feels_like": 295.59,
        "temp_min": 292.84,
        "temp_max": 295.45,
        "pressure": 1015,
        "sea_level": 1015,
        "grnd_level": 931,
        "humidity": 71,
        "temp_kf": 2.61
      },
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10n"
        }
      ],
      "clouds": {
        "all": 96
      },
      "wind": {
        "speed": 1.97,
        "deg": 157,
        "gust": 3.39
      },
      "visibility": 10000,
      "pop": 0.33,
      "rain": {
        "3h": 0.57
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2022-08-30 18:00:00"
    },
    
    
    {
      "dt": 1661893200,
      "main": {
        "temp": 292.46,
        "feels_like": 292.54,
        "temp_min": 290.31,
        "temp_max": 292.46,
        "pressure": 1015,
        "sea_level": 1015,
        "grnd_level": 931,
        "humidity": 80,
        "temp_kf": 2.15
      },
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10n"
        }
      ],
      "clouds": {
        "all": 68
      },
      "wind": {
        "speed": 2.66,
        "deg": 210,
        "gust": 3.58
      },
      "visibility": 10000,
      "pop": 0.7,
      "rain": {
        "3h": 0.49
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2022-08-30 21:00:00"
    },
    ....
   
   
    {
      "dt": 1662292800,
      "main": {
        "temp": 294.93,
        "feels_like": 294.83,
        "temp_min": 294.93,
        "temp_max": 294.93,
        "pressure": 1018,
        "sea_level": 1018,
        "grnd_level": 935,
        "humidity": 64,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "clouds": {
        "all": 88
      },
      "wind": {
        "speed": 1.14,
        "deg": 17,
        "gust": 1.57
      },
      "visibility": 10000,
      "pop": 0,
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2022-09-04 12:00:00"
    }
  ],



  "city": {
    "id": 3163858,
    "name": "Zocca",
    "coord": {
      "lat": 44.34,
      "lon": 10.99
    },
    "country": "IT",
    "population": 4593,
    "timezone": 7200,
    "sunrise": 1661834187,
    "sunset": 1661882248
  }
}

*/



     



// fetch api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={APIKey}&units=imperial
// make lat and lon variables that pull data from the first API response

