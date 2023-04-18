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

     const weather = document.createElement('div')
     weather.classList.add('weather');

     weather.innerHTML = `

     <img class="weather-image" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
     <h2> ${temp}<sup>°C</sup> </h2>
     <h4> ${data.humidity}</h4>
     <h3> ${data.weather[0].description}</h3>


     
     `;


   //   cleanup 
     main.innerHTML= "";
      main.appendChild(weather);
    
    if (data.weather[0].main == "Clouds"){
        document.body.style.backgroundColor = 'grey'
    }
    else if (data.weather[0].main =="Clear"){
        document.body.style.backgroundColor = 'aliceblue'
    }
    else{
        document.body.style.backgroundColor = "white"
    }
 };


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




