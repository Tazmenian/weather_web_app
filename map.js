 // Initialize the map
 var map = L.map('map').setView([51.505, -0.09], 10); // Centered at (51.505, -0.09) with zoom level 13

 // Add a base map tile layer (you can choose different tile providers)
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
 }).addTo(map);

 function fetchMap() {
     const apiKey = '731530c5eb5e48b7ded04eeccbe8066c';
     const city = document.getElementById('cityInput').value;
     const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

     fetch(apiUrl)
         .then(response => response.json())
         .then(data => {
             console.log(data); // Check the data structure to extract necessary information

             // Extract latitude and longitude from the weather data
             const { coord } = data;
             const { lat, lon } = coord;

             // Convert temperature from Kelvin to Celsius
             const temperatureCelsius = data.main.temp - 273.15;

             // Clear existing markers
             map.eachLayer(layer => {
                 if (layer instanceof L.Marker) {
                     map.removeLayer(layer);
                 }
             });

             // Add a marker to the map at the weather location
             L.marker([lat, lon]).addTo(map)
                 .bindPopup(`<b>${city}</b><br>Temperature: ${temperatureCelsius.toFixed(2)}°C<br>Weather: ${data.weather[0].main}`)
                 .openPopup();

             // Pan the map to the weather location
             map.panTo([lat, lon]);
         })
         .catch(error => console.error('Error fetching weather data:', error));
 }