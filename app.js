const apiKey = "4812aa81b0735e555923b51680eb1f5b";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function getWeatherByLocation(city){
     
    const resp = await fetch(url(city), {
        origin: "cros" });
    const respData = await resp.json();

      addWeatherToPage(respData);
     
}

 function addWeatherToPage(data){
     const temp = Ktoc(data.main.temp);
     const feels_like = Ktoc(data.main.feels_like)

     const weather = document.createElement('div')
     weather.classList.add('weather');

     weather.innerHTML = `

        <img class="weather-image" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
        <h2 id="temperature"> ${temp}<sup>°C</sup> </h2>
        <h4 id="feels_like"> feels like ${feels_like}<sup>°C</sup></h4>
        <h3 id="description"> ${data.weather[0].description}</h3>
     
     `;


   //   cleanup 
     main.innerHTML= "";
      main.appendChild(weather);

    if(temp >= 0){
        document.getElementById("temperature").style.color="#ffe135";
    };
    document.getElementById("description").style.color="white";
    document.getElementById("container").style.height="70%";
    
    

 };

// converting kelvin to celcius 
function Ktoc(K){
    return Math.floor(K - 273.15);
}



form.addEventListener('submit',(e) =>{
   e.preventDefault();

   const city = search.value;

   if(city){
       getWeatherByLocation(city)
   }

});




