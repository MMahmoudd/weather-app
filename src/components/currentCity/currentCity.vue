<template>
    <div class="currently-component">
    <template v-if="weatherData">
        <div class="container">
            <div class="name">
                <h1>{{weatherData.timezone}}</h1>
                <p>{{weatherData.currently.time}}</p>
                <div class="icons">
                    <div v-if="weatherData.currently.icon == 'clear-day'" >
                        <img 
                            src="../../assets/weather/sunny.svg" 
                            class="weather-icon"
                            alt="sunny"
                        >
                        <h3>sunny</h3>
                    </div>
                    <div v-if="weatherData.currently.icon == 'partly-cloudy-day'">
                        <img 
                            class="weather-icon"
                            src="../../assets/weather/partly-cloudy.svg"
                            alt="partly-cloudy"
                        >
                        <h3>Partly Cloudy</h3>
                    </div>
                    <div v-if="weatherData.currently.icon == 'cloudy-day'">
                        <img 
                            class="weather-icon"
                            src="../../assets/weather/cloudy.svg"
                            alt="cloudy"
                        >
                        <h3>Cloudy</h3>
                    </div>
                    <div v-if="weatherData.currently.icon == 'rain'">
                        <img 
                            class="weather-icon"
                            src="../../assets/weather/cloudy.svg"
                            alt="cloudy"
                        >
                        <h3>Rain</h3>
                    </div>
                </div>
            </div>
            <div class="temp">
                <h1>{{parseFloat(weatherData.currently.temperature).toFixed(0) + `°`}}</h1>
                <h3>{{parseFloat(weatherData.currently.temperature).toFixed(0) + `°`}} / {{parseFloat(weatherData.currently.apparentTemperature).toFixed(0) + `°`}}</h3>
                <p>{{weatherData.currently.summary}}</p>
            </div>
        </div>
    </template>
    </div>
</template>
<script>
export default {
    name: 'CurrentlyComponent',
    props:['weatherData'],
    data() {
        return {
        };
    },
}
</script>
<style>

</style>