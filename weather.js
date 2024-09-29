let btn = document.querySelector("button");
let div1 = document.getElementById("d1");
let div2 = document.getElementById("d2");
let div3 = document.getElementById("d3");
let div4 = document.getElementById("d4");
let array = [];

btn.onclick = () => { 
    let cityname = document.getElementById("cityname").value; 
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=67705629595b7d9abcb077ba94668b88`;
    
    fetch(url)
    .then((res) => {
        let jsondata=res.json()
    .then((data) => {
        array = [];
        let divs = [div1, div2, div3, div4]; 

        for (let i = 0; i < 4; i++) {
            let DateTime = data.list[i].dt_txt;
            let Weather = data.list[i].weather[0].main;
            let Max_Temp = Math.round(data.list[i].main.temp_max - 273.15);
            let Humidity = data.list[i].main.humidity;

            array.push({ DateTime, Weather, Max_Temp: `${Max_Temp}°C`, Humidity: `${Humidity}%` });

           
            divs[i].innerText = `City: ${cityname}\n
                                 DateTime: ${array[i].DateTime},
                                 Weather: ${array[i].Weather},
                                 Max_Temp: ${array[i].Max_Temp}, 
                                 Humidity: ${array[i].Humidity}`;

            
            if (array[i].Weather === "Clouds") {
                document.body.style.backgroundImage = "url('./cloudy pic.jpg')";
            } else if (array[i].Weather.includes("Rain")) {
                document.body.style.backgroundImage = "url('./rainy pic.jpg')";
            } else if (array[i].Weather.includes("Clear") || array[i].Weather.includes("Sun")) {
                document.body.style.backgroundImage = "url('./cloud.webp')";
            } else {
                document.body.style.backgroundColor = "lightblue";
            }
            
            
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundPosition = "center";

        }
        for (let i = 0; i < 5; i++) {
            divs[i].style.visibility = "visible"; 
          }
    })
})
    .catch(() => {
        alert("Unable to fetch data");
    });
};
