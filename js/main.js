//Var

var ROOT_URL = `http://api.openweathermap.org/data/2.5/weather?zip=`
var API_KEY = `95bae40fc48ecc86d1a024b16d1c2837`
var title = document.querySelector('.title')
var city = document.querySelector('.city')
var zip = document.querySelector('.zip')
var weather = document.querySelector('.weather')
var icon = document.querySelector('.icon')
var temp = document.querySelector('.temp')
var humid = document.querySelector('.humid')
var btn = document.querySelector('.btn button')
var fc = "F"
var faren;
var deg = document.querySelector('.deg')
var icons = {
    "Clouds": [`img/cloudy.png`, 'http://www.kinyu-z.net/data/wallpapers/229/1507173.jpg'],
    "Rain": [`img/rain.png`, 'http://www.baltana.com/files/wallpapers-4/Rain-Background-Widescreen-Wallpapers-14531.jpg'],
    "Snow": [`img/snow.png`, 'https://ae01.alicdn.com/kf/HTB17dW3KVXXXXctXXXXq6xXFXXX7/3d-mural-wallpaper-Photo-wallpaper-custom-wallpaper-Winter-snow-background-wall-mural-Home-Decoration.jpg'],
    "Clear": [`img/sun.png`, 'https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/0cbolvj/sun-rise-animated-background_41z6oppb__F0000.png'],
    "Thunderstorm": [`img/thunderstorm.png`, 'http://vunature.com/wp-content/uploads/2016/11/sky-clouds-lightning-nature-storm-rain-thunderstorm-image-beautiful.jpg']
}


//Fun
function iconSelector(weather) {
    return icons[weather][0]
}
function kelToFar(kelvin) {
    return Math.round(kelvin * 9 / 5 - 459.67)
}

function getWeather(zipCode) {
    $.ajax({
        url: `${ROOT_URL}${zipCode},us&appid=${API_KEY}`,
        dataType: `json`,
        success: function (data) {
            city.textContent = 'City: '
            console.log(data)
            title.textContent = data.name
            weather.textContent = data.weather[0].main
            temp.textContent = kelToFar(data.main.temp)
            faren = kelToFar(data.main.temp)
            humid.textContent = data.main.humidity
            icon.src = iconSelector(data.weather[0].main)
            document.querySelector("body").style.background = `url("${icons[data.weather[0].main][1]}") 0% 0% no-repeat fixed`
        },
        error: function (e) {
            console.log(`Error`)
        }
    })
}

function FtoC(temper) {
    return Math.round((temper - 32) * (5 / 9));
}
// function CtoF(temper){
//     return Math.round((temper))
// }




//Call
getWeather('33140')
zip.addEventListener("keypress", function (event) {
    if (event.key == `Enter`) {
        getWeather(zip.value)
    }
})
btn.addEventListener("click", function (event) {
    if (fc == "F") {
        temp.textContent = FtoC(temp.textContent)
        btn.textContent = "F"
        deg.innerHTML = "&deg; C"
        fc = "C"
    } else {
        temp.textContent = faren
        deg.innerHTML = "&deg; F"
        btn.textContent = "C"
        fc = "F"
    }
})