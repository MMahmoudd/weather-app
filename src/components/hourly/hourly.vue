<template>
    <div class="hourly-component">
    <template v-if="weatherData">
        <div class="all-hours" v-for="hour in weatherData.hourly.data" :key="hour.id">
            <span class="hour">{{hour.time}}</span>
            <div class="icons">
                <img 
                    v-if="hour.icon == 'clear-day'" 
                    src="../../assets/weather/sunny.svg" 
                    class="weather-icon"
                    alt="sunny"
                >
                <img 
                    v-if="hour.icon == 'clear-night'" 
                    src="../../assets/weather/clear-night.svg"
                    class="weather-icon"
                    alt="clear-night"
                >
                <img 
                    v-if="hour.icon == 'partly-cloudy-day'"
                    class="weather-icon"
                    src="../../assets/weather/partly-cloudy.svg"
                    alt="partly-cloudy"
                >
                <img 
                    v-if="hour.icon == 'partly-cloudy-night'"
                    class="weather-icon"
                    src="../../assets/weather/partly-cloudy-night.svg"
                    alt="partly-cloudy"
                >
                <img 
                    v-if="hour.icon == 'cloudy-day' || hour.icon == 'cloudy-night' || hour.icon == 'rain'"
                    class="weather-icon"
                    src="../../assets/weather/cloudy.svg"
                    alt="cloudy"
                >
            </div>
            <span>{{parseFloat(hour.temperature).toFixed(0) + `°`}}</span>
        </div>
    </template>
    </div>
</template>
<script>
export default {
    name: 'HourlyComponent',
    props:['weatherData'],
    data() {
        return {
        };
    },
}
</script>